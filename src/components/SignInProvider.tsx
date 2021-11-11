import React from 'react';
import { Button, Center } from '@chakra-ui/react';

interface SignInProviderProps {
  name: string;
  onSignIn: () => any;
  icon: JSX.Element;
  colorScheme: string;
}

function SignInProvider({ name, onSignIn, icon, colorScheme }: SignInProviderProps) {
  return (
    <Center mb="2">
      <Button onClick={onSignIn} leftIcon={icon} colorScheme={colorScheme} w="10vw">
        {name}
      </Button>
    </Center>
  );
}

export default SignInProvider;
