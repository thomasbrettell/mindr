import {Image, Box, Text, AspectRatio} from "@chakra-ui/react";
import { useState } from "react";

const MovieImage = (props) => {
  const {movie} = props;
  const [hover, setHover] = useState(false)

  const mouseEnterHandler = () => {
    setHover(true)
  }

  const mouseLeaveHandler = () => {
    setHover(false)
  }

  return (
    <AspectRatio
      ratio={2 / 3}
      h="full"
      maxH="550px"
      borderRadius="10px"
      overflow="hidden"
      onMouseEnter={mouseEnterHandler}
      onMouseLeave={mouseLeaveHandler}
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
              {movie.title}
            </Text>
            <Text>{new Date(movie.release_date).getFullYear()}</Text>
            {hover && <Text>{movie.overview}</Text>}
          </Box>
        </Box>
        <Image
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          pos="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          alt={movie.title}
          loading="lazy"
        />
      </Box>
    </AspectRatio>
  );
};

export default MovieImage;
