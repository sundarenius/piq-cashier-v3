import type { FC } from 'react';
import type { PageProps } from 'types/globals';
import ListHeader from 'components/ListHeader';
import PaymentMethodDetails from 'components/PaymentMethodDetails';
import { useAppSelector } from 'redux/redux-hooks';

const ListPaymentMethods:FC<PageProps> = ({ id }): JSX.Element => {
  const paymentMethods = useAppSelector(({ context }) => context.paymentMethods);
  const activePaymentMethod = useAppSelector(({ context }) => context.activePaymentMethod);

  const getMethodClass = (method: any) => {
    const { service, providerType, type } = method;
    const fixedClass = (str: string) => `payment-method-${str.toLowerCase()}`;
    return (service && fixedClass(service))
      || (providerType && fixedClass(providerType))
      || (type && fixedClass(type));
  };

  const showPaymentMethodDetails = (method: any) =>
    method.uuid === activePaymentMethod?.uuid;

  return (
    <div id={id}>
      {paymentMethods.map((method: any) => (
        <div
          key={method.txType}
          style={{ border: '1px solid black', margin: '1px' }}
          className={method.uuid === activePaymentMethod?.uuid
            ? `active payment-method ${getMethodClass(method)}`
            : 'payment-method'}
        >

          <ListHeader paymentMethod={method} />

          {showPaymentMethodDetails(method) && <PaymentMethodDetails paymentMethod={method} />}

        </div>
      ))}
    </div>
  );
};

export default ListPaymentMethods;
