export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="inline-block h-16 w-16 animate-spin rounded-full border-4 border-solid border-pink-500 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
        <p className="mt-4 text-xl font-pixel text-pink-400">Loading Battle Arena...</p>
      </div>
    </div>
  )
}
