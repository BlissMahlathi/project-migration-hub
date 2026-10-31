import { useEffect, useState } from "react";

const TARGET = new Date("2026-12-27T00:00:00+02:00").getTime();

type Parts = { days: number; hours: number; minutes: number; seconds: number };

function diffParts(now: number): Parts {
  const d = Math.max(0, TARGET - now);
  return {
    days: Math.floor(d / 86_400_000),
    hours: Math.floor(d / 3_600_000) % 24,
    minutes: Math.floor(d / 60_000) % 60,
    seconds: Math.floor(d / 1000) % 60,
  };
}

export function Countdown() {
  const [parts, setParts] = useState<Parts | null>(null);

  useEffect(() => {
    const tick = () => setParts(diffParts(Date.now()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const cells: Array<[string, number | string]> = [
    ["Days", parts?.days ?? "–"],
    ["Hours", parts?.hours ?? "–"],
    ["Minutes", parts?.minutes ?? "–"],
    ["Seconds", parts?.seconds ?? "–"],
  ];

  return (
    <div
      aria-label="Countdown to the wedding day"
      className="mt-7 flex items-stretch justify-center gap-2 sm:gap-3"
    >
      {cells.map(([label, value]) => (
        <div
          key={label}
          className="min-w-14 rounded-xl border border-secondary/30 bg-background/15 px-2.5 py-2.5 backdrop-blur-md sm:min-w-16 sm:px-3.5"
        >
          <p className="text-center font-display text-xl tabular-nums text-secondary sm:text-2xl">
            {value}
          </p>
          <p className="mt-0.5 text-center font-body text-[0.5rem] tracking-[0.3em] text-secondary/80 uppercase sm:text-[0.55rem]">
            {label}
          </p>
        </div>
      ))}
    </div>
  );
}
