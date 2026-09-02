/* Shared tutor helper. Uses the viewer's own Google AI Studio key from
   localStorage ("gkey"), which is set up in tutor.html. Same origin, so the
   key is shared across pages on this site. Never bundled, never uploaded. */
(function (w) {
  var API = "https://generativelanguage.googleapis.com/v1beta/";

  function LS(k, v) {
    try {
      if (v === undefined) return localStorage.getItem(k);
      if (v === null) localStorage.removeItem(k); else localStorage.setItem(k, v);
    } catch (e) { return null; }
  }

  function esc(s) {
    return String(s).replace(/[&<>]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c];
    });
  }

  function md(src) {
    var blocks = [], s = esc(src), i, m;
    s = s.replace(/```(?:\w*)\n([\s\S]*?)```/g, function (x, c) {
      blocks.push(c); return "@@B" + (blocks.length - 1) + "@@";
    });
    s = s.replace(/`([^`\n]+)`/g, "<code>$1</code>")
         .replace(/\*\*([^*\n]+)\*\*/g, "<strong>$1</strong>");
    var out = [], list = null;
    s.split("\n").forEach(function (line) {
      var t = line.trim();
      if (!t) { if (list) { out.push("</" + list + ">"); list = null; } return; }
      if (/^#{2,4}\s+/.test(t)) {
        if (list) { out.push("</" + list + ">"); list = null; }
        out.push("<h3>" + t.replace(/^#{2,4}\s+/, "") + "</h3>"); return;
      }
      if ((m = t.match(/^[-*]\s+(.*)$/))) {
        if (list !== "ul") { if (list) out.push("</" + list + ">"); out.push("<ul>"); list = "ul"; }
        out.push("<li>" + m[1] + "</li>"); return;
      }
      if ((m = t.match(/^\d+[.)]\s+(.*)$/))) {
        if (list !== "ol") { if (list) out.push("</" + list + ">"); out.push("<ol>"); list = "ol"; }
        out.push("<li>" + m[1] + "</li>"); return;
      }
      if (list) { out.push("</" + list + ">"); list = null; }
      out.push("<p>" + t + "</p>");
    });
    if (list) out.push("</" + list + ">");
    var html = out.join("");
    for (i = 0; i < blocks.length; i++) {
      html = html.split("@@B" + i + "@@")
        .join("</p><pre><code>" + blocks[i].replace(/\n$/, "") + "</code></pre><p>");
    }
    return html.replace(/<p><\/p>/g, "");
  }

  /* Prompt for a passage lifted out of a book: the reader's main case. */
  function promptPassage(passage, ctx) {
    return "You are helping a candidate prepare for GATE 2027 Computer Science, targeting a top-300 rank " +
      "(about 76 marks out of 100). Below is a passage they selected while reading" +
      (ctx ? " " + ctx : "") + ". They did not understand it.\n\n" +
      "Explain it at exactly the level GATE tests - precise and exam-focused, no filler.\n\n" +
      "Structure the answer with these headings:\n" +
      "## In plain words - what this passage is actually saying, two or three sentences.\n" +
      "## Precisely - the exact definition, formula or result behind it. State complexities and conditions exactly.\n" +
      "## Worked example - one small concrete example with real numbers.\n" +
      "## How GATE asks it - the question patterns, and the traps people fall for.\n\n" +
      "Be concise - under 350 words. Never approximate a complexity or a closure property. If the passage is " +
      "ambiguous out of context, say what you assumed.\n\n" +
      "---\n" + passage;
  }

  /* Prompt for a cropped screenshot of a page. */
  function promptImage(ctx) {
    return "You are helping a candidate prepare for GATE 2027 Computer Science, targeting a top-300 rank " +
      "(about 76 marks out of 100). The image is a region they cropped while reading" +
      (ctx ? " " + ctx : "") + ". They did not understand it.\n\n" +
      "First read the image carefully, including any formula, diagram, table or code. Then explain it at exactly " +
      "the level GATE tests - precise and exam-focused, no filler.\n\n" +
      "Structure the answer with these headings:\n" +
      "## What this shows - what is in the image, in two or three sentences.\n" +
      "## Precisely - the exact definition, formula or result behind it. State complexities and conditions exactly.\n" +
      "## Worked example - one small concrete example with real numbers.\n" +
      "## How GATE asks it - the question patterns, and the traps people fall for.\n\n" +
      "If the image is a question, solve it step by step and state the final answer clearly.\n\n" +
      "Be concise - under 350 words. Never approximate a complexity or a closure property. If the image is " +
      "cut off or unreadable, say exactly what is missing instead of guessing.";
  }

  function pickModel(models) {
    var best = null, bestScore = -1;
    (models || []).forEach(function (m) {
      var meth = m.supportedGenerationMethods || [];
      if (meth.indexOf("generateContent") < 0) return;
      var n = m.name || "";
      if (/embed|aqa|imagen|veo|tts|image-generation/i.test(n)) return;
      var score = 0;
      if (/flash/i.test(n)) score += 10;
      if (/lite/i.test(n)) score -= 3;
      if (/preview|exp/i.test(n)) score -= 2;
      var v = n.match(/(\d+)\.(\d+)/);
      if (v) score += parseInt(v[1], 10) * 2 + parseInt(v[2], 10) * 0.1;
      if (score > bestScore) { bestScore = score; best = n; }
    });
    return best;
  }

  function errMsg(e) {
    var h = e && e.http, msg = (e && e.body && e.body.error && e.body.error.message) || "";
    if (e && e.name === "AbortError") return null;
    if (h === 400 && /API key not valid|API_KEY_INVALID/i.test(msg))
      return "That key was rejected. Set a new one on the tutor page.";
    if (h === 403) return "This key is not allowed to use the API. Create a fresh one in AI Studio.";
    if (h === 429) return "Free-tier limit hit. Wait a minute, then ask again.";
    if (h === 503) return "Google's service is busy. Try again in a moment.";
    if (h) return "Request failed (" + h + "). " + esc(msg || "");
    return "Could not reach Google. Check your connection.";
  }

  function ensureModel(key) {
    var m = LS("gmodel");
    if (m) return Promise.resolve(m);
    return fetch(API + "models?key=" + encodeURIComponent(key)).then(function (r) {
      if (!r.ok) return r.json().then(function (j) { throw { http: r.status, body: j }; });
      return r.json();
    }).then(function (j) {
      var pick = pickModel(j.models);
      if (!pick) throw { http: 0, body: { error: { message: "No usable model on this key." } } };
      LS("gmodel", pick);
      return pick;
    });
  }

  /* turns: [{role:"user"|"model", parts:[{text}]}]  onDelta(fullTextSoFar) */
  function ask(turns, onDelta, signal) {
    var key = LS("gkey");
    if (!key) return Promise.reject({ http: 0, noKey: true, body: { error: { message: "No key set." } } });
    var acc = "";
    return ensureModel(key).then(function (model) {
      return fetch(API + model + ":streamGenerateContent?alt=sse&key=" + encodeURIComponent(key), {
        method: "POST",
        headers: { "content-type": "application/json" },
        signal: signal,
        body: JSON.stringify({
          contents: turns,
          generationConfig: { temperature: 0.3, maxOutputTokens: 2048 }
        })
      });
    }).then(function (r) {
      if (!r.ok) return r.json().then(function (j) { throw { http: r.status, body: j }; });
      var rd = r.body.getReader(), dec = new TextDecoder(), buf = "";
      function pump() {
        return rd.read().then(function (res) {
          if (res.done) return;
          buf += dec.decode(res.value, { stream: true });
          var i;
          while ((i = buf.indexOf("\n")) >= 0) {
            var line = buf.slice(0, i); buf = buf.slice(i + 1);
            if (line.indexOf("data:") !== 0) continue;
            var raw = line.slice(5).trim();
            if (!raw) continue;
            try {
              var o = JSON.parse(raw);
              var c = o.candidates && o.candidates[0];
              var ps = c && c.content && c.content.parts;
              if (ps) ps.forEach(function (p) { if (p.text) acc += p.text; });
              if (onDelta) onDelta(acc);
            } catch (e) { /* partial frame, wait for more */ }
          }
          return pump();
        });
      }
      return pump();
    }).then(function () { return acc; })
      .catch(function (e) { e.partial = acc; throw e; });
  }

  w.GateAI = {
    hasKey: function () { return !!LS("gkey"); },
    md: md, esc: esc, ask: ask, errMsg: errMsg, promptPassage: promptPassage, promptImage: promptImage
  };
})(window);
