import React from 'react';
import Showcase from 'Showcase';
import VerticalLinearStepper from 'VerticalLinearStepper';
import Content from 'Content';

var Main = React.createClass({

    render() {
        return (
          <div>
              <Showcase />
              <VerticalLinearStepper />
              <Content />

          </div>

        );
    }
});

export default Main;
