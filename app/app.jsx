import React from 'react';
import {render} from 'react-dom';
import Main from 'Main';
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: '#000000',

  },
  appBar: {
    height: 50,
  },
  stepper: {
    iconColor: '#f3911e',
  },
  fontFamily: 'Roboto, sans-serif'
});


// Needed for onTouchTap
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();


var {Route, Router, IndexRoute, hashHistory} = require('react-router');

const App = () => (
  <MuiThemeProvider muiTheme={muiTheme}>
    <Main />
  </MuiThemeProvider>
);
render(<App />, document.getElementById('app'));
