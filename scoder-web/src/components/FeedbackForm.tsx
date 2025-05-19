import { useEffect, useState } from "react";
import { sendFeedback } from "../services/api";

export function FeedbackForm({ onSuccess }: { onSuccess?: () => void }) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await sendFeedback({ rating, comment });
      setStatus("success");
      setRating(5);
      setComment("");
      onSuccess?.(); // Notifica o pai
    } catch {
      setStatus("error");
    }
  };

  // ✅ Reativa o botão após sucesso (3s)
  useEffect(() => {
    if (status === "success") {
      const timer = setTimeout(() => setStatus("idle"), 3000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white p-6 rounded shadow w-full mx-auto">
      <h2 className="text-xl font-bold text-gray-800">Envie seu feedback</h2>

      <div className="mb-4">
        <label className="label block text-sm font-medium text-gray-700 mb-1">Nota</label>
        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          required>
          {[1, 2, 3, 4, 5].map((n) => (
            <option
              key={n}
              value={n}>
              {n}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Comentário</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          rows={3}
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        disabled={status === "sending"}>
        {status === "sending" ? "Enviando..." : "Enviar"}
      </button>

      {status === "success" && (
        <p className="text-green-600 animate-fade-in">✅ Feedback enviado com sucesso!</p>
      )}
      {status === "error" && (
        <p className="text-red-600 animate-fade-in">❌ Erro ao enviar feedback.</p>
      )}
    </form>
  );
}
