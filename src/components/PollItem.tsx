import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Flex, Text, Button, Spacer, Link } from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';

import { auth } from '../firebase';
import { removePoll, Poll } from '../db';

interface PollItemProps {
  uuid: string;
  poll: Poll;
}

function PollItem({ uuid, poll }: PollItemProps) {
  const onDelete = () => removePoll(uuid);

  return (
    <Flex>
      <Text fontSize="3xl">
        <Link as={RouterLink} to={`/polls/${auth.currentUser?.uid}/${uuid}`}>
          {poll.name} <ExternalLinkIcon mx="2px" />
        </Link>
      </Text>
      <Spacer />
      <Button
        bgColor="teal"
        style={{
          marginRight: '0.5vw',
        }}
      >
        Edit
      </Button>
      <Button bgColor="red.600" onClick={onDelete}>
        Delete
      </Button>
    </Flex>
  );
}

export default PollItem;
