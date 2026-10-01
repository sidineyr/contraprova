# Verificação da versão 0.1.0

Verificação em 01/10/2026. [Execução aprovada no GitHub Actions](https://github.com/sidineyr/contraprova/actions/runs/36927042051), commit `3b9fd5e439a4fd0d1d9e2004b36375285013c8ce`.

## Resultado

- `npm run check`: sintaxe dos módulos de interface, modelo, armazenamento e exemplos aprovada, localmente e no GitHub.
- `npm test`: seis testes de lógica aprovados, incluindo round trip JSON, importações inválidas, limites, URLs perigosas, IDs duplicados, datas inválidas, preenchimento e escaping de relatórios.
- `npm run test:browser`: três testes de navegador aprovados no Chromium do GitHub Actions.
- Fontes das três demonstrações conferidas em páginas institucionais; SOURCES.md registra interpretação e limites.

## Percurso e persistência

Os testes de navegador percorrem todas as etapas em **1360×900** e **390×844**: seleção de trecho, cartões, evidências, confronto, conclusão, JSON, relatório Markdown, conteúdo não executável, importação inválida e válida, cópia editável de demonstração, renomeação, exclusão individual e exclusão de todos os dados.

Uma investigação foi recuperada após fechar/reabrir uma aba no mesmo perfil. Um teste separado salvou um rascunho em perfil persistente, encerrou o processo do navegador, iniciou outro processo com o mesmo perfil e recuperou o texto.

A largura da interface foi verificada sem rolagem horizontal involuntária, incluindo a tela inicial com texto ampliado para **200%**. O layout foi ajustado após problemas encontrados nas primeiras execuções. Testes aguardam a conclusão das transações e a atualização da interface antes das asserções.

## Impressão e revisão visual

Foram gerados PDFs A4 pelo Chromium a partir do relatório. A folha de impressão oculta a interface e mantém o relatório visível. Capturas das telas de computador e celular e a primeira página do PDF foram inspecionadas visualmente, sem cortes ou sobreposição de texto. Os artefatos de teste ficam associados às execuções do GitHub Actions.

## Limites

A instalação local do navegador de testes falhou; a validação real de navegador ocorreu no GitHub Actions. Não houve teste em aparelhos móveis físicos, Safari/Firefox, leitor de tela ou auditoria independente de acessibilidade. A impressão foi validada no Chromium; o resultado pode variar conforme navegador e impressora.

A leitura opcional via WebMCP usa feature detection e não é requisito do aplicativo; seu contexto nativo não estava disponível para validação. Não há alegação de eficácia pedagógica: o piloto descrito em PILOT.md ainda não foi executado.
