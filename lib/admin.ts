import {passwordSession} from "./admin-password";
import { getChatGPTUser } from "@/app/chatgpt-auth";
export async function isAdmin(){return passwordSession();}
export function sameOrigin(r:Request){return r.headers.get("origin")===new URL(r.url).origin;}
