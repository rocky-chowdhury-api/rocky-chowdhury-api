const axios = require("axios");

export default async function handler(req, res) {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({
      error: "Please provide song name"
    });
  }

  try {
    // FREE API (working)
    const api = `https://api.aniketdev.me/search/soundcloud?query=${encodeURIComponent(query)}`;

    const data = await axios.get(api);

    if (!data.data || data.data.length === 0) {
      return res.status(404).json({
        error: "Song not found"
      });
    }

    const song = data.data[0];

    return res.json({
      title: song.title,
      artist: song.user.username,
      audio: song.stream_url
    });

  } catch (err) {
    return res.status(500).json({
      error: err.message
    });
  }
}
