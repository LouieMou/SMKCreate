import { Text } from "react-konva";

export default function KonvaText(props) {
  const fontSize1024 = 18;
  const fontSize512 = 16;

  return (
    <>
      {props.dimensions.width === 1024 ? (
        <>
          <Text
            x={props.dimensions.width / 2}
            y={props.dimensions.height / 2}
            text="Create your own artwork"
            fontSize={fontSize1024}
            fontFamily="Open sans"
            fill="black"
            fontStyle="bold"
            offsetX={120}
            offsetY={150}
          />
          <Text
            x={props.dimensions.width / 2}
            y={props.dimensions.height / 2 + 10}
            text="Drag items from your favorite list onto the empty canvas."
            fontSize={fontSize1024}
            fontFamily="Open sans"
            fill="black"
            offsetX={260}
            offsetY={110}
          />
          <Text
            x={props.dimensions.width / 2}
            y={props.dimensions.height / 2 + 40}
            text="Let AI help you to generate your final image."
            fontSize={fontSize1024}
            fontFamily="Open sans"
            fill="black"
            offsetX={190}
            offsetY={110}
          />
          <Text
            x={props.dimensions.width / 2}
            y={props.dimensions.height / 2 + 70}
            text="Guide it with a text prompt."
            fontSize={fontSize1024}
            fontFamily="Open sans"
            fill="black"
            offsetX={126}
            offsetY={110}
          />
          <Text
            x={props.dimensions.width / 2}
            y={props.dimensions.height / 2 + 130}
            text="Let your creativity flow and see where it takes you!"
            fontSize={fontSize1024}
            fontFamily="Open sans"
            fill="black"
            offsetX={230}
            offsetY={110}
          />
        </>
      ) : (
        <>
          <Text
            x={props.dimensions.width / 2}
            y={props.dimensions.height / 2}
            text="Create your own artwork"
            fontSize={fontSize512}
            fontFamily="Open sans"
            fill="black"
            fontStyle="bold"
            offsetX={110}
            offsetY={110}
          />
          <Text
            x={props.dimensions.width / 2}
            y={props.dimensions.height / 2 + 10}
            text="Drag items from your favorite list onto the empty canvas."
            fontSize={fontSize512}
            fontFamily="Open sans"
            fill="black"
            offsetX={225}
            offsetY={70}
          />
          <Text
            x={props.dimensions.width / 2}
            y={props.dimensions.height / 2 + 40}
            text="Let AI help you to generate your final image."
            fontSize={fontSize512}
            fontFamily="Open sans"
            fill="black"
            offsetX={170}
            offsetY={70}
          />
          <Text
            x={props.dimensions.width / 2}
            y={props.dimensions.height / 2 + 70}
            text="Guide it with a text prompt."
            fontSize={fontSize512}
            fontFamily="Open sans"
            fill="black"
            offsetX={110}
            offsetY={70}
          />
          <Text
            x={props.dimensions.width / 2}
            y={props.dimensions.height / 2 + 130}
            text="Let your creativity flow and see where it takes you!"
            fontSize={fontSize512}
            fontFamily="Open sans"
            fill="black"
            offsetX={200}
            offsetY={70}
          />
        </>
      )}
    </>
  );
}
