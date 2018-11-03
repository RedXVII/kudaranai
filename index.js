import React from "react"
var ReactDOM = require('react-dom');
import { Provider } from "react-redux";
import store from "./src/redux/store";
var Summoning = require('./src/Summoning');

const rootElement = document.getElementById('root')

console.log(Summoning);

class App extends React.Component {

  render() {
    return (
        <Summoning />
    );
  }
}
// Use the ReactDOM.render to show your component on the browser
ReactDOM.render(
  (<Provider store={store}>
    <App />
  </Provider>),
  rootElement
)
