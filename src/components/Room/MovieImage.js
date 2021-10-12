import {Image, Box, Text, Flex} from "@chakra-ui/react";
import {
  motion,
  useMotionValue,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import {useEffect, useState} from "react";
import RejectText from "./RejectText";
import ApproveText from "./ApproveText";
import InfoIcon from "../../assets/InfoIcon";

const responseThreshold = 100;

const MovieImage = (props) => {
  const {movie, onMakeResponse, z, currentResponse} = props;
  const [initialLoad, setInitialLoad] = useState(true);

  const [showDetails, setShowDetails] = useState(false);
  const x = useMotionValue(0);
  const input = [-200, 0, 200];
  const output = [-15, 0, 15];
  const rotate = useTransform(x, input, output);
  const [response, setResponse] = useState("");

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
    if (response) {
      onMakeResponse(e, response);
    }
  };

  useEffect(() => {
    if (!initialLoad && currentResponse) {
      setResponse(currentResponse);
      onMakeResponse("", currentResponse);
    } else {
      setInitialLoad(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentResponse, onMakeResponse]);

  return (
    <Box
      pos="absolute"
      top="0"
      left="0"
      ratio={2 / 3}
      h="full"
      w="full"
      zIndex={z}
      borderRadius="10px"
      overflow="hidden"
      background="white"
      as={motion.div}
      drag
      dragConstraints={{left: 0, right: 0, top: 0, bottom: 0}}
      dragElastic={0.5}
      dragTransition={{bounceStiffness: 400, bounceDamping: 20}}
      style={{x, rotate}}
      onDragEnd={handleMakeResponse}
      onDrag={handleSetResponse}
      whileDrag={{
        scale: 1.025,
        boxShadow: "rgb(38, 57, 77) 0px 20px 30px -10px",
      }}
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      exit={{
        x: response === "approve" ? window.innerWidth : -window.innerWidth,
        transition: {duration: 0.5},
      }}
    >
      <Box
        pos="absolute"
        w="full"
        h="full"
        d="flex"
        p="15px"
        bgGradient={
          !showDetails
            ? "linear(to-t, #000000c1, #00000000, #00000000, #00000000)"
            : "linear(to-t, #000000c1, #000000c1, #000000c1, #0000006e, #00000000)"
        }
        alignItems="flex-end"
        zIndex={1}
        justifyContent="space-between"
      >
        <AnimatePresence>
          {response === "reject" && <RejectText key="reject-text" />}
        </AnimatePresence>
        <AnimatePresence>
          {response === "approve" && <ApproveText key="approve-text" />}
        </AnimatePresence>
        <Box color="white">
          <Text fontSize="2xl" fontWeight="bold">
            {movie.title}
          </Text>
          <Text>{new Date(movie.release_date).getFullYear()}</Text>
          {showDetails && <MovieImageDetails movie={movie} />}
        </Box>
        <Box
          as="button"
          minW="24px"
          minH="24px"
          w="24px"
          h="24px"
          color="white"
          m="24px 12px"
          onClick={() => setShowDetails(!showDetails)}
        >
          <InfoIcon />
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
        background="white"
      />
    </Box>
  );
};

export default MovieImage;

const MovieImageDetails = ({movie}) => {
  return (
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
            {!movie.cast.length && <Text>N/A</Text>}
            {!!movie.cast.length &&
              movie.cast.map((el) => <Text key={el}>{el}</Text>)}
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};
