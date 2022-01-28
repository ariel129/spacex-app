import { gql } from "@apollo/client";

export const ADD_USER = gql`
  mutation Insert_Users($name: String!, $rocket: String!) {
    insert_users(objects: { name: $name, rocket: $rocket }) {
      returning {
        id
      }
    }
  }
`;
