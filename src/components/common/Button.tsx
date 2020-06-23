import React, { MouseEvent } from 'react';
import styled from 'styled-components';

type ButtonType = 'default' | 'success' | 'danger';

interface ButtonProps {
  text: string;
  type?: ButtonType;
  onClick?: (event: MouseEvent) => void;
}

interface StyledProps {
  buttonType: ButtonType;
}

const StyledButton = styled.button<StyledProps>`
  color: ${(props) => getColor(props.buttonType)};
  border-color: ${(props) => getColor(props.buttonType)};
  background-color: #fff;
  padding: 0.6em 0.9em;
  font: inherit;
  font-size: 1.1rem;
  font-weight: bold;
  outline: none;
  border-width: 2px;
  border-style: solid;
  border-radius: 5px;
  cursor: pointer;
  user-select: none;
  opacity: 0.85;
  transition: all 250ms ease-in-out;

  :hover {
    opacity: 1;
    background-color: #f7f7f7;
  }
`;

function getColor(type: ButtonType): string {
  if (type === 'success') return '#28A745';
  if (type === 'danger') return '#DC3545';
  return '#000';
}

export default function Button({
  text,
  type = 'default',
  onClick,
}: ButtonProps) {
  return (
    <StyledButton buttonType={type} type="button" onClick={onClick}>
      {text}
    </StyledButton>
  );
}
