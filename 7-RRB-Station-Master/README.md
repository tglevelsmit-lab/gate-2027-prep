# RRB Station Master: CEN 08/2026. Main focus.

Application submitted, fee paid. **The CBT date has not been announced.** RRB usually
holds the CBT 6–9 months after applications close, so expect roughly mid-2027, but
watch the RRB website weekly.

This folder has everything needed to prepare: the plan, the books, and a practice
engine that generates unlimited questions and full mocks.

> **Verified against the official CEN 08/2026** (paragraph numbers given in brackets).
> Official sources: the notice and every update are at <https://rrb.indianrailways.gov.in>
> (navigate to your RRB's page). The application, admit cards and refund status are at <https://www.rrbapply.gov.in>.
> Check both weekly for corrigenda (para 24.7).

---

## 1. The exam

| Stage | What it is | Counts for |
|---|---|---|
| **CBT** | Single stage. 100 questions, 100 marks, **120 minutes**, **−⅓ per wrong answer**, normalised across shifts (15.1) | 70% of final merit |
| CBT minimum | **UR & EWS 40%**, OBC-NCL 30%, SC 30%, ST 25% (15.1). OBC creamy layer counts as UR (11.3) | Eligibility floor only. Rank decides |
| **CBAT** | Psychometric test batteries, English/Hindi only, **no negative marking**. **8× vacancies** called, per RRB and per community (15.2) | 30% of final merit. **Minimum T-score 42 in every battery, with no relaxation for any category** |
| DV + Medical | Called 1:1 against vacancies, on CBT 70% + CBAT 30% merit (3.4b, 15.3). A tie goes to the older candidate | Pass/fail |
| **Medical** | Standard **A-2** | Pass/fail. **Read section 6 now** |

### CBT sections

| Section | Marks | Topics |
|---|---|---|
| Basic Science & Mathematics | 30 | **Maths:** number system, LCM/HCF, ratio, averages, percentages, profit/loss, time-speed-distance, work, algebra, AP, geometry, trigonometry, mensuration, probability, statistics. **Science:** units, mass/weight/density, work-power-energy, KE, friction, speed/velocity, relative velocity, heat, basic electricity, levers and simple machines |
| Data Analysis & Interpretation | 30 | Tables, bar/line/pie charts, scatter plots, Venn diagrams, multi-source data, data sufficiency, data arrangement |
| Logical Capability & Reading Comprehension | 20 | Syllogism, binary logic, clocks, calendars, assumptions, blood relations, puzzles, **English RC passages** |
| Mental Reasoning | 20 | Analogy, series, coding-decoding, ranking, arrangements |

**Confirmed: there is no General Awareness section** (15.1). The section split is "indicative" and
may vary slightly. The notice groups the first two rows as "Basic Science, Mathematical and
Analytical Capability (60)", and RC questions test main idea, supporting idea, application, logical structure and style.
The topic list is "illustrative, not exhaustive". CBT questions appear in your chosen
language and in English (16.4d).

---

## 2. Is it tough?

**The questions are easy. The competition is hard.**

- The content is about Class 10 level. If you can do GATE General Aptitude, you can do most of it.
- **Speed is the real test.** You get 1.2 minutes per question, with negative marking.
- Expect to need **75–85+ out of 100** for the CBAT shortlist. That is an estimate:
  there is no past cutoff for this pattern. Annexure-B of the notice lists the exact vacancies
  per RRB, zone and community, which sets how many people are called to the CBAT (8× those vacancies).
- Your gaps:
  1. **Basic Science**, which is Class 9–10 physics.
  2. **The CBAT format.**
  3. **Raw speed.**
  4. **The medical standard.**

---

## 3. Everything you need, and where it is

### a) Practice engine: [`rrb-practice.html`](../rrb-practice.html). Use it every day.

Open it from the library home page. It needs no account, works on a phone, and nothing to download.

- **65 topic drills** covering the whole syllabus. Each gives 10 questions with the
  answer and the working shown immediately.
- **4 sectional tests**, timed at real exam pace (1.2 min per question).
- **Full mock**: 100 questions in 120 minutes with −⅓ marking, split 30/30/20/20 like the
  real paper. It ends with a section-wise score, a "drill these next" list, and a button
  that copies your wrong answers for `error-log.csv`.
- **CBAT trainer**: memory, perception speed, concentration and digit span.
- **Unlimited questions.** Every question is generated fresh and its answer is computed
  by code, so you never run out of practice and never see the same question twice.

### b) Books: openly licensed, cut to the syllabus

All are from OpenStax (Rice University), CC BY-NC-SA. Each book is cut down to the
chapters this exam tests, and the answer key is included where the book has one.

| File | Pages | Covers |
|---|---|---|
| `A-maths/M1-Number-System-HCF-LCM-AP-GP` | 221 | Primes, factors, HCF/LCM, integers, fractions, clock arithmetic, AP and GP |
| `A-maths/M2-Percent-Ratio-Average-Profit-Interest` | 165 | Averages, ratio and rate, percent, discount, simple and compound interest, proportion |
| `A-maths/M3-Algebra-Linear-Equations` | 40 | Expressions, linear equations, systems of two equations |
| `A-maths/M4-Geometry-Mensuration-Trigonometry` | 164 | Lines, angles, triangles, polygons, area, volume, right-triangle trigonometry |
| `A-maths/M5-Probability-Statistics` | 231 | Counting, probability, mean/median/mode, standard deviation, distributions |
| `B-data-interpretation/DI-Charts-Tables-Scatter-Venn` | 131 | Reading every chart type, scatter plots and correlation, Venn diagrams |
| `C-logic/Logic-Statements-Truth-Arguments` | 104 | Statements, truth tables (binary logic), valid arguments, syllogism foundations |
| `D-basic-science/S1-Units-Measurement-Density` | 79 | SI units, metric conversions, density |
| `D-basic-science/S2-Motion-Force-Friction-Relative-Velocity` | 128 | Speed, velocity, acceleration, equations of motion, relative velocity, Newton's laws, friction |
| `D-basic-science/S3-Work-Power-Energy-Levers-Machines` | 73 | Work, KE, PE, conservation, power, levers and simple machines |
| `D-basic-science/S4-Heat-Temperature` | 61 | Temperature scales, thermal expansion, heat, specific heat, latent heat, conduction/convection/radiation |
| `D-basic-science/S5-Electricity-Current-Ohm-Power` | 42 | Current, Ohm's law, resistivity, electric power, series and parallel |

These are university-level texts **cut down to the syllabus**. Read the worked examples
and do a handful of exercises. Don't try to finish every exercise; the practice engine is
where speed comes from.

### c) Already in this repo

| Need | File |
|---|---|
| Harder maths and DI practice | `1-daily-aptitude/Quantitative-494Q.pdf` |
| Logic puzzles | `1-daily-aptitude/Analytical-139Q.pdf` |
| Reading comprehension | `1-daily-aptitude/Verbal-376Q.pdf` (the RC passages) |
| Pattern and spatial reasoning | `1-daily-aptitude/Spatial-49Q.pdf` |

### d) Free, but linked rather than copied (copyrighted)

- **NCERT Class 9 and 10 Science and Maths**: [ncert.nic.in/textbook.php](https://ncert.nic.in/textbook.php).
  These are the closest match to the exam's level.
  - **Class 9 Science:** *Motion*, *Force and Laws of Motion*, *Gravitation*, *Work and Energy*.
  - **Class 10 Science:** *Electricity*.
  - **Class 10 Maths:** *Arithmetic Progressions*, *Introduction to Trigonometry*,
    *Some Applications of Trigonometry*, *Areas Related to Circles*, *Surface Areas and Volumes*,
    *Statistics* and *Probability*.
- **Previous RRB NTPC and Group D papers.** These are the closest free source of
  real railway-style questions. They are on many sites. Snip any question into the reader and the tutor will explain it.

### e) The one paid item

Buy one **Station Master mock series** on the new pattern (₹300–600) **as soon as the CBT
date is announced**. It gives you real-pattern questions and CBAT practice from another
setter, which stops you over-fitting to one style.

---

## 4. The plan: RRB first

This plan starts on **19 Nov 2026**. RRB is the only exam in this cycle. The core is
about **3½ focused hours** a day; anything beyond that goes on extra drills and mocks.

### Daily template

| Block | Time | What |
|---|---|---|
| Learn | 60 min | This week's book chapter: read the method and the worked examples |
| Drill | 60 min | This week's drills in `rrb-practice.html`. Aim for 10/10 before moving on |
| Science | 30 min | This week's science file, then its drills |
| Reasoning | 30 min | One reasoning or logic drill every day, rotating topics |
| RC + error log | 20 min | One RC passage. Copy every wrong answer into `error-log.csv` |

### Weeks 1–10: foundations, topic by topic

| Week | Dates (approx.) | Maths / DI / logic | Science |
|---|---|---|---|
| 1 | 19–25 Nov | **Percentages, profit/loss/discount, SI/CI.** Read `M2` | `S1` units, density |
| 2 | 26 Nov–2 Dec | **Ratio, averages, ages, linear equations.** `M2` ratio part, `M3` | `S2` motion, equations of motion |
| 3 | 3–9 Dec | **Time-speed-distance, trains, time & work.** Drills plus `Quantitative-494Q` | `S2` relative velocity, friction |
| 4 | 10–16 Dec | **Number system, HCF/LCM, divisibility, unit digit, AP.** `M1` | `S3` work, energy, power |
| 5 | 17–23 Dec | **Geometry, mensuration, trigonometry.** `M4` | `S3` levers, machines |
| 6 | 24–30 Dec | **Probability and statistics.** `M5` | `S4` heat, temperature |
| 7 | 31 Dec–6 Jan | **Data interpretation:** tables, bar, line, pie, Venn, sufficiency. `DI` book | `S5` electricity |
| 8 | 7–13 Jan | **Logic:** syllogism, binary logic, assumptions, blood relations, clocks, calendars. `C-logic` | Units & concepts drill daily |
| 9 | 14–20 Jan | **Mental reasoning:** series, analogy, coding, ranking, direction, seating, odd one out | Revise weakest science file |
| 10 | 21–27 Jan | **Consolidation:** one sectional a day. **First full mock on Sunday.** | — |

### Week 11 to the CBT: speed

- Weekly: **one full mock**, two sectionals, and drills on whatever the mock's
  "drill these next" list shows.
- Target: a full mock at **75+**, sustained over three consecutive mocks.
- **Last 4 weeks before the CBT:** three full mocks a week, at the same time of day as your exam slot.

### After the CBT result: CBAT

Use the CBAT trainer for 30–45 min every day until the CBAT. Also use the official
practice link if RRB publishes one, and the mock series' CBAT section.

> **Extra time?** Use it on the practice engine first: one more drill per weak topic,
> or an extra sectional. More reading helps less than more timed practice.

---

## 5. Exam-day technique

- **Two passes.** First pass: answer everything you can do in under 60 seconds and
  skip the rest. Second pass: return to the skipped ones.
- **Guessing.** A blind guess among four options gains nothing on average
  (+1 × ¼ − ⅓ × ¾ = 0) and costs time. Once you have eliminated two options, guessing
  pays: +1 × ½ − ⅓ × ½ = +⅓ on average.
- **DI sets.** Read the chart once, carefully, before the first question. Approximate
  wherever the options are far apart.
- **Order.** Start with the section you score highest in per minute (usually Mental
  Reasoning) if the exam interface lets you move between sections. Leave DI for when you are warmed up.

---

## 6. Medical standard A-2 (para 6, Annexures VI, VI-B)

- Distance vision **6/9, 6/9 without glasses**, with no fogging test.
- Near vision **Sn 0.6, 0.6 without glasses**.
- You must pass the **colour vision (Ishihara), binocular, night and myopic vision** tests.
- **LASIK or any other refractive surgery makes you ineligible** for Station Master. A
  self-declaration (Annexure VI-B) is taken at DV.
- **A medical failure means no alternate post is offered** (6.2). One paid medical
  appeal is allowed (6.3).

### Vision certificate: needed to sit the CBAT

You must bring an **eye specialist's certificate in the Annexure VI format, in original, on
CBAT day. Without it you are not allowed into the CBAT** (6.1, 15.2). The form needs:
- a self-attested photo **no more than one month old**;
- your signature;
- the specialist's signature, name, registration number and seal.

What to do:
1. **Now:** get a full eye check (visual acuity without glasses, plus Ishihara colour
   plates) to find out whether you meet A-2. A medical failure is the one problem
   preparation can't fix.
2. **After the CBT result, before the CBAT:** get Annexure VI filled and signed, with a fresh photo.

---

## 7. Admin (all from the notice)

- **Modification window: 28 Nov–7 Dec 2026, ₹250 per change** (19). The details from "Create an
  Account" and the chosen RRB can't be changed.
- **Fee refund: ₹400 of ₹500, less bank charges, if you sit the CBT** (10). It is paid
  only to your **Aadhaar-seeded bank account** (10.3), so keep that account active.
- **City intimation** comes about 10 days before the exam, and the **e-call letter** about 4 days before (21.2).
  Download them only from the official RRB website. Nothing comes by post.
- **Bring to every stage:**
  - the e-call letter;
  - an original photo ID;
  - a colour passport photo **no older than 2 months** (21.6–21.7).
  No pen, watch or anything else is allowed; a pen is provided (3.1).
- **Signature:** use running handwriting, **never capitals**, identical at the CBT, CBAT, DV and medical
  (4.12). You will hand-write a self-declaration paragraph at the venue (21.8), so
  practise signing the same way every time.
- **Name and date of birth** must match your 10th certificate exactly (4.8, 8.6).
- **DV originals plus two self-attested photocopy sets** (22.1). Upload your photo and
  signature at <https://oirms-ir.gov.in/rrbdv/> before the DV date (22.2).
  - 10th certificate (date of birth).
  - Degree certificate and marksheets, dated. If the degree certificate is dated after 25.11.2026,
    bring the marksheets with their result-declaration dates.
  - ID and address proof matching the **present address** in the application (16.8).
  - Community certificate in the prescribed format, only if claiming reservation.
- **CBAT information:** RDSO publishes official guidance at
  <https://rdso.indianrailways.gov.in>, under Verticals → Traffic and Psychology →
  Psychology – Candidate's Corner (15.2). **Read it before the CBAT.**
- **Beware of touts.** RRB appoints no agents or coaching centres (23.3).
