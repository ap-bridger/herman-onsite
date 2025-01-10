import {prisma} from "@/lib/db"
import {parse} from "fast-csv";
import moment from "moment";

export const file = async (_: any, args: {contents: string}) => {

  const decodedContents = Buffer.from( args.contents, "base64").toString("utf-8")
  // console.log("contents: " + decodedContents)

  const stream = await parse({ headers: ['date', 'description', 'payee', 'category', 'spent', 'received'], renameHeaders: true }).on('data',  async row => {
    await prisma.pendingTransactions.create({
      data: {
        date: moment(row.date, "mm/dd/yyyy").toISOString(),
        description: row.description,
        payee: row.payee,
        accountCategory: row.category,
        spent: parseInt(row.spent?.replace("$", "").replace(",", "").replace(".", "")),
        received: parseInt(row.received?.replace("$", "").replace(",", "").replace(".", "")),
      }
    }).catch(reason => console.log("Failed to save: " + reason));
  });
  stream.write(decodedContents);
  stream.end();

  return pendingTransactions();
};

export const pendingTransactions = async () => {
  return prisma.pendingTransactions.findMany();
}

export const vendors = async () => {
  prisma.pendingTransactions.findMany({
    distinct: "payee"
  })
}