import React from 'react';
import styled from 'styled-components';
import Controls from './Controls';
import UserList from './UserList';
import Modal from './Modal';
import { useSelector } from 'react-redux';

const Container = styled.div`
  max-width: 850px;
  margin: 0 auto;
  padding: 20px;
`;

const Title = styled.h1`
  text-align: center;
  text-decoration: underline;
`;

export default function App() {
  const selectedUser = useSelector((state: any) => state.users.currUser);
  const modalOpen = useSelector((state: any) => state.modalOpen);

  return (
    <Container>
      <Title>USERS</Title>
      <Controls />
      <UserList />
      {modalOpen && <Modal user={selectedUser} />}
    </Container>
  );
}
