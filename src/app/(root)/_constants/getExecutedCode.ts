import { connect } from "@/dbConfig/dbCofig";
import ExecutedCode from "@/models/codeModel";
import { Titillium_Web } from "next/font/google";

export async function saveExecutedCode({ language, code, output, error, userId }: 
  { language: string; code: string; output?: string; error?: string; userId: string }) {

  const time = new Date();

  await connect();

  const execCode = new ExecutedCode({
    language,
    code,
    output,
    error,
    userId,
    time
  });

  console.log(time);

  console.log(execCode.toObject())
  
  await execCode.save();
  
  return execCode;
}
