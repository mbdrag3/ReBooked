const typeDefs = `
  type Category {
    _id: ID
    name: String
  }

  type Book {
    _id: ID
    name: String
    author: String
    condition: String
    image: String
    price: Float
    category: Category
    comment: [Comment]
    userId: User
  }

  type Comment {
    _id: ID
    comment: String
    userId: User
  }

  type Order {
    _id: ID
    purchaseDate: String
    books: [Book]
    userId: User
  }

  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    password: String
    orders: [Order]
    comments: [Comment]
    books: [Book]
  }

  type Checkout {
    session: ID
  }

  type Auth {
    token: ID
    user: User
  }

  input BookInput {
    _id: ID
    purchaseQuantity: Int
    name: String
    image: String
    price: Float
    quantity: Int
  }

  type Query {
    categories: [Category]
    allBooks: [Book]
    getBooksByCategory(category: ID, name: String): [Book]
    getBookByName(_id: ID!): Book
    user: User
    order(_id: ID!): Order
    comments(bookId: ID!): [Comment]
    checkout(books: [BookInput]): Checkout
  }
  
  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    addBook(name: String!, author: String!, condition: String!, image: String, price: Float!, category: ID!): Book
    addOrder(books: [ID]!): Order
    updateUser(firstName: String, lastName: String, email: String, password: String): User
    updateBook(_id: ID!, quantity: Int!): Book
    addComment(bookId: ID!, comment: String!): Comment
    login(email: String!, password: String!): Auth
    addCategory(name: String!): Category
  }
`;

module.exports = typeDefs;
