const express = require("express");
const axios = require("axios");

const app = express();

app.get("/", (req, res) => {
  res.json({
    status: "Song API Running ✅",
    author: "Rocky Chowdhury"
  });
});

app.get("/song", async (req, res) => {
  try {
    const query = req.query.q;
    if (!query) return res.json({ error: "No query" });

    // 🔥 external working API (song link provider)
    const api = `https://vihangayt.me/tools/music?q=${encodeURIComponent(query)}`;
    const { data } = await axios.get(api);

    res.json({
      title: data.title || query,
      artist: data.author || "Unknown",
      audio: data.link   // 👉 direct mp3 link
    });

  } catch (e) {
    res.json({ error: e.message });
  }
});

module.exports = app;
