export function ServicesSkeleton() {
  return (
    <div className="flex flex-col md:flex-row w-full gap-5 items-center animate-pulse">
      {[...Array(5)].map((_, index) => (
        <div
          key={index}
          className="flex w-full md:w-1/4 justify-center items-center bg-white h-24 shadow-xl border border-gray-200 rounded-2xl overflow-hidden"
        >
          <div className="h-5 w-32 bg-gray-300 rounded-md" />
        </div>
      ))}
    </div>
  )
}
