import React from 'react';


var Showcase = React.createClass({

    render() {
        return (
          <section class="grouping">
            <div style={{maxWidth:'100%', maxHeight:'500px', margin:'0 auto', overflow:'hidden', position:'relative', backgroundImage: 'url(images/bg_pattern.png)'}}>
              <figure>
                  <img src="images/openhouse.jpg" />
                </figure>
                <figure style={{position:'absolute', maxWidth:'40%', top:'35%', left:'30%', display: 'block'}}>
                  <img src="images/logo.png" />
                </figure>
              </div>
          </section>
        );
    }
});

export default Showcase;
