import { GoogleGenerativeAI } from "@google/generative-ai";

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GOOGLE_API_KEY!);

const isDev = true;

let chat: any = null;

async function run(_prompt: string, _optionalHistory?: any[]) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  if (isDev) {
    return "7&うちの趣味はおしゃべりやで〜!あんたは？";
  }

  if (!chat) {
    if (!_optionalHistory) {
      throw new Error("初期化時には第二引数（_optionalHistory?: any[]を渡してください）");
    }
    chat = await model.startChat({history: _optionalHistory});
  }

  const result = await chat.sendMessage(_prompt);
  const response = result.response;
  const text = await response.text();
  return text;
}

export default run

export function resetChat() {
  chat = null;
}

