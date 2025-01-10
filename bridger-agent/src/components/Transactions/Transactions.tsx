"use client";

import { ChangeEvent } from "react";

const CSV_PREFIX = "data:text/csv;base64,";
export const Transactions = () => {
  const onHistoricalFile = (
    value: ChangeEvent<HTMLInputElement> | undefined
  ) => {
    const files = value?.target.files;
    if (!files) return;
    const file = files[0];
    const reader = new FileReader();
    reader.onload = async () => {
      console.log(String(reader.result).slice(CSV_PREFIX.length));
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
      console.log(String(reader.result).slice(CSV_PREFIX.length));
    };
    reader.readAsDataURL(file);
  };
  const rows = [
    [
      "01/01/2024",
      "$100.00",
      "Some description",
      ["Amazon", "Google", "Apple"],
      ["Sales", "Marketing", "Payroll"],
    ],
    [
      "01/01/2024",
      "$100.00",
      "Some description",
      ["Amazon", "Google", "Apple"],
      ["Sales", "Marketing", "Payroll"],
    ],
    [
      "01/01/2024",
      "$100.00",
      "Some description",
      ["Amazon", "Google", "Apple"],
      ["Sales", "Marketing", "Payroll"],
    ],
  ].map((row, index) => {
    const style = { padding: "10px" };
    return (
      <tr key={index}>
        <td style={style}>{row[0]}</td>
        <td style={style}>{row[1]}</td>
        <td style={style}>{row[2]}</td>
        <td style={style}>
          <select>
            <option value={row[3][0]}>{row[3][0]}</option>
            <option value={row[3][1]}>{row[3][1]}</option>
            <option value={row[3][2]}>{row[3][2]}</option>
          </select>
        </td>
        <td style={style}>
          <select>
            <option value={row[4][0]}>{row[4][0]}</option>
            <option value={row[4][1]}>{row[4][1]}</option>
            <option value={row[4][2]}>{row[4][2]}</option>
          </select>
        </td>
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
            <th>Date</th>
            <th>Amount</th>
            <th>Description</th>
            <th>Payee</th>
            <th>Category</th>
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
