import { execSync } from "child_process";
import fs from "fs";
import path from "path";

// ---------------------------------------------------------------------------
// Clip definitions — ground truth metadata for all 8 test clips
// ---------------------------------------------------------------------------
const clips = [
  {
    id: "colin-hill",
    name: "colin hill",
    path: String.raw`C:\Users\rigge\OneDrive\Videos\Enduro ai coach test clips\colin hill.mp4`,
    camera: "3rd-person",
    scenario: "Hill climb, rocky",
    outcome: "Bail midway",
    bodyPosition: "Seated entire time",
    keyTest: "Body position accuracy",
  },
  {
    id: "clutch-scream-hill",
    name: "clutch scream hill",
    path: String.raw`C:\Users\rigge\OneDrive\Videos\Enduro ai coach test clips\clutch scream hill.mp4`,
    camera: "POV",
    scenario: "Hill climb, leafy forest",
    outcome: "Wrong turn, hits tree, falls",
    bodyPosition: "N/A (POV)",
    keyTest: "Audio clutch abuse detection",
  },
  {
    id: "fall-bulgario",
    name: "Fall bulgario muddy hill 1",
    path: String.raw`C:\Users\rigge\OneDrive\Videos\Enduro ai coach test clips\Fall bulgario muddy hill 1.mp4`,
    camera: "POV",
    scenario: "Muddy hill climb",
    outcome: "Falls near top, momentum loss",
    bodyPosition: "N/A (POV)",
    keyTest: "Momentum/crash detection",
  },
  {
    id: "jimbo-crash",
    name: "jimbo crash",
    path: String.raw`C:\Users\rigge\OneDrive\Videos\Enduro ai coach test clips\jimbo crash.mp4`,
    camera: "POV",
    scenario: "Descent through trees",
    outcome: "Hits tree, headlight impact",
    bodyPosition: "N/A (POV)",
    keyTest: "Impact detection, low quality",
  },
  {
    id: "long-hill",
    name: "long hill",
    path: String.raw`C:\Users\rigge\OneDrive\Videos\Enduro ai coach test clips\long hill.mp4`,
    camera: "POV",
    scenario: "Long sustained hill climb",
    outcome: "Clean completion",
    bodyPosition: "N/A (POV)",
    keyTest: "Must NOT report false failures",
  },
  {
    id: "nick-crash",
    name: "nick crash",
    path: String.raw`C:\Users\rigge\OneDrive\Videos\Enduro ai coach test clips\nick crash.mp4`,
    camera: "3rd-person",
    scenario: "Jumps on open hillside",
    outcome: "Crash after jumps",
    bodyPosition: "Standing (distant)",
    keyTest: "Distant rider visibility",
  },
  {
    id: "steep-hill-bail",
    name: "steep hill bail in trees",
    path: String.raw`C:\Users\rigge\OneDrive\Videos\Enduro ai coach test clips\steep hill bail in trees.mp4`,
    camera: "POV",
    scenario: "Steep hill climb, bare forest",
    outcome: "Runs out of room, drops bike",
    bodyPosition: "N/A (POV)",
    keyTest: "Line choice failure detection",
  },
  {
    id: "mark-crash",
    name: "Mark crash",
    path: String.raw`C:\Users\rigge\OneDrive\Videos\Enduro ai coach test clips\Mark crash.mp4`,
    camera: "3rd-person",
    scenario: "Descent into jump",
    outcome: "Over-handlebars crash",
    bodyPosition: "Visible but brief (4s)",
    keyTest: "Crash detection, background music",
  },
];

// ---------------------------------------------------------------------------
// Model pipeline definitions
// ---------------------------------------------------------------------------
const models = [
  { id: "gpt4o", name: "GPT-4o", script: "scripts/test-coaching-kb.ts" },
  { id: "gemini", name: "Gemini", script: "scripts/test-coaching-gemini.ts" },
  { id: "claude", name: "Claude", script: "scripts/test-coaching-claude.ts" },
];

// ---------------------------------------------------------------------------
// Paths
// ---------------------------------------------------------------------------
const RESULTS_DIR = "scripts/phase2-results";

// ---------------------------------------------------------------------------
// Pre-flight checks
// ---------------------------------------------------------------------------

// Check all model scripts exist
const missingScripts = models.filter((m) => !fs.existsSync(m.script));
if (missingScripts.length > 0) {
  console.error("ERROR: The following model scripts are missing:");
  missingScripts.forEach((m) => console.error(`  - ${m.script}`));
  process.exit(1);
}

// ---------------------------------------------------------------------------
// Create output directory structure
// ---------------------------------------------------------------------------
fs.mkdirSync(RESULTS_DIR, { recursive: true });
clips.forEach((clip) => {
  fs.mkdirSync(path.join(RESULTS_DIR, clip.id), { recursive: true });
});

// ---------------------------------------------------------------------------
// Save ground truth reference file
// ---------------------------------------------------------------------------
fs.writeFileSync(
  path.join(RESULTS_DIR, "ground-truth.json"),
  JSON.stringify(clips, null, 2)
);

// ---------------------------------------------------------------------------
// Save blank scoring template
// ---------------------------------------------------------------------------
const scoringTemplate = `=== RIDEMIND PHASE 2 — SCORING TEMPLATE ===

Clip:
Model:
Runtime:

--- PROFILE A: 3rd-Person Clip ---
(use only if camera = 3rd-person)

A1. Body Position Accuracy (0-5):
A2. Scenario Classification Accuracy (0-5):
A3. Outcome Detection Accuracy (0-5):
A4. Rider Visibility Handling (0-5):
A5. Coaching Quality (0-5):

Perception Average (A1+A2+A3 / 3):
Coaching Capped (max 2 if perception avg < 2.5):

--- PROFILE B: POV Clip ---
(use only if camera = POV)

B1. Audio Analysis Quality (0-5):
B2. Scenario Classification Accuracy (0-5):
B3. Outcome Detection Accuracy (0-5):
B4. Terrain & Line Reading (0-5):
B5. POV Awareness (0-5):
B6. Coaching Quality (0-5):

Perception Average (B1+B2+B3 / 3):
Coaching Capped (max 2 if perception avg < 2.5):

--- Secondary Metrics ---
Hallucination Rate: [ None / Low / Medium / High ]
Confidence Calibration: [ Well-calibrated / Over-confident / Under-confident / None expressed ]
Chronological Accuracy: [ Accurate / Mostly accurate / Confused / N/A ]
Specificity: [ Specific / Mixed / Generic ]
Observation Consistency: [ Consistent / Minor contradiction / Major contradiction ]

--- Failure Tags (tick all that apply) ---
[ ] WRONG_BODY_POSITION
[ ] MISSED_CRASH
[ ] FALSE_FAIL
[ ] WRONG_SCENARIO
[ ] HALLUCINATED_DETAIL
[ ] IGNORED_AUDIO
[ ] POV_CONFUSION
[ ] GENERIC_COACHING

--- Verdict ---
Verdict: [ PASS / MARGINAL / FAIL ]
Production Usability: [ Yes / With caveats / No ]

Notes:
`;

fs.writeFileSync(path.join(RESULTS_DIR, "scoring-template.txt"), scoringTemplate);

// ---------------------------------------------------------------------------
// Batch run
// ---------------------------------------------------------------------------
const totalRuns = clips.length * models.length;
let runIndex = 0;
let successCount = 0;

interface FailedRun {
  clip: string;
  model: string;
  error: string;
}
const failedRuns: FailedRun[] = [];

// runtimes[modelId] = array of seconds for each completed run
const runtimes: Record<string, number[]> = {};
models.forEach((m) => (runtimes[m.id] = []));

// Track output files for summary
const outputFiles: string[] = [];

console.log(`\n=== RIDEMIND PHASE 2 — BATCH RUNNER ===`);
console.log(`Clips: ${clips.length}  |  Models: ${models.length}  |  Total runs: ${totalRuns}`);
console.log(`Results: ${RESULTS_DIR}\n`);

for (const clip of clips) {
  // Check video file exists before running any models for this clip
  if (!fs.existsSync(clip.path)) {
    console.warn(`WARNING: Video file not found, skipping all models for "${clip.name}"`);
    console.warn(`  Path: ${clip.path}`);
    models.forEach(() => {
      runIndex++;
      failedRuns.push({
        clip: clip.name,
        model: "ALL",
        error: `Video file not found: ${clip.path}`,
      });
    });
    continue;
  }

  for (const model of models) {
    runIndex++;
    const outputFile = path.join(RESULTS_DIR, clip.id, `${model.id}.txt`);
    outputFiles.push(outputFile);

    // Resume: skip if output file already exists and has real content (not just an error stub)
    if (fs.existsSync(outputFile) && fs.statSync(outputFile).size > 500) {
      console.log(`[${runIndex}/${totalRuns}] Skipping: ${clip.name} × ${model.name} (already completed)`);
      successCount++;
      continue;
    }

    // For Gemini runs, use the optimized file if one exists (e.g. "clip_gemini.mp4")
    let clipPath = clip.path;
    const geminiPath = clip.path.replace(/\.mp4$/i, "_gemini.mp4");
    if (model.id === "gemini" && fs.existsSync(geminiPath)) {
      clipPath = geminiPath;
      process.stdout.write(`[${runIndex}/${totalRuns}] Running: ${clip.name} × ${model.name} (using optimized version)... `);
    } else {
      process.stdout.write(`[${runIndex}/${totalRuns}] Running: ${clip.name} × ${model.name}... `);
    }

    const startTime = Date.now();

    // Ground truth header written to each output file
    const header = [
      `=== GROUND TRUTH ===`,
      `Clip: ${clip.name}`,
      `Camera: ${clip.camera}`,
      `Expected Scenario: ${clip.scenario}`,
      `Expected Outcome: ${clip.outcome}`,
      `Expected Body Position: ${clip.bodyPosition}`,
      `Key Test: ${clip.keyTest}`,
    ].join("\n");

    try {
      const stdout = execSync(`npx tsx ${model.script} "${clipPath}"`, {
        timeout: 600000, // 10 minutes
        maxBuffer: 10 * 1024 * 1024, // 10 MB
      }).toString();

      const runtimeSeconds = ((Date.now() - startTime) / 1000).toFixed(1);
      runtimes[model.id].push(parseFloat(runtimeSeconds));

      const fileContent = [
        header,
        `Runtime: ${runtimeSeconds}s`,
        `=== MODEL OUTPUT (${model.name}) ===`,
        stdout,
      ].join("\n");

      fs.writeFileSync(outputFile, fileContent);
      successCount++;
      console.log(`(completed in ${runtimeSeconds}s)`);
    } catch (err: unknown) {
      const runtimeSeconds = ((Date.now() - startTime) / 1000).toFixed(1);
      const errorMessage =
        err instanceof Error ? err.message : String(err);

      const fileContent = [
        header,
        `Runtime: ${runtimeSeconds}s (FAILED)`,
        `=== MODEL OUTPUT (${model.name}) ===`,
        `ERROR: Run failed`,
        errorMessage,
      ].join("\n");

      fs.writeFileSync(outputFile, fileContent);
      failedRuns.push({ clip: clip.name, model: model.name, error: errorMessage.split("\n")[0] });
      console.log(`(FAILED after ${runtimeSeconds}s) — continuing batch`);
    }
  }
}

// ---------------------------------------------------------------------------
// Generate run summary
// ---------------------------------------------------------------------------
const completedAt = new Date().toISOString();

const avgRuntimeLines = models.map((m) => {
  const times = runtimes[m.id];
  if (times.length === 0) return `  ${m.name}: no successful runs`;
  const avg = (times.reduce((a, b) => a + b, 0) / times.length).toFixed(1);
  return `  ${m.name}: ${avg}s average (${times.length} runs)`;
});

const failedLines =
  failedRuns.length === 0
    ? ["  None"]
    : failedRuns.map((f) => `  ${f.clip} × ${f.model}: ${f.error}`);

const summaryLines = [
  `=== RIDEMIND PHASE 2 — RUN SUMMARY ===`,
  `Completed at: ${completedAt}`,
  ``,
  `Total runs attempted: ${totalRuns}`,
  `Successful runs:      ${successCount}`,
  `Failed runs:          ${failedRuns.length}`,
  ``,
  `--- Average Runtime Per Model ---`,
  ...avgRuntimeLines,
  ``,
  `--- Failed Runs ---`,
  ...failedLines,
  ``,
  `--- Output Files Generated ---`,
  ...outputFiles.map((f) => `  ${f}`),
];

fs.writeFileSync(path.join(RESULTS_DIR, "run-summary.txt"), summaryLines.join("\n"));

// ---------------------------------------------------------------------------
// Generate scoring CSVs
// ---------------------------------------------------------------------------

// Helper: escape a value for CSV (handles commas, quotes, newlines)
function csvCell(value: string | number): string {
  const str = String(value);
  if (str.includes(",") || str.includes('"') || str.includes("\n")) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

function csvRow(values: (string | number)[]): string {
  return values.map(csvCell).join(",");
}

// 3rd-person clips
const thirdPersonClips = clips.filter((c) => c.camera === "3rd-person");
const thirdPersonHeader =
  "# perception_avg = avg(body_position + scenario + outcome). coaching_capped = coaching score but max 2 if perception_avg < 2.5";
const thirdPersonColumns = [
  "clip_id", "clip_name", "model", "runtime_seconds",
  "body_position", "scenario", "outcome", "rider_visibility",
  "perception_avg", "coaching", "coaching_capped",
  "hallucination", "confidence", "chronology", "specificity", "consistency",
  "failure_tags", "verdict", "production_usability", "notes",
];

const thirdPersonRows: string[] = [
  thirdPersonHeader,
  csvRow(thirdPersonColumns),
];

for (const clip of thirdPersonClips) {
  for (const model of models) {
    // Read runtime from output file if it exists
    let runtime = "";
    const outputFile = path.join(RESULTS_DIR, clip.id, `${model.id}.txt`);
    if (fs.existsSync(outputFile)) {
      const match = fs.readFileSync(outputFile, "utf8").match(/Runtime: ([\d.]+)s/);
      if (match) runtime = match[1];
    }
    thirdPersonRows.push(
      csvRow([clip.id, clip.name, model.name, runtime, "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""])
    );
  }
}

fs.writeFileSync(
  path.join(RESULTS_DIR, "scoring-3rd-person.csv"),
  thirdPersonRows.join("\n")
);

// POV clips
const povClips = clips.filter((c) => c.camera === "POV");
const povHeader =
  "# perception_avg = avg(audio_quality + scenario + outcome). coaching_capped = coaching score but max 2 if perception_avg < 2.5";
const povColumns = [
  "clip_id", "clip_name", "model", "runtime_seconds",
  "audio_quality", "scenario", "outcome", "terrain_line", "pov_awareness",
  "perception_avg", "coaching", "coaching_capped",
  "hallucination", "confidence", "chronology", "specificity", "consistency",
  "failure_tags", "verdict", "production_usability", "notes",
];

const povRows: string[] = [
  povHeader,
  csvRow(povColumns),
];

for (const clip of povClips) {
  for (const model of models) {
    let runtime = "";
    const outputFile = path.join(RESULTS_DIR, clip.id, `${model.id}.txt`);
    if (fs.existsSync(outputFile)) {
      const match = fs.readFileSync(outputFile, "utf8").match(/Runtime: ([\d.]+)s/);
      if (match) runtime = match[1];
    }
    povRows.push(
      csvRow([clip.id, clip.name, model.name, runtime, "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""])
    );
  }
}

fs.writeFileSync(
  path.join(RESULTS_DIR, "scoring-pov.csv"),
  povRows.join("\n")
);

// ---------------------------------------------------------------------------
// Final console summary
// ---------------------------------------------------------------------------
console.log("\n=== PHASE 2 BATCH COMPLETE ===");
console.log(`Successful: ${successCount}/${totalRuns}`);
if (failedRuns.length > 0) {
  console.log(`Failed: ${failedRuns.length} run(s) — see run-summary.txt for details`);
}
console.log("Results saved to: scripts/phase2-results/");
console.log("Next step: Review each output file and fill in the scoring CSVs");
