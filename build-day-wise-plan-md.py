import csv, datetime as dt
from itertools import groupby
rows=list(csv.DictReader(open("day-wise-plan.csv")))
def fd(s):
    d=dt.date.fromisoformat(s); return d.strftime("%-d %b")
def fdy(s):
    d=dt.date.fromisoformat(s); return d.strftime("%-d %b %Y")
LABEL={"1 GATE BUILD":"Phase 1 — GATE Build","2 CONSOLIDATE":"Phase 2 — Consolidate",
 "3 GATE PEAK":"Phase 3 — GATE Peak","4 REST":"Phase 4 — Rest","5 IBPS NEW":"Phase 5 — IBPS New Subjects",
 "6 IBPS PK REVISION":"Phase 6 — IBPS Professional Knowledge Revision",
 "7 IBPS PRELIMS PREP":"Phase 7 — IBPS Prelims","8 IBPS MAINS PREP":"Phase 8 — IBPS Mains"}
O=[]
w=O.append
w("# Day-wise plan — GATE 2027 then IBPS SO 2027\n")
w(f"**{fdy(rows[0]['Date'])} → {fdy(rows[-1]['Date'])} · {len(rows)} days**\n")
w("Companion to `day-wise-plan.csv` (same content, filterable in a spreadsheet).")
w("Regenerate both with `build-day-wise-plan.py` when the schedule slips — it will.\n")
w("Daily shape: **5 h** main subject · **1.5 h** maths thread · **0.5 h** aptitude · **1 h** spaced revision · **0.5 h** notes and error log. Full method in `HOW-TO-STUDY.md`.\n")
# ---- summary ----
w("## Phases\n")
w("| Phase | Days | Window |")
w("|---|---|---|")
for ph,grp in groupby(rows,key=lambda r:r["Phase"]):
    g=list(grp)
    w(f"| {ph} | {len(g)} | {fdy(g[0]['Date'])} – {fdy(g[-1]['Date'])} |")
# ---- deadlines ----
w("\n## Dates that end the attempt if missed\n")
for r in rows:
    m=r["Milestone"]
    if m and any(k in m for k in ("REGISTRATION","APPLY","CHECK gate","test series")):
        w(f"- **{fdy(r['Date'])}** — {m}")
w("\n---\n")
PHASE_DAILY=("1 GATE BUILD","2 CONSOLIDATE","3 GATE PEAK")
for ph,grp in groupby(rows,key=lambda r:r["Phase"]):
    g=list(grp)
    w(f"\n## {LABEL[ph]} · {fdy(g[0]['Date'])} – {fdy(g[-1]['Date'])}\n")
    if ph in PHASE_DAILY:
        for wk,wg in groupby(g,key=lambda r:r["Week"] or ph):
            wl=list(wg)
            subj=wl[0]["Primary_5h"].split(":")[0]
            hdr=f"### {wk} · {fd(wl[0]['Date'])} – {fd(wl[-1]['Date'])}"
            if wk.startswith("W"): hdr+=f" · {subj}"
            w(hdr+"\n")
            if wk.startswith("W"):
                w(f"*Maths thread all week: {wl[0]['Secondary_1_5h'].replace('Maths: ','')}*\n")
                w("| Date | Day | Main subject — 5 h |")
                w("|---|---|---|")
                for r in wl:
                    p=r["Primary_5h"].split(": ",1)[-1] if ": " in r["Primary_5h"] else r["Primary_5h"]
                    star=" **←"+r["Milestone"]+"**" if r["Milestone"] else ""
                    w(f"| {fd(r['Date'])} | {r['Day']} | {p}{star} |")
            else:
                w("| Date | Day | Primary | Alongside |")
                w("|---|---|---|---|")
                for r in wl:
                    star=" **←"+r["Milestone"]+"**" if r["Milestone"] else ""
                    w(f"| {fd(r['Date'])} | {r['Day']} | {r['Primary_5h']}{star} | {r['Secondary_1_5h']} |")
            w("")
    else:
        w("| Dates | Days | What |")
        w("|---|---|---|")
        for key,rg in groupby(g,key=lambda r:r["Primary_5h"]):
            rl=list(rg)
            rng=fd(rl[0]["Date"]) if len(rl)==1 else f"{fd(rl[0]['Date'])} – {fd(rl[-1]['Date'])}"
            ms=[x["Milestone"] for x in rl if x["Milestone"]]
            extra=f"<br>**{ms[0]}**" if ms else ""
            sec=rl[0]["Secondary_1_5h"]; apt=rl[0]["Aptitude_0_5h"]
            det=key+extra
            if sec: det+=f"<br>*Alongside: {sec}*"
            if apt: det+=f"<br>*Aptitude: {apt}*"
            w(f"| {rng} | {len(rl)} | {det} |")
        w("")
open("DAY-WISE-PLAN.md","w").write("\n".join(O)+"\n")
print("lines:",len(O))
