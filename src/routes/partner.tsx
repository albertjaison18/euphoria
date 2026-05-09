import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { getBooking, updateBookingStatus } from "@/lib/euphoria.functions";
import type { Booking, BookingStatus } from "@/lib/euphoria-store";
import { VideoBackdrop } from "@/components/VideoBackdrop";
import { ArrowLeft, Search, Loader2, Briefcase, Clock } from "lucide-react";

export const Route = createFileRoute("/partner")({
  component: Partner,
  head: () => ({
    meta: [
      { title: "Partner Console — Euphoria Transit" },
      { name: "description", content: "Partner shop dashboard for handoffs." },
    ],
  }),
});

function Partner() {
  const fetchBooking = useServerFn(getBooking);
  const updateStatus = useServerFn(updateBookingStatus);
  const [code, setCode] = useState("");
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function lookup() {
    if (code.length !== 6) {
      setError("Enter a 6-character code");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const b = await fetchBooking({ data: { code: code.toUpperCase() } });
      setBooking(b);
    } catch {
      setError("No booking found for that code");
      setBooking(null);
    } finally {
      setLoading(false);
    }
  }

  async function setStatus(status: BookingStatus) {
    if (!booking) return;
    setLoading(true);
    try {
      const b = await updateStatus({
        data: { code: booking.bookingCode, status },
      });
      setBooking(b);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative min-h-screen text-white">
      <VideoBackdrop />
      <div className="relative z-10">
        <nav className="flex items-center justify-between px-6 md:px-12 py-6">
          <Link
            to="/"
            className="liquid-glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-transform"
          >
            <ArrowLeft size={12} /> Back
          </Link>
          <span className="text-sm tracking-widest text-white/70 uppercase">
            Partner Console
          </span>
        </nav>

        <main className="px-6 md:px-12 max-w-2xl mx-auto pt-16 pb-24">
          <p className="text-xs uppercase tracking-[0.3em] text-white/60">
            Handoff
          </p>
          <h1 className="mt-3 text-5xl font-light">
            Scan or <span className="font-serif-italic">type</span> code
          </h1>
          <p className="mt-3 text-white/70">
            Enter the customer's 6-character code to retrieve and update their
            booking.
          </p>

          <div className="liquid-glass-strong mt-10 rounded-3xl p-6">
            <div className="flex items-center gap-3">
              <input
                value={code}
                onChange={(e) =>
                  setCode(e.target.value.toUpperCase().slice(0, 6))
                }
                onKeyDown={(e) => e.key === "Enter" && lookup()}
                placeholder="ABC123"
                maxLength={6}
                className="flex-1 bg-transparent text-3xl tracking-[0.4em] font-light outline-none placeholder:text-white/30 uppercase tabular-nums"
              />
              <button
                onClick={lookup}
                disabled={loading}
                className="liquid-glass rounded-full px-5 py-3 text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-transform disabled:opacity-50 flex items-center gap-2"
              >
                {loading ? (
                  <Loader2 size={14} className="animate-spin" />
                ) : (
                  <Search size={14} />
                )}
                Find
              </button>
            </div>
            {error && (
              <p className="mt-3 text-sm text-white/70">{error}</p>
            )}
          </div>

          {booking && (
            <div className="liquid-glass-strong mt-6 rounded-3xl p-8">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-white/60">
                    {booking.locationName}
                  </p>
                  <h2 className="mt-2 text-3xl font-light tracking-[0.3em] tabular-nums">
                    {booking.bookingCode}
                  </h2>
                </div>
                <span className="liquid-glass rounded-full px-4 py-2 text-xs uppercase tracking-widest">
                  {booking.status}
                </span>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3 text-sm">
                <div className="liquid-glass rounded-2xl p-4">
                  <Briefcase size={14} className="text-white/60" />
                  <p className="mt-2 text-xs uppercase tracking-widest text-white/60">
                    Bags
                  </p>
                  <p className="text-2xl font-light">{booking.numberOfBags}</p>
                </div>
                <div className="liquid-glass rounded-2xl p-4">
                  <Clock size={14} className="text-white/60" />
                  <p className="mt-2 text-xs uppercase tracking-widest text-white/60">
                    Drop / Pick
                  </p>
                  <p className="text-sm font-light">
                    {booking.dropOffTime.slice(11, 16)} —{" "}
                    {booking.pickUpTime.slice(11, 16)}
                  </p>
                </div>
                <div className="liquid-glass rounded-2xl p-4">
                  <p className="mt-6 text-xs uppercase tracking-widest text-white/60">
                    Total
                  </p>
                  <p className="text-2xl font-light">₹{booking.totalPrice}</p>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  onClick={() => setStatus("Stored")}
                  disabled={booking.status !== "Pending" || loading}
                  className="liquid-glass-strong flex-1 rounded-full py-4 text-sm uppercase tracking-[0.2em] hover:scale-[1.02] active:scale-95 transition-transform disabled:opacity-30 disabled:hover:scale-100"
                >
                  Mark as stored
                </button>
                <button
                  onClick={() => setStatus("Completed")}
                  disabled={booking.status !== "Stored" || loading}
                  className="liquid-glass-strong flex-1 rounded-full py-4 text-sm uppercase tracking-[0.2em] hover:scale-[1.02] active:scale-95 transition-transform disabled:opacity-30 disabled:hover:scale-100"
                >
                  Complete handoff
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
