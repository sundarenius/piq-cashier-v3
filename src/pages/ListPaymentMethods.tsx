import type { FC } from 'react';

interface Props {}

const ListPaymentMethods:FC<Props> = (): JSX.Element => {
  const txt = 'ListPaymentMethods page';
  return (
    <h1>
      {txt}
    </h1>
  );
};

export default ListPaymentMethods;
