let promise;
export function openDB(){return promise??=new Promise((resolve,reject)=>{const req=indexedDB.open('contraprova',2);req.onupgradeneeded=()=>{for(const name of ['investigations','checks','preferences'])if(!req.result.objectStoreNames.contains(name))req.result.createObjectStore(name,{keyPath:name==='preferences'?'key':'id'});};req.onsuccess=()=>{req.result.onversionchange=()=>{req.result.close();promise=undefined;};resolve(req.result);};req.onerror=()=>{promise=undefined;reject(req.error);};req.onblocked=()=>{promise=undefined;reject(new Error('Feche outras abas do Contraprova para atualizar o armazenamento.'));};});}
async function transaction(store,mode,action){const db=await openDB();return new Promise((resolve,reject)=>{const tx=db.transaction(store,mode);let value;try{const req=action(tx.objectStore(store));if(req)req.onsuccess=()=>value=req.result;}catch(error){tx.abort();reject(error);return;}tx.oncomplete=()=>resolve(value);tx.onerror=()=>reject(tx.error);tx.onabort=()=>reject(tx.error||new Error('Operação cancelada.'));});}
export const list=()=>transaction('investigations','readonly',s=>s.getAll());
export const put=i=>transaction('investigations','readwrite',s=>s.put(i));
export const remove=id=>transaction('investigations','readwrite',s=>s.delete(id));
export const putMany=items=>transaction('investigations','readwrite',s=>{for(const i of items)s.add(i);});
export const preference=(key)=>transaction('preferences','readonly',s=>s.get(key));
export const setPreference=(key,value)=>transaction('preferences','readwrite',s=>s.put({key,value}));
export const listChecks=()=>transaction('checks','readonly',s=>s.getAll());
export const putCheck=i=>transaction('checks','readwrite',s=>s.put(i));
export const removeCheck=id=>transaction('checks','readwrite',s=>s.delete(id));
export async function importBundle(b){const db=await openDB();return new Promise((resolve,reject)=>{const tx=db.transaction(['checks','investigations'],'readwrite');for(const c of b.checks)tx.objectStore('checks').add(c);for(const i of b.investigations)tx.objectStore('investigations').add(i);tx.oncomplete=resolve;tx.onabort=()=>reject(tx.error||new Error('Importação cancelada.'));tx.onerror=()=>reject(tx.error);});}
export async function clearAll(){const db=await openDB();return new Promise((resolve,reject)=>{const tx=db.transaction(['checks','investigations','preferences'],'readwrite');for(const name of ['checks','investigations','preferences'])tx.objectStore(name).clear();tx.oncomplete=resolve;tx.onerror=()=>reject(tx.error);tx.onabort=()=>reject(tx.error);});}
