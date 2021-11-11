import React from 'react';
import { useParams } from 'react-router';
import { Center, Heading } from '@chakra-ui/react';

import { auth } from '../firebase';

import PollLoading from '../components/PollLoading';
import PollEdit from '../components/PollEdit';

function PollEditPage() {
  const { ownerId: paramOwner, pollId: paramPoll } = useParams();

  return (
    <div>
      <PollLoading ownerId={paramOwner} pollId={paramPoll}>
        {(poll, ownerId, pollId) => {
          const isOwner = auth.currentUser?.uid === ownerId;
          if (isOwner) return <PollEdit poll={poll} pollId={pollId} />;
          else
            return (
              <Center>
                <Heading>You don't have permission to edit this poll</Heading>
              </Center>
            );
        }}
      </PollLoading>
    </div>
  );
}

export default PollEditPage;
