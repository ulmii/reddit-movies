import * as React from 'react';
import {Container} from '@material-ui/core';
import {DashboardContextProvider} from './contexts/DashboardContext';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <Container maxWidth="sm">
      <DashboardContextProvider>
        <Dashboard />
      </DashboardContextProvider>
    </Container>
  );
}

export default App;
