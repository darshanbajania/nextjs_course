import { gql } from "@apollo/client";

export const GET_USER = gql`
  query GET_USER($email: String!) {
    users_customer(where: { email: { _eq: $email } }) {
      id
      email
      name
      profilePic
    }
  }
`;
export const GET_PROJECTS = gql`
  query GET_PROJECTS($userId: uuid) {
    users_project(where: { createdBy: { _eq: $userId } }) {
      id
      title
      description
      image
      liveSiteUrl
      githubUrl
      category
      customer {
        name
        profilePic
      }
    }
  }
`;
