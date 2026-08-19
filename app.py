from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import requests
import time
import os
from dotenv import load_dotenv

load_dotenv()
app = Flask(__name__, static_folder='.')
CORS(app)

REPLICATE_API_KEY = os.getenv("r8_NvQUNf8GnO7y1XeCmg79yOvm0nDdASZ3pfMet")

@app.route('/')
def index():
    return send_from_directory('.', 'index.html')

@app.route('/generate-video', methods=['POST'])
def generate_video():
    data = request.json
    prompt = data.get('prompt', '')
    
    if not prompt:
        return jsonify({"success": False, "error": "No prompt provided"}), 400

    headers = {
        "Authorization": f"Token {REPLICATE_API_KEY}",
        "Content-Type": "application/json"
    }
    
    payload = {
        "version": "stability-ai/stable-video-diffusion:3f0457e4619daac51203dedb4816d81fd4a095c8",
        "input": {
            "prompt": prompt,
            "fps": 8,
            "duration": 5
        }
    }

    response = requests.post(
        "https://api.replicate.com/v1/predictions",
        headers=headers,
        json=payload
    )

    if response.status_code != 201:
        return jsonify({"success": False, "error": "API Error"}), 500

    prediction = response.json()
    prediction_id = prediction["id"]

    for _ in range(60):
        time.sleep(5)
        check = requests.get(
            f"https://api.replicate.com/v1/predictions/{prediction_id}",
            headers=headers
        )
        result = check.json()
        
        if result["status"] == "succeeded":
            video_url = result["output"][0] if isinstance(result["output"], list) else result["output"]
            return jsonify({"success": True, "videoUrl": video_url})
        elif result["status"] == "failed":
            return jsonify({"success": False, "error": "Generation failed"}), 500

    return jsonify({"success": False, "error": "Timeout"}), 504

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=10000, debug=True)
