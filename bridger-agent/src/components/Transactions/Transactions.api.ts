import { gql } from "@apollo/client";

export const FILE = gql(`
mutation uploadFile($contents: String!) {
  file(contents: $contents) {
    id
    date
    description
    payee
    accountCategory
    spent
    received
  }
}
`);
