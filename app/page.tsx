'use client';

import { useState } from 'react';
import { UploadDropzone } from '@/components/upload-dropzone';
import { ProcessingState } from '@/components/processing-state';
import { ResultSummary } from '@/components/result-summary';
import { CoachingCard } from '@/components/coaching-card';
import type { AnalysisResult } from '@/lib/types';

type Status = 'idle' | 'ready' | 'processing' | 'result' | 'error';

export default function Home() {
  const [status, setStatus] = useState<Status>('idle');
  const [file, setFile] = useState<File | null>(null);
  const [riderNote, setRiderNote] = useState('');
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  function handleFileChange(f: File | null) {
    setFile(f);
    setStatus(f ? 'ready' : 'idle');
  }

  async function handleSubmit() {
    if (!file) return;
    setStatus('processing');
    setErrorMsg(null);

    const form = new FormData();
    form.append('video', file);
    if (riderNote.trim()) form.append('riderNote', riderNote.trim());

    try {
      const res = await fetch('/api/analyze', { method: 'POST', body: form });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error((data as { error?: string }).error ?? `Server error ${res.status}`);
      }
      const data: AnalysisResult = await res.json();
      setResult(data);
      setStatus('result');
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong');
      setStatus('error');
    }
  }

  function handleReset() {
    setStatus('idle');
    setFile(null);
    setRiderNote('');
    setResult(null);
    setErrorMsg(null);
  }

  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Header */}
      <header className="border-b border-zinc-200 bg-white">
        <div className="mx-auto max-w-2xl px-4 py-4">
          <span className="text-lg font-bold tracking-tight text-zinc-900">
            Ride<span className="text-orange-500">Mind</span>
          </span>
        </div>
      </header>

      {/* Main content */}
      <main className="mx-auto max-w-2xl px-4 py-10">
        {/* ── Upload form ─────────────────────────────────── */}
        {(status === 'idle' || status === 'ready') && (
          <div className="space-y-5">
            <div>
              <h1 className="text-xl font-semibold text-zinc-900">Analyse your ride</h1>
              <p className="mt-1 text-sm text-zinc-500">
                Upload a clip and we&apos;ll identify failure points and coaching priorities.
              </p>
            </div>

            <UploadDropzone onFileChange={handleFileChange} />

            <div>
              <label
                htmlFor="riderNote"
                className="mb-1.5 block text-sm font-medium text-zinc-700"
              >
                What were you trying to do?{' '}
                <span className="font-normal text-zinc-400">(optional)</span>
              </label>
              <textarea
                id="riderNote"
                value={riderNote}
                onChange={(e) => setRiderNote(e.target.value)}
                placeholder="e.g. attempting a steep rocky climb, bailed halfway up"
                rows={3}
                className="w-full resize-none rounded-lg border border-zinc-300 px-3 py-2.5 text-sm text-zinc-800 placeholder:text-zinc-400 transition-colors focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-100"
              />
            </div>

            <button
              onClick={handleSubmit}
              disabled={status !== 'ready'}
              className="w-full rounded-lg bg-orange-500 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-orange-600 disabled:cursor-not-allowed disabled:bg-zinc-200 disabled:text-zinc-400"
            >
              Analyse clip
            </button>
          </div>
        )}

        {/* ── Processing ──────────────────────────────────── */}
        {status === 'processing' && <ProcessingState />}

        {/* ── Result ──────────────────────────────────────── */}
        {status === 'result' && result && (
          <div className="space-y-5">
            <div>
              <h1 className="text-xl font-semibold text-zinc-900">Coaching result</h1>
              {file && <p className="mt-0.5 text-sm text-zinc-400">{file.name}</p>}
            </div>

            <ResultSummary summary={result.summary} />
            <CoachingCard coaching={result.coaching} />

            {result.supporting.length > 0 && (
              <div>
                <h3 className="mb-3 text-sm font-semibold text-zinc-700">Supporting points</h3>
                <ul className="space-y-2">
                  {result.supporting.map((point, i) => (
                    <li key={i} className="flex gap-3 text-sm text-zinc-600">
                      <span className="mt-0.5 shrink-0 font-bold text-orange-400">—</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {result.safetyNote && (
              <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3">
                <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-amber-700">
                  Note
                </p>
                <p className="text-sm text-amber-800">{result.safetyNote}</p>
              </div>
            )}

            <button
              onClick={handleReset}
              className="w-full rounded-lg border border-zinc-300 px-4 py-3 text-sm font-semibold text-zinc-700 transition-colors hover:bg-zinc-100"
            >
              Analyse another clip
            </button>
          </div>
        )}

        {/* ── Error ───────────────────────────────────────── */}
        {status === 'error' && (
          <div className="space-y-4">
            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-4">
              <p className="mb-1 text-sm font-semibold text-red-700">Analysis failed</p>
              <p className="text-sm text-red-600">{errorMsg}</p>
            </div>
            <button
              onClick={handleReset}
              className="w-full rounded-lg border border-zinc-300 px-4 py-3 text-sm font-semibold text-zinc-700 transition-colors hover:bg-zinc-100"
            >
              Try again
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
