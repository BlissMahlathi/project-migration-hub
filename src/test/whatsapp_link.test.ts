import { describe, expect, it } from "vitest";

import { buildRsvpMessage, buildWhatsappLink } from "@/lib/whatsapp";

describe("WhatsApp RSVP links", () => {
  it("builds the share-picker link when no number is configured", () => {
    const link = buildWhatsappLink("Ana Guest", "yes", 2);
    expect(link).toMatch(/^https:\/\/wa\.me\/\?text=/);
    expect(link).toContain(encodeURIComponent("RSVP — Tebogo & Mpho"));
    expect(link).toContain(encodeURIComponent("Name: Ana Guest"));
  });

  it("opens the couple's chat when a digits-only number is set", () => {
    const link = buildWhatsappLink("Ana Guest", "no", 1, "", "27821234567");
    expect(link).toMatch(/^https:\/\/wa\.me\/27821234567\?text=/);
    expect(link).toContain(encodeURIComponent("Regretfully declining"));
  });

  it("falls back to the share picker for a malformed number", () => {
    const link = buildWhatsappLink("A", "yes", 1, "", "+27 82");
    expect(link).toMatch(/^https:\/\/wa\.me\/\?text=/);
  });

  it("includes the guest note only when present", () => {
    expect(buildRsvpMessage("A", "yes", 1)).not.toContain("Note:");
    expect(buildRsvpMessage("A", "yes", 1, "Congratulations!")).toContain("Note: Congratulations!");
  });
});
