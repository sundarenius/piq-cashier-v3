import type { FC } from 'react';
import {
  useEffect,
  Suspense,
  useState,
  useMemo,
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
import { contextActions } from 'redux/actions';
import type { PageProps } from 'types/globals';

const AppRoutes:FC = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const history:any = useHistory();
  const config = useAppSelector(({ context }) => context.config);
  const [shouldLoadApp, setShouldLoadApp] = useState(false);

  const routesData = routes();

  const currentRouteData = useMemo(() => ({
    initLoader: true,
    initRequests: standardInitRequests,
    ...routesData.find((val) => val.path === window.location.pathname),
  }), [routesData]);

  useEffect(() => {
    const historyPush = (path: string) => history.push(path + history.location.search);
    if (!shouldLoadApp && config) {
      getShouldLoadApp({
        setShouldLoadApp,
        config,
        currentRouteData,
        historyPush,
        dispatch,
        contextActions,
      });
    }
  }, [config, currentRouteData, dispatch, history, shouldLoadApp]);

  return shouldLoadApp ? (
    <Switch>
      {Object.values(routesData.map(({ path, cmpnt, initLoader = true, id }) => (
        <Route
          key={path}
          path={path}
          render={() => <RouteComponent path={path} cmpnt={cmpnt} initLoader={initLoader} id={id} />}
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

interface RouteComponentProps extends PageProps {
  initLoader: boolean,
  cmpnt: FC<PageProps>
}
const RouteComponent: FC<RouteComponentProps> = ({ initLoader, cmpnt: Cmpnt, id, path }) => (
  <Suspense fallback={initLoader ? <h1>Loading ...</h1> : ''}>
    <Cmpnt path={path} id={id} />
  </Suspense>
);
