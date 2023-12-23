function CardLoadingSkeleton() {
  return (
    <div className="bg-card-bg-color h-[355px] w-48 overflow-y-hidden rounded-lg">
      <div className="h-[289px] w-full animate-pulse bg-zinc-600"></div>
      <section className="mt-2 grid animate-pulse grid-rows-2 items-center gap-1 px-4">
        <div className="h-6 w-full rounded-xl bg-zinc-600"></div>
        <div className="h-4 w-full rounded-xl bg-zinc-600"></div>
      </section>
    </div>
  );
}

export default CardLoadingSkeleton;
