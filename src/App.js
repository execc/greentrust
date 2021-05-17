import React, { Component } from 'react';
import Main from './pages/index';

import { Provider as ReduxProvider } from "react-redux";
import configureStore from "./common/redux/store";

const reduxStore = configureStore(window.REDUX_INITIAL_DATA);

class App extends Component {
  render() {
    return (
      <ReduxProvider store={reduxStore}>
        <div>
          <Main />
        </div>
      </ReduxProvider>
    );
  }
}

export default App;
