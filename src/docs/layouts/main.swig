{% import "../imports/macros.swig" as macros %}
<!DOCTYPE html>
<html ng-app="bootstrap.docs">
    <head>
        {# Metas #}
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <title>Syonet Bootstrap | Documentação</title>
        <meta name="viewport" content="width=device-width">

        {# Styles #}
        <link rel="stylesheet" href="assets/vendor/highlight.css">
        <link rel="stylesheet" href="dist/bootstrap.css">
        <link rel="stylesheet" href="dist/jquery.ui.css">
        <link rel="stylesheet" href="assets/styles/main.css">
    </head>
    <body class="syo-body-navbar">
        {# Navbar #}
        <div class="syo-navbar syo-navbar-fixed-top" id="topbar">
            <div class="syo-navbar-inner container">
                <ul class="syo-nav">
                    <li {{ macros.activeClass( 'home' ) }}>
                        <a href="index.html">
                            <i class="icon-home"></i>
                            Home
                        </a>
                    </li>
                    <li {{ macros.activeClass( 'css' ) }}>
                        <a href="css.html">
                            <i class="icon-css3"></i>
                            CSS Base
                        </a>
                    </li>
                    <li {{ macros.activeClass( 'components' ) }}>
                        <a href="components.html">
                            <i class="icon-flag"></i>
                            Componentes
                        </a>
                    </li>
                </ul>
                <a href="index.html" class="syo-navbar-title syo-pull-right">Syonet Bootstrap</a>
            </div>
        </div>

        {% block body %}{% endblock %}

        {# Footer #}
        <footer class="footer">
            <div class="container">
                <div class="row">
                    <section class="col col-medium-6 text-right">
                        <a href="{{ package.homepage }}">
                            <img src="assets/images/logo.png" alt="Syonet CRM">
                        </a>
                    </section>
                    <section class="col col-medium-6 text-left">
                        <p>Criado por <strong>{{ package.author.name }}</strong></p>
                        <ul class="inline">
                            <li><a href="{{ package.homepage }}">Site</a></li>
                            <li><a href="{{ package.github }}">GitHub</a></li>
                            <li><a href="{{ package.blog }}">Blog</a></li>
                        </ul>
                    </section>
                </div>
            </div>
        </footer>

        {# Scripts #}
        <script src="assets/vendor/jquery.js"></script>
        <script src="assets/vendor/jquery.ui.js"></script>
        <script src="assets/vendor/angular.js"></script>
        <script src="dist/syoAngular.js"></script>
        <script src="assets/scripts/main.js"></script>
    </body>
</html>