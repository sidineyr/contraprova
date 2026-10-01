# Verificação — 0.2

## Executado localmente

- Verificação sintática dos módulos.
- Nove testes unitários: modelo legado, JSON v1/v2, preservação/cópias, limites, protocolos seguros, escape de Markdown, recuperação delimitada, negação sem inversão de veredito e sugestões de interpretação.
- Conferência editorial das sete páginas em SOURCES.md, em 01/10/2026. Não é monitoramento de disponibilidade ao vivo.

## Navegador — pendente de execução no CI

A suíte Chromium cobre 1360×900 e 390×844: frase → resultado → abertura de fonte → decisão; persistência/reabertura; rascunho após reiniciar processo; migração real IndexedDB v1→v2 com igualdade integral do registro; importação inválida e v1/v2; exclusão individual/total; JSON/Markdown/impressão; texto HTML como texto; teclado/foco; ausência de overflow a 200%; múltiplas frases, contexto, opinião, ausência de evidências e falha/retentativa da busca. PDFs e screenshots são artefatos do CI.

A abertura de site externo é simulada no teste de UI, sem usar a rede para comprovar o conteúdo da página. A conferência das fontes foi separada. O registro de indisponibilidade é declaração do usuário, não detector automático.

## Não verificado

Piloto humano, clareza sem orientação, vantagem sobre chatbot, eficácia pedagógica, aparelhos físicos, Safari/Firefox e leitores de tela. Não extrapolar testes automatizados para essas conclusões. Plano em PILOT.md.
