# Import necessary libraries
from flask import Flask, request, jsonify
from gensim.models.doc2vec import Doc2Vec
from nltk.tokenize import word_tokenize
from numpy.linalg import norm
import numpy as np
import re
import PyPDF2
import os
from flask_cors import CORS

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Load the pre-trained model
model = Doc2Vec.load('cv_job_maching.model')

# Function to preprocess text
def preprocess_text(text):
    text = text.lower()
    text = re.sub('[^a-z]', ' ', text)
    text = re.sub(r'\d+', '', text)
    text = ' '.join(text.split())
    return text

@app.route('/', methods=['GET'])  
def MATCH():
    print("hello world")
    return "hello world"
# Route for uploading and processing the CV and JD
@app.route('/match', methods=['POST'])
def match_cv_jd():
    # Check if the post request has the file part
    print("Received files:", request.files)
    print("Received form:", request.form)
    if 'cv' not in request.files:
        #print(request.files['cv'])
        return jsonify({"error": "No CV file part"}), 400
    if 'jd' not in request.form:
        return jsonify({"error": "No JD provided"}), 400

    cv_file = request.files['cv']
    jd = request.form['jd']

    if cv_file.filename == '':
        return jsonify({"error": "No selected CV file"}), 400

    if cv_file:
        # Read the CV
        pdf = PyPDF2.PdfReader(cv_file)
        resume = ""
        for i in range(len(pdf.pages)):
            pageObj = pdf.pages[i]
            resume += pageObj.extract_text()

        # Preprocess the texts
        input_CV = preprocess_text(resume)
        input_JD = preprocess_text(jd)

        # Infer vectors
        v1 = model.infer_vector(input_CV.split())
        v2 = model.infer_vector(input_JD.split())

        # Calculate similarity
        similarity = 100 * (np.dot(np.array(v1), np.array(v2))) / (norm(np.array(v1)) * norm(np.array(v2)))
        similarity = round(similarity, 2)

        # Return the result as JSON
        return jsonify({"similarity": similarity})

    return jsonify({"error": "Invalid request"}), 400

# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True, port=6120)

# # test_scipy.py
# from scipy.linalg import triu
# print("triu imported successfully")
