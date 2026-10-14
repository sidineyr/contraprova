# Privacidade — atualização 0.3

Há dois modos. No acervo local, a frase não é enviada a um buscador. Na pesquisa online, a afirmação selecionada é enviada ao servidor e à OpenAI para busca e análise; o histórico não é enviado. A interface informa isso antes da ação. Evite dados pessoais e sensíveis.

O servidor usa `store:false` e não grava frases, investigações ou respostas em disco nem imprime esses conteúdos em logs. Isso não elimina registros técnicos da hospedagem, do proxy ou do provedor; as políticas e configurações deles se aplicam. A chave existe apenas no ambiente do servidor, nunca no navegador.

O histórico continua no IndexedDB deste navegador, sem conta ou sincronização. Ao abrir uma fonte, você visita outro site. Mudar de domínio ou limpar dados do navegador pode perder registros: exporte JSON para transferi-los. Importações criam cópias, preservando o que já existe. Exclusão individual e total continuam disponíveis em Minhas investigações.

O servidor mantém contadores temporários por endereço de conexão por até um minuto para limitar abuso. Não usa cabeçalhos de proxy como identidade. Limites globais reiniciam ao reiniciar o processo. Investigações não são publicadas automaticamente.
