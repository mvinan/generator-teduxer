var React = require('react')

var Home = React.createClass({
  render: function(){
    return (
      <html>
        <head>
          <title>{this.props.title}</title>
          {/* inject:css*/}
          {/*endinject*/}
        </head>
        <body>

            <h1>{this.props.title} </h1>
            <div id="app"></div>

          {/* inject:js */}
          {/* endinject */}
        </body>
      </html>
    )

  }
})

module.exports = Home;
