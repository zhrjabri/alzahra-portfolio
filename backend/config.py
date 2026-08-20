"""Configuration for the portfolio contact-form backend.

Same layout as the currency-converter config (paths, timeouts, CSV headers,
SMTP settings in one place) — adapted to this website:

  * there is no exchange-rate API here, so the API section describes the
    Flask endpoints the Next.js form posts to;
  * the CSV log records contact-form submissions instead of conversions;
  * credentials are read from backend/.env only. They are NOT hardcoded as
    fallback defaults — a password written in a source file gets committed
    to git sooner or later, and Gmail revokes App Passwords that leak.
    See .env.example.
"""

import os
from dataclasses import dataclass
from pathlib import Path

from dotenv import load_dotenv

BASE_DIR = Path(__file__).resolve().parent

# Load backend/.env into the process environment.
load_dotenv(BASE_DIR / ".env")

# --- API ---------------------------------------------------------------
# Where this Flask app serves from. The frontend uses the same value via
# NEXT_PUBLIC_API_URL (components/Contact.tsx).
API_BASE_URL = os.getenv("API_BASE_URL", "http://127.0.0.1:5000").rstrip("/")
CONTACT_ENDPOINT = "/api/contact"
HEALTH_ENDPOINT = "/api/health"

# Seconds to wait on the network call. The only outbound call this backend
# makes is to the SMTP server, so this is the smtplib timeout.
REQUEST_TIMEOUT = int(os.getenv("SMTP_TIMEOUT", "20"))

# --- Log file ----------------------------------------------------------
LOGS_DIR = BASE_DIR / "logs"
LOG_FILE = LOGS_DIR / "contact_log.csv"

# CSV column headers
CSV_HEADERS = ["Date", "Time", "Name", "Email", "Message", "Status"]

# --- SMTP --------------------------------------------------------------
SMTP_SERVER = os.getenv("SMTP_HOST", "smtp.gmail.com").strip()
SMTP_PORT = int(os.getenv("SMTP_PORT", "587"))

# Where contact-form messages are delivered.
RECIPIENT_EMAIL = (os.getenv("MAIL_TO") or "aljabrialzahra1@gmail.com").strip()


class ConfigError(RuntimeError):
    """Raised when required SMTP settings are missing."""


@dataclass(frozen=True)
class SMTPConfig:
    host: str
    port: int
    user: str
    password: str
    sender: str
    recipient: str
    use_ssl: bool
    timeout: int


def _require(name: str) -> str:
    value = (os.getenv(name) or "").strip()
    if not value:
        raise ConfigError(
            f"Missing required environment variable '{name}'. "
            f"Add it to {BASE_DIR / '.env'} (copy .env.example to .env)."
        )
    return value


def load_smtp_config() -> SMTPConfig:
    """Read and validate SMTP settings. Raises ConfigError if incomplete."""
    user = _require("SMTP_USER")
    password = _require("SMTP_PASSWORD")

    # Gmail rejects a From that isn't the authenticated account, so default to it.
    sender = (os.getenv("MAIL_FROM") or user).strip()

    # Port 465 is implicit TLS (SMTP_SSL); 587 is STARTTLS.
    use_ssl = os.getenv("SMTP_USE_SSL", "").strip().lower() in {"1", "true", "yes"} or SMTP_PORT == 465

    return SMTPConfig(
        host=SMTP_SERVER,
        port=SMTP_PORT,
        user=user,
        password=password,
        sender=sender,
        recipient=RECIPIENT_EMAIL,
        use_ssl=use_ssl,
        timeout=REQUEST_TIMEOUT,
    )


def allowed_origins() -> list[str]:
    """Origins allowed to call the API (comma-separated in .env)."""
    raw = os.getenv("ALLOWED_ORIGINS", "http://localhost:3000,http://127.0.0.1:3000")
    return [o.strip() for o in raw.split(",") if o.strip()]


def server_port() -> int:
    return int(os.getenv("PORT", "5000").strip())
