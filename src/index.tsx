import ReactDOM from 'react-dom';
import './styles/index.css';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import 'semantic-ui-css/semantic.min.css';
import App from './App'

const renderDom = (content: JSX.Element) => ReactDOM.render(
  content,
  document.getElementById('root'),
);

const renderApp = () => {
  renderDom(
    <Provider store={store}>
      <App />
    </Provider>,
  );
};

renderApp();
