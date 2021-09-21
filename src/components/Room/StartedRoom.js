import {Image, Box, AspectRatio, Text, Flex} from "@chakra-ui/react";
import axios from "axios";
import {useEffect, useState} from "react";
import CloseIcon from "../../assets/CloseIcon";
import TickIcon from "../../assets/TickIcon";

const StartedRoom = () => {
  const [movie, setMovie] = useState();
  const [movieId, setMovieId] = useState(500);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.REACT_APP_TMDB_API_KEY}`
      )
      .then((response) => {
        setMovie(response.data);
      })
      .catch(() => {
        setMovieId(Math.floor(Math.random() * 1000));
      });
  }, [movieId]);

  const newMovieHandler = () => {
    setMovieId(Math.floor(Math.random() * 1000));
  };

  if (!movie) {
    return <p>Loading...</p>;
  }

  return (
    <Box>
      <AspectRatio
        ratio={2 / 3}
        h="full"
        maxH="550px"
        borderRadius="10px"
        overflow="hidden"
      >
        <Box pos="relative">
          <Box
            pos="absolute"
            w="full"
            h="full"
            d="flex"
            p="15px"
            bgGradient="linear(to-t, #000000c1, #00000000, #00000000, #00000000)"
            alignItems="flex-end"
            zIndex={1}
          >
            <Box color="white">
              <Text fontSize="2xl" fontWeight="bold">
                {movie.original_title}
              </Text>
              <Text>{new Date(movie.release_date).getFullYear()}</Text>
            </Box>
          </Box>
          <Image
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            pos="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
          />
        </Box>
      </AspectRatio>
      <Flex justifyContent="space-evenly" marginY="20px">
        <Box
          as="button"
          h="60px"
          w="60px"
          boxShadow="lg"
          rounded="md"
          borderRadius="full"
          color="red.400"
          d="flex"
          justifyContent="center"
          alignItems="center"
          onClick={newMovieHandler}
        >
          <Box w="40px" h="40px">
            <CloseIcon />
          </Box>
        </Box>
        <Box
          as="button"
          h="60px"
          w="60px"
          boxShadow="lg"
          rounded="md"
          borderRadius="full"
          color="green.400"
          d="flex"
          justifyContent="center"
          alignItems="center"
          onClick={newMovieHandler}
        >
          <Box w="40px" h="40px">
            <TickIcon />
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default StartedRoom;
