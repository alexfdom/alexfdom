---
layout: default
title: Writing
permalink: /
---

<div class="section research-blurb">
    <p>If reality is Plato's cave, can AI agents learn the ideal forms underlying diverse experiences for robust, aligned intelligence?</p>
    <p class="citation">
        <a href="https://arxiv.org/abs/2405.07987" target="_blank" rel="noopener">"The Platonic Representation Hypothesis"</a> — arXiv:2405.07987
    </p>
</div>

<div class="section news-container">
    <h2 class="section-header">News</h2>

    <ul class="news">
    {% for item in site.data.news %}
    <li class="{% if item.date == '' or item.date == nil %}no-date{% endif %}">
        {% if item.date and item.date != empty %}
        <div class="news-date">{{ item.date }}</div>
        {% endif %}
        <div class="news-content">{{ item.content }}</div>
    </li>
    {% endfor %}
    </ul>
</div>

<div class="section projects-container">
    <h2 class="section-header">Select Works</h2>
    
    <ul class="projects">
    {% for pub in site.data.projects %}
    <li>
        <div class="title">
            <a target="_blank" href="{{ pub.links.default }}">{{ pub.title }}</a>
        </div>
        <div class="description">{{ pub.description }}</div>
        <div class="authors">{{ pub.authors }}</div>
        <div class="publication">
            <span class="italic">{{ pub.venue }}</span> {{ pub.year }}
        </div>
        <div class="links">
            {% if pub.links.paper %}
                <a href="{{ pub.links.paper }}" target="_blank" class="link-button">Paper</a>
            {% endif %}
            {% if pub.links.code %}
                <a href="{{ pub.links.code }}" target="_blank" class="link-button">Code</a>
            {% endif %}
            {% if pub.links.tldr %}
                <a href="{{ pub.links.tldr }}" target="_blank" class="link-button">TL;DR</a>
            {% endif %}
            {% if pub.links.app %}
                <a href="{{ pub.links.app }}" target="_blank" class="link-button">App</a>
            {% endif %}
        </div>
    </li>
    {% endfor %}
    </ul>
</div>

<div class="section projects-container">
    <h2 class="section-header">Notebooks</h2>
    
    <ul class="projects">
    {% for pub in site.data.notebooks %}
    <li>
        <div class="title">
            <a target="_blank" href="{{ pub.links.default }}">{{ pub.title }}</a>
        </div>
        <div class="description">{{ pub.description }}</div>
        <div class="authors">{{ pub.authors }}</div>
        <div class="publication">
            <span class="italic">{{ pub.venue }}</span> {{ pub.year }}
        </div>
        <div class="links">
            {% if pub.links.paper %}
                <a href="{{ pub.links.paper }}" target="_blank" class="link-button">Paper</a>
            {% endif %}
            {% if pub.links.code %}
                <a href="{{ pub.links.code }}" target="_blank" class="link-button">Code</a>
            {% endif %}
            {% if pub.links.tldr %}
                <a href="{{ pub.links.tldr }}" target="_blank" class="link-button">TL;DR</a>
            {% endif %}
            {% if pub.links.app %}
                <a href="{{ pub.links.app }}" target="_blank" class="link-button">App</a>
            {% endif %}
        </div>
    </li>
    {% endfor %}
    </ul>
</div>