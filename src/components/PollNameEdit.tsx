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
import { CheckIcon, CloseIcon, EditIcon } from '@chakra-ui/icons';

interface PollVariantEditableProps {
  value: string;
  onEdit: (value: string) => any;
}

function PollVariantEditable({ value, onEdit }: PollVariantEditableProps) {
  function EditableControls() {
    const { isEditing, getSubmitButtonProps, getCancelButtonProps, getEditButtonProps } = useEditableControls();

    return isEditing ? (
      <ButtonGroup justifyContent="center" size="sm">
        <IconButton icon={<CheckIcon />} {...getSubmitButtonProps()} aria-label="Apply changes" />
        <IconButton icon={<CloseIcon />} {...getCancelButtonProps()} aria-label="Discard changes" />
      </ButtonGroup>
    ) : (
      <Flex justifyContent="center">
        <IconButton size="sm" icon={<EditIcon />} {...getEditButtonProps()} aria-label="Edit poll name" />
      </Flex>
    );
  }

  return (
    <Editable textAlign="center" fontSize="2xl" value={value} onChange={onEdit}>
      <EditablePreview />
      <EditableInput />
      <EditableControls />
    </Editable>
  );
}

export default PollVariantEditable;
