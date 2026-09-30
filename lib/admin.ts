import { getChatGPTUser } from "@/app/chatgpt-auth";
export async function isAdmin(){const u=await getChatGPTUser();return !!u&&u.email.toLowerCase()==="brs0819@gmail.com";}
export function sameOrigin(r:Request){return r.headers.get("origin")===new URL(r.url).origin;}
