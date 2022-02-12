import type { FC } from 'react';

interface Props {}

const SelectAmount:FC<Props> = (): JSX.Element => {
  const txt = 'SelectAmount page';
  return (
    <div id="select-amount-container">
      <h3>{txt}</h3>
    </div>
  );
};

export default SelectAmount;
