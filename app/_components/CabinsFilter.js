"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
const filters = [
  { value: "all", label: "All cabins" },
  { value: "small", label: "1–3 guests" },
  { value: "medium", label: "4–8 guests" },
  { value: "large", label: "9–12 guests" },
];
function CabinsFilter() {
  const searchParmas = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const handleFilter = (filter) => {
    const params = new URLSearchParams(searchParmas);
    params.set("capacity", filter);
    router.push(`${pathname}?${params.toString()}`);
  };

  const activeFilter = searchParmas.get("capacity") ?? "all";
  return (
    <div className="border border-primary-900 flex ml-auto mb-5 justify-end self-end">
      {filters.map((filter) => (
        <button
          key={filter.value}
          onClick={() => handleFilter(filter.value)}
          className={`px-5 py-2 cursor-pointer hover:bg-primary-700 ${
            activeFilter === filter.value ? "bg-primary-700" : ""
          }`}>
          {filter.label}
        </button>
      ))}
    </div>
  );
}

export default CabinsFilter;
