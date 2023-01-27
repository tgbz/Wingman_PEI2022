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

@app.route('/upload', methods=['POST'])
@cross_origin(origin='*', headers=['Content-Type'])
def upload_image():
    if request.method == "POST":
        print("Request received...")

        if not os.path.exists(fileDir):
            os.makedirs(fileDir)

        fpaths = []
        fnames = []
        for k in request.files.keys():
            file = request.files[k]
            filePath = fileDir + file.filename
            fnames.append(file.filename)
            file.save(filePath)
            fpaths.append(filePath)

        print("Parsing images (" + ', '.join(str(x) for x in fnames)+')...')
        text = tp.parseImage(fpaths)
        print("Done!\nCleaning up...")

        for f in fpaths:
            os.remove(f)
        #os.rmdir(fileDir)

        print("Done!")
        return jsonify(text)


if __name__ == "__main__":
    app.run(debug=False, port=5003, host="0.0.0.0")
