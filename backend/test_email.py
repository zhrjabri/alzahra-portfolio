"""Send one real test email using the credentials in .env.

Usage:  python test_email.py

Verifies the SMTP half of the flow on its own, without the website running.
"""

import sys

from config import ConfigError, load_smtp_config
from email_service import EmailSendError, send_contact_email


def main() -> int:
    try:
        config = load_smtp_config()
    except ConfigError as exc:
        print(f"[FAIL] {exc}")
        return 1

    print(f"Sending via {config.host}:{config.port} as {config.user} -> {config.recipient} ...")

    try:
        send_contact_email(
            name="SMTP Test",
            email="test@example.com",
            message="This is a test message from test_email.py. If you are reading it in your inbox, the contact form backend works.",
            config=config,
        )
    except EmailSendError as exc:
        print(f"[FAIL] {exc}")
        return 1

    print(f"[OK] Test email sent. Check the inbox of {config.recipient} (also check Spam).")
    return 0


if __name__ == "__main__":
    sys.exit(main())
