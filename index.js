const express = require("express");
const axios = require("axios");

const app = express();

app.get("/song", async (req, res) => {
  try {
    const query = req.query.q;
    if (!query) return res.json({ error: "No query" });

    // ⚠️ demo replace with real source later
    const audioUrl = "https://files.catbox.moe/2pmcyg.mp4"; // test audio/video

    res.json({
      title: query,
      artist: "Rocky",
      audio: audioUrl
    });

  } catch (e) {
    res.json({ error: e.message });
  }
});

module.exports = app;
