import { NextRequest, NextResponse } from 'next/server';
import type { AnalysisResult } from '@/lib/types';

// ─── Mock flag ───────────────────────────────────────────────────────────────
// Set USE_MOCK = false and implement runPipeline() when pipeline is wired up.
const USE_MOCK = true;

// ─── Mock path ───────────────────────────────────────────────────────────────
// Simulates a steep hill bail result — the T1 reference clip.
const MOCK_RESULT: AnalysisResult = {
  summary: {
    intent: 'Steep climb attempt',
    terrain: 'Very steep climb · Rocky hardpack',
    failureType: 'Technique',
    confidence: 0.84,
  },
  coaching: {
    title: 'Shift your weight back as the gradient steepens',
    message:
      "Your weight is tracking forward as the climb increases, unloading the rear wheel and triggering spin. Push your hips toward the rear fender, extend your arms, and let the bike rise beneath you — don't pull it up with your upper body. The rear needs traction load to drive you through the steep section.",
  },
  supporting: [
    'Approach speed into the base of the climb was solid — momentum was not the limiting factor here',
    'Rear wheel spin intensified at the steepest point, consistent with forward weight bias starving the rear of traction',
    'Commit your eye line further up the hill before the gradient peaks — earlier vision helps you pre-load the correct position',
  ],
  safetyNote:
    'Minor bail detected. Body position corrections on steep terrain carry fall risk — build the habit on moderate gradients before applying at this severity.',
};

async function runMock(_video: File, _riderNote: string | null): Promise<AnalysisResult> {
  // Simulate pipeline latency
  await new Promise((r) => setTimeout(r, 2800));
  return MOCK_RESULT;
}

// ─── Real pipeline path ──────────────────────────────────────────────────────
// Uncomment and implement when pipeline integration is ready:
//
// import { runFullPipeline } from '@/pipeline/runner';
// import { formatResult } from '@/lib/format-result';
//
// async function runPipeline(video: File, riderNote: string | null): Promise<AnalysisResult> {
//   const bytes = Buffer.from(await video.arrayBuffer());
//   const pipeline = await runFullPipeline(bytes, riderNote ?? undefined);
//   return formatResult(pipeline);
// }

// ─── Route handler ───────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json(
      { error: 'Invalid request — expected multipart/form-data' },
      { status: 400 },
    );
  }

  const video = formData.get('video');
  const riderNote = formData.get('riderNote');

  if (!video || !(video instanceof File)) {
    return NextResponse.json({ error: 'No video file provided' }, { status: 400 });
  }

  // TODO: enforce file size limit server-side when real pipeline is wired up
  const noteStr = typeof riderNote === 'string' ? riderNote : null;

  try {
    let result: AnalysisResult;
    if (USE_MOCK) {
      result = await runMock(video, noteStr);
    } else {
      // Replace with: result = await runPipeline(video, noteStr);
      throw new Error('Real pipeline not yet connected — set USE_MOCK = true');
    }
    return NextResponse.json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Analysis failed';
    console.error('[analyze]', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
