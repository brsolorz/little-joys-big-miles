import { readState } from "@/lib/store";
export async function GET(){try{const {state}=await readState();return Response.json({items:state.items.filter(i=>i.published),events:state.events.filter(e=>e.published)},{headers:{"Cache-Control":"no-store"}});}catch{return Response.json({error:"The collection is temporarily unavailable. Please try again or email Bri."},{status:503});}}
