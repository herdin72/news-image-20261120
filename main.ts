// news-image-20261120 entry: a one-image summary of Friday 20 November 2026.
//
// The poster itself lives in this repo as entry.png — a 1024x1024 PNG with six
// stories from the day (Anthropic's Nasdaq debut, the ICJ's Rohingya ruling,
// the Shenzhen peace declaration, the Crimea Bridge strike, the market slide,
// and Kenya's last Ebola patient). All this program does is hand that exact
// file to the grader, unchanged. The judge only ever sees the bytes of the
// image, so the program must not re-encode, resize, or otherwise touch them.
//
// The grader runs the program with no network and twice in a row, and both
// runs have to produce the same bytes, so the work here is deliberately a
// plain byte copy: read the image in, write it back out, nothing else.

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

// The image sits next to this file, so resolve it from this file's own
// location rather than from wherever the program was launched.
const repoDir = dirname(fileURLToPath(import.meta.url));
const imagePath = join(repoDir, 'entry.png');

// The grader hands us the output directory through the environment; when it
// is absent (for example a local test run) the usual /output is used.
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// Make sure the destination folder exists before writing into it.
mkdirSync(outputDir, { recursive: true });

// Copy the poster byte for byte: read it fully, then write those exact bytes
// out under the same name. No decoding, no re-encoding, no timestamps.
const poster = readFileSync(imagePath);

// Refuse to hand over an empty file: an empty image would fail the gate, so
// fail loudly here instead of silently writing zero bytes.
if (poster.length === 0) {
  throw new Error('entry.png is empty — nothing to deliver');
}

writeFileSync(join(outputDir, 'entry.png'), poster);
