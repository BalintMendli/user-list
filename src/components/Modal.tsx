import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import {
  TOGGLE_MODAL,
  REMOVE_USER,
  EDIT_USER,
  CREATE_USER,
} from '../actions/actionTypes';
import { useDispatch } from 'react-redux';
import avatar from '../assets/avatar.svg';
import Button from './common/Button';
import { User } from '../reducers/users';

const modalRoot = document.querySelector('#modal');

interface ModalProps {
  user: User | null;
}

const ModalDiv = styled.div`
  background-color: rgba(0, 0, 0, 0.1);
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Card = styled.div`
  min-height: 180px;
  min-width: 250px;
  background-color: #fff;
  border: 3px solid #000;
  border-radius: 5px;
  padding: 15px;
  position: relative;
`;

const Main = styled.div`
  display: flex;
  align-items: center;
`;

const Avatar = styled.div`
  max-width: 100px;
  flex: 1;
  margin-right: 8px;
`;

const Names = styled.div`
  display: flex;
  flex-direction: column;
  flex: 2;
`;

const Name = styled.div`
  margin-bottom: 5px;
`;

const Surname = styled.div``;

const Info = styled.div`
  display: flex;
  margin: 20px 0;
`;

const Img = styled.img`
  max-width: 100%;
  height: auto;
`;

const B = styled.span`
  font-weight: bold;
  font-size: 20px;
`;

const Input = styled.input`
  padding: 0.6em 0.9em;
  width: 180px;
  font-family: inherit;
  font-size: 18px;
  font-style: italic;
  border-radius: 5px;
  outline: none;
  border: solid 2px #000;
  width: 130px;
  margin-left: 8px;
`;

const NumberInput = styled(Input)`
  width: 100px;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;

  button + button {
    margin-left: 8px;
  }
`;

const Close = styled.div`
  position: absolute;
  right: 10px;
  top: 5px;
  cursor: pointer;
  font-size: 22px;
`;

export default function Modal({ user }: ModalProps) {
  const [name, setName] = useState(user?.name || '');
  const [surname, setSurname] = useState(user?.surname || '');
  const [age, setAge] = useState(user?.age || '');
  const [connectedUsers, setCUsers] = useState(user?.connectedUsers || '');
  const dispatch = useDispatch();

  return ReactDOM.createPortal(
    <ModalDiv>
      <Card>
        <Close onClick={() => dispatch({ type: TOGGLE_MODAL, user })}>
          &times;
        </Close>
        <Main>
          <Avatar>
            <Img src={user?.image || avatar} alt="avatar" />
          </Avatar>
          <Names>
            <Name>
              <B>Name:</B>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Name>
            <Surname>
              <B>Surname:</B>
              <Input
                type="text"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
              />
            </Surname>
          </Names>
        </Main>
        <Info>
          <div>
            <B>Age:</B>
            <NumberInput
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
            &nbsp;&nbsp;|&nbsp;<B>C. users:</B>
            <NumberInput
              type="text"
              value={connectedUsers}
              onChange={(e) => setCUsers(e.target.value)}
            />
          </div>
        </Info>
        <Buttons>
          <Button
            text="Save"
            type="success"
            onClick={() =>
              dispatch({
                type: user ? EDIT_USER : CREATE_USER,
                user: {
                  id: user?.id || 1,
                  name,
                  surname,
                  age,
                  connectedUsers,
                  description: user?.description || '',
                },
              })
            }
          />
          {user && (
            <Button
              text="Remove"
              type="danger"
              onClick={() => dispatch({ type: REMOVE_USER, user })}
            />
          )}
        </Buttons>
      </Card>
    </ModalDiv>,
    modalRoot,
  );
}
