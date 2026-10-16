import {createServer} from 'node:http';
import {readFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {resolve,extname,sep} from 'node:path';
import {research} from './research.mjs';
import {newCheck,validateCheck} from '../dist/assets/checks.js';

export function makeServer({key=process.env.OPENAI_API_KEY,model=process.env.RESEARCH_MODEL,origin=process.env.PUBLIC_ORIGIN,researchFn=research,dailyLimit=Number(process.env.DAILY_RESEARCH_LIMIT || 30)}={}) {
  if(!Number.isInteger(dailyLimit) || dailyLimit<1 || dailyLimit>1000) throw new Error('DAILY_RESEARCH_LIMIT inválido.');
  const root=fileURLToPath(new URL('../dist/',import.meta.url));
  let active=0,spent=0,day='';
  const attempts=new Map();
  const send=(res,status,value)=>{res.writeHead(status,{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store'});res.end(JSON.stringify(value));};
  return createServer(async(req,res)=>{
    res.setHeader('X-Content-Type-Options','nosniff');res.setHeader('Referrer-Policy','no-referrer');
    res.setHeader('Content-Security-Policy',"default-src 'self'; img-src 'self' data: https://hits.sh; style-src 'self'; script-src 'self'; connect-src 'self'; object-src 'none'; frame-ancestors 'none'; base-uri 'self'");
    try {
      const url=new URL(req.url,'http://localhost');
      if(url.pathname==='/api/config' && req.method==='GET') return send(res,200,{online:Boolean(key && model),provider:'OpenAI'});
      if(url.pathname==='/api/investigate') {
        if(req.method!=='POST') return send(res,405,{error:'Use POST.'});
        if(!key || !model) return send(res,503,{error:'Pesquisa online não configurada. O responsável precisa configurar o serviço no servidor.'});
        const expected=origin || 'http://'+req.headers.host;
        if(req.headers.origin!==expected || (req.headers['sec-fetch-site'] && !['same-origin','none'].includes(req.headers['sec-fetch-site']))) return send(res,403,{error:'Origem não autorizada.'});
        if(!String(req.headers['content-type']).startsWith('application/json')) return send(res,415,{error:'Envie JSON.'});
        const today=new Date().toISOString().slice(0,10);if(day!==today){day=today;spent=0;}
        const now=Date.now();for(const [ip,v] of attempts)if(now-v.start>60000)attempts.delete(ip);
        const ip=req.socket.remoteAddress;const window=attempts.get(ip) || {start:now,count:0};window.count++;attempts.set(ip,window);
        if(window.count>5 || spent>=dailyLimit || active>=2 || attempts.size>5000) return send(res,429,{error:'Limite de pesquisa atingido. Tente mais tarde.'});
        const chunks=[];let bytes=0;for await(const chunk of req){bytes+=chunk.length;if(bytes>24000)return send(res,413,{error:'Entrada acima do limite.'});chunks.push(chunk);}
        let data;try{data=JSON.parse(Buffer.concat(chunks).toString('utf8'));}catch{return send(res,400,{error:'JSON inválido.'});}
        if(!data || Object.keys(data).length!==1 || typeof data.claim!=='string' || !data.claim.trim() || data.claim.length>6000) return send(res,400,{error:'Informe somente uma afirmação de até 6000 caracteres.'});
        active++;spent++;
        try {
          const result=await researchFn(data.claim.trim(),{key,model,signal:AbortSignal.timeout(60000)});
          const record=newCheck();record.result=result;validateCheck(record);
          return send(res,200,{result});
        } catch(error) {return send(res,502,{error:error.name==='TimeoutError'?'A pesquisa excedeu o tempo. Tente novamente.':error.message});}
        finally {active--;}
      }
      if(req.method!=='GET' && req.method!=='HEAD')return send(res,405,{error:'Método não permitido.'});
      const path=resolve(root,'.'+decodeURIComponent(url.pathname==='/'?'/index.html':url.pathname));
      if(!path.startsWith(root.endsWith(sep)?root:root+sep))return send(res,403,{error:'Caminho inválido.'});
      const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.webp':'image/webp'};
      const body=await readFile(path);res.writeHead(200,{'Content-Type':types[extname(path)] || 'application/octet-stream','Cache-Control':'no-cache'});res.end(req.method==='HEAD'?undefined:body);
    } catch {send(res,404,{error:'Recurso não encontrado.'});}
  });
}
if(process.argv[1] && resolve(process.argv[1])===fileURLToPath(import.meta.url)) {
  makeServer().listen(Number(process.env.PORT || 8000),process.env.HOST || '127.0.0.1',()=>console.log('Contraprova pronto. Pesquisa online depende da configuração do servidor.'));
}
