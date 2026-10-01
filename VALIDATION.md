# Verificação da versão 0.1.0

## Executado localmente

- `npm run check`: sintaxe dos módulos de interface, modelo, armazenamento e exemplos aprovada.
- `npm test`: seis testes aprovados, incluindo round trip JSON, importações inválidas, limites, URLs perigosas, IDs duplicados, datas inválidas, preenchimento e escaping de relatórios.
- Fontes das três demonstrações conferidas em páginas institucionais; SOURCES.md registra interpretação e limites.

## Testes de navegador

`tests/browser.test.mjs` cobre o percurso completo em 1360×900 e 390×844: seleção de trecho, edição, evidências, confronto, conclusão, JSON, relatório Markdown, conteúdo não executável, recuperação após fechar/reabrir aba, importação inválida e válida, cópia de exemplo, renomeação e exclusões.

A execução local foi bloqueada pela indisponibilidade do navegador de testes: o download do Chromium falhou. O workflow GitHub está preparado para executar esses testes e guardar capturas. Não declarar aprovação até conferir o resultado.

## Limites da verificação

Não houve teste em aparelhos móveis físicos, Safari/Firefox, leitor de tela, nem auditoria independente de acessibilidade. A impressão usa CSS dedicado; a qualidade final depende do navegador e da impressora. Não houve avaliação de eficácia pedagógica.

A leitura opcional via WebMCP usa feature detection e não é requisito do aplicativo; seu contexto de execução não estava disponível para validação local.
