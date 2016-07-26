import React from 'react';
import NavBar from 'NavBar';
import Showcase from 'Showcase';
import VerticalLinearStepper from 'VerticalLinearStepper';

var Main = React.createClass({

    render() {
        return (
          <div>
              <Showcase />
              <VerticalLinearStepper />
          </div>

        );
    }
});

export default Main;
