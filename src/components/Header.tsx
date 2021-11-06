import React from 'react';
import { Container, Flex, Spacer, Heading, Button, Box } from '@chakra-ui/react';

function Header() {
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
      </Flex>
    </Container>
  );
}

export default Header;
