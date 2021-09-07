import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import { createStore } from 'redux';
import rootReducer from './reducers';
import { Provider } from 'react-redux';



let store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() 
  );


ReactDOM.render(

  <BrowserRouter>
    <Provider store={store}>
     <App />
    </Provider>
  </BrowserRouter>
,
  document.getElementById('root')
);
