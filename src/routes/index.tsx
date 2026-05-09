import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, MapPin, Briefcase, ArrowRight } from "lucide-react";
import type { Location } from "@/lib/euphoria-store";
import { VideoBackdrop } from "@/components/VideoBackdrop";
import { BookingModal } from "@/components/BookingModal";

const MOCK_LOCATIONS: Location[] = [
  {
    id: "loc1",
    name: "Kashi Coffee Cafe",
    address: "Fort Kochi, Kerala",
    pricePerBag: 99,
    coordinates: { lat: 9.9658, lng: 76.2421 },
    capacity: 20,
    imageUrl: "/Kashi%20Coffee%20Cafe.jpg",
  },
  {
    id: "loc2",
    name: "Spice Route Boutique",
    address: "Mattancherry, Kerala",
    pricePerBag: 79,
    coordinates: { lat: 9.9684, lng: 76.2920 },
    capacity: 20,
    imageUrl: "/Spice%20Route%20Boutique.jpg",
  },
  {
    id: "loc3",
    name: "Heritage Gallery Store",
    address: "Kochi City Center",
    pricePerBag: 129,
    coordinates: { lat: 9.9756, lng: 76.2847 },
    capacity: 20,
    imageUrl: "/Heritage%20Gallery%20Store.jpg",
  },
  {
    id: "loc4",
    name: "Backwater Lounge",
    address: "Vembanadu, Kerala",
    pricePerBag: 89,
    coordinates: { lat: 9.9658, lng: 76.2421 },
    capacity: 20,
    imageUrl: "/Backwater%20Lounge.jpg",
  },
];

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Euphoria Transit — Premium luggage storage in Kochi" },
      {
        name: "description",
        content:
          "Unburden your journey. Store your bags in verified local cafes and boutiques across Kochi.",
      },
    ],
  }),
});

function Index() {
  const [active, setActive] = useState<Location | null>(null);

  return (
    <div className="relative min-h-screen text-white">
      <VideoBackdrop />

      <div className="relative z-10">
        {/* Nav */}
        <nav className="flex items-center justify-between px-6 md:px-12 py-6">
          <Link to="/" className="text-2xl tracking-tight font-light">
            <span className="font-serif-italic">euphoria</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link
              to="/partner"
              className="liquid-glass hidden sm:inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-transform"
            >
              Partner <ArrowRight size={12} />
            </Link>
            <button className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:scale-105 active:scale-95 transition-transform">
              <Menu size={18} />
            </button>
          </div>
        </nav>

        {/* Hero */}
        <header className="px-6 md:px-12 pt-20 pb-32 max-w-5xl">
          <p className="text-xs uppercase tracking-[0.3em] text-white/60">
            Kochi · India
          </p>
          <h1 className="mt-6 text-6xl md:text-8xl font-light leading-[0.95] tracking-tight">
            Unburden your
            <br />
            <span className="font-serif-italic text-white/90">journey.</span>
          </h1>
          <p className="mt-8 max-w-xl text-lg text-white/80 font-light">
            Premium luggage storage in verified local cafes and boutiques across
            Kochi. Drop your bags. Wander free.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href="#stash-spots"
              className="liquid-glass-strong inline-flex items-center gap-3 rounded-full pl-6 pr-2 py-2 hover:scale-105 active:scale-95 transition-transform"
            >
              <span className="text-sm uppercase tracking-[0.2em]">
                Find a stash spot
              </span>
              <span className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center">
                <ArrowRight size={16} />
              </span>
            </a>
            <span className="text-xs text-white/60">
              Verified · Insured · From ₹120 / bag
            </span>
          </div>
        </header>

        {/* Locations */}
        <section id="stash-spots" className="px-6 md:px-12 pb-24">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-white/60">
                {MOCK_LOCATIONS.length} verified spots
              </p>
              <h2 className="mt-2 text-3xl md:text-4xl font-light">
                Stash <span className="font-serif-italic">spots</span> nearby
              </h2>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {MOCK_LOCATIONS.map((loc) => (
              <article
                key={loc.id}
                className="liquid-glass-strong rounded-3xl overflow-hidden flex flex-col"
              >
                <div className="h-44 w-full bg-cover bg-center" style={{ backgroundImage: `url(${loc.imageUrl})` }} />
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-light">
                    {loc.name.split(" ").slice(0, -1).join(" ")}{" "}
                    <span className="font-serif-italic">
                      {loc.name.split(" ").slice(-1)}
                    </span>
                  </h3>
                  <p className="mt-1 flex items-center gap-2 text-sm text-white/60">
                    <MapPin size={12} /> {loc.address}
                  </p>

                  <div className="mt-5 flex items-center gap-4 text-xs uppercase tracking-widest text-white/70">
                    <span className="flex items-center gap-2">
                      <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                        <Briefcase size={12} />
                      </span>
                      20 bags
                    </span>
                    <span className="ml-auto text-white">
                      ₹{loc.pricePerBag}
                      <span className="text-white/60"> /bag</span>
                    </span>
                  </div>

                  <button
                    onClick={() => setActive(loc)}
                    className="liquid-glass mt-6 w-full rounded-full py-3 text-sm uppercase tracking-[0.2em] hover:scale-[1.02] active:scale-95 transition-transform"
                  >
                    Book
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <footer className="px-6 md:px-12 py-10 text-xs text-white/50 flex justify-between border-t border-white/10">
          <span>© Euphoria Transit · Kochi</span>
          <Link to="/partner" className="hover:text-white">
            Partner shop login →
          </Link>
        </footer>
      </div>

      {active && <BookingModal location={active} onClose={() => setActive(null)} />}
    </div>
  );
}
