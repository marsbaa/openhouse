import React from 'react';
import NavBar from 'NavBar';
import Showcase from 'Showcase';
import VerticalLinearStepper from 'VerticalLinearStepper';

var Main = React.createClass({
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
              <NavBar />
              <Showcase />
              <VerticalLinearStepper />
          </div>

        );
    }
});

export default Main;
