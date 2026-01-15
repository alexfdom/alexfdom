---
layout: default
title: Writing
permalink: /writing/
---

<div class="section writing-container">
    <h2 class="section-header">Technical Writing</h2>
    
    <ul class="writing-list">
    {% for item in site.data.technical_writing %}
    <li>
        <div class="title">
            <a href="{{ item.url }}" target="_blank" rel="noopener">{{ item.title }}</a>
        </div>
        <div class="authors">{{ item.description }}</div>
        <div class="publication">
            <span class="italic">{{ item.publication }}</span> {{ item.date | date: "%B %Y" }}
        </div>
    </li>
    {% endfor %}
    </ul>
</div>

<div class="section writing-container">
    <h2 class="section-header">Non-Technical Writing</h2>
    
    <ul class="writing-list">
    {% for item in site.data.non_technical_writing %}
    <li>
        <div class="title">
            <a href="{{ item.url }}" target="_blank" rel="noopener">{{ item.title }}</a>
        </div>
        <div class="authors">{{ item.description }}</div>
        <div class="publication">
            <span class="italic">{{ item.publication }}</span> {{ item.date | date: "%B %Y" }}
        </div>
    </li>
    {% endfor %}
    </ul>
</div>