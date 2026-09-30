import { requireChatGPTUser } from "@/app/chatgpt-auth";
import Admin from "./panel";
export const dynamic="force-dynamic";
export default async function Page(){const user=await requireChatGPTUser("/admin");if(user.email.toLowerCase()!=="brs0819@gmail.com")return <main className="wrap" style={{paddingTop:60}}><h1 style={{fontSize:36}}>Bri’s corner</h1><p>This area is private. Sign in with Bri’s verified account.</p><a href="/signout-with-chatgpt?return_to=/admin">Switch account</a> · <a href="/">Back to the fundraiser</a></main>;return <Admin/>}
