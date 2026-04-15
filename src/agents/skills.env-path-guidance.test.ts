import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const REPO_ROOT = path.resolve(import.meta.dirname, "..", "..");

type GuidanceCase = {
  file: string;
  required?: string[];
  forbidden?: string[];
};

const CASES: GuidanceCase[] = [
  {
    file: "skills/session-logs/SKILL.md",
    required: ["CRABFORK_STATE_DIR"],
    forbidden: [
      "for f in ~/.crabfork/agents/<agentId>/sessions/*.jsonl",
      'rg -l "phrase" ~/.crabfork/agents/<agentId>/sessions/*.jsonl',
      "~/.crabfork/agents/<agentId>/sessions/<id>.jsonl",
    ],
  },
  {
    file: "skills/gh-issues/SKILL.md",
    required: ["CRABFORK_CONFIG_PATH"],
    forbidden: ["cat ~/.crabfork/crabfork.json"],
  },
  {
    file: "skills/canvas/SKILL.md",
    required: ["CRABFORK_CONFIG_PATH"],
    forbidden: ["cat ~/.crabfork/crabfork.json"],
  },
  {
    file: "skills/openai-whisper-api/SKILL.md",
    required: ["CRABFORK_CONFIG_PATH"],
  },
  {
    file: "skills/sherpa-onnx-tts/SKILL.md",
    required: [
      "CRABFORK_STATE_DIR",
      "CRABFORK_CONFIG_PATH",
      'STATE_DIR="${CRABFORK_STATE_DIR:-$HOME/.crabfork}"',
    ],
    forbidden: [
      'SHERPA_ONNX_RUNTIME_DIR: "~/.crabfork/tools/sherpa-onnx-tts/runtime"',
      'SHERPA_ONNX_MODEL_DIR: "~/.crabfork/tools/sherpa-onnx-tts/models/vits-piper-en_US-lessac-high"',
      "<state-dir>",
    ],
  },
  {
    file: "skills/coding-agent/SKILL.md",
    required: ["CRABFORK_STATE_DIR"],
    forbidden: ["NEVER start Codex in ~/.crabfork/"],
  },
];

describe("bundled skill env-path guidance", () => {
  it.each(CASES)(
    "keeps $file aligned with CRABFORK env overrides",
    ({ file, required, forbidden }) => {
      const content = fs.readFileSync(path.join(REPO_ROOT, file), "utf8");
      for (const needle of required ?? []) {
        expect(content).toContain(needle);
      }
      for (const needle of forbidden ?? []) {
        expect(content).not.toContain(needle);
      }
    },
  );
});
