import { gql } from "@apollo/client";

export const CREATE_NEW_USER = gql`
  mutation CREATE_NEW_USER($userData: users_customer_insert_input!) {
    insert_users_customer_one(object: $userData) {
      id
    }
  }
`;
