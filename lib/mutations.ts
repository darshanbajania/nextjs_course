import { gql } from "@apollo/client";

export const CREATE_NEW_USER = gql`
  mutation CREATE_NEW_USER($userData: users_customer_insert_input!) {
    insert_users_customer_one(object: $userData) {
      id
    }
  }
`;

export const CREATE_NEW_PROJECT = gql`
  mutation CREATE_NEW_PROJECT($projectData: users_project_insert_input!) {
    insert_users_project_one(object: $projectData) {
      id
    }
  }
`;
