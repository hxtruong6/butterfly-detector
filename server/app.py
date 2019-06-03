import os
from flask import Flask, flash, request, redirect, url_for
from werkzeug.utils import secure_filename
import sys
# sys.path.insert(0, '/media/hxtruong/Data/College/HK_VI/ML/YoloV3/Butterfly-yolov3/python/')
# import darknet
import subprocess

UPLOAD_FOLDER = './'
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
    result = None
    if request.method == 'POST':
        # check if the post request has the file part
        # print("xxx001 " + request.files)
        # if 'image' not in request.files:
        #     flash('No file part')
        #     return "No image"
        # file = request.files['image']
        # print("xxx 001 " + file)
        # if file.filename == '':
        #     flash('No selected file')
        #     return "No image"
        # if file and allowed_file(file.filename):
        #     filename = secure_filename(file.filename)
        #     file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        #     return redirect(url_for('uploaded_file',
        #                             filename=filename))
        image_path = b'./CommonBuckeye-0417.jpg'
        result = detect(image_path)

    return b"The processed image: " + result


if __name__ == '__main__':
    app.run()
