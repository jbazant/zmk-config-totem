# Keycode → cheatsheet display conversion

Reference table for turning a parsed binding token (from `parse_keymap.py`)
into the value that goes in a `cheatsheet/layout.js` `KEYS` entry (a plain
character/string, or an `I.xxx` icon reference). Organized by category. If a
token isn't listed here, see the "unknown keycodes" note at the end of
`SKILL.md` step 3.

Hold-tap behaviors (`hm`, `mt`, `lt`) aren't display tokens themselves —
resolve them to their tap-side key first (see SKILL.md step 2), then look
that key up here.

## Letters and digits

`kp Q`..`kp Z` → the literal uppercase letter. `kp N0` → `"0"`, `kp NUMBER_1`
through `kp NUMBER_9` → `"1"`.."9"`.

## Punctuation

| token | display |
|---|---|
| COMMA | `,` |
| DOT | `.` |
| SLASH | `/` |
| SEMICOLON | `;` |
| APOSTROPHE, SQT | `'` |
| DQT | `"` |
| GRAVE | `` ` `` |
| BACKSLASH | `\` |
| LBRC / RBRC | `{` / `}` |
| LBKT / RBKT | `[` / `]` |
| LPAR / RPAR | `(` / `)` |
| TILDE | `~` |
| UNDER | `_` |
| MINUS | `−` (U+2212 minus sign, not a hyphen — matches the rest of the file) |
| PLUS | `+` |
| EQUAL | `=` |
| EXCL | `!` |
| AT | `@` |
| HASH | `#` |
| DOLLAR | `$` |
| PERCENT | `%` |
| CARET | `^` |
| AMPERSAND | `&` |
| KP_ASTERISK | `*` |
| KP_DIVIDE | `÷` |
| KP_MULTIPLY | `×` |

## Editing / navigation icons (already defined in `I`)

| token | icon | tapHint (thumb/alpha keys only) |
|---|---|---|
| HOME | `I.home` | |
| UP_ARROW | `I.up` | |
| DOWN | `I.dn` | |
| LEFT | `I.left` | |
| RIGHT | `I.right` | |
| END | `I.end` | |
| PG_UP | `I.pgup` | |
| PAGE_DOWN | `I.pgdn` | |
| ESCAPE | `I.esc` | `Esc` |
| DEL | `I.del` | `Del` |
| TAB | `I.tab` | `Tab` |
| SPACE | `I.spc` | `Space` |
| RET | `I.ret` | `Enter` |
| BSPC | `I.bspc` | `Bksp` |

## Media / system icons (already defined in `I`)

| token | icon |
|---|---|
| C_MUTE | `I.mute` |
| C_VOL_DN | `I.volDn` |
| C_VOL_UP | `I.volUp` |
| C_BRI_DEC | `I.briDn` |
| C_BRI_INC | `I.briUp` |
| C_PREV | `I.prev` |
| C_PP | `I.play` |
| C_NEXT | `I.next` |
| C_AL_COFFEE | `I.coffee` |

## Function keys

`kp F1`..`kp F15` → literal text `"F1"`.."F15"`.

## macOS Option-shortcut macros (`#define` block at the top of totem.keymap)

| token | display |
|---|---|
| MAC_EURO | `€` |
| MAC_SECT | `§` |
| MAC_DEG | `°` |
| MAC_CARON | `ˇ` |
| MAC_ACUTE | `´` |
| MAC_DIAER | `¨` |

## Custom Czech/diacritic behaviors (defined in `czech_macos.dtsi`)

The output character is documented in a `//` comment next to each
`CS_DK_PAIR(...)` definition in that file — this table is just that comment,
collected. If `czech_macos.dtsi` changes, re-read it rather than trusting
this copy.

| token | output | token | output |
|---|---|---|---|
| cs_aa | á | cs_nc | ň |
| cs_ea | é | cs_rc | ř |
| cs_ia | í | cs_sc | š |
| cs_oa | ó | cs_tc | ť |
| cs_ua | ú | cs_zc | ž |
| cs_ya | ý | l_caron | ľ (combo only) |
| l_acute | ĺ (combo only) | cs_ur | ů |
| r_acute | ŕ (combo only) | a_dia | ä (combo only) |
| cs_cc | č | o_dia | ö (combo only) |
| cs_dc | ď | u_dia | ü (combo only) |
| cs_ec | ě | o_circ | ô |
| | | sharp_s | ß |

The `*_ht` hold-tap wrappers (`csdc_ht`, `csur_ht`, `csnc_ht`) only appear
tapped standalone on the `Czech` layer; their tap side wraps the plain
behavior of the same root name — `csdc_ht MOD 0` → `cs_dc` → ď, `csur_ht MOD
0` → `cs_ur` → ů, `csnc_ht MOD 0` → `cs_nc` → ň. Ignore the hold parameter
and the always-`0` dummy tap parameter.

## Modifiers (already defined in `MOD`)

`LCTRL`/`RCTRL` → `⌃`, `LALT`/`RALT` → `⌥`, `LGUI`/`RGUI` → `⌘`,
`LSHIFT`/`LSHFT`/`RSHFT` → `⇧`. These come from the hold side of an `hm`
binding and are shown once via the key's `mod` field, not repeated per
overlay.

## Behaviors with no `kp`-style output

- `trans` — transparent, falls through to the layer below. Omit this
  position from that layer's `overlays` entirely; don't render anything.
- `caps_word` — toggles Caps Word. No icon exists for it yet; render as
  short text `"Caps"` (same size/weight as the `F11`-style text overlays).
