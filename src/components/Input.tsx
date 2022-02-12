import type { FC } from 'react';

interface Props {}

const Input:FC<Props> = (): JSX.Element => {
  const txt = 'Input page';
  return (
    <div id="input-container">
      <h3>{txt}</h3>
    </div>
  );
};

export default Input;
