import type { FC } from 'react';
import {
  Switch,
  Route,
  useHistory,
} from 'react-router-dom';
import { useAppSelector } from 'redux/redux-hooks';
import { routes } from 'utils/route-paths';
import { Paths } from 'types/globals';
import Loader from 'components/Loader';

const paths: string[] = Object.values(Paths)
const isValidPath: boolean = paths.includes(window.location.pathname)

const AppRoutes:FC = (): JSX.Element => {
  const history:any = useHistory();
  const config = useAppSelector(({ context }) => context.config);

  const historyPush = (path: string) => history.push(path + history.location.search);

  if (!isValidPath) {
    historyPush(Paths.LIST_PAYMENT_METHODS)
  }

  console.log('config:')
  console.log(config)

  return config ? (
    <Switch>
      {Object.values(routes().map((val) => (
        <Route
          key={val.path}
          exact
          path={val.path}
          component={val.cmpnt}
        />
      )))}
    </Switch>
  )
  : <Loader />;
};

export default AppRoutes;
