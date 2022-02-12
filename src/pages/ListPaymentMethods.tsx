import type { FC } from 'react';
import type { PageProps } from 'types/globals';
import ListHeader from 'components/ListHeader';
import PaymentMethodDetails from 'components/PaymentMethodDetails';
import { useAppSelector } from 'redux/redux-hooks';

const ListPaymentMethods:FC<PageProps> = ({ id }): JSX.Element => {
  const paymentMethods = useAppSelector(({ context }) => context.paymentMethods);
  const activePaymentMethod = useAppSelector(({ context }) => context.activePaymentMethod);

  return (
    <div id={id}>
      {paymentMethods.map((method: any) => (
        <div
          key={method.txType}
          id="list-payment-methods-container"
          style={{ border: '1px solid black', margin: '1px' }}
        >

          <ListHeader paymentMethod={method} />

          {method.uuid === activePaymentMethod?.uuid && <PaymentMethodDetails paymentMethod={method} />}

        </div>
      ))}
    </div>
  );
};

export default ListPaymentMethods;
