// lib/benchmark/benchmarkHarness.ts
//
// TypeScript benchmark harness scaffold for validating saved coaching outputs.
//
// Expected test case files in directoryPath:
//   - {name}.json
//   - {name}.context.json
//   - {name}.review.md   (optional)
//
// Imports:
//   - validate(output) from validation module
//   - evaluateSafety(contextPack, coachingOutput) from safety module

import * as fs from "node:fs";
import * as path from "node:path";

import { validate } from "../validation/outputValidator";
import { evaluateSafety } from "../safety/enduroSafetyRules";

type ValidatorResult = {
  valid: boolean;
  errors: string[];
};

type SafetyResult = {
  safe: boolean;
  violations: string[];
};

type ClipResult = {
  clip_name: string;
  files: {
    output: string;
    context: string;
    review: string | null;
  };
  review_notes: string | null;
  validator: {
    pass: boolean;
    errors: string[];
  };
  safety: {
    pass: boolean;
    violations: string[];
  };
  overall: {
    pass: boolean;
  };
};

type BenchmarkSummary = {
  total_clips: number;
  total_pass: number;
  total_fail: number;
  failures_by_clip: Record<string, string[]>;
};

type BenchmarkResult = {
  summary: BenchmarkSummary;
  results: ClipResult[];
};

export function runBenchmark(directoryPath: string): BenchmarkResult {
  const results: ClipResult[] = [];
  const failuresByClip: Record<string, string[]> = {};

  if (!directoryPath || typeof directoryPath !== "string") {
    throw new Error("directoryPath is required and must be a string");
  }

  if (!fs.existsSync(directoryPath)) {
    throw new Error(`Directory does not exist: ${directoryPath}`);
  }

  const stat = fs.statSync(directoryPath);
  if (!stat.isDirectory()) {
    throw new Error(`Path is not a directory: ${directoryPath}`);
  }

  const files: string[] = fs.readdirSync(directoryPath);
  const jsonFiles: string[] = files.filter(
    (file: string) => file.endsWith(".json") && !file.endsWith(".context.json")
  );

  jsonFiles.forEach((jsonFile: string) => {
    const clipName: string = path.basename(jsonFile, ".json");
    const outputPath: string = path.join(directoryPath, jsonFile);
    const contextPath: string = path.join(directoryPath, `${clipName}.context.json`);
    const reviewPath: string = path.join(directoryPath, `${clipName}.review.md`);

    const clipFailures: string[] = [];

    let output: unknown = null;
    let contextPack: unknown = null;
    let reviewNotes: string | null = null;

    // Load output JSON
    try {
      output = readJsonFile(outputPath);
    } catch (error) {
      clipFailures.push(`Failed to load output JSON: ${getErrorMessage(error)}`);
    }

    // Load context JSON
    try {
      if (fs.existsSync(contextPath)) {
        contextPack = readJsonFile(contextPath);
      } else {
        clipFailures.push(`Missing context file: ${path.basename(contextPath)}`);
      }
    } catch (error) {
      clipFailures.push(`Failed to load context JSON: ${getErrorMessage(error)}`);
    }

    // Load review notes if present
    try {
      if (fs.existsSync(reviewPath)) {
        reviewNotes = fs.readFileSync(reviewPath, "utf8");
      }
    } catch (error) {
      clipFailures.push(`Failed to load review notes: ${getErrorMessage(error)}`);
    }

    let validatorResult: ValidatorResult = {
      valid: false,
      errors: []
    };

    let safetyResult: SafetyResult = {
      safe: false,
      violations: []
    };

    // Run validator
    if (output) {
      try {
        validatorResult = validate(output as Parameters<typeof validate>[0]) as ValidatorResult;
      } catch (error) {
        validatorResult = {
          valid: false,
          errors: [`Validator crashed: ${getErrorMessage(error)}`]
        };
      }
    } else {
      validatorResult = {
        valid: false,
        errors: ["Validator skipped: output JSON not available"]
      };
    }

    // Run safety
    if (contextPack && output) {
      try {
        const outputObject = output as Record<string, unknown>;
        const coachingOutput =
          (outputObject?.pass2 as Record<string, unknown> | undefined)?.coaching_output ||
          outputObject?.coaching_output ||
          outputObject;

        safetyResult = evaluateSafety(
          contextPack as Parameters<typeof evaluateSafety>[0],
          coachingOutput as Parameters<typeof evaluateSafety>[1],
        ) as SafetyResult;
      } catch (error) {
        safetyResult = {
          safe: false,
          violations: [`Safety evaluation crashed: ${getErrorMessage(error)}`]
        };
      }
    } else {
      safetyResult = {
        safe: false,
        violations: ["Safety evaluation skipped: context or output missing"]
      };
    }

    // Collect failures
    if (!validatorResult.valid) {
      validatorResult.errors.forEach((err: string) => {
        clipFailures.push(`Validator: ${err}`);
      });
    }

    if (!safetyResult.safe) {
      safetyResult.violations.forEach((violation: string) => {
        clipFailures.push(`Safety: ${violation}`);
      });
    }

    const overallPass: boolean = validatorResult.valid && safetyResult.safe;

    const clipResult: ClipResult = {
      clip_name: clipName,
      files: {
        output: outputPath,
        context: contextPath,
        review: fs.existsSync(reviewPath) ? reviewPath : null
      },
      review_notes: reviewNotes,
      validator: {
        pass: validatorResult.valid,
        errors: validatorResult.errors
      },
      safety: {
        pass: safetyResult.safe,
        violations: safetyResult.violations
      },
      overall: {
        pass: overallPass
      }
    };

    results.push(clipResult);

    if (!overallPass || clipFailures.length > 0) {
      failuresByClip[clipName] = clipFailures;
    }
  });

  const totalClips: number = results.length;
  const totalPass: number = results.filter((r: ClipResult) => r.overall.pass).length;
  const totalFail: number = totalClips - totalPass;

  return {
    summary: {
      total_clips: totalClips,
      total_pass: totalPass,
      total_fail: totalFail,
      failures_by_clip: failuresByClip
    },
    results
  };
}

function readJsonFile(filePath: string): unknown {
  const raw: string = fs.readFileSync(filePath, "utf8");

  try {
    return JSON.parse(raw);
  } catch (error) {
    throw new Error(`Invalid JSON in ${path.basename(filePath)}: ${getErrorMessage(error)}`);
  }
}

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  return String(error);
}
