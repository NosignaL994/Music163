import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Provider} from 'react-redux'
import {store} from "./service/store"

ReactDOM.render(
    <Provider store={store}>
      {/* <PersistGate persistor={persistor}> */}
        <App/>
      {/* </PersistGate> */}
    </Provider>,
  document.getElementById('root')
);


