<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

# Frontend patterns
- Story chapters render as a scroll-driven flip book (`src/components/StoryBook.tsx`) using the same refs + requestAnimationFrame DOM-style updates as `BookChapter`; keep both in sync if the book geometry changes.
- The couple portrait belongs on the cover; the three venue photos (`venue-entrance`, `venue-chapel`, `venue-fountain`) belong only in the venue gallery, never in story sections.

# Migration
- Migrated from the old Lovable project (1c88d8c2) code archive on 2026-10-31; RSVPs go through the anon-insert `rsvps` table in Lovable Cloud via the generated client in `RsvpSection`. No auth is used.
- RSVP success shows a WhatsApp CTA (`src/lib/whatsapp.ts`): opens WhatsApp with the RSVP prefilled. `COUPLE_WHATSAPP_NUMBER` is empty until the couple's number is provided — empty means the wa.me share picker; once set (digits only) it opens their chat directly.
