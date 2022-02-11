import type { FC } from 'react';
import { useTranslation } from "react-i18next";

interface Props {}

const ListPaymentMethods:FC<Props> = (): JSX.Element => {
  const { t } = useTranslation();
  const txt = t('payment_methods');
  return (
    <h1>
      {txt}
    </h1>
  );
};

export default ListPaymentMethods;
