import type { FC } from 'react';
import type { PageProps } from 'types/globals';

const Transactions:FC<PageProps> = ({ id }): JSX.Element => {
  const txt = 'Transactions page';
  return (
    <div id={id}>
      {txt}
    </div>
  );
};

export default Transactions;
