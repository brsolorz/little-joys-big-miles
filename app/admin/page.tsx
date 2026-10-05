import { requireChatGPTUser } from '@/app/chatgpt-auth';
import {accessRecord,passwordSession} from '@/lib/admin-password';
import AccessForm from './access-form';
import Admin from './panel';
export const dynamic='force-dynamic';
export default async function Page(){if(await passwordSession())return <Admin/>;const record=await accessRecord();if(!record){const user=await requireChatGPTUser('/admin');if(user.email.toLowerCase()!=='brs0819@gmail.com')return <main className="wrap"><p>Only Bri’s verified account can set up this portal.</p></main>;}return <AccessForm setup={!record}/>;}
