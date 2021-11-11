import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import {
  Box,
  Button,
  Flex,
  Heading,
  Spacer,
  Stack,
  Editable,
  EditablePreview,
  EditableInput,
  Text,
} from '@chakra-ui/react';
import { AddIcon, HamburgerIcon, ViewIcon } from '@chakra-ui/icons';
import { FaEdit } from 'react-icons/fa';
import { Poll, addPollVariant, editPollVariant, removePollVariant, sortByTimestamp, editPoll } from '../db';

import PollVariantEditable from './PollVariantEditable';
import PollNameEdit from './PollNameEdit';

interface PollEditProps {
  poll: Poll;
  pollId: string;
}

function PollEdit({ poll, pollId }: PollEditProps) {
  const sortedVariantsUuids = poll.variants !== undefined ? sortByTimestamp(poll.variants) : [];
  const navigate = useNavigate();
  const [name, setName] = useState(poll.name);

  useEffect(() => {
    if (poll.name !== name) {
      // edit name on change
      (async () => {
        await editPoll(pollId, {
          name,
        });
      })();
    }
  }, [poll, name, pollId]);

  const onAddVariant = () => addPollVariant(pollId);
  const onSeeResults = () => navigate('../results');
  const onViewAsUser = () => navigate('../view');

  return (
    <>
      <Text>Poll name:</Text>
      <PollNameEdit value={name} onEdit={setName} />
      <Heading fontSize="2xl">Variants</Heading>
      <Stack>
        {poll.variants &&
          sortedVariantsUuids.map((uuid) => {
            if (!poll.variants) return null; // typescript don't understand that poll.variants can't be undefined now
            const variant = poll.variants[uuid];

            return (
              <PollVariantEditable
                key={uuid}
                value={variant.content}
                onEdit={(value) => editPollVariant(pollId, uuid, value)}
                onRemove={() => removePollVariant(pollId, uuid)}
              />
            );
          })}
      </Stack>
      <Box mt="2">
        <Flex>
          <Button leftIcon={<AddIcon />} bgColor="green.400" size="sm" onClick={onAddVariant}>
            Add Variant
          </Button>
          <Spacer />
          <Button leftIcon={<HamburgerIcon />} size="sm" bgColor="blue.400" onClick={onSeeResults}>
            See Results
          </Button>
          <Spacer />
          <Button leftIcon={<ViewIcon />} size="sm" bgColor="blue.400" onClick={onViewAsUser}>
            View as User
          </Button>
        </Flex>
      </Box>
    </>
  );
}

export default PollEdit;
