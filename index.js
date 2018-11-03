import React from "react"
var ReactDOM = require('react-dom');
var Summoning = require('./src/Summoning');

const rootElement = document.getElementById('root')

class App extends React.Component {

  render() {
    return (
      <div>
        <Summoning mode="10ROLLRARITY" />
      </div>
    );
  }
}
// Use the ReactDOM.render to show your component on the browser
ReactDOM.render(
  <App />,
  rootElement
)
