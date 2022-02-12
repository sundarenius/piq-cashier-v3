import type { FC } from 'react';
import SelectAmount from 'components/SelectAmount';
import Input from 'components/Input';
import TransactionsOverview from 'components/TransactionsOverview';
import SubmitButton from 'components/SubmitButton';

interface Props {
  paymentMethod: any
}

const PaymentMethodDetails:FC<Props> = ({ paymentMethod }): JSX.Element => {
  console.log(paymentMethod);
  return (
    <div className="container" id="payment-method-details-container">
      <SelectAmount />
      <Input />
      <TransactionsOverview />
      <SubmitButton />
    </div>
  );
};

export default PaymentMethodDetails;
