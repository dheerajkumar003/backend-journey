# Backend Learning Log

> Node.js + Express roadmap · React Native → Full-Stack Mobile App Developer
> Started: 6th October, 29026 · Target: 26 weeks · 1.5–2 h/day, 5–6 days/week

---

## How to use this log

- **Every study day:** copy the *Daily entry* template below, fill it in during the last 5–10 minutes.
- **Day 1 (start of each session):** answer *Recall* **before** looking at yesterday's entry, then check.
- **End of each week:** fill in a *Weekly review*.
- **At each checkpoint (Weeks 3, 6, 9, 12, 18, 26):** fill in a *Checkpoint* entry.
- Newest entries go at the **top** of the Log section.
- Keep entries short. Three honest lines beat a page of copied notes.

---

## Progress tracker

| Stage | Weeks | Status | Project | Repo / link |
| --- | --- | --- | --- | --- |
| 0 · JS + HTTP refresher | 1 | Not started | Promise playground | |
| 1 · Node.js fundamentals | 2–3 | Not started | 1a Asset Audit CLI · 1b App Config Server | |
| 2 · Express fundamentals | 4–5 | Not started | 2a Notes API · 2b Recipes API + RN client | |
| 3 · TypeScript, validation, errors | 6 | Not started | 2b in TypeScript + Zod | |
| 4 · PostgreSQL + Prisma | 7–9 | Not started | 3 Spendly CRUD API (first deploy) | |
| 5 · Auth & security | 10–12 | Not started | 4 Spendly auth | |
| 6 · React Native integration | 13–14 | Not started | Spendly app: receipts, realtime, push | |
| 7 · Testing | 15–16 | Not started | Spendly test suite | |
| 8 · Architecture & production | 17–18 | Not started | 5 Production-style Spendly | |
| 9 · Deployment & DevOps | 19–20 | Not started | Spendly in production | |
| 10 · Capstone | 21–25 | Not started | 6 SwapSpot | |
| Buffer + interview prep | 26 | Not started | Portfolio polish | |

Status values: `Not started` · `In progress` · `Done` · `Revisit`

---

## Revision checkpoints

| Week | Checkpoint | Passed? | Date | Notes |
| --- | --- | --- | --- | --- |
| 3 | Explain V8 vs libuv, microtasks vs macrotasks, CommonJS vs ESM, why `readFileSync` in a handler is bad — without notes | ☐ | | |
| 6 | Rebuild a CRUD API from a blank folder in < 90 min, no tutorial | ☐ | | |
| 9 | Design a food-delivery schema on paper + SQL for "top 5 dishes this month" | ☐ | | |
| 12 | Whiteboard login → refresh → reuse detection; explain sessions vs JWT in 2 min | ☐ | | |
| 18 | Explain where "free users can have max 3 budgets" belongs, and why | ☐ | | |
| 26 | Complete the job-ready checklist | ☐ | | |

---

## Concepts I can now explain without notes

Add a concept only when you can explain it out loud in under 2 minutes.

- [ ] Event loop (microtasks vs macrotasks)
- [ ] Why blocking the event loop affects every user
- [ ] Params vs query vs body
- [ ] Middleware order and `next()`
- [ ] 401 vs 403, 400 vs 422
- [ ] Offset vs cursor pagination
- [ ] Transactions and ACID
- [ ] When to add an index
- [ ] N+1 queries
- [ ] Hashing vs encryption
- [ ] Sessions vs JWT
- [ ] Access vs refresh tokens + rotation
- [ ] Why CORS/CSRF matter less for native apps
- [ ] Controller vs service vs repository
- [ ] WebSocket vs push notification
- [ ] Unit vs integration vs API tests
- [ ] Docker image vs container
- [ ] Logging vs monitoring vs error tracking

---

## Errors & fixes (my personal debugging cookbook)

| Date | Error / symptom | Cause | Fix | Lesson |
| --- | --- | --- | --- | --- |
| | | | | |

---

## Questions backlog

Open questions to resolve later. Move to *Resolved* with the answer.

**Open**

- [ ]

**Resolved**

- Q: — A:

---

## Templates (copy, don't edit here)

### Daily entry

```markdown
### YYYY-MM-DD · Week N · Day N · Stage N — <topic>

**Time:** __ min (recall __ · learn __ · build __ · log __)

**Recall (before checking yesterday's notes):**
-

**Learned today:**
-

**Built / committed:**
- <what> — <commit link or hash>

**Confused me:**
-

**One question:**
-

**React Native connection:** (how does this relate to something I already know?)
-
```

### Weekly review

```markdown
## Week N review · YYYY-MM-DD → YYYY-MM-DD · Stage N

**Hours this week:** __ / target 9–11

**Deliverable:** <project / feature> — Done / Partial / Not done

**Three things I can now do:**
1.
2.
3.

**Rebuild-from-scratch drill (Day 5):** what I rebuilt, how long it took, where I got stuck:
-

**Still fuzzy (revisit next week):**
-

**Mistakes I made (and won't repeat):**
-

**Next week's focus:**
-
```

### Checkpoint

```markdown
## Checkpoint N · Week N · YYYY-MM-DD

**Task:**

**Result:** Passed / Not yet

**What I explained or built (summary):**
-

**Gaps found:**
-

**Plan if not passed:** (e.g. repeat Weeks X–Y with a different domain)
-
```

### Project retro (end of each project)

```markdown
## Project retro · <Project name> · YYYY-MM-DD

**Repo:** <link> · **Live URL:** <link or n/a>

**What it does (2 lines):**

**Skills practised:**
-

**Hardest part and how I solved it:**
-

**What I'd do differently:**
-

**Decisions & tradeoffs (interview material):**
- Decision: — Why: — Alternative considered:
```

---

## Log

<!-- Newest entry first. Paste a Daily entry template below and fill it in. -->

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
