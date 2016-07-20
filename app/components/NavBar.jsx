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
              <AppBar title="First Kick Open House 2016"
                style={{backgroundColor:'#f3911e'}}/>
              </div>
        );
    }
});

export default NavBar;
