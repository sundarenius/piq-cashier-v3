import type { FC } from 'react';
import {
  useEffect,
  Suspense,
  useState
} from 'react';
import {
  Switch,
  Route,
  useHistory,
} from 'react-router-dom';
import { useAppSelector, useAppDispatch } from 'redux/redux-hooks';
import { routes, standardInitRequests } from 'utils/route-paths';
import InitLoader from 'components/InitLoader';
import { getShouldLoadApp } from 'utils/helpers';
import { contextActions } from 'redux/actions'

const AppRoutes:FC = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const history:any = useHistory();
  const config = useAppSelector(({ context }) => context.config);
  const [shouldLoadApp, setShouldLoadApp] = useState(false);

  const historyPush = (path: string) => history.push(path + history.location.search);

  const routesData = routes()

  const currentRouteData = {
    initLoader: true,
    initRequests: standardInitRequests,
    ...routesData.find((val) => val.path === window.location.pathname),
  }

  useEffect(() => {
    if (!shouldLoadApp) {
      getShouldLoadApp(
        setShouldLoadApp,
        config,
        currentRouteData,
        historyPush,
        dispatch,
        contextActions
      )
    }
  }, [config, shouldLoadApp])

  return shouldLoadApp ? (
    <Switch>
      {Object.values(routesData.map((val) => (
        <Route
          key={val.path}
          path={val.path}
          render={(props) => <Suspense fallback={val.initLoader ? <h1>Loading ...</h1> : ''}><val.cmpnt /></Suspense>}
        />
      )))}
    </Switch>
  )
  : (
    <>
      {currentRouteData.initLoader && <InitLoader />}
    </>
  );
};

export default AppRoutes;
