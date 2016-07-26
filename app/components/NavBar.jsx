import React from 'react';

// Imported Material UI Components
import AppBar from 'material-ui/AppBar';


var NavBar = React.createClass({
        getInitialState: function() {
        return {
          col: window.innerWidth > 400 ? 4 : 2};
      },
      componentDidMount: function() {
        window.addEventListener("resize", this.updateDimensions);
    },
    updateDimensions: function() {
        this.setState({col: window.innerWidth > 400 ? 4 : 2});
    },

    render() {
        return (
            <div>
              <AppBar title={<div><img src='images/logo.png' height='30px'/></div>}
                iconElementLeft={<div></div>}
                iconElementRight= {<h5 style={{paddingTop: '8px', paddingRight: '10px', color:'#ffffff'}}>OPEN HOUSE 2016</h5>}
                style={{backgroundColor:'#f3911e'}}/>
              </div>
        );
    }
});

export default NavBar;
