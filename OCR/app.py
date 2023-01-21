from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from shutil import unpack_archive
import os
import textparse as tp


fileDir = os.getcwd() + "/receivedFiles/"

app = Flask(__name__)
app.config["DEBUG"] = True


CORS(app, resources={r"/api/*": {"origins": "*"}})
app.config['CORS_HEADERS'] = 'Content-Type'


@app.route('/', methods=['GET'])
def home():
    return "<h1>Olá<h1/>"


@app.route('/upload', methods=['POST'])
@cross_origin(origin='*', headers=['Content-Type'])
def upload_image():
    print("oi\n")
    if request.method == "POST":
        file = request.files['file']
        zipFilePath = fileDir + file.filename
        try:
            file.save(zipFilePath)
        except FileNotFoundError:
            #app.logger.warning("Folder not on path, creating")
            os.makedirs(fileDir)
            file.save(zipFilePath)
        # try:
        unpack_archive(zipFilePath, fileDir)
        os.remove(fileDir+file.filename)

        files = os.listdir(fileDir)
        files = [fileDir+f for f in files if os.path.isfile(fileDir+f)]
        print(files)
        #app.logger.info("Parsing image...")
        text = tp.parseImage(files)
        #app.logger.info("Done!\nCleaning up...")

        for f in files:
            os.remove(f)
        # os.rmdir(fileDir)

        # app.logger.info("Done!")
        return jsonify(text)
        # except:
        #   return jsonify("Error parsing text")


if __name__ == "__main__":
    app.run(debug=False, port=5003, host="0.0.0.0")
