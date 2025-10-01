import { connect } from "@/dbConfig/dbCofig";
import ExecutedCode from "@/models/codeModel";

export async function saveExecutedCode({ language, code, output, error, userId }: 
  { language: string; code: string; output?: string; error?: string; userId: string }) {

  await connect();

  const execCode = new ExecutedCode({
    language,
    code,
    output,
    error,
    userId,
  });

  console.log("saving");

  await execCode.save();

  
  return execCode;
}
