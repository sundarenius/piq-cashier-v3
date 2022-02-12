import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import SelectAmount from 'components/SelectAmount';

interface Props {
  id: string
}

const ListPaymentMethods:FC<Props> = ({ id }): JSX.Element => {
  const { t } = useTranslation();
  const txt = t('payment_methods');
  return (
    <div id={id}>
      <p>{txt}</p>
      <SelectAmount />
    </div>
  );
};

export default ListPaymentMethods;
