from selenium import webdriver
from selenium.common import NoSuchElementException
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By

import yaml
from selenium.webdriver.support import expected_conditions
from selenium.webdriver.support.wait import WebDriverWait
from yaml.loader import SafeLoader
import json
from datetime import datetime
import psycopg2
import pandas as pd

import locale

locale.setlocale(locale.LC_TIME, "de_DE.utf8")

date_format = 'am %d. %B %Y um %H:%M'
with open('webelements.yaml') as f:
    elements = yaml.load(f, Loader=SafeLoader)

driver = webdriver.Chrome()


# driver.get("https://www.motor-talk.de/forum/lambdasonden-problem-t7266016.html")


def extract_post(post_link):
    driver.get(post_link)

    username = driver.find_element(By.XPATH, elements['username']).text
    modelname = driver.find_element(By.XPATH, elements['modelname']).text

    postdate = driver.find_element(By.XPATH, elements['postdate']).text
    postdate = datetime.strptime(postdate, date_format).date()

    texts_list = driver.find_elements(By.XPATH, elements['texts'])
    post = texts_list.pop(0).text

    comments = list()
    for idx, comment in enumerate(texts_list):
        if len(comment.text) > 2000:
            continue
        comments.insert(idx, comment.text)

    return {
        'username': username,
        'modelname': modelname,
        'postdate': postdate,
        'post': post,
        'comments': comments
    }


def extract_links_for_brands():
    driver.get('https://www.motor-talk.de/forum/auto-b3.html')
    brandslist = driver.find_elements(By.XPATH, elements['brandslist'])
    brands = dict()
    for idx, link in enumerate(brandslist):
        brand_name = link.text.split(' Forum')[0]
        brands[brand_name] = link.get_attribute('href')

    for brand, link in brands.items():
        driver.get(link)
        print(brand)

        links_list = list()
        try:
            driver.find_element(By.XPATH, elements['list-title'])
            links = driver.find_elements(By.XPATH, elements['brandslist'])
            for idx, link in enumerate(links):
                url = link.get_attribute('href')
                temp_driver = webdriver.Chrome()
                temp_driver.get(url)
                try:
                    temp_driver.find_element(By.XPATH, elements['list-title'])
                    sub_links = temp_driver.find_elements(By.XPATH, elements['brandslist'])
                    for sub_link in sub_links:
                        links_list.append(sub_link.get_attribute('href'))
                except NoSuchElementException:
                    links_list.append(url)
                finally:
                    temp_driver.close()
        except NoSuchElementException:
            links_list.append(link)

        brands[brand] = links_list
    with open('brand_links.json', 'w') as fp:
        json.dump(brands, fp)


def extract_post_links():
    with open('brand_links.json', 'r') as fp:
        brandslist = json.load(fp)
    cookies_accepted = False
    brand_posts_links = dict()
    for brand, links in brandslist.items():
        posts_links = list()

        for link in links:
            driver.get(link)
            if not cookies_accepted:
                WebDriverWait(driver, timeout=10).until(
                    expected_conditions.presence_of_element_located((By.XPATH, elements['cookies-accept'])))
                driver.find_element(By.XPATH, elements['cookies-accept']).click()
                cookies_accepted = True

            while True:

                try:
                    posts_list = driver.find_elements(By.XPATH, elements['posts-list'])
                    for post in posts_list:
                        posts_links.append(post.get_attribute('href'))

                    print(len(posts_links))
                    prev_page_link = driver.find_element(By.XPATH, elements['prev-page']).get_attribute('href')
                    driver.get(prev_page_link)
                    # driver.find_element(By.XPATH, elements['prev-page']).click()
                except:
                    break

        brand_posts_links[brand] = posts_links
        with open('posts_links.json', 'w') as fp:
            json.dump(brand_posts_links, fp)


# extract links and brand names from forum home page and save it to brand_links.json.
# Uncomment to create/replace the file.
# extract_links_for_brands()

# extract_post_links()

# extract data from individual posts
with open('posts_links.json', 'r') as fp:
    posts_links = json.load(fp)
connection = psycopg2.connect(
    host="autosense-1.ciqghxikd2ck.us-east-1.rds.amazonaws.com",
    database="postgres",
    user="postgres",
    password=""
)
insert_post_query = "insert into ForumPosts(username, model, postdate, post, brand) values(%s, %s, %s, %s, %s) returning postid"
insert_comment_query = "insert into ForumComments(postid, comment) values(%s, %s)"

post_data = list()
counter = 0
for brand, links in posts_links.items():

    for link in links:
        try:
            post = extract_post(link)
            post['brand'] = brand
            post_data.append(post)

            cursor = connection.cursor()
            cursor.execute(insert_post_query, (post['username'], post['modelname'], post['postdate'], post['post'], brand))
            postid = cursor.fetchone()[0]

            cursor.executemany(insert_comment_query, [(postid, comment) for comment in post['comments']])

            connection.commit()
            cursor.close()
            counter += 1
            if counter == 10000:
                break
        except:
            continue

    df = pd.DataFrame.from_records(post_data)
    df.to_csv('posts10k.csv', sep='\t', encoding='utf-8', index=False)
    if counter == 10000:
        break


# connection.close()
# driver.close()

# post = extract_post()
#
# # database connection
# connection = psycopg2.connect(
#     host="autosense-1.ciqghxikd2ck.us-east-1.rds.amazonaws.com",
#     database="postgres",
#     user="postgres",
#     password="AutoSense123?"
# )
#
# cursor = connection.cursor()
# insert_post_query = "insert into ForumPosts(username, model, postdate, post) values(%s, %s, %s, %s) returning postid"
# insert_comment_query = "insert into ForumComments(postid, comment) values(%s, %s)"
# cursor.execute(insert_post_query, (post['username'], post['modelname'], post['postdate'], post['post']))
# postid = cursor.fetchone()[0]
#
# cursor.executemany(insert_comment_query, [(postid, comment) for comment in post['comments']])
#
# connection.commit()
# cursor.close()
# connection.close()


driver.close()
