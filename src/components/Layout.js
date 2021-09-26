import Header from './Header/Header';
import { Container } from '@chakra-ui/react';

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <Container as="main" maxW="container.xs" paddingY='7' minW='container.min'>
        {children}
      </Container>
    </>
  );
};

export default Layout;
