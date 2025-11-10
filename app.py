from flask import Flask, request, jsonify
import requests
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

NODEMAILER_URL = "http://localhost:3000/sendMail"  # Node.js mailer endpoint

@app.route("/submit", methods=["POST"])
def submit():
    data = request.get_json()
    email = data.get("email")
    reason = data.get("reason")

    # Send data to Node mailer service
    payload = {"email": email, "reason": reason}
    try:
        res = requests.post(NODEMAILER_URL, json=payload)
        if res.status_code == 200:
            return jsonify({"message": "Thanks for your interest! We’ll reach out soon."})
        else:
            return jsonify({"message": "Failed to send mail."}), 500
    except Exception as e:
        print(e)
        return jsonify({"message": "Server error."}), 500

if __name__ == "__main__":
    app.run(debug=True)
