import type { FC } from 'react';
import type { PageProps } from 'types/globals';

const Status:FC<PageProps> = ({ id }): JSX.Element => {
  const txt = 'Status page';
  return (
    <div id={id}>
      {txt}
    </div>
  );
};

export default Status;
