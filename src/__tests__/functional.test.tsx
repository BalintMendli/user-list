import React from 'react';
import { mount } from 'enzyme';
import App from '../components/App';
import { Provider } from 'react-redux';
import store from '../store';
import 'jest-styled-components';
import UserCard from '../components/UserCard';
import UserList from '../components/UserList';
import Modal from '../components/Modal';
import SelectOrder from '../components/SelectOrder';

let wrapper;

beforeEach(() => {
  wrapper = mount(
    <Provider store={store}>
      <App />
    </Provider>,
  );
});

describe('App', () => {
  it('renders correctly', () => {
    expect(wrapper.find('h1').text()).toBe('USERS');
    expect(wrapper.find('button').text()).toBe('Add User');
    expect(wrapper.find(SelectOrder)).toHaveLength(1);
    expect(wrapper.find(SelectOrder).text()).toContain('Name');
    expect(wrapper.find(SelectOrder).text()).toContain('Surname');
    expect(wrapper.find(SelectOrder).text()).toContain('Age');
    expect(wrapper.find(SelectOrder).text()).toContain('Connected users');
    expect(wrapper.find(UserList)).toHaveLength(1);
  });
});

describe('UserCard', () => {
  it('renders correctly', () => {
    expect(wrapper.find(UserCard)).toHaveLength(15);
    const userCard = wrapper.find(UserCard).at(0);
    expect(userCard.find('img')).toHaveLength(1);
    expect(userCard.text()).toContain('Name');
    expect(userCard.text()).toContain('Surname');
    expect(userCard.text()).toContain('Age');
    expect(userCard.text()).toContain('C. users');
    expect(userCard.text()).toContain('Description');
  });
});

describe('Add User function', () => {
  it('adds user correctly', () => {
    expect(wrapper.find(Modal)).toHaveLength(0);
    wrapper.find('button').simulate('click');
    const modal = wrapper.find(Modal);
    expect(modal).toHaveLength(1);
    expect(modal.find('input')).toHaveLength(4);
    modal
      .find('input')
      .at(0)
      .simulate('change', { target: { value: 'aaa' } });
    modal.find('button').at(0).simulate('click');
    expect(wrapper.find(UserCard).at(0).text()).toContain('aaa');
  });
});

describe('Edit User function', () => {
  it('edits user correctly', () => {
    expect(wrapper.find(Modal)).toHaveLength(0);
    wrapper.find(UserCard).at(0).simulate('click');
    const modal = wrapper.find(Modal);
    expect(modal).toHaveLength(1);
    expect(modal.find('input')).toHaveLength(4);
    modal
      .find('input')
      .at(1)
      .simulate('change', { target: { value: 'test surname' } });
    modal.find('button').at(0).simulate('click');
    expect(wrapper.find(UserCard).at(0).text()).toContain('test surname');
  });
});

describe('Delete User function', () => {
  it('deletes user correctly', () => {
    expect(wrapper.find(Modal)).toHaveLength(0);
    wrapper.find('button').simulate('click');
    let modal = wrapper.find(Modal);
    expect(modal).toHaveLength(1);
    expect(modal.find('input')).toHaveLength(4);
    modal
      .find('input')
      .at(0)
      .simulate('change', { target: { value: 'aa test user' } });
    modal.find('button').at(0).simulate('click');
    expect(wrapper.find(UserCard).at(0).text()).toContain('aa test user');

    wrapper.find(UserCard).at(0).simulate('click');
    modal = wrapper.find(Modal);
    modal.find('button').at(1).simulate('click');
    expect(wrapper.text()).not.toContain('aa test user');
  });
});

describe('Sorting', () => {
  it('is ordered by name by default', () => {
    expect(wrapper.find(Modal)).toHaveLength(0);
    wrapper.find('button').simulate('click');
    const modal = wrapper.find(Modal);
    expect(modal).toHaveLength(1);
    expect(modal.find('input')).toHaveLength(4);
    modal
      .find('input')
      .at(0)
      .simulate('change', { target: { value: 'aa name' } });
    modal
      .find('input')
      .at(1)
      .simulate('change', { target: { value: 'Name: zz surname' } });
    modal.find('button').at(0).simulate('click');
    expect(wrapper.find(UserCard).at(0).text()).toContain('Name: aa name');
  });

  it('orders by surname', () => {
    expect(wrapper.find(Modal)).toHaveLength(0);
    wrapper.find('button').simulate('click');
    const modal = wrapper.find(Modal);
    expect(modal).toHaveLength(1);
    expect(modal.find('input')).toHaveLength(4);
    modal
      .find('input')
      .at(0)
      .simulate('change', { target: { value: 'zzz name' } });
    modal
      .find('input')
      .at(1)
      .simulate('change', { target: { value: 'aaa surname' } });
    modal.find('button').at(0).simulate('click');
    expect(wrapper.find(UserCard).at(0).text()).not.toContain(
      'Surname: aaa surname',
    );
    wrapper.find('select option[value="surname"]').simulate('change');
    expect(wrapper.find(UserCard).at(0).text()).toContain(
      'Surname: aaa surname',
    );
  });

  it('orders by age', () => {
    expect(wrapper.find(Modal)).toHaveLength(0);
    wrapper.find('button').simulate('click');
    const modal = wrapper.find(Modal);
    expect(modal).toHaveLength(1);
    expect(modal.find('input')).toHaveLength(4);
    modal
      .find('input')
      .at(0)
      .simulate('change', { target: { value: 'zzz name' } });
    modal
      .find('input')
      .at(1)
      .simulate('change', { target: { value: 'zzz surname' } });
    modal
      .find('input')
      .at(2)
      .simulate('change', { target: { value: 100 } });
    modal.find('button').at(0).simulate('click');
    expect(wrapper.find(UserCard).at(0).text()).not.toContain('Age: 100');
    wrapper.find('select option[value="age"]').simulate('change');
    expect(wrapper.find(UserCard).at(0).text()).toContain('Age: 100');
  });

  it('orders by connected users', () => {
    expect(wrapper.find(Modal)).toHaveLength(0);
    wrapper.find('button').simulate('click');
    const modal = wrapper.find(Modal);
    expect(modal).toHaveLength(1);
    expect(modal.find('input')).toHaveLength(4);
    modal
      .find('input')
      .at(0)
      .simulate('change', { target: { value: 'zzz name' } });
    modal
      .find('input')
      .at(1)
      .simulate('change', { target: { value: 'zzz surname' } });
    modal
      .find('input')
      .at(3)
      .simulate('change', { target: { value: 10000 } });
    modal.find('button').at(0).simulate('click');
    expect(wrapper.find(UserCard).at(0).text()).not.toContain(
      'C. users: 10000',
    );
    wrapper.find('select option[value="connectedUsers"]').simulate('change');
    expect(wrapper.find(UserCard).at(0).text()).toContain('C. users: 10000');
  });
});
