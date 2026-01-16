---
layout: default  
title: My Config
permalink: /myconfig/
---

<div class="section projects-container">
    <h2 class="section-header">Config Across Devices</h2>
    
    <ul class="projects">
    {% for pub in site.data.my_config %}
    <li>
        <div class="title">
            <a target="_blank" href="{{ pub.links.default }}">{{ pub.title }}</a>
        </div>
        <div class="description">{{ pub.description }}</div>
        <div class="links">
            {% if pub.links.code %}
                <a href="{{ pub.links.code }}" target="_blank" class="link-button">Code</a>
            {% endif %}
        </div>
    </li>
    {% endfor %}
    </ul>
</div>