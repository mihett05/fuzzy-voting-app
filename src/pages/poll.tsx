import React from 'react';
import { Outlet, useParams, useLocation, useNavigate, useOutlet } from 'react-router';
import { Link } from 'react-router-dom';
import { Heading, Center, Flex, Button } from '@chakra-ui/react';

import { auth } from '../firebase';
import PollLoading from '../components/PollLoading';
import PollResults from '../components/PollResults';
import PollVote from '../components/PollVote';

function PollPage() {
  const { ownerId: paramOwner, pollId: paramPoll } = useParams();
  const outlet = useOutlet();

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
              {isOwner && (
                <>
                  <Flex direction="row-reverse">
                    <Link to="edit">
                      <Button bgColor="teal.400">Edit</Button>
                    </Link>
                  </Flex>
                </>
              )}

              {outlet ? (
                <Outlet />
              ) : isVoted ? (
                <PollResults poll={poll} />
              ) : (
                <PollVote poll={poll} ownerId={ownerId} pollId={pollId} />
              )}
            </>
          );
        }}
      </PollLoading>
    </div>
  );
}

export default PollPage;
