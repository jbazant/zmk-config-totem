// Inline SVG icons (currentColor)
const I = {
  mute: `<svg class="icon" viewBox="0 0 24 24"><path d="M4 9v6h4l5 5V4L8 9H4zm12.5 3a4.5 4.5 0 0 0-2.5-4v2.2c.6.4 1 1 1 1.8s-.4 1.4-1 1.8V16a4.5 4.5 0 0 0 2.5-4zM16 3.2v2.1A7.9 7.9 0 0 1 20.5 12 7.9 7.9 0 0 1 16 18.7v2.1A9.9 9.9 0 0 0 22.5 12 9.9 9.9 0 0 0 16 3.2z"/><path d="M3 3l18 18" stroke="currentColor" stroke-width="2" fill="none"/></svg>`,
  volDn: `<svg class="icon" viewBox="0 0 24 24"><path d="M4 9v6h4l5 5V4L8 9H4zm11 3a3 3 0 0 0-1.5-2.6v5.2A3 3 0 0 0 15 12z"/></svg>`,
  volUp: `<svg class="icon" viewBox="0 0 24 24"><path d="M4 9v6h4l5 5V4L8 9H4zm12.5 3a4.5 4.5 0 0 0-2.5-4v8a4.5 4.5 0 0 0 2.5-4zM16 3.2v2.1A7.9 7.9 0 0 1 20.5 12 7.9 7.9 0 0 1 16 18.7v2.1A9.9 9.9 0 0 0 22.5 12 9.9 9.9 0 0 0 16 3.2z"/></svg>`,
  briDn: `<svg class="icon" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3.5"/><path d="M12 2v2.5M12 19.5V22M4.2 4.2l1.8 1.8M18 18l1.8 1.8M2 12h2.5M19.5 12H22M4.2 19.8L6 18M18 6l1.8-1.8" stroke="currentColor" stroke-width="1.6" fill="none"/><path d="M3 21L21 3" stroke="currentColor" stroke-width="1.8" fill="none"/></svg>`,
  briUp: `<svg class="icon" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3.5"/><path d="M12 2v2.5M12 19.5V22M4.2 4.2l1.8 1.8M18 18l1.8 1.8M2 12h2.5M19.5 12H22M4.2 19.8L6 18M18 6l1.8-1.8" stroke="currentColor" stroke-width="1.6" fill="none"/></svg>`,
  prev: `<svg class="icon" viewBox="0 0 24 24"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/></svg>`,
  play: `<svg class="icon" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>`,
  next: `<svg class="icon" viewBox="0 0 24 24"><path d="M16 6h2v12h-2zM5 18l8.5-6L5 6z"/></svg>`,
  coffee: `<svg class="icon" viewBox="0 0 24 24"><path d="M12 2a5 5 0 0 0-5 5v3H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-1V7a5 5 0 0 0-5-5zm-3 5a3 3 0 0 1 6 0v3H9V7zm3 7.5a1.5 1.5 0 0 1 .5 2.9V19h-1v-1.6a1.5 1.5 0 0 1 .5-2.9z"/></svg>`,
  up: `<svg class="icon" viewBox="0 0 24 24"><path d="M12 5l7 9H5z"/></svg>`,
  dn: `<svg class="icon" viewBox="0 0 24 24"><path d="M12 19l-7-9h14z"/></svg>`,
  left: `<svg class="icon" viewBox="0 0 24 24"><path d="M5 12l9-7v14z"/></svg>`,
  right: `<svg class="icon" viewBox="0 0 24 24"><path d="M19 12l-9 7V5z"/></svg>`,
  home: `<svg class="icon" viewBox="0 0 24 24"><path d="M4 12l8-8 8 8v8H4v-8zm2 6h4v-4h4v4h4v-5.2L12 6.8 6 12.8V18z"/></svg>`,
  end: `<svg class="icon" viewBox="0 0 24 24"><path d="M4 6h2v12H4V6zm4 5h8.2l-2.3-2.3 1.4-1.4L20 12l-4.7 4.7-1.4-1.4 2.3-2.3H8v-2zm12-5h-2v12h2V6z"/></svg>`,
  pgup: `<svg class="icon" viewBox="0 0 24 24"><path d="M7 14l5-5 5 5H7zm0 5h10v2H7v-2z"/></svg>`,
  pgdn: `<svg class="icon" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5H7zM7 5h10V3H7v2z"/></svg>`,
  del: `<svg class="icon" viewBox="0 0 24 24"><g transform="scale(-1, 0.7) translate(-24, 0)"><path d="M9 4h12v16H9l-7-8 7-8zm2 4l2.5 3L16 8l1.4 1.4-2.5 3 2.5 3L16 17l-2.5-3L11 17l-1.4-1.4 2.5-3-2.5-3L11 8z"/></g></svg>`,
  bspc: `<svg class="icon" viewBox="0 0 24 24"><path d="M22 6H9L2 12l7 6h13V6zm-4.3 9.3L16.3 14l-2.3 2.3-1.4-1.4 2.3-2.3-2.3-2.3 1.4-1.4 2.3 2.3 2.3-2.3 1.4 1.4-2.3 2.3 2.3 2.3-1.4 1.4z"/></svg>`,
  tab: `<svg class="icon" viewBox="0 0 24 24"><path d="M4 6h2v12H4V6zm4 5h7.2L13 8.8 14.4 7.4 20 13l-5.6 5.6-1.4-1.4L15.2 15H8v-4zm12-5h-2v12h2V6z"/></svg>`,
  ret: `<svg class="icon" viewBox="0 0 24 24"><path d="M19 7v6H7.8l2.3-2.3L8.7 9.3 4 14l4.7 4.7 1.4-1.4L7.8 15H21V7h-2z"/></svg>`,
  spc: `<svg class="icon" viewBox="0 0 24 24"><path d="M3 14h18v3H3v-3z"/></svg>`,
  esc: `<svg class="icon" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2.2" fill="none"/></svg>`,
};

const MOD = {
  LCTRL: "⌃", RCTRL: "⌃",
  LALT: "⌥", RALT: "⌥",
  LGUI: "⌘", RGUI: "⌘",
  LSHIFT: "⇧", RSHFT: "⇧", LSHFT: "⇧",
};

const LAYER_COLORS = {
  Nav: "var(--nav)",
  Sym: "var(--sym)",
  Fun: "var(--fun)",
  Czech: "var(--czech)",
};

// Per-key: base label, optional mod (shown once), optional layerSwitch, overlays by layer
// Overlays ignore &trans; hm hold side not repeated (mod already on key)
const KEYS = [
  // 0–9 top row
  { base: "Q", overlays: { Nav: "~", Sym: "!" } },
  { base: "W", overlays: { Nav: I.home, Sym: "@", Czech: "ě" } },
  { base: "E", overlays: { Nav: I.up, Sym: "#", Fun: I.mute, Czech: "é" } },
  { base: "R", overlays: { Nav: I.end, Sym: "$", Fun: I.volDn, Czech: "ř" } },
  { base: "T", overlays: { Nav: I.pgup, Sym: "%", Fun: I.volUp, Czech: "ť" } },
  { base: "Y", overlays: { Nav: "÷", Sym: "^", Fun: "F11", Czech: "ý" } },
  { base: "U", overlays: { Nav: "7", Sym: "&", Fun: "F12", Czech: "ú" } },
  { base: "I", overlays: { Nav: "8", Sym: "*", Fun: "F13", Czech: "í" } },
  { base: "O", overlays: { Nav: "9", Sym: "'", Fun: "F14", Czech: "ó" } },
  { base: "P", overlays: { Nav: "−", Sym: '"', Fun: "F15" } },

  // 10–19 home row
  { base: "A", mod: "LCTRL", overlays: { Sym: "°", Czech: "á" } },
  { base: "S", mod: "LALT", overlays: { Nav: I.left, Sym: "~", Czech: "š" } },
  { base: "D", mod: "LGUI", overlays: { Nav: I.dn, Sym: "{", Czech: "ď" } },
  { base: "F", mod: "LSHIFT", overlays: { Nav: I.right, Sym: "[", Fun: I.briDn } },
  { base: "G", overlays: { Nav: I.pgdn, Sym: "(", Fun: I.briUp } },
  { base: "H", overlays: { Nav: "×", Sym: "@", Fun: "F6" } },
  { base: "J", mod: "RSHFT", overlays: { Nav: "4", Sym: "€", Fun: "F7", Czech: "ů" } },
  { base: "K", mod: "RGUI", overlays: { Nav: "5", Sym: "§", Fun: "F8" } },
  { base: "L", mod: "RALT", overlays: { Nav: "6", Fun: "F9", Czech: "ô", Sym: "`" } },
  { base: ";", mod: "RCTRL", overlays: { Nav: "+", Sym: "\\", Fun: "F10" } },

  // 20–31 bottom alpha + outer
  { base: I.esc, layerSwitch: "Fun", tapHint: "Esc", overlays: {} },
  { base: "Z", overlays: { Czech: "ž" } },
  { base: "X", overlays: { Nav: ",", Czech: "ß" } },
  { base: "C", overlays: { Nav: "_", Sym: "}", Fun: I.prev, Czech: "č" } },
  { base: "V", overlays: { Nav: "(", Sym: "]", Fun: I.play, Czech: "ˇ" } },
  { base: "B", overlays: { Nav: ")", Sym: ")", Fun: I.next, Czech: "¨" } },
  { base: "N", overlays: { Nav: "0", Sym: "−", Fun: "F1", Czech: "ň" } },
  { base: "M", overlays: { Nav: "1", Sym: "=", Fun: "F2", Czech: "´" } },
  { base: ",", overlays: { Nav: "2", Fun: "F3" } },
  { base: ".", overlays: { Nav: "3", Fun: "F4" } },
  { base: "/", overlays: { Nav: "=", Fun: "F5" } },
  { base: "'", layerSwitch: "Czech", overlays: { Fun: I.coffee,  Nav: "%", Sym: "`"  } },

  // 32–37 thumbs
  { base: I.del, mod: "LGUI", tapHint: "Del", overlays: {} },
  { base: I.tab, layerSwitch: "Nav", tapHint: "Tab", overlays: {} },
  { base: I.spc, tapHint: "Space", overlays: {} },
  { base: I.ret, tapHint: "Enter", overlays: {} },
  { base: I.bspc, layerSwitch: "Sym", tapHint: "Bksp", overlays: {} },
  { base: "−", layerSwitch: "Czech", tapHint: "−", overlays: {} },
];
