import {Button} from "@chakra-ui/button";
import { update } from "@firebase/database";

const ReadyButton = (props) => {
  const {isReady, userRef} = props;

  const readyHandler = () => {
    update(userRef, {
      ready: !isReady,
    });
  };

  return (
    <Button colorScheme="purple" onClick={readyHandler}>
      {!isReady && "Ready"}
      {isReady && "Unready"}
    </Button>
  );
};

export default ReadyButton;
