{% extends "layouts/docs.swig" %}
{% set active = "components" %}

{% block sidebar %}
	<ul class="syo-nav syo-nav-list" id="sidebar">
		<li class="syo-nav-header"><i class="icon-flag"></i> Componentes</li>
		<li><a href="#badges">Badges</a></li>
		<li><a href="#blocks">Blocos</a></li>
		<li><a href="#buttonset">Buttonset</a></li>
		<li><a href="#checklist">Check List</a></li>
		<li><a href="#form-table">Form Table</a></li>
		<li><a href="#header">Header</a></li>
		<li><a href="#input-row">Input Row</a></li>
		<li><a href="#nav">Nav</a></li>
		<li><a href="#navbar">Navbar</a></li>
		<li><a href="#notification">Notificação</a></li>
		<li><a href="#pagination">Paginação</a></li>
		<li><a href="#popover">Popover</a></li>
		<li><a href="#progressbar">Progressbar</a></li>
	</ul>
{% endblock %}

{% block content %}
    <!-- Badges -->
    <article id="badges">
        <header>
            <h2>Badges</h2>
        </header>
        <p>
            Útil componente para indicação visual.
            Pode servir, por exemplo, como contador de itens ou indicador de agrupamento.
        </p>

        <div class="syo-docs-example">
            <div class="syo-docs-example-inner">
                <!-- Badge padrão -->
                <span class="syo-badge">Badge</span>

                <!-- Badge de sucesso -->
                <span class="syo-badge syo-success">Sucesso!</span>

                <!-- Badge de erro -->
                <span class="syo-badge syo-error">Erro!</span>

                <!-- Badge de aviso -->
                <span class="syo-badge syo-warning">Cuidado!</span>

                <!-- Badge de informação -->
                <span class="syo-badge syo-info">Informação</span>
            </div>
            {% highlight xml %}
                <!-- Badge padrão -->
                <span class="syo-badge">Badge</span>

                <!-- Badge de sucesso -->
                <span class="syo-badge syo-success">Sucesso!</span>

                <!-- Badge de erro -->
                <span class="syo-badge syo-error">Erro!</span>

                <!-- Badge de aviso -->
                <span class="syo-badge syo-warning">Cuidado!</span>

                <!-- Badge de informação -->
                <span class="syo-badge syo-info">Informação</span>
            </div>
        {% endhighlight %}
    </article>

    <!-- Blocos -->
    <article id="blocks">
        <header>
            <h2>Blocos</h2>
        </header>
        <p>Simples componente para separação visual de título e conteúdo.</p>

        <div class="syo-docs-example">
            <div class="syo-docs-example-inner">
                <div class="row">
                    <div class="col col-medium-6">
                        <div class="syo-block">
                            <div class="syo-block-header">
                                <div class="syo-block-toolbar">
                                    Toolbar
                                </div>
                                <div class="syo-block-title">
                                    Título do bloco em cima
                                </div>
                            </div>
                            <div class="syo-block-content">
                                Conteúdo
                            </div>
                        </div>
                    </div>
                    <div class="col col-medium-6">
                        <div class="syo-block">
                            <div class="syo-block-content">
                                Conteúdo
                            </div>
                            <div class="syo-block-footer">
                                <div class="syo-block-title">
                                    Título do bloco embaixo
                                </div>
                                <div class="syo-block-toolbar">
                                    Toolbar
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {% highlight xml %}
                <div class="row">
                    <div class="col col-medium-6">
                        <div class="syo-block">
                            <div class="syo-block-header">
                                <div class="syo-block-toolbar">
                                    Toolbar
                                </div>
                                <div class="syo-block-title">
                                    Título do bloco em cima
                                </div>
                            </div>
                            <div class="syo-block-content">
                                Conteúdo
                            </div>
                        </div>
                    </div>
                    <div class="col col-medium-6">
                        <div class="syo-block">
                            <div class="syo-block-content">
                                Conteúdo
                            </div>
                            <div class="syo-block-footer">
                                <div class="syo-block-title">
                                    Título do bloco embaixo
                                </div>
                                <div class="syo-block-toolbar">
                                    Toolbar
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            {% endhighlight %}
        </div>

        <p>
            Se for necessário incluir uma tabela dentro do bloco, existe um tratamento especial da mesma
            para que o conteúdo do bloco não fique tão "pesado", como você pode ver no exemplo abaixo:
        </p>

        <div class="syo-docs-example">
            <div class="syo-docs-example-inner">
                <div class="syo-block">
                    <div class="syo-block-header">
                        <div class="syo-block-title">Bloco com uma tabela</div>
                    </div>
                    <table class="syo-table">
                        <colgroup>
                            <col class="col-medium-3">
                            <col class="col-medium-3">
                            <col class="col-medium-6">
                        </colgroup>
                        <thead>
                        <tr>
                            <th>Coluna 1</th>
                            <th>Coluna 2</th>
                            <th>Coluna 3</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>Texto 1</td>
                            <td>Texto 2</td>
                            <td>Texto 3</td>
                        </tr>
                        <tr>
                            <td>Texto 1</td>
                            <td>Texto 2</td>
                            <td>Texto 3</td>
                        </tr>
                        <tr class="syo-active">
                            <td>Texto 1</td>
                            <td>Texto 2</td>
                            <td>Texto 3</td>
                        </tr>
                        </tbody>
                        <tfoot>
                        <tr>
                            <td>Footer 1</td>
                            <td>Footer 2</td>
                            <td>Footer 3</td>
                        </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>
    </article>

    <!-- Buttonset -->
    <article id="buttonset">
        <header>
            <h2>Buttonset</h2>
        </header>
        <p>Agrupe uma série de botões <code>.syo-button</code> dentro de um <code>.syo-buttonset</code>.</p>

        <div class="syo-docs-example">
            <div class="syo-docs-example-inner">
                <div class="syo-buttonset">
                    <button type="button" class="syo-button">Ação 1</button>
                    <button type="button" class="syo-button">Ação 2</button>
                    <button type="button" class="syo-button">Ação 3</button>
                </div>
            </div>
            {% highlight xml %}
                <div class="syo-buttonset">
                    <button type="button" class="syo-button">Ação 1</button>
                    <button type="button" class="syo-button">Ação 2</button>
                    <button type="button" class="syo-button">Ação 3</button>
                </div>
            {% endhighlight %}
        </div>
    </article>

    <!-- Check List -->
    <article id="checklist">
        <header>
            <h2>Check List</h2>
        </header>

        <p>
            Uma ótima substituição para a clássica lista de checkboxes ou radios, que são um
            verdadeiro pesadelo para interfaces <i>touch screen</i>!
        </p>

        <div class="syo-docs-example">
            <div class="syo-docs-example-inner">
                <p><strong>Checkbox</strong></p>
                <ul class="syo-check-list">
                    <li class="syo-check-list-header">Header Opcional</li>
                    <li>
                        <input type="checkbox" name="checklist" id="checklist-option1">
                        <label for="checklist-option1">Opção 1</label>
                    </li>
                    <li>
                        <input type="checkbox" name="checklist" id="checklist-option2">
                        <label for="checklist-option2">Opção 2</label>
                    </li>
                    <li>
                        <input type="checkbox" name="checklist" id="checklist-option3">
                        <label for="checklist-option3">Opção 3</label>
                    </li>
                    <li>
                        <input type="checkbox" name="checklist" id="checklist-option4">
                        <label for="checklist-option4">Opção 4</label>
                    </li>
                </ul>

                <p><strong>Radio</strong></p>
                <ul class="syo-check-list">
                    <li>
                        <input type="radio" name="radiolist" id="radiolist-option1">
                        <label for="radiolist-option1">Radio 1</label>
                    </li>
                    <li>
                        <input type="radio" name="radiolist" id="radiolist-option2">
                        <label for="radiolist-option2">Radio 2</label>
                    </li>
                    <li>
                        <input type="radio" name="radiolist" id="radiolist-option3">
                        <label for="radiolist-option3">Radio 3</label>
                    </li>
                </ul>
            </div>

            {% highlight xml %}
                <ul class="syo-check-list">
                    <li class="syo-check-list-header">Header Opcional</li>
                    <li>
                        <input type="checkbox" name="checklist" id="checklist-option1">
                        <label for="checklist-option1">Opção 1</label>
                    </li>
                    <li>
                        <input type="checkbox" name="checklist" id="checklist-option2">
                        <label for="checklist-option2">Opção 2</label>
                    </li>
                </ul>

                <ul class="syo-check-list">
                    <li>
                        <input type="radio" name="radiolist" id="radiolist-option1">
                        <label for="radiolist-option1">Radio 1</label>
                    </li>
                    <li>
                        <input type="radio" name="radiolist" id="radiolist-option2">
                        <label for="radiolist-option2">Radio 2</label>
                    </li>
                </ul>
            {% endhighlight %}
        </div>

        <p>
            Para implementar o Check List, lembre-se de sempre atribuir um <code>id</code> aos
            checkboxes/radios, bem como um <code>&lt;label&gt;</code> que referencia tal valor no
            atributo <code>for</code>, assim como está no código do exemplo anterior.
        </p>
    </article>

    <!-- Form Table -->
    <article id="form-table">
        <header>
            <h2>Form Table</h2>
        </header>

        <p>
            O form table é um componente para uma exibição de fichas complexas, com muitos campos,
            no estilo rótulo/valor. Também aceita controles de formulário nas células de valor.
        </p>

        <div class="syo-docs-example">
            <div class="syo-docs-example-inner">
                <form class="syo-form-table">
                    <legend>Título do formulário</legend>

                    <div class="syo-field">
                        <label class="col col-medium-2 col-small-4">Label:</label>
                        <div class="col col-medium-4 col-small-8 syo-field-text">
                            Valor da célula
                        </div>

                        <label class="col col-medium-2 col-small-4">Label:</label>
                        <div class="col col-medium-4 col-small-8">
                            <input type="text">
                        </div>
                    </div>

                    <div class="syo-field">
                        <label class="col col-medium-2 col-small-4">Label:</label>
                        <div class="col col-medium-10 col-small-8 syo-field-text">
                            Valor da célula
                        </div>
                    </div>
                </form>
            </div>
            {% highlight xml %}
                <form class="syo-form-table">
                    <legend>Título do formulário</legend>

                    <div class="syo-field">
                        <label class="col col-medium-2 col-small-4">Label:</label>
                        <div class="col col-medium-4 col-small-8 syo-field-text">
                            Valor da célula
                        </div>

                        <label class="col col-medium-2 col-small-4">Label:</label>
                        <div class="col col-medium-4 col-small-8">
                            <input type="text">
                        </div>
                    </div>

                    <div class="syo-field">
                        <label class="col col-medium-2 col-small-4">Label:</label>
                        <div class="col col-medium-10 col-small-8 syo-field-text">
                            Valor da célula
                        </div>
                    </div>
                </form>
            {% endhighlight %}
        </div>
    </article>

    <!-- syo-header -->
    <article id="header">
        <header>
            <h2>Headers</h2>
        </header>
        <p>
            Para utilizar como separador de seções de páginas, você pode utilizar os 2 tipos de headers a seguir.
            Basta utilizar a classe <code>.syo-header</code> e alguma classe dos estilos opcionais:
            <code>.syo-header-ruler</code> ou <code>.syo-header-bar</code>.
        </p>

        <div class="syo-docs-example">
            <div class="syo-docs-example-inner">
                <div class="syo-header syo-header-ruler">
                    <h3>Lorem Ipsum</h3>
                </div>

                <div class="syo-header syo-header-bar">
                    <h3>Lorem Ipsum</h3>
                </div>
            </div>
            {% highlight xml %}
                <div class="syo-header syo-header-ruler">
                    <h3>...</h3>
                </div>

                <div class="syo-header syo-header-bar">
                    <h3>...</h3>
                </div>
            {% endhighlight %}
        </div>
    </article>

    <!-- Input Row -->
    <article id="input-row">
        <header>
            <h2>Input Row</h2>
        </header>
        <p>
            Coloque um campo <code>input</code> de texto + botões dentro de um mesmo elemento de
            forma que sempre ocupem toda uma linha.
        </p>

        <div class="syo-docs-example">
            <div class="syo-docs-example-inner">
                <div class="row">
                    <div class="syo-input-row col col-medium-6">
                        <input type="text" placeholder="Nome">
                        <div class="syo-input-row-addon">
                            <button class="syo-button">
                                <i class="icon-ok"></i>
                            </button>
                        </div>
                    </div>
                    <div class="syo-input-row col col-medium-6">
                        <input type="text" placeholder="Digite sua pesquisa...">
                        <div class="syo-input-row-addon">
                            <button class="syo-button">
                                <i class="icon-search"></i>
                                Pesquisar
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {% highlight xml %}
                <div class="row">
                    <div class="syo-input-row col col-medium-6">
                        <input type="text" placeholder="Nome">
                        <div class="syo-input-row-addon">
                            <button class="syo-button">
                                <i class="icon-ok"></i>
                            </button>
                        </div>
                    </div>
                    <div class="syo-input-row col col-medium-6">
                        <input type="text" placeholder="Digite sua pesquisa...">
                        <div class="syo-input-row-addon">
                            <button class="syo-button">
                                <i class="icon-search"></i>
                                Pesquisar
                            </button>
                        </div>
                    </div>
                </div>
            {% endhighlight %}
        </div>
    </article>

    <!-- Navbar -->
    <article id="navbar">
        <header>
            <h2>Navbar</h2>
        </header>
        <p>Navbars são componentes para incluir uma navegação básica horizontal.</p>

        <div class="syo-docs-example">
            <div class="syo-docs-example-inner">
                <div class="syo-navbar">
                    <div class="container">
                        <a href="#" class="syo-navbar-title">Projeto</a>
                        <ul class="syo-nav">
                            <li class="syo-active"><a href="#">Link 1</a></li>
                            <li><a href="#">Link 2</a></li>
                            <li><a href="#">Link 3</a></li>
                        </ul>
                        <div class="syo-pull-right syo-navbar-content">Conteúdo à direita</div>
                    </div>
                </div>
            </div>
            {% highlight xml %}
                <div class="syo-navbar">
                    <div class="container">
                        <a href="#" class="syo-navbar-title">Projeto</a>
                        <ul class="syo-nav">
                            <li class="syo-active"><a href="#">Link 1</a></li>
                            <li><a href="#">Link 2</a></li>
                            <li><a href="#">Link 3</a></li>
                        </ul>
                        <div class="syo-pull-right syo-navbar-content">Conteúdo à direita</div>
                    </div>
                </div>
            {% endhighlight %}
        </div>
    </article>

    <!-- Nav -->
    <article id="nav">
        <header>
            <h2>Nav</h2>
        </header>
        <p>
            Componentes de navegação com o mesmo HTML base, apenas diferenciando as classes utilizadas. Todos estilos
            estão acessíveis atráves da classe <code>.syo-nav</code>.
        </p>

        <section>
            <h3>Nav list</h3>
            <p>
                Navegação vertical, que permite um fácil agrupamento com headers opcionais. Melhor utilizados como
                sidebars.
            </p>
            <div class="syo-docs-example">
                <div class="syo-docs-example-inner clearfix">
                    <div class="span3">
                        <ul class="syo-nav syo-nav-list">
                            <li class="syo-nav-header">Título</li>
                            <li><a href="#">Link 1 </a></li>
                            <li><a href="#">Link 2</a></li>
                            <li><a href="#">Link 3</a></li>
                        </ul>
                    </div>
                </div>
                {% highlight xml %}
                    <ul class="syo-nav syo-nav-list">
                        <li class="syo-nav-header">Título</li>
                        <li><a href="#">Link 1</a></li>
                        <li><a href="#">Link 2</a></li>
                        <li><a href="#">Link 3</a></li>
                    </ul>
                {% endhighlight %}
            </div>
        </section>

        <section>
            <h3>Nav Tray</h3>
            <p>
                Navegação em bandeja, no estilo das pastas do Android. É possível posicionar até 4 itens por linha
                utilizando as classes <code>.syo-nav-tray-*</code>.
            </p>

            <div class="syo-docs-example">
                <div class="syo-docs-example-inner clearfix">
                    <div class="col col-medium-4 col-large-3 col-xlarge-2">
                        <ul class="syo-nav syo-nav-tray syo-nav-tray-2">
                            <li>
                                <a href>
                                    <i class="icon-home"></i>
                                    <span class="syo-nav-tray-label">Home</span>
                                </a>
                            </li>
                            <li>
                                <a href>
                                    <i class="icon-heart-o"></i>
                                    <span class="syo-nav-tray-label">Recomendar</span>
                                </a>
                            </li>
                            <li>
                                <a href>
                                    <i class="icon-comments"></i>
                                    <span class="syo-nav-tray-label">Comentários</span>
                                </a>
                            </li>
                            <li>
                                <a href>
                                    <i class="icon-sign-out"></i>
                                    <span class="syo-nav-tray-label">Sair</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                {% highlight xml %}
                    <ul class="syo-nav syo-nav-tray syo-nav-tray-2">
                        <li><a href><i class="icon-home"></i><span class="syo-nav-tray-label">Home</span></a></li>
                        <li><a href><i class="icon-heart-o"></i><span class="syo-nav-tray-label">Recomendar</span></a></li>
                        <li><a href><i class="icon-comments"></i><span class="syo-nav-tray-label">Comentários</span></a></li>
                        <li><a href><i class="icon-sign-out"></i><span class="syo-nav-tray-label">Sair</span></a></li>
                    </ul>
                {% endhighlight %}
            </div>
        </section>
    </article>

		<!-- Paginação -->
		<article id="notification">
				<header>
						<h2>Notificação</h2>
				</header>
				<p>Cria um componente de notificação estático, útil para alertar o usuário de alguma coisa.</p>

				<div class="syo-docs-example">
						<div class="syo-docs-example-inner">
								<div class="syo-notification">Notificação padrão</div>
								<div class="syo-notification syo-info">Informação</div>
								<div class="syo-notification syo-error">Erro</div>
								<div class="syo-notification syo-warning">Alerta</div>
								<div class="syo-notification syo-success">Sucesso</div>
						</div>
						{% highlight xml %}
								<div class="syo-notification">Notificação padrão</div>
								<div class="syo-notification syo-info">Informação</div>
								<div class="syo-notification syo-error">Erro</div>
								<div class="syo-notification syo-warning">Alerta</div>
								<div class="syo-notification syo-success">Sucesso</div>
						{% endhighlight %}
				</div>
		</article>

    <!-- Paginação -->
    <article id="pagination">
        <header>
            <h2>Paginação</h2>
        </header>
        <p>
            Simples componente de paginação, com uma larga área de clique - o que facilita para interfaces <i>touch
                sensitive</i>.
        </p>

        <div class="syo-docs-example">
            <div class="syo-docs-example-inner">
                <div class="syo-pagination">
                    <ul>
                        <li class="syo-active"><a href="#">1</a></li>
                        <li><a href="#">2</a></li>
                        <li><a href="#">3</a></li>
                        <li class="syo-disabled"><a href="#">4</a></li>
                    </ul>
                </div>
            </div>
            {% highlight xml %}
                <div class="syo-pagination">
                    <ul>
                        <li class="syo-active"><a href="#">1</a></li>
                        <li><a href="#">2</a></li>
                        <li><a href="#">3</a></li>
                        <li class="syo-disabled"><a href="#">4</a></li>
                    </ul>
                </div>
            {% endhighlight %}
        </div>

        <p>Para marcar um item como desabilitado, adicione a classe <code>.syo-disabled</code>:</p>
        <div class="syo-docs-example">
            <div class="syo-docs-example-inner">
                <div class="syo-pagination">
                    <ul>
                        <li class="syo-disabled"><a href="#">1</a></li>
                    </ul>
                </div>
            </div>
            {% highlight xml %}
                <div class="syo-pagination">
                    <ul>
                        <li class="syo-disabled"><a href="#">1</a></li>
                    </ul>
                </div>
            {% endhighlight %}
        </div>
        <p>
            <strong>Importante:</strong> Tal classe não desabilita realmente o item da paginação. Ela serve apenas
            como um indicador visual de que o item <em>deve estar</em> desabilitado.
        </p>
    </article>

    <!-- Popover -->
    <article id="popover">
        <header>
            <h2>Popover</h2>
        </header>

        <p>
            Um popover é um balão que serve para exibir qualquer HTML. Ele é utilizado como uma
            diretiva do Angular.
        </p>
        <div class="syo-docs-example">
            <div class="syo-docs-example-inner">
                <button class="syo-button" syo-popover="{
                    title: 'Título do Popover',
                    template: 'Olá mundo!'
                }">
                    Clique aqui
                </button>
            </div>
            {% highlight xml %}
                <button class="syo-button" syo-popover="{
                    title: 'Título do Popover',
                    template: 'Olá mundo!'
                }">
                    Clique aqui
                </button>
            {% endhighlight %}
        </div>

        <section>
            <h3>Atributos</h3>
            <table class="syo-table">
                <colgroup>
                    <col class="col-small-3 col-large-2">
                    <col class="col-small-2 col-large-1">
                </colgroup>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Tipo</th>
                        <th>Detalhes</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>syoPopover</td>
                        <td><code>Object</code></td>
                        <td>
                            <p>Aceita as seguintes propriedades:</p>
                            <ul>
                                <li>
                                    <code>event</code> Tipo: String
                                    <p>
                                        Define qual evento irá exibir o popover.
                                        Os valores suportados são:
                                    </p>
                                    <ul>
                                        <li>click</li>
                                        <li>mouseenter</li>
                                    </ul>
                                </li>
                                <li>
                                    <code>locals</code> Tipo: Object
                                    <p>
                                        Um objeto de variáveis para mesclar no escopo do popover.<br>
                                        Por exemplo, passando a seguinte configuração:
                                    </p>
                                    {% highlight js %}
                                    {
                                        locals: {
                                            foo: 123,
                                            bar: "baz"
                                        }
                                    }
                                    {% endhighlight %}
                                    <p>
                                        As variáveis <code>foo</code> e <code>bar</code> ficarão
                                        disponíveis no escopo do popover com os valores definidos acima.
                                    </p>
                                </li>
                                <li>
                                    <code>model</code> Tipo: String
                                    <p>
                                        Determina que propriedade do escopo atual irá receber a instância
                                        do controller do popover.
                                    </p>
                                </li>
                                <li>
                                    <code>onClose</code> Tipo: Function
                                    <p>Executa uma função após o popover ter sido fechado.</p>
                                </li>
                                <li>
                                    <code>position</code> Tipo: String
                                    <p>
                                        Define o posicionamento do popover em relação ao elemento em que
                                        foi chamado. O valor possível pode ser um dos seguintes:
                                    </p>
                                    <ul>
                                        <li><code>top</code> - posiciona no topo, centralizado.</li>
                                        <li><code>top-start</code> - posiciona no topo, à esquerda.</li>
                                        <li><code>top-end</code> - posiciona no topo, à direita.</li>
                                        <li><code>left</code> - posiciona à esquerda, centralizado.</li>
                                        <li><code>left-start</code> - posiciona à esquerda, na parte superior.</li>
                                        <li><code>left-end</code> - posiciona à esquerda, na parte inferior.</li>
                                        <li><code>right</code> - posiciona à direita, centralizado.</li>
                                        <li><code>right-start</code> - posiciona à direita, na parte superior.</li>
                                        <li><code>right-end</code> - posiciona à direita, na parte inferior.</li>
                                        <li><code>bottom</code> - posiciona embaixo, centralizado.</li>
                                        <li><code>bottom-start</code> - posiciona embaixo, à esquerda.</li>
                                        <li><code>bottom-end</code> - posiciona embaixo, à direita.</li>
                                    </ul>
                                    <p>Caso nenhum valor seja passado, o padrão <code>top</code> será usado.</p>
                                </li>
                                <li>
                                    <code>scope</code> Tipo: Scope
                                    <p>
                                        Determina qual o escopo do popover, e cria um escopo filho a partir
                                        deste. Caso nenhum escopo seja passado, usa o <code>$rootScope.</code>
                                    </p>
                                </li>
                                <li>
                                    <code>title</code> Tipo: String
                                    <p>Define o título do popover.</p>
                                </li>
                                <li>
                                    <code>template</code> Tipo: String
                                    <p>
                                        Define o conteúdo do popover como HTML. Se utilizado, sobrescreve o valor
                                        de <code>templateUrl</code>.
                                    </p>
                                </li>
                                <li>
                                    <code>templateUrl</code> Tipo: String
                                    <p>Define a URL de um HTML que contem o conteúdo do popover.</p>
                                </li>
                            </ul>
                        </td>
                    </tr>
                </tbody>
            </table>
        </section>
    </article>

    <!-- Progressbar -->
    <article id="progressbar">
        <header>
            <h2>Progressbar</h2>
        </header>

        <p>
            Renderize uma progressbar utilizando apenas CSS. Lembre-se de definir uma largura
            para o <code>.syo-progressbar-value</code>.
        </p>
        <div class="syo-docs-example">
            <div class="syo-docs-example-inner">
                <div class="syo-progressbar">
                    <div class="syo-progressbar-value" style="width:60%"></div>
                </div>
            </div>
            {% highlight xml %}
                <div class="syo-progressbar">
                    <div class="syo-progressbar-value" style="width:60%"></div>
                </div>
            {% endhighlight %}
        </div>

        <p>
            Para criar uma progressbar em aplicações Angular.js que controlam o preenchimento da mesma,
            utilize a diretiva <code>syo-progressbar</code>.
        </p>
        <div class="syo-docs-example">
            <div class="syo-docs-example-inner" ng-init="size = 25">
                <div class="syo-field syo-field-inline">
                    <label>Tamanho:</label>
                    <input type="number" ng-model="size" min="0" max="100">
                </div>

                <div syo-progressbar="{% raw %}{{ size }}{% endraw %}"></div>
            </div>
            {% highlight xml %}
                <div syo-progressbar="50"></div>
            {% endhighlight %}
        </div>
    </article>
{% endblock %}
