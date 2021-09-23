import {Box, Flex} from "@chakra-ui/react";
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
  const [movie, setMovie] = useState();
  const [movieI, setMovieI] = useState(0);
  const {roomData, roomRef} = props;

  const pushNewMovie = useCallback(() => {
    push(
      child(roomRef, "/movieList"),
      generateRandomMovie(getMovieListData(roomData.mode))
    );
  }, [roomRef, roomData.mode]);

  useEffect(() => {
    if (roomData.movieList.length === 0) {
      return;
    }

    const fetchData = async () => {
      setMovie(await getMovieDataById(roomData.movieList[movieI]));
    };
    fetchData();
  }, [movieI, roomData.movieList]);

  const newMovieHandler = (e, response) => {
    setDoc(
      doc(firestore, "movieData", `${movie.id}`),
      {
        title: movie.title,
        release_date: movie.release_date,
        director: movie.director,
        cast: movie.cast,
        [response]: increment(1),
        genres: movie.genres,
      },
      {merge: true}
    );
    setMovieI(movieI + 1);
    pushNewMovie();
  };

  useEffect(() => {
    pushNewMovie();
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
          onClick={(e) => newMovieHandler(e, "reject")}
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
          onClick={(e) => newMovieHandler(e, "approve")}
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
