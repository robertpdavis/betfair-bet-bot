import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const CREATE_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const UPDATE_API = gql`
  mutation updateApi(
    $apiKeyTest: String,
    $testSessionId: String,
    $apiKeyLive: String,
    $liveSessionId: String,
    $apiMode: String,
    $apiUsername: String,
    $apiPassword: String,
    $certfile: String,
    $keyfile: String,
  ) {
    updateApi(
      apiKeyTest: $apiKeyTest,
      testSessionId: $testSessionId,
      apiKeyLive: $apiKeyLive,
      liveSessionId: $liveSessionId,
      apiMode: $apiMode,
      apiUsername: $apiUsername,
      apiPassword: $apiPassword,
      certfile: $certfile,
      keyfile: $keyfile,) 
      {
      _id
      apiKeyTest
      testSessionId
      apiKeyLive
      liveSessionId
      apiMode
      apiUsername
      apiPassword
      certfile
      keyfile
    }
  }
`;

