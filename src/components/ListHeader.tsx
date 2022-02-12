import type { FC } from 'react';
import { useAppDispatch } from 'redux/redux-hooks';
import { contextActions } from 'redux/actions';
import {
  Header,
} from 'semantic-ui-react';

interface Props {
  paymentMethod: any
}

const ListHeader:FC<Props> = ({ paymentMethod }): JSX.Element => {
  const dispatch = useAppDispatch();
  const txt = 'ListHeader page';

  const onPaymentClick = () => {
    dispatch(contextActions.setActivePaymentMethod(paymentMethod));
  };

  return (
    <Header
      onClick={onPaymentClick}
      onKeyPress={onPaymentClick}
      id="list-header-container}"
    >
      <h3>{txt}</h3>
    </Header>
  );
};

export default ListHeader;
