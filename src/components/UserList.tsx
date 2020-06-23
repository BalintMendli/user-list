import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import UserCard from './UserCard';
import InfiniteScroll from 'react-infinite-scroll-component';
import { INCREMENT_TOUSER } from '../actions/actionTypes';

const UsersDiv = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

export default function UserList() {
  const users = useSelector((state: any) => state.users.userList);
  const dispatch = useDispatch();

  const loadMoreData = () => {
    dispatch({ type: INCREMENT_TOUSER });
  };

  return (
    <div>
      <InfiniteScroll
        dataLength={users.size || 0}
        next={loadMoreData}
        hasMore={true}
        scrollThreshold={0.9}
        loader={<div>Loading...</div>}
      >
        <UsersDiv>
          {users.map((u: any) => (
            <UserCard key={u.id} user={u} />
          ))}
        </UsersDiv>
      </InfiniteScroll>
    </div>
  );
}
