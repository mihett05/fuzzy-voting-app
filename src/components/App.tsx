import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { ChakraProvider } from '@chakra-ui/react';

import Layout from './Layout';
import AuthProvider from './AuthProvider';

import HomePage from '../pages/home';
import AccountPage from '../pages/account';
import PollPage from '../pages/poll';
import NotFoundPage from '../pages/404';
import PollViewPage from '../pages/pollView';
import PollResultsPage from '../pages/pollResults';
import PollEditPage from '../pages/pollEdit';

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <AuthProvider>
          <Layout>
            <Routes>
              <Route path="/">
                <Route index element={<HomePage />} />
                <Route path="account" element={<AccountPage />} />
                <Route path="polls">
                  <Route path=":ownerId/:pollId" element={<PollPage />}>
                    <Route path="view" element={<PollViewPage />} />
                    <Route path="results" element={<PollResultsPage />} />
                    <Route path="edit" element={<PollEditPage />} />
                  </Route>
                </Route>
              </Route>
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Layout>
        </AuthProvider>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
