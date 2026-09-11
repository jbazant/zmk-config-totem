const board = document.getElementById("board");

KEYS.forEach((k, i) => {
  const p = POS[i];
  const el = document.createElement("div");
  el.className = "key";
  if (i >= 32) el.classList.add("thumb");
  if (k.mod) el.classList.add("has-mod");
  if (k.layerSwitch) {
    el.classList.add("layer-switch");
    el.style.background = `color-mix(in srgb, ${LAYER_COLORS[k.layerSwitch]} 28%, var(--key))`;
    el.style.borderColor = LAYER_COLORS[k.layerSwitch];
  }

  el.style.left = `calc(${p.x} * var(--u))`;
  el.style.top = `calc(${p.y} * var(--u))`;
  if (p.r) el.style.transform = `rotate(${p.r}deg)`;

  let html = "";
  if (k.mod) {
    html += `<span class="mod-label" title="${k.mod}">${MOD[k.mod] || k.mod}</span>`;
  }

  const order = ["Nav", "Sym", "Czech", "Fun"];
  const cells = order
    .filter((L) => k.overlays[L] != null)
    .map((L) => `<span class="c-${L.toLowerCase()}">${k.overlays[L]}</span>`)
    .join("");
  html += `<div class="layers">${cells}</div>`;

  const baseHtml = typeof k.base === "string" && k.base.startsWith("<svg")
    ? k.base
    : k.base;
  html += `<div class="base">${baseHtml}</div>`;
  if (k.tapHint) html += `<div class="tap-hint">${k.tapHint}</div>`;

  el.innerHTML = html;
  board.appendChild(el);
});

const wrap = document.querySelector(".board-wrap");
function fitBoard() {
  board.style.transform = "none";
  wrap.style.height = "";
  const scale = Math.min(1, wrap.clientWidth / board.offsetWidth);
  const dx = (wrap.clientWidth - board.offsetWidth * scale) / 2;
  board.style.transform = `translate(${dx}px, 0) scale(${scale})`;
  wrap.style.height = `${board.offsetHeight * scale}px`;
}
fitBoard();
window.addEventListener("resize", fitBoard);
