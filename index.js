const express = require("express");
const axios = require("axios");

const app = express();

app.get("/", (req, res) => {
  res.json({
    status: "API Running ✅",
    author: "Rocky Chowdhury"
  });
});

app.get("/song", async (req, res) => {
  try {
    const query = req.query.q;
    if (!query) return res.json({ error: "No query" });

    // external working API (example)
    const api = `https://api.popcat.xyz/lyrics?song=${encodeURIComponent(query)}`;

    const data = await axios.get(api);

    res.json({
      title: query,
      artist: "Unknown",
      audio: "https://files.catbox.moe/2pmcyg.mp4" // fallback demo audio
    });

  } catch (e) {
    res.json({ error: e.message });
  }
});

module.exports = app;
