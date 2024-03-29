# Dependencies
from flask import Flask, request, jsonify
import joblib
import traceback
import pandas as pd
import numpy as np
import sys
import json
import tensorflow as tf
import pickle
from tensorflow import keras

# Your API definition
app = Flask(__name__)

dictionary={}

@app.route('/predict', methods=['POST'])
def predict():
    if lr:
        try:
            # json_ = request.json()
            json_=json.dumps(dictionary)
            print(json_)
            query = pd.get_dummies(pd.DataFrame(eval((json_)),index=[0]))
            query = query.reindex(columns="model_columns.pkl", fill_value=0)

            prediction = list(lr.predict(query))

            return jsonify({'prediction': str(prediction)})

        except:

            return jsonify({'trace': traceback.format_exc()})
    else:
        print ('Train the model first')
        return ('No model here to use')

if __name__ == '__main__':
    try:
        port = int(sys.argv[1]) # This is for a command-line input
    except:
        port = 3000 # If you don't provide any port the port will be set to 12345

    # lr = pickle.load(open('model.pkl','rb')) # Load "model.pkl"
    # with open('model.pkl') as fin:
    #     lr = pickle.load(fin)
    
    lr = joblib.load('model.pkl')
    print ('Model loaded')
    # model_columns = keras.models.load_model("model_columns.pkl") # Load "model_columns.pkl"
    print ('Model columns loaded')

    app.run(port=port, debug=True)
