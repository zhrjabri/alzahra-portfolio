"""Validation for incoming contact-form submissions."""

import re

# Deliberately permissive but structural: local@domain.tld
EMAIL_RE = re.compile(r"^[A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}$")

NAME_MIN, NAME_MAX = 2, 100
EMAIL_MAX = 254
MESSAGE_MIN, MESSAGE_MAX = 10, 5000


class ValidationError(ValueError):
    """Carries per-field error messages back to the API layer."""

    def __init__(self, errors: dict[str, str]):
        super().__init__("Invalid form data")
        self.errors = errors


def _clean(value: object) -> str:
    return value.strip() if isinstance(value, str) else ""


def validate_contact_form(payload: object) -> dict[str, str]:
    """Return cleaned {name, email, message} or raise ValidationError."""
    if not isinstance(payload, dict):
        raise ValidationError({"form": "Expected a JSON object."})

    name = _clean(payload.get("name"))
    email = _clean(payload.get("email"))
    message = _clean(payload.get("message"))

    errors: dict[str, str] = {}

    if not name:
        errors["name"] = "Name is required."
    elif len(name) < NAME_MIN:
        errors["name"] = f"Name must be at least {NAME_MIN} characters."
    elif len(name) > NAME_MAX:
        errors["name"] = f"Name must be under {NAME_MAX} characters."

    if not email:
        errors["email"] = "Email is required."
    elif len(email) > EMAIL_MAX or not EMAIL_RE.match(email):
        errors["email"] = "Please enter a valid email address."

    if not message:
        errors["message"] = "Message is required."
    elif len(message) < MESSAGE_MIN:
        errors["message"] = f"Message must be at least {MESSAGE_MIN} characters."
    elif len(message) > MESSAGE_MAX:
        errors["message"] = f"Message must be under {MESSAGE_MAX} characters."

    # Header-injection guard: newlines in name/email would let a sender
    # forge extra mail headers once these values are placed in Subject/Reply-To.
    for field, value in (("name", name), ("email", email)):
        if "\n" in value or "\r" in value:
            errors[field] = "Invalid characters."

    if errors:
        raise ValidationError(errors)

    return {"name": name, "email": email, "message": message}
