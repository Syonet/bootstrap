[![Stories in Ready](https://badge.waffle.io/syonet/bootstrap.png?label=ready)](https://waffle.io/syonet/bootstrap)  
# Syonet Bootstrap [![Build Status](https://travis-ci.org/Syonet/bootstrap.png?branch=master)](https://travis-ci.org/Syonet/bootstrap) [![Dependency Status](https://gemnasium.com/Syonet/bootstrap.png)](https://gemnasium.com/Syonet/bootstrap)
O conjunto de ferramentas front-end da Syonet

## Build
Para fazer build do cC3digo do Syonet Bootstrap, C) necessC!rio que vocC* siga as seguintes etapas:

1. Instale o [Node.JS](http://nodejs.org/) v0.8+
1. Pela linha de comando, navegue atC) o local onde vocC* clonou o repositC3rio. Depois, rode os seguintes comandos:
 * `$ npm install -g grunt-cli` _(ignore se vocC* jC! rodou este antes)_
 * `$ npm install -d` _(ignore se vocC* jC! rodou este antes)_
 * `$ grunt`
1. Para confirmar que tudo deu certo, confira se foi criado um diretC3rio `dist` na raC-z do repositC3rio e se o output do C:ltimo comando retornou `Done, without errors.`.

## Comandos Adicionais
### Grunt connect
Inicializa um servidor na raiz do projeto acessC-vel em `http://localhost:8001`. Pode ser acessado por qualquer IP da rede externa ou interna.

```shell
$ grunt connect
```

### Grunt watch
Detecta mudanC'as nos arquivos do projeto e faz o build de forma automC!tica.

**default:**
Este processo realiza as tarefas de build padrC5es quando qualquer arquivo relevante for modificado.

```shell
$ grunt watch
```

**main:**
Este processo realiza as tarefas de build sem a documentaC'C#o quando os arquivos relevantes forem modificados.

```shell
$ grunt watch:main
```

**docs:**
Este processo realiza as tarefas de build da documentaC'C#o quando os arquivos relevantes forem modificados.

```shell
$ grunt watch:docs
```

### Grunt clean
Reseta o seu working directory removendo os arquivos criados pelo build.

```shell
$ grunt clean
```

## Testes
Inicializar o servidor e acessar os caminhos especC-ficos para cada tipo de teste:

* Testes Visuais: `/styles/tests/index.html`;
* Testes AutomC!ticos: `/scripts/tests/index.html`.

Todos eles devem ser realizados em cada dispositivo/navegador suportado apC3s alguma modificaC'C#o relevante no projeto.

## DocumentaC'C#o
Para ler a documentaC'C#o (e tambC)m testar o framework), apC3s fazer o build, acesse o arquivo `index.html` em seu browser favorito.

Opcionalmente, vocC* pode acessar a documentaC'C#o online:
http://syonet.github.io/bootstrap/

## Suporte a browsers
Os seguintes browsers em sua C:ltima versC#o serC#o suportados:
* Internet Explorer 10
* Firefox 20
* Chrome 26
* Safari iOS 6
* Firefox Android 20
