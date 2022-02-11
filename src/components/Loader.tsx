import type { FC } from 'react';
import { Placeholder, Card } from 'semantic-ui-react'

interface Props {}

const Loader:FC<Props> = (): JSX.Element => {
  const txt = 'Loader page ...';
  return (
    <Card id="placeholder-loader">
      <Placeholder>
        <Placeholder.Image square />
      </Placeholder>
    </Card>
  );
};

export default Loader;
