# Segurança

## Proteções da versão 0.1.0

- Texto não confiável usa `textContent` ou `value`; nenhuma entrada é inserida como HTML.
- URL completa HTTP/HTTPS sem usuário/senha para links; outros protocolos são rejeitados.
- Links externos com `noopener noreferrer`; nenhuma busca automática ou proxy de URL.
- Importação de até 2 MB, estrutura estrita, versão explícita, IDs únicos e limites de textos/listas. Novos IDs e transação única preservam registros existentes.
- Markdown escapa HTML e sintaxe de entrada. Verifique a segurança do visualizador usado por terceiros.
- CSP no HTML: arquivos locais; conexões, objetos, formulários e base externos bloqueados. A hospedagem pode adicionar cabeçalhos; CSP em meta não oferece todos os controles de uma CSP HTTP.

## Limitações

IndexedDB não é criptografado. Não há recuperação remota, autenticação própria, sincronização ou garantia contra extensões maliciosas, acesso ao mesmo perfil, dispositivo comprometido ou perda local. Fonte válida em formato não significa conteúdo legítimo. A aplicação não verifica links nem a verdade do texto.

Informações privadas não devem ser publicadas em Issues. Para uma vulnerabilidade, prefira o canal privado do GitHub, se habilitado pelo mantenedor. Não alegamos ter habilitado esse canal. Caso não esteja disponível, publique apenas um pedido de contato, sem dados sensíveis ou detalhes exploráveis.

Acessibilidade e segurança foram verificadas conforme VALIDATION.md; isto não constitui auditoria independente.
