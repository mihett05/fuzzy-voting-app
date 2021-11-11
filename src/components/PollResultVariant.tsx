import React from 'react';
import { Flex, Progress, Text } from '@chakra-ui/react';

interface PollResultVariantProps {
  name: string;
  value: number;
}

function PollResultVariant({ name, value }: PollResultVariantProps) {
  return (
    <>
      <Text fontSize="2xl">{name}</Text>
      <Flex>
        <Progress
          value={100}
          size="lg"
          style={{
            width: `${value}%`,
          }}
        />
        <Text
          fontSize="xl"
          ml="4"
          style={{
            transform: 'translate(0, -25%)',
          }}
        >
          {value.toFixed(1)}%
        </Text>
      </Flex>
    </>
  );
}

export default PollResultVariant;
