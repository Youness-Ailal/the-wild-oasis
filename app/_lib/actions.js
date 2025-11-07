"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { createBooking, updateGuest } from "./data-service";
import { supabase } from "./supabase";
import { redirect } from "next/navigation";

export const signInAction = async () =>
  await signIn("google", { redirectTo: "/account" });

export const signOutAction = async () => await signOut({ redirectTo: "/" });

export const updateProfile = async (formData) => {
  const session = await auth();

  if (!session) throw new Error("Action denied");

  const nationalID = formData.get("nationalID");
  const [nationality, countryFlag] = formData.get("nationality").split("%");

  const regex = /^[A-Za-z0-9]{5,12}$/;

  if (!regex.test(nationalID)) throw new Error("Invalid National ID !");

  const updateData = { nationalID, nationality, countryFlag };

  const { data, error } = await supabase
    .from("guests")
    .update(updateData)
    .eq("id", session.user.guestId)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Guest could not be updated");
  }

  revalidatePath("/account/profile");
};

export const deleteBooking = async (bookingID) => {
  const session = await auth();
  const guestId = session.user.guestId;

  if (!session) throw new Error("Action denied");
  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingID)
    .eq("guestId", guestId);
  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }
  revalidatePath("/account/reservations");
};

export const updateReservation = async (formData) => {
  const session = await auth();
  const guestId = session.user.guestId;

  if (!session) throw new Error("Action denied");

  const numGuests = formData.get("numGuests");
  const observations = formData.get("observations");
  const bookingID = formData.get("reservationId");

  const data = { numGuests, observations };

  const { error } = await supabase
    .from("bookings")
    .update(data)
    .eq("id", bookingID)
    .eq("guestId", guestId);
  if (error) {
    console.error(error);
    throw new Error("Reservation could not be updated");
  }
  revalidatePath("/account/reservations");
  // revalidatePath(`/account/reservations/edit?id=${bookingID}`);
  redirect("/account/reservations");
};

export const createBookingAction = async (bookingData, formData) => {
  const session = await auth();
  if (!session) throw new Error("Action denied");

  const numGuests = formData.get("numGuests");
  const observations = formData.get("observations");
  await createBooking({
    ...bookingData,
    numGuests,
    observations,
    extrasPrice: 0,
    hasBreakfast: false,
    isPaid: false,
    status: "unconfirmed",
  });

  revalidatePath(`/cabins/${bookingData.cabinId}`);
  redirect("/thank-you");
};
