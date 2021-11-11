import React, { useEffect, useContext, useState } from 'react';
import { signInWithRedirect, GoogleAuthProvider, signInAnonymously } from 'firebase/auth';
import { ref, query, onValue } from 'firebase/database';

import { Button, Center, Heading, useDisclosure } from '@chakra-ui/react';
import { FaGoogle, FaSignOutAlt, FaUser } from 'react-icons/fa';

import { auth, db } from '../firebase';
import { Polls, sortByTimestamp } from '../db';
import { AuthContext } from '../components/AuthProvider';
import PollItem from '../components/PollItem';
import SignInProvider from '../components/SignInProvider';

function AccountPage() {
  const currentUser = useContext(AuthContext);
  const [polls, setPolls] = useState<Polls>({});

  useEffect(() => {
    if (currentUser !== null) {
      return onValue(query(ref(db, `polls/${currentUser.uid}/`)), (data) => {
        setPolls(data.val());
      });
    }
  }, [currentUser]);

  const sortedPollsUuids = polls !== null ? sortByTimestamp(polls) : [];

  const signInWithGoogle = () => signInWithRedirect(auth, new GoogleAuthProvider());
  const logOut = () => auth.signOut();

  if (currentUser !== null) {
    return (
      <div>
        <Center
          style={{
            paddingBottom: '1vh',
          }}
        >
          <Heading as="h1" size="lg">
            Account actions
          </Heading>
        </Center>
        <Center
          style={{
            paddingBottom: '4vh',
          }}
        >
          <Button onClick={logOut} leftIcon={<FaSignOutAlt />}>
            Logout
          </Button>
        </Center>
        <Center
          style={{
            paddingBottom: '1vh',
          }}
        >
          <Heading as="h1" size="lg">
            My polls
          </Heading>
        </Center>
        {sortedPollsUuids.map((uuid) => (
          <PollItem poll={polls[uuid]} uuid={uuid} key={uuid} />
        ))}
      </div>
    );
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
      <SignInProvider name="Google" onSignIn={signInWithGoogle} icon={<FaGoogle />} colorScheme="red" />
    </div>
  );
}

export default AccountPage;
