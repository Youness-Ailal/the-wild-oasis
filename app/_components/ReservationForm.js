"use client";

import { differenceInDays } from "date-fns";
import { useReservationContext } from "./ReservationProvider";
import { createBookingAction } from "../_lib/actions";
import { useFormStatus } from "react-dom";

function ReservationForm({ cabin, user }) {
  const { maxCapacity, regularPrice, discount, id: cabinId } = cabin;
  const { range, resetRange } = useReservationContext();

  const startDate = range.from;
  const endDate = range.to;
  const numNights = differenceInDays(endDate, startDate);
  const cabinPrice = numNights * regularPrice - discount;
  const totalPrice = numNights * regularPrice - discount;
  const guestId = user.guestId;

  const bookingData = {
    startDate,
    endDate,
    numNights,
    cabinPrice,
    cabinId,
    guestId,
    totalPrice,
  };

  // const createBookingWithData = createBookingAction.bind(null, bookingData);

  return (
    <div className="h-full">
      <div className="bg-primary-800 text-primary-300 px-16 py-2 flex justify-between items-center">
        <p>Logged in as </p>

        <div className="flex gap-4 items-center">
          <img
            // Important to display google profile images
            referrerPolicy="no-referrer"
            className="h-8 rounded-full"
            src={user.image}
            alt={user.name}
          />
          <p>{user.name}</p>
        </div>
      </div>

      <form
        action={async (formData) => {
          createBookingAction(bookingData, formData);
          resetRange();
        }}
        className="bg-primary-900 py-10 px-16 text-lg flex gap-5 flex-col h-full">
        <div className="space-y-2">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            name="numGuests"
            id="numGuests"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            required>
            <option disabled selected value="" key="">
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="observations">
            Anything we should know about your stay?
          </label>
          <textarea
            name="observations"
            id="observations"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            placeholder="Any pets, allergies, special requirements, etc.?"
          />
        </div>

        <div className="flex justify-end items-center gap-6">
          {!range.from || !range.to ? (
            <p className="text-primary-300 text-base">
              Start by selecting dates
            </p>
          ) : (
            <Button />
          )}
        </div>
      </form>
    </div>
  );
}

function Button() {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      className="bg-accent-500 px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300">
      {pending ? "Reserving..." : "Reserve now"}
    </button>
  );
}

export default ReservationForm;
