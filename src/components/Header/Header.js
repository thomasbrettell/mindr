import {Container, Box} from "@chakra-ui/react";
import MindrLogo from "../../assets/MindrLogo";
import {Link as ChakraLink} from "@chakra-ui/react";
import {Link} from "react-router-dom";
import BetaText from "./BetaText";
import {useSelector} from "react-redux";

const Header = () => {
  const roomStage = useSelector((state) => state.app.roomStage);

  if (roomStage === "started") {
    return "";
  }

  return (
    <Box as="header" d="flex">
      <Container
        maxW="container.xs"
        h="50px"
        display="flex"
        justifyContent="center"
        paddingY="2"
        mt="7"
        minW="container.min"
      >
        <ChakraLink as={Link} to="/" d="flex" pos="relative">
          <MindrLogo />
          <BetaText />
        </ChakraLink>
      </Container>
    </Box>
  );
};

export default Header;
