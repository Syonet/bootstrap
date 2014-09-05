{% extends "layouts/docs.swig" %}
{% set active = "css" %}

{% block sidebar %}
	<ul class="syo-nav syo-nav-list" id="sidebar">
		<li class="syo-nav-header"><i class="icon-css3"></i> CSS Base</li>
		<li><a href="#grid">Grid</a></li>
		<li><a href="#type">Tipografia</a></li>
		<li><a href="#lists">Listas</a></li>
		<li><a href="#forms">Formulários</a></li>
		<li><a href="#buttons">Botões</a></li>
		<li><a href="#tables">Tabelas</a></li>
		<li><a href="#icons">Ícones</a></li>
		<li><a href="#responsive">Design Responsivo</a></li>
		<li><a href="#utils">Utilitários</a></li>
	</ul>
{% endblock %}

{% block content %}
    <!-- Grid -->
    <article id="grid">
        <header>
            <h2>Grid</h2>
        </header>
        <p>
            Grid responsivo, <em>mobile-first</em>, de 12 colunas.
            Funciona bem com dispositivos de resoluções muito pequenas até grandes monitores.<br>
            Confira na tabela a seguir as opções do grid:
        </p>

        <table class="syo-table syo-table-responsive">
            <thead>
                <tr>
                    <th></th>
                    <th>
                        Devices Minúsculos<br>
                        <small>Smartphones (< 768px)</small>
                    </th>
                    <th>
                        Devices Pequenos<br>
                        <small>Tablets (≥ 768px)</small>
                    </th>
                    <th>
                        Devices Médios<br>
                        <small>Desktops (≥ 980px)</small>
                    </th>
                    <th>
                        Devices Grandes<br>
                        <small>Desktops (≥ 1200px)</small>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th data-title="Opção"># de colunas</th>
                    <td data-title="Todas resoluções" colspan="4">12</td>
                </tr>
                <tr>
                    <th data-title="Opção">Prefixo das classes</th>
                    <td data-title="Devices Minúsculos"><code>.col-tiny-</code></td>
                    <td data-title="Devices Pequenos"><code>.col-small-</code></td>
                    <td data-title="Devices Médios"><code>.col-medium-</code></td>
                    <td data-title="Devices Grandes"><code>.col-large-</code></td>
                </tr>
                <tr>
                    <th data-title="Opção">Grids aninhados</th>
                    <td data-title="Todas resoluções" colspan="4">Sim</td>
                </tr>
                <tr>
                    <th data-title="Opção">Offsets</th>
                    <td data-title="Todas resoluções" colspan="4">Sim</td>
                </tr>
            </tbody>
        </table>

        <section>
            <h3>Exemplo do Grid</h3>
            <p>
                Redimensione seu browser (ou visualize esta página em um dispositivo de resolução menor),
                e observe que algumas das linhas tem larguras diferentes entre as resoluções.
            </p>

            <div class="syo-docs-example">
                <div class="syo-docs-example-inner grid-example">
                    <div class="row">
                        <div class="col col-tiny-2">2</div>
                        <div class="col col-tiny-2">2</div>
                        <div class="col col-tiny-2">2</div>
                        <div class="col col-tiny-2">2</div>
                        <div class="col col-tiny-4">4</div>
                    </div>
                    <div class="row">
                        <div class="col col-medium-4 col-small-12">
                            <span class="visible-medium-above">4</span>
                            <span class="visible-small-below">12</span>
                        </div>
                        <div class="col col-medium-4 col-small-6">
                            <span class="visible-medium-above">4</span>
                            <span class="visible-small">6</span>
                            <span class="visible-tiny">12</span>
                        </div>
                        <div class="col col-medium-4 col-small-6">
                            <span class="visible-medium-above">4</span>
                            <span class="visible-small">6</span>
                            <span class="visible-tiny">12</span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col col-medium-7 col-tiny-12">
                            <span class="visible-medium-above">7</span>
                            <span class="visible-small-below">12</span>
                        </div>
                        <div class="col col-medium-3 col-tiny-7">
                            <span class="visible-medium-above">3</span>
                            <span class="visible-small-below">7</span>
                        </div>
                        <div class="col col-medium-2 col-tiny-5">
                            <span class="visible-medium-above">2</span>
                            <span class="visible-small-below">5</span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col col-tiny-12">12</div>
                    </div>
                </div>
                {% highlight xml %}
                    <div class="row">
                        <div class="col col-tiny-2">2</div>
                        <div class="col col-tiny-2">2</div>
                        <div class="col col-tiny-2">2</div>
                        <div class="col col-tiny-2">2</div>
                        <div class="col col-tiny-4">4</div>
                    </div>
                    <div class="row">
                        <div class="col col-medium-4 col-small-12">
                            <span class="visible-medium-above">4</span>
                            <span class="visible-small-below">12</span>
                        </div>
                        <div class="col col-medium-4 col-small-6">
                            <span class="visible-medium-above">4</span>
                            <span class="visible-small">6</span>
                            <span class="visible-tiny">12</span>
                        </div>
                        <div class="col col-medium-4 col-small-6">
                            <span class="visible-medium-above">4</span>
                            <span class="visible-small">6</span>
                            <span class="visible-tiny">12</span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col col-medium-7 col-tiny-12">
                            <span class="visible-medium-above">7</span>
                            <span class="visible-small-below">12</span>
                        </div>
                        <div class="col col-medium-3 col-tiny-7">
                            <span class="visible-medium-above">3</span>
                            <span class="visible-small-below">7</span>
                        </div>
                        <div class="col col-medium-2 col-tiny-5">
                            <span class="visible-medium-above">2</span>
                            <span class="visible-small-below">5</span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col col-tiny-12">12</div>
                    </div>
                {% endhighlight %}
            </div>
        </section>

        <section>
            <h3>Offsets</h3>

            <p>Para dar um distanciamento extra entre 2 elementos, basta usar uma classe <code>.offset-*</code>:</p>
            <div class="syo-docs-example">
                <div class="syo-docs-example-inner grid-example">
                    <div class="row">
                        <div class="col col-tiny-2">2</div>
                        <div class="col col-tiny-2 offset-tiny-2">2 offset 2</div>
                        <div class="col col-tiny-2 offset-tiny-2">2 offset 2</div>
                        <div class="col col-tiny-2">2</div>
                    </div>
                    <div class="row">
                        <div class="col col-tiny-2 offset-tiny-4">2 offset 4</div>
                        <div class="col col-tiny-2">2</div>
                        <div class="col col-tiny-2">4</div>
                    </div>
                </div>
                {% highlight xml %}
                    <div class="row">
                        <div class="col col-tiny-2">2</div>
                        <div class="col col-tiny-2 offset-tiny-2">2 offset 2</div>
                        ...
                    </div>
                {% endhighlight %}
            </div>
        </section>
    </article>

    <!-- Tipografia -->
    <article id="type">
        <header>
            <h2>Tipografia</h2>
        </header>

        <section>
            <h3>Headings</h3>
            <p>Todos os headings HTML, do <code>h1</code> ao <code>h6</code>.</p>
            <div class="syo-docs-example">
                <div class="syo-docs-example-inner">
                    <h1>h1. Heading 1</h1>
                    <h2>h2. Heading 2</h2>
                    <h3>h3. Heading 3</h3>
                    <h4>h4. Heading 4</h4>
                    <h5>h5. Heading 5</h5>
                    <h6>h6. Heading 6</h6>
                </div>
                {% highlight xml %}<h1>...</h1>{% endhighlight %}
            </div>
        </section>

        <section>
            <h3>Parágrafos</h3>
            <div class="syo-docs-example">
                <div class="syo-docs-example-inner">
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas congue tristique vehicula.
                        In condimentum, libero volutpat pellentesque suscipit, orci enim consectetur massa, sit amet egestas
                        tellus metus eget eros.
                    </p>
                    <p>
                        Praesent in tellus ut magna tincidunt volutpat. Praesent eleifend erat eget risus gravida cursus
                        fermentum urna placerat.
                    </p>
                    <p>
                        Vestibulum interdum orci sed enim egestas quis vehicula mauris accumsan. Donec mattis rhoncus augue,
                        convallis gravida lacus congue vitae. Pellentesque tortor purus, blandit non consequat at, mattis
                        elementum enim.
                    </p>
                    <p>
                        Morbi urna libero, blandit a rutrum sed, rutrum id arcu. Sed ac dolor quis erat fermentum feugiat a
                        et sapien. Nam sit amet eros ac ipsum varius lacinia. Suspendisse nisi odio, pretium et dictum in,
                        blandit vitae lectus.
                    </p>
                </div>
                {% highlight xml %}<p>...</p>{% endhighlight %}
            </div>
            <p>Para dar um destaque extra a um parágrafo, adicione a ele a classe <code>.lead</code>.</p>
            <div class="syo-docs-example">
                <div class="syo-docs-example-inner">
                    <p class="lead">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </div>
                {% highlight xml %}<p class="lead">...</p>{% endhighlight %}
            </div>
        </section>

        <section>
            <h3>Links</h3>
            <div class="syo-docs-example">
                <div class="syo-docs-example-inner">
                    <p><a href="#">Lorem ipsum dolor sit amet</a></p>
                </div>
                {% highlight xml %}<a href="#">...</a>{% endhighlight %}
            </div>
        </section>

        <section>
            <h3>Ênfase</h3>
            <p>Para dar ênfase a um determinado bloco de texto, pode-se usar qualquer uma das tags abaixo:</p>
            <div class="syo-docs-example">
                <div class="syo-docs-example-inner">
                    <p><code>em</code>, <code>i</code>: <em>Texto enfatizado em itálico</em></p>
                    <p><code>strong</code>, <code>b</code>: <strong>Texto com muita importância, em negrito.</strong></p>
                    <p><code>small</code>: <small>Texto sem importância, letras pequenas!</small></p>
                </div>
                {% highlight xml %}
                    <em>...</em> ou <i>...</i>
                    <strong>...</strong> ou <b>...</b>
                    <small>...</small>
                {% endhighlight %}
            </div>
        </section>

        <section>
            <h3>Descrições</h3>
            <p>Uma lista de termos e suas descrições associadas.</p>
            <div class="syo-docs-example">
                <div class="syo-docs-example-inner">
                    <dl>
                        <dt>Marca</dt>
                        <dd>Lamborghini</dd>

                        <dt>Carro</dt>
                        <dd>Gallardo</dd>

                        <dt>Cor</dt>
                        <dd>Amarelo</dd>
                    </dl>
                </div>
                {% highlight xml %}
                    <dl>
                        <dt>Marca</dt>
                        <dd>Lamborghini</dd>

                        <dt>Carro</dt>
                        <dd>Gallardo</dd>

                        <dt>Cor</dt>
                        <dd>Amarelo</dd>
                    </dl>
                {% endhighlight %}
            </div>
        </section>

        <p>
            Para obter uma descrição inline, adicione a classe <code>.dl-inline</code>.
            Os termos ocuparão um espaço de <code>160px</code>, e termos muito longos irão ser cortados com reticências.
        </p>
        <div class="syo-docs-example">
            <div class="syo-docs-example-inner">
                <dl class="dl-inline">
                    <dt>Lorem ipsum dolor</dt>
                    <dd>sit amet, consectetur adipiscing elit</dd>

                    <dt>Mauris lobortis felis nec dui venenatis</dt>
                    <dd>commodo. Praesent sed nulla suscipit felis hendrerit rutrum.</dd>

                    <dt>Donec mauris</dt>
                    <dd>justo, laoreet sit amet varius in</dd>
                </dl>
            </div>
            {% highlight xml %}
                <dl class="dl-inline">
                    <dt>...</dt>
                    <dd>...</dd>
                </dl>
            {% endhighlight %}
        </div>

    </article>

    <!-- Listas -->
    <article id="lists">

        <header>
            <h2>Listas</h2>
        </header>
        <p>Elementos <code>ul</code> e <code>ol</code>, como sempre!</p>

        <section>
            <h3>Não ordenadas</h3>
            <div class="syo-docs-example">
                <div class="syo-docs-example-inner">
                    <ul>
                        <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                        <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                        <li>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            <ul>
                                <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                                <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                            </ul>
                        </li>
                    </ul>
                </div>
                {% highlight xml %}
                    <ul>
                        <li>...</li>
                    </ul>
                {% endhighlight %}
            </div>
        </section>

        <section>
            <h3>Ordenadas</h3>
            <div class="syo-docs-example">
                <div class="syo-docs-example-inner">
                    <ol>
                        <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                        <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                        <li>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            <ol>
                                <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                                <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                            </ol>
                        </li>
                    </ol>
                </div>
                {% highlight xml %}
                    <ol>
                        <li>...</li>
                    </ol>
                {% endhighlight %}
            </div>
        </section>

        <section>
            <h3>Não estilizadas</h3>
            <p>
                Adicione a classe <code>.unstyled</code> para ter listas cujos itens não tem um estilo.
                <strong>Nota:</strong> Apenas os itens diretos da lista com a classe não serão estilizados.
            </p>
            <div class="syo-docs-example">
                <div class="syo-docs-example-inner">
                    <ul class="unstyled">
                        <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                        <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                        <li>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            <ul>
                                <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                                <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                            </ul>
                        </li>
                    </ul>
                </div>
                {% highlight xml %}
                    <ul class="unstyled">
                        <li>...</li>
                    </ul>
                {% endhighlight %}
            </div>
        </section>

        <section>
            <h3>Inline</h3>
            <p>Adicione a classe <code>.inline</code> para ter uma lista inline.</p>
            <div class="syo-docs-example">
                <div class="syo-docs-example-inner">
                    <ul class="inline">
                        <li>Item 1</li>
                        <li>Item 2</li>
                        <li>Item 3</li>
                    </ul>
                </div>
                {% highlight xml %}
                    <ul class="inline">
                        <li>...</li>
                    </ul>
                {% endhighlight %}
            </div>
        </section>
    </article>

    <!-- Forms -->
    <article id="forms">

        <header>
            <h2>Formulários</h2>
        </header>

        <div class="syo-docs-example">
            <div class="syo-docs-example-inner">
                <fieldset>
                    <legend>Grid</legend>
                    <div class="row">
                        <div class="syo-field col col-medium-8 col-large-6">
                            <label for="input1" class="col col-medium-4">Label:</label>
                            <div class="col col-medium-8">
                                <input type="text" id="input1" class="input-block-level">
                                <span class="syo-field-help">Texto de ajuda para o campo acima</span>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="syo-field col col-medium-8 col-large-6">
                            <label for="input2" class="col col-medium-4">Outro Label:</label>
                            <div class="col col-medium-8">
                                <input type="text" id="input2" class="input-block-level" placeholder="Digite aqui">
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="syo-field col col-medium-8 col-large-6">
                            <label class="col col-medium-4">Label sem campo:</label>
                            <div class="col col-medium-8">
                                <span class="syo-field-text">Texto alinhado com o label</span>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="syo-field col col-medium-8 col-large-6">
                            <label class="col col-medium-4">Marque para confirmar:</label>
                            <div class="col col-medium-8">
                                <input type="checkbox">
                            </div>
                        </div>
                    </div>
                    <div class="syo-field row">
                        <div class="syo-field col col-medium-8 col-large-6">
                            <label for="selectinput" class="col">Label block</label>
                            <div class="col">
                                <select id="selectinput" class="input-block-level">
                                    <option value="1">Opção 1</option>
                                    <option value="2">Opção 2</option>
                                    <option value="3">Opção 3</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <!--
                            ATENÇÃO! Para block-level em um spinner precisamos de uma classe especial
                            ".special-input-block-level" no elemento pai
                        -->
                        <div class="syo-field col col-medium-8 col-large-6">
                            <div class="col special-input-block-level">
                                <input type="text" data-widget="spinner" placeholder="Spinner jQuery UI">
                            </div>
                        </div>
                    </div>
                </fieldset>
                <fieldset>
                    <legend>Inline</legend>
                    <div class="syo-field syo-field-inline">
                        <label>
                            <input type="checkbox">
                            Checkbox
                        </label>
                    </div>
                    <div class="syo-field syo-field-inline">
                        <input type="radio" id="input8">
                        <label for="input8">Radio</label>
                    </div>
                    <div class="syo-field syo-field-inline">
                        <label>
                            <input type="radio">
                            Radio
                        </label>
                    </div>
                </fieldset>
                <fieldset>
                    <legend>Padrão</legend>
                    <div class="syo-field">
                        <input type="submit" value="Botão" class="syo-button">
                        <input type="reset" value="Botão desabilitado" class="syo-button" disabled="disabled">
                    </div>
                </fieldset>
            </div>
            {% highlight xml %}
                <form method="POST" action="#">
                    <fieldset>
                        <legend>Grid</legend>
                        <div class="row">
                            <div class="syo-field col col-medium-8 col-large-6">
                                <label for="input1" class="col col-medium-4">Label:</label>
                                <div class="col col-medium-8">
                                    <input type="text" id="input1" class="input-block-level">
                                    <span class="syo-field-help">Texto de ajuda para o campo acima</span>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="syo-field col col-medium-8 col-large-6">
                                <label for="input2" class="col col-medium-4">Outro Label:</label>
                                <div class="col col-medium-8">
                                    <input type="text" id="input2" class="input-block-level" placeholder="Digite aqui">
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="syo-field col col-medium-8 col-large-6">
                                <label class="col col-medium-4">Label sem campo:</label>
                                <div class="col col-medium-8">
                                    <span class="syo-field-text">Texto alinhado com o label</span>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="syo-field col col-medium-8 col-large-6">
                                <label class="col col-medium-4">Marque para confirmar:</label>
                                <div class="col col-medium-8">
                                    <input type="checkbox">
                                </div>
                            </div>
                        </div>
                        <div class="syo-field row">
                            <div class="syo-field col col-medium-8 col-large-6">
                                <label for="selectinput" class="col">Label block</label>
                                <div class="col">
                                    <select id="selectinput" class="input-block-level">
                                        <option value="1">Opção 1</option>
                                        <option value="2">Opção 2</option>
                                        <option value="3">Opção 3</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <!--
                                ATENÇÃO! Para block-level em um spinner precisamos de uma classe especial
                                ".special-input-block-level" no elemento pai
                            -->
                            <div class="syo-field col col-medium-8 col-large-6">
                                <div class="col special-input-block-level">
                                    <input type="text" data-widget="spinner" placeholder="Spinner jQuery UI">
                                </div>
                            </div>
                        </div>
                    </fieldset>
                    <fieldset>
                        <legend>Inline</legend>
                        <div class="syo-field syo-field-inline">
                            <label>
                                <input type="checkbox">
                                Checkbox
                            </label>
                        </div>
                        <div class="syo-field syo-field-inline">
                            <input type="radio" id="input8">
                            <label for="input8">Radio</label>
                        </div>
                        <div class="syo-field syo-field-inline">
                            <label>
                                <input type="radio">
                                Radio
                            </label>
                        </div>
                    </fieldset>
                    <fieldset>
                        <legend>Padrão</legend>
                        <div class="syo-field">
                            <input type="submit" value="Botão" class="syo-button">
                            <input type="reset" value="Botão desabilitado" class="syo-button" disabled="disabled">
                        </div>
                    </fieldset>
                </form>
            {% endhighlight %}
        </div>

        <section>
            <h3>Estados de sucesso/erro</h3>
            <p>
                É possível setar um estado de sucesso/erro em qualquer elemento do formulário. Basta adicionar a classe
                devida no elemento que você deseja aplicar tal estado:
            </p>
            <table class="syo-table">
                <colgroup>
                    <col class="col-small-3">
                    <col class="col-small-9">
                </colgroup>
                <thead>
                    <tr>
                        <th class="text-right">Classe</th>
                        <th>Exemplo visual</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="text-right"><code>.syo-success</code></td>
                        <td>
                            <input type="text" class="syo-success" value="Campo text preenchido com sucesso">
                            <select class="syo-success">
                                <option selected="selected">Estou selecionado!</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td class="text-right"><code>.syo-error</code></td>
                        <td>
                            <input type="text" class="syo-error" value="Erro ao preencher este campo!">
                            <select class="syo-error">
                                <option>Selecione-me</option>
                            </select>
                        </td>
                    </tr>
                </tbody>
            </table>
        </section>
    </article>

    <!-- Botões -->
    <article id="buttons">
        <header>
            <h2>Botões</h2>
        </header>
        <p>
            Vários <i>markups</i> possíveis, apenas um estilo. Estilize qualquer tag com a classe
            <code>.syo-button</code> - no entanto, é preferível utilizá-la com as tags <code>&lt;a&gt;</code> e
            <code>&lt;button&gt;</code> para uma melhor renderização.
        </p>

        <table class="syo-table syo-table-responsive">
            <colgroup>
                <col class="col-medium-2">
                <col class="col-medium-2">
                <col class="col-medium-8">
            </colgroup>
            <thead>
                <tr>
                    <th>Botão</th>
                    <th>Classes</th>
                    <th>Descrição</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td data-title="Botão"><button type="button" class="syo-button">Botão</button></td>
                    <td data-title="Classe"><code>syo-button</code></td>
                    <td data-title="Descrição">Botão padrão para ações sem relevância.</td>
                </tr>
                <tr>
                    <td data-title="Botão"><button type="button" class="syo-button syo-success">Sucesso</button></td>
                    <td data-title="Classe"><code>syo-button syo-success</code></td>
                    <td data-title="Descrição">Indica uma ação positiva ou de sucesso.</td>
                </tr>
                <tr>
                    <td data-title="Botão"><button type="button" class="syo-button syo-error">Erro</button></td>
                    <td data-title="Classe"><code>syo-button syo-error</code></td>
                    <td data-title="Descrição">Indica uma ação negativa ou de erro.</td>
                </tr>
                <tr>
                    <td data-title="Botão"><button type="button" class="syo-button syo-info">Info</button></td>
                    <td data-title="Classe"><code>syo-button syo-info</code></td>
                    <td data-title="Descrição">Indica uma ação de informação.</td>
                </tr>
                <tr>
                    <td data-title="Botão"><button type="button" class="syo-button syo-button-link">Link</button></td>
                    <td data-title="Classe"><code>syo-button syo-button-link</code></td>
                    <td data-title="Descrição">Um botão formatado como um link.</td>
                </tr>
            </tbody>
        </table>

        <section>
            <h3>Várias Tags</h3>
            <p>
                É possível criar botões utilizando várias tags: <code>&lt;input&gt;</code>, <code>&lt;button&gt;</code>
                e <code>&lt;a&gt;</code>. Todas elas utilizando a classe <code>.syo-button</code>:
            </p>
            <div class="syo-docs-example">
                <div class="syo-docs-example-inner">
                    <button type="button" class="syo-button">button</button>
                    <a href="#" class="syo-button">link</a>
                    <input type="submit" class="syo-button" value="submit">
                    <input type="button" class="syo-button" value="input">
                    <input type="reset" class="syo-button" value="reset">
                </div>

                {% highlight xml %}
                    <button type="button" class="syo-button">button</button>
                    <a href="#" class="syo-button">link</a>
                    <input type="submit" class="syo-button" value="submit">
                    <input type="button" class="syo-button" value="input">
                    <input type="reset" class="syo-button" value="reset">
                {% endhighlight %}
            </div>
        </section>

        <section>
            <h3>Tamanho Grande</h3>
            <p>
                Precisando utilizar um botão mais chamativo? Utilize a classe <code>.syo-button-large</code>.
            </p>
            <div class="syo-docs-example">
                <div class="syo-docs-example-inner">
                    <button type="button" class="syo-button syo-button-large">.syo-button-large</button>
                </div>

                {% highlight xml %}
                    <button type="button" class="syo-button syo-button-large">.syo-button-large</button>
                {% endhighlight %}
            </div>
        </section>

        <section>
            <h3>Estado Ativo</h3>
            <p>
                Para dar o efeito de botão ativo, adicione a classe <code>.syo-active</code>.
            </p>

            <div class="syo-docs-example">
                <div class="syo-docs-example-inner">
                    <button class="syo-button syo-active" type="button">Botão ativo</button>
                    <button class="syo-button syo-active" type="button" disabled>Botão ativo desabilitado</button>
                </div>
                {% highlight xml %}
                    <button class="syo-button syo-active" type="button">Botão ativo</button>
                    <button class="syo-button syo-active" type="button" disabled>Botão ativo desabilitado</button>
                {% endhighlight %}
            </div>
        </section>

        <section>
            <h3>Estado Desabilitado</h3>
            <p>
                Para dar o efeito de botão desabilitado, adicione a classe <code>.syo-disabled</code> ou atribua a
                propriedade <code>disabled</code> (disponível apenas para a tag <code>&lt;button&gt;</code>).
            </p>
            <div class="syo-docs-example">
                <div class="syo-docs-example-inner">
                    <button class="syo-button" type="button" disabled="disabled">Botão Desabilitado</button>
                    <a href="#" class="syo-disabled syo-button">Link Desabilitado</a>
                </div>
            </div>
        </section>
    </article>

    <!-- Tabelas -->
    <article id="tables">
        <header>
            <h2>Tabelas</h2>
        </header>
        <p>
            Tabelas devem ser utilizadas apenas para a exibição de dados tabulares. Existe um estilo padrão definido
            para todas as tabelas quando utilizando a classe <code>.syo-table</code>, bem como alguns estilos que
            adaptam o uso da tabela para situações específicas.<br>
            É possível definir uma linha como "ativa" adicionando na <code>tr</code> a classe <code>.syo-active</code>.
        </p>
        <p>
            <b>Dica:</b>
            Também é possível utilizar as classes do grid com as tabelas dentro de um <code>colgroup</code>.
        </p>

        <section>
            <header>
                <h4>Base</h4>
            </header>
            <p>
                Estilo base de todas as tabelas.
            </p>
            <div class="syo-docs-example">
                <div class="syo-docs-example-inner">
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

                {% highlight xml %}
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
                {% endhighlight %}
            </div>
        </section>

        <section>
            <header>
                <h4> Striped </h4>
            </header>
            <p>
                Este estilo fornece um destaque adicional para cada linha de modo a criar um contraste e facilitar a
                visualização dos dados. Basta adicionar a classe <code>.syo-table-striped</code> no elemento principal da
                tabela.
            </p>

            <div class="syo-docs-example">
                <div class="syo-docs-example-inner">
                    <table class="syo-table syo-table-striped">
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

                {% highlight xml %}
                    <table class="syo-table syo-table-striped">
                        ...
                    </table>
                {% endhighlight %}
            </div>
        </section>

        <section>
            <header>
                <h4> Hover </h4>
            </header>
            <p>
                Estilo que destaca a linha que está sob o mouse. Utilize a classe <code>.syo-table-hover</code> para obter este estilo.<br>
                <strong>Nota:</strong> tabelas que também utilizam o estilo "Striped" exibido acima não receberão um destaque acentuado.
            </p>

            <div class="syo-docs-example">
                <div class="syo-docs-example-inner">
                    <table class="syo-table syo-table-hover">
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
                            <tr>
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

                {% highlight xml %}
                    <table class="syo-table syo-table-hover">
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
                            <tr>
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
                {% endhighlight %}
            </div>
        </section>

        <section>
            <header>
                <h4> Estados </h4>
            </header>

            <p>
                É possível utilizar todos os estados padrão do Syonet Bootstrap em cada célula ou linha de uma tabela.
                Eles são os seguintes:
            </p>
            <ul>
                <li><code>.syo-success</code></li>
                <li><code>.syo-error</code></li>
                <li><code>.syo-active</code></li>
            </ul>

            <div class="syo-docs-example">
                <div class="syo-docs-example-inner">
                    <table class="syo-table">
                        <thead>
                            <tr>
                                <th>Coluna 1</th>
                                <th>Coluna 2</th>
                                <th>Coluna 3</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td class="syo-error">Erro nesta célula!</td>
                                <td>3</td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>2</td>
                                <td>3</td>
                            </tr>
                            <tr>
                                <td class="syo-success">1</td>
                                <td>2</td>
                                <td>3</td>
                            </tr>
                            <tr class="syo-success">
                                <td>1</td>
                                <td>2</td>
                                <td>3</td>
                            </tr>
                            <tr class="syo-active">
                                <td>1</td>
                                <td>2</td>
                                <td>3</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {% highlight xml %}
                    <table class="syo-table">
                        <thead>
                            <tr>
                                <th>Coluna 1</th>
                                <th>Coluna 2</th>
                                <th>Coluna 3</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td class="syo-error">Erro nesta célula!</td>
                                <td>3</td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>2</td>
                                <td>3</td>
                            </tr>
                            <tr>
                                <td class="syo-success">1</td>
                                <td>2</td>
                                <td>3</td>
                            </tr>
                            <tr class="syo-success">
                                <td>1</td>
                                <td>2</td>
                                <td>3</td>
                            </tr>
                            <tr class="syo-active">
                                <td>1</td>
                                <td>2</td>
                                <td>3</td>
                            </tr>
                        </tbody>
                    </table>
                {% endhighlight %}
            </div>
        </section>

        <section>
            <header>
                <h4> Tabelas Responsivas </h4>
            </header>

            <p>
                Uma das melhores funcionalidades das tabelas do Syonet Bootstrap é a possibilidade
                de se utilizar tabelas responsivas.<br>
                Para fazer uma tabela responsiva, siga as seguintes etapas:
            </p>
            <ol>
                <li>Adicione a classe <code>.syo-table-responsive</code> na tabela</li>
                <li>
                 Em cada <code>td</code> do <strong>conteúdo da tabela</strong>, adicione um
                 atributo <code>data-title</code> que conterá o valor daquela célula.
                </li>
                <li>Redimensione o navegador ou então acesse a página em um dispositivo menor.</li>
            </ol>

            <p>Veja no exemplo a seguir como fica:</p>
            <div class="syo-docs-example">
                <div class="syo-docs-example-inner">
                    <table class="syo-table syo-table-responsive">
                         <thead>
                             <tr>
                                 <th>Coluna 1</th>
                                 <th>Coluna 2</th>
                                 <th>Coluna 3</th>
                             </tr>
                         </thead>
                         <tbody>
                             <tr>
                                 <td data-title="Coluna 1">Texto 1</td>
                                 <td data-title="Coluna 2">Texto 2</td>
                                 <td data-title="Coluna 3">Texto 3</td>
                             </tr>
                             <tr>
                                 <td data-title="Coluna 1">Texto 1</td>
                                 <td data-title="Coluna 2">Texto 2</td>
                                 <td data-title="Coluna 3">Texto 3</td>
                             </tr>
                             <tr>
                                 <td data-title="Coluna 1">Texto 1</td>
                                 <td data-title="Coluna 2">Texto 2</td>
                                 <td data-title="Coluna 3">Texto 3</td>
                             </tr>
                         </tbody>
                    </table>
                </div>

                {% highlight xml %}
                     <table class="syo-table syo-table-responsive">
                         <thead>
                             <tr>
                                 <th>Coluna 1</th>
                                 <th>Coluna 2</th>
                                 <th>Coluna 3</th>
                             </tr>
                         </thead>
                         <tbody>
                             <tr>
                                 <td data-title="Coluna 1">Texto 1</td>
                                 <td data-title="Coluna 2">Texto 2</td>
                                 <td data-title="Coluna 3">Texto 3</td>
                             </tr>
                             <tr>
                                 <td data-title="Coluna 1">Texto 1</td>
                                   <td data-title="Coluna 2">Texto 2</td>
                                 <td data-title="Coluna 3">Texto 3</td>
                             </tr>
                             <tr>
                                 <td data-title="Coluna 1">Texto 1</td>
                                 <td data-title="Coluna 2">Texto 2</td>
                                 <td data-title="Coluna 3">Texto 3</td>
                             </tr>
                         </tbody>
                     </table>
                {% endhighlight %}
            </div>
        </section>
    </article>

    <!-- Ícones -->
    <article id="icons">
        <header>
            <h2>Ícones</h2>
        </header>
        <p>
            O Syonet Bootstrap vem com as centenas de ícones abaixo, disponibilizados por uma combinação
            de fonte icônicas open source.<br>
            Abaixo uma lista de todos eles e suas respectivas classes CSS.
        </p>

        <div class="syo-field">
            <label for="icon-search">
                Pesquisar ícone:
                <input type="text" ng-model="iconSearch" placeholder="Digite o nome do ícone...">
            </label>
        </div>

        <div icons-container filter="iconSearch"></div>

        <p>
            Para utilizar qualquer um deles, basta colocar a classe desejada em seu elemento. Por exemplo:
        </p>
        <div class="syo-docs-example">
            <div class="syo-docs-example-inner">
                <i class="icon-home"></i>
            </div>
            {% highlight xml %}<i class="icon-home"></i>{% endhighlight %}
        </div>

        <section>
            <h3>Icone Giratório</h3>
            <p>
                É possivel também obter icones giratórios. Basta adicionar a classe <code>.icon-spin</code>.<br>
                Note que o melhor resultado pode ser obtido com o icone <code>.icon-spinner</code>.
            </p>

            <div class="syo-docs-example">
                <div class="syo-docs-example-inner">
                    <i class="icon-spinner icon-spin"></i>
                </div>
                {% highlight xml %}<i class="icon-spinner icon-spin"></i>{% endhighlight %}
            </div>
        </section>
    </article>

    <!-- Responsive -->
    <article id="responsive">
        <header>
            <h2>Design Responsivo</h2>
        </header>
        <p>
            Para facilitar o desenvolvimento responsivo, utilize estas classes, que exibem/ocultam
            conteúdo por tamanho de tela.<br>
            Abaixo está uma tabela com as classes disponíveis e o seu efeito em uma tela diferente.
        </p>

        <table class="syo-table syo-table-responsive responsive-table">
            <thead>
                <tr>
                    <th>Classe</th>
                    <th>Minúsculo <small>< 768px</small></th>
                    <th>Pequeno <small>≥ 768px</small></th>
                    <th>Médio <small>≥ 980px</small></th>
                    <th>Grandes <small>≥ 1200px</small></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td data-title="Classe"><code>.visible-tiny</code></td>
                    <td data-title="Minúsculo - < 768px" class="visible">Visível</td>
                    <td data-title="Pequeno - ≥ 768px" class="hidden">Oculto</td>
                    <td data-title="Médio - ≥ 980px" class="hidden">Oculto</td>
                    <td data-title="Grande - ≥ 1200px" class="hidden">Oculto</td>
                </tr>
                <tr>
                    <td data-title="Classe"><code>.hidden-tiny</code></td>
                    <td data-title="Minúsculo - < 768px" class="hidden">Oculto</td>
                    <td data-title="Pequeno - ≥ 768px" class="visible">Visível</td>
                    <td data-title="Médio - ≥ 980px" class="visible">Visível</td>
                    <td data-title="Grande - ≥ 1200px" class="visible">Visível</td>
                </tr>
                <tr>
                    <td data-title="Classe"><code>.visible-small</code></td>
                    <td data-title="Minúsculo - < 768px" class="hidden">Oculto</td>
                    <td data-title="Pequeno - ≥ 768px" class="visible">Visível</td>
                    <td data-title="Médio - ≥ 980px" class="hidden">Oculto</td>
                    <td data-title="Grande - ≥ 1200px" class="hidden">Oculto</td>
                </tr>
                <tr>
                    <td data-title="Classe"><code>.hidden-small</code></td>
                    <td data-title="Minúsculo - < 768px" class="visible">Visível</td>
                    <td data-title="Pequeno - ≥ 768px" class="hidden">Oculto</td>
                    <td data-title="Médio - ≥ 980px" class="visible">Visível</td>
                    <td data-title="Grande - ≥ 1200px" class="visible">Visível</td>
                </tr>
                <tr>
                    <td data-title="Classe"><code>.visible-medium</code></td>
                    <td data-title="Minúsculo - < 768px" class="hidden">Oculto</td>
                    <td data-title="Pequeno - ≥ 768px" class="hidden">Oculto</td>
                    <td data-title="Médio - ≥ 980px" class="visible">Visível</td>
                    <td data-title="Grande - ≥ 1200px" class="hidden">Oculto</td>
                </tr>
                <tr>
                    <td data-title="Classe"><code>.hidden-medium</code></td>
                    <td data-title="Minúsculo - < 768px" class="visible">Visível</td>
                    <td data-title="Pequeno - ≥ 768px" class="visible">Visível</td>
                    <td data-title="Médio - ≥ 980px" class="hidden">Oculto</td>
                    <td data-title="Grande - ≥ 1200px" class="visible">Visível</td>
                </tr>
                <tr>
                    <td data-title="Classe"><code>.visible-large</code></td>
                    <td data-title="Minúsculo - < 768px" class="hidden">Oculto</td>
                    <td data-title="Pequeno - ≥ 768px" class="hidden">Oculto</td>
                    <td data-title="Médio - ≥ 980px" class="hidden">Oculto</td>
                    <td data-title="Grande - ≥ 1200px" class="visible">Visível</td>
                </tr>
                <tr>
                    <td data-title="Classe"><code>.hidden-large</code></td>
                    <td data-title="Minúsculo - < 768px" class="visible">Visível</td>
                    <td data-title="Pequeno - ≥ 768px" class="visible">Visível</td>
                    <td data-title="Médio - ≥ 980px" class="visible">Visível</td>
                    <td data-title="Grande - ≥ 1200px" class="hidden">Oculto</td>
                </tr>
            </tbody>
        </table>

        <section>
            <h3>Teste das classes responsivas</h3>
            <p>
                Redimensione o seu browser ou então carregue esta página noutros dispositivos para testar as classes abaixo.
                <br>
                O retângulo com um <i>check</i> verde quer dizer que o efeito está ativo na sua resolução de tela atual.
            </p>

            <section>
                <h4>Visível em...</h4>
                <ul class="responsive-test">
                    <li>
                        Smartphones
                        <span class="visible-tiny visible"><i class="ok"></i> Smartphones</span>
                    </li>
                    <li>
                        Tablet
                        <span class="visible-small visible"><i class="ok"></i> Tablet</span>
                    </li>
                    <li>
                        Desktop
                        <span class="visible-medium-above visible"><i class="ok"></i> Desktop</span>
                    </li>
                </ul>
            </section>
        </section>
    </article>

    <!-- Utils -->
    <article id="utils">
        <header>
            <h2>Classes Utilitárias</h2>
        </header>
        <p>Algumas classes que podem lhe ajudar em um desenvolvimento mais rápido.</p>

        <section>
            <h3>.syo-hidden</h3>
            <p>Oculta um elemento da página.</p>
            <div class="highlight"><div class="syo-hidden"></div></div>
        </section>

        <section>
            <h3>.clearfix</h3>
            <p>Limpa o <code>float</code> em qualquer elemento.</p>
            <div class="highlight"><div class="clearfix"></div></div>
        </section>

        <section>
            <h3>.text-overflow</h3>
            <p>
                Adiciona reticências automaticamente a um elemento cujo texto extrapola o seu container. <br>
                <span class='syo-badge syo-warning'>Importante</span> Elementos que não são <code>display: block</code>
                precisarão ter uma largura definida.
            </p>
            <div class="highlight">
                <div class="text-overflow">Texto muito longo para este container</div>
                <!-- Na exibição: "Texto muito longo para es..." -->
            </div>
        </section>
    </article>
{% endblock %}