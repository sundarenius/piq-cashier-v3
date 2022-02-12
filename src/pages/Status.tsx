import type { FC } from 'react';

interface Props {
  id: string
}

const Status:FC<Props> = ({ id }): JSX.Element => {
  const txt = 'Status page';
  return (
    <div id={id}>
      {txt}
    </div>
  );
};

export default Status;
