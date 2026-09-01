import csv, datetime as dt
D=dt.date
rows=[]
def span(a,b):
    d=a; out=[]
    while d<=b: out.append(d); d+=dt.timedelta(days=1)
    return out

# ---------------- PHASE 1: GATE BUILD, weekly subject + topic list ----------------
WEEKS=[
("W01",D(2026,8,11),D(2026,8,17),"C Programming",
 ["Types, operators, precedence, control flow","Functions, scope, storage classes","Recursion I - tracing and stack frames",
  "Recursion II - problems + PYQ","Pointers I - arithmetic, arrays vs pointers","Pointers II - pointer-to-pointer, function pointers",
  "Structures, unions, dynamic memory + week PYQ"],
 "Sets, relations, functions, equivalence, partial orders"),
("W02",D(2026,8,18),D(2026,8,24),"Data Structures",
 ["Arrays and strings","Stacks - implementation and applications","Queues, circular and deque","Linked lists I - singly",
  "Linked lists II - doubly, circular","Linked list problems + PYQ","Week consolidation + all PYQ"],
 "Lattices, Hasse diagrams"),
("W03",D(2026,8,25),D(2026,8,31),"Data Structures",
 ["Binary trees - properties and counting","Tree traversals and reconstruction","Binary search trees - search, insert, delete",
  "BST problems + PYQ","Binary heaps I - build, heapify","Binary heaps II - heapsort, priority queues","Graph representations + week PYQ"],
 "Monoids, groups, subgroups, Lagrange"),
("W04",D(2026,9,1),D(2026,9,7),"Algorithms",
 ["Asymptotic notation and orders of growth","Recurrences - substitution and recursion tree","Master theorem + PYQ",
  "Sorting I - bubble, insertion, selection","Sorting II - merge sort, quick sort","Sorting III - heap, counting, radix, stability",
  "Searching, binary search variants + PYQ"],
 "Propositional logic"),
("W05",D(2026,9,8),D(2026,9,14),"Algorithms",
 ["Hashing - collision resolution, load factor","Divide and conquer","Greedy I - activity selection, fractional knapsack",
  "Greedy II - Huffman coding","Dynamic programming I - LCS, knapsack","Dynamic programming II - matrix chain, coin change",
  "Graph traversal BFS/DFS, MST, shortest paths + PYQ"],
 "First-order logic, quantifiers"),
("W06",D(2026,9,15),D(2026,9,21),"Digital Logic",
 ["Number systems and base conversion","Fixed point and IEEE 754 floating point","Floating point arithmetic + PYQ",
  "Boolean algebra, minterms, maxterms","Karnaugh maps up to 5 variables","Quine-McCluskey - NPTEL/Neso, not in Tarnoff",
  "Combinational I - adders, subtractors, MUX"],
 "Counting, pigeonhole, inclusion-exclusion"),
("W07",D(2026,9,22),D(2026,9,28),"Digital Logic then COA",
 ["Combinational II - decoders, encoders, comparators","Latches and flip-flops","Counters and shift registers",
  "Sequential circuit design + Digital Logic PYQ","COA: instruction formats and ISA","COA: addressing modes",
  "COA: ALU design + PYQ"],
 "Recurrence relations, generating functions"),
("W08",D(2026,9,29),D(2026,10,5),"Computer Organisation",
 ["Hardwired control unit","Microprogrammed control unit","Control unit PYQ","Memory hierarchy and locality",
  "Cache mapping - direct","Cache mapping - associative and set-associative","Cache performance, AMAT + PYQ"],
 "Graph theory - connectivity, degree"),
("W09",D(2026,10,6),D(2026,10,12),"Computer Organisation",
 ["Write policies and replacement algorithms","Memory interfacing","I/O interface and programmed I/O","Interrupts",
  "DMA","Instruction pipelining - stages and speedup","Pipeline hazards + COA PYQ"],
 "Graph colouring, matching, planarity"),
("W10",D(2026,10,13),D(2026,10,19),"Operating Systems",
 ["System calls, processes, PCB","Threads and models","Inter-process communication","CPU scheduling I - FCFS, SJF, SRTF",
  "CPU scheduling II - RR, priority, multilevel","Scheduling PYQ","Synchronisation I - race conditions, critical section"],
 "Linear algebra - matrices, determinants"),
("W11",D(2026,10,20),D(2026,10,26),"Operating Systems",
 ["Synchronisation II - semaphores, classic problems","Deadlock - conditions, prevention, avoidance","Banker's algorithm + PYQ",
  "Memory management, paging, segmentation","Virtual memory and page replacement","TLB, effective access time",
  "File systems, disk scheduling + OS PYQ"],
 "Linear systems, rank, LU decomposition"),
("W12",D(2026,10,27),D(2026,11,2),"Theory of Computation",
 ["Regular expressions and languages","DFA construction","NFA, epsilon-NFA and conversions","DFA minimisation, Myhill-Nerode",
  "Closure properties of regular languages","Pumping lemma for regular languages","Regular language PYQ"],
 "Eigenvalues, eigenvectors"),
("W13",D(2026,11,3),D(2026,11,9),"TOC and Compiler",
 ["Context-free grammars, ambiguity","Normal forms - CNF, GNF","Pushdown automata","CFL closure and pumping lemma",
  "Compiler: lexical analysis","Compiler: top-down parsing, LL(1)","Compiler: bottom-up parsing, LR/SLR/LALR"],
 "Calculus - limits, continuity, differentiability"),
("W14",D(2026,11,10),D(2026,11,16),"Compiler and TOC finish",
 ["Parsing PYQ","Syntax-directed translation","Intermediate code generation","Runtime environments, activation records",
  "Local optimisation, data flow analysis","TOC: Turing machines, decidability","TOC: undecidability, reductions, Rice + PYQ"],
 "Maxima-minima, MVT, integration"),
("W15",D(2026,11,17),D(2026,11,23),"Databases",
 ["ER model and reduction to tables","Relational algebra","Tuple relational calculus","SQL - joins, aggregates, nested",
  "Functional dependencies, closure, keys","Normal forms 1NF-BCNF","Indexing, B and B+ trees - NPTEL, gap in Watt"],
 "Probability - conditional, Bayes"),
("W16",D(2026,11,24),D(2026,11,30),"Computer Networks",
 ["DBMS: transactions, ACID, schedules","DBMS: concurrency control, serialisability + PYQ","Layering, switching, performance metrics",
  "Error detection, CRC, MAC, Ethernet","Distance vector and link state routing","IPv4, fragmentation, CIDR, NAT, subnetting",
  "TCP flow and congestion control, sockets, DNS, HTTP + PYQ"],
 "Distributions, mean/median/mode/SD"),
]
for wk,a,b,subj,topics,maths in WEEKS:
    days=span(a,b)
    for i,d in enumerate(days):
        t=topics[i] if i<len(topics) else "Consolidation + PYQ backlog"
        rows.append(dict(Date=d.isoformat(),Day=d.strftime("%a"),Phase="1 GATE BUILD",Week=wk,
            Primary_5h=f"{subj}: {t}",Secondary_1_5h=f"Maths: {maths}",Aptitude_0_5h="Quantitative-494Q",
            Revise_1h="",Milestone=""))

# ---------------- PHASE 2: consolidate ----------------
P2=[("Data Structures",3),("Algorithms",4),("Discrete Maths",3),("Operating Systems",4),
    ("Digital Logic",2),("Computer Organisation",3),("Theory of Computation",3),("Compiler Design",2),
    ("Databases",3),("Computer Networks",3),("Engineering Maths",1)]
d=D(2026,12,1); seq=[]
for s,n in P2: seq += [s]*n
for i,s in enumerate(seq):
    rows.append(dict(Date=d.isoformat(),Day=d.strftime("%a"),Phase="2 CONSOLIDATE",Week="",
        Primary_5h=f"Revision 1: {s} - blank-paper recall, then redo ~ x ? questions",
        Secondary_1_5h="Subject test Tue/Fri + 2h written analysis" if d.weekday() in (1,4) else "Short-notes compression",
        Aptitude_0_5h="Mixed aptitude, timed",Revise_1h="Error log review",Milestone=""))
    d+=dt.timedelta(days=1)
assert d==D(2027,1,1), f"phase2 revision ends {d}, expected 2027-01-01"
for d2 in span(d,D(2027,1,3)):
    rows.append(dict(Date=d2.isoformat(),Day=d2.strftime("%a"),Phase="2 CONSOLIDATE",Week="",
        Primary_5h="Full paper under time: GATE 2024, 2025, 2026 - one per sitting",
        Secondary_1_5h="3h analysis, every wrong AND every lucky guess",Aptitude_0_5h="Mixed aptitude, timed",
        Revise_1h="Error log review",Milestone="Baseline: aim 60-65" if d2==D(2027,1,3) else ""))

# ---------------- PHASE 3: peak ----------------
mock=0
for d2 in span(D(2027,1,4),D(2027,2,5)):
    n=(d2-D(2027,1,4)).days
    if d2>=D(2027,1,26):
        p="Revision round 3: short notes + error log ONLY"; s="Formula sheet recitation"
    elif n%2==0:
        mock+=1; p=f"FULL MOCK #{mock} - exam time of day, 3h, no breaks"; s="Begin analysis"
    else:
        p="Mock analysis, 3h - then revision 2 on what it exposed"; s="Error log entries"
    rows.append(dict(Date=d2.isoformat(),Day=d2.strftime("%a"),Phase="3 GATE PEAK",Week="",
        Primary_5h=p,Secondary_1_5h=s,Aptitude_0_5h="Aptitude 30 min",Revise_1h="Weak-topic recall",
        Milestone="NO NEW MATERIAL FROM TODAY" if d2==D(2027,1,4) else ("Target: mocks 75+" if d2==D(2027,1,25) else "")))
for d2 in span(D(2027,2,6),D(2027,2,7)):
    rows.append(dict(Date=d2.isoformat(),Day=d2.strftime("%a"),Phase="3 GATE PEAK",Week="",
        Primary_5h="*** GATE 2027 EXAM ***",Secondary_1_5h="",Aptitude_0_5h="",Revise_1h="",Milestone="GATE EXAM"))

# ---------------- PHASE 4-7: IBPS ----------------
def block(a,b,phase,primary,secondary,apt,ms_first=""):
    for i,d2 in enumerate(span(a,b)):
        rows.append(dict(Date=d2.isoformat(),Day=d2.strftime("%a"),Phase=phase,Week="",
            Primary_5h=primary,Secondary_1_5h=secondary,Aptitude_0_5h=apt,Revise_1h="",
            Milestone=ms_first if i==0 else ""))
block(D(2027,2,8),D(2027,2,21),"4 REST","Rest. Do not study.","","","GATE done - recover for 2 weeks")
NEW=[(D(2027,2,22),D(2027,3,7),"Software Engineering - SDLC, waterfall, spiral, agile, UML, cohesion/coupling","Hastings-Software-Engineering.pdf"),
     (D(2027,3,8),D(2027,3,17),"OOP - classes, inheritance, polymorphism, encapsulation","Eck-Java-OOP.pdf"),
     (D(2027,3,18),D(2027,3,27),"Information and Cyber Security","Anderson-Security-Engineering-selected.pdf"),
     (D(2027,3,28),D(2027,4,3),"Web Technologies + Cloud Computing","Eloquent-JavaScript + NIST-Cloud")]
for a,b,t,f in NEW:
    block(a,b,"5 IBPS NEW",f"IBPS PK new: {t}",f"Book: {f}","IBPS-pattern aptitude 1h - START DAILY")
block(D(2027,4,4),D(2027,4,30),"5 IBPS NEW",
      "Gap topics: 8085/8086 microprocessor, data mining/warehousing/Big Data, black-box vs white-box testing terms, banking IT awareness (NEFT/RTGS/IMPS/UPI, core banking)",
      "NPTEL / notes - no free book covers these","IBPS aptitude 1.5h daily","Fill the four uncovered gaps")
block(D(2027,5,1),D(2027,6,20),"6 IBPS PK REVISION",
      "Revise A-covered-by-GATE: DBMS, Networks, OS, DS, Algorithms, COA, C - 2 subjects/week, revision only",
      "Your GATE short notes do the work","IBPS aptitude 1.5h daily + weekly sectional mock","PK revision - this is 100% of your merit")
block(D(2027,6,21),D(2027,7,31),"7 IBPS PRELIMS PREP",
      "APPLICATION WINDOW - apply the day it opens (ibps.in). Then prelims mocks 2x/week",
      "PK quick revision daily","Sectional-timed aptitude 2h daily","APPLY. Missing this ends the attempt")
block(D(2027,8,1),D(2027,8,31),"7 IBPS PRELIMS PREP",
      "Sectional-timing drills only - 20 min per section, hard stop","PK 50-mark section is half of prelims",
      "Full prelims mocks alternate days","PRELIMS THIS MONTH - clear cutoff, do not optimise")
block(D(2027,9,1),D(2027,10,31),"8 IBPS MAINS PREP",
      "Professional Knowledge, hard - the ONLY section that counts for merit",
      "Descriptive English practice 2x/week","Mains-level PK mocks weekly","Only PK scores. Everything else qualifies")
block(D(2027,11,1),D(2027,11,30),"8 IBPS MAINS PREP","*** IBPS SO MAINS (expected) *** then interview prep",
      "Projects, banking awareness, current affairs","","MAINS + interview prep")

with open("day-wise-plan.csv","w",newline="") as f:
    w=csv.DictWriter(f,fieldnames=["Date","Day","Phase","Week","Primary_5h","Secondary_1_5h","Aptitude_0_5h","Revise_1h","Milestone"])
    w.writeheader(); w.writerows(rows)
print(f"rows: {len(rows)}   {rows[0]['Date']} -> {rows[-1]['Date']}")
from collections import Counter
for k,v in Counter(r["Phase"] for r in rows).items(): print(f"  {k:24} {v:4} days")
