{% macro activeClass( which ) %}
    {% if which === active %}
        class="active"
    {% endif %}
{% endmacro %}