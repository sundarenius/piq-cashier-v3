import type { FC } from 'react';

interface Props {
  paymentMethod: any
}

const MaskedAccount:FC<Props> = ({ paymentMethod }): JSX.Element => {
  // const txt = 'MaskedAccount page';
  return (
    <div id="masked-account-container">
      {paymentMethod?.maskedAccount && <p className="masked-account">{paymentMethod?.maskedAccount}</p>}
    </div>
  );
};

export default MaskedAccount;
