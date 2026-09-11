---
name: cheatsheet-sync
description: Regenerates cheatsheet/layout.js's KEYS array from config/totem.keymap so the visual keyboard cheatsheet stays in sync with the actual ZMK firmware. Use this whenever totem.keymap changes (new bindings, combos, layer reshuffles) and the cheatsheet needs updating, whenever the user asks to "regenerate/update/sync the cheatsheet", "check if the cheatsheet matches the keymap", or reports the printed/HTML cheatsheet showing something wrong or missing compared to what the keyboard actually does.
---

# Cheatsheet sync

`cheatsheet/layout.js` is a hand-maintained mirror of `config/totem.keymap`: every
key's base label, mods, layer-switch behavior, and per-layer overlays are
duplicated there for the HTML/print cheatsheet. That duplication drifts —
someone edits the keymap and forgets the cheatsheet (or copies a value to the
wrong position). This skill re-derives the KEYS array straight from the
keymap so the cheatsheet can't silently disagree with the firmware.

## File map

- `config/totem.keymap` — source of truth. 5 layers (`Base`, `Nav`, `Sym`,
  `Fun`, `Czech`), each a `bindings = < ... >;` block of exactly 38 tokens in
  a fixed physical order (there's an ASCII diagram in the file showing
  position numbers 0–37).
- `config/czech_macos.dtsi` — defines the custom Czech/diacritic behaviors
  (`cs_ec`, `cs_aa`, `o_circ`, `sharp_s`, `csdc_ht`, etc.) referenced from the
  `Czech` layer. Each behavior's target character is documented in a `//`
  comment next to its definition.
- `cheatsheet/positions.js` — the `POS` array of 38 `{x, y, r}` physical
  coordinates, **same index order** as the keymap's position diagram. Don't
  touch this file unless the physical key layout itself changed.
- `cheatsheet/layout.js` — icons (`I`), modifier glyphs (`MOD`), layer
  accent colors (`LAYER_COLORS`), and the `KEYS` array this skill rebuilds.
  Only `KEYS` should change; `I`/`MOD`/`LAYER_COLORS` are edited only when a
  new keycode needs a new icon or a new modifier appears.
- `cheatsheet/app.js` — renders `KEYS` against `POS`; no changes needed here.

## Procedure

### 1. Parse the keymap deterministically

Don't hand-parse the devicetree syntax — string-splitting `bindings = <...>`
by eye is exactly how position-off-by-one and layer-number mistakes happen.
Run the bundled parser instead:

```
python3 .claude/skills/cheatsheet-sync/scripts/parse_keymap.py config/totem.keymap
```

It returns JSON with:
- `layer_numbers`: the `#define Base 0` / `#define Nav 1` / ... map. Layers
  are sometimes referenced by raw number instead of name (e.g. `&lt 4 SPACE`,
  `&lt 3 MINUS`) — always resolve through this map, never assume the number
  matches what you'd guess from context. This is the single most error-prone
  step: mixing up `&lt 4 SPACE` (→ Czech) and `&lt 3 MINUS` (→ Fun) is an easy
  mistake and has happened in this file before.
- `layers`: for each layer name, an array of exactly 38 tokens, position-
  ordered (index *i* = physical key *i* = `POS[i]` = the diagram position).
  Each token is the binding with the leading `&` stripped, e.g. `"kp Q"`,
  `"hm LCTRL A"`, `"lt Fun ESCAPE"`, `"lt 4 SPACE"`, `"trans"`, `"cs_ec"`.
- `warnings`: non-empty if any layer didn't parse to exactly 38 tokens — if
  so, stop and re-check the keymap structure by hand before trusting the
  output; something about the file changed that the parser doesn't expect
  (e.g. a layer gained/lost a key, or a brace-matching edge case).

### 2. Build one KEYS entry per position (0–37)

For each index `i`, look at `layers.Base[i]` plus the same index in
`Nav`/`Sym`/`Fun`/`Czech`:

- **base**: the display form of the Base-layer token (see the conversion
  reference below). If the token is `hm MOD KEY`, the base label comes from
  `KEY` and `mod` is set to `MOD`. If it's `lt LAYER_OR_NUM KEY` or
  `mt MOD KEY`, the base label comes from `KEY` too; for `lt`, additionally
  resolve `LAYER_OR_NUM` (via `layer_numbers` if it's a raw digit) and set
  `layerSwitch` to that layer's name.
- **mod**: only set from a Base-layer `hm`. Homerow mods hold on every layer,
  so it's shown once on the key, not repeated per overlay.
- **layerSwitch**: only set from a Base-layer `lt`. Must be one of
  `Nav`/`Sym`/`Fun`/`Czech` (matches a key in `LAYER_COLORS`).
- **tapHint**: a short human name, used for thumb-row keys (index ≥ 32) and
  any alpha-row key whose base is an icon rather than a letter (Esc). Keep it
  to what's already used: Del, Tab, Space, Enter, Bksp, Esc. Plain letter/
  punctuation keys don't need a tapHint.
  keys don't need a tapHint.
- **overlays**: for `Nav`, `Sym`, `Fun`, `Czech` in turn, if `layers.<L>[i]`
  is `"trans"`, omit that layer from `overlays` entirely (transparent = falls
  through to the layer below, nothing new to show). Otherwise convert the
  token to a display value with the same reference table and add it,
  keyed by layer name (`Nav`/`Sym`/`Fun`/`Czech` — `app.js` lowercases the
  key for the CSS class and orders them Nav, Sym, Czech, Fun on screen).

A hold-tap like `csdc_ht LCTRL 0` (tap-preferred: hold produces the first
parameter as a modifier, tap runs the wrapped custom behavior) only matters
for its *tap* output on the cheatsheet — these appear on the `Czech` layer
tapped standalone, so just resolve the behavior name (`csdc_ht` → wraps
`cs_dc` → ď, per `czech_macos.dtsi`) and ignore the hold parameter.

### 3. Resolve tokens to display values

Read `references/keycode-map.md` for the full conversion table (letters,
punctuation, icons already defined in `I`, and every custom Czech behavior
mapped to its output character per `czech_macos.dtsi`'s comments). It covers
every token currently in the keymap.

If you hit a keycode that isn't in the table (a new key was added to the
keymap since this was written):
- Prefer reusing an existing icon from `I` in `cheatsheet/layout.js` if the
  new keycode is conceptually the same family (e.g. another media key).
- Otherwise add a short glyph or 2–4 character abbreviation consistent with
  the existing style (single symbols for punctuation/arrows, `F11`-style
  short text for anything without a natural symbol). If it's genuinely
  icon-worthy (a new named function key, not just a letter), add a new inline
  SVG to `I` in `layout.js` matching the existing icons' style (24×24
  viewBox, `currentColor` fill/stroke) rather than leaving it as bare text.
- Call out explicitly in your summary to the user which keycodes were new
  and what you chose, so they can correct it if wrong — don't silently guess
  and move on.

### 4. Write the result

Replace only the `KEYS` array in `cheatsheet/layout.js` (keep `I`, `MOD`,
`LAYER_COLORS`, and the surrounding comments intact unless step 3 added a new
icon). Preserve the existing formatting style: one object literal per line,
grouped by row with the same `// N–M row label` comments already there.

### 5. Verify

- `node --check cheatsheet/layout.js` — catches syntax mistakes.
- Diff the new `KEYS` array against the previous one (`git diff
  cheatsheet/layout.js`) and read through it yourself before reporting done.
  Pay special attention to any position where `layerSwitch` or `mod` changed
  — those come from a single token each and a mistake there is more visible
  wrong (a whole layer's worth of overlays hanging off the wrong key) than a
  wrong overlay character.
- Summarize what changed for the user in plain terms (e.g. "the Space thumb
  key now correctly shows it holds to Czech, not the last thumb key" or
  "added the Caps overlay on Z that was added to the keymap in a recent
  commit but never made it into the cheatsheet") rather than just saying
  "done" — the whole point of this skill is catching drift, so the drift
  found is the interesting part of the result.
