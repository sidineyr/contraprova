import {test} from 'node:test';
import assert from 'node:assert/strict';
import {adaptResponse,research} from '../server/research.mjs';
import {makeServer} from '../server/index.mjs';
import {newCheck,bundle,parseBundle,markdown} from '../dist/assets/checks.js';

function fixture() {
  const text='A evidência contradiz a frase. SOURCE Limite: contexto necessário.';
  return {status:'completed',output:[{type:'web_search_call',status:'completed',action:{type:'search',query:'afirmação',sources:[{url:'https://example.org/source'}]}},{type:'message',role:'assistant',content:[{type:'output_text',text,annotations:[{type:'url_citation',start_index:30,end_index:36,url:'https://example.org/source',title:'Documento'}]}]}]};
}
test('online provenance, native citations and old JSON-compatible export are preserved',()=>{
  const r=adaptResponse(fixture(),'test-model','2026-10-14T00:00:00.000Z');
  assert.match(r.summary,/\[1\]\(https:\/\/example.org\/source\)/);
  assert.match(r.gap,/URLs retornadas/);assert.doesNotMatch(r.gap,/Página aberta/);
  const c=newCheck('Uma frase');c.claim=c.input;c.result=r;
  assert.deepEqual(parseBundle(JSON.stringify(bundle([c]))).checks[0],c);
  assert.match(markdown(c),/Pesquisa online assistida/);
  assert.doesNotMatch(markdown(c),/Acervo local:/);
});
test('rejects ungrounded, unfinished, unsafe and malformed responses',()=>{
  for(const mutate of [d=>d.status='incomplete',d=>d.output.shift(),d=>d.output[1].content[0].annotations=[],d=>d.output[1].content[0].annotations[0].url='javascript:alert(1)',d=>d.output[1].content[0].annotations[0].url='https://user:pass@example.org',d=>d.output[1].content[0].annotations[0].end_index=999]){
    const d=fixture();mutate(d);assert.throws(()=>adaptResponse(d,'model'));
  }
});
test('provider request requires web research and never stores a conversation',async()=>{
  let request;
  await research('Minha afirmação',{key:'test-only',model:'model',fetchImpl:async(url,options)=>{assert.equal(url,'https://api.openai.com/v1/responses');request=JSON.parse(options.body);return {ok:true,json:async()=>fixture()};}});
  assert.equal(request.store,false);assert.equal(request.tool_choice,'required');assert.deepEqual(request.tools,[{type:'web_search'}]);assert.equal(request.input,'Minha afirmação');
  await assert.rejects(()=>research('q',{model:'model'}),/não configurada/);
});
async function withServer(options,fn){const server=makeServer(options);await new Promise(r=>server.listen(0,'127.0.0.1',r));const base='http://127.0.0.1:'+server.address().port;try{await fn(base);}finally{await new Promise(r=>server.close(r));}}
test('unconfigured server stays explicit and serves existing site',async()=>withServer({key:'',model:''},async base=>{
  assert.equal((await (await fetch(base+'/api/config')).json()).online,false);
  assert.equal((await fetch(base+'/')).status,200);
  assert.equal((await fetch(base+'/api/investigate',{method:'POST'})).status,503);
}));
test('API rejects cross-origin, invalid payload and protects global request budget',async()=>{
  let calls=0;
  await withServer({key:'test-only',model:'model',dailyLimit:1,researchFn:async()=>{calls++;return adaptResponse(fixture(),'model');}},async base=>{
    const send=(body,origin=base)=>fetch(base+'/api/investigate',{method:'POST',headers:{Origin:origin,'Content-Type':'application/json'},body:JSON.stringify(body)});
    assert.equal((await send({claim:'frase'},'https://evil.example')).status,403);
    assert.equal((await send({claim:'frase',history:['private']})).status,400);
    const response=await send({claim:'frase'});assert.equal(response.status,200);assert.equal((await response.json()).result.topic,'online');
    assert.equal((await send({claim:'frase'})).status,429);assert.equal(calls,1);
  });
});
test('upstream failure never silently switches to local evidence',async()=>withServer({key:'test-only',model:'model',researchFn:async()=>{throw new Error('Serviço indisponível.');}},async base=>{
  const r=await fetch(base+'/api/investigate',{method:'POST',headers:{Origin:base,'Content-Type':'application/json'},body:JSON.stringify({claim:'frase'})});assert.equal(r.status,502);assert.deepEqual(await r.json(),{error:'Serviço indisponível.'});
}));
