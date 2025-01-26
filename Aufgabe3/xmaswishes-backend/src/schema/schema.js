const { gql } = require("graphql-tag");

const typeDefs = gql`
  type Wish {
    id: ID!
    name: String!
    wishText: String!
    status: String!
  }

  type Query {
    getWishStatus(id: ID!): Wish
  }

  type Mutation {
    createWish(name: String!, wishText: String!): Wish
  }
`;

module.exports = typeDefs;
