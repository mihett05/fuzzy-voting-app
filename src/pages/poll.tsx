import React from 'react';
import { useParams } from 'react-router';
import { Heading, Center } from '@chakra-ui/react';

import { auth } from '../firebase';
import PollLoading from '../components/PollLoading';
import PollEdit from '../components/PollEdit';
import PollVote from '../components/PollVote';
import PollResults from '../components/PollResults';

function PollPage() {
  const { ownerId: paramOwner, pollId: paramPoll } = useParams();

  return (
    <div>
      <PollLoading ownerId={paramOwner} pollId={paramPoll}>
        {(poll, ownerId, pollId) => {
          const isOwner = auth.currentUser?.uid === ownerId;
          const isVoted = poll.votes && auth.currentUser && poll.votes[auth.currentUser.uid] !== undefined;

          return (
            <>
              <Center>
                <Heading>{poll.name}</Heading>
              </Center>
              {isOwner && <PollEdit poll={poll} pollId={pollId} />}
              {isVoted ? <PollResults poll={poll} /> : <PollVote poll={poll} pollId={pollId} ownerId={ownerId} />}
            </>
          );
        }}
      </PollLoading>
    </div>
  );
}

export default PollPage;
