import os
from flask import Flask, flash, request, redirect, url_for
from werkzeug.utils import secure_filename
import sys
import subprocess

UPLOAD_FOLDER = './uploadFiles/'
ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg'])

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


def detect(imagePath):
    darknet = b'./darknet'
    dataFile = b'configFile/butterfly-obj.data'
    configFile = b'configFile/butterfly-yolov3.cfg'
    weightFile = b'butterfly-yolov3_6000.weights'
    result = subprocess.run([darknet, "detector", "test", dataFile, configFile, weightFile, imagePath],
                            capture_output=True)

    return result.stdout


@app.route('/image', methods=['GET', 'POST'])
def upload_file():
    # file = request.files['file']
    # return file.filename + 'fucking'
    result = None
    if request.method == 'POST':
        # check if the post request has the file part
        if 'file' not in request.files:
            flash('No file part')
            return "No image"
        file = request.files['file']
        if file.filename == '':
            flash('No selected file')
            return "No image"

        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            image_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            file.save(image_path)
            result = detect(image_path)

    return b"The processed image: " + result


if __name__ == '__main__':
    app.run()
