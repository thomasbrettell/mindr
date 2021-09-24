import {Image, Box, Text, AspectRatio, Flex} from "@chakra-ui/react";
import {
  motion,
  useMotionValue,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import {useState} from "react";
import RejectText from "./RejectText";
import ApproveText from "./ApproveText";

const responseThreshold = 150;

const MovieImage = (props) => {
  const {movie, onMakeResponse} = props;
  const [hover, setHover] = useState(false);
  const x = useMotionValue(0);
  const input = [-200, 0, 200];
  const output = [-15, 0, 15];
  const rotate = useTransform(x, input, output);
  const [response, setResponse] = useState("");

  const mouseEnterHandler = () => {
    setHover(true);
  };

  const mouseLeaveHandler = () => {
    setHover(false);
  };

  const handleSetResponse = (e, info) => {
    const offsetAmt = info.offset.x;

    if (offsetAmt < -responseThreshold) {
      setResponse("reject");
    } else if (offsetAmt > responseThreshold) {
      setResponse("approve");
    } else {
      setResponse("");
    }
  };

  const handleMakeResponse = (e) => {
    setResponse("");
    if (response) {
      onMakeResponse(e, response);
    }
  };

  return (
    <AspectRatio
      ratio={2 / 3}
      h="full"
      maxH="550px"
      borderRadius="10px"
      overflow="hidden"
      onMouseEnter={mouseEnterHandler}
      onMouseLeave={mouseLeaveHandler}
      as={motion.div}
      drag="x"
      dragConstraints={{left: 0, right: 0}}
      dragElastic={0.5}
      style={{x, rotate}}
      onDragEnd={handleMakeResponse}
      onDrag={handleSetResponse}
    >
      <Box pos="relative">
        <Box
          pos="absolute"
          w="full"
          h="full"
          d="flex"
          p="15px"
          bgGradient={
            !hover
              ? "linear(to-t, #000000c1, #00000000, #00000000, #00000000)"
              : "linear(to-t, #000000c1, #000000c1, #000000c1, #0000006e, #00000000)"
          }
          alignItems="flex-end"
          zIndex={1}
        >
          <AnimatePresence>
            {response === "reject" && <RejectText key='reject-text'/>}
          </AnimatePresence>
          <AnimatePresence>
            {response === "approve" && <ApproveText key='approve-text'/>}
          </AnimatePresence>
          <Box color="white">
            <Text fontSize="2xl" fontWeight="bold">
              {movie.title}
            </Text>
            <Text>{new Date(movie.release_date).getFullYear()}</Text>
            {hover && (
              <>
                <Text mt="15px">{movie.overview}</Text>
                <Flex mt="15px">
                  <Flex mr="10px" flexDir="column">
                    <Text fontWeight="bold">Director</Text>
                    <Text fontWeight="bold" mt="7px">
                      Stars
                    </Text>
                  </Flex>
                  <Flex flexDir="column">
                    <Text>{movie.director}</Text>
                    <Flex flexDir="column" mt="7px">
                      <Text>{movie.cast[0]}</Text>
                      <Text>{movie.cast[1]}</Text>
                    </Flex>
                  </Flex>
                </Flex>
              </>
            )}
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
