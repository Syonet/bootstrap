{% extends "layouts/docs.swig" %}
{% set active = "angularjs" %}

{% block content %}
    <aside class="col col-small-3 col-large-2" id="sidebar-wrapper">
        <ul class="syo-nav syo-nav-list" id="sidebar">
            <li class="syo-nav-header"><i class="icon-flag"></i> Angular.js</li>
            <li><a href="#notifications">Notificações</a></li>
        </ul>
    </aside>

    <div class="col col-small-9 col-large-10">
        <article id="notifications">
            <div class="syo-header syo-header-ruler">
                <h2>Notificações</h2>
            </div>

            <p>É possível adicionar notificações à página usando o factory <code>$notification</code>.</p>

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
        </article>
    </div>
{% endblock %}