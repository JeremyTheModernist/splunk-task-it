import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  background-color: var(--primary-color);
  color: var(--black);
  margin: auto;
  display: flex;
  flex-flow: row;
  justify-content: center;
  font-size: var(--type-normal);
  padding: var(--padding-normal);
  font-weight: 600;
  width: 100%;
  width: ${(props) => (props.small ? "30%" : "100%")};
  border: none;
  border-radius: var(--border-normal);
  transition: 0.25s ease-in-out;
  cursor: pointer;
  :hover {
    transition: 0.25s ease-in-out;
    opacity: 0.8;
  }
  :disabled {
    background-color: var(--gray-4);
    cursor: not-allowed;
    :hover {
      opacity: 1;
    }
  }
`;

// a fund button
const Button = ({
  handleOnClick = () => {},
  type = "button",
  small = false,
  disabled = false,
  ...props
}) => {
  return (
    <StyledButton
      onClick={handleOnClick}
      type={type}
      small={small}
      disabled={disabled}
    >
      {props.children}
    </StyledButton>
  );
};

export default Button;
