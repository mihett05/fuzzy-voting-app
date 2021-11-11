import React from 'react';
import { useParams } from 'react-router';
import { Link as RouterLink } from 'react-router-dom';
import { Center, Heading, Link } from '@chakra-ui/react';

import { auth } from '../firebase';
import PollLoading from '../components/PollLoading';
import PollResults from '../components/PollResults';

function PollResultsPage() {
  const { ownerId: paramOwner, pollId: paramPoll } = useParams();

  return (
    <div>
      <PollLoading ownerId={paramOwner} pollId={paramPoll}>
        {(poll, ownerId, pollId) => {
          const isOwner = auth.currentUser?.uid === ownerId;
          const isVoted = poll.votes && auth.currentUser && poll.votes[auth.currentUser.uid] !== undefined;

          if (isOwner || isVoted) return <PollResults poll={poll} />;
          else
            return (
              <Center>
                <Heading>
                  You should{' '}
                  <Link as={RouterLink} to="..">
                    Vote
                  </Link>{' '}
                  in the poll to see the results
                </Heading>
              </Center>
            );
        }}
      </PollLoading>
    </div>
  );
}

export default PollResultsPage;
