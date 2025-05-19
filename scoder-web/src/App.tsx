import { useState } from "react";
import { FeedbackForm } from "./components/FeedbackForm";
import { FeedbackList } from "./components/FeedbackList";

export default function App() {
  const [refresh, setRefresh] = useState(false);

  const triggerRefresh = () => setRefresh((r) => !r);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <header className="py-6 text-center bg-white shadow">
        <h1 className="text-3xl font-bold text-blue-700">📋 Sistema de Feedback</h1>
      </header>

      <main className="py-8 px-4">
        <div className="flex gap-8 content-start mx-auto">
          <FeedbackForm onSuccess={triggerRefresh} />
          <FeedbackList refresh={refresh} />
        </div>
      </main>

      <footer className="text-center text-xs text-gray-500 py-4">© 2025 Scoder Feedback</footer>
    </div>
  );
}
