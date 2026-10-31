import { useEffect, useRef } from "react";
import { couple, openingQuote, storyChapters, todayNote } from "@/data/wedding";
import story1 from "@/assets/story-1.jpg";
import story2 from "@/assets/story-2.jpg";
import story3 from "@/assets/story-3.jpg";
import story4 from "@/assets/story-4.jpg";

const clamp01 = (v: number) => Math.min(Math.max(v, 0), 1);

const illustrations = [story1, story2, story3, story4];
const ROMANS = ["I", "II", "III", "IV", "V", "VI"];

const N = storyChapters.length;
/** Scroll pacing (in screen-heights): settle, then flip each page, then rest. */
const FIRST_FLIP = 1.0;
const FLIP_DURATION = 0.6;
const STEP = 1.5;
const TAIL = 1.2;
const TOTAL = FIRST_FLIP + N * STEP + TAIL;

const turnStart = (k: number) => FIRST_FLIP + k * STEP;

export function StoryBook() {
  const sectionRef = useRef<HTMLElement>(null);
  const leafRefs = useRef<Array<HTMLDivElement | null>>([]);
  const shadeFrontRefs = useRef<Array<HTMLDivElement | null>>([]);
  const shadeBackRefs = useRef<Array<HTMLDivElement | null>>([]);
  const pageRefs = useRef<Array<HTMLDivElement | null>>([]);
  const hintRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const el = sectionRef.current;
      if (el) {
        const rect = el.getBoundingClientRect();
        const scrollable = Math.max(rect.height - window.innerHeight, 1);
        const local = clamp01(-rect.top / scrollable) * TOTAL;

        storyChapters.forEach((_, k) => {
          const t = clamp01((local - turnStart(k)) / FLIP_DURATION);
          const angle = t * 180;

          const leaf = leafRefs.current[k];
          if (leaf) {
            leaf.style.transform = `rotateY(${-angle}deg)`;
            // Pages resting on the left stack above earlier flips; pages on
            // the right stack with the current page on top.
            leaf.style.zIndex = angle >= 90 ? `${10 + k}` : `${60 - k}`;
          }
          const shade = Math.sin((angle * Math.PI) / 180) * 0.45;
          const shadeFront = shadeFrontRefs.current[k];
          if (shadeFront) shadeFront.style.opacity = shade.toFixed(3);
          const shadeBack = shadeBackRefs.current[k];
          if (shadeBack) shadeBack.style.opacity = shade.toFixed(3);

          const page = pageRefs.current[k];
          if (page) {
            page.style.transform = `translateY(${-108 * t}%)`;
          }
        });

        if (hintRef.current) {
          hintRef.current.style.opacity = `${1 - clamp01(local / (FIRST_FLIP * 0.7))}`;
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="love-story"
      className="relative bg-foreground"
      style={{ height: `${TOTAL * 100}vh` }}
      aria-label="Our Love Story — read it like a book"
    >
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 opacity-50"
          style={{
            background:
              "radial-gradient(ellipse 75% 55% at 50% 45%, oklch(0.4 0.06 55 / 0.9), transparent 70%)",
          }}
        />

        <p
          ref={hintRef}
          className="absolute top-14 left-1/2 z-20 -translate-x-1/2 text-center font-script text-2xl text-secondary/90 sm:text-3xl"
        >
          turn the pages of our story
        </p>

        {/* Desktop: a real flip book */}
        <div className="book-scene relative z-10 hidden w-[min(92vw,820px)] md:block">
          <div className="book-spread relative aspect-[1.45/1] shadow-[0_40px_80px_-30px_oklch(0.1_0.03_50/0.9)]">
            {/* Base left page — the story title page */}
            <div className="book-page book-page-left">
              <div className="flex h-full flex-col items-center justify-center px-[8%] text-center">
                <p className="font-body text-[clamp(0.5rem,1vw,0.75rem)] tracking-[0.4em] text-muted-foreground uppercase">
                  Chapter One
                </p>
                <h2 className="mt-2 font-display text-[clamp(1.2rem,3vw,2.4rem)] text-foreground">
                  OUR LOVE STORY
                </h2>
                <div className="divider-ornament mt-4" />
                <p className="mt-5 font-script text-[clamp(1.2rem,2.6vw,2rem)] leading-snug text-primary">
                  {openingQuote}
                </p>
                <p className="mt-6 font-body text-[clamp(0.5rem,1vw,0.7rem)] tracking-[0.3em] text-muted-foreground/80 uppercase">
                  {couple.names}
                </p>
              </div>
            </div>

            {/* Base right page — revealed after the last page turns */}
            <div className="book-page book-page-right">
              <div className="flex h-full flex-col items-center justify-center px-[9%] text-center">
                <p className="font-body text-[0.55rem] tracking-[0.4em] text-muted-foreground uppercase">
                  {todayNote.heading}
                </p>
                <p className="mt-2 font-display text-[clamp(1rem,2.4vw,1.8rem)] text-foreground">
                  {todayNote.date}
                </p>
                <div className="divider-ornament my-4" />
                <p className="font-body text-[clamp(0.55rem,1.1vw,0.8rem)] leading-relaxed font-light text-muted-foreground">
                  {todayNote.body}
                </p>
                <p className="mt-4 font-script text-[clamp(1rem,2.2vw,1.7rem)] leading-snug text-primary">
                  {todayNote.toast}
                </p>
                <p className="mt-5 font-body text-[0.55rem] tracking-[0.35em] text-accent uppercase">
                  The order of the day awaits
                </p>
              </div>
            </div>

            {storyChapters.map((chapter, k) => (
              <div
                key={chapter.title}
                ref={(el) => {
                  leafRefs.current[k] = el;
                }}
                className="story-leaf"
                style={{ zIndex: 60 - k }}
              >
                {/* Front of the page — the chapter itself */}
                <div className="story-face story-paper">
                  <div className="flex h-full flex-col px-[9%] py-[7%]">
                    <p className="font-body text-[clamp(0.45rem,0.9vw,0.65rem)] tracking-[0.35em] text-accent uppercase">
                      Chapter {ROMANS[k]} · {chapter.year}
                    </p>
                    <h3 className="mt-1.5 font-display text-[clamp(1rem,2.4vw,1.9rem)] leading-tight text-foreground">
                      {chapter.title}
                    </h3>
                    <div className="divider-ornament mt-3 self-start" />
                    <p className="story-text mt-4 font-body text-[clamp(0.55rem,1.05vw,0.85rem)] leading-[1.75] font-light text-foreground/85">
                      {chapter.text}
                    </p>
                    <p className="mt-auto pt-3 text-center font-script text-[clamp(0.8rem,1.6vw,1.1rem)] text-accent/70">
                      {k + 1}
                    </p>
                  </div>
                  <div
                    ref={(el) => {
                      shadeFrontRefs.current[k] = el;
                    }}
                    className="leaf-shade shade-front"
                  />
                </div>
                {/* Back of the page — an illustration from the chapter */}
                <div className="story-face story-face-back">
                  <img
                    src={illustrations[k]}
                    alt={chapter.title}
                    width={1024}
                    height={768}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                  <div className="pointer-events-none absolute inset-3 rounded-lg border border-secondary/50" />
                  <p className="absolute right-0 bottom-6 left-0 text-center font-body text-[0.5rem] tracking-[0.35em] text-background uppercase drop-shadow-[0_1px_4px_oklch(0.2_0.05_48/0.8)]">
                    {chapter.year}
                  </p>
                  <div
                    ref={(el) => {
                      shadeBackRefs.current[k] = el;
                    }}
                    className="leaf-shade shade-back"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile: pages lift away one by one */}
        <div className="relative z-10 w-[min(92vw,520px)] md:hidden">
          <div className="relative h-[72vh] max-h-[640px] overflow-hidden rounded-xl shadow-[0_40px_80px_-30px_oklch(0.1_0.03_50/0.9)]">
            {/* Base page — today's note, revealed after the last page lifts */}
            <div className="story-paper absolute inset-0 flex flex-col items-center justify-center rounded-xl px-8 text-center">
              <p className="font-body text-[0.55rem] tracking-[0.4em] text-muted-foreground uppercase">
                {todayNote.heading}
              </p>
              <p className="mt-2 font-display text-xl text-foreground">
                {todayNote.date}
              </p>
              <div className="divider-ornament my-3" />
              <p className="font-body text-[0.8rem] leading-relaxed font-light text-muted-foreground">
                {todayNote.body}
              </p>
              <p className="mt-3 font-script text-xl leading-snug text-primary">
                {todayNote.toast}
              </p>
              <p className="mt-4 font-body text-[0.55rem] tracking-[0.35em] text-accent uppercase">
                The order of the day awaits
              </p>
            </div>

            {storyChapters.map((chapter, k) => (
              <div
                key={chapter.title}
                ref={(el) => {
                  pageRefs.current[k] = el;
                }}
                className="mpage story-paper flex flex-col rounded-xl"
                style={{ zIndex: N - k }}
              >
                <img
                  src={illustrations[k]}
                  alt={chapter.title}
                  width={1024}
                  height={768}
                  loading="lazy"
                  className="h-[30%] w-full shrink-0 object-cover"
                />
                <div className="flex min-h-0 flex-1 flex-col px-6 py-4">
                  <p className="font-body text-[0.5rem] tracking-[0.3em] text-accent uppercase">
                    Chapter {ROMANS[k]} · {chapter.year}
                  </p>
                  <h3 className="mt-1 font-display text-xl leading-tight text-foreground">
                    {chapter.title}
                  </h3>
                  <div className="divider-ornament mt-2 self-start" />
                  <p className="mt-2.5 font-body text-[0.68rem] leading-[1.7] font-light text-foreground/85">
                    {chapter.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="absolute bottom-10 left-1/2 z-20 w-max -translate-x-1/2 text-center font-body text-xs tracking-[0.4em] text-secondary/60 uppercase">
          The order of the day follows
        </p>
      </div>
    </section>
  );
}
