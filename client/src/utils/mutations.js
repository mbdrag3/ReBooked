import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_ORDER = gql`
  mutation addOrder($products: [ID]!) {
    addOrder(products: $products) {
      purchaseDate
      products {
        _id
        name
        description
        price
        quantity
        category {
          name
        }
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      token
      user {
        _id
      }
    }
  }
`;
export const UPDATE_USER = gql`
  mutation updateUser(
    $firstName: String
    $lastName: String
    $email: String
    $password: String
  ) {
    updateUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) 
  }
`;

export const ADD_COMMENT = gql`
  mutation AddComment($bookId: ID!, $comment: String!) {
    addComment(bookId: $bookId, comment: $comment) {
      comment
      userId {
        firstName
        lastName
      }
    }
  }
`


//UPDATE_BOOKS
