import React, { useEffect, useState } from 'react';
import { ref, query, onValue } from 'firebase/database';
import { Center, Heading, Link, SimpleGrid } from '@chakra-ui/react';

import { Polls } from '../db';
import { auth, db } from '../firebase';

import PollCard from '../components/PollCard';
import { Link as RouterLink } from 'react-router-dom';

function HomePage() {
  const [polls, setPolls] = useState<Polls>({});
  const [names, setNames] = useState<Record<string, string>>({});
  useEffect(() => {
    return onValue(query(ref(db, '/polls')), (data) => {
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

  useEffect(() => {
    return onValue(query(ref(db, '/users')), (data) => {
      setNames(data.val());
    });
  }, [setNames]);

  return (
    <>
      <Center>
        <Heading mb={5}>Polls</Heading>
      </Center>
      {auth.currentUser === null && (
        <Center>
          <Heading>
            You have to{' '}
            <Link as={RouterLink} to="/account" color="blue.300">
              Sign In
            </Link>{' '}
            your account to view polls
          </Heading>
        </Center>
      )}

      <SimpleGrid minChildWidth="300px" spacing={5}>
        {Object.keys(polls).map((uuid) => (
          <PollCard poll={polls[uuid]} uuid={uuid} key={uuid} name={names[uuid.split('/')[0]] || 'Unknown user'} />
        ))}
      </SimpleGrid>
    </>
  );
}

export default HomePage;
