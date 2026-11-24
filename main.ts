// Weirdest Job Title: Blind Judge Showdown
// Writes one job title (60 chars max) to /output/entry.txt.
// The title is a real-sounding job with one hilariously specific twist:
// a loss-prevention officer — but for live crabs.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const OUT_PATH = "/output/entry.txt";
const MAX_CHARS = 60;

// The title, built from its parts so each piece of the joke is visible:
// a senior-sounding rank, a real corporate role, and an absurdly
// specific thing being protected.
const TITLE_PARTS = [
  "Senior",
  "Loss Prevention Officer",
  "for Live Crabs",
];

function buildTitle(parts: string[]): string {
  return parts.join(" ");
}

function validateTitle(title: string): void {
  if (title.length < 1 || title.length > MAX_CHARS) {
    throw new Error(`Title must be 1-${MAX_CHARS} characters, got ${title.length}`);
  }
  if (title.trim().length === 0) {
    throw new Error("Title must not be only white space");
  }
}

function writeEntry(title: string): void {
  mkdirSync("/output", { recursive: true });
  // No trailing newline: the file holds exactly the title, byte for byte.
  writeFileSync(OUT_PATH, title, "utf8");
  // Read it back and confirm what landed on disk matches exactly.
  const onDisk = readFileSync(OUT_PATH, "utf8");
  if (onDisk !== title) {
    throw new Error(`Mismatch: disk holds ${JSON.stringify(onDisk)}`);
  }
  console.log(`Wrote ${title.length} characters to ${OUT_PATH}`);
}

function main(): void {
  const title = buildTitle(TITLE_PARTS);
  validateTitle(title);
  writeEntry(title);
}

main();
