from flask import Flask, redirect, url_for, request, send_file
from flask_cors import CORS
import glob
import os
app = Flask(__name__)
app.config['SECRET_KEY'] = 'the quick brown fox jumps over the lazy   dog'
app.config['CORS_HEADERS'] = 'Content-Type'
CORS(app)

@app.route('/generate-visible')
def generate_visible():
    return 'Hello, World!'

@app.route('/uploader', methods = ['GET', 'POST'])
def upload_file():
   clearContent('uploads')
   if request.method == 'POST':
      f = request.files['file']
      imageName = f.filename
      f.save('uploads/'+"thermal."+imageName.split('.')[1])
      return 'file uploaded successfully'

@app.route('/get_image')
def get_image():
    if request.args.get('name') == 'thermal':
       filename = 'uploads/thermal.png'
    else:
       filename = 'error.gif'
    return send_file(filename, mimetype='image/gif')

def clearContent(path):
    delFiles = glob.glob(path+'/*')
    for filename in delFiles:
        os.remove(filename)
if __name__ == '__main__':
    app.debug=True
    app.run()
    app.run(debug=True)