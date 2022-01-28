import { gql } from "@apollo/client";

export const USER_LISTS = gql`
  query Users($limit: Int!) {
    users(limit: $limit, order_by: { timestamp: desc }) {
      id
      name
      rocket
      timestamp
    }
  }
`;
