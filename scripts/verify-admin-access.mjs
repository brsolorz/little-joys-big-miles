import vm from 'node:vm';import ts from 'typescript';import {readFileSync} from 'node:fs';import assert from 'node:assert/strict';
let stored=null,sessionCookie='',owner=true;const context=vm.createContext({crypto,TextEncoder,Response,Request,Date,console});
const exports={
'cloudflare:workers':{env:{DB:{prepare(sql){return {bind(value){this.value=value;return this},async first(){return stored?{value:JSON.stringify(stored)}:null},async run(){if(sql.includes('DO NOTHING')&&stored)return {meta:{changes:0}};stored=JSON.parse(this.value);return {meta:{changes:1}}}}}}}},
'next/headers':{cookies:async()=>({get:()=>sessionCookie?{value:sessionCookie}:undefined})},
'@/app/chatgpt-auth':{getChatGPTUser:async()=>owner?{email:'brs0819@gmail.com'}:null},
'@/lib/admin':{sameOrigin:r=>r.headers.get('origin')==='https://test.local'}
};
async function module(file){const m=new vm.SourceTextModule(ts.transpileModule(readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022}}).outputText,{context});await m.link(async name=>{const e=exports[name];const synthetic=new vm.SyntheticModule(Object.keys(e),function(){for(const [k,v] of Object.entries(e))this.setExport(k,v)},{context});return synthetic});await m.evaluate();return m.namespace;}
exports['@/lib/admin-password']=await module('lib/admin-password.ts');const route=await module('app/api/admin-access/route.ts');const req=body=>new Request('https://test.local/api/admin-access',{method:'POST',headers:{origin:'https://test.local','Content-Type':'application/json',cookie:'bri_admin='+sessionCookie},body:JSON.stringify(body)});
owner=false;let r=await route.POST(req({password:'sample password for tests'}));assert.equal(r.status,403);assert.equal(stored,null);
owner=true;r=await route.POST(req({password:'sample password for tests'}));assert.equal(r.status,200);assert.notEqual(stored.hash,'sample password for tests');sessionCookie=r.headers.get('set-cookie').match(/bri_admin=([^;]+)/)[1];assert.equal(await exports['@/lib/admin-password'].passwordSession(),true);
r=await route.POST(req({action:'logout'}));assert.equal(r.status,200);assert.equal(await exports['@/lib/admin-password'].passwordSession(),false);
for(let i=0;i<5;i++){r=await route.POST(req({password:'incorrect sample password'}));assert.equal(r.status,403)}r=await route.POST(req({password:'sample password for tests'}));assert.equal(r.status,429);stored.blockedUntil=0;owner=false;r=await route.POST(req({password:'sample password for tests'}));assert.equal(r.status,200);sessionCookie=r.headers.get('set-cookie').match(/bri_admin=([^;]+)/)[1];assert.equal(await exports['@/lib/admin-password'].passwordSession(),true);stored.sessions[0].expires=0;assert.equal(await exports['@/lib/admin-password'].passwordSession(),false);
console.log('Passed: owner-only setup, password hashing, standalone login, session revocation/expiry, and failed-attempt throttling. Test passwords only; no production data changed.');
