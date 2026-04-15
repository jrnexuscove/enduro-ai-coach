// RideMind Pipeline — Model Provider
// Model-agnostic interface with GPT-4o and Claude implementations.
// Add GeminiProvider here later without changing any stage code.

import OpenAI from "openai";
import Anthropic from "@anthropic-ai/sdk";
import type { ModelProvider } from "./types.js";

export type { ModelProvider };

function detectImageMediaType(
  buf: Buffer,
  frameIndex: number
): "image/jpeg" | "image/png" {
  if (buf.length >= 3 && buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) {
    return "image/jpeg";
  }
  if (
    buf.length >= 8 &&
    buf[0] === 0x89 &&
    buf[1] === 0x50 &&
    buf[2] === 0x4e &&
    buf[3] === 0x47 &&
    buf[4] === 0x0d &&
    buf[5] === 0x0a &&
    buf[6] === 0x1a &&
    buf[7] === 0x0a
  ) {
    return "image/png";
  }
  throw new Error(
    `ClaudeProvider: unsupported image format for frame ${frameIndex} — only JPEG and PNG are accepted`
  );
}

export class ClaudeProvider implements ModelProvider {
  readonly name = "claude-sonnet-4-6";
  private client: Anthropic;

  constructor() {
    if (!process.env.ANTHROPIC_API_KEY) {
      throw new Error("ClaudeProvider: ANTHROPIC_API_KEY not set in environment");
    }
    this.client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  }

  async analyzeFrames(
    systemPrompt: string,
    userPrompt: string,
    frames: Buffer[]
  ): Promise<string> {
    const imageBlocks: Anthropic.ImageBlockParam[] = frames.map((frame, i) => ({
      type: "image",
      source: {
        type: "base64",
        media_type: detectImageMediaType(frame, i),
        data: frame.toString("base64"),
      },
    }));

    const response = await this.client.messages.create({
      model: "claude-sonnet-4-6-20250514",
      max_tokens: 16000,
      system: systemPrompt,
      messages: [
        {
          role: "user",
          content: [{ type: "text", text: userPrompt }, ...imageBlocks],
        },
      ],
    });

    const text = response.content
      .filter((b): b is Anthropic.TextBlock => b.type === "text")
      .map((b) => b.text)
      .join("");

    if (!text) {
      throw new Error("ClaudeProvider: response contained no text content");
    }

    return text;
  }
}

export class GPT4oProvider implements ModelProvider {
  readonly name = "gpt-4o";
  private client: OpenAI;

  constructor() {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error("GPT4oProvider: OPENAI_API_KEY not set in environment");
    }
    this.client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }

  async analyzeFrames(
    systemPrompt: string,
    userPrompt: string,
    frames: Buffer[]
  ): Promise<string> {
    const imageContent = frames.map((frame) => ({
      type: "image_url" as const,
      image_url: {
        url: `data:image/jpeg;base64,${frame.toString("base64")}`,
        detail: "high" as const,
      },
    }));

    const response = await this.client.chat.completions.create({
      model: "gpt-4o",
      max_tokens: 2000,
      messages: [
        { role: "system", content: systemPrompt },
        {
          role: "user",
          content: [{ type: "text", text: userPrompt }, ...imageContent],
        },
      ],
    });

    return response.choices[0].message.content ?? "";
  }
}
