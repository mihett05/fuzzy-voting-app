import React from 'react';
import { Box, Button, Flex, Heading, IconButton, Radio, RadioGroup, Spacer, Stack } from '@chakra-ui/react';
import { AddIcon, DeleteIcon } from '@chakra-ui/icons';
import { Poll, addPollVariant, editPollVariant, removePollVariant, sortByTimestamp } from '../db';

import PollVariantEditable from './PollVariantEditable';

interface PollEditProps {
  poll: Poll;
  pollId: string;
}

function PollEdit({ poll, pollId }: PollEditProps) {
  const sortedVariantsUuids = poll.variants !== undefined ? sortByTimestamp(poll.variants) : [];
  const onAddVariant = () => addPollVariant(pollId);

  return (
    <>
      <Heading fontSize="2xl">You see this poll as an owner</Heading>
      <Stack>
        {poll.variants &&
          sortedVariantsUuids.map((uuid) => {
            if (!poll.variants) return null; // typescript don't understand that poll.variants can't be undefined now
            const variant = poll.variants[uuid];

            return (
              <PollVariantEditable
                value={variant.content}
                onEdit={(value) => editPollVariant(pollId, uuid, value)}
                onRemove={() => removePollVariant(pollId, uuid)}
              />
            );
          })}
      </Stack>
      <Button
        leftIcon={<AddIcon />}
        bgColor="green.400"
        size="sm"
        style={{
          marginTop: '2vh',
        }}
        onClick={onAddVariant}
      >
        Add Variant
      </Button>
    </>
  );
}

export default PollEdit;
