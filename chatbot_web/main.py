import nltk
nltk.download('punkt')
from nltk.stem.lancaster import LancasterStemmer
stemmer = LancasterStemmer()

import numpy
import tensorflow as tf
import tflearn
import random
import json
import pickle

from time import sleep

with open("intents.json") as file:
    data = json.load(file)

try:
    with open("data.pickle", "rb") as f:
        words, labels, training, output = pickle.load(f)
except:
    words = []
    labels = []
    docs_x = []
    docs_y = []
    for intent in data ["intents"]:
        for pattern in intent["patterns"]:
            wrds = nltk.word_tokenize(pattern)
            words.extend(wrds)
            docs_x.append(wrds)
            docs_y.append(intent["tag"])

        if intent["tag"] not in labels:
            labels.append(intent["tag"])

    words = [stemmer.stem(w.lower()) for w in words if w != "?"]
    words = sorted(list(set(words)))

    labels = sorted(labels)

    training = []
    output = []

    out_empty = [0 for _ in range(len(labels))]

    for x, doc in enumerate(docs_x):
        bag = []

        wrds = [stemmer.stem(w) for w in doc]

        for w in words:
            if w in wrds:
                bag.append(1)
            else:
                bag.append(0)


        output_row = out_empty[:]
        output_row[labels.index(docs_y[x])] = 1

        training.append(bag)
        output.append(output_row)


    training = numpy.array(training)
    output = numpy.array(output)

    with open("data.pickle", "wb") as f:
        pickle.dump((words, labels, training, output), f)

# tf.reset_default_graph()
tf.compat.v1.reset_default_graph()

net = tflearn.input_data(shape=[None, len(training[0])])
net = tflearn.fully_connected(net, 8)
net = tflearn.fully_connected(net, 8)
net = tflearn.fully_connected(net, len(output[0]), activation = "softmax")
net = tflearn.regression(net)

model = tflearn.DNN(net)

try:
    model.load("model.tflearn")
except:
    model.fit(training, output, n_epoch=1000, batch_size=8, show_metric=True)
    model.save("model.tflearn")

def bag_of_words(s, words):
    bag = [0 for _ in range(len(words))]

    s_words = nltk.word_tokenize(s)
    s_words = [stemmer.stem(word.lower()) for word in s_words]

    for se in s_words:
        for i, w in enumerate(words):
            if w == se:
                bag[i] = 1
            
    return numpy.array(bag)



import numpy
from time import sleep

# Flag to control the chatbot's running state
chatbot_running = True

def process(message):
    global chatbot_running  # Ensure we can modify the running state from within the function
    inp = message
    results = model.predict([bag_of_words(inp, words)])[0]
    results_index = numpy.argmax(results)
    tag = labels[results_index]
    
    if results[results_index] > 0.8:
        for tg in data["intents"]:
            if tg['tag'] == tag:
                patterns = tg['patterns']
                responses = tg['responses']
                
                # Check if the tag is "goodbye" to end the conversation
                if tag == "goodbye":
                    chatbot_running = False
                    return "Goodbye! Wishing you success in your job search."
                else:
                    chatbot_running = True
                
                # Find the index of the matching pattern
                try:
                    pattern_index = patterns.index(message)
                except ValueError:
                    pattern_index = 0  # Default to the first response if the pattern is not found
                
                # Get the corresponding response
                Bot = responses[pattern_index % len(responses)]
                
                sleep(3)
                return Bot
    else:
        return "I don't understand!"


from flask import Flask, render_template, request
from flask_cors import CORS
app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return render_template("index.html")

@app.route("/get", methods=['POST'])
def get_bot_reponse():
    print(request.get_json())
    userText = request.get_json()['msg']
    return (
        {
            'message' : str(process(userText)),
            'running' : chatbot_running
        })

if __name__ == "__main__":
   # app.run(debug=True)
     app.run(port=5001)



# Main loop for the chatbot
while chatbot_running:
    user_input = input("You: ")
    response = process(user_input)
    print(f"Bot: {response}")
