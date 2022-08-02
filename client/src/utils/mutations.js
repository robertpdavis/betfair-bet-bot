import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation loginUser($username: String!, $password: String!) {
    loginUser(username: $username, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const CREATE_USER = gql`
  mutation createUser($username: String!, $email: String!, $password: String!, $firstName: String!, $lastName: String!) {
    createUser(username: $username, email: $email, password: $password, firstName: $firstName, lastName: $lastName) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const UPDATE_API = gql`
  mutation updateApi($userId: ID!, $data: String!){
    updateApi(userId: $userId, data: $data){
      status
      msg
    }
  }
`;

export const TOGGLE_API = gql`
  mutation toggleApi($userId: ID!, , $api: String, $toggle: String!) {
    toggleApi(userId: $userId, api: $api, toggle: $toggle) {
      api
      ApiEnabled
      msg
    }
  }
`;

export const TOGGLE_API_LOGIN = gql`
  mutation toggleApiLogin($systemId: ID!, $toggle: String!) {
    toggleApiLogin(userId: $userId, api: $api, toggle: $toggle) {
      api
      ApiStatus
      msg
    }
  }
`;

export const TOGGLE_SYSTEM = gql`
  mutation toggleSystem($systemId: ID!, $toggle: String!) {
    toggleSystem(systemId: $systemId, toggle: $toggle) {
      isActive
      lastStopped
      lastStarted
      statusDesc
    }
  }
`;

export const CREATE_SYSTEM = gql`
  mutation updateSystem($userId: ID!, $data: String!) {
    updateSystem(userId: $userId, data: $data) {
      status
      msg
    }
  }
`;

export const UPDATE_SYSTEM = gql`
  mutation updateSystem($systemId: ID!, $data: String!) {
    updateSystem(systemId: $systemId, data: $data) {
      status
      msg
    }
  }
`;

export const RESET_SYSTEM = gql`
  mutation resetSystem($systemId: ID!) {
    resetSystem(systemId: $systemId) {
      status
      msg
    }
  }
`;

export const COPY_SYSTEM = gql`
  mutation copySystem($systemId: ID!) {
    copySystem(systemId: $systemId) {
      status
      msg
    }
  }
`;