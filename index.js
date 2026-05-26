const express = require("express");
const axios = require("axios");

const app = express();

app.get("/", (req, res) => {
  res.send("Hello from Render");
});

app.get("/test-truckstop", async (req, res) => {
  try {
    const response = await axios.get("https://truckstop.com", {
      headers: {
        "User-Agent": "Mozilla/5.0"
      },
      timeout: 15000
    });

    res.send({
      status: response.status,
      dataPreview: response.data.slice(0, 300)
    });

  } catch (err) {
    res.send({
      error: err.response?.status || err.message
    });
  }
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("Server running on port", port);
});