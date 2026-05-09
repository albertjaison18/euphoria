import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { store, generateBookingCode, type BookingStatus } from "./euphoria-store";

export const getLocations = createServerFn({ method: "GET" }).handler(async () => {
  return store.locations;
});

const createBookingSchema = z.object({
  locationId: z.string(),
  numberOfBags: z.number().int().min(1).max(20),
  dropOffTime: z.string(),
  pickUpTime: z.string(),
});

export const createBooking = createServerFn({ method: "POST" })
  .inputValidator((data) => createBookingSchema.parse(data))
  .handler(async ({ data }) => {
    const location = store.locations.find((l) => l.id === data.locationId);
    if (!location) throw new Error("Location not found");
    const bookingCode = generateBookingCode();
    const totalPrice = location.pricePerBag * data.numberOfBags;
    const booking = {
      bookingCode,
      mockUserId: "mock_user_001",
      locationId: location.id,
      locationName: location.name,
      numberOfBags: data.numberOfBags,
      dropOffTime: data.dropOffTime,
      pickUpTime: data.pickUpTime,
      totalPrice,
      status: "Pending" as BookingStatus,
      createdAt: new Date().toISOString(),
    };
    store.bookings.set(bookingCode, booking);
    return booking;
  });

export const getBooking = createServerFn({ method: "GET" })
  .inputValidator((data) => z.object({ code: z.string().length(6) }).parse(data))
  .handler(async ({ data }) => {
    const b = store.bookings.get(data.code.toUpperCase());
    if (!b) throw new Error("Booking not found");
    return b;
  });

export const updateBookingStatus = createServerFn({ method: "POST" })
  .inputValidator((data) =>
    z
      .object({
        code: z.string().length(6),
        status: z.enum(["Pending", "Stored", "Completed"]),
      })
      .parse(data),
  )
  .handler(async ({ data }) => {
    const b = store.bookings.get(data.code.toUpperCase());
    if (!b) throw new Error("Booking not found");
    b.status = data.status;
    store.bookings.set(b.bookingCode, b);
    return b;
  });
