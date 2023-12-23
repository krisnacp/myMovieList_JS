function MovieDetailsLoadingSkeleton() {
  return (
    <div className="relative h-[400px]">
      {/* backdrop image movie */}
      <div className="flex h-[400px] items-center justify-center bg-zinc-800">
        <div className="spin"></div>
      </div>
      {/* content section */}
      <div className="absolute inset-y-0 flex animate-pulse items-center gap-4 px-10">
        {/* poster section */}
        <div className="h-[300px] w-[200px] rounded-md bg-zinc-600"></div>
        {/* movie details section */}
        <section className="w-96">
          <div className="mb-3 h-8 w-72 rounded-2xl bg-zinc-600"></div>
          <div className="mb-3 h-6 w-52 rounded-2xl bg-zinc-600"></div>
          <div className="mb-3 flex items-center gap-3">
            <div className="h-7 w-7 rounded-full bg-zinc-600"></div>
            <div className="h-7 w-7 rounded-full bg-zinc-600"></div>
            <div className="h-7 w-7 rounded-full bg-zinc-600"></div>
          </div>
          <div className="mb-3 h-4 w-36 rounded-2xl bg-zinc-600"></div>
          <section className="mt-1">
            <div className="mb-3 h-4 w-24 rounded-2xl bg-zinc-600"></div>
            <div className="mb-3 h-4 w-full rounded-2xl bg-zinc-600"></div>
          </section>
        </section>
      </div>
    </div>
  );
}

export default MovieDetailsLoadingSkeleton;
