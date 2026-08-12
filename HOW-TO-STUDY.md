# How to actually run this — the method

`README.md` says *what* to open and *when*. This says *how*. The schedule is the easy
half; almost everyone who misses 75 had the right syllabus and the wrong method.

---

## 1. The daily loop

Six blocks. Do them in this order — the order matters more than the exact minutes.

| Block | Time | What |
|---|---|---|
| **LEARN** | 2.5 h | The `--BOOK-` file, today's topic only |
| **SOLVE** | 2.5 h | The questions file, same topic, cold |
| **MATHS** | 1.5 h | Same learn→solve loop, `3-build-maths/` |
| **REVISE** | 1.0 h | Spaced review of earlier topics (§5) |
| **APTITUDE** | 0.5 h | `1-daily-aptitude/` |
| **LOG** | 0.5 h | Short notes + error log (§3, §4) |

**LEARN is not "read the book".** Open only the sections covering today's topic — the
week folder holds a whole textbook, but a week is 4–6 topics, not 400 pages. Read once
without taking notes. Read again and write your short-note entry. If a passage doesn't
land on the second pass, mark it and move; it usually resolves once you hit the questions.

**SOLVE is not "check if I understood".** It is the actual learning. Attempt every
question cold — no peeking at the answer key, no QR code, no discussion thread. Only
after you've attempted the whole block do you check answers.

Working track (4.5 h weekdays): LEARN before work, SOLVE after, APTITUDE and LOG in the
gaps. Push MATHS and REVISE to the weekend as one block.

---

## 2. Marking questions as you solve

Put one mark next to every question. This takes two seconds and drives everything else.

| Mark | Meaning | What happens to it |
|---|---|---|
| `✓` | Right, confident, reasonable time | Never look at it again |
| `~` | Right, but slow or unsure | Redo in Phase 2 |
| `✗` | Wrong | Error log + redo twice |
| `?` | No idea where to start | Error log + reread that section |

The point is that **`✓` questions are finished forever**. Most people reread what they
already know because it feels productive. Your Phase 2 and Phase 3 revision runs on `~`,
`✗` and `?` only — that's what makes a second pass over 2,700 questions possible.

---

## 3. The error log — the highest-leverage habit here

One line per missed question, in `error-log.csv`. Non-negotiable: every `✗` and `?`.

The critical column is **why**, and it must be exactly one of four:

- **concept** — didn't know the theory. → Reread that book section tonight.
- **application** — knew the theory, couldn't get from it to the answer. → Do more
  questions on that specific topic. Nothing else fixes this.
- **silly** — misread the question, arithmetic slip, right work wrong option. → Not a
  knowledge problem. Fix with a checking protocol (§7).
- **time** — you'd have got it with another five minutes. → Speed comes from volume,
  not from trying to go faster.

Once a fortnight, count the four categories. The distribution tells you what to change.
Mostly *concept* in October means you're rushing the LEARN block. Mostly *silly* in
January means your exam-day protocol is the problem, not your preparation — and that is
the cheapest thing in the world to fix.

**In January, the error log replaces the question banks entirely.** It is the single most
valuable file you will produce.

---

## 4. Short notes — what goes in, what doesn't

You write these; nobody can write them for you. They are your January revision material.

**In:** formulas, results you'd otherwise re-derive, closure-property tables,
counterexamples, and every trap you personally fell into.

**Out:** definitions you'll obviously remember, anything copied verbatim from the book,
anything you understood immediately.

Target **4–6 pages per subject, maximum**. If a subject runs to 20 pages you're
transcribing, not compressing. Handwritten beats typed — the act of compressing is the
revision.

---

## 5. Spaced revision — the REVISE block

A topic learned today gets revisited on **day 1, day 3, day 7, and day 21**. Ten minutes
each: cover your notes, write the key results from memory on blank paper, then check.

Keep a rolling list of what's due. That's all the REVISE block is. Without it you will
finish Networks in late November having genuinely forgotten Digital Logic from September,
and Phase 2 becomes relearning instead of revision.

---

## 6. How to revise in Phase 2 (Dec)

Revision is **not rereading**. For each subject:

1. Blank paper. Write everything you remember about the topic — formulas, results,
   algorithm behaviours. No notes open.
2. Open your short notes. Mark what you missed. *That* is your actual revision list.
3. Redo only the `~`, `✗` and `?` questions.
4. Sit the subject test. Log every miss.

If step 1 produces nearly nothing for a subject you "finished" in September, that's
information, not failure — it means the REVISE block slipped. Rebuild from your notes,
not from the textbook.

---

## 7. How to sit a mock (Phase 3)

**Before:** same time of day as your real slot. Phone in another room. Three hours, no
breaks, no water refills, nothing.

**During — three passes:**
- **0–45 min:** everything answerable in under 90 seconds, aptitude included.
- **45–135 min:** the 2-markers you can see a route through.
- **135–180 min:** the rest, then re-check every NAT you entered.

Rules inside the exam:
- Attempt **every** NAT and MSQ — no negative marking, so a blank is a pure donation.
- Guess an MCQ only after eliminating two options.
- Never exceed 4 minutes on one question in passes 1 and 2. Mark it, move.

**Checking protocol** (this is what kills *silly* errors): for every NAT, before you type
it — reread the last line of the question and confirm the unit and what was actually
asked. Most NAT losses are answering a slightly different question, correctly.

**After — and this is the part people skip:** spend **2–3 hours** analysing, longer than
you'd think. Go through every wrong answer *and every question you guessed right* — a
lucky guess is a gap that hasn't bitten you yet. Everything goes in the error log.

**Never sit a second mock before analysing the first.** Ten analysed mocks beat twenty
unanalysed ones, and it isn't close.

---

## 8. Sunday checkpoint — 30 minutes

Four questions, written down:

1. Did I finish this week's topics? (yes / no — no partial credit)
2. What % of this week's PYQs did I actually solve?
3. What does my error log say — which of the four categories dominated?
4. What's the one thing I'll change next week?

**The backlog rule: never carry more than 3 days of backlog.** If you're further behind
than that, you do not extend the schedule — you cut depth on the current subject and
start the next one on time. A first pass that finishes on 29 November with three shallow
subjects beats one that finishes on 20 December with none.

---

## 9. Are you on track?

| By | You should have |
|---|---|
| End Sep | C, DS, Algorithms, Digital Logic done; COA started; discrete maths done |
| End Oct | + COA and OS done; probability done |
| **29 Nov** | **Full syllabus, first pass, complete** |
| End Dec | Revision 1 done; baseline mocks landing **60–65** |
| Mid Jan | Mocks **65–75** |
| Late Jan | Mocks **75+** |

A first mock in the 50s in late December is normal and not a signal to panic. A first
mock in the 50s in late January is a signal to stop learning anything new and spend every
remaining hour on the error log.

---

## 10. When things go wrong

- **A week behind** → cut, don't extend. See §8.
- **Mock score dropped** → normal; scores oscillate 8–10 marks on paper difficulty alone.
  Look at the error distribution, not the total.
- **A topic won't click** → give it three sources (book, NPTEL, GO discussion), then move
  on and return in Phase 2. Grinding a single topic for two days is how weeks get lost.
- **Burnout** → one full day off per month, scheduled in advance, no guilt. People who
  skip this lose December.

---

## 11. The non-negotiables

1. Solve a topic's previous-year questions **the same day** you learn it.
2. Aptitude every day. 15 marks, and it's the first thing people drop.
3. Attempt before you look at any answer. Always.
4. Every `✗` and `?` goes in the error log, same day.
5. No new material after **4 January**.
6. Never sit a mock you haven't got 3 hours to analyse.

Everything else in this folder is infrastructure. These six are the method.
