import React, { useContext } from 'react';
import { useNavigate } from 'react-router';

import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import { Container, Flex, Spacer, Heading, Button, Box } from '@chakra-ui/react';

import { auth } from '../firebase';
import { AuthContext } from './AuthProvider';

function Header() {
  const user = useContext(AuthContext);
  const navigate = useNavigate();

  const onAccountClick = () => {
    if (user === null) {
      navigate('/auth');
    } else {
      auth.signOut();
    }
  };

  return (
    <Container maxW="container.xl">
      <Flex>
        <Heading as="h1" size="xl">
          Fuzzy Voting App
        </Heading>
        <Spacer />
        <Box p="2">
          <Button>Create Poll</Button>
        </Box>
        <Box p="2">
          <Button onClick={onAccountClick}>{user === null ? <FaSignInAlt /> : <FaSignOutAlt />}</Button>
        </Box>
      </Flex>
    </Container>
  );
}

export default Header;
