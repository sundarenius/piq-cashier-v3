import type { FC } from 'react';

interface Props {}

const Transactions:FC<Props> = (): JSX.Element => {
  const txt = 'Transactions page';
  return (
    <h1>
      {txt}
    </h1>
  );
};

export default Transactions;
