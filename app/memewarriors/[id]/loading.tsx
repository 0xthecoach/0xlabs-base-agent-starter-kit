export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-pink-500"></div>
      </div>
      <div className="text-center mt-8">
        <h2 className="text-2xl font-pixel text-pink-400">Loading Warrior Data...</h2>
        <p className="text-gray-300 mt-2">Please wait while we fetch the warrior's details</p>
      </div>
    </div>
  )
}
