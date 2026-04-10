'use client';

import { useEffect, useState } from 'react';

const STAGES = [
  'Reading camera angle…',
  'Assessing visibility…',
  'Detecting rider intent…',
  'Scanning terrain features…',
  'Sequencing events…',
  'Classifying failure type…',
  'Building causal chain…',
  'Generating coaching…',
  'Validating output…',
];

export function ProcessingState() {
  const [stageIndex, setStageIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setStageIndex((i) => (i + 1) % STAGES.length);
        setVisible(true);
      }, 200);
    }, 900);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-6 py-20">
      <div className="relative h-12 w-12">
        <div className="absolute inset-0 rounded-full border-2 border-zinc-200" />
        <div className="absolute inset-0 rounded-full border-2 border-t-orange-500 animate-spin" />
      </div>
      <div className="text-center">
        <p
          className="text-sm font-medium text-zinc-600 transition-opacity duration-200"
          style={{ opacity: visible ? 1 : 0 }}
        >
          {STAGES[stageIndex]}
        </p>
        <p className="mt-1 text-xs text-zinc-400">This takes about 30–60 seconds</p>
      </div>
    </div>
  );
}
