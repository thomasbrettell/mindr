import {Grid} from "@chakra-ui/react";
import modesData from "./Modes/modesData";
import Mode from "./Modes/Mode";
import {AnimateSharedLayout} from "framer-motion";

const ModeSelection = (props) => {
  const {mode, roomRef, isHost} = props;

  return (
    <AnimateSharedLayout>
      <Grid templateColumns="repeat(2, 1fr)" gap={4} w="full">
        {modesData.map((modeData) => (
          <Mode
            key={modeData.value}
            name={modeData.name}
            value={modeData.value}
            color={modeData.color}
            selected={mode === modeData.value}
            roomRef={roomRef}
            isHost={isHost}
          />
        ))}
      </Grid>
    </AnimateSharedLayout>
  );
};

export default ModeSelection;
