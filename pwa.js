/* Registers the service worker and runs the "Install app" button.
   Any element with data-install becomes the install button; it stays hidden
   when the app is already installed. */
(function () {
  "use strict";
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () { navigator.serviceWorker.register("./sw.js").catch(function () {}); });
  }
  var deferred = null;
  var standalone = window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true;
  var ua = navigator.userAgent, isIOS = /iPad|iPhone|iPod/.test(ua) || (/Macintosh/.test(ua) && "ontouchend" in document);

  /* Visibility is driven by a class on <html>, so buttons that pages re-render keep working. */
  var css = document.createElement("style");
  css.textContent = "html.pwa-installed [data-install]{display:none!important}";
  document.head.appendChild(css);
  function show(on) { document.documentElement.classList.toggle("pwa-installed", !on); }
  function help(msg) {
    var d = document.getElementById("pwa-help");
    if (!d) {
      d = document.createElement("div"); d.id = "pwa-help"; d.setAttribute("role", "dialog");
      d.style.cssText = "position:fixed;left:50%;bottom:1rem;transform:translateX(-50%);z-index:999;max-width:calc(100% - 2rem);width:26rem;" +
        "background:var(--surface,#fff);color:var(--ink,#121A19);border:1px solid var(--line,#D3DDDB);border-radius:10px;padding:1rem 1.1rem;" +
        "box-shadow:0 8px 30px rgba(0,0,0,.18);font:15px/1.5 -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif";
      document.body.appendChild(d);
    }
    d.innerHTML = msg + '<div style="text-align:right;margin-top:.6rem"><button type="button" style="font:inherit;padding:.5rem 1rem;border-radius:8px;border:1px solid var(--line,#D3DDDB);background:none;color:inherit;cursor:pointer">OK</button></div>';
    d.querySelector("button").onclick = function () { d.remove(); };
  }

  window.addEventListener("beforeinstallprompt", function (e) { e.preventDefault(); deferred = e; show(true); });
  window.addEventListener("appinstalled", function () { deferred = null; show(false); });

  if (standalone) show(false);
  document.addEventListener("click", function (ev) {
    var b = ev.target.closest && ev.target.closest("[data-install]");
    if (!b) return;
    ev.preventDefault();
    if (deferred) {
      deferred.prompt();
      deferred.userChoice.finally(function () { deferred = null; });
    } else if (isIOS) {
      help("<b>Install on iPhone / iPad</b><br>In <b>Safari</b>, tap the <b>Share</b> button (square with an arrow), then <b>Add to Home Screen</b>.");
    } else {
      help("<b>Install the app</b><br>Open the browser menu <b>⋮</b> and choose <b>Install app</b> or <b>Add to Home screen</b>.<br><span style=\"color:var(--muted,#57635F);font-size:.9em\">Works in Chrome, Edge and Samsung Internet. If you don't see the option, reload the page once and try again.</span>");
    }
  });
})();
