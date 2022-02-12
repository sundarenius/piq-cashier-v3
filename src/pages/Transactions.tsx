import type { FC } from 'react';

interface Props {
  id: string
}

const Transactions:FC<Props> = ({ id }): JSX.Element => {
  const txt = 'Transactions page';
  return (
    <div id={id}>
      {txt}
    </div>
  );
};

export default Transactions;
