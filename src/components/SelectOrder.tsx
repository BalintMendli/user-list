import React from 'react';
import { useDispatch } from 'react-redux';
import { CHANGE_ORDER } from '../actions/actionTypes';
import styled from 'styled-components';

const Select = styled.select`
  padding: 0.6em 0.9em;
  width: 200px;
  font-family: inherit;
  font-size: 18px;
  font-style: italic;
  border-radius: 5px;
  outline: none;
  border: solid 2px #000;
`;

const Label = styled.span`
  font-size: 20px;
  font-style: italic;
  margin-right: 15px;
`;

const SelectCont = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 350px) {
    flex-direction: column;

    > select {
      margin-top: 20px;
    }
  }
`;

export default function Order() {
  const dispatch = useDispatch();

  return (
    <SelectCont>
      <Label>Order by:</Label>
      <Select
        name="orderby"
        onChange={(e) =>
          dispatch({ type: CHANGE_ORDER, orderBy: e.target.value })
        }
      >
        <option value="name">Name</option>
        <option value="surname">Surname</option>
        <option value="age">Age</option>
        <option value="connectedUsers">Connected users</option>
      </Select>
    </SelectCont>
  );
}
