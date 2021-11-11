import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Link as RouterLink } from 'react-router-dom';
import { onValue, query, ref } from 'firebase/database';
import { Center, Heading, Link } from '@chakra-ui/react';

import { Poll } from '../db';
import { auth, db } from '../firebase';

interface PollLoadingProps {
  ownerId?: string;
  pollId?: string;
  children: (poll: Poll, ownerId: string, pollId: string) => React.ReactNode;
}

function PollLoading({ ownerId, pollId, children }: PollLoadingProps) {
  const navigate = useNavigate();
  const [poll, setPoll] = useState<Poll | null>(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if (auth.currentUser !== null) {
      return onValue(query(ref(db, `polls/${ownerId}/${pollId}`)), (data) => {
        setPoll(data.val());
        setLoading(false);
      });
    }
  }, [ownerId, pollId, setPoll]);

  if (auth.currentUser === null) {
    return (
      <Center>
        <Heading>
          You have to{' '}
          <Link as={RouterLink} to="/account" color="blue.300">
            Sign In
          </Link>{' '}
          your account to view a poll
        </Heading>
      </Center>
    );
  }

  if (isLoading) {
    return <div>Poll is loading...</div>;
  }

  if (pollId === undefined || ownerId === undefined || poll === null) {
    navigate('/404');
    return <div>Not found</div>;
  }

  return <>{children(poll, ownerId, pollId)}</>;
}

export default PollLoading;
