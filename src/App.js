import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import CountdownTimer from './containers/CountdownTimer';
import ControlButtons from './containers/ControlButtons';
import Header from './containers/Header.js';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';

class App extends Component {
  render() {
    return (
      <div className="App">
        <AppBar position="static">
          <Toolbar>
            <Typography type="title">
              Timer
            </Typography>
            <img src={logo} className="App-logo" alt="logo" />
          </Toolbar>
        </AppBar>
        <Grid container spacing={24} justify='center'>
          <Grid item xs={12}>
            <Header />
            <Typography align='center' type="display3" >
              <CountdownTimer />
            </Typography>
            <ControlButtons />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default App;
