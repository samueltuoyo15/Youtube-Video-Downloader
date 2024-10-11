import { useState } from 'react'
const App = () => {
  const [videoURL, setVideoURL] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [awaitText, setAwaitText] = useState<string>('')
  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setAwaitText('Fetching Video Info.....')
    setError(null)

    if (!videoURL.trim()) {
      setIsLoading(false)
      return
    }
    setAwaitText('Fetching Video Content......')
    try {
      const response = await fetch(`window.location.origin/download?url=${videoURL}`)
      if (response.ok) {
      const blob = await response.blob()
      const link = document.createElement('a')
      link.href = window.URL.createObjectURL(blob)
      link.setAttribute('download', 'true')
      link.click()
      setAwaitText('Done')
      setIsLoading(false)
     }else {
      setError('Failed to download video. Please check the URL.')
      console.log(response)
    }
  }
  
     catch(error) {
      setError('Failed to download the video. Please try again.')
      console.log(error, response)
       setIsLoading(false)
    }
  }

  return (
    <section className="select-none flex justify-center items-center flex-col bg-neutral-900 h-screen w-screen text-white text-center relative">
      <img src="/animate.png" className="w-72" alt="Animation" />
      <div>
        <h2 className="text-2xl">Download Your Favourite YouTube Video</h2>
        <h2 className="text-1xl">for free</h2>
      </div>

      <form onSubmit={submitForm} className="flex justify-center items-center mt-10">
        <input
          value={videoURL}
          required
          onChange={(e) => setVideoURL(e.target.value)}
          type="url"
          placeholder="Paste your URL here..."
          className="w-52 text-black rounded p-3"
        />
        <input type="submit" value="Download" className="bg-neutral-800 text-white rounded ml-3 p-3" />
      </form>

      {isLoading && (
        <div className="absolute inset-0 flex flex-col justify-center items-center bg-neutral-900 bg-opacity-70">
          <img src="/spinning-dots.svg" alt="Loading..." className="w-72" />
          <p className="block text-lg">{awaitText}</p>
        </div>
      )}

      {error && <p className="text-red-500 mt-5">{error}</p>}
    </section>
  )
}

export default App
