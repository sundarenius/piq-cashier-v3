import type { FC } from 'react';

interface Props {
  id: string
}

const PaymentMethod:FC<Props> = ({ id }): JSX.Element => {
  const txt = 'PaymentMethod page';
  return (
    <div id={id}>
      {txt}
    </div>
  );
};

export default PaymentMethod;
