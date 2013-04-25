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

##Utilidades
Existem alguns processos no build que podem ser rodados para facilitar o desenvolvimento.

###Iniciando um servidor
Utilize o seguinte comando para inicializar um servidor que fica ativo na raiz do projeto até que seja manualmente finalizado:
```shell
grunt connect
```

###Grunt watch
Para evitar ter que rodar o comando `grunt` toda a hora você pode utilizar o `grunt watch` para que ele detecte automaticamente mudanças nos arquivos do projeto.  
Execute o comando abaixo para observar mudanças nos arquivos CSS:

```shell
grunt watch:css
```

Execute o comando abaixo para observar mudanças nos arquivos JS:
```shell
grunt watch:js
```

## Documentação
Para ler a documentação (e também testar o framework), após fazer o build, acesse o arquivo `index.html` em seu browser favorito.

Opcionalmente, você pode acessar a documentação online:
http://syonet.github.io/bootstrap/
