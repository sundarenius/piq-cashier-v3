import type { FC } from 'react';

interface Props {}

const PaymentMethod:FC<Props> = (): JSX.Element => {
  const txt = 'PaymentMethod page';
  return (
    <h1>
      {txt}
    </h1>
  );
};

export default PaymentMethod;
