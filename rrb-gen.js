/* RRB Station Master practice — question generators.
   Every question is generated from code and its answer is computed, not typed in.
   Pure functions only: no DOM access, so this file also runs under Node for testing. */
(function (root) {
"use strict";

/* ---------- helpers ---------- */
const rnd = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
const pick = a => a[Math.floor(Math.random() * a.length)];
const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const gcd = (a, b) => { a = Math.abs(a); b = Math.abs(b); while (b) [a, b] = [b, a % b]; return a || 1; };
const r2 = x => Math.round(x * 100) / 100;
const fmt = x => { x = r2(x); return Number.isInteger(x) ? x.toLocaleString("en-IN") : String(x); };
const ord = n => n + ((n % 100 >= 11 && n % 100 <= 13) ? "th" : ({ 1: "st", 2: "nd", 3: "rd" }[n % 10] || "th"));

function frac(n, d) { if (d < 0) { n = -n; d = -d; } const g = gcd(n, d); return { n: n / g, d: d / g }; }
const fstr = f => f.d === 1 ? String(f.n) : f.n + "/" + f.d;
const fadd = (a, b) => frac(a.n * b.d + b.n * a.d, a.d * b.d);
const fmul = (a, b) => frac(a.n * b.n, a.d * b.d);

const MS = "Maths & Science", DI = "Data Analysis & Interpretation", LR = "Logical Capability & RC", MR = "Mental Reasoning";

/* Build an MCQ from a correct string and candidate wrong strings. Always returns 4 unique options. */
function mcq(q, correct, wrong, exp, extra) {
  correct = String(correct);
  const opts = [correct];
  for (const w of wrong) { const s = String(w); if (s && !opts.includes(s) && opts.length < 4) opts.push(s); }
  let guard = 0;
  while (opts.length < 4 && guard++ < 50) { const s = String(extra ? extra() : "—" + guard); if (!opts.includes(s)) opts.push(s); }
  const o = shuffle(opts);
  return { q, opts: o, a: o.indexOf(correct), exp };
}
/* Numeric distractors near x, formatted with unit/prefix, all different from the correct value. */
function numOpts(x, traps, pre = "", suf = "") {
  const f = v => pre + fmt(v) + suf;
  const c = f(x);
  const isInt = Number.isInteger(r2(x));
  const step = Math.max(isInt ? 1 : 0.5, Math.round(Math.abs(x) * 0.1));
  const cands = (traps || []).concat([x + step, x - step, x * 1.2, x * 0.8, x + 2 * step, x * 2, x / 2]);
  const wrong = [];
  for (let v of cands) { if (!isFinite(v)) continue; if (isInt) v = Math.round(v); if (r2(v) === 0 && x !== 0) continue; const s = f(v); if (s !== c && !wrong.includes(s) && v >= 0 === x >= 0) wrong.push(s); }
  let k = 3;
  while (wrong.length < 3) { const s = f(x + k * step); if (s !== c && !wrong.includes(s)) wrong.push(s); k++; }
  return { c, wrong };
}
function nq(q, x, traps, exp, pre, suf) { const o = numOpts(x, traps, pre, suf); return mcq(q, o.c, o.wrong, exp); }

const NAMES = ["Asha", "Ravi", "Meena", "Kiran", "Arjun", "Pooja", "Vikram", "Neha", "Rahul", "Sana", "Deepak", "Priya", "Imran", "Kavya", "Manoj", "Divya", "Suresh", "Anita", "Farhan", "Lata"];

/* ---------- MATHS ---------- */
const maths = {
  pctOf() {
    const a = pick([5, 10, 12, 15, 20, 25, 30, 35, 40, 45, 60, 75, 80, 120, 125, 150]), y = rnd(4, 60) * 20;
    return nq(`What is ${a}% of ${fmt(y)}?`, a * y / 100, [a * y / 10, y / a], `${a}% of ${y} = ${a} × ${y} / 100 = ${fmt(a * y / 100)}.`);
  },
  pctMoreLess() {
    const p = pick([10, 20, 25, 50, 60, 100]);
    const ans = 100 * p / (100 + p);
    return nq(`A's salary is ${p}% more than B's. By what percent is B's salary less than A's?`, ans, [p, 100 * p / (100 - p)],
      `If B = 100, A = ${100 + p}. B is less by ${p}/${100 + p} × 100 = ${fmt(ans)}%.`, "", "%");
  },
  successive() {
    const a = pick([10, 20, 25, 30, 40, 50]), b = pick([10, 20, 25, 30, 40, 50]);
    const net = r2(a - b - a * b / 100);
    const s = v => v === 0 ? "No change" : fmt(Math.abs(v)) + "% " + (v > 0 ? "increase" : "decrease");
    return mcq(`The price of an item is increased by ${a}% and then decreased by ${b}%. What is the net change?`, s(net),
      [s(a - b), s(-net), s(net + 5), s(a - b + a * b / 100), s(net - 5)],
      `Net = a − b − ab/100 = ${a} − ${b} − ${a * b / 100} = ${fmt(net)}%.`);
  },
  profit() {
    const cp = rnd(5, 50) * 100, m = pick([20, 25, 30, 40, 50]), d = pick([10, 12, 20, 25]);
    const sp = cp * (1 + m / 100) * (1 - d / 100), p = r2((sp - cp) / cp * 100);
    const s = v => v === 0 ? "No profit, no loss" : fmt(Math.abs(v)) + "% " + (v > 0 ? "profit" : "loss");
    return mcq(`A shopkeeper marks an article ${m}% above its cost price of ₹${fmt(cp)} and gives a ${d}% discount. What is the profit or loss percent?`,
      s(p), [s(m - d), s(-p), s(p + 2), s(p - 2), s(m)],
      `MP = ${fmt(cp * (1 + m / 100))}, SP = ${fmt(sp)}. (SP − CP)/CP × 100 = ${fmt(p)}%. Shortcut: m − d − md/100.`);
  },
  si() {
    const P = rnd(2, 20) * 500, R = pick([4, 5, 6, 8, 10, 12]), T = rnd(2, 6), si = P * R * T / 100;
    return nq(`Find the simple interest on ₹${fmt(P)} at ${R}% per annum for ${T} years.`, si, [P + si, P * R / 100], `SI = PRT/100 = ${P}×${R}×${T}/100 = ₹${fmt(si)}.`, "₹");
  },
  ci() {
    const P = pick([1000, 2000, 4000, 5000, 8000, 10000, 12500, 16000]), R = pick([5, 10, 20]);
    const ci = P * ((1 + R / 100) ** 2 - 1), si = 2 * P * R / 100;
    return nq(`Find the compound interest on ₹${fmt(P)} for 2 years at ${R}% per annum, compounded annually.`, ci, [si, P + ci, ci + P * R / 100],
      `CI = P[(1 + R/100)² − 1] = ${fmt(P)} × ${fmt((1 + R / 100) ** 2 - 1)} = ₹${fmt(ci)}. (CI − SI for 2 years = P(R/100)² = ₹${fmt(ci - si)}.)`, "₹");
  },
  ratioDiv() {
    const a = rnd(1, 7), b = rnd(1, 7), c = rnd(1, 7), k = rnd(2, 20) * 10, tot = k * (a + b + c);
    return nq(`₹${fmt(tot)} is divided among X, Y and Z in the ratio ${a} : ${b} : ${c}. What is Y's share?`, k * b, [k * a, k * c, tot / 3],
      `One part = ${tot}/${a + b + c} = ${k}. Y = ${b} × ${k} = ₹${fmt(k * b)}.`, "₹");
  },
  ratioChain() {
    let a = rnd(1, 9), b = rnd(1, 9), c = rnd(1, 9), d = rnd(1, 9);
    let g = gcd(a, b); a /= g; b /= g; g = gcd(c, d); c /= g; d /= g;
    let x = a * c, y = b * c, z = b * d; g = gcd(gcd(x, y), z); x /= g; y /= g; z /= g;
    const s = (p, q, r) => `${p} : ${q} : ${r}`;
    return mcq(`If A : B = ${a} : ${b} and B : C = ${c} : ${d}, find A : B : C.`, s(x, y, z),
      [s(a, b, d), s(a, b * c, d), s(x, z, y), s(a * d, b * c, b * d), s(z, y, x)],
      `Make B equal: A : B = ${a * c} : ${b * c}, B : C = ${b * c} : ${b * d}. So A : B : C = ${s(x, y, z)}.`, () => s(x + rnd(1, 3), y, z));
  },
  avgNew() {
    let n, m, m2, v;
    do { n = rnd(5, 12); m = rnd(20, 60); m2 = m + pick([1, 2, 3, -1, -2]); v = (n + 1) * m2 - n * m; } while (v <= 0);
    return nq(`The average of ${n} numbers is ${m}. When one more number is added, the average becomes ${m2}. What is the new number?`, v, [m2, m + m2, (n + 1) * (m2 - m)],
      `New total − old total = ${n + 1}×${m2} − ${n}×${m} = ${v}.`);
  },
  trainPole() {
    const s = pick([36, 54, 72, 90, 108, 126, 144]), v = s * 5 / 18, t = rnd(6, 20), L = v * t;
    if (Math.random() < .5) return nq(`A train ${L} m long runs at ${s} km/h. How long will it take to cross a pole?`, t, [L / s, t * 2], `${s} km/h = ${s}×5/18 = ${v} m/s. Time = ${L}/${v} = ${t} s.`, "", " s");
    const k = rnd(4, 20), P = v * k;
    return nq(`A train ${L} m long runs at ${s} km/h. How long will it take to cross a platform ${P} m long?`, t + k, [t, k, (L + P) / s],
      `Distance = train + platform = ${L + P} m. Speed = ${v} m/s. Time = ${L + P}/${v} = ${t + k} s.`, "", " s");
  },
  trainsTwo() {
    const sp = [36, 54, 72, 90, 108];
    let s1 = pick(sp), s2 = pick(sp); if (s1 === s2) s1 += 18;
    const same = Math.random() < .5 && s1 !== s2;
    if (same && s1 < s2) [s1, s2] = [s2, s1];
    const rel = (same ? s1 - s2 : s1 + s2) * 5 / 18, t = rnd(5, 20) * (same ? 3 : 1), tot = rel * t;
    const L1 = Math.round(tot * rnd(3, 7) / 10 / 10) * 10, L2 = tot - L1;
    return nq(`Two trains of lengths ${L1} m and ${L2} m run on parallel tracks at ${s1} km/h and ${s2} km/h in ${same ? "the same direction" : "opposite directions"}. How long will the faster train take to completely cross the other?`,
      t, [tot / ((same ? s1 + s2 : Math.abs(s1 - s2)) * 5 / 18), t * 2, t + 5],
      `Relative speed = ${same ? s1 + " − " + s2 : s1 + " + " + s2} = ${same ? s1 - s2 : s1 + s2} km/h = ${fmt(rel)} m/s. Distance = ${L1} + ${L2} = ${tot} m. Time = ${fmt(t)} s.`, "", " s");
  },
  avgSpeed() {
    const [x, y, ans] = pick([[40, 60, 48], [30, 60, 40], [60, 90, 72], [20, 30, 24], [45, 90, 60], [36, 45, 40], [30, 45, 36], [40, 120, 60]]);
    return nq(`A person travels from A to B at ${x} km/h and returns at ${y} km/h. What is the average speed for the whole journey?`, ans, [(x + y) / 2],
      `For equal distances, average speed = 2xy/(x + y) = 2×${x}×${y}/${x + y} = ${ans} km/h. Not the simple mean.`, "", " km/h");
  },
  work() {
    const [a, b, t] = pick([[12, 24, 8], [10, 15, 6], [20, 30, 12], [6, 12, 4], [18, 36, 12], [15, 30, 10], [12, 36, 9], [20, 5, 4], [24, 8, 6], [30, 20, 12], [21, 42, 14], [40, 60, 24], [10, 40, 8], [9, 18, 6]]);
    if (Math.random() < .5) return nq(`A can finish a work in ${a} days and B in ${b} days. In how many days can they finish it working together?`, t, [(a + b) / 2, a + b], `Together per day = 1/${a} + 1/${b} = 1/${t}. So ${t} days.`, "", " days");
    return nq(`A and B together finish a work in ${t} days. A alone can do it in ${a} days. In how many days can B alone do it?`, b, [a - t, a + t], `B per day = 1/${t} − 1/${a} = 1/${b}. So ${b} days.`, "", " days");
  },
  hcfLcm() {
    const h = rnd(2, 15); let x, y; do { x = rnd(2, 9); y = rnd(2, 9); } while (x === y || gcd(x, y) !== 1);
    const A = h * x, B = h * y, L = h * x * y;
    const v = rnd(0, 2);
    if (v === 0) return nq(`Find the LCM of ${A} and ${B}.`, L, [A * B, h, L * 2], `HCF = ${h}. LCM = ${A}×${B}/${h} = ${L}.`);
    if (v === 1) return nq(`Find the HCF of ${A} and ${B}.`, h, [h * x, h * y, L], `${A} = ${h}×${x}, ${B} = ${h}×${y}, ${x} and ${y} are coprime, so HCF = ${h}.`);
    return nq(`The HCF of two numbers is ${h} and their LCM is ${L}. If one number is ${A}, find the other.`, B, [L / h, A + h], `HCF × LCM = product of the numbers. Other = ${h}×${L}/${A} = ${B}.`);
  },
  ap() {
    const a = rnd(-10, 20), d = pick([2, 3, 4, 5, 6, 7, -2, -3]), n = rnd(10, 40);
    const seq = [a, a + d, a + 2 * d, a + 3 * d].join(", ");
    if (Math.random() < .5) { const t = a + (n - 1) * d; return nq(`Find the ${ord(n)} term of the AP ${seq}, …`, t, [a + n * d, t + d], `aₙ = a + (n−1)d = ${a} + ${n - 1}×${d} = ${t}.`); }
    const s = n * (2 * a + (n - 1) * d) / 2;
    return nq(`Find the sum of the first ${n} terms of the AP ${seq}, …`, s, [n * (a + n * d), s + d * n], `Sₙ = n/2 [2a + (n−1)d] = ${n}/2 × [${2 * a} + ${(n - 1) * d}] = ${fmt(s)}.`);
  },
  divisible() {
    const N = rnd(1000, 9999), k = pick([7, 11, 13, 17, 19, 23]), ans = (k - N % k) % k;
    const w = [N % k, k - ans, (ans + 1) % k, (ans + 2) % k, (ans + k - 1) % k].filter(v => v !== ans);
    return mcq(`What is the least number that must be added to ${N} to make it exactly divisible by ${k}?`, ans, w,
      `${N} ÷ ${k} leaves remainder ${N % k}. Add ${k} − ${N % k} = ${ans}${ans === 0 ? " (already divisible)" : ""}.`);
  },
  unitDigit() {
    const b = rnd(2, 9) + 10 * rnd(1, 20), e = rnd(10, 99);
    const cyc = []; let x = b % 10; for (let i = 0; i < 4; i++) { cyc.push(x); x = x * (b % 10) % 10; }
    const ans = cyc[(e - 1) % 4];
    return mcq(`What is the unit digit of ${b}^${e}?`, ans, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].filter(v => v !== ans).sort(() => Math.random() - .5),
      `Unit digits of ${b % 10}ⁿ repeat ${cyc.join(", ")} (cycle of 4). ${e} mod 4 = ${e % 4 || 4} (use 4 for 0), giving ${ans}.`);
  },
  circle() {
    const r = 7 * rnd(1, 6);
    if (Math.random() < .5) return nq(`Find the area of a circle of radius ${r} cm. (π = 22/7)`, 22 * r * r / 7, [44 * r / 7, 22 * r / 7 * 2 * r], `Area = πr² = 22/7 × ${r}² = ${fmt(22 * r * r / 7)} cm².`, "", " cm²");
    return nq(`Find the circumference of a circle of radius ${r} cm. (π = 22/7)`, 44 * r / 7, [22 * r * r / 7, 22 * r / 7], `C = 2πr = 2 × 22/7 × ${r} = ${fmt(44 * r / 7)} cm.`, "", " cm");
  },
  cylinder() {
    const r = 7 * rnd(1, 3), h = rnd(5, 20), V = 22 * r * r * h / 7;
    return nq(`Find the volume of a cylinder with radius ${r} cm and height ${h} cm. (π = 22/7)`, V, [2 * 22 * r * h / 7, V / 3], `V = πr²h = 22/7 × ${r}² × ${h} = ${fmt(V)} cm³. (A cone of the same size would be ⅓ of this.)`, "", " cm³");
  },
  cuboid() {
    const l = rnd(3, 15), b = rnd(2, 12), h = rnd(2, 10), T = 2 * (l * b + b * h + h * l);
    return nq(`Find the total surface area of a cuboid ${l} cm × ${b} cm × ${h} cm.`, T, [l * b * h, l * b + b * h + h * l, 2 * h * (l + b)], `TSA = 2(lb + bh + hl) = 2(${l * b} + ${b * h} + ${h * l}) = ${T} cm².`, "", " cm²");
  },
  trigRatio() {
    const [p, b, h] = pick([[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25], [20, 21, 29], [4, 3, 5], [12, 5, 13]]);
    const ask = pick(["sin", "cos", "sec", "cosec"]);
    const val = { sin: p + "/" + h, cos: b + "/" + h, sec: h + "/" + b, cosec: h + "/" + p }[ask];
    return mcq(`If tan θ = ${p}/${b} (θ acute), find ${ask} θ.`, val, [p + "/" + h, b + "/" + h, h + "/" + b, h + "/" + p, b + "/" + p].filter(v => v !== val),
      `Opposite = ${p}, adjacent = ${b}, hypotenuse = √(${p}² + ${b}²) = ${h}. ${ask} θ = ${val}.`);
  },
  trigValue() {
    const S2 = { 30: frac(1, 4), 45: frac(1, 2), 60: frac(3, 4) }, C2 = { 30: frac(3, 4), 45: frac(1, 2), 60: frac(1, 4) }, T2 = { 30: frac(1, 3), 45: frac(1, 1), 60: frac(3, 1) };
    const A = pick([30, 45, 60]), B = pick([30, 45, 60]), C = pick([30, 45, 60]);
    const k = rnd(1, 3);
    const v = fadd(fadd(fmul(frac(k, 1), S2[A]), C2[B]), T2[C]);
    const w = [fadd(v, frac(1, 2)), fadd(v, frac(-1, 4)), fadd(v, frac(1, 1)), fadd(v, frac(-1, 2)), fadd(v, frac(1, 3))].map(fstr);
    return mcq(`Find the value of ${k > 1 ? k : ""}sin²${A}° + cos²${B}° + tan²${C}°.`, fstr(v), w,
      `sin²${A}° = ${fstr(S2[A])}, cos²${B}° = ${fstr(C2[B])}, tan²${C}° = ${fstr(T2[C])}. Total = ${fstr(v)}.`);
  },
  probDice() {
    const s = rnd(2, 12), c = 6 - Math.abs(s - 7), v = fstr(frac(c, 36));
    const w = [1, 2, 3, 4, 5, 6].filter(x => x !== c).map(x => fstr(frac(x, 36))).concat([fstr(frac(c, 12)), "1/6"]);
    return mcq(`Two fair dice are thrown. What is the probability that the sum is ${s}?`, v, w, `There are 36 outcomes; ${c} give a sum of ${s}. P = ${c}/36 = ${v}.`);
  },
  probCards() {
    const F = [["a red king", 2], ["a face card", 12], ["an ace", 4], ["a heart", 13], ["a red card", 26], ["a black face card", 6], ["a king or a queen", 8], ["not a heart", 39], ["the ace of spades", 1], ["a number card from 2 to 10", 36]];
    const [txt, n] = pick(F), v = fstr(frac(n, 52));
    return mcq(`One card is drawn from a well-shuffled pack of 52. What is the probability that it is ${txt}?`, v, shuffle(F.map(f => fstr(frac(f[1], 52))).filter(x => x !== v)),
      `Favourable cards = ${n}. P = ${n}/52 = ${v}.`);
  },
  probCoins() {
    const n = rnd(2, 4);
    if (Math.random() < .5) { const v = fstr(frac(2 ** n - 1, 2 ** n)); return mcq(`${n} fair coins are tossed. What is the probability of getting at least one head?`, v, [fstr(frac(1, 2 ** n)), "1/2", fstr(frac(n, 2 ** n)), fstr(frac(2 ** n - 2, 2 ** n)), "1/3", "2/3", "1"], `P(at least one head) = 1 − P(no head) = 1 − 1/${2 ** n} = ${v}.`); }
    const k = rnd(1, n - 1), C = [1, n, n * (n - 1) / 2, n * (n - 1) * (n - 2) / 6][k], v = fstr(frac(C, 2 ** n));
    return mcq(`${n} fair coins are tossed. What is the probability of getting exactly ${k} head${k > 1 ? "s" : ""}?`, v, [fstr(frac(1, 2 ** n)), fstr(frac(k, 2 ** n)), "1/2", fstr(frac(C + 1, 2 ** n)), fstr(frac(2 ** n - 1, 2 ** n)), "1/3", "2/3", "1"],
      `Ways = C(${n},${k}) = ${C}. Total = 2^${n} = ${2 ** n}. P = ${v}.`);
  },
  stats() {
    const v = rnd(0, 2);
    let xs = Array.from({ length: 7 }, () => rnd(10, 60));
    if (v === 0) { const s = xs.reduce((a, b) => a + b, 0); xs[6] += (7 - s % 7) % 7; const m = xs.reduce((a, b) => a + b, 0) / 7; return nq(`Find the mean of: ${xs.join(", ")}.`, m, [], `Sum = ${m * 7}. Mean = ${m * 7}/7 = ${m}.`); }
    if (v === 1) { const so = xs.slice().sort((a, b) => a - b), md = so[3]; return mcq(`Find the median of: ${xs.join(", ")}.`, md, [xs[3], so[2], so[4], Math.round(xs.reduce((a, b) => a + b, 0) / 7)], `Sorted: ${so.join(", ")}. Middle (4th) value = ${md}.`, () => md + rnd(1, 5)); }
    const mo = xs[2]; xs[5] = mo; xs[0] = mo === xs[0] ? xs[0] + 1 : xs[0];
    const cnt = {}; xs.forEach(x => cnt[x] = (cnt[x] || 0) + 1);
    const best = Math.max(...Object.values(cnt)), modes = Object.keys(cnt).filter(k => cnt[k] === best);
    if (modes.length !== 1) return maths.stats();
    return mcq(`Find the mode of: ${xs.join(", ")}.`, modes[0], xs.filter(x => String(x) !== modes[0]).concat([+modes[0] + 1, +modes[0] - 1, +modes[0] + 2]), `${modes[0]} occurs most often (${best} times).`);
  },
  ages() {
    let a, b, k, t, c, d, g;
    do { a = rnd(2, 7); b = rnd(2, 7); k = rnd(3, 8); t = rnd(3, 12); c = a * k + t; d = b * k + t; g = gcd(c, d); } while (a === b || gcd(a, b) !== 1);
    return nq(`The present ages of P and Q are in the ratio ${a} : ${b}. After ${t} years the ratio will be ${c / g} : ${d / g}. What is P's present age?`, a * k, [b * k, a * k + t, a * t],
      `Let ages be ${a}x and ${b}x. (${a}x + ${t})/(${b}x + ${t}) = ${c / g}/${d / g} gives x = ${k}. P = ${a * k} years.`, "", " years");
  },
  linEq() {
    const x = rnd(5, 60), y = rnd(2, x - 1);
    return nq(`The sum of two numbers is ${x + y} and their difference is ${x - y}. Find the larger number.`, x, [y, x + y, (x + y) / 2], `Larger = (sum + difference)/2 = (${x + y} + ${x - y})/2 = ${x}.`);
  },
};

/* ---------- BASIC SCIENCE ---------- */
const sci = {
  ke() { const m = rnd(2, 20), v = rnd(2, 20), E = m * v * v / 2; return nq(`Find the kinetic energy of a body of mass ${m} kg moving at ${v} m/s.`, E, [m * v * v, m * v, m * v / 2], `KE = ½mv² = ½ × ${m} × ${v}² = ${fmt(E)} J.`, "", " J"); },
  keRatio() { const k = pick([2, 3, 4]); return mcq(`If the speed of a body becomes ${k} times, its kinetic energy becomes`, `${k * k} times`, [`${k} times`, `${2 * k} times`, `${k ** 3} times`, `1/${k} times`], `KE ∝ v², so it becomes ${k}² = ${k * k} times.`); },
  work() { const F = rnd(5, 50) * 2, d = rnd(2, 30); return nq(`A force of ${F} N moves a body ${d} m in the direction of the force. Find the work done.`, F * d, [F / d, F + d], `W = F × d = ${F} × ${d} = ${F * d} J.`, "", " J"); },
  power() { const W = rnd(2, 30) * 600, t = pick([10, 20, 30, 60, 120]), P = W / t; return nq(`A machine does ${fmt(W)} J of work in ${t} s. What is its power?`, P, [W * t, P / 1000, P * 60], `P = W/t = ${W}/${t} = ${fmt(P)} W.`, "", " W"); },
  density() { const d = pick([0.8, 1.2, 2.5, 2.7, 7.8, 8.9, 11.3, 19.3]), V = rnd(2, 20) * 10, m = r2(d * V); return nq(`A metal block of volume ${V} cm³ has a mass of ${fmt(m)} g. What is its density in kg/m³?`, d * 1000, [d, d * 100, d * 10000], `ρ = m/V = ${fmt(m)}/${V} = ${d} g/cm³. 1 g/cm³ = 1000 kg/m³, so ${fmt(d * 1000)} kg/m³.`, "", " kg/m³"); },
  kmhToMs() { const s = 18 * rnd(1, 8); if (Math.random() < .5) return nq(`Convert ${s} km/h into m/s.`, s * 5 / 18, [s * 18 / 5, s / 3.6 * 2], `Multiply by 5/18: ${s} × 5/18 = ${s * 5 / 18} m/s.`, "", " m/s"); const v = s * 5 / 18; return nq(`Convert ${v} m/s into km/h.`, s, [v * 5 / 18, v * 3.6 / 2], `Multiply by 18/5: ${v} × 18/5 = ${s} km/h.`, "", " km/h"); },
  relVel() { const a = rnd(30, 90), b = rnd(20, a - 5); const same = Math.random() < .5; return nq(`Two cars move ${same ? "in the same direction" : "towards each other"} at ${a} km/h and ${b} km/h. What is their relative speed?`, same ? a - b : a + b, [same ? a + b : a - b, (a + b) / 2], `${same ? "Same direction: subtract" : "Opposite directions: add"} the speeds = ${same ? a - b : a + b} km/h.`, "", " km/h"); },
  motion() {
    const u = rnd(0, 10), a = rnd(1, 5), t = rnd(2, 10);
    if (Math.random() < .5) return nq(`A body starts with velocity ${u} m/s and accelerates uniformly at ${a} m/s². What is its velocity after ${t} s?`, u + a * t, [a * t, u * t + a], `v = u + at = ${u} + ${a}×${t} = ${u + a * t} m/s.`, "", " m/s");
    const s = u * t + a * t * t / 2; return nq(`A body starts with velocity ${u} m/s and accelerates uniformly at ${a} m/s². How far does it travel in ${t} s?`, s, [u * t + a * t * t, (u + a * t) * t], `s = ut + ½at² = ${u * t} + ½×${a}×${t * t} = ${fmt(s)} m.`, "", " m");
  },
  ohm() {
    const v = rnd(0, 2), R = rnd(2, 30), I = rnd(1, 10) / 2, V = R * I;
    if (v === 0) return nq(`A current of ${I} A flows through a resistor of ${R} Ω. Find the potential difference across it.`, V, [R / I, I / R * 10], `V = IR = ${I} × ${R} = ${fmt(V)} V.`, "", " V");
    if (v === 1) return nq(`A potential difference of ${fmt(V)} V across a resistor drives a current of ${I} A. Find the resistance.`, R, [V * I, I / V], `R = V/I = ${fmt(V)}/${I} = ${R} Ω.`, "", " Ω");
    return nq(`A ${fmt(V)} V supply is connected across a ${R} Ω resistor. What power is dissipated?`, V * V / R, [V * R, V / R], `P = V²/R = ${fmt(V)}²/${R} = ${fmt(V * V / R)} W.`, "", " W");
  },
  resistors() {
    const [a, b] = pick([[2, 2], [3, 6], [4, 12], [6, 12], [10, 10], [4, 4], [6, 3], [20, 30], [12, 24], [5, 20]]);
    if (Math.random() < .5) return nq(`Two resistors of ${a} Ω and ${b} Ω are connected in series. Find the equivalent resistance.`, a + b, [a * b / (a + b), a * b], `Series: R = R₁ + R₂ = ${a + b} Ω.`, "", " Ω");
    return nq(`Two resistors of ${a} Ω and ${b} Ω are connected in parallel. Find the equivalent resistance.`, a * b / (a + b), [a + b, (a + b) / 2], `Parallel: R = R₁R₂/(R₁ + R₂) = ${a * b}/${a + b} = ${fmt(a * b / (a + b))} Ω. Always less than the smallest resistor.`, "", " Ω");
  },
  units() {
    const W = pick([100, 200, 500, 1000, 1500, 2000]), h = rnd(2, 8), d = pick([10, 30]), u = W * h * d / 1000;
    return nq(`An appliance rated ${W} W runs ${h} hours a day for ${d} days. How many units (kWh) of electricity does it use?`, u, [W * h * d, u * 10, W * h / 1000], `Energy = ${W} W × ${h * d} h = ${W * h * d} Wh = ${fmt(u)} kWh. 1 unit = 1 kWh.`, "", " units");
  },
  heat() {
    const m = rnd(1, 10) / 2, dT = rnd(5, 40), c = 4200, Q = m * c * dT;
    return nq(`How much heat is needed to raise the temperature of ${m} kg of water by ${dT} °C? (specific heat of water = 4200 J/kg°C)`, Q / 1000, [m * c / 1000, Q / 100, m * dT], `Q = mcΔT = ${m} × 4200 × ${dT} = ${fmt(Q)} J = ${fmt(Q / 1000)} kJ.`, "", " kJ");
  },
  temp() {
    const v = rnd(0, 2);
    if (v === 0) { const C = 5 * rnd(-8, 20); return nq(`Convert ${C} °C to °F.`, C * 9 / 5 + 32, [C * 5 / 9 + 32, C + 32, C * 9 / 5], `F = 9C/5 + 32 = ${fmt(C * 9 / 5)} + 32 = ${fmt(C * 9 / 5 + 32)} °F.`, "", " °F"); }
    if (v === 1) { const C = rnd(-50, 150); return nq(`Convert ${C} °C to kelvin.`, C + 273, [C - 273, 273 - C], `K = °C + 273 = ${C + 273} K.`, "", " K"); }
    return mcq(`At what temperature do the Celsius and Fahrenheit scales show the same reading?`, "−40°", ["0°", "40°", "−273°", "100°"], `Set C = F in F = 9C/5 + 32: C = −40.`);
  },
  lever() {
    const L = rnd(2, 20) * 50, la = rnd(1, 5) * 10, ea = la * pick([2, 4, 5, 10]), E = L * la / ea;
    return nq(`In a lever, a load of ${L} N is ${la} cm from the fulcrum. What effort applied ${ea} cm from the fulcrum will balance it?`, E, [L * ea / la, L / 2, E * 2], `Load × load arm = Effort × effort arm. E = ${L} × ${la}/${ea} = ${fmt(E)} N. Mechanical advantage = ${fmt(L / E)}.`, "", " N");
  },
  friction() {
    const m = rnd(2, 50), mu = pick([0.1, 0.2, 0.25, 0.3, 0.4, 0.5]), f = mu * m * 10;
    return nq(`A ${m} kg block rests on a horizontal floor. The coefficient of friction is ${mu}. What is the limiting friction? (g = 10 m/s²)`, f, [mu * m, m * 10, f * 2], `f = μN = μmg = ${mu} × ${m} × 10 = ${fmt(f)} N.`, "", " N");
  },
  weight() {
    const m = rnd(6, 120);
    if (Math.random() < .5) return nq(`What is the weight of a ${m} kg body on Earth? (g = 10 m/s²)`, m * 10, [m, m / 10], `W = mg = ${m} × 10 = ${m * 10} N. Mass stays ${m} kg everywhere; weight changes with g.`, "", " N");
    const me = m * 6; return nq(`A body weighs ${me * 10} N on Earth. What will it weigh on the Moon, where g is 1/6 of Earth's? (g = 10 m/s²)`, me * 10 / 6, [me * 10, me, me / 6], `Weight on Moon = ${me * 10}/6 = ${fmt(me * 10 / 6)} N. Its mass (${me} kg) does not change.`, "", " N");
  },
  facts() {
    const [q, a, ...w] = pick(SCI_FACTS);
    return mcq(q, a, w, `Answer: ${a}.`);
  },
};
const SCI_FACTS = [
  ["SI unit of force is", "newton", "joule", "watt", "pascal"], ["SI unit of power is", "watt", "joule", "newton", "volt"],
  ["SI unit of work and energy is", "joule", "watt", "newton", "erg"], ["SI unit of pressure is", "pascal", "newton", "bar", "joule"],
  ["SI unit of electric resistance is", "ohm", "volt", "ampere", "coulomb"], ["SI unit of electric charge is", "coulomb", "ampere", "volt", "farad"],
  ["SI unit of temperature is", "kelvin", "degree Celsius", "degree Fahrenheit", "joule"], ["SI unit of frequency is", "hertz", "second", "decibel", "metre"],
  ["SI unit of density is", "kg/m³", "g/cm²", "kg/m²", "N/m³"], ["SI unit of momentum is", "kg·m/s", "kg·m/s²", "N/m", "J/s"],
  ["1 kilowatt-hour equals", "3.6 × 10⁶ J", "3.6 × 10³ J", "1000 J", "3600 J"], ["1 horsepower is approximately", "746 W", "1000 W", "500 W", "100 W"],
  ["Which quantity is a vector?", "Velocity", "Speed", "Mass", "Temperature"], ["Which quantity is a scalar?", "Speed", "Velocity", "Force", "Acceleration"],
  ["The slope of a distance–time graph gives", "speed", "acceleration", "displacement", "force"], ["The area under a velocity–time graph gives", "displacement", "acceleration", "speed", "force"],
  ["Work done is zero when the force and displacement are", "perpendicular", "parallel", "in the same direction", "opposite"],
  ["Inertia of a body depends on its", "mass", "velocity", "shape", "volume"], ["The mass of a body on the Moon compared to Earth is", "the same", "one-sixth", "six times", "zero"],
  ["Friction always acts", "opposite to the relative motion", "along the motion", "perpendicular to the surface", "upward"],
  ["A pair of scissors is a lever of", "class I (fulcrum in middle)", "class II (load in middle)", "class III (effort in middle)", "no class"],
  ["A nutcracker is a lever of", "class II (load in middle)", "class I (fulcrum in middle)", "class III (effort in middle)", "no class"],
  ["A pair of tongs is a lever of", "class III (effort in middle)", "class I (fulcrum in middle)", "class II (load in middle)", "no class"],
  ["The mechanical advantage of a single fixed pulley is", "1", "2", "0.5", "4"], ["Mechanical advantage of an ideal inclined plane equals", "length ÷ height", "height ÷ length", "length × height", "1"],
  ["Heat transfer through a vacuum takes place by", "radiation", "conduction", "convection", "evaporation"],
  ["Sea breeze is an example of", "convection", "conduction", "radiation", "reflection"], ["Water has its maximum density at", "4 °C", "0 °C", "100 °C", "−4 °C"],
  ["Absolute zero is", "−273 °C", "0 °C", "−100 °C", "−460 °C"], ["The normal human body temperature is about", "37 °C", "98 °C", "47 °C", "27 °C"],
  ["An ammeter is connected in a circuit", "in series", "in parallel", "across the battery only", "anywhere"],
  ["A voltmeter is connected in a circuit", "in parallel", "in series", "with the ammeter in series", "anywhere"],
  ["A fuse wire should have", "a low melting point", "a high melting point", "very low resistance", "a high melting point and low resistance"],
  ["The commercial unit of electrical energy is", "kilowatt-hour", "watt", "joule", "volt-ampere"],
  ["Electric power is given by", "P = VI", "P = V/I", "P = I/R", "P = VR"], ["Equivalent resistance of resistors in parallel is", "less than the smallest", "more than the largest", "equal to the sum", "equal to the average"],
  ["Resistivity of a wire depends on", "its material and temperature", "its length", "its area", "the current through it"],
  ["Newton's third law explains", "the motion of a rocket", "why a body stays at rest", "the definition of force", "free fall"],
  ["Acceleration due to gravity at Earth's surface is about", "9.8 m/s²", "8.9 m/s²", "98 m/s²", "1.6 m/s²"],
  ["Ice floats on water because ice", "is less dense than water", "is denser than water", "has more mass", "is colder"],
  ["Light-year is a unit of", "distance", "time", "speed", "light intensity"], ["1 joule equals", "1 N·m", "1 N/m", "1 W/s", "1 kg·m/s"],
  ["Mercury is used in thermometers mainly because it", "expands uniformly with heat", "is a liquid metal of low density", "boils at low temperature", "is transparent"],
  ["The best conductor of electricity among these is", "silver", "copper", "aluminium", "iron"],
  ["When a moving bus stops suddenly, passengers fall forward due to", "inertia of motion", "inertia of rest", "friction", "gravity"],
];

/* ---------- DATA ANALYSIS & INTERPRETATION ---------- */
const YEARS = [2019, 2020, 2021, 2022, 2023];
function svgBars(series, labels, names) {
  const W = 340, H = 210, pad = 30, max = Math.max(...series.flat()) * 1.15, n = labels.length, gw = (W - pad - 6) / n, bw = (gw - 8) / series.length;
  let s = `<svg viewBox="0 0 ${W} ${H}" class="chart" role="img" aria-label="Bar chart"><line x1="${pad}" y1="${H - 22}" x2="${W - 4}" y2="${H - 22}" class="ax"/>`;
  labels.forEach((l, i) => {
    series.forEach((ser, k) => {
      const h = ser[i] / max * (H - 40), x = pad + i * gw + 4 + k * bw, y = H - 22 - h;
      s += `<rect x="${x}" y="${y}" width="${bw - 2}" height="${h}" class="c${k}"/><text x="${x + bw / 2 - 1}" y="${y - 3}" class="v">${ser[i]}</text>`;
    });
    s += `<text x="${pad + i * gw + gw / 2}" y="${H - 8}" class="l">${l}</text>`;
  });
  return s + "</svg>" + legend(names);
}
function svgLine(series, labels, names) {
  const W = 340, H = 210, pad = 30, max = Math.max(...series.flat()) * 1.15, n = labels.length, gx = (W - pad - 20) / (n - 1);
  let s = `<svg viewBox="0 0 ${W} ${H}" class="chart" role="img" aria-label="Line chart"><line x1="${pad}" y1="${H - 22}" x2="${W - 4}" y2="${H - 22}" class="ax"/>`;
  series.forEach((ser, k) => {
    const pts = ser.map((v, i) => [pad + 8 + i * gx, H - 22 - v / max * (H - 40)]);
    s += `<polyline points="${pts.map(p => p.join(",")).join(" ")}" class="ln c${k}"/>`;
    pts.forEach((p, i) => s += `<circle cx="${p[0]}" cy="${p[1]}" r="3" class="c${k}"/><text x="${p[0]}" y="${p[1] - 6}" class="v">${ser[i]}</text>`);
  });
  labels.forEach((l, i) => s += `<text x="${pad + 8 + i * gx}" y="${H - 8}" class="l">${l}</text>`);
  return s + "</svg>" + legend(names);
}
function svgPie(parts, names) {
  const R = 80, cx = 100, cy = 100; let a0 = -Math.PI / 2, s = `<svg viewBox="0 0 200 200" class="chart pie" role="img" aria-label="Pie chart">`;
  parts.forEach((p, k) => {
    const a1 = a0 + p / 100 * 2 * Math.PI, big = a1 - a0 > Math.PI ? 1 : 0;
    s += `<path d="M${cx},${cy} L${cx + R * Math.cos(a0)},${cy + R * Math.sin(a0)} A${R},${R} 0 ${big} 1 ${cx + R * Math.cos(a1)},${cy + R * Math.sin(a1)} Z" class="c${k}"/>`;
    const m = (a0 + a1) / 2; s += `<text x="${cx + R * .62 * Math.cos(m)}" y="${cy + R * .62 * Math.sin(m) + 4}" class="pv">${p}%</text>`;
    a0 = a1;
  });
  return s + "</svg>" + legend(names);
}
const legend = names => `<div class="lg">${names.map((n, k) => `<span><i class="c${k}"></i>${n}</span>`).join("")}</div>`;
function table(rows, head) { return `<table class="dt"><tr>${head.map(h => `<th>${h}</th>`).join("")}</tr>${rows.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join("")}</tr>`).join("")}</table>`; }

const ITEMS = [["Product P", "Product Q", "Product R"], ["Wheat", "Rice", "Maize"], ["Sleeper class", "AC 3-tier", "AC 2-tier"], ["Branch A", "Branch B", "Branch C"], ["Laptops", "Tablets", "Phones"]];
const UNITS = ["(thousand units)", "(lakh tonnes)", "(lakh passengers)", "(₹ crore)", "(thousand units)"];

function diSeries() {
  const k = rnd(0, ITEMS.length - 1), names = ITEMS[k], nS = rnd(2, 3);
  const data = names.slice(0, nS).map(() => YEARS.map(() => 5 * rnd(4, 30)));
  const kind = pick(nS === 3 ? ["table", "table", "bar"] : ["table", "bar", "line"]);
  const title = `${names.slice(0, nS).join(", ")} — ${["production", "output", "passengers carried", "revenue", "sales"][k]} ${UNITS[k]}, 2019–2023`;
  const stem = `<p class="st">${title}</p>` + (kind === "table" ? table(YEARS.map((y, i) => [y, ...data.map(d => d[i])]), ["Year", ...names.slice(0, nS)]) : kind === "bar" ? svgBars(data, YEARS, names.slice(0, nS)) : svgLine(data, YEARS, names.slice(0, nS)));
  const N = names.slice(0, nS), sum = a => a.reduce((x, y) => x + y, 0);
  const qs = [];
  const A = rnd(0, nS - 1), B = (A + 1) % nS;
  { const t = sum(data[A]); qs.push(nq(`What is the total of ${N[A]} over the five years?`, t, [t - data[A][0], sum(data[B])], `${data[A].join(" + ")} = ${t}.`)); }
  { const m = sum(data[B]) / 5; qs.push(nq(`What is the average yearly figure for ${N[B]}?`, m, [m + 5, Math.max(...data[B]) / 2], `${sum(data[B])}/5 = ${fmt(m)}.`)); }
  { const i = rnd(0, 3), j = rnd(i + 1, 4), p = (data[A][j] - data[A][i]) / data[A][i] * 100; const s = v => fmt(Math.abs(v)) + "% " + (v >= 0 ? "increase" : "decrease");
    qs.push(mcq(`What is the percentage change in ${N[A]} from ${YEARS[i]} to ${YEARS[j]}?`, s(p), [s(-p), s((data[A][j] - data[A][i]) / data[A][j] * 100), s(p + 10), s(p - 10), s(p + 20), s(p + 5)], `(${data[A][j]} − ${data[A][i]})/${data[A][i]} × 100 = ${fmt(p)}%.`)); }
  { const x = sum(data[A]), y = sum(data[B]), g = gcd(x, y); const s = `${x / g} : ${y / g}`;
    qs.push(mcq(`What is the ratio of the total of ${N[A]} to the total of ${N[B]}?`, s, [`${y / g} : ${x / g}`, `${x / g + 1} : ${y / g}`, `${x / g} : ${y / g + 1}`, `${data[A][0]} : ${data[B][0]}`], `${x} : ${y} = ${s}.`)); }
  { const tot = YEARS.map((_, i) => sum(data.map(d => d[i]))); const mx = Math.max(...tot), yi = tot.indexOf(mx);
    if (tot.filter(t => t === mx).length === 1) qs.push(mcq(`In which year was the combined figure of all items the highest?`, YEARS[yi], YEARS.filter(y => y !== YEARS[yi]), `Yearly totals: ${tot.join(", ")}. Highest = ${mx} in ${YEARS[yi]}.`)); }
  { const i = rnd(0, 4), p = data[B][i] / sum(data[B]) * 100; qs.push(nq(`${N[B]} in ${YEARS[i]} is what percent of its five-year total?`, p, [100 / 5, data[B][i] / sum(data[A]) * 100], `${data[B][i]}/${sum(data[B])} × 100 = ${fmt(p)}%.`, "", "%")); }
  { const d = Math.max(...data[A]) - Math.min(...data[A]); qs.push(nq(`What is the difference between the highest and lowest figures for ${N[A]}?`, d, [Math.max(...data[A]), d + 5], `${Math.max(...data[A])} − ${Math.min(...data[A])} = ${d}.`)); }
  return shuffle(qs).slice(0, 5).map(q => Object.assign(q, { stem }));
}
function diPie() {
  const names = pick([["Salaries", "Fuel", "Maintenance", "Rolling stock", "Signalling", "Others"], ["Food", "Rent", "Transport", "Education", "Savings", "Others"], ["Paper", "Printing", "Binding", "Royalty", "Transport", "Advertising"]]);
  let p; do { p = Array.from({ length: 5 }, () => 5 * rnd(1, 6)); } while (p.reduce((a, b) => a + b, 0) >= 95);
  p.push(100 - p.reduce((a, b) => a + b, 0));
  const T = pick([200, 400, 500, 600, 800, 1200, 1500]);
  const stem = `<p class="st">Distribution of total expenditure of ₹${T} lakh</p>` + svgPie(p, names);
  const i = rnd(0, 5), j = (i + rnd(1, 5)) % 6;
  const qs = [
    nq(`What is the expenditure on ${names[i]}?`, T * p[i] / 100, [p[i], T * p[j] / 100], `${p[i]}% of ${T} = ₹${fmt(T * p[i] / 100)} lakh.`, "₹", " lakh"),
    nq(`What is the central angle of the sector for ${names[j]}?`, p[j] * 3.6, [p[j], p[j] * 3.6 + 18], `${p[j]}% × 360° = ${fmt(p[j] * 3.6)}°.`, "", "°"),
    (() => { const g = gcd(p[i], p[j]); const s = `${p[i] / g} : ${p[j] / g}`; return mcq(`What is the ratio of expenditure on ${names[i]} to that on ${names[j]}?`, s, [`${p[j] / g} : ${p[i] / g}`, `${p[i] / g + 1} : ${p[j] / g}`, `${p[i] / g} : ${p[j] / g + 1}`], `${p[i]} : ${p[j]} = ${s}.`, () => `${p[i] / g + rnd(1, 4)} : ${p[j] / g + rnd(0, 3)}`); })(),
    nq(`The combined expenditure on ${names[i]} and ${names[j]} is what percent of the total?`, p[i] + p[j], [Math.abs(p[i] - p[j]), (p[i] + p[j]) * 2], `${p[i]}% + ${p[j]}% = ${p[i] + p[j]}%.`, "", "%"),
    nq(`By how much (₹ lakh) does the largest head exceed the smallest?`, T * (Math.max(...p) - Math.min(...p)) / 100, [Math.max(...p) - Math.min(...p)], `(${Math.max(...p)} − ${Math.min(...p)})% of ${T} = ₹${fmt(T * (Math.max(...p) - Math.min(...p)) / 100)} lakh.`, "₹", " lakh"),
  ];
  return qs.map(q => Object.assign(q, { stem }));
}
const diSingles = {
  venn() {
    const N = rnd(10, 40) * 10, both = rnd(2, 10) * 5, a = both + rnd(4, 16) * 5, b = both + rnd(4, 16) * 5;
    const neither = N - (a + b - both); if (neither < 0) return diSingles.venn();
    const v = rnd(0, 2);
    const q = `In a survey of ${N} people, ${a} like tea, ${b} like coffee and ${both} like both.`;
    if (v === 0) return nq(q + ` How many like neither?`, neither, [N - a - b, both], `Tea or coffee = ${a} + ${b} − ${both} = ${a + b - both}. Neither = ${N} − ${a + b - both} = ${neither}.`);
    if (v === 1) return nq(q + ` How many like only tea?`, a - both, [a, b - both], `Only tea = ${a} − ${both} = ${a - both}.`);
    return nq(q + ` How many like exactly one of the two?`, a + b - 2 * both, [a + b - both, a + b], `Only tea + only coffee = ${a - both} + ${b - both} = ${a + b - 2 * both}.`);
  },
  sufficiency() {
    const s = rnd(5, 30), d = rnd(1, s - 2) * (Math.random() < .5 ? 1 : 1), x = (s + d) / 2;
    const k = rnd(2, 5), X = rnd(3, 20);
    const forms = [
      [`I. x + y = ${s}<br>II. x − y = ${d}`, "Both statements together are needed", "One equation in two unknowns cannot fix x; the two together can."],
      [`I. ${k}x = ${k * X}<br>II. x + y = ${s}`, "Statement I alone is sufficient", `I gives x = ${X}. II has two unknowns.`],
      [`I. x + y = ${s}<br>II. ${k}x = ${k * X}`, "Statement II alone is sufficient", `II gives x = ${X}. I has two unknowns.`],
      [`I. ${k}x = ${k * X}<br>II. x − ${X - 1} = 1`, "Either statement alone is sufficient", `Each statement gives x = ${X} on its own.`],
      [`I. x + y = ${s}<br>II. ${k}x + ${k}y = ${k * s}`, "Both together are not sufficient", "II is just I multiplied by " + k + "; still one equation in two unknowns."],
      [`I. x + y = ${s}<br>II. x > y`, "Both together are not sufficient", "Neither statement, nor both, pins down a single value of x."],
    ];
    const [st, a, e] = pick(forms);
    return mcq(`What is the value of x?<br>${st}`, a, ["Statement I alone is sufficient", "Statement II alone is sufficient", "Either statement alone is sufficient", "Both statements together are needed", "Both together are not sufficient"].filter(o => o !== a), e);
  },
};

/* ---------- LOGICAL CAPABILITY ---------- */
const TERMS = ["pens", "books", "tables", "chairs", "cups", "birds", "trees", "cars", "doors", "stones", "rings", "lamps", "boxes", "walls", "roads", "clocks", "bags", "ships"];
const holds = (m, [t, x, y]) => {
  const has = (r, s) => (r >> s) & 1;
  if (t === "all") return m.every(r => !has(r, x) || has(r, y));
  if (t === "some") return m.some(r => has(r, x) && has(r, y));
  if (t === "no") return !m.some(r => has(r, x) && has(r, y));
  return m.some(r => has(r, x) && !has(r, y)); // somenot
};
const MODELS = (() => { const out = []; for (let mask = 1; mask < 128; mask++) { const m = []; for (let r = 1; r < 8; r++) if (mask >> (r - 1) & 1) m.push(r); if ([0, 1, 2].every(s => m.some(r => (r >> s) & 1))) out.push(m); } return out; })();
function sylText([t, x, y], N) { const X = N[x], Y = N[y]; return t === "all" ? `All ${X} are ${Y}.` : t === "some" ? `Some ${X} are ${Y}.` : t === "no" ? `No ${X} are ${Y}.` : `Some ${X} are not ${Y}.`; }
function syllogismEval(prem, c1, c2) {
  const ms = MODELS.filter(m => prem.every(p => holds(m, p)));
  const f1 = ms.every(m => holds(m, c1)), f2 = ms.every(m => holds(m, c2));
  if (f1 && f2) return "Both I and II follow";
  if (f1) return "Only conclusion I follows";
  if (f2) return "Only conclusion II follows";
  if (ms.every(m => holds(m, c1) !== holds(m, c2))) return "Either I or II follows";
  return "Neither I nor II follows";
}
const SYL_OPTS = ["Only conclusion I follows", "Only conclusion II follows", "Either I or II follows", "Neither I nor II follows", "Both I and II follow"];
const TYPES = ["all", "some", "no", "somenot"];

const BLOOD = [
  ["{A} is the brother of {B}. {B} is the daughter of {C}. How is {A} related to {C}?", "Son", "Daughter", "Nephew", "Brother"],
  ["{A} is the mother of {B}. {B} is the sister of {C}. {C} is the father of {D}. How is {A} related to {D}?", "Grandmother", "Mother", "Aunt", "Sister"],
  ["Pointing to a man, {A} said, \"He is the son of my grandfather's only son.\" How is the man related to {A}?", "Brother", "Cousin", "Uncle", "Father"],
  ["Pointing to a woman, {A} (a man) said, \"Her mother is the only daughter of my mother.\" How is the woman related to {A}?", "Niece", "Sister", "Daughter", "Cousin"],
  ["{C} is the father of {A}. {A} is the husband of {B}. How is {C} related to {B}?", "Father-in-law", "Father", "Brother-in-law", "Uncle"],
  ["{A} is the son of {B}. {B} is the sister of {C}. {C} is a man. How is {C} related to {A}?", "Maternal uncle", "Paternal uncle", "Father", "Cousin"],
  ["{A} is the wife of {B}. {B} is the brother of {C}. {C} is the son of {D}. How is {A} related to {D}?", "Daughter-in-law", "Daughter", "Sister-in-law", "Niece"],
  ["{A}'s father is {B}'s son. {B} has only one son. {C} is {B}'s wife. How is {C} related to {A}?", "Grandmother", "Mother", "Aunt", "Sister"],
  ["{A} is the sister of {B}. {B} is the son of {C}. {C} is the daughter of {D}. How is {A} related to {D}?", "Granddaughter", "Daughter", "Niece", "Grandmother"],
  ["{A} and {B} are brothers. {C} is the daughter of {A}. {D} is the son of {B}. How is {D} related to {C}?", "Cousin", "Brother", "Nephew", "Uncle"],
  ["{A} is the father of {B}. {B} is the brother of {C}. {C} is the wife of {D}. How is {D} related to {A}?", "Son-in-law", "Son", "Brother-in-law", "Nephew"],
  ["Introducing a man, {A} (a woman) said, \"His wife is the only daughter of my father.\" How is the man related to {A}?", "Husband", "Brother", "Father", "Brother-in-law"],
  ["{A} is the son of {B}'s only brother. {B} is a woman. How is {B} related to {A}?", "Aunt", "Mother", "Sister", "Grandmother"],
  ["{A}'s mother is the only sister of {B}'s father. How is {B} related to {A}?", "Cousin", "Brother", "Nephew", "Uncle"],
  ["{A} is the mother of {B}. {C} is the son of {A}. {D} is the brother of {A}. How is {D} related to {C}?", "Maternal uncle", "Paternal uncle", "Father", "Brother"],
  ["{A} is a man. {A}'s only brother's son is {B}. How is {A} related to {B}?", "Paternal uncle", "Maternal uncle", "Father", "Grandfather"],
  ["{A} is the grandson of {B}. {C} is the only son of {B} and has only one child. How is {C} related to {A}?", "Father", "Uncle", "Brother", "Grandfather"],
  ["{A} is the daughter of {B}. {B} is the wife of {C}. {C} is the son of {D}. How is {D} related to {A}?", "Grandparent", "Parent", "Uncle or aunt", "Cousin"],
];

const ASSUMPTIONS = [
  ["\"Use the stairs instead of the lift to stay healthy.\" — a notice in an office", "Climbing stairs is a form of exercise.", "People in the office never walk.", "Only I is implicit"],
  ["\"Book your tickets early; seats fill up fast during the festival season.\"", "Demand for tickets rises during festivals.", "Tickets cannot be booked in advance.", "Only I is implicit"],
  ["\"The station will run two extra trains on Sunday for the marathon crowd.\"", "More passengers are expected on Sunday.", "The extra trains will be able to carry them.", "Both I and II are implicit"],
  ["\"Switch off the lights when you leave the room.\"", "Saving electricity is desirable.", "People always forget to switch off lights.", "Only I is implicit"],
  ["\"Apply before 30 June; late applications will not be accepted.\"", "Some people may apply after 30 June.", "The organisation has a deadline for applications.", "Both I and II are implicit"],
  ["\"Carry an umbrella today.\" — a mother to her son", "It may rain today.", "The son owns no umbrella.", "Only I is implicit"],
  ["\"Our new phone has a battery that lasts two days.\" — an advertisement", "Battery life matters to buyers.", "All other phones last only one day.", "Only I is implicit"],
  ["\"Reach the exam centre 60 minutes early.\"", "Entry formalities take time.", "The exam will start late.", "Only I is implicit"],
  ["\"Learn a new word every day.\" — a teacher to students", "Vocabulary can be improved gradually.", "Students know no words now.", "Only I is implicit"],
  ["\"Do not lean out of the door of a moving train.\"", "Leaning out of a moving train is dangerous.", "Trains always run with open doors.", "Only I is implicit"],
  ["\"The library will remain closed on Monday for stock-taking.\"", "Stock-taking cannot be done while the library is open.", "People may visit the library on Monday.", "Both I and II are implicit"],
  ["\"Water the plants only in the evening.\"", "Evening watering is better for plants.", "Plants need no water in the morning ever.", "Only I is implicit"],
];

const RC = [
  { t: "Signals before electricity", p: "In the early days of railways, trains were controlled by men standing beside the track who used hand signals and flags. This worked while trains were few and slow, but as traffic grew it became dangerous: a signalman could see only a short distance, and drivers had little warning of a train ahead. The solution was to divide the line into sections, or blocks, and to allow only one train into a block at a time. A train could enter a block only after the signalman at the far end confirmed that the previous train had left it. The idea was simple, yet it changed railway safety more than any improvement in engines or brakes. The principle is so sound that modern electronic systems still follow it, even though the confirmation now travels as a signal along a wire or a radio link rather than as a bell code passed between two signal cabins.",
    q: [["What was the main weakness of hand signalling?", "Signalmen could see only a short distance", "Flags were expensive", "Drivers ignored the flags", "Trains were too fast to stop"],
      ["According to the passage, a train may enter a block only when", "the previous train has left that block", "the driver can see the next station", "the engine has good brakes", "the bell has rung twice"],
      ["The passage suggests that the block system", "is still the basis of modern signalling", "was replaced because it was unsafe", "applied only to slow trains", "was invented to save money"],
      ["Which word is closest in meaning to \"sound\" as used in the passage?", "Reliable", "Loud", "Healthy", "Asleep"]] },
  { t: "Sleep and memory", p: "For a long time sleep was thought of as a period when the brain simply switched off. Research over the last few decades has overturned that view. During deep sleep the brain replays experiences from the day, strengthening some connections and weakening others. This process appears to help move new information from short-term storage into long-term memory. Students who sleep well after learning tend to recall the material better than those who stay awake through the night, even when both groups spend the same total time studying. Sleep also seems to clear away chemical waste that builds up in the brain while we are awake. None of this means that sleep can replace study; rather, it suggests that study without sleep wastes much of the effort that went into it.",
    q: [["The older view of sleep described in the passage was that", "the brain switches off during sleep", "sleep improves memory", "sleep clears chemical waste", "students need less sleep"],
      ["According to the passage, during deep sleep the brain", "replays the day's experiences", "stops all activity", "forgets new information", "produces chemical waste"],
      ["What does the author conclude?", "Study without sleep wastes much of the effort", "Sleep can replace study", "Long study hours are useless", "Only deep sleep matters"],
      ["The word \"overturned\" in the passage most nearly means", "Reversed", "Confirmed", "Ignored", "Repeated"]] },
  { t: "Wetlands", p: "Wetlands such as marshes, swamps and the shallow edges of lakes were once seen as wasteland, fit only to be drained for farms or buildings. We now know they do valuable work. A wetland acts like a sponge, soaking up rainwater and releasing it slowly, which reduces flooding downstream. Its plants trap mud and absorb some pollutants, so the water leaving a wetland is often cleaner than the water entering it. Wetlands also shelter fish, birds and insects, many of which breed nowhere else. Because these services are free and unseen, they are easily lost. When a wetland is filled in, the cost appears later and elsewhere: in flooded towns, in more expensive water treatment, and in declining fish catches.",
    q: [["Why does the passage compare a wetland to a sponge?", "It absorbs water and releases it slowly", "It is soft to walk on", "It is full of holes", "It can be squeezed dry"],
      ["Which benefit of wetlands is NOT mentioned?", "Producing electricity", "Reducing floods", "Cleaning water", "Sheltering wildlife"],
      ["According to the passage, the services of wetlands are easily lost because they are", "free and unseen", "very expensive", "found only in cities", "harmful to farms"],
      ["The tone of the passage is best described as", "Informative and cautionary", "Humorous", "Angry", "Indifferent"]] },
  { t: "The printing press", p: "Before printing with movable type spread in the fifteenth century, books in Europe were copied by hand. A single copy could take months, so books were rare and costly, and errors crept in with each new copy. Printing changed this. Once the type for a page was set, hundreds of identical copies could be made quickly. Prices fell, and more people had a reason to learn to read. Because every copy of a printed book was the same, scholars in different cities could refer to the same page and argue about the same words. Some historians argue that this shared, fixed text did as much to advance learning as the larger number of books did.",
    q: [["What problem of hand-copying does the passage mention?", "Errors crept in with each copy", "Ink was too costly", "Paper was unavailable", "Scribes refused to work"],
      ["One effect of printing mentioned in the passage is that", "more people had a reason to learn to read", "hand-copying became more popular", "books became more expensive", "scholars stopped arguing"],
      ["According to some historians, printing advanced learning by", "giving scholars a shared, fixed text", "making books longer", "replacing teachers", "reducing the number of books"],
      ["The word \"identical\" means", "Exactly alike", "Very large", "Expensive", "Ancient"]] },
  { t: "Punctuality", p: "Railways did much to make modern society punctual. Before trains, each town kept its own local time, set by the position of the sun, so noon in one town could differ by several minutes from noon in the next. This mattered little when travel was slow. A railway timetable, however, cannot work if every station keeps a different clock. Railway companies therefore adopted a single standard time along their lines, and in time governments followed. The habit of checking a watch against a published schedule spread from stations to factories, offices and schools. Today we take a common time for granted, but it was, to a large extent, a railway invention.",
    q: [["Before railways, each town's time was set by", "the position of the sun", "the railway timetable", "the government", "the nearest factory"],
      ["Why did local time become a problem with railways?", "A timetable needs the same time at every station", "Trains were always late", "Clocks were too expensive", "Travel became slower"],
      ["The main idea of the passage is that", "railways helped create standard, shared time", "towns should keep local time", "watches were invented by railways", "factories were the first to keep time"],
      ["The phrase \"take for granted\" means", "accept without thinking about it", "receive as a gift", "refuse to believe", "question carefully"]] },
];

function seating() {
  const n = 5, ppl = shuffle(NAMES).slice(0, n), perm = shuffle([0, 1, 2, 3, 4]); // perm[i] = person at seat i
  const seatOf = p => perm.indexOf(p);
  const perms = []; (function g(a, rest) { if (!rest.length) return perms.push(a); rest.forEach((x, i) => g(a.concat(x), rest.filter((_, j) => j !== i))); })([], [0, 1, 2, 3, 4]);
  const clues = [];
  for (let p = 0; p < n; p++) for (let q = 0; q < n; q++) if (p !== q) {
    clues.push([`${ppl[p]} sits immediately to the left of ${ppl[q]}.`, P => P.indexOf(p) + 1 === P.indexOf(q)]);
    const gap = Math.abs(seatOf(p) - seatOf(q)) - 1;
    if (p < q) clues.push([gap === 0 ? `${ppl[p]} and ${ppl[q]} sit next to each other.` : `Exactly ${gap} ${gap === 1 ? "person sits" : "people sit"} between ${ppl[p]} and ${ppl[q]}.`, P => Math.abs(P.indexOf(p) - P.indexOf(q)) - 1 === gap]);
    if (p < q) clues.push([`${ppl[p]} does not sit next to ${ppl[q]}.`, P => Math.abs(P.indexOf(p) - P.indexOf(q)) !== 1]);
  }
  for (let p = 0; p < n; p++) {
    clues.push([`${ppl[p]} sits at one of the ends.`, P => P.indexOf(p) === 0 || P.indexOf(p) === 4]);
    clues.push([`${ppl[p]} does not sit at either end.`, P => P.indexOf(p) !== 0 && P.indexOf(p) !== 4]);
    clues.push([`${ppl[p]} sits ${["first", "second", "third", "fourth", "fifth"][seatOf(p)]} from the left.`, P => P.indexOf(p) === seatOf(p)]);
  }
  const truth = clues.filter(c => c[1](perm));
  let chosen = [], live = perms;
  for (const c of shuffle(truth)) {
    const nl = live.filter(c[1]); if (nl.length < live.length) { chosen.push(c); live = nl; }
    if (live.length === 1) break;
  }
  for (let i = chosen.length - 1; i >= 0; i--) { const rest = chosen.filter((_, j) => j !== i); if (perms.filter(P => rest.every(r => r[1](P))).length === 1) chosen = rest; }
  const stem = `<p class="st">Five people — ${ppl.slice().sort().join(", ")} — sit in a row facing north. ${chosen.map(c => c[0]).join(" ")}</p>`;
  const nameAt = i => ppl[perm[i]];
  const others = x => ppl.filter(p => p !== x);
  const x = rnd(0, 3);
  return [
    mcq("Who sits in the middle of the row?", nameAt(2), others(nameAt(2)), `The only arrangement that fits all clues, left to right: ${perm.map(i => ppl[i]).join(", ")}.`),
    mcq(`Who sits immediately to the right of ${nameAt(x)}?`, nameAt(x + 1), others(nameAt(x + 1)).filter(p => p !== nameAt(x)), `Left to right: ${perm.map(i => ppl[i]).join(", ")}.`),
    mcq("Who sits at the extreme right end?", nameAt(4), others(nameAt(4)), `Left to right: ${perm.map(i => ppl[i]).join(", ")}.`),
  ].map(q => Object.assign(q, { stem }));
}

const logic = {
  syllogism() {
    const N = shuffle(TERMS).slice(0, 3);
    const p1 = [pick(TYPES), 0, 1], p2 = [pick(TYPES), 1, 2];
    if (Math.random() < .5) [p1[1], p1[2]] = [p1[2], p1[1]];
    const rc = () => { const x = pick([0, 1, 2]); let y; do { y = pick([0, 1, 2]); } while (y === x); return [pick(TYPES), x, y]; };
    let c1 = rc(), c2 = rc();
    if (Math.random() < .3) { c2 = [c1[0] === "some" ? "no" : c1[0] === "no" ? "some" : c1[0] === "all" ? "somenot" : "all", c1[1], c1[2]]; }
    if (c1.join() === c2.join()) return logic.syllogism();
    const ans = syllogismEval([p1, p2], c1, c2);
    return mcq(`<b>Statements:</b> ${sylText(p1, N)} ${sylText(p2, N)}<br><b>Conclusions:</b> I. ${sylText(c1, N)} II. ${sylText(c2, N)}<br>Assume the statements are true, even if they seem to differ from common knowledge.`,
      ans, SYL_OPTS.filter(o => o !== ans), `Draw the Venn diagrams. Every arrangement consistent with the statements was checked — answer: ${ans}. (A pair like "Some X are Y" / "No X are Y", where neither is certain but one must be true, gives "Either".)`);
  },
  boolean() {
    const vals = { P: Math.random() < .5, Q: Math.random() < .5, R: Math.random() < .5 };
    const T = v => v ? "True" : "False";
    const atoms = ["P", "Q", "R", "NOT P", "NOT Q", "NOT R"];
    const ev = a => a.startsWith("NOT") ? !vals[a[4]] : vals[a];
    const mk = () => { const a = pick(atoms); let b; do { b = pick(atoms); } while (b === a); const op = pick(["AND", "OR"]); const v = op === "AND" ? ev(a) && ev(b) : ev(a) || ev(b); return [`(${a}) ${op} (${b})`, v]; };
    let t, fs = [], g = 0;
    while ((!t || fs.length < 3) && g++ < 200) { const [s, v] = mk(); if (v && !t) t = s; else if (!v && !fs.includes(s) && s !== t) fs.push(s); }
    if (!t || fs.length < 3) return logic.boolean();
    return mcq(`P is ${T(vals.P)}, Q is ${T(vals.Q)} and R is ${T(vals.R)}. Which expression is TRUE?`, t, fs.slice(0, 3), `AND is true only if both sides are true; OR is true if either is. ${t} evaluates to True.`);
  },
  clock() {
    const h = rnd(1, 12), m = rnd(0, 59);
    let a = Math.abs(30 * h - 5.5 * m) % 360; if (a > 180) a = 360 - a;
    return nq(`What is the angle between the hour and minute hands of a clock at ${h}:${String(m).padStart(2, "0")}?`, a, [Math.abs(30 * h - 6 * m) % 360 > 180 ? 360 - Math.abs(30 * h - 6 * m) % 360 : Math.abs(30 * h - 6 * m) % 360, 360 - a], `Angle = |30H − 5.5M| = |${30 * h} − ${fmt(5.5 * m)}| → ${fmt(a)}° (take 360 − x if it exceeds 180).`, "", "°");
  },
  calendar() {
    const D = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], M = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const y = rnd(2001, 2029), mo = rnd(0, 11), d = rnd(1, 28), base = new Date(Date.UTC(y, mo, d));
    const add = pick([1, 2, 3]) * (Math.random() < .5 ? 365 : 0) || rnd(20, 200);
    const t = new Date(base.getTime() + add * 864e5);
    if (add % 365 === 0) {
      const ny = y + add / 365, t2 = new Date(Date.UTC(ny, mo, d));
      return mcq(`If ${d} ${M[mo]} ${y} was a ${D[base.getUTCDay()]}, what day of the week was ${d} ${M[mo]} ${ny}?`, D[t2.getUTCDay()], D.filter(x => x !== D[t2.getUTCDay()]).sort(() => Math.random() - .5),
        `Each ordinary year shifts the day by 1, a leap year (when 29 February falls in between) by 2. Total shift = ${(t2 - base) / 864e5 % 7} day(s).`);
    }
    return mcq(`If ${d} ${M[mo]} ${y} was a ${D[base.getUTCDay()]}, what day of the week will it be ${add} days later?`, D[t.getUTCDay()], D.filter(x => x !== D[t.getUTCDay()]).sort(() => Math.random() - .5),
      `${add} mod 7 = ${add % 7}. Move ${add % 7} day(s) forward from ${D[base.getUTCDay()]}.`);
  },
  blood() {
    const [t, a, ...w] = pick(BLOOD), N = shuffle(["P", "Q", "R", "S", "T", "M", "K", "L"]);
    return mcq(t.replace(/\{([A-D])\}/g, (_, c) => N["ABCD".indexOf(c)]), a, w, `Draw the family tree step by step: ${a}.`);
  },
  assumption() {
    const [s, i, ii, a] = pick(ASSUMPTIONS);
    return mcq(`<b>Statement:</b> ${s}<br><b>Assumptions:</b> I. ${i} II. ${ii}`, a, ["Only I is implicit", "Only II is implicit", "Both I and II are implicit", "Neither I nor II is implicit"].filter(o => o !== a),
      `An assumption is something the speaker must take for granted. ${a}.`);
  },
};

/* ---------- MENTAL REASONING ---------- */
const mental = {
  numSeries() {
    const v = rnd(0, 6); let s, nx, rule;
    const a = rnd(2, 20), d = rnd(3, 15), r = rnd(2, 3);
    if (v === 0) { s = [0, 1, 2, 3, 4].map(i => a + i * d); nx = a + 5 * d; rule = `add ${d} each time`; }
    else if (v === 1) { const b = rnd(1, 5); s = [0, 1, 2, 3, 4].map(i => b * r ** i); nx = b * r ** 5; rule = `multiply by ${r}`; }
    else if (v === 2) { const k = rnd(1, 6), o = rnd(-3, 3); s = [0, 1, 2, 3, 4].map(i => (k + i) ** 2 + o); nx = (k + 5) ** 2 + o; rule = `squares ${o ? (o > 0 ? "+ " + o : "− " + -o) : ""} (${k}², ${k + 1}², …)`; }
    else if (v === 3) { s = [a]; for (let i = 1; i < 5; i++) s.push(s[i - 1] + d + 2 * (i - 1)); nx = s[4] + d + 8; rule = `differences ${d}, ${d + 2}, ${d + 4}, … increase by 2`; }
    else if (v === 4) { s = [rnd(1, 5)]; for (let i = 1; i < 5; i++) s.push(s[i - 1] * 2 + 1); nx = s[4] * 2 + 1; rule = `× 2 + 1`; }
    else if (v === 5) { const k = rnd(1, 4); s = [0, 1, 2, 3, 4].map(i => (k + i) ** 3); nx = (k + 5) ** 3; rule = `cubes ${k}³, ${k + 1}³, …`; }
    else { const e = rnd(2, 6), o = rnd(2, 9); s = [a, a + e, a + e - o, a + 2 * e - o, a + 2 * e - 2 * o]; nx = a + 3 * e - 2 * o; rule = `alternately + ${e} and − ${o}`; }
    return nq(`Find the next number: ${s.join(", ")}, ?`, nx, [nx + d, nx - 1, nx + 2], `Rule: ${rule}. Next = ${nx}.`);
  },
  letterSeries() {
    const L = i => String.fromCharCode(65 + ((i % 26) + 26) % 26);
    if (Math.random() < .5) { const a = rnd(0, 10), k = rnd(2, 5); const s = [0, 1, 2, 3].map(i => L(a + i * k)); return mcq(`Find the next term: ${s.join(", ")}, ?`, L(a + 4 * k), [L(a + 4 * k + 1), L(a + 4 * k - 1), L(a + 5 * k)], `Each letter moves ${k} places forward.`); }
    const a = rnd(0, 8); const s = [0, 1, 2].map(i => L(a + i) + L(25 - a - i)); const c = L(a + 3) + L(22 - a);
    return mcq(`Find the next term: ${s.join(", ")}, ?`, c, [L(a + 3) + L(23 - a), L(a + 4) + L(22 - a), L(22 - a) + L(a + 3)], `First letter moves forward by 1, second letter backward by 1 (opposite letters).`);
  },
  numAnalogy() {
    const R = [[n => n * n, "n²"], [n => n ** 3, "n³"], [n => n * n + 1, "n² + 1"], [n => n * n - 1, "n² − 1"], [n => n ** 3 - n, "n³ − n"], [n => 2 * n + 3, "2n + 3"], [n => n * (n + 1), "n(n + 1)"]];
    const [f, s] = pick(R), a = rnd(2, 9); let b; do { b = rnd(2, 12); } while (b === a);
    return nq(`${a} : ${f(a)} :: ${b} : ?`, f(b), [f(b) + 1, f(b) - b, f(b + 1)], `Rule: ${s}. For ${b}: ${f(b)}.`);
  },
  wordAnalogy() {
    const [x, y, z, a, ...w] = pick(ANALOGY);
    return mcq(`${x} : ${y} :: ${z} : ?`, a, w, `${x} relates to ${y} as ${z} relates to ${a}.`);
  },
  coding() {
    const W = ["TRAIN", "SIGNAL", "STATION", "TICKET", "ENGINE", "TRACK", "PLATFORM", "COACH", "DRIVER", "GUARD", "BRIDGE", "TUNNEL", "SLEEPER", "WAGON", "ROUTE", "SPEED"];
    const [w1, w2] = shuffle(W);
    const v = rnd(0, 3);
    const sh = (w, k) => w.split("").map(c => String.fromCharCode((c.charCodeAt(0) - 65 + k + 26) % 26 + 65)).join("");
    if (v === 0) { const k = pick([1, 2, 3, -1, -2]); const e = sh(w2, k); return mcq(`If ${w1} is coded as ${sh(w1, k)}, how is ${w2} coded?`, e, [sh(w2, -k), sh(w2, k + 1), sh(w2, k).split("").reverse().join("")], `Each letter is shifted ${Math.abs(k)} place(s) ${k > 0 ? "forward" : "backward"}.`); }
    if (v === 1) { const op = w => w.split("").map(c => String.fromCharCode(155 - c.charCodeAt(0))).join(""); return mcq(`If ${w1} is coded as ${op(w1)}, how is ${w2} coded?`, op(w2), [sh(w2, 1), op(w2).split("").reverse().join(""), sh(op(w2), 1)], `Each letter is replaced by its opposite (A↔Z, B↔Y, …): position p becomes 27 − p.`); }
    if (v === 2) { const rv = w => w.split("").reverse().join(""); return mcq(`If ${w1} is coded as ${sh(rv(w1), 1)}, how is ${w2} coded?`, sh(rv(w2), 1), [rv(w2), sh(w2, 1), sh(rv(w2), -1)], `Reverse the word, then shift each letter one place forward.`); }
    const sum = w => w.split("").reduce((s, c) => s + c.charCodeAt(0) - 64, 0);
    return nq(`If ${w1} = ${sum(w1)} (sum of letter positions, A = 1), what is ${w2}?`, sum(w2), [sum(w2) + w2.length, sum(w2) - 1], `${w2.split("").map(c => c.charCodeAt(0) - 64).join(" + ")} = ${sum(w2)}.`);
  },
  ranking() {
    const v = rnd(0, 2);
    if (v === 0) { const l = rnd(5, 25), r = rnd(5, 25); return nq(`In a row of students, A is ${ord(l)} from the left and ${ord(r)} from the right. How many students are in the row?`, l + r - 1, [l + r, l + r + 1], `Total = left + right − 1 = ${l} + ${r} − 1 = ${l + r - 1}.`); }
    if (v === 1) { const N = rnd(20, 60), k = rnd(3, N - 3); return nq(`In a class of ${N} students, Ravi ranks ${ord(k)} from the top. What is his rank from the bottom?`, N - k + 1, [N - k, N - k + 2], `Rank from bottom = N − rank from top + 1 = ${N} − ${k} + 1 = ${N - k + 1}.`); }
    const l = rnd(5, 15), r = rnd(5, 15), N = l + r + rnd(3, 12);
    return nq(`In a row of ${N} children, P is ${ord(l)} from the left and Q is ${ord(r)} from the right. How many children sit between P and Q?`, N - l - r, [N - l - r + 1, N - l - r - 1], `Between = N − (left position + right position) = ${N} − ${l + r} = ${N - l - r} (P is to the left of Q).`);
  },
  direction() {
    const dirs = ["North", "East", "South", "West"], V = [[0, 1], [1, 0], [0, -1], [-1, 0]];
    for (let tries = 0; tries < 200; tries++) {
      let d = rnd(0, 3), x = 0, y = 0, txt = `A man walks ${pick([3, 4, 5, 6, 8])} km `;
      const legs = rnd(2, 4); const steps = [];
      let first = true;
      for (let i = 0; i < legs; i++) {
        const s = pick([2, 3, 4, 5, 6, 8, 10, 12]); if (!first) { const t = pick(["right", "left"]); d = (d + (t === "right" ? 1 : 3)) % 4; steps.push(`turns ${t} and walks ${s} km`); } else steps.push(`walks ${s} km ${dirs[d]}`);
        first = false; x += V[d][0] * s; y += V[d][1] * s;
      }
      const dist = Math.hypot(x, y); if (!Number.isInteger(dist) || dist === 0) continue;
      txt = `A man ${steps.join(", then ")}. How far is he from the starting point?`;
      return nq(txt, dist, [Math.abs(x) + Math.abs(y), dist + 2], `Net displacement: ${Math.abs(x)} km ${x >= 0 ? "East" : "West"}, ${Math.abs(y)} km ${y >= 0 ? "North" : "South"}. Distance = √(${x}² + ${y}²) = ${dist} km.`, "", " km");
    }
    return mental.ranking();
  },
  oddOne() {
    const sets = [
      [() => rnd(2, 15) ** 2, () => { let n; do { n = rnd(5, 220); } while (Number.isInteger(Math.sqrt(n))); return n; }, "all others are perfect squares"],
      [() => pick([2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71]), () => pick([9, 15, 21, 25, 27, 33, 35, 39, 45, 49, 51, 57, 63, 69, 77, 87, 91]), "all others are prime"],
      [() => rnd(2, 9) ** 3, () => rnd(2, 9) ** 3 + rnd(1, 5), "all others are perfect cubes"],
      [() => 7 * rnd(3, 30), () => { let n; do { n = rnd(20, 210); } while (n % 7 === 0); return n; }, "all others are multiples of 7"],
    ];
    const [g, odd, why] = pick(sets);
    const good = new Set(); while (good.size < 3) good.add(g());
    let o; do { o = odd(); } while (good.has(o));
    return mcq(`Find the odd one out.`, o, [...good], `${o} is the odd one: ${why}.`);
  },
};
const ANALOGY = [
  ["Doctor", "Hospital", "Teacher", "School", "Office", "Court", "Shop"], ["Pen", "Write", "Knife", "Cut", "Cook", "Sharp", "Steel"],
  ["Bird", "Nest", "Bee", "Hive", "Burrow", "Den", "Stable"], ["Cow", "Calf", "Dog", "Puppy", "Kitten", "Cub", "Foal"],
  ["Hot", "Cold", "Tall", "Short", "High", "Long", "Big"], ["Eye", "See", "Ear", "Hear", "Smell", "Touch", "Sound"],
  ["Thermometer", "Temperature", "Barometer", "Pressure", "Humidity", "Altitude", "Speed"], ["Ammeter", "Current", "Voltmeter", "Voltage", "Resistance", "Power", "Charge"],
  ["Driver", "Train", "Pilot", "Aeroplane", "Ship", "Bus", "Airport"], ["Station", "Train", "Airport", "Aeroplane", "Pilot", "Runway", "Ticket"],
  ["Author", "Book", "Composer", "Music", "Painting", "Poem", "Film"], ["Water", "Thirst", "Food", "Hunger", "Taste", "Plate", "Cook"],
  ["Lion", "Roar", "Dog", "Bark", "Howl", "Hiss", "Bray"], ["Fish", "Gills", "Human", "Lungs", "Heart", "Nose", "Skin"],
  ["Gram", "Mass", "Metre", "Length", "Area", "Volume", "Weight"], ["Second", "Time", "Ampere", "Current", "Voltage", "Power", "Charge"],
  ["Book", "Library", "Car", "Garage", "Road", "Wheel", "Driver"], ["Seed", "Plant", "Egg", "Bird", "Nest", "Shell", "Hen"],
  ["Carpenter", "Wood", "Tailor", "Cloth", "Needle", "Shop", "Thread"], ["Sun", "Day", "Moon", "Night", "Star", "Sky", "Month"],
  ["Rupee", "India", "Yen", "Japan", "China", "Korea", "Dollar"], ["Petal", "Flower", "Page", "Book", "Paper", "Pen", "Letter"],
  ["Cricket", "Bat", "Tennis", "Racket", "Net", "Ball", "Court"], ["Brick", "Wall", "Word", "Sentence", "Letter", "Book", "Language"],
  ["Engine", "Train", "Heart", "Body", "Blood", "Lungs", "Pulse"],
];

/* ---------- registry ---------- */
const T = [];
const reg = (sec, group, id, name, fn) => T.push({ sec, group, id, name, fn });
const MN = { pctOf: "Percentage", pctMoreLess: "Percentage (more/less than)", successive: "Successive % change", profit: "Profit, loss & discount", si: "Simple interest", ci: "Compound interest", ratioDiv: "Ratio — division", ratioChain: "Ratio — combining", avgNew: "Averages", trainPole: "Trains — pole & platform", trainsTwo: "Trains — two trains", avgSpeed: "Average speed", work: "Time & work", hcfLcm: "HCF & LCM", ap: "Arithmetic progression", divisible: "Divisibility", unitDigit: "Unit digit", circle: "Circle", cylinder: "Cylinder", cuboid: "Cuboid", trigRatio: "Trigonometric ratios", trigValue: "Standard trig values", probDice: "Probability — dice", probCards: "Probability — cards", probCoins: "Probability — coins", stats: "Mean, median & mode", ages: "Ages", linEq: "Linear equations" };
for (const k in maths) reg(MS, "Mathematics", "m." + k, MN[k], maths[k]);
const SN = { ke: "Kinetic energy", keRatio: "KE and speed", work: "Work", power: "Power", density: "Density", kmhToMs: "Unit conversion — speed", relVel: "Relative velocity", motion: "Equations of motion", ohm: "Ohm's law & power", resistors: "Series & parallel resistors", units: "Electricity bill (kWh)", heat: "Heat (mcΔT)", temp: "Temperature scales", lever: "Levers", friction: "Friction", weight: "Mass & weight", facts: "Units & concepts" };
for (const k in sci) reg(MS, "Basic science", "s." + k, SN[k], sci[k]);
reg(DI, "Data interpretation", "d.series", "Tables, bar & line charts (set of 5)", diSeries);
reg(DI, "Data interpretation", "d.pie", "Pie charts (set of 5)", diPie);
reg(DI, "Data interpretation", "d.venn", "Venn diagrams", diSingles.venn);
reg(DI, "Data interpretation", "d.suff", "Data sufficiency", diSingles.sufficiency);
const LN = { syllogism: "Syllogism", boolean: "Binary logic (true/false)", clock: "Clocks", calendar: "Calendars", blood: "Blood relations", assumption: "Assumptions" };
for (const k in logic) reg(LR, "Logical capability", "l." + k, LN[k], logic[k]);
reg(LR, "Logical capability", "l.seating", "Seating puzzle (set of 3)", seating);
reg(LR, "Reading comprehension", "l.rc", "Reading comprehension (passage of 4)", rc);
const RN = { numSeries: "Number series", letterSeries: "Letter series", numAnalogy: "Number analogy", wordAnalogy: "Word analogy", coding: "Coding–decoding", ranking: "Ranking", direction: "Direction sense", oddOne: "Odd one out" };
for (const k in mental) reg(MR, "Mental reasoning", "r." + k, RN[k], mental[k]);

function rc() {
  const P = pick(RC), stem = `<p class="st"><b>${P.t}</b></p><p class="rc">${P.p}</p>`;
  return P.q.map(([q, a, ...w]) => Object.assign(mcq(q, a, w, `The passage supports: "${a}".`), { stem }));
}

function gen(t) {
  const out = t.fn(); const arr = Array.isArray(out) ? out : [out];
  return arr.map(q => Object.assign(q, { sec: t.sec, topic: t.name, tid: t.id }));
}
function drill(id, n) {
  const t = T.find(x => x.id === id); const out = [];
  let guard = 0;
  while (out.length < n && guard++ < n * 5) out.push(...gen(t));
  return out.slice(0, n);
}
/* Mixed set from a section, sets (DI/RC/seating) kept whole. */
function sectionSet(sec, n, opts = {}) {
  const ts = T.filter(t => t.sec === sec && (!opts.only || opts.only(t)));
  const out = []; let guard = 0;
  while (out.length < n && guard++ < 500) {
    const t = pick(ts); const qs = gen(t);
    if (out.length + qs.length <= n) out.push(...qs);
  }
  return out;
}
/* Full mock: 30 MS (18 maths, 12 science), 30 DI (5 sets of 5 + 5 singles), 20 LR (one passage + seating + singles), 20 MR. */
function mock() {
  const isSet = t => ["d.series", "d.pie", "l.seating", "l.rc"].includes(t.id);
  const ms = sectionSet(MS, 18, { only: t => t.group === "Mathematics" }).concat(sectionSet(MS, 12, { only: t => t.group === "Basic science" }));
  const di = [];
  for (let i = 0; i < 5; i++) di.push(...gen(T.find(t => t.id === (i % 2 ? "d.pie" : "d.series"))));
  di.push(...sectionSet(DI, 30 - di.length, { only: t => !isSet(t) }));
  const lr = gen(T.find(t => t.id === "l.rc")).concat(gen(T.find(t => t.id === "l.seating")));
  lr.push(...sectionSet(LR, 20 - lr.length, { only: t => !isSet(t) }));
  const mr = sectionSet(MR, 20);
  return ms.concat(di, lr, mr);
}

const API = { TOPICS: T, SECTIONS: [MS, DI, LR, MR], drill, sectionSet, mock, gen, _internal: { syllogismEval, MODELS, holds } };
if (typeof module !== "undefined") module.exports = API; else root.RRB = API;
})(typeof window !== "undefined" ? window : globalThis);
