import { useState } from "react";
import { Configuration, OpenAIApi } from "openai";

//const { Configuration, OpenAIApi } = require("openai");
/* const configuration = new Configuration({
  apiKey: "your-api-key-string-goes-here",
});
const openai = new OpenAIApi(configuration); */

// https://github.com/openai/openai-node/issues/6

function DallE() {
  const [userPrompt, setUserPrompt] = useState("");
  const [dataURL, setDataURL] = useState();
  const [imageUrl, setImageUrl] = useState("");

  let configuration = new Configuration({
    apiKey: process.env.REACT_APP_API_KEY,
  });

  delete configuration.baseOptions.headers["User-Agent"];

  /* const configuration = new Configuration({
    apiKey: process.env.REACT_APP_API_KEY,
  }); */
  const openai = new OpenAIApi(configuration);

  const generateImage = async () => {
    const imageParameters = {
      prompt: userPrompt,
      n: 1,
      size: "256x256",
    };
    try {
      const response = await openai.createImage(imageParameters);
      const urlData = response.data.data[0].url;
      console.log(urlData);
      setImageUrl(urlData);
    } catch (error) {
      console.log(error);
    }
  };

  /*   const generateImage = async () => {
    const imageParameters = {
      prompt: userPrompt,
      n: 1,
      size: "256x256",
    };
    
    try {
      const response = await openai.createImage(imageParameters).then(setDataURL(response.data.data[0].url)).then(setImageUrl(dataURL)).then(console.log(imageUrl));

    } catch (error) {
        console.log(error)
    }
    //let urlData = response.data.data[0].url;
    //setImageUrl(urlData);
  }; */

  return (
    <div className="App">
      {imageUrl ? (
        <img src={imageUrl} className="image" alt="ai thing" />
      ) : (
        <img src="./icons/heart_unfilled_black.svg" className="image" alt="logo" />
      )}
      <h1>This is a test</h1>
      <p>Generate a unique image using DALL·E</p>
      <p>What do you want to see?</p>
      <input
        placeholder="A sunset on the Sydney Opera House"
        onChange={(e) => setUserPrompt(e.target.value)}
      />
      {userPrompt ? (
        <button onClick={() => generateImage()}>Generate</button>
      ) : (
        <></>
      )}
    </div>
  );
}

export default DallE;
