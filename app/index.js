import React from 'react';
import ReactDOM from 'react-dom';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Panel from './components/panel/panel';

ReactDOM.render(
  <React.Fragment>
    <CssBaseline />
    <Container maxWidth="md">
      <Typography variant="h3" component="h1" gutterBottom>
        Super Time Tracker
      </Typography>
      <Panel />
    </Container>
  </React.Fragment>,
  document.getElementById('root')
);
