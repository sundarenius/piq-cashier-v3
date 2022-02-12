import type { FC } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/redux-hooks';
import { contextActions } from 'redux/actions';
import {
  Header,
} from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';
import {
  getPaymentMethodName,
  getPaymentMethodSubheader,
} from 'utils/helpers';

interface Props {
  paymentMethod: any
}

const style = {
  cursor: 'pointer',
};

const ListHeader:FC<Props> = ({ paymentMethod }): JSX.Element => {
  const dispatch = useAppDispatch();
  const activePaymentMethod = useAppSelector(({ context }) => context.activePaymentMethod);
  const { t } = useTranslation();

  const onPaymentClick = () => {
    if (activePaymentMethod?.uuid === paymentMethod.uuid) {
      dispatch(contextActions.setActivePaymentMethod({}));
    } else {
      dispatch(contextActions.setActivePaymentMethod(paymentMethod));
    }
  };

  return (
    <Header
      style={style}
      className="container list-header-container"
      onClick={onPaymentClick}
      onKeyPress={onPaymentClick}
    >
      <h3 id="payment-name">{getPaymentMethodName(paymentMethod, t)}</h3>
      <p id="payment-subheader">{getPaymentMethodSubheader(paymentMethod, t)}</p>
    </Header>
  );
};

export default ListHeader;
