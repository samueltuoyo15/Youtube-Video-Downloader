import express from 'express'
import axios from 'axios'
import path from 'path'
import cors from 'cors'
import { fileURLToPath } from 'url'
const app = express()
const port = 10000
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
app.use(cors())
app.options('*', cors()) 
app.use(express.static(path.join(__dirname, 'dist')))
app.get('/download', async (req, res) => {
  const videoURL = req.query.url
  if (!videoURL) return res.status(400).send('YouTube URL is required')

  try {
    const options = {
      method: 'GET',
      url: `https://youtube-video-and-shorts-downloader1.p.rapidapi.com/api/getYTVideo`,
      params: { url: videoURL },
      headers: {
        'x-rapidapi-key': '866a85da84msh521938f4f02a87dp192e4ejsn5bcd1f2dca8c',
        'x-rapidapi-host': 'youtube-video-and-shorts-downloader1.p.rapidapi.com'
      }

    const response = await axios.request(options)
    console.log('API Response:', response.data)
    const videoData = {
      description: response.data.description,
      picture: response.data.picture,
      downloadLinkMP3: response.data.links[0].link,
      downloadLink: response.data.links[8].link
    }
   res.json(videoData)
  } catch (error) {
    console.error('Error fetching video:', error)
    res.status(500).send('Error downloading the video')
  }
})
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
    
