# Syonet Bootstrap [![Build Status](https://travis-ci.org/Syonet/bootstrap.png?branch=master)](https://travis-ci.org/Syonet/bootstrap)
O conjunto de ferramentas front-end da Syonet

## Build
Para fazer build do código do Syonet Bootstrap, é necessário que você siga as seguintes etapas:

1. Instale o [Node.JS](http://nodejs.org/) v0.8+
1. Pela linha de comando, navegue até o local onde você clonou o repositório. Depois, rode os seguintes comandos:
 * `$ npm install -g grunt-cli` _(ignore se você já rodou este antes)_
 * `$ npm install -d` _(ignore se você já rodou este antes)_
 * `$ grunt`
1. Para confirmar que tudo deu certo, confira se foi criado um diretório `dist` na raíz do repositório e se o output do último comando retornou `Done, without errors.`.

## Comandos Adicionais
### Grunt connect
Inicializa um servidor na raiz do projeto acessível em `http://localhost:8001`. Pode ser acessado por qualquer IP da rede externa ou interna.

```shell
$ grunt connect
```

### Grunt watch
Detecta mudanças nos arquivos do projeto e faz o build de forma automática.  

**default:**  
Este processo realiza as tarefas de build padrões quando qualquer arquivo relevante for modificado.

```shell
$ grunt watch
```

**main:**  
Este processo realiza as tarefas de build sem a documentação quando os arquivos relevantes forem modificados.

```shell
$ grunt watch:main
```

**docs:**  
Este processo realiza as tarefas de build da documentação quando os arquivos relevantes forem modificados.

```shell
$ grunt watch:docs
```

### Grunt clean
Reseta o seu working directory removendo os arquivos criados pelo build.

```shell
$ grunt clean
```

## Testes
Inicializar o servidor e acessar os caminhos específicos para cada tipo de teste:

* Testes Visuais: `/styles/tests/index.html`;
* Testes Automáticos: `/scripts/tests/index.html`.

Todos eles devem ser realizados em cada dispositivo/navegador suportado após alguma modificação relevante no projeto.

## Documentação
Para ler a documentação (e também testar o framework), após fazer o build, acesse o arquivo `index.html` em seu browser favorito.

Opcionalmente, você pode acessar a documentação online:
http://syonet.github.io/bootstrap/

## Suporte a browsers
Os seguintes browsers em sua última versão serão suportados:
* Internet Explorer 10
* Firefox 20
* Chrome 26
* Safari iOS 6
* Firefox Android 20
