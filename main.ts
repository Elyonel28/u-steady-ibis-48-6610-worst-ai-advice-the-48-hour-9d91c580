// Worst AI Advice: The 48-Hour Tight Line Open
// One line of the worst advice an AI could give, capped at 140 characters.
// Node 22, standard library only. Writes the line to /output/entry.txt
// (or $MAKEFUN_OUTPUT_DIR/entry.txt when set).

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry: a confident, tidy "pro tip" that is genuinely terrible advice.
const LINE =
  "Pro tip: email all your passwords to yourself with the subject 'passwords' — that way they're safely backed up in the cloud.";

// The bounty gate: entry.txt must be UTF-8 text of 1 to 140 characters,
// not only white space, on a single line.
if (LINE.length < 1 || LINE.length > 140) {
  throw new Error(`line is ${LINE.length} characters, must be 1-140`);
}
if (LINE.trim().length === 0) {
  throw new Error("line must not be only white space");
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("line must be a single line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, LINE + "\n", "utf8");

// Read it back and confirm the round-trip is exact.
const back = readFileSync(outPath, "utf8");
if (back !== LINE + "\n") {
  throw new Error("entry.txt round-trip mismatch");
}
console.log(
  `wrote entry.txt (${LINE.length} chars, ${Buffer.byteLength(LINE, "utf8")} bytes)`,
);
