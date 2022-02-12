import type { FC } from 'react';
import { getLogoUrl } from 'utils/helpers';

interface Props {
  paymentName: string,
  paymentMethod: any
}

const Logo:FC<Props> = ({ paymentName, paymentMethod }): JSX.Element => {
  console.log('paymentMethod logo.tsx');
  console.log(paymentMethod);
  const logoUrl = getLogoUrl(paymentMethod);
  return (
    <div id="logo-container">
      <img
        alt={`${paymentName}_logo`}
        src={logoUrl}
        style={{ maxHeight: '30px', maxWidth: '100px' }}
      />
    </div>
  );
};

export default Logo;
