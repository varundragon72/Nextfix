import os
import json
import re
import secrets
import hmac
import hashlib
import time
from flask import Flask, request, jsonify, Response

app = Flask(__name__)
app.config['SECRET_KEY'] = secrets.token_hex(32)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
USERS_FILE = os.path.join(BASE_DIR, 'users.json')
VIDEOS_DIR = r"D:\Videos\movies"

# Active demo sessions: token -> {username, role, name, expires_at}
active_sessions = {}

# Allowlisted 8 movies strictly from D:\Videos\movies
ALLOWLISTED_MOVIES = {
    "dude": {
        "id": "dude",
        "title": "Dude",
        "filename": "Dude_2025_HQ_PreDVD_720p_HD__900_MB_.mp4",
        "poster": "Dude-2025.jpg",
        "year": 2025,
        "rating": "U/A 13+",
        "duration": "2h 15m",
        "category": "Comedy / Drama",
        "views": 48200,
        "featured": 1,
        "desc": "A vibrant youth drama capturing the emotional twists and turns of friendship, romance, and college life."
    },
    "dragon": {
        "id": "dragon",
        "title": "Dragon",
        "filename": "Dragon (2025) Proper HDRip Single Part (720p) HEVC.mp4",
        "poster": "dragon-2025",
        "year": 2025,
        "rating": "U/A 16+",
        "duration": "2h 30m",
        "category": "Action / Thriller",
        "views": 59100,
        "featured": 0,
        "desc": "An intense action thriller following a relentless protagonist facing insurmountable odds in a criminal underworld."
    },
    "lik": {
        "id": "lik",
        "title": "Lik",
        "displayTitle": "Love Insurance Kompany (Lik)",
        "filename": "Love_Insurance_Kompany_2026_HQ_PreDVD_720p_HD.mp4",
        "poster": "Lik-2026",
        "year": 2026,
        "rating": "U/A 13+",
        "duration": "2h 20m",
        "category": "Romance / Sci-Fi",
        "views": 37400,
        "featured": 0,
        "desc": "A futuristic romantic comedy revolving around a revolutionary company offering insurance policies against heartbreak."
    },
    "amaran": {
        "id": "amaran",
        "title": "Amaran",
        "filename": "Moviesda.Mobi - Amaran 2024 Original 720p HD.mp4",
        "poster": "Amaran-2025",
        "year": 2024,
        "rating": "U/A 16+",
        "duration": "2h 47m",
        "category": "Action / Biography",
        "views": 68900,
        "featured": 0,
        "desc": "The inspiring and valorous real-life journey of Major Mukund Varadarajan and his unwavering courage in the line of duty."
    },
    "adipurush": {
        "id": "adipurush",
        "title": "Adipurush",
        "filename": "Moviesda.Mobi - Adipurush 2023 Original 720p HD.mp4",
        "poster": "Aadhipurush-2023.jpg",
        "year": 2023,
        "rating": "U/A 13+",
        "duration": "2h 59m",
        "category": "Mythology / Action",
        "views": 51200,
        "featured": 0,
        "desc": "An epic saga inspired by the Ramayana portraying the grand battle between righteousness and demonic forces."
    },
    "sita-ramam": {
        "id": "sita-ramam",
        "title": "Sita Ramam",
        "filename": "Moviesda.Mobi - Sita Ramam 2022 Original 720p HD.mp4",
        "poster": "sita-ramam-2026.jpg",
        "year": 2022,
        "rating": "U",
        "duration": "2h 43m",
        "category": "Romance / Drama",
        "views": 72300,
        "featured": 0,
        "desc": "A timeless romantic classic set against a military backdrop, where letters of love cross insurmountable borders."
    },
    "moonu": {
        "id": "moonu",
        "title": "Moonu (3)",
        "filename": "Moonu (2012) HDRip Single Part (640x360).mp4",
        "poster": "moonu-2012.jpg",
        "year": 2012,
        "rating": "U/A 16+",
        "duration": "2h 25m",
        "category": "Romance / Psychological Drama",
        "views": 84500,
        "featured": 0,
        "desc": "A deeply emotional tale tracing the poignant love story of Ram and Janani from high school innocence to complex adulthood challenges."
    },
    "ponniyin-selvan": {
        "id": "ponniyin-selvan",
        "title": "Ponniyin Selvan: Part One",
        "filename": "Moviesda.Mobi - Ponniyin Selvan 2022 Original 720p HD.mp4",
        "poster": "ponniyin-selvan-2022.jpg",
        "year": 2022,
        "rating": "U/A 13+",
        "duration": "2h 47m",
        "category": "Historical / Action / Epic Drama",
        "views": 91200,
        "featured": 0,
        "desc": "Vandiyathevan sets out across the Chola realm to deliver a vital message, amidst a brewing conspiracy against the royal crown."
    }
}

# Alias map for clean lookups
MOVIE_ALIASES = {
    "dude": "dude", "dude.mp4": "dude",
    "dragon": "dragon", "dragon.mp4": "dragon",
    "lik": "lik", "lik.mp4": "lik", "love-insurance-kompany": "lik",
    "amaran": "amaran", "amaran.mp4": "amaran",
    "adipurush": "adipurush", "adipurush.mp4": "adipurush", "aadhipurush": "adipurush",
    "sita-ramam": "sita-ramam", "sita-ramam.mp4": "sita-ramam", "sitaramam": "sita-ramam",
    "moonu": "moonu", "moonu.mp4": "moonu", "3": "moonu",
    "ponniyin-selvan": "ponniyin-selvan", "ponniyinselvan": "ponniyin-selvan", "ps1": "ponniyin-selvan", "ponniyin-selvan.mp4": "ponniyin-selvan"
}

def load_users():
    if not os.path.exists(USERS_FILE):
        return []
    try:
        with open(USERS_FILE, 'r', encoding='utf-8') as f:
            return json.load(f)
    except Exception as e:
        print("Error loading users:", e)
        return []

def get_current_user():
    token = request.headers.get('x-token') or request.headers.get('Authorization', '')
    if token.startswith('Bearer '):
        token = token[7:]
    if not token or token not in active_sessions:
        return None
    session_data = active_sessions[token]
    if session_data['expires_at'] < time.time():
        del active_sessions[token]
        return None
    return session_data

@app.after_request
def add_cors_headers(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization, x-token, Range'
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'
    response.headers['Access-Control-Expose-Headers'] = 'Content-Range, Accept-Ranges, Content-Length'
    return response

@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({
        "status": "ok",
        "service": "NEXTFLIX Streaming API",
        "movies_available": len(ALLOWLISTED_MOVIES)
    })


@app.route('/api/login', methods=['POST', 'OPTIONS'])
def login():
    if request.method == 'OPTIONS':
        return ('', 204)
        
    data = request.get_json(silent=True) or {}
    username = str(data.get('username') or data.get('email') or data.get('account') or '').strip().lower()
    password = str(data.get('password') or '').strip()

    if not username or not password:
        return jsonify({"error": "Username and password are required"}), 400

    users = load_users()
    matched = None
    for u in users:
        if u.get('username', '').lower() == username and u.get('password') == password:
            matched = u
            break

    if not matched:
        return jsonify({"error": "Invalid username or password"}), 401

    token = secrets.token_hex(24)
    # Session lasts 24 hours for local demo
    active_sessions[token] = {
        "username": matched['username'],
        "role": matched.get('role', 'user'),
        "name": matched.get('name', matched['username']),
        "expires_at": time.time() + 86400
    }

    return jsonify({
        "success": True,
        "token": token,
        "user": {
            "username": matched['username'],
            "role": matched.get('role', 'user'),
            "name": matched.get('name', matched['username'])
        }
    })

@app.route('/api/session', methods=['GET', 'OPTIONS'])
def session_check():
    if request.method == 'OPTIONS':
        return ('', 204)
    user = get_current_user()
    if not user:
        return jsonify({"error": "Invalid or expired session"}), 401
    return jsonify({
        "ok": True,
        "user": {
            "username": user['username'],
            "role": user['role'],
            "name": user['name']
        }
    })

@app.route('/api/logout', methods=['POST', 'OPTIONS'])
def logout():
    token = request.headers.get('x-token') or request.headers.get('Authorization', '')
    if token.startswith('Bearer '):
        token = token[7:]
    if token in active_sessions:
        del active_sessions[token]
    return jsonify({"success": True})

@app.route('/api/movies/allowlisted', methods=['GET'])
def get_allowlisted_movies():
    """Returns the 6 allowlisted movies that exist locally on disk"""
    results = []
    for m in ALLOWLISTED_MOVIES.values():
        file_path = os.path.join(VIDEOS_DIR, m['filename'])
        exists = os.path.exists(file_path)
        results.append({
            "id": m['id'],
            "title": m.get('displayTitle', m['title']),
            "rawTitle": m['title'],
            "poster": m['poster'],
            "year": m['year'],
            "rating": m['rating'],
            "duration": m['duration'],
            "category": m['category'],
            "desc": m['desc'],
            "featured": m.get('featured', 0),
            "views": m.get('views', 0),
            "isAllowlisted": True,
            "fileExists": exists
        })
    return jsonify(results)

@app.route('/api/admin/videos', methods=['GET'])
def admin_videos():
    user = get_current_user()
    if not user or user.get('role') != 'admin':
        return jsonify({"error": "Admin login required"}), 401

    results = []
    for idx, (k, m) in enumerate(ALLOWLISTED_MOVIES.items(), start=1):
        file_path = os.path.join(VIDEOS_DIR, m['filename'])
        results.append({
            "id": idx,
            "slug": m['id'],
            "title": m.get('displayTitle', m['title']),
            "category": m['category'],
            "year": m['year'],
            "age_rating": m['rating'],
            "views": m.get('views', 0),
            "featured": m.get('featured', 0),
            "poster": m['poster'],
            "file": m['filename'],
            "exists": os.path.exists(file_path)
        })
    return jsonify(results)

@app.route('/api/videos/<id>/view', methods=['POST'])
def record_view(id):
    slug = MOVIE_ALIASES.get(str(id).lower())
    if slug and slug in ALLOWLISTED_MOVIES:
        ALLOWLISTED_MOVIES[slug]['views'] = ALLOWLISTED_MOVIES[slug].get('views', 0) + 1
    return jsonify({"ok": True})

@app.route('/api/stream/<path:movie_identifier>', methods=['GET'])
def stream_video(movie_identifier):
    """
    HTTP Range-based video streaming strictly for the 8 allowlisted movies.
    Rejects any other filename or path traversal attempt.
    """
    clean_id = movie_identifier.strip().lower()
    # Resolve aliases
    slug = MOVIE_ALIASES.get(clean_id)
    if not slug:
        # Check if matches any filename
        for k, v in ALLOWLISTED_MOVIES.items():
            if v['filename'].lower() == clean_id:
                slug = k
                break

    if not slug or slug not in ALLOWLISTED_MOVIES:
        return jsonify({
            "error": "Database Not Connected",
            "message": "This title is not available because persistent database integration is not currently connected."
        }), 404

    movie = ALLOWLISTED_MOVIES[slug]
    filename = movie['filename']
    video_path = os.path.join(VIDEOS_DIR, filename)

    if not os.path.exists(video_path):
        return jsonify({
            "error": "File Not Found",
            "message": f"The video stream for '{filename}' is currently unavailable."
        }), 404

    file_size = os.path.getsize(video_path)
    range_header = request.headers.get('Range', None)

    if not range_header:
        # Full content request
        def generate():
            with open(video_path, 'rb') as f:
                while chunk := f.read(1024 * 1024):
                    yield chunk
        return Response(generate(), mimetype='video/mp4', headers={
            'Accept-Ranges': 'bytes',
            'Content-Length': str(file_size)
        })

    # HTTP Range parsing for seeking (e.g. "bytes=1048576-")
    match = re.match(r'bytes=(\d+)-(\d*)', range_header)
    if not match:
        return Response(status=416, headers={'Content-Range': f'bytes */{file_size}'})

    start = int(match.group(1))
    end = int(match.group(2)) if match.group(2) else file_size - 1

    if start >= file_size or end >= file_size or start > end:
        return Response(status=416, headers={'Content-Range': f'bytes */{file_size}'})

    length = end - start + 1

    def generate_range():
        with open(video_path, 'rb') as f:
            f.seek(start)
            remaining = length
            while remaining > 0:
                chunk_size = min(1024 * 1024, remaining)
                chunk = f.read(chunk_size)
                if not chunk:
                    break
                remaining -= len(chunk)
                yield chunk

    response = Response(generate_range(), status=206, mimetype='video/mp4')
    response.headers['Content-Range'] = f'bytes {start}-{end}/{file_size}'
    response.headers['Accept-Ranges'] = 'bytes'
    response.headers['Content-Length'] = str(length)
    return response

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    print(f"Starting Python Flask backend on http://127.0.0.1:{port}")
    app.run(host='0.0.0.0', port=port, debug=True)
