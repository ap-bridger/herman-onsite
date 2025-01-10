"use client";

import { ChangeEvent } from "react";
import {FILE} from "@/components/Transactions/Transactions.api";
import {useMutation} from "@apollo/client";

const CSV_PREFIX = "data:text/csv;base64,";
export const Transactions = () => {
  const [runMutation, {data}] = useMutation(FILE);
  const onHistoricalFile = (
    value: ChangeEvent<HTMLInputElement> | undefined
  ) => {
    const files = value?.target.files;
    if (!files) return;
    const file = files[0];
    const reader = new FileReader();
    reader.onload = async () => {
      await runMutation({
        variables: {
          contents: String(reader.result).slice(CSV_PREFIX.length)
        },
      })
    };
    reader.readAsDataURL(file);
  };
  const onBankTransactionFile = (
    value: ChangeEvent<HTMLInputElement> | undefined
  ) => {
    const files = value?.target.files;
    if (!files) return;
    const file = files[0];
    const reader = new FileReader();
    reader.onload = async () => {
     await runMutation({
        variables: {
          contents: String(reader.result).slice(CSV_PREFIX.length)
        },
      })
    };
    reader.readAsDataURL(file);
  };
  const rows = (data?.file || []).map((transaction, index) => {
    const style = { padding: "10px" };
    return (
      <tr key={index}>
        <td style={style}>{transaction.id}</td>
        <td style={style}>{transaction.date}</td>
        <td style={style}>{transaction.description}</td>
        <td style={style}>{transaction.payee}</td>
        <td style={style}>{transaction.accountDescription}</td>
        <td style={style}>{transaction.spent}</td>
        <td style={style}>{transaction.recieved}</td>
      </tr>
    );
  });

  return (
    <>
      <p>Historical file:</p>
      <input type="file" accept=".csv" onChange={onHistoricalFile} />
      <p>Bank transaction file:</p>
      <input type="file" accept=".csv" onChange={onBankTransactionFile} />
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Date</th>
            <th>Description</th>
            <th>Payee</th>
            <th>Account Category</th>
            <th>Spent</th>
            <th>Received</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
      <button
        style={{
          backgroundColor: "gray",
        }}
      >
        Download Categorizations
      </button>
    </>
  );
};
