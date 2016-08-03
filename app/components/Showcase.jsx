import React from 'react';


var Showcase = React.createClass({

    render() {
        return (
          <section>
            <div className="showcase">
              <figure style={{width: '100%', maxHeight: '500px', overflow: 'hidden', position: 'relative'}}>
                <img src='images/openhouse.jpg'/>
                <div className='logo-center'>
                  <img src='images/logo.png' />
                </div>

              </figure>
            </div>
          </section>
        );
    }
});

export default Showcase;
