"use client";

import { useOptimistic } from "react";
import ReservationCard from "./ReservationCard";
import { Reorder } from "motion/react";

function ReservationsList({ bookings }) {
  const [optimisticBookings, removeOptimisticBooking] = useOptimistic(
    bookings,
    (prev, id) => prev.filter((item) => item.id !== id)
  );

  return (
    <>
      {optimisticBookings.length === 0 ? (
        <p className="text-lg">
          You have no reservations yet. Check out our{" "}
          <a className="underline text-accent-500" href="/cabins">
            luxury cabins &rarr;
          </a>
        </p>
      ) : (
        <Reorder.Group
          values={optimisticBookings}
          as="ul"
          className="space-y-6">
          {optimisticBookings.map((booking) => (
            <ReservationCard
              removeOptimisticBooking={removeOptimisticBooking}
              booking={booking}
              key={booking.id}
            />
          ))}
        </Reorder.Group>
      )}
    </>
  );
}

export default ReservationsList;
