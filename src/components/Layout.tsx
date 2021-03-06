import React from 'react';
import { Container } from '@chakra-ui/react';

import Header from './Header';

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <div>
      <Header />
      <Container maxW="container.lg">{children}</Container>
    </div>
  );
}

export default Layout;
