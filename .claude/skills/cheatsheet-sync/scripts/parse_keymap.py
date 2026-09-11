#!/usr/bin/env python3
"""Extract per-position binding tokens from a ZMK .keymap file.

Deterministically parses the `#define` layer-number constants and every
layer's `bindings = < ... >;` block inside the `keymap { ... }` node, so an
LLM doesn't have to hand-parse devicetree syntax (error-prone, especially
resolving raw layer numbers used by `&lt <N> KEY` instead of the macro name).

Usage:
    python3 parse_keymap.py path/to/totem.keymap

Prints JSON:
{
  "layer_numbers": {"Base": 0, "Nav": 1, ...},   // from #define NAME N
  "layers": {
    "Base": ["kp Q", "kp W", ..., "lt 3 MINUS"],  // 38 tokens, position-ordered
    "Nav": [...],
    ...
  },
  "expected_positions": 38,
  "warnings": ["Layer 'Foo' has 37 tokens, expected 38", ...]
}

Each token is the binding with the leading '&' stripped and whitespace
collapsed, e.g. "kp Q", "hm LCTRL A", "lt Fun ESCAPE", "lt 4 SPACE", "trans",
"mt LGUI DEL", "cs_ec", "csdc_ht LCTRL 0".
"""
import json
import re
import sys


def strip_comments(text):
    text = re.sub(r"//.*", "", text)
    text = re.sub(r"/\*.*?\*/", "", text, flags=re.DOTALL)
    return text


def extract_braced_block(text, start_idx):
    """Given text[start_idx] == '{', return the substring up to (and
    including) its matching '}'."""
    depth = 0
    for i in range(start_idx, len(text)):
        if text[i] == "{":
            depth += 1
        elif text[i] == "}":
            depth -= 1
            if depth == 0:
                return text[start_idx : i + 1]
    raise ValueError("Unbalanced braces starting at %d" % start_idx)


def find_layer_defines(raw_text):
    """#define Base 0 / #define Nav 1 / ... -> {"Base": 0, "Nav": 1}"""
    out = {}
    for m in re.finditer(r"^\s*#define\s+(\w+)\s+(\d+)\s*$", raw_text, re.MULTILINE):
        out[m.group(1)] = int(m.group(2))
    return out


def find_keymap_block(text):
    m = re.search(r"keymap\s*\{", text)
    if not m:
        raise ValueError("No `keymap {` block found")
    brace_start = text.index("{", m.start())
    return extract_braced_block(text, brace_start)


def find_layers(keymap_block):
    """Within the keymap { ... } block, find each `Name { ... bindings = <...>; ... };`
    child node and return {Name: bindings_string}."""
    layers = {}
    # Walk top-level identifiers followed by '{' inside the keymap block.
    for m in re.finditer(r"(\w+)\s*\{", keymap_block):
        name = m.group(1)
        if name in ("keymap",):
            continue
        brace_start = keymap_block.index("{", m.start())
        # Only treat as a layer if this brace is a direct child (heuristic:
        # skip nested matches already consumed by an outer layer scan below).
        block = extract_braced_block(keymap_block, brace_start)
        bindings_m = re.search(r"bindings\s*=\s*<(.*?)>\s*;", block, re.DOTALL)
        if not bindings_m:
            continue
        layers[name] = bindings_m.group(1)
    return layers


def tokenize_bindings(bindings_str):
    parts = bindings_str.split("&")
    tokens = []
    for p in parts:
        p = " ".join(p.split())  # collapse all whitespace/newlines
        if p:
            tokens.append(p)
    return tokens


def main():
    if len(sys.argv) != 2:
        print("usage: parse_keymap.py path/to/totem.keymap", file=sys.stderr)
        sys.exit(1)

    path = sys.argv[1]
    with open(path, "r", encoding="utf-8") as f:
        raw = f.read()

    text = strip_comments(raw)
    layer_numbers = find_layer_defines(raw)  # keep comments out of numbers only
    keymap_block = find_keymap_block(text)
    layers = find_layers(keymap_block)

    expected = 38
    warnings = []
    result_layers = {}
    for name, bindings_str in layers.items():
        tokens = tokenize_bindings(bindings_str)
        result_layers[name] = tokens
        if len(tokens) != expected:
            warnings.append(
                "Layer '%s' has %d tokens, expected %d" % (name, len(tokens), expected)
            )

    print(
        json.dumps(
            {
                "layer_numbers": layer_numbers,
                "layers": result_layers,
                "expected_positions": expected,
                "warnings": warnings,
            },
            indent=2,
            ensure_ascii=False,
        )
    )


if __name__ == "__main__":
    main()
