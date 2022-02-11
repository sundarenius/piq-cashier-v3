import type { FC } from 'react';
import { useEffect } from 'react';
import AppRoutes from 'router/AppRoutes';
import { BrowserRouter as Router } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'redux/redux-hooks';
import { setInitialConfigs } from 'utils/helpers';
import { contextActions } from 'redux/actions'
import './styles/App.scss';

interface Props {}

const App:FC<Props> = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const defaultConfig = useAppSelector(({ context }) => context.defaultConfig)

  const widthAndHeight = {
    width: defaultConfig.containerWidth,
    height: defaultConfig.container
  }

  useEffect(() => {
    setInitialConfigs(dispatch, contextActions);
  }, [dispatch])
    
  return (
    <div style={widthAndHeight} id="cashier-container">
      <Router>
    
        <AppRoutes />
    
      </Router>
    </div>
  );
};

export default App;
