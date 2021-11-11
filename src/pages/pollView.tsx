import React from 'react';
import { useParams } from 'react-router';

import PollLoading from '../components/PollLoading';
import PollVote from '../components/PollVote';

function PollViewPage() {
  const { ownerId: paramOwner, pollId: paramPoll } = useParams();

  return (
    <div>
      <PollLoading ownerId={paramOwner} pollId={paramPoll}>
        {(poll, ownerId, pollId) => <PollVote poll={poll} pollId={pollId} ownerId={ownerId} />}
      </PollLoading>
    </div>
  );
}

export default PollViewPage;
