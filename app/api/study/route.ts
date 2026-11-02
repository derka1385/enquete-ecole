import {env} from 'cloudflare:workers';
import {profiles,validateAnswers,type Profile} from '@/lib/questionnaire';
export const dynamic='force-dynamic';
const json=(data:unknown,status=200)=>Response.json(data,{status,headers:{'Cache-Control':'no-store','X-Content-Type-Options':'nosniff'}});
const hash=async(s:string)=>Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(s)))).map(x=>x.toString(16).padStart(2,'0')).join('');
async function auth(req:Request){const key=req.headers.get('X-Study-Key');if(!key||key.length<24||key.length>160)return null;return env.DB!.prepare('SELECT id,title,created_at AS createdAt FROM studies WHERE key_hash=?').bind(await hash(key)).first();}
export async function GET(req:Request){
 try{if(!env.DB)return json({error:'La base partagée est indisponible. Réessaie dans quelques instants.'},503);const study=await auth(req);if(!study)return json({error:'Code d’accès incorrect ou étude introuvable.'},401);const rows=await env.DB.prepare('SELECT * FROM responses WHERE study_id=? ORDER BY updated_at DESC').bind(study.id).all();return json({study,responses:rows.results.map((r:any)=>({id:r.id,studyId:r.study_id,profile:r.profile,paperRef:r.paper_ref,status:r.status,answers:JSON.parse(r.answers),version:r.version,createdAt:r.created_at,updatedAt:r.updated_at}))});}
 catch{return json({error:'Impossible de charger les réponses. Ton brouillon reste sur cet appareil.'},503);}
}
export async function POST(req:Request){
 try{
 if(req.headers.get('Origin')&&req.headers.get('Origin')!==new URL(req.url).origin)return json({error:'Origine refusée.'},403);
 if(!env.DB)return json({error:'Base de données indisponible.'},503);
 if(Number(req.headers.get('Content-Length')||0)>250000)return json({error:'Envoi trop volumineux.'},413);
 const bodyText=await req.text();if(bodyText.length>250000)return json({error:'Envoi trop volumineux.'},413);const body=JSON.parse(bodyText);const now=new Date().toISOString();
 if(body.action==='create'){
 const title=String(body.title||'').trim();if(title.length<2||title.length>120)return json({error:'Le nom de l’étude doit contenir de 2 à 120 caractères.'},400);
 const id=crypto.randomUUID();const key=crypto.randomUUID().replaceAll('-','')+crypto.randomUUID().slice(0,8);
 await env.DB.prepare('INSERT INTO studies (id,title,key_hash,created_at) VALUES (?,?,?,?)').bind(id,title,await hash(key),now).run();return json({study:{id,title,createdAt:now},key},201);
 }
 const study=await auth(req);if(!study)return json({error:'Code d’accès incorrect.'},401);
 if(body.action==='save'){
 const r=body.response;const profile=r?.profile as Profile;
 if(!profiles[profile]||!['draft','complete'].includes(r.status))return json({error:'Profil ou statut invalide.'},400);
 const ref=String(r.paperRef||'').trim().toUpperCase();if(!/^[A-Z0-9][A-Z0-9 _.-]{0,49}$/.test(ref))return json({error:'Utilise une référence papier de 1 à 50 caractères : lettres, chiffres, espaces ou tirets.'},400);
 const validation=validateAnswers(profile,r.answers);if(validation)return json({error:validation},400);
 const answers=JSON.stringify(r.answers);if(answers.length>150000)return json({error:'Fiche trop volumineuse.'},400);
 if(r.id){
 const current=await env.DB.prepare('SELECT * FROM responses WHERE id=? AND study_id=?').bind(r.id,study.id).first();if(!current)return json({error:'Cette fiche n’existe plus. Garde le brouillon et crée une nouvelle fiche.'},404);
 if(current.profile!==profile)return json({error:'Le profil d’une fiche existante ne peut pas être changé.'},400);
 if(Number(current.version)!==r.version)return json({error:'Cette fiche a été modifiée par quelqu’un d’autre. Ton brouillon est conservé. Recharge la fiche pour comparer avant de ressaisir tes changements.'},409);
 const update=await env.DB.prepare('UPDATE responses SET paper_ref=?,status=?,answers=?,version=version+1,updated_at=? WHERE id=? AND study_id=? AND version=?').bind(ref,r.status,answers,now,r.id,study.id,r.version).run();if(!update.meta.changes)return json({error:'Modification simultanée : ton brouillon est conservé. Recharge la fiche avant de réessayer.'},409);
 return json({id:r.id,version:r.version+1,updatedAt:now});
 }
 const id=crypto.randomUUID();await env.DB.prepare('INSERT INTO responses (id,study_id,profile,paper_ref,status,answers,version,created_at,updated_at) VALUES (?,?,?,?,?,?,1,?,?)').bind(id,study.id,profile,ref,r.status,answers,now,now).run();return json({id,version:1,createdAt:now,updatedAt:now},201);
 }
 return json({error:'Action inconnue.'},400);
 }catch(error){const message=String(error);return json({error:message.includes('UNIQUE')?'Cette référence papier existe déjà pour ce profil. Ouvre la fiche existante ou change la référence.':'Enregistrement impossible. Le brouillon est conservé ; réessaie quand la connexion revient.'},message.includes('UNIQUE')?409:503);}
}
