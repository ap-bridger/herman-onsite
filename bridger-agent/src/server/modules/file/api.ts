import { prisma } from "@/lib/db";
import { base64 } from "base-64";

export const file = async (_: any, args: {contents: string}) => {
  // const decodedContents = base64.decode(contents);

  console.log("contents: " + args.contents)

  // await prisma.file.create({
  //   data: {
  //     type: "type", name: "name"
  //   }
  // });

  return "";
};
