{% extends "layouts/docs.swig" %}
{% set active = "jquery-ui" %}

{% block content %}
    <aside class="col col-small-3 col-large-2" id="sidebar-wrapper">
        <ul class="syo-nav syo-nav-list" id="sidebar">
            <li class="syo-nav-header"><i class="icon-flag"></i> Componentes</li>
            <li><a href="#badges">Badges</a></li>
            <li><a href="#blocks">Blocos</a></li>
            <li><a href="#buttonset">Buttonset</a></li>
            <li><a href="#checklist">Check List</a></li>
            <li><a href="#header">Header</a></li>
            <li><a href="#input-row">Input Row</a></li>
            <li><a href="#nav">Nav</a></li>
            <li><a href="#navbar">Navbar</a></li>
            <li><a href="#pagination">Paginação</a></li>
            <li><a href="#progressbar">Progressbar</a></li>
        </ul>
    </aside>

    <div class="col col-small-9 col-large-10">
        <!-- Badges -->
        <article id="badges">
            <div class="syo-header syo-header-ruler">
                <h2>Badges</h2>
            </div>
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
                <div class="prettyprint">
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
            </div>
        </article>

        <!-- Buttonset -->
        <article id="buttonset">
            <div class="syo-header syo-header-ruler">
                <h2>Buttonset</h2>
            </div>
            <p>Agrupe uma série de botões <code>.syo-button</code> dentro de um <code>.syo-buttonset</code>.</p>

            <div class="syo-docs-example">
                <div class="syo-docs-example-inner">
                    <div class="syo-buttonset">
                        <button type="button" class="syo-button">Ação 1</button>
                        <button type="button" class="syo-button">Ação 2</button>
                        <button type="button" class="syo-button">Ação 3</button>
                    </div>
                </div>
                <div class="prettyprint">
                    <div class="syo-buttonset">
                        <button type="button" class="syo-button">Ação 1</button>
                        <button type="button" class="syo-button">Ação 2</button>
                        <button type="button" class="syo-button">Ação 3</button>
                    </div>
                </div>
            </div>
        </article>

        <!-- Check List -->
        <article id="checklist">
            <div class="syo-header syo-header-ruler">
                <h2>Check List</h2>
            </div>

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

                <strong>HTML:</strong>
                <div class="prettyprint">
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
                </div>
            </div>

            <p>
                Para implementar o Check List, lembre-se de sempre atribuir um <code>id</code> aos
                checkboxes/radios, bem como um <code>&lt;label&gt;</code> que referencia tal valor no
                atributo <code>for</code>, assim como está no código do exemplo anterior.
            </p>
        </article>

        <!-- Input Row -->
        <article id="input-row">
            <div class="syo-header syo-header-ruler">
                <h2>Input Row</h2>
            </div>
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

                <strong>HTML:</strong>
                <div class="prettyprint">
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
            </div>
        </article>

        <!-- Paginação -->
        <article id="pagination">
            <div class="syo-header syo-header-ruler">
                <h2>Paginação</h2>
            </div>
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
                <div class="prettyprint">
                    <div class="syo-pagination">
                        <ul>
                            <li class="syo-active"><a href="#">1</a></li>
                            <li><a href="#">2</a></li>
                            <li><a href="#">3</a></li>
                            <li class="syo-disabled"><a href="#">4</a></li>
                        </ul>
                    </div>
                </div>
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
                <div class="prettyprint">
                    <div class="syo-pagination">
                        <ul>
                            <li class="syo-disabled"><a href="#">1</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <p>
                <strong>Importante:</strong> Tal classe não desabilita realmente o item da paginação. Ela serve apenas
                como um indicador visual de que o item <em>deve estar</em> desabilitado.
            </p>
        </article>

        <!-- Blocos -->
        <article id="blocks">
            <div class="syo-header syo-header-ruler">
                <h2>Blocos</h2>
            </div>
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
                <div class="prettyprint">
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

        <!-- syo-header -->
        <article id="header">
            <div class="syo-header syo-header-ruler">
                <h2>Headers</h2>
            </div>
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
                <div class="prettyprint">
                    <div class="syo-header syo-header-ruler">
                        <h3>...</h3>
                    </div>

                    <div class="syo-header syo-header-bar">
                        <h3>...</h3>
                    </div>
                </div>
            </div>
        </article>

        <!-- Navbar -->
        <article id="navbar">
            <div class="syo-header syo-header-ruler">
                <h2>Navbar</h2>
            </div>
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
                <div class="prettyprint">
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
            </div>
        </article>

        <!-- Nav -->
        <article id="nav">
            <div class="syo-header syo-header-ruler">
                <h2>Nav</h2>
            </div>
            <p>
                Componentes de navegação com o mesmo HTML base, apenas diferenciando as classes utilizadas. Todos estilos
                estão acessíveis atráves da classe <code>.syo-nav</code>.
            </p>

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
                <div class="prettyprint">
                    <ul class="syo-nav syo-nav-list">
                        <li class="syo-nav-header">Título</li>
                        <li><a href="#">Link 1</a></li>
                        <li><a href="#">Link 2</a></li>
                        <li><a href="#">Link 3</a></li>
                    </ul>
                </div>
            </div>
        </article>

        <!-- Progressbar -->
        <article id="progressbar">
            <div class="syo-header syo-header-ruler">
                <h2>Progressbar</h2>
            </div>

            <p>
                Quando a utilização do <a href="jquery-ui.html#progressbar">jQuery UI</a> para renderizar uma progressbar
                lhe parece muita mão de obra, utilize-o apenas com CSS do Syonet Bootstrap!
            </p>
            <div class="syo-docs-example">
                <div class="syo-docs-example-inner">
                    <div class="syo-progressbar">
                        <div class="syo-progressbar-value" style="width:60%"></div>
                    </div>
                </div>
                <div class="prettyprint">
                    <div class="syo-progressbar">
                        <div class="syo-progressbar-value" style="width:60%"></div>
                    </div>
                </div>
            </div>
        </article>
    </div>
{% endblock %}