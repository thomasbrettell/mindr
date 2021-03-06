import {Button} from "@chakra-ui/react";
import {update} from "@firebase/database";

const StartButton = (props) => {
  const {canStart, roomRef} = props;

  const startHandler = () => {
    update(roomRef, {
      stage: 'started',
    });
  };

  return (
    <Button colorScheme="purple" disabled={!canStart} onClick={startHandler}>
      Start
    </Button>
  );
};

export default StartButton;
