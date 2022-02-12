import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import SelectAmount from 'components/SelectAmount';

interface Props {}

const ListPaymentMethods:FC<Props> = (): JSX.Element => {
  const { t } = useTranslation();
  const txt = t('payment_methods');
  return (
    <div>
      <p>{txt}</p>
      <SelectAmount />
    </div>
  );
};

export default ListPaymentMethods;
