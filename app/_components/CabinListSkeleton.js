function CabinCardSkeleton() {
  return (
    <div className="flex border-primary-800 border animate-pulse">
      <div className="flex-1 relative bg-primary-800 min-h-[200px]" />

      <div className="flex-grow">
        <div className="pt-5 pb-4 px-7 bg-primary-950">
          <div className="h-6 bg-primary-800 rounded w-3/4 mb-3" />

          <div className="flex gap-3 items-center mb-2">
            <div className="h-5 w-5 bg-primary-800 rounded" />
            <div className="h-6 bg-primary-800 rounded w-40" />
          </div>

          <div className="flex gap-3 justify-end items-baseline mt-4">
            <div className="h-9 bg-primary-800 rounded w-24" />
            <div className="h-5 bg-primary-800 rounded w-16" />
          </div>
        </div>

        <div className="bg-primary-950 border-t border-t-primary-800 text-right">
          <div className="border-l border-primary-800 py-4 px-6 inline-block">
            <div className="h-6 bg-primary-800 rounded w-48" />
          </div>
        </div>
      </div>
    </div>
  );
}

function CabinListSkeleton() {
  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
      {Array.from({ length: 6 }).map((_, i) => (
        <CabinCardSkeleton key={i} />
      ))}
    </div>
  );
}

export default CabinListSkeleton;
