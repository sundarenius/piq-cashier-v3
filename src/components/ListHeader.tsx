import type { FC } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/redux-hooks';
import { contextActions } from 'redux/actions';
import {
  Header,
  Grid,
} from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';
import {
  getPaymentMethodName,
  getPaymentMethodSubheader,
} from 'utils/helpers';
import MaskedAccount from 'components/MaskedAccount';
import Logo from 'components/Logo';

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

  const paymentName = getPaymentMethodName(paymentMethod, t);
  const subheader = getPaymentMethodSubheader(paymentMethod, t);

  return (
    <Header
      style={style}
      className="container list-header-container"
      onClick={onPaymentClick}
      onKeyPress={onPaymentClick}
    >
      <Grid>
        <Grid.Row columns={2}>
          <Grid.Column>
            <Logo paymentMethod={paymentMethod} paymentName={paymentName} />
          </Grid.Column>

          <Grid.Column textAlign="right">
            <h3 className="payment-name">{paymentName}</h3>
            <p className="payment-subheader">{subheader}</p>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row columns={16}>
          {paymentMethod?.maskedAccount && <MaskedAccount paymentMethod={paymentMethod} />}
        </Grid.Row>
      </Grid>

    </Header>
  );
};

export default ListHeader;
