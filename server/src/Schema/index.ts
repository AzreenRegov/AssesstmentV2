import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type User {
    id: ID
    username: String
    firstName: String
    lastName: String
    email: String
    phoneNo: String
    password: String
    accessToken: String
    message: String
  }

  type Query {
    getAllUsers: [User]
    getUserById(id: Int): User
  }

  type Mutation {
    register(
      username: String!
      firstName: String!
      lastName: String!
      email: String!
      phoneNo: String!
      password: String!
    ): User
    login(username: String!, password: String!): User
  }
`;
