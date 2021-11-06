import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router';
import { signInWithRedirect, getRedirectResult, GoogleAuthProvider, UserCredential } from 'firebase/auth';
import { Button, Center, Heading } from '@chakra-ui/react';
import { FaGoogle } from 'react-icons/fa';

import { auth } from '../firebase';
import { AuthContext } from '../components/AuthProvider';

const signInWithGoogle = () => signInWithRedirect(auth, new GoogleAuthProvider());

function Auth() {
  const navigate = useNavigate();
  const currentUser = useContext(AuthContext);

  useEffect(() => {
    (async () => {
      try {
        const result = (await getRedirectResult(auth)) as UserCredential;
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const { user } = result;
      } catch (e) {}
    })();
  });

  useEffect(() => {
    if (currentUser !== null) navigate('/');
  }, [navigate, currentUser]);

  if (currentUser !== null) {
    return <div />;
  }

  return (
    <div>
      <Center
        style={{
          paddingBottom: '1vh',
        }}
      >
        <Heading as="h1" size="lg">
          Sign In using one of this methods:
        </Heading>
      </Center>
      <Center>
        <Button onClick={signInWithGoogle} leftIcon={<FaGoogle />} colorScheme="red">
          Google
        </Button>
      </Center>
    </div>
  );
}

export default Auth;
