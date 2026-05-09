// In-memory mock "DB". Persists per server instance.
export type Location = {
  id: string;
  name: string;
  address: string;
  coordinates: { lat: number; lng: number };
  capacity: number;
  pricePerBag: number;
  imageUrl: string;
};

export type BookingStatus = "Pending" | "Stored" | "Completed";

export type Booking = {
  bookingCode: string;
  mockUserId: string;
  locationId: string;
  locationName: string;
  numberOfBags: number;
  dropOffTime: string;
  pickUpTime: string;
  totalPrice: number;
  status: BookingStatus;
  createdAt: string;
};

const g = globalThis as unknown as {
  __euphoria?: { locations: Location[]; bookings: Map<string, Booking> };
};

if (!g.__euphoria) {
  g.__euphoria = {
    locations: [
      {
        id: "loc_fort_kochi_roasters",
        name: "Fort Kochi Roasters",
        address: "Princess Street, Fort Kochi",
        coordinates: { lat: 9.9658, lng: 76.2421 },
        capacity: 24,
        pricePerBag: 180,
        imageUrl:
          "https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=1200&q=70",
      },
      {
        id: "loc_mg_road_library",
        name: "MG Road Library",
        address: "MG Road, Ernakulam",
        coordinates: { lat: 9.9756, lng: 76.2847 },
        capacity: 40,
        pricePerBag: 150,
        imageUrl:
          "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1200&q=70",
      },
      {
        id: "loc_south_station_lounge",
        name: "South Station Lounge",
        address: "Ernakulam Junction (South)",
        coordinates: { lat: 9.9684, lng: 76.2920 },
        capacity: 60,
        pricePerBag: 120,
        imageUrl:
          "https://images.unsplash.com/photo-1505761671935-60b3a7427bad?w=1200&q=70",
      },
    ],
    bookings: new Map(),
  };
}

export const store = g.__euphoria!;

export function generateBookingCode(): string {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  if (store.bookings.has(code)) return generateBookingCode();
  return code;
}
