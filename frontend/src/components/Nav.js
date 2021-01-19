import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useAppState } from "../state";

const StyledList = styled.ul`
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  list-style-type: none;
  font-size: var(--type-normal);
  margin: 0;
  padding: 0;
  background-color: var(--gray-5);
  cursor: pointer;
  li {
    padding: var(--padding-normal);
    padding-left: 0;
    padding-right: 0;
    a {
      background-color: var(--gray-5);
      color: var(--white);
      font-weight: 600;
      text-align: center;
      text-decoration: none;
      padding: var(--padding-normal);
      :hover {
        transition: 0.25s ease-in-out;
        background-color: var(--gray-6);
      }
    }
  }
  li:nth-child(2) {
    margin-left: auto;
  }
`;

const Nav = () => {
  const { isAuthorized, setIsAuthorized } = useAppState();
  return (
    <StyledList>
      <li>
        <Link to="/">Taskit</Link>
      </li>
      <li>
        <Link to="/profile">Profile</Link>
      </li>
      {!isAuthorized && (
        <>
          <li>
            <Link to="/signup">Signup</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </>
      )}
      {isAuthorized && (
        <li>
          <Link to="/" onClick={() => setIsAuthorized(false)}>
            Logout
          </Link>
        </li>
      )}
    </StyledList>
  );
};

export default Nav;
