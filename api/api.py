from sklearn.linear_model import LinearRegression
from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})


@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    response.headers.add('Access-Control-Allow-Credentials', 'true')
    return response


# Instead, create model here
# [2021, 2022, 2023]
X = np.array([[6, 8, 24],
              [7, 9, 27],
              [6, 7, 26],
              [4, 5, 18],
              [8, 8, 32],])

y = [12,
     14,
     13,
     9,
     16]

model = LinearRegression()
model.fit(X, y)

# the model weights should look like: ~0.2 for 2021, ~0.3 for 2022, and ~0.5 for 2023

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json.get('occurances')  # Get the JSON data from the request

    # Convert the data to a numpy array
    # 'occurances' should be a list consisting of the demands of the past three years:
    # e.g., [14, 13, 17]
    print(data)
    features = np.array([data])

    # Apply the machine learning model to make predictions
    predictions = model.predict(features)
    print(predictions[0])

    # Convert the predictions to a JSON response
    response = {'predictions': predictions[0]}

    return jsonify(response)


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=8080)
