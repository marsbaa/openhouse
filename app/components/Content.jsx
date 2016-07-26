import React from 'react';
var Vimeo = require('react-vimeo');
import ReactPlayer from 'react-player'

var Content = React.createClass({

    render() {
        return (
        <div>
          <section className="grouping">
            <div className="wrapper">
              <div class="intro-content">
                <div style={{maxWidth:'60%', margin:'0 auto'}}>
                  <h1>FIRST KICK OPEN HOUSE</h1>
                </div>
                <p style={{fontSize:'14px'}}>First Kick Academy is pleased to invite your child for our Open House at our new venues and time slots. The event is a 1 hour session which will allow your child to experience what a typical session is about and will help you to decide whether to sign him up. We try our best to make your child’s footballing experience a FUN and POSITIVE one.</p>
                <div style={{maxWidth:'100%', margin:'0 auto', textAlign: 'center', paddingTop:'20px'}}>
                  <ReactPlayer url='https://vimeo.com/175531563/' width='100%' height='100%'/>
                </div>
              </div>
            </div>
          </section>
          <section>
            <div className="wrapper grouping" style={{ backgroundColor: 'rgb(246, 246, 246)'}}>
              <h2>INTRO TO FIRST KICK</h2>
              <div className="column">
                <figure className="circle">
                  <img src="images/icon1.png" />
                </figure>
                <h4>WELL-STRUCTURED CURRICULUM</h4>
              </div>
              <div className="column">
                <figure className="circle">
                  <img src="images/icon2.png" />
                </figure>
                <h4>QUALIFIED SOCCER COACHES</h4>
              </div>
              <div className="column">
                <figure className="circle">
                  <img src="images/icon3.png" />
                </figure>
                <h4>FUN AND POSITIVE EXPERIENCE</h4>
              </div>
            </div>
          </section>
        </div>

        );
    }
});

export default Content;
