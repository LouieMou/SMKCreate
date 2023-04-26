/* 
EVERYTIME WE MAKE MODIFICATIONS TO THIS FILE
WE NEED TO RESTART THE SERVER!
*/

require("dotenv").config(); // configure dotenv (needed to access the .env-file)
const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");

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
  //console.log("generate here", req.body.prompt);
  //console.log("generate here", req.body.image);
  //const image = req.body.image;
  const text = req.body.prompt;

  try {
    /*     if (prompt == null) {
      throw new Error("Uh oh, no prompt was provided");
    } */

    /*     if (image == null) {
      throw new Error("Uh oh, no image was provided");
    } */

    // Create a temporary file path
    //const tempFilePath = path.join(__dirname, "temp", "image.png");
    //const path = "/temp/image.png";

    // Write the base64 encoded image data to the temporary file
    //fs.writeFileSync(tempFilePath, image, "base64");

    // Create a read stream from the temporary file
    //const imageStream = fs.createReadStream(tempFilePath);
    /* 
    const OpenAIres = await openai.createImageEdit(
      fs.createReadStream(path),
      prompt,
      1,
      "512x512"
    ); */

    const OpenAIres = await openai.createImage({
      prompt: text,
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
