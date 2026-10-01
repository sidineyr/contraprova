export const VERSION = 1;
export const MAX_BYTES = 2 * 1024 * 1024;
export const limits = {investigations:100, claims:100, evidence:50, text:100000, short:500};
export const uid = () => crypto.randomUUID();
export const today = () => new Date().toLocaleDateString('en-CA');
export function safeURL(value) {
  if (!value) return '';
  try { const u = new URL(value); return ['https:', 'http:'].includes(u.protocol) && !u.username && !u.password ? u.href : null; } catch { return null; }
}
export function newInvestigation(title = 'Investigação sem título') {
  const now = new Date().toISOString();
  return {id:uid(),title,createdAt:now,updatedAt:now,step:0,question:'',initial:'',confidence:'',response:'',tool:'',model:'',responseDate:'',claims:[],conclusion:'',doubts:'',changes:'',finalConfidence:'',completedAt:'',exampleOrigin:''};
}
export function newClaim(text='') {return {id:uid(),text,evidence:[]};}
export function newEvidence() {return {id:uid(),title:'',url:'',author:'',consultedAt:'',note:'',relation:'',justification:''};}
function fail(message) {throw new Error(message);}
function object(v, keys, where) {
  if (!v || typeof v !== 'object' || Array.isArray(v) || Object.keys(v).some(k=>!keys.includes(k)) || keys.some(k=>!Object.hasOwn(v,k))) fail(`Estrutura inválida: ${where}.`);
}
function str(v,max=limits.text) {if(typeof v!=='string'||v.length>max) fail('Texto ausente ou acima do limite.'); return v;}
function date(v) {str(v,10); if(v && (!/^\d{4}-\d{2}-\d{2}$/.test(v)||new Date(v+'T00:00:00Z').toISOString().slice(0,10)!==v)) fail('Data inválida.');return v;}
function instant(v,optional=false) {str(v,40);if(optional&&!v)return v;if(!/^\d{4}-\d{2}-\d{2}T/.test(v)||!Number.isFinite(Date.parse(v)))fail('Data de registro inválida.');return v;}
function identifier(v){str(v,100);if(!/^[a-zA-Z0-9-]{1,100}$/.test(v))fail('Identificador inválido.');return v;}
const confidence=['','baixa','média','alta'];
export function validateInvestigation(v) {
  const base=newInvestigation();object(v,Object.keys(base),'investigação');
  identifier(v.id);str(v.title,limits.short);if(!v.title.trim())fail('Informe um título.');
  instant(v.createdAt);instant(v.updatedAt);instant(v.completedAt,true);
  if(!Number.isInteger(v.step)||v.step<0||v.step>5)fail('Etapa inválida.');
  for(const key of ['question','initial','response','conclusion','doubts','changes'])str(v[key]);
  for(const key of ['tool','model','exampleOrigin'])str(v[key],limits.short);
  date(v.responseDate);if(!confidence.includes(v.confidence)||!confidence.includes(v.finalConfidence))fail('Confiança inválida.');
  if(!Array.isArray(v.claims)||v.claims.length>limits.claims)fail('Limite de 100 afirmações por investigação.');
  const ids=new Set([v.id]);const unique=id=>{identifier(id);if(ids.has(id))fail('Identificadores repetidos.');ids.add(id);};
  for(const c of v.claims){object(c,['id','text','evidence'],'afirmação');unique(c.id);str(c.text);
    if(!Array.isArray(c.evidence)||c.evidence.length>limits.evidence)fail('Limite de 50 evidências por afirmação.');
    for(const e of c.evidence){object(e,Object.keys(newEvidence()),'evidência');unique(e.id);
      for(const k of ['title','url','author'])str(e[k],2000);str(e.note);str(e.justification);date(e.consultedAt);
      if(safeURL(e.url)===null)fail('Use URLs completas HTTP ou HTTPS, sem credenciais.');
      if(!['','apoia','contradiz','não esclarece'].includes(e.relation))fail('Relação inválida.');
    }
  }
  return structuredClone(v);
}
export function envelope(investigations){return {format:'contraprova',version:VERSION,exportedAt:new Date().toISOString(),investigations:investigations.map(validateInvestigation)};}
export function parseImport(text) {
  if(new TextEncoder().encode(text).length>MAX_BYTES)fail('O arquivo excede 2 MB.');
  let v;try{v=JSON.parse(text);}catch{fail('O arquivo não contém JSON válido.');}
  object(v,['format','version','exportedAt','investigations'],'arquivo');
  if(v.format!=='contraprova'||v.version!==VERSION)fail('Formato ou versão não suportados.');instant(v.exportedAt);
  if(!Array.isArray(v.investigations)||!v.investigations.length||v.investigations.length>limits.investigations)fail('Importe de 1 a 100 investigações.');
  const ids=new Set();return v.investigations.map(i=>{const valid=validateInvestigation(i);if(ids.has(valid.id))fail('Investigações repetidas.');ids.add(valid.id);return valid;});
}
export function copyForImport(i) {
  const out=validateInvestigation(i);out.id=uid();out.claims.forEach(c=>{c.id=uid();c.evidence.forEach(e=>e.id=uid());});return out;
}
export function completionIssues(i) {
  const errors=[];
  if(!i.question.trim())errors.push('Escreva sua pergunta.');
  if(!i.initial.trim())errors.push('Registre sua explicação inicial.');
  if(!i.response.trim())errors.push('Cole a resposta a investigar.');
  if(!i.claims.length||i.claims.some(c=>!c.text.trim()))errors.push('Registre pelo menos uma afirmação e preencha seus cartões.');
  if(i.claims.some(c=>!c.evidence.length||c.evidence.some(e=>!e.title.trim()||!e.author.trim()||!e.consultedAt||!e.note.trim()||!e.relation||!e.justification.trim())))errors.push('Cada afirmação precisa de evidência com título, autoria, data, observação, relação e justificativa. A URL pode ficar vazia para fontes impressas.');
  if(!i.conclusion.trim()||!i.changes.trim())errors.push('Escreva sua conclusão e o que mudou.');
  return errors;
}
const labels={'apoia':'Apoia','contradiz':'Contradiz','não esclarece':'Não esclarece','':'Não avaliada'};
// Escape HTML and Markdown syntax so pasted material remains literal in Markdown viewers.
export function mdText(v){return String(v).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replace(/[\\`*_{}\[\]()#+.!|~-]/g,'\\$&');}
export function reportMarkdown(i) {
  validateInvestigation(i);const t=mdText;const blocks=[`# ${t(i.title)}`,`Contraprova 0.1.0 · ${i.completedAt?'Percurso registrado':'Rascunho'}${i.exampleOrigin?' · Cópia de exemplo demonstrativo':''}`,`## Minha pergunta\n\n${t(i.question)}`,`## Explicação inicial\n\n${t(i.initial)}\n\nConfiança declarada: ${t(i.confidence||'não informada')}`,`## Resposta investigada\n\n${t(i.response)}\n\nFerramenta: ${t(i.tool||'não informada')}\n\nModelo: ${t(i.model||'não informado')}\n\nData: ${t(i.responseDate||'não informada')}`];
  i.claims.forEach((c,n)=>{blocks.push(`## Afirmação ${n+1}\n\n${t(c.text)}`);c.evidence.forEach((e,j)=>{blocks.push(`### Evidência ${j+1}: ${t(e.title)}\n\nAutoria/instituição: ${t(e.author)}\n\nURL (texto): ${t(e.url)}\n\nConsulta: ${t(e.consultedAt)}\n\nObservação: ${t(e.note)}\n\nRelação declarada: ${labels[e.relation]}\n\nJustificativa: ${t(e.justification)}`);});});
  blocks.push(`## Conclusão revisada\n\n${t(i.conclusion)}`,`## O que mudou\n\n${t(i.changes)}`,`## Dúvidas restantes\n\n${t(i.doubts||'Não registradas.')}`,`Confiança final declarada: ${t(i.finalConfidence||'não informada')}`,`A confiança é uma percepção pessoal. Sua mudança não comprova aprendizagem. O aplicativo organiza registros; não verifica automaticamente a verdade nem avalia capacidade intelectual.`);return blocks.join('\n\n')+'\n';
}
