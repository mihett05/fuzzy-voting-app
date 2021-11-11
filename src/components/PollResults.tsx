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
    // convert votes to something like { "uuid": 80 // percent of votes }
    if (poll.votes && poll.variants) {
      const votesCount = Object.keys(poll.votes).length || 1;
      const results: Record<string, number> = {}; // count votes
      Object.keys(poll.variants).forEach((uuid) => {
        results[uuid] = 0;
      });
      Object.values(poll.votes).forEach(({ variant }) => {
        results[variant]++;
      });

      Object.keys(results).forEach((variantId) => {
        // count votes
        if (poll.variants) {
          results[variantId] = (results[variantId] / votesCount) * 100;
        }
      });

      const sortedVariants: Record<string, number> = {}; // sort from the biggest to the lowest
      Object.keys(results)
        .sort((a, b) => {
          const vA = results[a];
          const vB = results[b];

          if (vA < vB) return 1;
          else if (vA === vB) return 0;
          else return -1;
        })
        .forEach((variant) => {
          sortedVariants[variant] = results[variant];
        });

      return sortedVariants;
    }
    return {};
  }, [poll.votes, poll.variants]);
  if (!poll.variants || !poll.votes) return <></>;

  return (
    <>
      <Heading fontSize="2xl">Results of the poll:</Heading>
      <Text fontSize="xl" mb="8">
        You have voted
      </Text>
      {Object.keys(votes).map((uuid) => {
        const percent: number = votes[uuid];
        return (
          <PollResultVariant name={(poll.variants && poll.variants[uuid].content) || ''} value={percent} key={uuid} />
        );
      })}

      <Text fontSize="2xl">{votedPersons === 1 ? '1 person has voted' : `${votedPersons} persons have voted`}</Text>
    </>
  );
}

export default PollResults;
