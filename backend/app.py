"""Flask API that receives contact-form submissions and emails them.

Flow:  Contact form (Next.js)  ->  POST /api/contact  ->  smtplib/SMTP  ->  inbox
"""

import logging

from flask import Flask, jsonify, request
from flask_cors import CORS

from config import ConfigError, allowed_origins, load_smtp_config, server_port
from contact_log import log_submission
from email_service import EmailSendError, send_contact_email
from validation import ValidationError, validate_contact_form

logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(name)s: %(message)s")
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": allowed_origins()}})


@app.get("/api/health")
def health():
    """Reports whether SMTP settings are present (never echoes the password)."""
    try:
        config = load_smtp_config()
    except ConfigError as exc:
        return jsonify({"status": "misconfigured", "detail": str(exc)}), 500

    return jsonify(
        {
            "status": "ok",
            "smtp_host": config.host,
            "smtp_port": config.port,
            "sends_to": config.recipient,
        }
    )


@app.post("/api/contact")
def contact():
    try:
        data = validate_contact_form(request.get_json(silent=True))
    except ValidationError as exc:
        return jsonify({"success": False, "error": "Please check the form fields.", "errors": exc.errors}), 400

    try:
        send_contact_email(data["name"], data["email"], data["message"])
    except ConfigError as exc:
        logger.error("Configuration problem: %s", exc)
        log_submission(**data, status="Failed (not configured)")
        return jsonify({"success": False, "error": "The mail server is not configured. Please email directly."}), 500
    except EmailSendError as exc:
        logger.error("Send failed: %s", exc)
        log_submission(**data, status="Failed (SMTP error)")
        return jsonify({"success": False, "error": "Something went wrong while sending. Please try again."}), 502

    log_submission(**data, status="Sent")
    return jsonify({"success": True, "message": "Message sent successfully!"})


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=server_port(), debug=False)
