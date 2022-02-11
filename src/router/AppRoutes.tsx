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
import { useAppSelector } from 'redux/redux-hooks';
import { routes, standardInitRequests } from 'utils/route-paths';
import { Paths } from 'types/globals';
import InitLoader from 'components/InitLoader';
import { getShouldLoadApp } from 'utils/helpers';

const paths: string[] = Object.values(Paths)
const isValidPath: boolean = paths.includes(window.location.pathname)

const AppRoutes:FC = (): JSX.Element => {
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
    if (!isValidPath) {
      historyPush(Paths.LIST_PAYMENT_METHODS)
    }
  }, [])

  useEffect(() => {
    if (!shouldLoadApp) {
      getShouldLoadApp(setShouldLoadApp, config, currentRouteData)
    }
  }, [config])

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
