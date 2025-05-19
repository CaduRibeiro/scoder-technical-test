import { useEffect, useState } from "react";
import { getFeedbacks } from "../services/api";
import { FeedbackCard } from "./FeedbackCard";
import { Loader } from "./Loader";
import type { Feedback } from "../types";

export function FeedbackList({ refresh }: { refresh?: boolean }) {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await getFeedbacks(currentPage, 5);
      setFeedbacks(res.data);
      setLastPage(res.lastPage);
    } catch {
      setFeedbacks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, refresh]);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((p) => p - 1);
  };

  const handleNext = () => {
    if (currentPage < lastPage) setCurrentPage((p) => p + 1);
  };

  return (
    <div className="bg-white p-6 rounded shadow mt-0 w-full mx-auto">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Feedbacks recebidos</h2>

      {loading ? (
        <Loader />
      ) : feedbacks.length === 0 ? (
        <p className="text-gray-500">Nenhum feedback registrado.</p>
      ) : (
        <>
          <ul className="space-y-2 mb-4">
            {feedbacks.map((fb) => (
              <FeedbackCard
                key={fb.id}
                {...fb}
              />
            ))}
          </ul>

          <div className="flex justify-between items-center text-sm text-gray-700">
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              className="px-3 py-1 border rounded disabled:opacity-50">
              ← Anterior
            </button>

            <span>
              Página {currentPage} de {lastPage}
            </span>

            <button
              onClick={handleNext}
              disabled={currentPage === lastPage}
              className="px-3 py-1 border rounded disabled:opacity-50">
              Próxima →
            </button>
          </div>
        </>
      )}
    </div>
  );
}
