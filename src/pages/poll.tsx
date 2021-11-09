import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { query, ref, onValue } from 'firebase/database';
import { Heading, Center, RadioGroup, Radio, Stack, Button, Flex, Box, Spacer, IconButton } from '@chakra-ui/react';
import { AddIcon, DeleteIcon } from '@chakra-ui/icons';

import { auth, db } from '../firebase';
import { Poll, addPollVariant, editPollVariant, removePollVariant, sortByTimestamp } from '../db';
import PollLoading from '../components/PollLoading';
import PollEdit from '../components/PollEdit';
import PollVote from '../components/PollVote';

function PollPage() {
  const { ownerId: paramOwner, pollId: paramPoll } = useParams();

  return (
    <div>
      <PollLoading ownerId={paramOwner} pollId={paramPoll}>
        {(poll, ownerId, pollId) => {
          const isOwner = auth.currentUser?.uid === ownerId;
          return (
            <>
              <Center>
                <Heading>{poll.name}</Heading>
              </Center>
              {isOwner ? (
                <PollEdit poll={poll} pollId={pollId} />
              ) : (
                <PollVote poll={poll} pollId={pollId} ownerId={ownerId} />
              )}
            </>
          );
        }}
      </PollLoading>
    </div>
  );
}

export default PollPage;
