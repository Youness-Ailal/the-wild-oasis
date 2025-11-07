import { auth } from "../_lib/auth";

export const metadata = {
  title: "Guest area",
};
async function page() {
  const seesion = await auth();

  return (
    <h2 className="font-semibold text-accent-400 text-2xl mb-7">
      Welcome, {seesion?.user?.name}
    </h2>
  );
}

export default page;
