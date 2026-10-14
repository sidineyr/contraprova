# Contraprova

**A resposta parece boa. Como você sabe?**

Idealizado por Sidiney Rodrigues, pedagogo. A versão 0.3 ajuda a investigar uma afirmação factual antes de aceitar ou compartilhar: trazer uma frase, ler fundamentos, abrir uma fonte e decidir como proceder. Não exige cadastro nem percurso de formulários.

## Pesquisa online (0.3)

A entrada é **“É verdade que…?”**. O servidor Node serve o aplicativo na mesma origem e oferece `/api/investigate`, usando a Responses API da OpenAI com pesquisa web obrigatória. A análise inclui conclusão, escopo, fundamentos, contradições e limites; citações nativas tornam-se referências clicáveis, sem inventar URLs. O prompt orienta buscar checagens e fontes primárias (legislação, ciência, dados e livros acessíveis); não garante cobrir todos os verificadores ou ler livros completos.

Configuração no servidor: `OPENAI_API_KEY`, `RESEARCH_MODEL` (modelo com suporte a `web_search`), `PUBLIC_ORIGIN` (origem HTTPS exata em produção), `HOST=0.0.0.0` e `PORT` conforme a hospedagem. Iniciar com `npm start`, Node 22 ou superior. Nunca colocar a chave em arquivos do site, commits ou campos da interface. O serviço pode gerar custos: configurar limites no provedor antes de ativar. Nenhuma chamada real é feita pelos testes.

`DAILY_RESEARCH_LIMIT` limita tentativas globais por processo/dia UTC (padrão 30); há duas pesquisas simultâneas e cinco tentativas por minuto por endereço de conexão. Contadores em memória reiniciam com o processo e não são um orçamento monetário nem proteção distribuída. Em produção usar uma instância com controle de acesso/limitação no proxy e limite financeiro no provedor. O servidor não confia em `X-Forwarded-For`; atrás de proxy o limite por conexão pode abranger vários visitantes. Não publicar um endpoint pago irrestrito.

Quando configurado, o modo online é selecionado no início. Sem configuração, aparece o acervo local; selecionar online produz erro explícito, sem resposta simulada ou fallback silencioso. Hospedagem estática/GitHub Pages não executa o servidor. O limite atual é três URLs citadas por análise; respostas incompletas, sem citações ou acima dos limites são recusadas e pedem uma afirmação mais específica. Até 6000 caracteres de entrada, 60 segundos de pesquisa.

O registro distingue pesquisa online, URLs retornadas pelo buscador e páginas abertas quando o provedor informa essas ações. Não comprova automaticamente pertinência, vigência, retratação ou leitura integral. Esses critérios são instruções de investigação e exigem conferência humana. Cada resposta usa `store:false`; isso não elimina todas as retenções técnicas do provedor. Apenas a afirmação selecionada é enviada, nunca o histórico. O servidor não grava frases; a hospedagem/provedor podem manter registros próprios.

Registros e backups v1/v2 continuam compatíveis: resultado online usa os campos existentes com procedência explícita. A origem e o banco IndexedDB foram preservados. Relatórios JSON, Markdown e impressão distinguem os dois modos.

Testes novos cobrem citação/procedência, exportação, respostas sem pesquisa, erros do provedor, configuração ausente, origem, entrada e limite de uso. Teste de navegador usa provedor simulado; teste real com chave ainda depende da configuração. Ver [INVESTIGATOR.md](INVESTIGATOR.md).

## Uso e cobertura do acervo local

Digite uma frase e clique em **Investigar**. Textos com mais de uma frase oferecem até três candidatas corrigíveis. Opiniões, previsões e falta de contexto recebem orientação; a classificação é uma sugestão, não diagnóstico. O resultado tem síntese por assunto, até três passagens, limitações e decisão humana: sustentar provisoriamente, revisar ou suspender. Justificativa opcional. Corrigir um resultado abre uma revisão separada, preservando a decisão anterior no histórico.

**Modo local:** não há busca ao vivo neste modo. O índice local cobre oito assuntos em sete páginas institucionais: HTTPS/Wi-Fi, modo anônimo, efeito estufa, gráficos, correlação/causalidade, Lua e riscos de IA generativa. Fontes em inglês, paráfrases editoriais em português. Conferência: 01/10/2026. A recuperação por termos aproxima assuntos, não interpreta logicamente todas as frases; pode retornar contexto insuficiente. Fora do acervo, informa ausência de evidências. O modo local não usa API, chave ou dependência paga. O modo online é separado e requer o servidor abaixo. Ver [SOURCES.md](SOURCES.md).

Os exemplos da entrada são **frases de partida**, não respostas simuladas. A busca usa o mesmo índice para exemplos e entradas livres. Os exemplos completos antigos permanecem em `examples.js`, identificados como demonstrações, fora dos registros pessoais e fora do novo percurso.

## Executar

```sh
python3 -m http.server 8000 --directory dist
```

Abrir http://localhost:8000. Servir `dist/` em hospedagem estática HTTPS; não abrir `index.html` diretamente pelo sistema de arquivos. Não há compilação nem instalação para usar o modo local. JavaScript e IndexedDB necessários. A interface implementada é **pt-BR**; README em inglês é documentação, não tradução do aplicativo.

```sh
npm run check
npm test
npm install --ignore-scripts
npx playwright install --with-deps chromium
npm run test:browser
```

Playwright é dependência apenas de desenvolvimento. CI testa Chromium em computador e celular simulado; não substitui aparelhos reais ou avaliação humana.

## Dados e arquitetura

- `app.js`: interface e percurso; renderização por `textContent`, sem HTML de entradas.
- `search.js` / `corpus.js`: recuperação determinística local e conteúdo editorial versionado. Links não são buscados automaticamente.
- `checks.js`: modelo novo, importação JSON v2 estrita, relatórios e compatibilidade v1.
- `core.js`: modelo e exportação v1 preservados.
- `storage.js`: IndexedDB `contraprova`, versão 2; acrescenta `checks` sem alterar `investigations` e `preferences` antigos. Registros v0.1 permanecem integrais, consultáveis e exportáveis como relatório/JSON; não viram novos resultados automáticos.
- `i18n.js`: exemplos e rótulos separados, ponto inicial de futura tradução; demais textos ainda precisam ser extraídos antes de traduzir.

Rascunhos salvam após 250 ms de pausa; navegação interna aguarda gravação. Fechar imediatamente durante gravação ou falha de armazenamento pode perder a última alteração. Exportar um backup é recomendado. Manter mesma origem/URL para preservar dados do navegador: mudar domínio não transfere IndexedDB.

Importação de até 2 MB e 100 registros por arquivo, JSON v1/v2, cria cópias sem substituir registros. Estruturas, tamanhos, enums e URLs HTTP(S) sem credenciais são validados. Backups grandes devem ser divididos por exportação individual. Importado não significa autenticado; fontes e resumos importados ficam identificados. Markdown escapa texto não confiável. Relatório legível por impressão; PDF usa recurso do navegador.

## Limites e avaliação

O modo local não decide verdade, não detecta IA, não pontua raciocínio e não transforma fontes em votos. Sínteses locais editoriais não são citações literais nem extração ao vivo. No modo online, a IA sugere uma conclusão fundamentada; referências devem ser conferidas pela pessoa. Trechos da mesma origem são identificados. A indisponibilidade de um link pode ser registrada pela pessoa, sem fingir verificação automática.

A eficácia pedagógica e a vantagem sobre chatbot **ainda não foram avaliadas**. [PRODUCT.md](PRODUCT.md) documenta o problema e a pesquisa filosófica. [PILOT.md](PILOT.md) prepara uma comparação contrabalançada. [VALIDATION.md](VALIDATION.md) distingue verificações técnicas e humanas.

Ver [PRIVACY.md](PRIVACY.md), [SECURITY.md](SECURITY.md), [CONTRIBUTING.md](CONTRIBUTING.md) e [CHANGELOG.md](CHANGELOG.md). Código MIT; conteúdo educacional original CC BY 4.0. Referências de terceiros mantêm seus direitos e não estão relicenciadas.
