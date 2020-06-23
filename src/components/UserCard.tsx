import React from 'react';
import styled from 'styled-components';
import avatar from '../assets/avatar.svg';
import { useDispatch } from 'react-redux';

export interface User {
  name: string;
  surname: string;
  connectedUsers: number;
  description: string;
  image: string | null;
  age: number;
  id: number;
}

interface CardProps {
  user: User;
}

const Card = styled.div`
  border: 2px solid #000;
  border-radius: 5px;
  width: 30%;
  padding: 10px;
  margin: 20px 0;
  cursor: pointer;
`;

const Main = styled.div`
  display: flex;
  align-items: center;
`;

const Avatar = styled.div`
  flex: 1;
  margin-right: 15px;
`;

const Names = styled.div`
  display: flex;
  flex-direction: column;
  flex: 2.5;
`;

const Name = styled.div`
  margin-bottom: 6px;
`;

const Surname = styled.div``;

const Info = styled.div`
  display: flex;
  margin: 6px 0;
`;

const Img = styled.img`
  max-width: 100%;
  height: auto;
`;

const B = styled.span`
  font-weight: bold;
`;

const I = styled.span`
  font-style: italic;
`;

const Sm = styled.span`
  font-size: 0.85em;
`;

const Desc = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: initial;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  line-height: 0.95;
`;

function UserCard({ user }: CardProps) {
  const dispatch = useDispatch();

  return (
    <Card onClick={() => dispatch({ type: 'SELECT_USER', user })}>
      <Main>
        <AvatarComp image={user.image} />
        <Names>
          <NameComp name={user.name} />
          <SurnameComp surname={user.surname} />
        </Names>
      </Main>
      <Info>
        <div>
          <B>Age:</B> <AgeComp age={user.age} /> | <B>C. users:</B>{' '}
          <CUsersComp cUsers={user.connectedUsers} />
        </div>
      </Info>
      <DescComp desc={user.description} />
    </Card>
  );
}

export default React.memo(
  UserCard,
  (prevProps, nextProps) =>
    prevProps.user.name === nextProps.user.name &&
    prevProps.user.surname === nextProps.user.surname &&
    prevProps.user.description === nextProps.user.description &&
    prevProps.user.age === nextProps.user.age &&
    prevProps.user.connectedUsers === nextProps.user.connectedUsers,
);

const AvatarComp = React.memo(({ image }: { image: string }) => {
  return (
    <Avatar>
      <Img src={image || avatar} alt="avatar" />
    </Avatar>
  );
});

const NameComp = React.memo(({ name }: { name: string }) => {
  return (
    <Name>
      <B>Name:</B> <I>{name}</I>
    </Name>
  );
});

const SurnameComp = React.memo(({ surname }: { surname: string }) => {
  return (
    <Name>
      <B>Name:</B> <I>{surname}</I>
    </Name>
  );
});

const AgeComp = React.memo(({ age }: { age: number }) => {
  return <I>{age}</I>;
});

const CUsersComp = React.memo(({ cUsers }: { cUsers: number }) => {
  return <I>{cUsers}</I>;
});

const DescComp = React.memo(({ desc }: { desc: string }) => {
  return (
    <Desc>
      <B>Description:</B> <Sm>{desc}</Sm>
    </Desc>
  );
});
