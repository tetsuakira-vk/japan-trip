#!/usr/bin/env python3
"""Generates PWA icons (icon-192.png, icon-512.png) for map/ and recorder/
as plain RGBA PNGs, written by hand via zlib — no Pillow/ImageMagick
available, and a personal offline app doesn't need real artwork, just a
valid installable icon: the app's dark background with a simple mark.
"""
import os
import struct
import zlib

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)

BG = (0x16, 0x14, 0x28, 255)   # --ink
FG = (0xFF, 0xFF, 0xFF, 255)
REC = (0xE5, 0x39, 0x35, 255)  # record-red accent, for the recorder icon


def png_chunk(tag, data):
    return struct.pack(">I", len(data)) + tag + data + struct.pack(">I", zlib.crc32(tag + data))


def pin_mask(size, x, y):
    # Simple filled teardrop-ish pin: a circle plus a triangular point below it,
    # both defined in normalized [0,1] coords scaled to `size`.
    cx, cy, r = size * 0.5, size * 0.38, size * 0.24
    u, v = (x - cx) / r, (y - cy) / r
    if u * u + v * v <= 1.0:
        return True
    # tapering point beneath the circle
    if y > cy and y < size * 0.82:
        t = (y - cy) / (size * 0.82 - cy)  # 0 at circle bottom, 1 at tip
        half_w = r * (1 - t) * 0.9
        if abs(x - cx) <= half_w:
            return True
    return False


def record_dot_mask(size, x, y):
    # A plain filled record-button dot, centred.
    cx, cy, r = size * 0.5, size * 0.5, size * 0.32
    u, v = (x - cx) / r, (y - cy) / r
    return u * u + v * v <= 1.0


def make_icon(path, size, mask_fn, fg=FG, bg=BG):
    rows = []
    for y in range(size):
        row = bytearray([0])  # filter type 0 (none)
        for x in range(size):
            px = fg if mask_fn(size, x, y) else bg
            row += bytes(px)
        rows.append(bytes(row))
    raw = b"".join(rows)

    sig = b"\x89PNG\r\n\x1a\n"
    ihdr = struct.pack(">IIBBBBB", size, size, 8, 6, 0, 0, 0)  # 8-bit RGBA
    idat = zlib.compress(raw, 9)
    with open(path, "wb") as f:
        f.write(sig)
        f.write(png_chunk(b"IHDR", ihdr))
        f.write(png_chunk(b"IDAT", idat))
        f.write(png_chunk(b"IEND", b""))


def main():
    targets = [
        (os.path.join(ROOT, "map"), pin_mask, FG),
        (os.path.join(ROOT, "recorder"), record_dot_mask, REC),
    ]
    for out_dir, mask_fn, fg in targets:
        for size in (192, 512):
            out = os.path.join(out_dir, f"icon-{size}.png")
            make_icon(out, size, mask_fn, fg=fg)
            print(f"wrote {out}")


if __name__ == "__main__":
    main()
