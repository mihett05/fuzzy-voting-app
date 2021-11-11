import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { Heading, Radio, RadioGroup, Stack, Button } from '@chakra-ui/react';

import { Poll, sortByTimestamp, voteInPoll } from '../db';

interface PollVoteProps {
  poll: Poll;
  ownerId: string;
  pollId: string;
}

function PollVote({ poll, ownerId, pollId }: PollVoteProps) {
  const sortedVariantsUuids = poll.variants ? sortByTimestamp(poll.variants) : [];
  const [variant, setVariant] = useState(sortedVariantsUuids.length > 0 ? sortedVariantsUuids[0] : '');
  const navigate = useNavigate();
  const location = useLocation();

  const onVote = async () => {
    await voteInPoll(ownerId, pollId, variant);
    if (location.pathname.endsWith('view')) {
      navigate('..');
    }
  };

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
        value={variant}
        onChange={setVariant}
      >
        <Stack>
          {sortedVariantsUuids.map((uuid) => (
            <Radio value={uuid} key={uuid}>
              <Heading fontSize="lg">{poll.variants && poll.variants[uuid].content}</Heading>
            </Radio>
          ))}
        </Stack>
      </RadioGroup>
      <Button onClick={onVote} aria-label="Submit">
        Vote
      </Button>
    </>
  );
}

export default PollVote;
