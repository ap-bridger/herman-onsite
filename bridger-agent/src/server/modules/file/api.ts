import { prisma } from "@/lib/db"

export const file = async (_: any, args: {contents: string}) => {

  const decodedContents = Buffer.from( args.contents, "base64").toString("utf-8")
  console.log("contents: " + decodedContents)

  // await prisma.file.create({
  //   data: {
  //     type: "type", name: "name"
  //   }
  // });

  return "";
};
