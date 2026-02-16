from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import os
import uuid

BASE_DIR = os.path.dirname(__file__)
UPLOAD_FOLDER = os.path.join(BASE_DIR, 'uploads')
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

app = Flask(__name__)
CORS(app)


@app.route('/upload', methods=['POST'])
def upload():
    if 'image' not in request.files:
        return jsonify({'error': 'no image field in request'}), 400
    file = request.files['image']
    if file.filename == '':
        return jsonify({'error': 'empty filename'}), 400
    filename = f"{uuid.uuid4().hex}_{file.filename}"
    save_path = os.path.join(UPLOAD_FOLDER, filename)
    file.save(save_path)
    size = os.path.getsize(save_path)
    return jsonify({'filename': filename, 'size': size}), 200


@app.route('/uploads/<path:filename>')
def uploaded_file(filename):
    return send_from_directory(UPLOAD_FOLDER, filename)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000, debug=True)
