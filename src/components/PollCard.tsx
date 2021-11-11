import React from 'react';
import { useNavigate } from 'react-router';
import { Box, Button, Flex, Heading, Spacer, Text } from '@chakra-ui/react';
import { Poll } from '../db';

interface PollCardProps {
  uuid: string;
  name: string;
  poll: Poll;
}

function PollCard({ uuid, poll, name }: PollCardProps) {
  const navigate = useNavigate();
  const onVote = () => {
    navigate(`polls/${uuid}`);
  };
  return (
    <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden" p={5}>
      <Flex
        direction="column"
        style={{
          height: '100%',
        }}
      >
        <Heading>{poll.name}</Heading>

        <Spacer />
        <Box>
          <Flex direction="row-reverse">
            <Text>By {name}</Text>
          </Flex>
        </Box>
        <Box>
          <Flex>
            <Button onClick={onVote}>Vote</Button>
            <Spacer />
            <Text>{new Date(poll.timestamp).toLocaleString()}</Text>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}

export default PollCard;
