import UpdateReservationForm from "@/app/_components/UpdateReservationForm";
import { getBooking, getCabin } from "@/app/_lib/data-service";
import { redirect } from "next/navigation";

export default async function Page({ searchParams }) {
  const { id: reservationId } = await searchParams;

  if (!reservationId) redirect("/account/reservations");

  const reservation = await getBooking(reservationId);

  const { maxCapacity } = await getCabin(reservation.cabinId);

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Edit Reservation #{reservationId}
      </h2>

      <UpdateReservationForm
        reservation={reservation}
        maxCapacity={maxCapacity}
      />
    </div>
  );
}
