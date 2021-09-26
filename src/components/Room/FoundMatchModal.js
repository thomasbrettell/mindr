import {Modal, ModalOverlay, Box, Image, Text} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import getMovieDataById from "../../utils/getMovieDataById";

const FoundMatchModal = (props) => {
  const {matchId} = props;
  const [matchData, setMatchData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const movieData = await getMovieDataById(matchId);
      setMatchData(movieData);
    };
    fetchData();
  });
  return (
    <Modal isOpen={true}>
      <ModalOverlay />
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
          margin="auto"
          bg="white"
          w="full"
          h="full"
          maxW="420"
          borderRadius="10px"
          overflow="hidden"
          d="flex"
          flexDir="column"
          justifyContent="space-between"
        >
          <Box h="full" d="flex" alignItems="center" justifyContent="center">
            <Text fontWeight="bold" fontSize='lg'>Your movie is...</Text>
          </Box>
          <Image
            src={
              matchData
                ? `https://image.tmdb.org/t/p/w500/${matchData.poster_path}`
                : ""
            }
          />
        </Box>
      </Box>
    </Modal>
  );
};

export default FoundMatchModal;
