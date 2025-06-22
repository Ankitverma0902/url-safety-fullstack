from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import base64
import os
from dotenv import load_dotenv

load_dotenv()
app = Flask(__name__)
CORS(app)

API_KEY = os.getenv("VIRUSTOTAL_API_KEY")

def get_virustotal_report(url):
    headers = { "x-apikey": API_KEY }

    # Step 1: Encode URL
    url_id = base64.urlsafe_b64encode(url.encode()).decode().strip("=")

    # Step 2: Get cached report from VirusTotal
    vt_url = f"https://www.virustotal.com/api/v3/urls/{url_id}"
    response = requests.get(vt_url, headers=headers)

    if response.status_code != 200:
        return None

    data = response.json()["data"]["attributes"]

    return {
        "status": "unsafe" if data["last_analysis_stats"]["malicious"] > 0 else "safe",
        "malicious": data["last_analysis_stats"]["malicious"],
        "harmless": data["last_analysis_stats"]["harmless"],
        "suspicious": data["last_analysis_stats"]["suspicious"],
        "total": sum(data["last_analysis_stats"].values()),
        "community_score": data.get("total_votes", {}).get("malicious", 0) - data.get("total_votes", {}).get("harmless", 0),
        "engine_results": {
            engine: result["result"] or "clean"
            for engine, result in data["last_analysis_results"].items()
        }
    }

@app.route("/check", methods=["POST"])
def check():
    data = request.get_json()
    url = data.get("url")

    if not url:
        return jsonify({"error": "URL is required."}), 400

    result = get_virustotal_report(url)

    if not result:
        return jsonify({"error": "Unable to fetch report."}), 500

    return jsonify(result)

if __name__ == "__main__":
    app.run(debug=True)
