# NLP - Feature extraction
## 1 Inputs
### 1.1 Utterances
Utterances for each Possible feature are needed. </br>
I propose that we setup a table "trainingdata" in the database, listing the features and example sentences for it.</br>
It could look like so:</br>

| name      | example                               |
|-----------|---------------------------------------|
| Breaks    | I need new breaks                     |
| Breaks    | Where can I buy breaks                |
| Breaks    | The break disks need to be exchanged  |
| Bike Rack | Where can I buy a bike rack           |
| Bike Rack | I need to transport a bike            |
| Bike Rack | Any recommendations for a bike rack?  |
| Lights    | Where can I get a lightbulb?          |
| Lights    | The Headlight is not working any more |
| Lights    | Blinker is not working                |
| ...       | ...                                   |

### 1.2 Posts to process
The text from which the feature should be extracted from needs to be provided.</br>
I propose we setup a table "posts" in the database, listing the texts and metadata.</br>
It could look like so:</br>
| text                                          | model         | time | NLP-topic |
|-----------------------------------------------|---------------|------|-------|
| The front right lamp is not working in my car | Tesla Model 3 | ...  | None  |
| I need a new handle for the glove box         | Audi A3 V8    | ...  | None  |
| ...                                           | ...           | ...  | ...   |

## 2 NLP Processing
The script processing the text can be found in the file SentenceTransformer.ipynb in the section "Topic exploration".
The computation can be done in colab asynchronous to the scraping of the data.

## 3 Output
The output provided is the most likely topic the text fits to.</br>
If the confidence is below 0.3 no topic is assigned.</br>
This result will be written back into "NLP-topic" of the related text.</br>
</br>
Based on this for example a seasonal prediction or a trend analysis can be made.

## 4 Next steps
### 4.1 What I need to proceed
1. Data by Arslan
2. Database by Melvin
### 4.2 What I provide
1. Features in the database for each text in the database
