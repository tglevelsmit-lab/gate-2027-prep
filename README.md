# GATE 2027 CS — what to open, and when

Target: **76 marks**, exam ~6 Feb 2027.

- **`HOW-TO-STUDY.md`** — *how* to work: the daily loop, the error log, how to revise, how
  to sit a mock. Read this before day one; it matters more than the schedule.
- **`gate-2027-plan.html`** — the full plan, mark-by-mark targets, and book list.
- **`error-log.csv`** — start it on day one. In January it replaces everything else.
- **This file** — *what* to open and *when*.

Every PDF below is cut from the GATE Overflow edition for GATE 2027 (all GATE CS
questions, 1987 → GATE 2026), so a file named for a week contains exactly the
previous-year questions for that week's topic.

### What's in each subject PDF — and what isn't

- **Key-concepts section at the front** — formulas, properties, common pitfalls and
  standard techniques for every topic in that subject.
- **Every previous-year question**, grouped by topic.
- **A full answer key** — one table at the end of the subject, question number → answer.
- **No worked explanations.** Nothing in the PDF tells you *why* an answer is right.
  Every question has a **QR code** linking to its page on gateoverflow.in, where the
  community solutions and argument over disputed keys live. Plan on being online while
  solving, or you will be stuck with a bare letter and no reasoning.

GATE Overflow publishes no offline "with solutions" variant — this is the design of the
book, not a missing file. When the discussion isn't enough, go to that subject's textbook
in `gate-2027-plan.html`.

```
1-daily-aptitude/          30 min every day, from day one
2-build-core-W01-W16/      5 h/day  — the main subject
3-build-maths-W01-W12/     1.5 h/day — runs in parallel, never as its own block
4-peak-full-papers/        locked until January
5-reference-full-volumes/  the uncut originals, only if a split looks wrong
```

### The textbooks

Each week folder also holds the book you learn that subject *from*, named with the same
week prefix and `--BOOK-` in the middle, so it sorts directly above the question bank.
Learn from the `--BOOK-` file, then solve the questions file. 14 books, ~7,000 pages, all
free and legally so — author-distributed or openly licensed (CC BY / CC BY-SA / GFDL).

| Week folder | Book | Source |
|---|---|---|
| W01 Programming in C | *Modern C* — Jens Gustedt | INRIA, free |
| W02–03 Data Structures | *Open Data Structures* — Pat Morin | CC BY |
| W04–05 Algorithms | *Algorithms* — Jeff Erickson | CC BY (10 chapters; max-flow and NP-hardness omitted, not in syllabus) |
| W06–07 Digital Logic | *Computer Organization and Design Fundamentals* — David Tarnoff | ETSU OER |
| W07–09 Computer Organisation | same Tarnoff book | ETSU OER |
| W09–11 Operating Systems | *OSTEP* — Arpaci-Dusseau | free, 68 chapters merged |
| W12–14 Theory of Computation | Maheshwari & Smid | Carleton, free |
| W13–14 Compiler Design | *Basics of Compiler Design* — Mogensen | DIKU, free |
| W15 Databases | *Database Design* — Watt & Eng | CC BY |
| W16 Computer Networks | *Computer Networks: A Systems Approach* — Peterson & Davie | CC BY 4.0 |
| W01–02 Set Theory, Lattices, Groups | *Applied Discrete Structures* — Doerr & Levasseur | CC BY-NC-SA |
| W03 / W04–05 / W06 maths | *Mathematics for Computer Science* — MIT 6.042 | CC BY-SA |
| W07–08 Linear Algebra | *Linear Algebra* — Jim Hefferon | CC BY-SA / GFDL |
| W09–10 Calculus | *OpenStax Calculus Volume 1* | CC BY-NC-SA |
| W11–12 Probability | *Introduction to Probability* — Grinstead & Snell | GFDL |

### Four places these free books don't reach

Verified by searching the actual text, not assumed. Each has a free fix — use NPTEL
(nptel.ac.in) or Neso Academy, both free, when you hit these:

1. **Quine–McCluskey (tabular minimisation)** — absent from Tarnoff entirely. It is
   explicitly in the 2027 syllabus. Watch a lecture on it in W6.
2. **DBMS indexing, transactions, concurrency control** — the Watt book covers ER,
   normalisation and SQL, but has no B/B+ trees and no serialisability. That is close to
   half of GATE's database marks. Plan on NPTEL's DBMS course for W15.
3. **Sorting details** — Erickson covers mergesort, quicksort and heaps, but not counting
   or radix sort, and is light on stability and exact comparison counts. The key-concepts
   section in the questions file fills most of this.
4. **Improper integrals** — OpenStax Volume 1 stops before them (they're in Volume 2).
   Minor; GATE rarely goes past convergence.

Everything else was checked and covers the syllabus: pipelining and cache in Tarnoff,
pumping lemma and undecidability in Maheshwari & Smid, liveness and constant propagation
in Mogensen, CIDR/NAT/congestion control in Peterson & Davie, deadlock and page
replacement in OSTEP, and monoids, groups, lattices and generating functions in Applied
Discrete Structures — the topics the plan flagged as having thin previous-year coverage.

---

## Phase 1 — BUILD · 11 Aug → 29 Nov

Open one file from `2-build-core/` and one from `3-build-maths/` each day. The week
prefix on the filename *is* the schedule.

| Weeks | Dates | Main subject (5 h) | Parallel maths (1.5 h) |
|---|---|---|---|
| W01 | 11–17 Aug | `W01-Programming-in-C` | `W01-W02-Set-Theory-Relations-Lattices-Groups` |
| W02–03 | 18–31 Aug | `W02-W03-Data-Structures` | ↑ then `W03-Mathematical-Logic` |
| W04–05 | 1–14 Sep | `W04-W05-Algorithms` | `W04-W05-Combinatorics-Recurrences` |
| W06 | 15–21 Sep | `W06-W07-Digital-Logic` | `W06-Graph-Theory` |
| W07 | 22–28 Sep | ↑ finish, then start `W07-W09-Computer-Organisation` | `W07-W08-Linear-Algebra` |
| W08–09 | 29 Sep–12 Oct | `W07-W09-Computer-Organisation` | ↑ then `W09-W10-Calculus` |
| W09–11 | 6–26 Oct | `W09-W11-Operating-Systems` | `W09-W10-Calculus`, then `W11-W12-Probability-and-Statistics` |
| W12 | 27 Oct–2 Nov | `W12-W14-Theory-of-Computation` | `W11-W12-Probability-and-Statistics` |
| W13–14 | 3–16 Nov | ↑ plus `W13-W14-Compiler-Design` | maths done — revise all 7 files |
| W15 | 17–23 Nov | `W15-Databases` | aptitude goes to 1 h/day |
| W16 | 24–29 Nov | `W16-Computer-Networks` | aptitude 1 h/day |

TOC and Compiler overlap on purpose: lexical analysis reuses regex/DFA, and parsing
reuses CFGs. Do them together and you learn each once.

**The rule that decides the outcome:** a topic is not done when you understand it. It is
done when you have solved every GATE question in that file on that topic. Same day.

---

## Phase 2 — CONSOLIDATE · 30 Nov → 3 Jan

No new files. Re-open the same folders in this order, one subject at a time, now under
time and from your own notes first:

- **W17–18** (30 Nov–13 Dec): Data Structures, Algorithms, Discrete maths, OS
- **W19–20** (14–27 Dec): Digital Logic, COA, TOC, Compiler
- **W21** (28 Dec–3 Jan): Databases, Networks, remaining maths — then sit
  **2024, 2025 and 2026** from `4-peak-full-papers/` as your baseline

Two subject tests a week from your test series. Book one by early November.

---

## Phase 3 — PEAK · 4 Jan → 5 Feb

`4-peak-full-papers/` opens now — 15 original papers, 2016–2026, in real exam format.
One full paper every alternate day, at the exam's time of day, followed by 2–3 hours of
analysis. See `4-peak-full-papers/INDEX.md` for what's in there and two caveats.

**No new material after 4 January.** Revision rounds 2 and 3 run off your notes and your
error log only.

---

## Aptitude — every single day

15 marks, the cheapest in the paper, and the first thing people drop when they fall
behind. Don't.

- `Quantitative-494Q.pdf` — the main bank, start here
- `Verbal-376Q.pdf`, `Analytical-139Q.pdf`, `Spatial-49Q.pdf`
- `RECENT-GA-incl-2025-2026.pdf` — save for December, it has the newest questions

---

## If something looks wrong

Each week's PDF is a page range cut out of a full volume in `5-reference-full-volumes/`.
If a file seems to start mid-topic or be missing questions, open the matching uncut
volume there. Those also hold two older editions kept only as backups.
