const express = require('express')
const apicache = require('apicache')
const rateLimit = require('express-rate-limit')
const Lyricist = require('@noise-machines/lyricist')

require('dotenv').config()

const lyricist = new Lyricist(
  process.env.API_KEY
)

const app = express()
const cache = apicache.middleware

// Limit 10 requests a minute per IP
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 10
})

app.use(limiter)
app.use(cache('5 minutes')) // Cache api data for 5 minutes

app.get('/search/:query', async (req, res) => {
  let songs = await lyricist.search(req.params.query, { page: 1 })
  songs = songs.filter((item) => {
    if ( // If the id are any of those (Genuis, Spotify, and something else) then don't include the song
      item.primary_artist.id === 204611 ||
      item.primary_artist.id === 226635 ||
      item.primary_artist.id === 69342
    ) {
      return false
    } else {
      return true
    }
  })
  res.send(songs)
})

app.get('/lyrics/:id', async (req, res) => {
  try {
    const song = await lyricist.song(req.params.id, { fetchLyrics: true })
    res.send(song)
  } catch {
    res.send('Lyrics Unavailable')
  }
})

module.exports = {
  path: '/api/',
  handler: app
}
