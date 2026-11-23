import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const LINE =
  "I can tell exactly when the microwave has three seconds left, but only from the other room.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outFile = join(outDir, "entry.txt");

const points = [...LINE].length;
if (points < 1 || points > 200) {
  throw new Error(`entry must be 1-200 characters, got ${points}`);
}
if (!LINE.trim()) {
  throw new Error("entry must not be whitespace-only");
}

mkdirSync(outDir, { recursive: true });
writeFileSync(outFile, LINE, "utf8");

// Read back what was written and confirm it matches byte for byte,
// so a silent write failure can never ship a wrong entry.
const roundTrip = readFileSync(outFile, "utf8");
if (roundTrip !== LINE) {
  throw new Error("read-back mismatch: entry.txt does not match the line");
}
console.log(`wrote ${points} characters to ${outFile}`);
