import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useAsyncFn } from 'react-use';

import { FaSignInAlt, FaUser } from 'react-icons/fa';
import { Container, Flex, Spacer, Heading, Button, Box } from '@chakra-ui/react';

import { createPoll } from '../db';
import { AuthContext } from './AuthProvider';

function Header() {
  const user = useContext(AuthContext);
  const [creatingPollState, onCreatePoll] = useAsyncFn(
    () =>
      new Promise((resolve, reject) => {
        // Additional waiting to prevent creating lots of polls in one time
        createPoll()
          .then((res) => {
            setTimeout(() => {
              resolve(res);
            }, 300);
          })
          .catch(reject);
      }),
  );

  return (
    <Container maxW="container.xl">
      <Flex>
        <Heading as="h1" size="xl">
          Fuzzy Voting App
        </Heading>
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
