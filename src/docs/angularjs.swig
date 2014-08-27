{% extends "layouts/docs.swig" %}
{% set active = "angularjs" %}

{% block sidebar %}
    <ul class="syo-nav syo-nav-list" id="sidebar">
        <li class="syo-nav-header"><i class="icon-cog"></i> Angular.js - services</li>
        <li><a href="#localStorage-service">$localStorage</a></li>
        <li><a href="#notification-service">$notification</a></li>
    </ul>

    <ul class="syo-nav syo-nav-list" id="sidebar">
        <li class="syo-nav-header"><i class="icon-embed"></i> Angular.js - filtros</li>
        <li><a href="#offset-filter">offset</a></li>
        <li><a href="#removeAccents-filter">removeAccents</a></li>
    </ul>
{% endblock %}

{% block content %}
    <!-- Service: $notification -->
    <article id="localStorage-service">
        <header>
            <h2>Service <code>$localStorage</code></h2>
        </header>

        <p>Service para se trabalhar com a API de localStorage do browser.</p>

        {% highlight javascript %}
        // Adiciona um valor "value" sob a chave "key"
        $localStorage.put( "key", "value" );

        // Adiciona um valor JSON sob a chave "key"
        $localStorage.put( "key", { a: 123, b: true, c: "foo" } );

        // Obtem o valor da chave "key"
        $localStorage.get( "key" );
        // => { a: 123, b: true, c: "foo" }

        // Remove a chave "key"
        $localStorage.remove( "key" );

        // Remove todos itens
        $localStorage.removeAll();
        {% endhighlight %}

        <p>
            À exceção do método <code>.get()</code>, todos os outros retornam o próprio service
            <code>$localStorage</code>.
        </p>
    </article>

    <!-- Service: $notification -->
    <article id="notification-service">
        <header>
            <h2>Service <code>$notification</code></h2>
        </header>

        <p>
            É possível adicionar notificações à página usando o factory <code>$notification</code>.
            As notificações são automaticamente fechadas após 3s.
        </p>

        <div class="syo-docs-example">
            <div class="syo-docs-example-inner">
                <button class="syo-button"
                        ng-click="$notification.default( 'Esta é uma notificação padrão.' )">
                    Enviar notificação padrão
                </button>
                <button class="syo-button"
                        ng-click="$notification.success( 'Esta é uma notificação de sucesso.' )">
                    Enviar notificação de sucesso
                </button>
                <button class="syo-button"
                        ng-click="$notification.error( 'Esta é uma notificação de erro.' )">
                    Enviar notificação de erro
                </button>
            </div>
        </div>
        {% highlight javascript %}
            $notification.default( 'Esta é uma notificação padrão.' );
            $notification.success( 'Esta é uma notificação de sucesso.' );
            $notification.error( 'Esta é uma notificação de erro.' );
        {% endhighlight %}

        <p>
            É possível configurar o timeout da notificação (em ms) usando a fase de configuração
            do Angular.js:
        </p>
        {% highlight javascript %}
        app.config([ "$notificationProvider", function( $notificationProvider ) {
            // Toda notificação irá durar 5s, por padrão
            $notificationProvider.defaultTimeout = 5000;
        }]);
        {% endhighlight %}
    </article>

    <!-- Filtro: offset -->
    <article id="offset-filter">
        <header>
            <h2>Filtro <code>offset</code></h2>
        </header>

        <p>
            Corta um array <code>array</code> a partir do índice <code>offset</code> e retorna os itens restantes.
            Útil para fazer paginações em combinação com o filtro <code>limitTo</code>.
        </p>

        <div class="syo-docs-example">
            <div class="syo-docs-example-inner" ng-init="arr = [ 'foo', 'bar', 'baz', 'qux', 'quux' ]; offset = 0">
                {% raw %}
                    <div class="syo-field syo-field-inline">
                        <label>Offset:</label>
                        <input type="number" ng-model="offset" min="0">
                    </div>

                    <div>
                        Array original:
                        <pre>{{ arr }}</pre>
                    </div>

                    <div>
                        Array com offset:
                        <pre>{{ arr | offset: offset }}</pre>
                    </div>
                {% endraw %}
            </div>
            {% highlight xml %}
                {% raw %}
                    <div class="syo-field syo-field-inline">
                        <label>Offset:</label>
                        <input type="number" ng-model="offset" min="0">
                    </div>

                    <div>
                        Array original:
                        <pre>{{ arr }}</pre>
                    </div>

                    <div>
                        Array com offset:
                        <pre>{{ arr | offset: offset }}</pre>
                    </div>
                {% endraw %}
            {% endhighlight %}
        </div>
    </article>

    <!-- Filtro: removeAccents -->
    <article id="removeAccents-filter">
        <header>
            <h2>Filtro <code>removeAccents</code></h2>
        </header>

        <p>
            Remove acentuação de uma string <code>input</code>, ou da propriedade <code>prop</code>
            de um objeto <code>input</code>. Se <code>input</code> for um array, o mesmo ccmportamento é aplicado
            para cada item do array.
        </p>

        <div class="syo-docs-example">
            <div class="syo-docs-example-inner" ng-init="str = 'Concentração é importante!'">
                {% raw %}
                    <div class="syo-field syo-field-inline">
                        <label>Com acentuação:</label>
                        <input type="text" ng-model="str">
                    </div>

                    <div>Sem acentuação: {{ str | removeAccents }}</div>
                {% endraw %}
            </div>
            {% highlight xml %}
                {% raw %}
                    <div class="syo-field syo-field-inline">
                        <label>Com acentuação:</label>
                        <input type="text" ng-model="str">
                    </div>

                    <div>Sem acentuação: {{ str | removeAccents }}</div>
                {% endraw %}
            {% endhighlight %}
        </div>
    </article>
{% endblock %}