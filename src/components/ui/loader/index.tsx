type LoaderSpinnerProps = {
  isLoading: boolean
}

export const LoaderSpinner: React.FC<LoaderSpinnerProps> = ({ isLoading }) => {
  if (!isLoading) return null

  return (
    <div className="fixed inset-0 z-[9999] bg-opacity-50 backdrop-blur-sm flex items-center justify-center pointer-events-auto">
      <div className="flex justify-center">
        <div className="w-16 h-16 border-4 border-gray-500 border-dashed rounded-full animate-spin" />
      </div>
    </div>
  )
}
