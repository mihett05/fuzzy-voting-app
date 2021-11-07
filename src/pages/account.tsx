import React, { useEffect, useContext, useState } from 'react';
import { signInWithRedirect, getRedirectResult, GoogleAuthProvider, UserCredential } from 'firebase/auth';
import { ref, query, onValue } from 'firebase/database';

import { Button, Center, Heading } from '@chakra-ui/react';
import { FaGoogle, FaSignOutAlt } from 'react-icons/fa';

import { auth, db } from '../firebase';
import { Polls } from '../db';
import { AuthContext } from '../components/AuthProvider';
import PollItem from '../PollItem';

const signInWithGoogle = () => signInWithRedirect(auth, new GoogleAuthProvider());
const logOut = () => auth.signOut();

function Account() {
  const currentUser = useContext(AuthContext);
  const [polls, setPolls] = useState<Polls>({});

  useEffect(() => {
    if (currentUser !== null) {
      return onValue(query(ref(db, `polls/${currentUser.uid}/`)), (data) => {
        setPolls(data.val());
      });
    }
  }, [currentUser]);

  const sortedPollsUuids =
    polls !== null
      ? Object.keys(polls).sort((a, b) => {
          const tsA = polls[a].timestamp;
          const tsB = polls[b].timestamp;
          if (tsA > tsB) return -1;
          else if (tsA === tsB) return 0;
          else return 1;
        })
      : [];

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
          <PollItem poll={polls[uuid]} uuid={uuid} />
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
      <Center>
        <Button onClick={signInWithGoogle} leftIcon={<FaGoogle />} colorScheme="red">
          Google
        </Button>
      </Center>
    </div>
  );
}

export default Account;
