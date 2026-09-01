# IBPS SO — IT Officer (Scale I), 2027 cycle

Runs **after** GATE, not alongside it. Nothing in this folder should be opened before
7 February 2027.

---

## 1. Which cycle you are actually targeting

The **2026 cycle (CRP SPL-XVI) is closed.** Applications ended 26 July 2026 and its
prelims was held 29 August 2026. Unless you already applied, that one is gone.

Your target is **CRP SPL-XVII, the 2027 cycle**. Going by the 2026 calendar, expect
roughly:

| Stage | Expected (2027) |
|---|---|
| Notification + application | June–July |
| **Prelims** | ~August |
| **Mains** | ~November |
| Interview | Dec 2027 / Jan 2028 |

These are extrapolated from the 2026 dates, **not announced**. Watch **ibps.in** for the
official annual calendar, which usually appears in January. Missing the application
window is the only unrecoverable failure here — the same trap as GATE registration.

This sequencing is genuinely good for you: GATE finishes early February, and prelims is
around six months later.

---

## 2. The one fact that shapes everything

Under the pattern revised in 2026:

- **Prelims** — 100 questions, 125 marks, 80 minutes, **20 minutes sectional**.
  English, Reasoning, Quantitative Aptitude, and **Professional Knowledge (50 marks —
  double every other section)**. Prelims is **qualifying only**; its marks do not enter
  the merit list.
- **Mains** — 225 marks: 200 objective + a 25-mark descriptive English paper.
  **Every Mains section except Professional Knowledge is merely qualifying.**
  Shortlisting for interview and the merit list are computed from **Professional
  Knowledge alone.**
- **Final merit** — Mains 80% + Interview 20%. Negative marking 0.25 per wrong answer
  throughout.

So: **Professional Knowledge is the entire exam.** Aptitude and English are hurdles to
clear, not scores to maximise. And Professional Knowledge for IT Officer is roughly
70% material you will already have mastered for GATE.

> Verify this pattern against the official 2027 notification when it drops. IBPS revised
> it for 2026 and could revise it again.

---

## 3. What GATE already gives you — `A-covered-by-GATE/`

Hard links to the GATE files, so they cost no extra disk and stay in sync.

| Professional Knowledge topic | GATE coverage | Notes |
|---|---|---|
| DBMS | Very strong | GATE goes deeper. IBPS asks more plain SQL syntax |
| Computer Networks | Very strong | IBPS also wants rote facts: OSI layers, port numbers, protocol names |
| Operating Systems | Very strong | GATE is harder than anything IBPS asks |
| Data Structures | Very strong | IBPS stays at definition/complexity level |
| Algorithms | Strong | IBPS rarely goes past complexity and sorting names |
| Computer Organisation | Strong | IBPS adds 8085/8086 microprocessor specifics — see gaps |
| C Programming | Strong | IBPS also tests OOP, which GATE does not |

If you finish GATE properly, this column needs **revision only, not relearning**.

---

## 4. What GATE does not teach — `B-new-for-IBPS/`

These are genuinely new. All free, all downloaded.

| Topic | File | Pages |
|---|---|---|
| Software Engineering — SDLC, waterfall, spiral, agile, UML, cohesion/coupling, testing | `Hastings-Software-Engineering.pdf` | 502 |
| Information & Cyber Security — protocols, cryptography, access control, network attack & defence | `Anderson-Security-Engineering-selected.pdf` | 222 |
| OOP — classes, inheritance, polymorphism, encapsulation | `Eck-Java-OOP.pdf` | 781 |
| Web Technologies — HTML, JavaScript, the web model | `Eloquent-JavaScript-Web-Tech.pdf` | 463 |
| Cloud Computing — the standard definitions IBPS quotes | `NIST-Cloud-Computing-Definition.pdf` | 7 |

### Still uncovered — you will need notes or video for these

Checked, and no good free book covers them at IBPS's level:

1. **Microprocessor 8085/8086** — pin diagrams, instruction sets, addressing modes.
   GATE dropped this years ago. NPTEL or standard notes.
2. **Data warehousing, data mining, Big Data / Hadoop basics** — usually one or two
   definition-level questions.
3. **Black-box vs white-box testing terminology** — the Hastings book covers testing
   practice but barely uses this vocabulary, and IBPS asks it by name.
4. **Banking-sector IT awareness** — NEFT/RTGS/IMPS/UPI mechanics, core banking, ATM
   switching. Not a CS topic at all, and it does appear.

---

## 5. Prelims aptitude — `C-prelims-aptitude/`

**Be honest with yourself about this section: it is not GATE aptitude.**

GATE gives you 10 aptitude questions at a comfortable pace. IBPS gives you ~75 across
three sections in 60 minutes with **hard sectional timing**. It is a speed and pattern
-recognition exam, and preparation for it looks nothing like preparation for GATE.

What actually differs:

- **Reasoning** — puzzles, seating arrangements, syllogisms, blood relations,
  coding–decoding, inequalities. Almost none of this appears in GATE.
- **Quantitative** — data interpretation, simplification/approximation, number series,
  quadratic comparison, arithmetic word problems. Overlaps GATE partially, but the
  premium is entirely on speed.
- **English** — cloze tests, para jumbles, error spotting, reading comprehension.

The three GATE banks linked here are a **warm-up, not a substitute**. From roughly
April 2027 you will need IBPS-pattern practice: previous-year IBPS SO/PO papers and a
banking test series. Free daily quizzes exist on the usual banking-prep sites; a paid
banking test series is cheap (₹500–1,500) and worth it for sectional-timing practice.

Remember the leverage though: prelims is **qualifying**. You need to clear the cutoff,
not top it. Do not spend December 2027 energy optimising a section worth zero marks.

---

## 6. The plan, February to November 2027

| When | What |
|---|---|
| **7 Feb – 15 Mar 2027** | Rest, then Section 4: the five new subjects, one every ~10 days. This is the only genuinely new learning you have left. |
| **16 Mar – 30 Apr** | Fill the Section 4 gap list (microprocessor, data mining, testing vocabulary, banking IT awareness). Begin daily IBPS-pattern aptitude — 1 hour, every day. |
| **May – Jun** | Revise `A-covered-by-GATE/` — revision only. Two subjects a week; your GATE notes and error log do most of the work. Aptitude continues daily. |
| **Jul** | Application window. **Apply the day it opens.** Full-length prelims mocks twice a week. |
| **Aug — PRELIMS** | Sectional-timing drills only. Clear the cutoff and move on. |
| **Sep – Oct** | Professional Knowledge, hard. This is the only thing that scores. Mains-level PK mocks plus descriptive English practice. |
| **Nov — MAINS** | — |
| **Dec – Jan** | Interview preparation: your projects, banking awareness, current affairs. |

---

## 7. How this connects to your GATE work

Two things carry straight over and are worth protecting:

- **Your GATE short notes** become your entire Section 3 revision. Six subjects, already
  compressed, in your own handwriting.
- **`../error-log.csv`** — keep using the same file. The four categories (concept,
  application, silly, time) work identically here, and a *silly*-heavy distribution
  matters far more in a speed exam than it ever did in GATE.

The method in `../HOW-TO-STUDY.md` transfers unchanged, with one adjustment: for IBPS,
timed practice starts far earlier. GATE rewards depth; IBPS prelims rewards speed, and
speed only comes from volume under a clock.
