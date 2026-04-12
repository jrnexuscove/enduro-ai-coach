# RideMind — Technology Landscape Review

## Review #1 — April 2026

### Purpose
Monthly scan of models, tools, and platforms relevant to RideMind's perception and coaching pipeline. Scored against RideMind-specific requirements: video/frame perception accuracy, temporal event detection, pose estimation, cost, API accessibility, and integration complexity for a solo TypeScript developer on Windows.

---

### Frontier Hosted Models

**OpenAI — GPT-5.4 (current flagship, March 2026)**

GPT-5 launched August 2025; the current API version is GPT-5.4. Vision capabilities have improved significantly — error rates roughly halved on chart reasoning and interface understanding vs GPT-5.2. Supports "original" image detail mode for full-fidelity inputs up to 10.24M pixels. However, OpenAI's strength remains reasoning and tool use, not video-native understanding. No first-party video ingestion — still frame-based. Object localization remains weak (mAP50:95 of 1.5 on RF100-VL vs Gemini 2.5 Pro at 13.3).

**RideMind relevance:** GPT-5.4 is worth testing as a reasoning/coaching model (Stages 6–11) where its improved reasoning and tool-calling would help. Not recommended as primary perception model due to weak localization and no video-native support. The PVE is currently running against GPT-4o — consider a follow-up PVE run with GPT-5.4 if budget allows, specifically to test whether improved vision reduces hallucination on ambiguous clips. API model string: `gpt-5.4`.

**Action:** Add GPT-5.4 to the model consideration list for reasoning stages. Consider a targeted PVE comparison (3 clips) after current PVE completes.

---

**Google — Gemini 2.5 Flash / Gemini 2.5 Pro / Gemini 3.1 Pro Preview**

Gemini 2.5 Flash is still the current stable workhorse. Gemini 2.5 Pro achieved state-of-the-art on key video understanding benchmarks (84.7% on VideoMME), surpassing GPT-4.1. Google published a detailed blog (Feb 2026) highlighting Gemini 2.5's video capabilities: timestamp-aware moment retrieval, dense video captioning, temporal counting, and segment identification using audio-visual cues.

Gemini 3.1 Pro Preview (Feb 2026) is the current flagship — scored 77.1% on ARC-AGI-2 (more than double Gemini 3 Pro's 31.1%) and 94.3% on GPQA Diamond. However, it's a preview model with potential instability.

Key capability: Gemini processes video at 1fps and can subsample up to 256 frames. Video clipping with start/end offsets is supported. Up to 10 videos per request for 2.5+ models. Files API supports up to 2GB per file, stored for 48 hours.

Gemini 2.0 Flash shuts down June 1, 2026 — any code still referencing it needs migration.

**RideMind relevance:** Highest-priority perception model to test. Native video ingestion could solve the temporal perception gap that frames can't. The Gemini video PVE track (already built into the test script) is the single most important experiment after the current frame-based PVE. Gemini 2.5 Pro is worth testing for harder clips if Flash falls short.

**Action:** Run Gemini video track immediately after PVE scoring. If results are strong, prototype Gemini as the primary perception model for Stages 1–5.

---

**Anthropic — Claude Sonnet 4.6 (current)**

Claude Sonnet 4.6 is the current Sonnet. PVE partial results show Claude leading on ambiguous clips due to better uncertainty handling and lower hallucination — but it still misses the same events all models miss. Claude's strength is honesty about what it can't see, not superior perception.

**RideMind relevance:** Strong candidate for safety-critical stages (S11) and reasoning stages where hallucination avoidance matters. Not the primary perception model. Current PVE is testing claude-sonnet-4-6, which is correct.

**Action:** No change needed. Continue using Claude for architecture, reasoning, and safety validation roles.

---

### Specialist Video AI

**TwelveLabs — Pegasus 1.2 / Marengo 3.0**

TwelveLabs remains the most relevant specialist video understanding platform. Pegasus 1.2 is their current video-language model: processes videos up to 1 hour, supports temporal grounding with timestamps, multimodal understanding (visual + audio + text), and claims state-of-the-art on VideoMME-Long (videos >30 minutes). Available via their API and now also through Amazon Bedrock.

Marengo 3.0 is their embedding/search model (replaced 2.7, which is being deprecated). Handles video search, classification, and embedding generation.

Pricing: video indexing at ~$0.042/min, Pegasus analysis at ~$0.021/min on developer plan. Once indexed, subsequent queries against the same video are cheaper due to cached embeddings.

Key limitation: Pegasus is a Python SDK. Integration into your TypeScript pipeline would require either a Python subprocess or REST API calls. Also, Pegasus can "occasionally produce inaccurate outputs" per their own docs — hallucination is acknowledged.

**RideMind relevance:** Worth a benchmark test against Gemini video. The temporal grounding and audio understanding capabilities directly address RideMind's perception gaps. The cost model (index once, query repeatedly) could be attractive for a product where users might want multiple coaching perspectives on the same clip. The main risk is vendor dependency and less control over domain adaptation.

**Action:** Add TwelveLabs to the post-PVE evaluation list. Run 3 test clips through Pegasus after the Gemini video comparison, if Gemini video doesn't clearly solve the perception problem.

---

### Computer Vision Tools

**Ultralytics YOLO — now at YOLO26 (January 2026)**

YOLO has progressed significantly since last reviewed. The current recommended production versions are YOLO26 (January 2026) and YOLO11. YOLO12 exists but is community-driven and Ultralytics recommends against it for production (training instability, higher memory use, slower CPU throughput).

YOLO26 key features: end-to-end NMS-free inference, 43% faster CPU inference, supports detection, segmentation, classification, pose estimation, and oriented bounding boxes. Open-vocabulary versions available (YOLOE-26). The pose estimation mode provides 17 keypoints per detected person, trained on COCO keypoints.

For RideMind, the relevant capabilities are: rider/bike detection and tracking with persistent IDs across frames, and pose estimation for rider posture (standing/seated/leaning). YOLO runs locally — no API cost, no token cost.

**RideMind relevance:** YOLO26 pose estimation is the most realistic near-term CV addition. It could provide the hard "rider is seated in frames 1–14, standing in 15–16" evidence that LLMs can't reliably produce. However, performance on enduro footage (mud-covered riders, motion blur, partial occlusion, distant subjects, protective gear obscuring body shape) is completely unproven. Needs a proof-of-concept test on actual RideMind clips before committing.

**Action:** After PVE decision gate, run a quick YOLO26 pose experiment on 2–3 clips. This requires Python — could be a standalone script that outputs JSON for the TypeScript pipeline to consume.

---

**MediaPipe — Pose Landmark Detection**

MediaPipe Pose remains available and provides 33 body landmarks (vs YOLO's 17 keypoints) including 3D world coordinates. However, MediaPipe's accuracy degrades significantly with distance, occlusion, and motion blur — all common in enduro footage. No significant updates since last review that would change the assessment.

**RideMind relevance:** Lower priority than YOLO26 for initial CV experiments. YOLO26's integrated detection + pose in a single framework is more practical than running separate detection and pose pipelines. MediaPipe might be useful later for close-range POV clips where the rider's hands are visible (clutch/throttle position).

**Action:** Defer. Revisit if YOLO26 pose proves insufficient on close-range clips.

---

### Open-Source Vision-Language Models

**Qwen3-VL (October 2025)**

Qwen has released Qwen3-VL, a major upgrade from Qwen2.5-VL. Available in dense (2B/4B/8B/32B) and MoE (30B-A3B/235B-A22B) variants. Key improvements for RideMind: enhanced video dynamics comprehension, text-timestamp alignment for temporal grounding, 256K native context window for long videos, "Thinking" editions with reasoning chains.

Qwen3-VL is available via Alibaba Cloud API (qwen3-vl-plus and qwen3-vl-flash) and self-hostable via vLLM or Ollama. The 8B model is the sweet spot for local experimentation.

Qwen3.5 has also been announced with further improvements, though primarily to text capabilities.

**RideMind relevance:** Qwen3-VL is the strongest open-source VLM for video understanding currently available. The timestamp grounding and thinking mode are directly relevant to event detection. However, self-hosting requires GPU infrastructure (minimum 8B model needs a decent GPU, the 235B flagship needs 8× A100s). API access via Alibaba Cloud is possible but adds another vendor dependency.

**Action:** Monitor. Not practical for immediate integration given solo Windows dev setup. Becomes relevant if/when RideMind needs a self-hosted perception option for cost or data privacy reasons. Could test via Alibaba Cloud API as a benchmark.

---

**Google SDK Migration Note**

The `@google/generative-ai` npm package is officially deprecated. The replacement is `@google/genai` with a meaningfully different API surface. Current RideMind code works on the old SDK (v0.24.1) and the PVE script uses it successfully. Migration should happen as a single coordinated task across all Gemini scripts, not piecemeal.

**Action:** Add SDK migration to backlog as a non-urgent task. Do it before any major new Gemini feature work.

---

### Summary Table

| Technology | Current Version | RideMind Relevance | Priority | Action |
|---|---|---|---|---|
| GPT-5.4 | gpt-5.4 (Mar 2026) | Reasoning/coaching stages, reduced hallucination | Medium | Test after PVE for reasoning stages |
| Gemini 2.5 Flash | gemini-2.5-flash (stable) | Primary perception candidate, video-native | **High** | Run video PVE track next |
| Gemini 2.5 Pro | gemini-2.5-pro | Harder clips, deeper reasoning | Medium | Test if Flash insufficient |
| Claude Sonnet 4.6 | claude-sonnet-4-6 | Safety, uncertainty handling, reasoning | Current | No change |
| TwelveLabs Pegasus 1.2 | pegasus1.2 | Specialist video, temporal grounding | Medium | Benchmark after Gemini video |
| YOLO26 | yolo26 (Jan 2026) | Rider/bike detection, pose estimation | Medium | PoC after PVE gate |
| Qwen3-VL | qwen3-vl-8b (Oct 2025) | Open-source video VLM, self-hostable | Low (now) | Monitor, test via API later |
| Google GenAI SDK | @google/genai | SDK migration from deprecated package | Low | Batch migrate all Gemini scripts |

---

### Next Review
May 2026 — or triggered by a major model release from any provider.
