# Verificação — 0.2

## Executado localmente

- Verificação sintática dos módulos.
- Dez testes unitários: modelo legado, JSON v1/v2, preservação/cópias, limites, protocolos seguros, escape de Markdown, recuperação delimitada, negação sem inversão de veredito sugestões de interpretação e limite de registros por backup.
- Conferência editorial das sete páginas em SOURCES.md, em 01/10/2026. Não é monitoramento de disponibilidade ao vivo.

## Navegador — executado no CI

**Aprovado:** dez testes unitários e seis testes de navegador no commit `541dd6ff7e42d8d057b1bd13d89ce177dd51bfaa`, [execução 36932511981](https://github.com/sidineyr/contraprova/actions/runs/36932511981), em 01/10/2026.

A suíte Chromium cobre 1360×900 e 390×844: frase → resultado → abertura de fonte → decisão; persistência/reabertura; rascunho após reiniciar processo; revisão separada preservando a decisão anterior, recuperação de seleção de candidata, correção de entrada só com espaços; migração real IndexedDB v1→v2 com igualdade integral do registro; importação inválida e v1/v2; exclusão individual/total; JSON/Markdown/impressão; texto HTML como texto; teclado/foco; ausência de overflow a 200%; múltiplas frases, contexto, opinião, ausência de evidências e falha/retentativa da busca. PDFs e screenshots são artefatos do CI. Revisão visual realizada nas capturas de entrada em computador e resultado móvel e nas duas páginas do relatório A4; sem cortes no texto. Os testes passaram sem erros de JavaScript no percurso principal. Os PDFs gerados pelo teste não são PDFs acessíveis com marcação semântica; a acessibilidade da impressão depende do navegador.

A abertura de site externo é simulada no teste de UI, sem usar a rede para comprovar o conteúdo da página. A conferência das fontes foi separada. O registro de indisponibilidade é declaração do usuário, não detector automático.

## Não verificado

Piloto humano, clareza sem orientação, vantagem sobre chatbot, eficácia pedagógica, aparelhos físicos, Safari/Firefox e leitores de tela. Não extrapolar testes automatizados para essas conclusões. Plano em PILOT.md.
