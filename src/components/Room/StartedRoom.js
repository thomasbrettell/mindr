import {Box, Flex, AspectRatio} from "@chakra-ui/react";
import {useEffect, useState, useCallback} from "react";
import CloseIcon from "../../assets/CloseIcon";
import TickIcon from "../../assets/TickIcon";
import {
  push,
  child,
  update,
  increment as dbIncrement,
} from "@firebase/database";
import MovieImage from "./MovieImage";
import getMovieListData from "../../utils/getMovieListData";
import {doc, setDoc, increment as fsIncrement} from "firebase/firestore";
import {firestore} from "../../firebase/firebaseClient";
import getMovieDataById from "../../utils/getMovieDataById";
import {AnimatePresence} from "framer-motion";
import FoundMatchModal from "./FoundMatchModal";

const generateRandomMovie = (modeData) => {
  const randomI = Math.floor(Math.random() * modeData.length);
  return modeData[randomI];
};

const StartedRoom = (props) => {
  const {roomData, roomRef, userData} = props;
  const [movies, setMovies] = useState([]);
  const [movieI, setMovieI] = useState(0);
  const [initialLoad, setInitialLoad] = useState(true);
  const [foundMatch, setFoundMatch] = useState()

  console.log(foundMatch)

  useEffect(() => {
    const foundApprovedMovie = roomData.responses.find(
      (movie) => {
        return movie.approvals === roomData.users.length
      }
    );
    foundApprovedMovie && setFoundMatch(foundApprovedMovie.id)
  }, [roomData.responses, roomData.users.length]);

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
    //storing longterm response data on firestore
    setDoc(
      doc(firestore, "movieData", `${movies[0].id}`),
      {
        title: movies[0].title,
        release_dsate: movies[0].release_date,
        director: movies[0].director,
        cast: movies[0].cast,
        [response]: fsIncrement(1),
        genres: movies[0].genres,
      },
      {merge: true}
    );

    update(child(roomRef, `/responses/${movies[0].id}`), {
      [response]: dbIncrement(1),
    });

    setMovieI(movieI + 1);
    pushNewMovie();
    setMovies((prevMovies) => prevMovies.slice(1));
    addNextMovie();
  };

  useEffect(() => {
    if (initialLoad && roomData.movieList.length >= 3) {
      if (movieI === 2) {
        setInitialLoad(false);
      }
      const fetchData = async () => {
        const newMovie = await getMovieDataById(roomData.movieList[movieI]);
        const newMovie2 = await getMovieDataById(
          roomData.movieList[movieI + 1]
        );
        const newMovie3 = await getMovieDataById(
          roomData.movieList[movieI + 2]
        );
        setMovieI(movieI + 3);
        setMovies((prevMovies) => [
          ...prevMovies,
          newMovie,
          newMovie2,
          newMovie3,
        ]);
      };
      fetchData();
      setInitialLoad(false);
    }
  }, [movieI, roomData.movieList, initialLoad]);

  //not like this // probs do server side, or host only client side?
  useEffect(() => {
    if (userData.isHost) {
      pushNewMovie();
      pushNewMovie();
      pushNewMovie();
      pushNewMovie();
    }
  }, [pushNewMovie, userData.isHost]);

  if (movies.length === 0) {
    return <p>Loading...</p>;
  }

  return (
    <>
    {foundMatch && <FoundMatchModal matchId={foundMatch}/>}
    <Box>
      <Box pos="relative">
        <AspectRatio ratio={2 / 3} h="full" maxH="550px" overflow="hidden">
          <Box />
        </AspectRatio>
        <AnimatePresence>
          {movies.map((movie, index) => (
            <MovieImage
              key={movie.id}
              id={movie.id}
              movie={movie}
              onMakeResponse={responseHandler}
              z={movies.length - index}
            />
          ))}
        </AnimatePresence>
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
    </>
  );
};

export default StartedRoom;
