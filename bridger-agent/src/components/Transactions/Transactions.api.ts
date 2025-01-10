import { gql } from "@apollo/client";

export const FILE = gql(`
mutation uploadFile($contents: String!) {
  file(contents: $contents)
}
`);

export const PENDING_TRANSACTIONS = gql(`
mutation PendingTransactions {
  pendingTransactions
}
`);