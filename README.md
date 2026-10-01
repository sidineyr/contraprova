# Contraprova

**A resposta parece boa. Como você sabe?**

Aplicativo educacional livre idealizado por **Sidiney Rodrigues** para investigar respostas de IA, confrontar afirmações com fontes e registrar mudanças de entendimento.

[English documentation](README.en.md)

## Versão 0.1.0

O aplicativo oferece seis etapas: pergunta e explicação inicial; resposta da IA com origem opcional; cartões de afirmações; evidências; confronto justificado; conclusão revisada com dúvidas e comparação antes/depois.

- Criar, renomear, continuar e excluir investigações.
- Rascunhos salvos automaticamente no IndexedDB, por navegador e origem.
- Criar cartões manualmente ou selecionar trechos da resposta.
- Exportar uma investigação ou todos os registros em JSON versionado; importar como cópias, sem substituir registros existentes.
- Relatório Markdown e impressão pelo navegador, inclusive para rascunhos.
- Três demonstrações separadas de registros pessoais, com respostas simuladas e fontes conferidas.
- Exclusão de todos os dados e opção de ocultar a coruja original.
- Interface em **português brasileiro**. README em português e inglês. Traduções futuras podem ampliar o módulo `i18n.js` e externalizar os demais textos; não há interface inglesa nesta versão.

O aplicativo **organiza registros**. Não verifica automaticamente a verdade, não detecta autoria de IA, não mede capacidade intelectual e não produz notas de pensamento crítico. Marcar um percurso como registrado verifica preenchimento, não qualidade ou aprendizagem. Sua eficácia pedagógica ainda não foi avaliada.

## Executar

Requer um navegador moderno com JavaScript e IndexedDB habilitados. Sirva a pasta `dist` por HTTP; não abra o HTML diretamente via `file://` porque ele usa módulos JavaScript.

```sh
python -m http.server 8000 --directory dist
```

Abra `http://localhost:8000`. Não há instalação, backend, chave ou dependência de produção. Para hospedagem estática, publique o conteúdo de `dist`. O código não oferece instalação offline, sincronização ou contas.

Os registros pertencem à origem: protocolo, domínio e porta. Mudar de endereço não transfere seus dados; exporte JSON e importe no novo endereço.

## Arquitetura

| Arquivo | Responsabilidade |
| --- | --- |
| `dist/index.html` | Estrutura semântica e metadados |
| `dist/assets/app.js` | Interface e percurso |
| `dist/assets/core.js` | Modelo, validação, importação e relatório Markdown |
| `dist/assets/storage.js` | IndexedDB e transações |
| `dist/assets/examples.js` | Demonstrações editoriais e fontes |
| `dist/assets/i18n.js` | Idioma e textos iniciais para tradução futura |
| `dist/assets/styles.css` | Layout responsivo, foco, contraste e impressão |
| `dist/assets/owl.webp` | Coruja original criada com apoio de IA |

## Formato e limites

JSON `format: "contraprova"`, `version: 1`, com `exportedAt` e `investigations`. Importações são validadas integralmente antes da transação e ganham novos identificadores. Dados existentes não são sobrescritos.

Limites: 2 MB por arquivo JSON, 100 investigações locais, 100 afirmações por investigação, 50 evidências por afirmação, 100 mil caracteres por texto longo. A exportação JSON respeita o mesmo limite de tamanho para permitir reimportação. Fontes impressas podem ficar sem URL. Relação e justificativa são necessárias para registrar uma conclusão completa.

## Privacidade e segurança

Leia [PRIVACY.md](PRIVACY.md) e [SECURITY.md](SECURITY.md). O código não envia registros para servidores nem busca URLs automaticamente. O provedor de hospedagem recebe as requisições de carregamento e pode manter logs técnicos. Fontes externas abertas pelo usuário têm políticas próprias.

Não há criptografia dos registros locais. Quem acessa o mesmo perfil do navegador pode lê-los. Limpeza do navegador, modo privado, quotas e políticas de descarte podem causar perda: exporte regularmente.

Textos são renderizados com `textContent`/`value`. URLs clicáveis aceitam somente HTTP/HTTPS sem credenciais. Importações rejeitam esquema desconhecido, campos inesperados, limites excedidos e estruturas inválidas. Relatórios Markdown escapam HTML e sintaxe de entrada. Esta proteção não garante o comportamento de todo visualizador externo.

## Verificação e contribuição

Node.js 20 ou posterior para verificações locais:

```sh
npm test
npm run check
```

Testes de navegador opcionais usam Playwright, apenas em desenvolvimento:

```sh
npm install
npx playwright install chromium
npm run test:browser
```

Veja [VALIDATION.md](VALIDATION.md), [CONTRIBUTING.md](CONTRIBUTING.md), [SOURCES.md](SOURCES.md) e [PILOT.md](PILOT.md). Os testes não constituem avaliação de eficácia pedagógica nem auditoria integral de acessibilidade.

## Autoria e licenças

Idealização e direção: Sidiney Rodrigues. Desenvolvimento, redação e ilustração com apoio de inteligência artificial, sob responsabilidade humana. Não há endosso das instituições citadas.

Código: [MIT](LICENSE). Conteúdo educacional original: [CC BY 4.0](LICENSE-CONTENT.md). Fontes externas mantêm seus direitos; os exemplos usam paráfrases identificadas, sem reproduzir seus textos integrais.
