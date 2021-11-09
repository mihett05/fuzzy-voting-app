import React from 'react';
import { Box, Flex, Heading, IconButton, Radio, RadioGroup, Spacer, Stack } from '@chakra-ui/react';

import { Poll, sortByTimestamp } from '../db';

interface PollVoteProps {
  poll: Poll;
  ownerId: string;
  pollId: string;
}

function PollVote({ poll, ownerId, pollId }: PollVoteProps) {
  const sortedVariantsUuids = poll.variants !== undefined ? sortByTimestamp(poll.variants) : [];

  if (!poll.variants) {
    return <Heading fontSize="2xl">Poll doesn't have variants</Heading>;
  }

  return (
    <>
      <Heading fontSize="2xl">Choose a variant:</Heading>
      <RadioGroup
        style={{
          margin: '1em 0',
        }}
      >
        <Stack>
          {sortedVariantsUuids.map((uuid) => (
            <Radio value={uuid} key={uuid}>
              <Heading fontSize="lg">{poll.variants && poll.variants[uuid].content}</Heading>
            </Radio>
          ))}
        </Stack>
      </RadioGroup>
    </>
  );
}

export default PollVote;
