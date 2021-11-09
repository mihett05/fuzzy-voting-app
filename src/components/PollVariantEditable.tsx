import React from 'react';
import {
  Editable,
  EditablePreview,
  EditableInput,
  useEditableControls,
  ButtonGroup,
  IconButton,
  Flex,
  Box,
  Spacer,
} from '@chakra-ui/react';
import { CheckIcon, CloseIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';

interface PollVariantEditableProps {
  value: string;
  onEdit: (value: string) => any;
  onRemove: () => any;
}

function PollVariantEditable({ value, onEdit, onRemove }: PollVariantEditableProps) {
  function EditableControls() {
    const { isEditing, getSubmitButtonProps, getCancelButtonProps, getEditButtonProps } = useEditableControls();

    return isEditing ? (
      <ButtonGroup size="md">
        <IconButton icon={<CheckIcon />} {...getSubmitButtonProps()} aria-label="Apply new name" />
        <IconButton icon={<CloseIcon />} {...getCancelButtonProps()} aria-label="Discard new name" />
      </ButtonGroup>
    ) : (
      <ButtonGroup>
        <IconButton size="md" icon={<EditIcon />} {...getEditButtonProps()} aria-label="Edit variant name" mr="0.4" />
        <IconButton size="md" icon={<DeleteIcon />} bgColor="red.400" aria-label="Delete variant" onClick={onRemove} />
      </ButtonGroup>
    );
  }

  return (
    <Editable fontSize="lg" value={value} onChange={onEdit} isPreviewFocusable={false}>
      <Flex>
        <Box>
          <EditablePreview />
          <EditableInput />
        </Box>
        <Spacer />
        <EditableControls />
      </Flex>
    </Editable>
  );
}

export default PollVariantEditable;
