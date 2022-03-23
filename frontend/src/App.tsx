import { AppBar, Container, Grid, Toolbar, Typography } from '@mui/material';
import React from 'react';
import './App.css';
import JobCreator from './components/JobCreator';
import JobList from './components/JobList';

const App: React.FunctionComponent = () => {
  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'left' }}>
            Demo App
          </Typography>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 4, mb: 4 }}>
        <Grid container direction="row" justifyContent="flex-end">
          <Grid item xs={6} sx={{ textAlign: "right", mb: 4 }}>
            <JobCreator />
          </Grid>
        </Grid>
        <JobList />
      </Container>
    </div>
  );
}

export default App;
