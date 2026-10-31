/**
 * WhatsApp deep links for RSVP confirmations.
 *
 * Guests tap "Send on WhatsApp" after the form saves; WhatsApp opens with the
 * RSVP prefilled. With a configured number it opens the couple's chat
 * (wa.me/<number>); without one it opens WhatsApp's share picker (wa.me/?text=)
 * so the guest picks any chat. Set COUPLE_WHATSAPP_NUMBER once the number is
 * known — digits only, no plus sign, e.g. "27821234567".
 */

export const COUPLE_WHATSAPP_NUMBER = ""; // e.g. "27821234567" — digits only, no +

export function buildRsvpMessage(
  fullName: string,
  attending: string,
  guests: number,
  message = "",
): string {
  const verb = attending === "yes" ? "Joyfully accepting" : "Regretfully declining";
  const lines = [
    "RSVP — Tebogo & Mpho, 27 December 2026, Nandoni Riverview",
    `Name: ${fullName}`,
    `Attending: ${verb}`,
    `Guests: ${guests}`,
  ];
  if (message) lines.push(`Note: ${message}`);
  return lines.join("\n");
}

export function buildWhatsappLink(
  fullName: string,
  attending: string,
  guests: number,
  message = "",
  number: string | null = null,
): string {
  const num = number === null ? COUPLE_WHATSAPP_NUMBER : number;
  const text = encodeURIComponent(buildRsvpMessage(fullName, attending, guests, message));
  return num && /^\d+$/.test(num)
    ? `https://wa.me/${num}?text=${text}`
    : `https://wa.me/?text=${text}`;
}
