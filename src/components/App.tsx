import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { ChakraProvider } from '@chakra-ui/react';

import Layout from './Layout';
import AuthProvider from './AuthProvider';

import Home from '../pages/home';
import Account from '../pages/account';

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <AuthProvider>
          <Layout>
            <Routes>
              <Route path="/">
                <Route index element={<Home />} />
                <Route path="account" element={<Account />} />
              </Route>
            </Routes>
          </Layout>
        </AuthProvider>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
