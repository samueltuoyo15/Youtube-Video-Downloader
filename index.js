import express from 'express'
import ytdl from '@distube/ytdl-core'
import path from 'path'
import cors from 'cors'
import { fileURLToPath } from 'url'

const app = express()
const port = 3000

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use(express.static(path.join(__dirname, 'dist')))
app.use(cors())
app.get('/download', async (req, res) => {
  let videoURL = req.query.url

  if (!ytdl.validateURL(videoURL)) {
    return res.status(400).send('Invalid YouTube URL')
  }

  try {
    const videoInfo = await ytdl.getInfo(videoURL)
    const title = videoInfo.videoDetails.title.replace(/[\/\\?%*:|"<>]/g, '')

    res.setHeader('Content-Type', 'video/mp4')
    res.setHeader('Content-Disposition', `attachment; filename="${title}.mp4"`)
    ytdl(videoURL, { quality: 'highestvideo', filter: format => format.hasAudio && format.hasVideo }).pipe(res)
  } catch (error) {
    console.error('Error downloading the video:', error)
    res.status(500).send('Error downloading the video')
  }
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})

export default app
