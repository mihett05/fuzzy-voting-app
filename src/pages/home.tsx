import React, { useEffect, useState } from 'react';
import { ref, query, onValue } from 'firebase/database';
import { Box, Center, Heading, SimpleGrid } from '@chakra-ui/react';

import { Polls } from '../db';
import { db } from '../firebase';

import PollCard from '../components/PollCard';

function HomePage() {
  const [polls, setPolls] = useState<Polls>({});
  useEffect(() => {
    return onValue(query(ref(db, `/polls`)), (data) => {
      const rawData = data.val();
      const preparedData: Polls = {};
      Object.keys(rawData).forEach((userId) => {
        Object.keys(rawData[userId]).forEach((pollId) => {
          preparedData[`${userId}/${pollId}`] = rawData[userId][pollId];
        });
      });
      setPolls(preparedData);
    });
  }, [setPolls]);

  return (
    <>
      <Center>
        <Heading mb={5}>Polls</Heading>
      </Center>
      <SimpleGrid minChildWidth="300px" spacing={5}>
        {Object.keys(polls).map((uuid) => (
          <PollCard poll={polls[uuid]} uuid={uuid} key={uuid} />
        ))}
      </SimpleGrid>
    </>
  );
}

export default HomePage;
