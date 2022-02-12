import type { FC } from 'react';
import { Placeholder, Card } from 'semantic-ui-react';

interface Props {}

const InitLoader:FC<Props> = (): JSX.Element => (
  <Card id="placeholder-loader">
    <Placeholder>
      <Placeholder.Image square />
    </Placeholder>
  </Card>
);

export default InitLoader;
