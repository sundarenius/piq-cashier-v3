import type { FC } from 'react';
import SelectAmount from 'components/SelectAmount';
import Input from 'components/Input';
import TransactionsOverview from 'components/TransactionsOverview';
import SubmitButton from 'components/SubmitButton';
import ListHeader from 'components/ListHeader';

interface Props {
  paymentMethod: any,
  showDetails: boolean
}

const PaymentMethodDetails:FC<Props> = ({ paymentMethod, showDetails }): JSX.Element => {
  console.log(paymentMethod);
  return (
    <div className="container" id="payment-method-details-container">
      <ListHeader paymentMethod={paymentMethod} />

      {showDetails && (
        <>
          <SelectAmount />
          <Input />
          <TransactionsOverview />
          <SubmitButton />
        </>
      )}

    </div>
  );
};

export default PaymentMethodDetails;
