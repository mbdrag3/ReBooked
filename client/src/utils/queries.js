import { gql } from '@apollo/client';

export const QUERY_ALL_BOOKS=gql`
 query AllBooks {
  allBooks {
    _id
    author
    category {
      _id
      name
    }
    price
    name
    image
    condition
  
  }
}
`;

export const QUERY_BOOKS_BY_CATEGORY = gql`
query getBooksByCategory($category: ID) {
  books(category: $category) {
    name
    author
    category {
      _id
    }
    condition
    image
    price
    userId {
      _id
    }
    comment {
      comment
    }
  }
}
`;
export const QUERY_BOOKS_BY_NAME = gql`
query Query($name: String) {
  getBooksByName(name: $name) {
    author
    category {
      name
    }
    comment {
      comment
    }
    condition
    image
    name
    price
    userId {
      _id
    }
  }
}
`;

export const QUERY_CATEGORIES = gql`
  {
    categories {
      _id
      name
    }
  }
`;

export const QUERY_CHECKOUT = gql`
  query getCheckout($products: [ProductInput]) {
    checkout(products: $products) {
      session
    }
  }
`;

export const QUERY_USER = gql`
  {
  user {
    firstName
    lastName
    email
    password
    books {
      price
      name
      image
      condition
      comment {
        comment
        _id
      }
      category {
        name
        _id
      }
      author
      _id
      userId {
        lastName
        firstName
        email
        _id
      }
    }
    orders {
      purchaseDate
      books {
        price
        name
        author
        image
        condition
        comment {
          comment
          _id
        }
      }
      _id
    }
  }
}
`;
