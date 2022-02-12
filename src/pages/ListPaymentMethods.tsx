import type { FC } from 'react';
import type { PageProps } from 'types/globals';
// import { useTranslation } from 'react-i18next';
import ListHeader from 'components/ListHeader';
import PaymentMethodDetails from 'components/PaymentMethodDetails';
import { useAppSelector } from 'redux/redux-hooks';

const ListPaymentMethods:FC<PageProps> = ({ id }): JSX.Element => {
  const paymentMethods = useAppSelector(({ context }) => context.paymentMethods);
  const activePaymentMethod = useAppSelector(({ context }) => context.activePaymentMethod);

  // const { t } = useTranslation();
  // const txt = t('payment_methods');

  console.log(paymentMethods);

  return (
    <div id={id}>
      {paymentMethods.map((method: any) => (
        <div
          key={method.txType}
          id="payment-method"
          style={{ border: '1px solid black', margin: '1px' }}
        >

          <ListHeader paymentMethod={method} />

          {method.uuid === activePaymentMethod.uuid && <PaymentMethodDetails />}

        </div>
      ))}
    </div>
  );
};

export default ListPaymentMethods;
