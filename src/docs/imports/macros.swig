{% macro activeClass( which ) %}
    {% if which === active %}
        class="syo-active"
    {% endif %}
{% endmacro %}