"use client";
import { useState } from "react";

export default function EnrollButton({ courseId }: { courseId: string }) {
  const [status, setStatus] = useState<null | string>(null);
  const [loading, setLoading] = useState(false);
  async function enroll() {
    setLoading(true);
    const res = await fetch("/api/enroll", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ courseId })
    });
    const data = await res.json();
    setLoading(false);
    setStatus(data.message || data.error || "Done");
  }
  return (
    <div className="flex flex-col gap-2">
      <button onClick={enroll} disabled={loading} className="btn btn-primary w-fit">
        {loading ? "Processing..." : "Enroll"}
      </button>
      {status && <p className="text-sm">{status}</p>}
    </div>
  );
}
