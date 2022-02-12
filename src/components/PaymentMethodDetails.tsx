import type { FC } from 'react';
import SelectAmount from 'components/SelectAmount';
import Input from 'components/Input';
import TransactionsOverview from 'components/TransactionsOverview';
import SubmitButton from 'components/SubmitButton';

interface Props {}

const PaymentMethodDetails:FC<Props> = (): JSX.Element => (
  <div id="payment-method-details-container">
    <SelectAmount />
    <Input />
    <TransactionsOverview />
    <SubmitButton />
  </div>
);

export default PaymentMethodDetails;
