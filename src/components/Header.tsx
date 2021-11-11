import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { useAsyncFn } from 'react-use';

import { FaSignInAlt, FaUser } from 'react-icons/fa';
import { Container, Flex, Spacer, Heading, Button, Box } from '@chakra-ui/react';

import { auth } from '../firebase';
import { createPoll } from '../db';
import { AuthContext } from './AuthProvider';

function Header() {
  const user = useContext(AuthContext);
  const navigate = useNavigate();
  const [creatingPollState, onCreatePoll] = useAsyncFn(async () => {
    const result = await createPoll();
    navigate(`/polls/${auth.currentUser?.uid}/${result}/edit`);
    await new Promise<void>((resolve, reject) => {
      // Additional waiting to prevent creating lots of polls in one time
      setTimeout(() => {
        resolve();
      }, 300);
    });
  });

  return (
    <Container maxW="container.xl">
      <Flex>
        <Link to="/">
          <Heading as="h1" size="xl">
            Fuzzy Voting App
          </Heading>
        </Link>
        <Spacer />
        <Box p="2">
          <Button onClick={onCreatePoll} isLoading={creatingPollState.loading}>
            Create Poll
          </Button>
        </Box>
        <Box p="2">
          <Link to="/account">
            <Button>{user === null ? <FaSignInAlt /> : <FaUser />}</Button>
          </Link>
        </Box>
      </Flex>
    </Container>
  );
}

export default Header;
