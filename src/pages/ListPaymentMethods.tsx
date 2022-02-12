import type { FC } from 'react';
import type { PageProps } from 'types/globals';
import { ListTypes } from 'types/globals';
import ListHeader from 'components/ListHeader';
import PaymentMethodDetails from 'components/PaymentMethodDetails';
import { useAppSelector } from 'redux/redux-hooks';

const ListPaymentMethods:FC<PageProps> = ({ id }): JSX.Element => {
  const paymentMethods = useAppSelector(({ context }) => context.paymentMethods);
  const activePaymentMethod = useAppSelector(({ context }) => context.activePaymentMethod);
  const config = useAppSelector(({ context }) => context.config);

  const getMethodClass = (method: any) => {
    const { service, providerType, type } = method;
    const fixedClass = (str: string) => `payment-method-${str.toLowerCase()}`;
    return (service && fixedClass(service))
      || (providerType && fixedClass(providerType))
      || (type && fixedClass(type));
  };

  const showPaymentMethodDetails = (method: any) =>
    method.uuid === activePaymentMethod?.uuid
    && config?.listType === ListTypes.LIST;

  const style = {
    margin: '2px',
    border: config?.listType === ListTypes.LIST ? '1px solid lightgrey' : '',
  };

  return (
    <div id={id}>
      {paymentMethods.map((method: any) => (
        <div
          key={method.txType}
          style={style}
          className={method.uuid === activePaymentMethod?.uuid
            ? `active payment-method ${getMethodClass(method)}`
            : 'payment-method'}
        >

          {config?.listType === ListTypes.LIST && <ListHeader paymentMethod={method} />}

          {showPaymentMethodDetails(method) && <PaymentMethodDetails paymentMethod={method} />}

        </div>
      ))}
    </div>
  );
};

export default ListPaymentMethods;
