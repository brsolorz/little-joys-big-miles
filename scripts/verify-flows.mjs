import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
import assert from 'node:assert/strict';
let current={items:[{id:'clips',name:'Clips',description:'Clips',kind:'item',published:true,price:8,bundle:6,largePrice:15,largeBundle:12,image:'',variants:[{id:'stars',name:'Blue',shape:'Star',quantity:20}],ends:''}],events:[],requests:[]},revision=0,admin=false;
const modules={
'@/lib/store':{readState:async()=>({state:structuredClone(current),revision}),writeState:async(s,v)=>{if(v!==revision)return false;current=structuredClone(s);revision++;return true}},
'@/lib/admin':{isAdmin:async()=>admin,sameOrigin:r=>r.headers.get('origin')===new URL(r.url).origin}
};
const ctx=vm.createContext({Response,Request,console,crypto,Date,fetch:async()=>new Response('{}',{status:500}),structuredClone});
async function route(path){const code=ts.transpileModule(readFileSync(path,'utf8'),{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022}}).outputText;const mod=new vm.SourceTextModule(code,{context:ctx});await mod.link(async name=>{const e=modules[name];if(!e)throw Error(name);const m=new vm.SyntheticModule(Object.keys(e),function(){for(const [k,v]of Object.entries(e))this.setExport(k,v)},{context:ctx});return m});await mod.evaluate();return mod.namespace;}
const req=await route('app/api/requests/route.ts'), dashboard=await route('app/api/admin/route.ts');
const base={id:crypto.randomUUID(),itemId:'clips',variantId:'stars',units:8,pack:'large',name:'Test Supporter',email:'test@example.com',pickup:'hella',note:'Test only',website:''};
const request=(body,origin='https://test.local')=>new Request('https://test.local/api/requests',{method:'POST',headers:{origin,'Content-Type':'application/json'},body:JSON.stringify(body)});
let r=await req.POST(request(base));assert.equal(r.status,200);assert.equal(current.requests.length,1);assert.equal(current.requests[0].amount,15);assert.equal(current.requests[0].units,8);assert.equal(current.requests[0].emailSent,false);assert.equal(current.items[0].variants[0].quantity,20);
r=await req.POST(request(base));assert.equal(current.requests.length,1,'Retries must not duplicate requests');
r=await req.POST(request({...base,id:crypto.randomUUID(),units:12}));assert.equal(r.status,400,'A large star bundle is 8, not 12');
r=await req.POST(request({...base,id:crypto.randomUUID(),email:'invalid'}));assert.equal(r.status,400);
r=await req.POST(request(base,'https://other.local'));assert.equal(r.status,403);
current.items[0].variants[0].quantity=0;r=await req.POST(request({...base,id:crypto.randomUUID()}));assert.equal(r.status,409);
r=await dashboard.GET();assert.equal(r.status,403,'Anonymous users cannot read supporter details');
admin=true;let oldRevision=revision;revision++;r=await dashboard.POST(new Request('https://test.local/api/admin',{method:'POST',headers:{origin:'https://test.local','Content-Type':'application/json'},body:JSON.stringify({state:current,revision:oldRevision})}));assert.equal(r.status,409,'Stale saves cannot overwrite newer state');
console.log('Passed: star pricing, stock validation, idempotency, email failure persistence, origin protection, admin privacy, and stale-save protection. No real emails sent.');
