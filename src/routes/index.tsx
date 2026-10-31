import { createFileRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { BookChapter } from "@/components/BookChapter";
import { Countdown } from "@/components/Countdown";
import { Reveal } from "@/components/Reveal";
import { RsvpSection } from "@/components/RsvpSection";
import { StoryBook } from "@/components/StoryBook";
import {
  ceremonyBanner,
  closingLine,
  couple,
  matrimonial,
  menu,
  menuNote,
  receptionGroups,
  venueSection,
  welcomeMessage,
  type ProgramGroup,
  type ProgramItem,
} from "@/data/wedding";
import couplePortrait from "@/assets/couple-portrait.jpg";
import venueChapel from "@/assets/venue-chapel.jpg";
import venueEntrance from "@/assets/venue-entrance.jpg";
import venueFountain from "@/assets/venue-fountain.jpg";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      {
        title: "Tebogo & Mpho — Wedding Programme · 27 December 2026",
      },
      {
        name: "description",
        content:
          "Welcome to the wedding celebration of Tebogo & Mpho — 27 December 2026 at Nandoni Riverview. Countdown, our love story, the matrimonial & reception programme, the menu, the venue and RSVP.",
      },
      {
        property: "og:title",
        content: "Tebogo & Mpho — Wedding Programme · 27 December 2026",
      },
      {
        property: "og:description",
        content:
          "Our love story, the order of the day and the menu — 27 December 2026 at Nandoni Riverview. Kindly RSVP.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

function Ornament({ className }: { className?: string }) {
  return (
    <div className={`divider-ornament ${className ?? ""}`} aria-hidden="true">
      <span className="block h-1.5 w-1.5 rotate-45 bg-accent" />
    </div>
  );
}

function Cover() {
  return (
    <section className="relative h-[100svh] overflow-hidden bg-foreground">
      <img
        src={couplePortrait}
        alt="Tebogo and Mpho"
        className="kenburns absolute inset-0 h-full w-full object-cover object-[50%_20%]"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, oklch(0.22 0.05 48 / 0.55), oklch(0.22 0.05 48 / 0.25) 35%, oklch(0.2 0.05 48 / 0.75) 100%)",
        }}
      />

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 py-14 text-center">
        <p className="font-body text-[0.65rem] tracking-[0.5em] text-secondary/90 uppercase sm:text-xs">
          The Wedding Celebration of
        </p>
        <h1 className="mt-4 font-script text-6xl text-secondary drop-shadow-[0_2px_12px_oklch(0.2_0.05_48/0.6)] sm:text-7xl lg:text-8xl">
          {couple.names}
        </h1>
        <Ornament className="mt-6" />
        <p className="mt-6 font-display text-xl tracking-[0.35em] text-background/95 sm:text-2xl">
          {couple.dateShort}
        </p>
        <p className="mt-2 font-body text-xs tracking-[0.35em] text-secondary/90 uppercase sm:text-sm">
          {couple.venue}
        </p>

        <Countdown />

        <div className="mt-7 max-w-md rounded-2xl border border-secondary/25 bg-background/12 px-6 py-5 backdrop-blur-md sm:mt-8">
          <p className="font-display text-lg text-secondary sm:text-xl">
            {welcomeMessage.title}
          </p>
          <p className="mt-2 font-body text-[0.8rem] leading-relaxed font-light text-background/90 sm:text-sm">
            {welcomeMessage.body}
          </p>
        </div>

        <div className="floaty absolute bottom-8 flex flex-col items-center gap-2">
          <span className="font-body text-[0.6rem] tracking-[0.45em] text-secondary/80 uppercase">
            Scroll
          </span>
          <span className="block h-8 w-px bg-gradient-to-b from-secondary to-transparent" />
        </div>
      </div>
    </section>
  );
}

function ProgramItemRow({ item }: { item: ProgramItem }) {
  return (
    <li className="flex gap-4">
      <span className="mt-0.5 w-9 shrink-0 text-right font-script text-xl text-accent">
        {item.num}
      </span>
      <div>
        <p className="font-display text-lg leading-snug text-secondary sm:text-xl">
          {item.title}
        </p>
        {item.note ? (
          <p className="mt-1 font-body text-sm leading-relaxed font-light text-secondary/80 italic">
            {item.note}
          </p>
        ) : null}
        {item.lines?.map((line) => (
          <p
            key={line}
            className="mt-1.5 font-body text-[0.8rem] leading-relaxed font-light text-secondary/70"
          >
            {line}
          </p>
        ))}
      </div>
    </li>
  );
}

function ProgramCard({
  label,
  group,
  children,
}: {
  label: string;
  group?: ProgramGroup;
  children?: ReactNode;
}) {
  return (
    <div className="relative rounded-3xl border border-accent/25 bg-card/5 p-6 backdrop-blur-sm sm:p-8">
      <p className="font-body text-[0.6rem] tracking-[0.45em] text-accent uppercase">
        {label}
      </p>
      {group ? (
        <h3 className="mt-2 font-display text-2xl text-secondary sm:text-3xl">
          {group.heading}
        </h3>
      ) : null}
      <div className="divider-ornament mt-4 self-start" />
      {group ? (
        <ul className="mt-6 space-y-5">
          {group.items.map((item) => (
            <ProgramItemRow key={`${item.num}-${item.title}`} item={item} />
          ))}
        </ul>
      ) : null}
      {children}
    </div>
  );
}

function Index() {
  return (
    <main className="bg-background">
      <Cover />
      <BookChapter />
      <StoryBook />

      {/* THE PROGRAMME */}
      <section
        id="programme"
        className="relative overflow-hidden bg-foreground py-20 sm:py-28"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(ellipse 70% 45% at 50% 0%, oklch(0.45 0.08 55 / 0.55), transparent 70%)",
          }}
        />
        <div className="relative mx-auto max-w-6xl px-6">
          <Reveal className="text-center">
            <p className="font-body text-[0.65rem] tracking-[0.5em] text-accent uppercase">
              Chapter Two
            </p>
            <h2 className="mt-3 font-display text-4xl tracking-[0.08em] text-secondary sm:text-5xl">
              THE ORDER OF THE DAY
            </h2>
            <p className="mt-2 font-script text-3xl text-secondary/85 sm:text-4xl">
              the programme
            </p>
            <Ornament className="mt-6" />
            <p className="mt-5 font-body text-sm tracking-[0.2em] text-secondary/80 uppercase">
              {couple.director}
            </p>
          </Reveal>

          <div className="mt-14 grid gap-8 lg:grid-cols-2">
            <Reveal>
              <ProgramCard label="Part I" group={matrimonial}>
                <div className="mt-8 rounded-2xl border border-accent/40 bg-accent/10 px-5 py-4 text-center">
                  <p className="font-display text-lg tracking-[0.12em] text-accent">
                    {ceremonyBanner}
                  </p>
                  <p className="mt-1 font-body text-xs font-light text-secondary/75">
                    served after the ceremony
                  </p>
                </div>
              </ProgramCard>
            </Reveal>
            <Reveal delay={120}>
              <ProgramCard label="Part II">
                {receptionGroups.map((group, gi) => (
                  <div key={group.heading} className={gi > 0 ? "mt-10" : ""}>
                    <h3 className="font-display text-2xl text-secondary sm:text-3xl">
                      {group.heading}
                    </h3>
                    <div className="divider-ornament mt-3 self-start" />
                    <ul className="mt-5 space-y-5">
                      {group.items.map((item) => (
                        <ProgramItemRow
                          key={`${item.num}-${item.title}`}
                          item={item}
                        />
                      ))}
                    </ul>
                  </div>
                ))}
              </ProgramCard>
            </Reveal>
          </div>
        </div>
      </section>

      {/* THE MENU */}
      <section id="menu" className="relative overflow-hidden bg-background py-20 sm:py-28">
        <div className="mx-auto max-w-4xl px-6">
          <Reveal className="text-center">
            <p className="font-body text-[0.65rem] tracking-[0.5em] text-accent uppercase">
              Chapter Three
            </p>
            <h2 className="mt-3 font-display text-4xl tracking-[0.08em] text-foreground sm:text-5xl">
              THE MENU
            </h2>
            <p className="mt-2 font-script text-3xl text-primary sm:text-4xl">
              a taste of the celebration
            </p>
            <Ornament className="mt-6" />
          </Reveal>

          <Reveal className="mt-12">
            <div className="relative rounded-3xl border border-accent/40 bg-card px-6 py-10 shadow-[0_30px_70px_-35px_oklch(0.35_0.06_50/0.5)] sm:px-12">
              <div className="pointer-events-none absolute inset-3 rounded-2xl border border-accent/20" />
              <div className="grid gap-10 sm:grid-cols-2">
                {menu.map((section) => (
                  <div key={section.heading} className="text-center">
                    <h3 className="font-display text-2xl text-primary sm:text-3xl">
                      {section.heading}
                    </h3>
                    <div className="divider-ornament mt-3 self-center" />
                    <ul className="mt-4 space-y-2.5">
                      {section.items.map((item) => (
                        <li
                          key={item}
                          className="font-body text-[0.9rem] leading-relaxed font-light text-muted-foreground"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <p className="mt-10 text-center font-body text-xs font-light tracking-[0.2em] text-muted-foreground/80 uppercase">
                {menuNote}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* THE VENUE */}
      <section id="venue" className="relative overflow-hidden bg-background py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal className="text-center">
            <p className="font-body text-[0.65rem] tracking-[0.5em] text-accent uppercase">
              {venueSection.kicker}
            </p>
            <h2 className="mt-3 font-display text-4xl tracking-[0.08em] text-foreground sm:text-5xl">
              {venueSection.title}
            </h2>
            <p className="mt-2 font-script text-3xl text-primary sm:text-4xl">
              {venueSection.script}
            </p>
            <Ornament className="mt-6" />
            <p className="mt-5 font-body text-sm tracking-[0.2em] text-muted-foreground uppercase">
              {couple.date} · {couple.venue}
            </p>
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {[venueEntrance, venueChapel, venueFountain].map((image, i) => (
              <Reveal key={image} delay={i * 100}>
                <div className="group relative overflow-hidden rounded-3xl shadow-[0_24px_60px_-24px_oklch(0.35_0.06_50/0.5)]">
                  <img
                    src={image}
                    alt={venueSection.script}
                    className="aspect-[4/5] w-full object-cover transition-transform duration-[1.6s] ease-out hover:scale-105"
                    loading="lazy"
                  />
                  <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-accent/30 ring-inset" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* RSVP */}
      <RsvpSection />

      {/* CLOSING */}
      <footer className="relative overflow-hidden bg-foreground py-20 text-center">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 50% 100%, oklch(0.45 0.08 55 / 0.6), transparent 70%)",
          }}
        />
        <div className="relative mx-auto max-w-2xl px-6">
          <Reveal>
            <p className="font-script text-5xl text-secondary sm:text-6xl">
              {couple.names}
            </p>
            <Ornament className="mt-6" />
            <p className="mt-6 font-body text-sm font-light tracking-[0.15em] text-secondary/85 sm:text-base">
              {closingLine}
            </p>
            <p className="mt-8 font-body text-[0.65rem] tracking-[0.4em] text-secondary/60 uppercase">
              {couple.date} · {couple.venue}
            </p>
          </Reveal>
        </div>
      </footer>
    </main>
  );
}
