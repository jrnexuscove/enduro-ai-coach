// RideMind Pipeline — Model Provider
// Model-agnostic interface with GPT-4o implementation.
// Add GeminiProvider or ClaudeProvider here later without changing any stage code.

import OpenAI from "openai";
import type { ModelProvider } from "./types.js";

export type { ModelProvider };

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
