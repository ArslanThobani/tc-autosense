import numpy as np
from sklearn.ensemble import RandomForestRegressor

# Generate synthetic dataset
np.random.seed(0)

# e.g., [i, x, z, month]
X = np.array([[5.48, 2.3, 1.7, 8],
              [7.15, 3.1, 2.6, 5],
              [6.02, 1.5, 4.2, 6],
              [3.48, 2.3, 1.7, 1],
              [7.15, 3.1, 2.6, 5],
              [6.07, 1.5, 4.2, 11],
              [5.48, 2.3, 1.7, 8],
              [7.15, 6.1, 2.6, 2],
              [6.02, 1.5, 8.2, 12],
              [6.02, 1.5, 4.2, 2],
              [5.48, 3.3, 1.7, 8],
              [7.15, 3.1, 2.6, 5],
              [6.02, 1.5, 4.2, 6],
              [5.48, 6.3, 1.7, 8],
              [7.15, 3.1, 2.6, 5],
              [3.02, 1.5, 4.2, 6],
              [5.48, 2.3, 1.7, 8],
              [2.15, 3.1, 2.6, 10],
              [6.02, 1.5, 4.2, 3],
              [7.02,1.5, 4.2, 4]])

y = [12.74032243,
     14.70394453, 
     13.0340055,   
     9.21716328, 
     16.17134531, 
     11.07798964,
     11.9263585,
     14.15243011,
     11.95204867,
     12.46586602,
     11.12031365,
     15.75806083,
     12.81630525, 
     11.0979451,  
     14.74765055, 
     6.38894185, 
     12.47034915, 
     4.09862906,
     12.36833522, 
     13.20117178]

print("Training parameters:")
print(X)
print("Training target variables:")
print(y)

# Create and train the model
model = RandomForestRegressor()
model.fit(X, y)

# Make predictions on new data
# next 12 month for example
new_data = np.array([[5.3, 1.1, 2.4, 3.7],
                     [7.8, 2.2, 3.5, 4.8],
                     [9.1, 3.3, 4.6, 5.6],
                     [6.3, 1.4, 2.4, 3.7],
                     [7.1, 2.4, 3.5, 4.8],
                     [1.9, 3.3, 4.6, 5.9],
                     [4.3, 1.9, 2.4, 3.3],
                     [3.8, 2.8, 3.5, 2.8],
                     [8.1, 3.4, 4.6, 5.2],
                     [9.9, 3.6, 2.6, 4.9],
                     [4.5, 2.7, 4.9, 3.8],
                     [6.5, 3.1, 1.7, 5.3]])

predictions = model.predict(new_data)

# Print the feature importances and predictions
print("Feature Importances:", model.feature_importances_)
print("Predictions:")
for prediction in predictions:
    print(prediction)
