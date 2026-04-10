import type { AnalysisResult } from '@/lib/types';

interface Props {
  coaching: AnalysisResult['coaching'];
}

export function CoachingCard({ coaching }: Props) {
  return (
    <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white">
      <div className="flex">
        <div className="w-1 shrink-0 bg-orange-500" />
        <div className="px-6 py-5">
          <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-orange-600">
            Primary coaching focus
          </p>
          <h2 className="mb-3 text-lg font-semibold leading-snug text-zinc-900">
            {coaching.title}
          </h2>
          <p className="text-sm leading-relaxed text-zinc-600">{coaching.message}</p>
        </div>
      </div>
    </div>
  );
}
