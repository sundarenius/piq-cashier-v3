import type { FC } from 'react';

interface Props {}

const SubmitButton:FC<Props> = (): JSX.Element => {
  const txt = 'SubmitButton page';
  return (
    <div id="submit-button-container">
      <h3>{txt}</h3>
    </div>
  );
};

export default SubmitButton;
