import React, { createContext, useEffect, useState } from 'react';
import { User } from 'firebase/auth';
import { Center, CircularProgress } from '@chakra-ui/react';

import { auth } from '../firebase';
import { setName } from '../db';

export const AuthContext = createContext<User | null>(null);

interface AuthProviderProps {
  children: React.ReactNode;
}

function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    return auth.onAuthStateChanged((user) => {
      if (user !== null) {
        setName();
      }
      setCurrentUser(user);
      setLoading(false);
    });
  });

  return (
    <AuthContext.Provider value={currentUser}>
      {loading ? (
        <Center>
          <CircularProgress isIndeterminate color="teal.300" />
        </Center>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
