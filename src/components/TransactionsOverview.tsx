import type { FC } from 'react';

interface Props {}

const TransactionsOverview:FC<Props> = (): JSX.Element => {
  const txt = 'TransactionsOverview page';
  return (
    <div id="transactions-overview-container">
      <h3>{txt}</h3>
    </div>
  );
};

export default TransactionsOverview;
