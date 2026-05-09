import { useState } from "react";
import { Minus, Plus, X, Loader2, Check, Copy } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { createBooking } from "@/lib/euphoria.functions";
import type { Location } from "@/lib/euphoria-store";

export function BookingModal({
  location,
  onClose,
}: {
  location: Location;
  onClose: () => void;
}) {
  const create = useServerFn(createBooking);
  const [bags, setBags] = useState(1);
  const [dropOff, setDropOff] = useState("10:00");
  const [pickUp, setPickUp] = useState("18:00");
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const total = bags * location.pricePerBag;

  async function confirm() {
    setLoading(true);
    try {
      const today = new Date().toISOString().slice(0, 10);
      const booking = await create({
        data: {
          locationId: location.id,
          numberOfBags: bags,
          dropOffTime: `${today}T${dropOff}`,
          pickUpTime: `${today}T${pickUp}`,
        },
      });
      setCode(booking.bookingCode);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  function copyCode() {
    if (!code) return;
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="liquid-glass-strong relative z-10 w-full max-w-md rounded-3xl p-8 text-white">
        <button
          onClick={onClose}
          className="absolute right-5 top-5 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:scale-105 active:scale-95 transition-transform"
          aria-label="Close"
        >
          <X size={16} />
        </button>

        {!code ? (
          <>
            <p className="text-xs uppercase tracking-[0.2em] text-white/60">
              Reserve a stash
            </p>
            <h2 className="mt-1 text-2xl font-light">
              {location.name.split(" ").slice(0, -1).join(" ")}{" "}
              <span className="font-serif-italic">
                {location.name.split(" ").slice(-1)}
              </span>
            </h2>
            <p className="mt-1 text-sm text-white/60">{location.address}</p>

            <div className="mt-8 space-y-5">
              <div>
                <label className="text-xs uppercase tracking-widest text-white/60">
                  Bags
                </label>
                <div className="mt-2 flex items-center justify-between liquid-glass rounded-2xl px-4 py-3">
                  <button
                    onClick={() => setBags(Math.max(1, bags - 1))}
                    className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:scale-105 active:scale-95 transition-transform"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="text-2xl font-light tabular-nums">{bags}</span>
                  <button
                    onClick={() => setBags(Math.min(20, bags + 1))}
                    className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:scale-105 active:scale-95 transition-transform"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs uppercase tracking-widest text-white/60">
                    Drop-off
                  </label>
                  <input
                    type="time"
                    value={dropOff}
                    onChange={(e) => setDropOff(e.target.value)}
                    className="mt-2 w-full liquid-glass rounded-2xl px-4 py-3 bg-transparent text-white outline-none [color-scheme:dark]"
                  />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-widest text-white/60">
                    Pick-up
                  </label>
                  <input
                    type="time"
                    value={pickUp}
                    onChange={(e) => setPickUp(e.target.value)}
                    className="mt-2 w-full liquid-glass rounded-2xl px-4 py-3 bg-transparent text-white outline-none [color-scheme:dark]"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-white/10 pt-5">
                <span className="text-sm text-white/60">Total</span>
                <span className="text-2xl font-light">
                  ₹{total}
                  <span className="text-sm text-white/60"> / day</span>
                </span>
              </div>

              <button
                onClick={confirm}
                disabled={loading}
                className="liquid-glass-strong w-full rounded-full py-4 text-sm uppercase tracking-[0.2em] text-white hover:scale-[1.02] active:scale-95 transition-transform disabled:opacity-60"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="animate-spin" size={16} /> Confirming
                  </span>
                ) : (
                  "Confirm booking"
                )}
              </button>
            </div>
          </>
        ) : (
          <div className="text-center py-4">
            <div className="mx-auto w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
              <Check size={20} />
            </div>
            <p className="mt-5 text-xs uppercase tracking-[0.2em] text-white/60">
              Show this at the counter
            </p>
            <h2 className="mt-2 text-3xl font-light">
              Your <span className="font-serif-italic">handoff</span> code
            </h2>
            <div className="liquid-glass mt-6 rounded-2xl px-6 py-8">
              <p className="text-5xl font-light tracking-[0.4em] tabular-nums">
                {code}
              </p>
            </div>
            <button
              onClick={copyCode}
              className="mt-4 inline-flex items-center gap-2 text-xs uppercase tracking-widest text-white/70 hover:text-white"
            >
              <Copy size={12} /> {copied ? "Copied" : "Copy code"}
            </button>
            <button
              onClick={onClose}
              className="liquid-glass-strong mt-6 w-full rounded-full py-4 text-sm uppercase tracking-[0.2em] hover:scale-[1.02] active:scale-95 transition-transform"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
