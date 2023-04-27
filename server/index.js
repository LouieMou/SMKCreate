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

const { Configuration, OpenAIApi } = require("openai");

const app = express();
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json());

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const PORT = process.env.PORT || 8000;

/* REQUESTS */

const config = {
  headers: {
    Authorization: "Bearer " + process.env.OPENAI_API_KEY,
    "Content-Type": "application/json",
  },
};

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server! " + process.env.OPENAI_API_KEY });
});

app.post("/generate", async (req, res) => {
  const text = req.body.prompt;
  console.log("generate here - prompt: ", text);

  try {
    const form = new FormData();
    form.append("image", fs.createReadStream("images/test.png"));
    form.append("mask", fs.createReadStream("images/test2.png"));
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

/* const form = new FormData();
form.append("image", fs.createReadStream(originalImageFile), {
  filename: originalImageFileName,
  contentType: "image/png",
});
form.append("mask", fs.createReadStream(maskedImageFile), {
  filename: maskedImageFileName,
  contentType: "image/png",
});
form.append("prompt", prompt);
form.append("n", "1");
form.append("size", size);
form.append("response_format", "url"); */

app.post("/generate", async (req, res) => {
  const text = req.body.prompt;
  console.log("generate here - prompt: ", text);
  //console.log("generate here", req.body.image);
  //const image = req.body.image;

  try {
    /*     if (prompt == "") {
      throw new Error("Uh oh, no prompt was provided");
    } */

    /*     if (image == null) {
      throw new Error("Uh oh, no image was provided");
    } */

    const OpenAIres = await openai.createImageEdit({
      image: fs.createReadStream("images/test.png"),
      prompt: text,
      mask: fs.createReadStream("images/test2.png"),
      n: 1,
      size: "512x512",
    });

    const generatedImage = OpenAIres.data.data[0].url;

    // Delete the temporary file after use
    //fs.unlinkSync(tempFilePath);

    return res.status(200).json({
      generatedImage: generatedImage,
    });
  } catch (error) {
    console.log("Error in the generate:", error.message);
  }
});

/* ALWAYS IN THE END */
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
