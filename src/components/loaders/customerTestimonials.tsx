export function customerTestimonialsSkeleton() {
  return (
    <div className="flex flex-col w-full md:w-2/3 gap-4 items-stretch animate-pulse">
      {/* Title */}
      <div className="flex w-full items-center justify-center md:justify-start">
        <div className="h-7 w-64 bg-gray-200 rounded-md" />
      </div>

      {/* Card */}
      <div className="flex flex-row w-full">
        <div className="flex flex-col w-full mx-auto bg-white shadow-xl border border-gray-200 rounded-2xl overflow-hidden">
          {/* Header */}
          <div className="flex items-center gap-4 p-4 bg-gray-100">
            <div className="w-8 h-8 bg-gray-300 rounded-full" />
            <div className="h-4 w-40 bg-gray-300 rounded-md" />
          </div>

          <hr className="border-t border-gray-200" />

          {/* Body */}
          <div className="flex flex-col gap-3 p-4">
            <div className="h-4 w-full bg-gray-200 rounded-md" />
            <div className="h-4 w-11/12 bg-gray-200 rounded-md" />
            <div className="h-4 w-10/12 bg-gray-200 rounded-md" />

            <div className="h-4 w-32 bg-gray-300 rounded-md self-end mt-2" />
          </div>
        </div>
      </div>
    </div>
  )
}
