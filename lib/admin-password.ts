import {env} from 'cloudflare:workers';
import {cookies} from 'next/headers';
type Access={salt:string;hash:string;sessions:{hash:string;expires:number}[];failures:number;blockedUntil:number};
export async function accessRecord(){const row=await env.DB!.prepare('SELECT value FROM fundraiser_state WHERE id=2').first<{value:string}>();return row?JSON.parse(row.value) as Access:null;}
export async function saveAccess(record:Access){await env.DB!.prepare('INSERT INTO fundraiser_state(id,revision,value) VALUES(2,1,?) ON CONFLICT(id) DO UPDATE SET revision=revision+1,value=excluded.value').bind(JSON.stringify(record)).run();}
export async function digest(text:string){return Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(text)))).map(x=>x.toString(16).padStart(2,'0')).join('');}
export async function passwordHash(password:string,salt:string){const key=await crypto.subtle.importKey('raw',new TextEncoder().encode(password),'PBKDF2',false,['deriveBits']);return Array.from(new Uint8Array(await crypto.subtle.deriveBits({name:'PBKDF2',salt:new TextEncoder().encode(salt),iterations:100000,hash:'SHA-256'},key,256))).map(x=>x.toString(16).padStart(2,'0')).join('');}
export async function passwordSession(){const token=(await cookies()).get('bri_admin')?.value;if(!token)return false;const record=await accessRecord();const hash=await digest(token);return !!record?.sessions.some(s=>s.hash===hash&&s.expires>Date.now());}

export async function createAccess(record:Access){const result=await env.DB!.prepare('INSERT INTO fundraiser_state(id,revision,value) VALUES(2,1,?) ON CONFLICT(id) DO NOTHING').bind(JSON.stringify(record)).run();return result.meta.changes===1;}
