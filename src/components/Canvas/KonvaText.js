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
            offsetY={110}
          />
          <Text
            x={props.dimensions.width / 2}
            y={props.dimensions.height / 2}
            text="Drag items from your favorite list onto the canvas."
            fontSize={fontSize1024}
            fontFamily="Open sans"
            fill="black"
            offsetX={240}
            offsetY={190}
          />
          <Text
            x={props.dimensions.width / 2}
            y={props.dimensions.height / 2}
            text="Make sure to leave plenty of white space for a better result!"
            fontSize={fontSize1024}
            fontFamily="Open sans"
            fill="black"
            offsetX={240}
            offsetY={190}
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
            offsetX={90}
            offsetY={50}
          />
          <Text
            x={props.dimensions.width / 2}
            y={props.dimensions.height / 2}
            text="Drag items from your favorite list onto the canvas."
            fontSize={fontSize512}
            fontFamily="Open sans"
            fill="black"
            offsetX={165}
            offsetY={20}
          />

          <Text
            x={props.dimensions.width / 2}
            y={props.dimensions.height / 2}
            text="Make sure to leave plenty of white space for a better result!"
            fontSize={fontSize512}
            fontFamily="Open sans"
            fill="black"
            offsetX={200}
            offsetY={-10}
          />
        </>
      )}
    </>
  );
}
