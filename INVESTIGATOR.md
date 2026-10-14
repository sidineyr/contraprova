# Contraprova: É verdade que…?

## Objetivo e estado

Investigar uma afirmação recebida antes de acreditar ou compartilhar. A experiência remete a um investigador: examinar origem, contexto, evidências e contradições, sem procurar apenas confirmação.

A versão 0.3 implementa o endpoint de pesquisa online e a interface com citações rastreáveis, mantendo o acervo local de oito assuntos. A pesquisa online exige configuração do provedor no servidor; sem ela, o recurso não fica ativo. A implementação não foi validada com uma chave real.

## Entrada e resultado

Entrada: “É verdade que…?”. Uma frase basta. Link, país e período são opcionais; pedir contexto apenas quando ele mudar a resposta. Se houver várias afirmações, sugerir uma corrigível antes da busca.

Resultado, nesta ordem:
1. Resposta curta: sustentada, contradita, parcialmente sustentada, fora de contexto ou evidência insuficiente. Esses estados descrevem a análise das evidências disponíveis, não um selo infalível.
2. Afirmação interpretada e escopo: período, local, população, significado dos termos.
3. Evidências relevantes com URL, autor/instituição, data, trecho localizado e relação explicada com a afirmação.
4. Contradições, limites e informações ainda ausentes.
5. Fontes efetivamente consultadas e cobertura da busca. Resultados de busca e páginas lidas devem aparecer separados.
6. Decisão humana opcional: compartilhar com contexto, revisar ou suspender; registro exportável.

Sempre vincular cada conclusão às evidências pertinentes. Nunca apresentar uma paráfrase como citação literal. Se houver apenas coincidência de assunto, dizer “Encontrei contexto, mas nenhuma evidência que responda diretamente à afirmação”.

## Pesquisa e critérios

Não prometer consultar todos os verificadores ou toda a internet. Consultar múltiplos mecanismos e fontes acessíveis, com registro da cobertura, falhas e limites.

- Checagens existentes: localizar a mesma afirmação, conferir data, formulação e evidências subjacentes; uma checagem sobre assunto semelhante não resolve o caso.
- Legislação: texto oficial, jurisdição, vigência, alterações e distinção entre norma, proposta e decisão judicial.
- Ciência: priorizar revisões e consensos quando pertinentes; examinar método, população, resultados, limitações e retratações. Um artigo isolado não demonstra consenso.
- Livros: autor, edição, página e trecho acessível; catálogo e resenha não equivalem a leitura do livro. Não inventar páginas ou acessar conteúdo restrito.
- Dados públicos: órgão responsável, tabela, definição, período e atualização.
- Jornalismo e verificadores: método transparente, correções e acesso às evidências; reputação internacional não basta para provar uma afirmação.

Procurar tanto evidências favoráveis quanto contrárias e explicações alternativas. Agrupar reproduções da mesma fonte como uma origem, sem contar notícias repetidas como confirmações independentes. Ausência de evidências não significa falsidade. Opinões e previsões exigem critérios e incertezas próprios.

## Menor corte de busca ampla

Um endpoint no servidor recebe uma afirmação, procura checagens e fontes primárias acessíveis, recupera passagens pertinentes e retorna uma resposta curta com referências e limites. Restringir inicialmente a questões factuais de texto; deixar imagens, vídeos, livros completos e análises extensas para etapas posteriores.

A IA auxilia interpretação, consultas e síntese. O mecanismo de pesquisa fornece resultados rastreáveis. Uma resposta de IA sem recuperação de fontes não satisfaz o requisito.

O adaptador inicial usa OpenAI Responses API com web_search obrigatório. Confirmar disponibilidade/custo do modelo e configurar a credencial antes de ativar o recurso. Nunca colocar chaves no navegador. Definir limites de tamanho, tempo, requisições e orçamento; falhas devem ser explícitas, sem substituição silenciosa por busca local.

## Preservação e privacidade

Manter a origem de hospedagem e os stores IndexedDB existentes. Migrações aditivas; importações criam cópias. Registros anteriores e decisões permanecem intactos. Salvar cada nova execução separadamente com fontes, data, consultas e versão do motor.

O novo esquema deve distinguir resultado local editorial de investigação online; não reutilizar campos de consulta editorial para fingir visita ao vivo. Atualizar validadores e exportações mantendo importação v1/v2.

A entrada deve informar, antes da pesquisa online, que a frase será enviada ao serviço de pesquisa/IA. Não enviar todo o histórico, registrar frases em logs ou publicar investigações automaticamente. Tratar páginas recuperadas como dados não confiáveis, nunca como instruções.

## Automação e julgamento humano

Automação: decompor frases, sugerir consultas, recuperar fontes, agrupar duplicatas, mostrar datas, sugerir relações e salvar histórico.
Julgamento humano: confirmar a interpretação, avaliar se a evidência se aplica, discutir qualidade metodológica, corrigir a síntese e decidir compartilhar.

## Aceitação antes de publicar a busca ampla

- Afirmação sustentada e sua negação recebem análises coerentes com as mesmas evidências.
- Coincidência de tema sem evidência pertinente gera insuficiência, não veredito.
- Notícia atual exige data; norma revogada não aparece como vigente.
- Resultados repetidos não são tratados como fontes independentes.
- Referências sustentam a conclusão e abrem no documento indicado.
- Erro, timeout e falta de credencial não produzem resposta simulada.
- Texto de páginas não consegue instruir o motor a ignorar seus critérios.
- Registros v1/v2 sobrevivem à migração e continuam exportáveis.
- Piloto com pessoas externas observa início sem ajuda, consulta ao original e decisão explicável.

Este documento define os critérios da versão 0.3 e seus próximos testes. A integração está implementada, mas sua ativação, validação real e publicação do servidor dependem da configuração; não constitui validação de eficácia.
