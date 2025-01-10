import { createSchema, createYoga } from "graphql-yoga";
import {file, pendingTransactions} from "@/server/modules/file/api";
import {greetings} from "@/server/modules/greet/api";

const { handleRequest } = createYoga({
  schema: createSchema({
    typeDefs: /* GraphQL */ `
      type Query {
        greetings: String
      }
      type PendingTransaction {
        id: Int,
        date: String,
        description: String,
        payee: String,
        accountCategory: String,
        spent: Int,
        received: Int,
      }
      type Mutation {
        file(contents: String!): [PendingTransaction]
      }
    `,
    resolvers: {
      Query: {
        greetings,
      },
      Mutation: {
          file,
          pendingTransactions,
        },
      },
  }),

  // While using Next.js file convention for routing, we need to configure Yoga to use the correct endpoint
  graphqlEndpoint: "/api/graphql",

  // Yoga needs to know how to create a valid Next response
  fetchAPI: { Response },
});

export {
  handleRequest as GET,
  handleRequest as POST,
  handleRequest as OPTIONS,
};
