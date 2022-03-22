import { AppBar, Button, Container, Toolbar, Typography } from '@mui/material';
import React from 'react';
import './App.css';
import JobList from './components/JobList';

const App: React.FunctionComponent = () => {
  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'left' }}>
            Demo App
          </Typography>
          <Button color="inherit">Create new job</Button>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 4 }}>
        <JobList />
      </Container>
    </div>
  );
}

export default App;
