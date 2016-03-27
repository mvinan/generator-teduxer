import React from 'react';
import ReactDOM from 'react-dom';
import App from '../app/app'

export default class App extends React.Component{
  render(){
    return (
      <h1>Bienvenido a <%= name %> una aplicación hecha con React.js!</h1>
    )
  }
}


ReactDOM.render(
  <App/>,
  document.getElementById('app')
)
