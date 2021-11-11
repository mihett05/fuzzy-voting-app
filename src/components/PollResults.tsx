import React, { useMemo } from 'react';
import { Poll } from '../db';

import PollResultVariant from './PollResultVariant';
import { Heading, Text } from '@chakra-ui/react';

interface PollResultsProps {
  poll: Poll;
}

function PollResults({ poll }: PollResultsProps) {
  const votedPersons = poll.votes ? Object.keys(poll.votes).length : 0;
  const votes = useMemo(() => {
    // convert votes to something like { "Vote Name": 80 // percent of votes }
    if (poll.votes && poll.variants) {
      const votesCount = Object.keys(poll.votes).length || 1;
      const results: Record<string, number> = {}; // count votes
      Object.keys(poll.variants).forEach((uuid) => {
        results[uuid] = 0;
      });
      Object.values(poll.votes).forEach(({ variant }) => {
        results[variant]++;
      });

      const variants: Record<string, number> = {};
      Object.keys(results).forEach((variantId) => {
        // convert votes
        if (poll.variants) {
          const variantName = poll.variants[variantId].content;
          variants[variantName] = (results[variantId] / votesCount) * 100;
        }
      });

      return variants;
    }
    return {};
  }, [poll.votes, poll.variants]);
  if (!poll.variants || !poll.votes) return <></>;
  console.log(votes);
  return (
    <>
      <Heading fontSize="2xl">Results of the poll:</Heading>
      <Text fontSize="xl" mb="8">
        You have voted
      </Text>
      {Object.keys(votes).map((name) => {
        const percent: number = votes[name];
        return <PollResultVariant name={name} value={percent} />;
      })}

      <Text fontSize="2xl">{votedPersons === 1 ? '1 person has voted' : `${votedPersons} persons have voted`}</Text>
    </>
  );
}

export default PollResults;
