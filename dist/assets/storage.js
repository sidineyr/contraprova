let promise;
export function openDB(){return promise??=new Promise((resolve,reject)=>{const req=indexedDB.open('contraprova',1);req.onupgradeneeded=()=>{req.result.createObjectStore('investigations',{keyPath:'id'});req.result.createObjectStore('preferences',{keyPath:'key'});};req.onsuccess=()=>{req.result.onversionchange=()=>{req.result.close();promise=undefined;};resolve(req.result);};req.onerror=()=>{promise=undefined;reject(req.error);};req.onblocked=()=>{promise=undefined;reject(new Error('Feche outras abas do Contraprova para atualizar o armazenamento.'));};});}
async function transaction(store,mode,action){const db=await openDB();return new Promise((resolve,reject)=>{const tx=db.transaction(store,mode);let value;try{const req=action(tx.objectStore(store));if(req)req.onsuccess=()=>value=req.result;}catch(error){tx.abort();reject(error);return;}tx.oncomplete=()=>resolve(value);tx.onerror=()=>reject(tx.error);tx.onabort=()=>reject(tx.error||new Error('Operação cancelada.'));});}
export const list=()=>transaction('investigations','readonly',s=>s.getAll());
export const put=i=>transaction('investigations','readwrite',s=>s.put(i));
export const remove=id=>transaction('investigations','readwrite',s=>s.delete(id));
export const putMany=items=>transaction('investigations','readwrite',s=>{for(const i of items)s.add(i);});
export const preference=(key)=>transaction('preferences','readonly',s=>s.get(key));
export const setPreference=(key,value)=>transaction('preferences','readwrite',s=>s.put({key,value}));
export async function clearAll(){const db=await openDB();return new Promise((resolve,reject)=>{const tx=db.transaction(['investigations','preferences'],'readwrite');tx.objectStore('investigations').clear();tx.objectStore('preferences').clear();tx.oncomplete=resolve;tx.onerror=()=>reject(tx.error);});}
