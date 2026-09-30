import { env } from "cloudflare:workers";
import { initial, State } from "./fundraiser";
export async function readState(){const row=await env.DB!.prepare("SELECT revision,value FROM fundraiser_state WHERE id=1").first<{revision:number;value:string}>();return {revision:row?.revision??0,state:row?JSON.parse(row.value) as State:structuredClone(initial)};}
export async function writeState(state:State,revision:number){const r=await env.DB!.prepare("INSERT INTO fundraiser_state(id,revision,value) VALUES(1,1,?) ON CONFLICT(id) DO UPDATE SET revision=fundraiser_state.revision+1,value=excluded.value WHERE fundraiser_state.revision=?").bind(JSON.stringify(state),revision).run();return r.meta.changes===1;}
