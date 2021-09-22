import {Box, Flex} from "@chakra-ui/react";
import axios from "axios";
import {useEffect, useState, useCallback} from "react";
import CloseIcon from "../../assets/CloseIcon";
import TickIcon from "../../assets/TickIcon";
import popularMovies from "../../movieLists/popularMovies";
import topRatedMovies from "../../movieLists/topRatedMovies";
import {push, child} from "@firebase/database";
import MovieImage from "./MovieImage";

const generateRandomMovie = () => {
  const randomI = Math.floor(Math.random() * topRatedMovies.length);
  return topRatedMovies[randomI];
};

const StartedRoom = (props) => {
  const [movie, setMovie] = useState();
  const [movieI, setMovieI] = useState(0);
  const {roomData, roomRef} = props;

  const pushNewMovie = useCallback(() => {
    push(child(roomRef, "/movieList"), generateRandomMovie());
  }, [roomRef]);

  useEffect(() => {
    if (roomData.movieList.length === 0) {
      return;
    }

    axios
      .get(
        `https://api.themoviedb.org/3/movie/${roomData.movieList[movieI]}?api_key=${process.env.REACT_APP_TMDB_API_KEY}`
      )
      .then((response) => {
        setMovie(response.data);
      });
  }, [movieI, roomData.movieList]);

  const newMovieHandler = () => {
    pushNewMovie();
    setMovieI(movieI + 1);
  };

  useEffect(() => {
    pushNewMovie();
  }, [pushNewMovie]);

  if (!movie) {
    return <p>Loading...</p>;
  }

  return (
    <Box>
      <MovieImage movie={movie} />
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
