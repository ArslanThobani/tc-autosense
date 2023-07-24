# Tech Challenge - Team AutoSense

## AutoSense Homepage - https://autosense.jimdosite.com/
- The homepage gives a brief overview of AutoSense and the solutions we provide.

## Beta Dashboard - http://44.201.230.15

The dashboard gives insight to the manufacturers about the problems occurring in specific models of vehicles. These insights are collected from the data that is collected from online forums and social media. 
- Selecting 'Brand' and 'Model' provides a graph detailing the frequency of problems('Topic') occurring for the specific model. Currently, we are categorizing into 6 different problems -
  - Soundsystem Probleme
  - Qualitätsmangel
  - Software Probleme
  - Schiebedach Probleme
  - Zentralverriegelung
  - Reifen und Felgen
  - Dachträger und Dachboxen
  
We would be able to add more categories going forward with the availability of additional data and time.
![Total Occurrences](https://github.com/ArslanThobani/tc-autosense/assets/24518505/aaee76a7-23e6-4560-a435-f9179cc798a1)

    
- To go into more detail for a specific problem and look at forecasts for the next quarters, select the 'Topic', 'Brand', and 'Model'. It provides a quarterly distribution of the specific problems for the model. It also predicts the occurrence of the problem for future quarters by analyzing past data.

![Occurrences per quarter and predictions](https://github.com/ArslanThobani/tc-autosense/assets/24518505/0903ccca-7e72-4de6-990d-d58fcf617e0a)


## Components

- /api - Machine learning API that provides predictions for future quarters using Flask
- /frondend - Frontend app using ReactJs
- /backend - Backend app using NodeJs
- /data_extraction - Script for web scraping using Selenium
- /nlp - Script to apply nlp on the raw data collected from the web using Sentence Transformers

Detailed descriptions of the components can be found in the Technical Documentation pdf.

