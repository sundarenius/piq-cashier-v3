import type { FC } from 'react';

interface Props {}

const Status:FC<Props> = (): JSX.Element => {
  const txt = 'Status page';
  return (
    <h1>
      {txt}
    </h1>
  );
};

export default Status;
