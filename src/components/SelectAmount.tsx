import type { FC } from 'react';

interface Props {}

const SelectAmount:FC<Props> = (): JSX.Element => {
  const txt = 'SelectAmount page';
  return (
    <h1>
      {txt}
    </h1>
  );
};

export default SelectAmount;
