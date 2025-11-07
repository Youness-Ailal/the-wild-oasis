import { getBookedDatesByCabinId, getCabin } from "@/app/_lib/data-service";

export async function GET(req, res) {
  try {
    const { id } = await res.params;
    const cabin = await getCabin(id);
    const bookedDates = await getBookedDatesByCabinId(id);
    return Response.json({ cabin: { ...cabin }, booked_dates: bookedDates });
  } catch (error) {
    return Response.json({ message: "Internal Error" });
  }
}
