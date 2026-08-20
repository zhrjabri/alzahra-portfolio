"""CSV log of contact-form submissions.

The converter logged one row per conversion; this logs one row per message
sent through the website, to backend/logs/contact_log.csv. The file is
created (with its header row) on the first submission.
"""

import csv
import logging
from datetime import datetime

from config import CSV_HEADERS, LOG_FILE, LOGS_DIR

logger = logging.getLogger(__name__)


def log_submission(name: str, email: str, message: str, status: str = "Sent") -> None:
    """Append one submission to the CSV log.

    Never raises: a log-file problem must not turn a delivered email into an
    error for the visitor.
    """
    now = datetime.now()
    row = [
        now.strftime("%Y-%m-%d"),
        now.strftime("%H:%M:%S"),
        name,
        email,
        message,
        status,
    ]

    try:
        LOGS_DIR.mkdir(parents=True, exist_ok=True)
        needs_header = not LOG_FILE.exists() or LOG_FILE.stat().st_size == 0

        # newline="" so the csv module controls line endings on Windows.
        with LOG_FILE.open("a", newline="", encoding="utf-8") as handle:
            writer = csv.writer(handle)
            if needs_header:
                writer.writerow(CSV_HEADERS)
            writer.writerow(row)
    except OSError as exc:
        logger.warning("Could not write to %s: %s", LOG_FILE, exc)


def read_submissions() -> list[dict[str, str]]:
    """Return every logged submission, oldest first (empty if no log yet)."""
    if not LOG_FILE.exists():
        return []

    with LOG_FILE.open("r", newline="", encoding="utf-8") as handle:
        return list(csv.DictReader(handle))
