import React, { Component } from 'react';
import './App.css';
import Main from './components/MainComponent';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';

const store = ConfigureStore();

class App extends Component {

  render() {    /*State that is defined in App component is made available as props to Menu Component*/
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div>
            <Main />  
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
