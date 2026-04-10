// UI-facing response type — pipeline internals do not leak past this boundary

export interface AnalysisResult {
  summary: {
    intent: string;
    terrain: string;
    failureType: string;
    confidence: number;
  };
  coaching: {
    title: string;
    message: string;
  };
  supporting: string[];
  safetyNote?: string;
}
