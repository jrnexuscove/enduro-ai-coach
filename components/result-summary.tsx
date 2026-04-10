import type { AnalysisResult } from '@/lib/types';

interface Props {
  summary: AnalysisResult['summary'];
}

function Chip({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`flex flex-col gap-0.5 rounded-lg px-4 py-3 ${
        highlight ? 'bg-orange-50' : 'bg-zinc-100'
      }`}
    >
      <span
        className={`text-xs font-semibold uppercase tracking-wide ${
          highlight ? 'text-orange-600' : 'text-zinc-500'
        }`}
      >
        {label}
      </span>
      <span
        className={`text-sm font-semibold leading-snug ${
          highlight ? 'text-orange-700' : 'text-zinc-800'
        }`}
      >
        {value}
      </span>
    </div>
  );
}

export function ResultSummary({ summary }: Props) {
  const pct = Math.round(summary.confidence * 100);

  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
      <Chip label="Intent" value={summary.intent} />
      <Chip label="Terrain" value={summary.terrain} />
      <Chip label="Failure" value={summary.failureType} />
      <Chip label="Confidence" value={`${pct}%`} highlight />
    </div>
  );
}
