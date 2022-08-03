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
  mutation updateApi($apiKeyTest: String, $testSessionId: String, $apiKeyLive: String, $liveSessionId: String, 
    $apiUsername: String, $apiPassword: String, $certfile: String, $keyfile: String)
    {
    updateApi(apiKeyTest: $apiKeyTest, testSessionId: $testSessionId, apiKeyLive: $apiKeyLive, liveSessionId: $liveSessionId, 
    apiUsername: $apiUsername, apiPassword: $apiPassword, certfile: $certfile, keyfile: $keyfile)
    {
      status
      msg
    }
  }
`;

export const ENABLE_API = gql`
  mutation enableApi($userId: ID!, $apiType: String!) {
    enableApi(userId: $userId, apiType: $apiType) {
      status
      msg
    }
  }
`;

export const DISABLE_API = gql`
  mutation disableApi($userId: ID!, $apiType: String!) {
    disableApi(userId: $userId, apiType: $apiType) {
      status
      msg
    }
  }
`;

export const TEST_API = gql`
  mutation testApi($userId: ID!, $apiType: String!) {
    testApi(userId: $userId, apiType: $apiType) {
      status
      msg
    }
  }
`;

export const API_LOGIN = gql`
  mutation apiLogin($userId: ID!, $apiType: String!) {
    apiLogin(userId: $userId, apiType: $apiType) {
      status
      msg
    }
  }
`;

export const API_LOGOUT = gql`
  mutation apiLogout($userId: ID!, $apiType: String!) {
    apiLogout(userId: $userId, apiType: $apiType) {
      status
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