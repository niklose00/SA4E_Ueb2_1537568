import { gql } from "@apollo/client";

export const CREATE_WISH = gql`
  mutation CreateWish($name: String!, $wishText: String!) {
    createWish(name: $name, wishText: $wishText) {
      id
      name
      wishText
      status
    }
  }
`;
