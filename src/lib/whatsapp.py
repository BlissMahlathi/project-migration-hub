"""WhatsApp deep links for RSVP confirmations.

Guests tap "Send on WhatsApp" after the form saves; WhatsApp opens with the
RSVP prefilled. With a configured number it opens the couple's chat
(wa.me/<number>); without one it opens WhatsApp's share picker (wa.me/?text=)
so the guest picks any chat. Set `couple_whatsapp_number` once the number is
known — E.164 digits only, no plus sign, e.g. 27821234567.
"""

import urllib.parse

COUPLE_WHATSAPP_NUMBER = ""  # e.g. "27821234567" — digits only, no +


def build_rsvp_message(full_name: str, attending: str, guests: int, message: str = "") -> str:
    verb = "Joyfully accepting" if attending == "yes" else "Regretfully declining"
    lines = [
        "RSVP — Tebogo & Mpho, 27 December 2026, Nandoni Riverview",
        f"Name: {full_name}",
        f"Attending: {verb}",
        f"Guests: {guests}",
    ]
    if message:
        lines.append(f"Note: {message}")
    return "\n".join(lines)


def build_whatsapp_link(full_name: str, attending: str, guests: int, message: str = "",
                        number: str | None = None) -> str:
    num = COUPLE_WHATSAPP_NUMBER if number is None else number
    text = urllib.parse.quote(build_rsvp_message(full_name, attending, guests, message))
    if num and num.isdigit():
        return f"https://wa.me/{num}?text={text}"
    return f"https://wa.me/?text={text}"
