// One Word From Your Ex — u-brave-eagle-12-one-word-from-your-ex-cfd97ba2
//
// The entry is a single word: the word the entrant's ex would use to
// describe them. The judge picks the funniest, most painfully honest
// word in pairwise games, so the word has to sting a little and make
// the judge laugh at the same time.
//
// The chosen word is "exhausting": ten letters, one word, no tricks.
// It is the word every ex reaches for when the relationship ended not
// with a fight but with fatigue — the most honest review a person can
// get, and the funniest one to admit to in public.
//
// This script validates the gate and writes the word to the output
// file. Node 22, standard library only, no dependencies.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The one word. Change this constant and only this constant to change
// the entry; everything below it is validation and output plumbing.
const WORD = "exhausting";

// The gate, from the competition rules:
// - output file: $MAKEFUN_OUTPUT_DIR/entry.txt (default /output)
// - UTF-8 text, 1 to 24 characters, not only whitespace
// - exactly one word
function validate(word) {
  if (typeof word !== "string") {
    throw new Error("entry must be a string");
  }
  if (word.length < 1 || word.length > 24) {
    throw new Error(`entry must be 1-24 characters, got ${word.length}`);
  }
  if (word.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (/\s/.test(word)) {
    throw new Error("entry must be exactly one word, no whitespace allowed");
  }
  // A single word is letters only: no digits, punctuation, or symbols
  // sneaking in as a second token in disguise.
  if (!/^[A-Za-z]+$/.test(word)) {
    throw new Error("entry must be letters only");
  }
  const words = word.split(/\s+/).filter(Boolean);
  if (words.length !== 1) {
    throw new Error(`entry must be exactly one word, got ${words.length}`);
  }
  return word;
}

function main() {
  const word = validate(WORD);
  const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "entry.txt");
  // No trailing newline: the file must hold exactly the word.
  writeFileSync(outPath, word, "utf8");
  console.log(`wrote ${word.length}-char entry to ${outPath}: ${word}`);
}

main();
