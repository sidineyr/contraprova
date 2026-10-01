# Contraprova

**A resposta parece boa. Como você sabe?**

Idealizado por Sidiney Rodrigues, pedagogo. A versão 0.2 ajuda a investigar uma afirmação factual antes de aceitar ou compartilhar: trazer uma frase, ler fundamentos, abrir uma fonte e decidir como proceder. Não exige cadastro nem percurso de formulários.

## Uso e cobertura

Digite uma frase e clique em **Investigar**. Textos com mais de uma frase oferecem até três candidatas corrigíveis. Opiniões, previsões e falta de contexto recebem orientação; a classificação é uma sugestão, não diagnóstico. O resultado tem síntese por assunto, até três passagens, limitações e decisão humana: sustentar provisoriamente, revisar ou suspender. Justificativa opcional. Corrigir um resultado abre uma revisão separada, preservando a decisão anterior no histórico.

**Não há busca ao vivo na internet.** O índice local cobre oito assuntos em sete páginas institucionais: HTTPS/Wi-Fi, modo anônimo, efeito estufa, gráficos, correlação/causalidade, Lua e riscos de IA generativa. Fontes em inglês, paráfrases editoriais em português. Conferência: 01/10/2026. A recuperação por termos aproxima assuntos, não interpreta logicamente todas as frases; pode retornar contexto insuficiente. Fora do acervo, informa ausência de evidências. Não há API, chave, backend ou dependência paga. Ver [SOURCES.md](SOURCES.md).

Os exemplos da entrada são **frases de partida**, não respostas simuladas. A busca usa o mesmo índice para exemplos e entradas livres. Os exemplos completos antigos permanecem em `examples.js`, identificados como demonstrações, fora dos registros pessoais e fora do novo percurso.

## Executar

```sh
python3 -m http.server 8000 --directory dist
```

Abrir http://localhost:8000. Servir `dist/` em hospedagem estática HTTPS; não abrir `index.html` diretamente pelo sistema de arquivos. Não há compilação nem instalação para usar. JavaScript e IndexedDB necessários. A interface implementada é **pt-BR**; README em inglês é documentação, não tradução do aplicativo.

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

O aplicativo não decide verdade, não detecta IA, não pontua raciocínio e não transforma fontes em votos. Sínteses editoriais não são citações literais nem extração ao vivo. Trechos da mesma origem são identificados. A indisponibilidade de um link pode ser registrada pela pessoa, sem fingir verificação automática.

A eficácia pedagógica e a vantagem sobre chatbot **ainda não foram avaliadas**. [PRODUCT.md](PRODUCT.md) documenta o problema e a pesquisa filosófica. [PILOT.md](PILOT.md) prepara uma comparação contrabalançada. [VALIDATION.md](VALIDATION.md) distingue verificações técnicas e humanas.

Ver [PRIVACY.md](PRIVACY.md), [SECURITY.md](SECURITY.md), [CONTRIBUTING.md](CONTRIBUTING.md) e [CHANGELOG.md](CHANGELOG.md). Código MIT; conteúdo educacional original CC BY 4.0. Referências de terceiros mantêm seus direitos e não estão relicenciadas.
