# 4Movies

> 4Movies é uma API simples que permite que os consumidores efetuem locação e devolução de filmes.

## Comandos

``` bash
# instalar dependências
npm install
 
# inicia aplicação (./lib/index.js)
npm run start
 
# visualiza mudanças nos arquivos do projeto e reinicia aplicação.
npm run watch
 
# roda o lint no projeto
npm run lint
```

## Banco de dados
O script SQL de criação do banco de dados está na raiz do projeto no arquivo "migration.sql"

As credencias de acesso para conectar ao banco estão no arquivo "./lib/databases.sql':
```js
const mysql = knex({
    client: 'mysql2',
    connection: {
      host: '127.0.0.1',
      user: SEU_USUARIO,
      password: SUA_SENHA,
      database: '4movies',
    },
});
```

## Documentação
Visite http://docs.gmenti.apiary.io/
