export function ContactSkeleton() {
  return (
    <div className="flex flex-col w-full md:w-2/3 gap-4 items-stretch animate-pulse">
      {/* Title */}
      <div className="flex w-full items-center justify-center md:justify-start">
        <div className="h-7 w-32 bg-gray-200 rounded-md" />
      </div>

      {/* Contact list */}
      <div className="flex flex-col w-full gap-2">
        {/* Item */}
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex flex-row gap-2 items-center">
            <div className="w-5 h-5 bg-gray-300 rounded-full" />
            <div className="h-4 w-48 bg-gray-200 rounded-md" />
          </div>
        ))}

        {/* Divider */}
        <hr className="my-2 md:my-4 border-gray-200" />

        {/* Address */}
        <div className="flex flex-row gap-2 items-center">
          <div className="w-5 h-5 bg-gray-300 rounded-full" />
          <div className="h-4 w-full max-w-md bg-gray-200 rounded-md" />
        </div>
      </div>
    </div>
  )
}
