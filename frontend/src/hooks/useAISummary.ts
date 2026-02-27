import { useState } from "react";
import type { JobId } from '../types'

const API_URL = import.meta.env.VITE_API_URL

export function useAISummary(jobId: JobId) {
  const [summary, setSummary] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateSummary = async () => {
    setSummary("");
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/ai/summary/${jobId}`);

      if (!response.ok) {
        throw new Error("Summary not found");
      }

      // response.body puede ser null
      if (!response.body) {
        throw new Error("The response does not contain a body");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        // cada chunk es un fragmento de texto
        const chunkTest = decoder.decode(value, { stream: true });
        setSummary((prev) => prev + chunkTest);
      }
    } catch (error) {
      setError("Error al generar el resumen: " + error);
    } finally {
      setLoading(false);
    }
  }

	return {
		summary,
		loading,
		error,
		generateSummary
	}
}
