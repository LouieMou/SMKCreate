/* 
EVERYTIME WE MAKE MODIFICATIONS TO THIS FILE
WE NEED TO RESTART THE SERVER!
*/

require("dotenv").config(); // configure dotenv (needed to access the .env-file)
const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const FormData = require("form-data");
const axios = require("axios");

const app = express();
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json());

const PORT = process.env.PORT || 8000;

/* REQUEST TO DALL-E OPENAI */
app.post("/generate", async (req, res) => {
  const text = req.body.prompt;
  const image = req.body.image;
  console.log("generate here in server called");

  try {
    const binaryData = Buffer.from(
      image.replace(/^data:image\/\w+;base64,/, ""),
      "base64"
    );
    const form = new FormData();
    form.append("image", binaryData, {
      filename: "image.png",
      contentType: "image/png",
    });
    form.append("prompt", text);
    form.append("n", "1");
    form.append("size", "512x512");

    const response = await axios.post(
      "https://api.openai.com/v1/images/edits",
      form,
      {
        headers: {
          ...form.getHeaders(),
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    const generatedImage = response.data.data[0].url;

    return res.status(200).json({
      generatedImage: generatedImage,
    });
  } catch (error) {
    console.log("Error in the generate:", error.message);
    return res.status(500).json({
      error: error.message,
    });
  }
});

/* ALWAYS IN THE END */
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
