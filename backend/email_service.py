"""Email delivery for the portfolio contact form.

Pure email logic — no web framework in here. Builds an EmailMessage and
sends it over SMTP with smtplib.
"""

import logging
import smtplib
from email.message import EmailMessage

from config import SMTPConfig, load_smtp_config

logger = logging.getLogger(__name__)


class EmailSendError(RuntimeError):
    """Raised when the message could not be handed to the SMTP server."""


def build_message(name: str, email: str, message: str, config: SMTPConfig) -> EmailMessage:
    """Compose the notification email sent to the site owner."""
    msg = EmailMessage()
    msg["Subject"] = f"Portfolio contact form: {name}"
    msg["From"] = config.sender
    msg["To"] = config.recipient
    # Hitting "Reply" in the inbox answers the visitor, not yourself.
    msg["Reply-To"] = f"{name} <{email}>"

    msg.set_content(
        "New message from your portfolio contact form.\n\n"
        f"Name:    {name}\n"
        f"Email:   {email}\n\n"
        "Message:\n"
        f"{message}\n"
    )

    return msg


def send_contact_email(name: str, email: str, message: str, config: SMTPConfig | None = None) -> None:
    """Send the contact-form message. Raises EmailSendError on failure."""
    config = config or load_smtp_config()
    msg = build_message(name, email, message, config)

    try:
        if config.use_ssl:
            with smtplib.SMTP_SSL(config.host, config.port, timeout=config.timeout) as smtp:
                smtp.login(config.user, config.password)
                smtp.send_message(msg)
        else:
            with smtplib.SMTP(config.host, config.port, timeout=config.timeout) as smtp:
                smtp.ehlo()
                smtp.starttls()
                smtp.ehlo()
                smtp.login(config.user, config.password)
                smtp.send_message(msg)
    except smtplib.SMTPAuthenticationError as exc:
        logger.exception("SMTP authentication failed")
        raise EmailSendError(
            "SMTP authentication failed. Check SMTP_USER and SMTP_PASSWORD "
            "(Gmail requires a 16-character App Password, not your normal password)."
        ) from exc
    except (smtplib.SMTPException, OSError) as exc:
        logger.exception("SMTP delivery failed")
        raise EmailSendError(f"Could not send the email: {exc}") from exc

    logger.info("Contact email delivered to %s", config.recipient)
