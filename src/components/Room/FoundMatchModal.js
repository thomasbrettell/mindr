import {
  Modal,
  ModalOverlay,
  Box,
  Image,
  Button,
  AspectRatio,
  Text,
} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import getMovieDataById from "../../utils/getMovieDataById";
import {update} from "@firebase/database";

const FoundMatchModal = (props) => {
  const {matchData, userData, userRef} = props;
  const [matchMovieData, setMatchData] = useState();
  const {continue: hasContinued} = userData;

  useEffect(() => {
    const fetchData = async () => {
      const movieData = await getMovieDataById(matchData.id);
      setMatchData(movieData);
    };
    fetchData();
  }, [matchData.id]);

  const continueHandler = () => {
    update(userRef, {
      continue: true,
    });
  };

  return (
    <Modal isOpen={true}>
      <ModalOverlay />
      {matchMovieData && (
        <Box
          w="100vw"
          h="100vh"
          pos="absolute"
          top="0"
          left="0"
          display="flex"
          zIndex="1500"
          p="20px"
        >
          <Box
            bg="white"
            maxW="400px"
            w="full"
            margin="auto"
            borderRadius="10px"
            overflow="hidden"
          >
            <Box display="flex" justifyContent="center" p="10px">
              <Box
                color="purple.400"
                fontWeight="bold"
                border="5px solid"
                fontSize="lg"
                borderColor="purple.400"
                borderRadius="10px"
                padding="2px 10px"
                position="relative"
                zIndex="3"
                _after={{
                  content: "' '",
                  display: "block",
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  backgroundColor: "purple.400",
                  opacity: 0.25,
                  top: 0,
                  left: 0,
                }}
              >
                <Text>YOU'RE MOVIE IS</Text>
              </Box>
            </Box>
            <AspectRatio ratio={2 / 3}>
              <Image
                src={`https://image.tmdb.org/t/p/w500/${matchMovieData.poster_path}`}
                alt={matchMovieData.title}
                loading="lazy"
              />
            </AspectRatio>
            <Box p="10px" d="flex" justifyContent="space-around">
              <Button
                onClick={continueHandler}
                colorScheme="purple"
                disabled={hasContinued}
              >
                {hasContinued ? "Waiting for other users" : "See all results!"}
              </Button>
            </Box>
          </Box>
        </Box>
      )}
    </Modal>
  );
};

export default FoundMatchModal;
