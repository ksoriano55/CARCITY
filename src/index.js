import React from 'react';
import ReactDOM from 'react-dom';
// import registerServiceWorker from './registerServiceWorker';
import { unregister } from './registerServiceWorker';

import { HashRouter } from 'react-router-dom';
import './assets/base.css';
import Main from './Pages/Main';
import store from './config/configureStore';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';


const rootElement = document.getElementById('root');
let persistor = persistStore(store)
const renderApp = Component => {
  ReactDOM.render(
    <Provider store={store}>
       <PersistGate loading={null} persistor={persistor}>
       <HashRouter>
        <Component />
      </HashRouter>
        </PersistGate>
    </Provider>,
    rootElement
  );
};

renderApp(Main);

if (module.hot) {
  module.hot.accept('./Pages/Main', () => {
    const NextApp = require('./Pages/Main').default;
    renderApp(NextApp);
  });
}
unregister();

// registerServiceWorker();

