import {Container, Box} from "@chakra-ui/react";
import MindrLogo from "../../assets/MindrLogo";
import {Link as ChakraLink} from "@chakra-ui/react";
import {Link} from "react-router-dom";
import BetaText from "./BetaText";

const Header = () => {
  return (
    <Box as="header" d="flex">
      <Container
        maxW="container.xs"
        h="50px"
        display="flex"
        justifyContent="center"
        paddingY="2"
        mt="20px"
        minW="container.min"
      >
        <ChakraLink as={Link} to="/" d="flex" pos='relative'>
          <MindrLogo />
          <BetaText />
        </ChakraLink>
      </Container>
    </Box>
  );
};

export default Header;
