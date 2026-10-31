import { useState, type FormEvent } from "react";
import { supabase } from "@/integrations/supabase/client";
import { rsvp } from "@/data/wedding";
import { Reveal } from "@/components/Reveal";

type Status = "idle" | "sending" | "done" | "error";

const inputClass =
  "w-full rounded-xl border border-accent/30 bg-background px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/60";

const labelClass =
  "mb-1.5 block font-body text-[0.6rem] tracking-[0.3em] text-muted-foreground uppercase";

export function RsvpSection() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [attending, setAttending] = useState<"yes" | "no">("yes");
  const [guests, setGuests] = useState(1);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const name = fullName.trim();
    if (!name) {
      setError("Please enter your full name.");
      return;
    }
    const trimmedEmail = email.trim();
    if (
      trimmedEmail &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)
    ) {
      setError("Please enter a valid email address.");
      return;
    }
    setError(null);
    setStatus("sending");
    const { error: dbError } = await supabase.from("rsvps").insert({
      full_name: name,
      email: trimmedEmail || null,
      phone: phone.trim() || null,
      attending,
      guests,
      message: message.trim() || null,
    });
    if (dbError) {
      setStatus("error");
      setError(rsvp.errorBody);
      return;
    }
    setStatus("done");
  }

  return (
    <section
      id="rsvp"
      className="relative overflow-hidden bg-foreground py-20 sm:py-28"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse 70% 45% at 50% 100%, oklch(0.45 0.08 55 / 0.6), transparent 70%)",
        }}
      />
      <div className="relative mx-auto max-w-2xl px-6">
        <Reveal className="text-center">
          <p className="font-body text-[0.65rem] tracking-[0.5em] text-accent uppercase">
            {rsvp.kicker}
          </p>
          <h2 className="mt-3 font-display text-4xl tracking-[0.08em] text-secondary sm:text-5xl">
            {rsvp.title}
          </h2>
          <p className="mt-2 font-script text-3xl text-secondary/85 sm:text-4xl">
            {rsvp.script}
          </p>
          <div className="divider-ornament mt-6 justify-center" />
          <p className="mx-auto mt-5 max-w-md font-body text-sm leading-relaxed font-light text-secondary/85">
            {rsvp.body}
          </p>
        </Reveal>

        <Reveal className="mt-10">
          <div className="rounded-3xl bg-card px-6 py-8 shadow-[0_30px_70px_-35px_oklch(0.15_0.03_48/0.9)] sm:px-10 sm:py-10">
            {status === "done" ? (
              <div className="py-6 text-center">
                <p className="font-script text-4xl text-primary">
                  {rsvp.successTitle}
                </p>
                <div className="divider-ornament mt-5 justify-center" />
                <p className="mt-5 font-body text-[0.95rem] leading-relaxed font-light text-muted-foreground">
                  {rsvp.successBody}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <div>
                  <label htmlFor="rsvp-name" className={labelClass}>
                    {rsvp.nameLabel} *
                  </label>
                  <input
                    id="rsvp-name"
                    className={inputClass}
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Your name & surname"
                    maxLength={120}
                    required
                  />
                </div>

                <div className="mt-5 grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="rsvp-email" className={labelClass}>
                      {rsvp.emailLabel}
                    </label>
                    <input
                      id="rsvp-email"
                      type="email"
                      className={inputClass}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      maxLength={255}
                    />
                  </div>
                  <div>
                    <label htmlFor="rsvp-phone" className={labelClass}>
                      {rsvp.phoneLabel}
                    </label>
                    <input
                      id="rsvp-phone"
                      type="tel"
                      className={inputClass}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. 082 123 4567"
                      maxLength={40}
                    />
                  </div>
                </div>

                <div className="mt-5">
                  <span className={labelClass}>{rsvp.attendingLabel}</span>
                  <div className="grid grid-cols-2 gap-3">
                    {(
                      [
                        ["yes", rsvp.accept],
                        ["no", rsvp.decline],
                      ] as const
                    ).map(([value, label]) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => setAttending(value)}
                        aria-pressed={attending === value}
                        className={`rounded-xl border px-4 py-3 font-body text-sm transition-colors ${
                          attending === value
                            ? "border-accent bg-accent/15 font-medium text-accent-foreground"
                            : "border-border bg-background text-muted-foreground hover:border-accent/50"
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-5">
                  <label htmlFor="rsvp-guests" className={labelClass}>
                    {rsvp.guestsLabel}
                  </label>
                  <select
                    id="rsvp-guests"
                    className={inputClass}
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                  >
                    {[1, 2, 3, 4, 5, 6].map((n) => (
                      <option key={n} value={n}>
                        {n} {n === 1 ? "guest" : "guests"}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mt-5">
                  <label htmlFor="rsvp-message" className={labelClass}>
                    {rsvp.messageLabel}
                  </label>
                  <textarea
                    id="rsvp-message"
                    className={`${inputClass} min-h-24 resize-none`}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={rsvp.messagePlaceholder}
                    maxLength={600}
                  />
                </div>

                {error ? (
                  <p className="mt-4 font-body text-sm text-destructive">
                    {error}
                  </p>
                ) : null}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="mt-7 w-full rounded-full bg-accent px-6 py-3.5 font-display text-base tracking-[0.15em] text-accent-foreground uppercase shadow-[0_10px_30px_-12px_oklch(0.68_0.1_80/0.7)] transition-all hover:bg-secondary hover:shadow-[0_12px_34px_-10px_oklch(0.78_0.09_82/0.8)] disabled:opacity-60"
                >
                  {status === "sending" ? rsvp.sending : rsvp.submit}
                </button>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
