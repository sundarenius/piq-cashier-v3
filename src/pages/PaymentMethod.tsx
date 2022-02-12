import type { FC } from 'react';
import type { PageProps } from 'types/globals';

const PaymentMethod:FC<PageProps> = ({ id }): JSX.Element => {
  const txt = 'PaymentMethod page';
  return (
    <div id={id}>
      {txt}
    </div>
  );
};

export default PaymentMethod;
