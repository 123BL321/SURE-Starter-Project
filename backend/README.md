# Backend (Flask) for Image Uploads

Run server (macOS / Linux / WSL):

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python app.py
```

The server listens on port `8000` and exposes:
- `POST /upload` — multipart form upload (field name `image`)
- `GET /uploads/<filename>` — serves uploaded files
