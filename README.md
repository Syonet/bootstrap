# Syonet Bootstrap
O conjunto de ferramentas front-end da Syonet

## Build
Para fazer build do código do Syonet Bootstrap, é necessário que você siga as seguintes etapas:

1. Instale o [Node.JS](http://nodejs.org/) v0.8+
1. Pela linha de comando, navegue até o local onde você clonou o repositório. Depois, rode os seguintes comandos:
 * `npm install -g grunt-cli` _(ignore se você já rodou este antes)_
 * `npm install -d` _(ignore se você já rodou este antes)_
 * `grunt`
1. Para confirmar que tudo deu certo, confira se foi criado um diretório `dist` na raíz do repositório e se o output do último comando retornou `Done, without errors.`.

__Dica:__ Para não ter que rodar com frequência o comando `grunt`, rode apenas o comando `grunt watch`. Ele irá observar por modificações nos arquivos `LESS` e irá compilar automaticamente.

## Documentação
Para ler a documentação (e também testar o framework), após fazer o build, acesse o arquivo `index.html` em seu browser favorito.

Opcionalmente, você pode acessar a documentação online:
http://syonet.github.com/bootstrap
