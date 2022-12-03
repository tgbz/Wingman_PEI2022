from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import os
import textparse as tp



app = Flask(__name__)
app.config["DEBUG"] = True



CORS(app, resources={r"/api/*": {"origins": "*"}})
app.config['CORS_HEADERS'] = 'Content-Type'


@app.route('/', methods=['GET'])
def home():
    return "<h1>PUTAS E VINHO verde <h1/>"


@app.route('/upload', methods=['POST'])
@cross_origin(origin='*', headers=['Content-Type'])
def upload_single_image():
    if request.method == "POST":
        file = request.files['file']
        try:
            file.save(os.getcwd() + "/receivedFiles/" + file.filename)
            try:
                text = tp.parse(os.getcwd() + "/receivedFiles/" + file.filename)
                return jsonify(text)
            except:
                return jsonify("Error parsing text")
        except FileNotFoundError:
            return "Folder not on path"
        
if __name__ == "__main__":
    app.run(debug=True, port=5000, host="0.0.0.0")
    
app.run()



