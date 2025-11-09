import Spinner from "@/app/_components/Spinner";

export default function Loading() {
  return (
    <div className="grid items-center justify-center">
      <p>Loading cabin data ...</p>
      <Spinner />
    </div>
  );
}
