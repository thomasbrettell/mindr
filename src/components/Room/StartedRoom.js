import {Box, Flex, AspectRatio} from "@chakra-ui/react";
import {useEffect, useState, useCallback} from "react";
import CloseIcon from "../../assets/CloseIcon";
import TickIcon from "../../assets/TickIcon";
import {push, child} from "@firebase/database";
import MovieImage from "./MovieImage";
import getMovieListData from "../../utils/getMovieListData";
import {doc, setDoc, increment} from "firebase/firestore";
import {firestore} from "../../firebase/firebaseClient";
import getMovieDataById from "../../utils/getMovieDataById";

const generateRandomMovie = (modeData) => {
  const randomI = Math.floor(Math.random() * modeData.length);
  return modeData[randomI];
};

const StartedRoom = (props) => {
  const {roomData, roomRef} = props;
  const [movies, setMovies] = useState([]);
  const [movieI, setMovieI] = useState(0);
  const [initialLoad, setInitialLoad] = useState(true);

  console.log(movies)

  const pushNewMovie = useCallback(() => {
    return push(
      child(roomRef, "/movieList"),
      generateRandomMovie(getMovieListData(roomData.mode))
    );
  }, [roomRef, roomData.mode]);

  const addNextMovie = async () => {
    const newMovie = await getMovieDataById(roomData.movieList[movieI]);
    setMovies((prevMovies) => [...prevMovies, newMovie]);
  };

  const responseHandler = (e, response) => {
    setDoc(
      doc(firestore, "movieData", `${movies[0].id}`),
      {
        title: movies[0].title,
        release_dsate: movies[0].release_date,
        director: movies[0].director,
        cast: movies[0].cast,
        [response]: increment(1),
        genres: movies[0].genres,
      },
      {merge: true}
    );

    setMovieI(movieI + 1);
    pushNewMovie();
    setMovies((prevMovies) => prevMovies.slice(1));
    addNextMovie();
  };

  useEffect(() => {
    if (initialLoad && roomData.movieList.length) {
      if (movieI === 2) {
        setInitialLoad(false);
      }
      const fetchData = async () => {
        const newMovie = await getMovieDataById(roomData.movieList[movieI]);
        setMovieI(movieI + 1);
        setMovies((prevMovies) => [...prevMovies, newMovie]);
      };
      fetchData();
    }
  }, [movieI, roomData.movieList, initialLoad]);

  useEffect(() => {
    pushNewMovie();
    pushNewMovie();
    pushNewMovie();
    pushNewMovie();
  }, [pushNewMovie]);

  if (movies.length === 0) {
    return <p>Loading...</p>;
  }

  return (
    <Box>
      <Box pos="relative">
        <AspectRatio ratio={2 / 3} h="full" maxH="550px" overflow="hidden">
          <Box />
        </AspectRatio>
        {movies.map((movie, index) => (
          <MovieImage
            key={movie.id}
            id={movie.id}
            movie={movie}
            onMakeResponse={responseHandler}
            z={movies.length - index}
          />
        ))}
      </Box>
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
          onClick={(e) => responseHandler(e, "reject")}
          transition="background .1s ease-in-out, transform .1s ease-in-out"
          _hover={{
            background: "red.50",
          }}
          _active={{
            transform: "scale(0.95)",
          }}
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
          onClick={(e) => responseHandler(e, "approve")}
          transition="background .1s ease-in-out, transform .1s ease-in-out"
          _hover={{
            background: "green.50",
          }}
          _active={{
            transform: "scale(0.95)",
          }}
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
