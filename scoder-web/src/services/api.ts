const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export async function sendFeedback(feedback: { rating: number; comment?: string }) {
  const res = await fetch(`${API_URL}/feedback`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(feedback)
  });
  if (!res.ok) throw new Error("Failed to send feedback");
  return res.json();
}

export async function getFeedbacks(
  page = 1,
  limit = 5
): Promise<{
  data: Array<{ id: number; rating: number; comment: string; createdAt: string }>;
  total: number;
  page: number;
  lastPage: number;
}> {
  const res = await fetch(`${API_URL}/feedback?page=${page}&limit=${limit}`);
  if (!res.ok) throw new Error("Failed to fetch feedbacks");
  return res.json();
}
