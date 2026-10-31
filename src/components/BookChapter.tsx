import { useEffect, useRef } from "react";
import { openingQuote } from "@/data/wedding";

const clamp01 = (v: number) => Math.min(Math.max(v, 0), 1);

export function BookChapter() {
  const sectionRef = useRef<HTMLElement>(null);
  const spreadRef = useRef<HTMLDivElement>(null);
  const coverRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const hintTopRef = useRef<HTMLParagraphElement>(null);
  const hintBottomRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const el = sectionRef.current;
      if (el) {
        const rect = el.getBoundingClientRect();
        const total = Math.max(rect.height - window.innerHeight, 1);
        const progress = clamp01(-rect.top / total);

        const open = clamp01((progress - 0.08) / 0.5);
        const angle = open * 180;
        const contentIn = clamp01((open - 0.75) / 0.25);
        const hintOut = clamp01(open / 0.12);

        if (coverRef.current) {
          coverRef.current.style.transform = `rotateY(${-angle}deg)`;
        }
        if (spreadRef.current) {
          spreadRef.current.style.transform = `translateX(${-25 * (1 - open)}%)`;
        }
        if (leftRef.current) {
          leftRef.current.style.opacity = `${contentIn}`;
        }
        if (rightRef.current) {
          rightRef.current.style.opacity = `${contentIn}`;
        }
        if (hintTopRef.current) {
          hintTopRef.current.style.opacity = `${1 - hintOut}`;
        }
        if (hintBottomRef.current) {
          hintBottomRef.current.style.opacity = `${1 - hintOut}`;
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
      id="new-chapter"
      className="relative h-[260vh] bg-foreground"
      aria-label="The New Chapter — open the book"
    >
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 opacity-60"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 40%, oklch(0.4 0.06 55 / 0.9), transparent 70%)",
          }}
        />

        <p
          ref={hintTopRef}
          className="absolute top-16 left-1/2 -translate-x-1/2 text-center font-script text-2xl text-secondary/90 sm:text-3xl"
        >
          scroll to open
        </p>

        <div className="book-scene relative z-10 w-[min(92vw,760px)]">
          <div
            ref={spreadRef}
            className="book-spread relative aspect-[1.45/1] shadow-[0_40px_80px_-30px_oklch(0.1_0.03_50/0.9)]"
            style={{ transform: "translateX(-25%)" }}
          >
            {/* Left page — revealed under the opening cover */}
            <div className="book-page book-page-left">
              <div
                ref={leftRef}
                className="flex h-full flex-col items-center justify-center px-[7%] text-center opacity-0"
              >
                <p className="font-script text-[clamp(1.4rem,3.2vw,2.6rem)] leading-snug text-primary">
                  {openingQuote}
                </p>
                <div className="divider-ornament mt-5" />
                <p className="mt-4 font-body text-[clamp(0.6rem,1.2vw,0.9rem)] tracking-[0.35em] text-muted-foreground uppercase">
                  Our story continues
                </p>
              </div>
            </div>

            {/* Right page — contents of the new chapter */}
            <div className="book-page book-page-right">
              <div
                ref={rightRef}
                className="flex h-full flex-col items-center justify-center px-[9%] text-center opacity-0"
              >
                <p className="font-body text-[clamp(0.55rem,1vw,0.8rem)] tracking-[0.4em] text-muted-foreground uppercase">
                  The New Chapter
                </p>
                <h2 className="mt-2 font-display text-[clamp(1.3rem,3.4vw,2.6rem)] leading-tight text-foreground">
                  Tebogo &amp; Mpho
                </h2>
                <div className="divider-ornament my-4" />
                <ul className="space-y-2 font-body text-[clamp(0.6rem,1.25vw,0.95rem)] tracking-[0.18em] text-foreground/80 uppercase">
                  <li>I · Our Love Story</li>
                  <li>II · The Order of the Day</li>
                  <li>III · The Menu</li>
                </ul>
              </div>
            </div>

            {/* The cover — opens like a page */}
            <div ref={coverRef} className="book-cover">
              <div className="cover-face cover-front">
                <div className="cover-frame">
                  <p className="font-body text-[clamp(0.5rem,1vw,0.75rem)] tracking-[0.45em] text-secondary/80 uppercase">
                    The Wedding Programme
                  </p>
                  <p className="mt-[6%] font-script text-[clamp(1.8rem,5vw,3.6rem)] text-secondary">
                    Tebogo &amp; Mpho
                  </p>
                  <div className="divider-ornament my-[5%]" />
                  <p className="font-display text-[clamp(0.9rem,2vw,1.4rem)] tracking-[0.3em] text-secondary/90">
                    27 · 12 · 2026
                  </p>
                  <p className="mt-[3%] font-body text-[clamp(0.5rem,1vw,0.8rem)] tracking-[0.3em] text-secondary/70 uppercase">
                    Nandoni Riverview
                  </p>
                </div>
              </div>
              <div className="cover-face cover-back">
                <div className="flex h-full flex-col items-center justify-center px-[10%] text-center">
                  <p className="font-script text-[clamp(1.4rem,3.2vw,2.6rem)] leading-snug text-primary">
                    {openingQuote}
                  </p>
                  <div className="divider-ornament mt-5" />
                  <p className="mt-4 font-body text-[clamp(0.6rem,1.2vw,0.9rem)] tracking-[0.35em] text-muted-foreground uppercase">
                    Our story continues
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <p
          ref={hintBottomRef}
          className="absolute bottom-10 left-1/2 w-max -translate-x-1/2 text-center font-body text-xs tracking-[0.4em] text-secondary/60 uppercase"
        >
          The New Chapter awaits
        </p>
      </div>
    </section>
  );
}
