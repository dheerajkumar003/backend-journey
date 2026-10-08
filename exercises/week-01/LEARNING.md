### 2026-10-08 · Week 1 · Day 1 · Stage 0 — Promises & async/await

**Time:** 120 min (recall 0 · learn 35 · build 70 · log 15)

**Recall (before checking yesterday's notes):**
- First day — nothing to recall yet.

**Learned today:**
- resolve/reject are functions I CALL when the work is done/failed — not conditions to check with `if`
- A function doing slow work must RETURN the Promise, otherwise nobody can await it
- Sequential awaits add up (3s); Promise.all takes only as long as the slowest call (1.5s)
- Promise.all = all or nothing; allSettled = report every result, never throws

**Built / committed:**
- exercises/week-01: sleep.js, timings.js, errors.js

**Confused me:**
- Why my Promises stayed pending — I never called resolve()

**One question:**
- 

**React Native connection:**
- My useEffect with 3 awaits in a row is sequential — could use Promise.all to load the screen faster

**Check questions:**
1. Why did Part 1 lose the user result? →
2. Home screen API: all or allSettled? →
3. Which crash-output line points to my code? →