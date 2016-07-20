import React from 'react';
import { Button, Jumbotron, Row, Col, Grid, Image } from 'react-bootstrap';

var Showcase = React.createClass({
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
                 <Image src="images/openhouse.jpg" responsive />

        );
    }
});

export default Showcase;
