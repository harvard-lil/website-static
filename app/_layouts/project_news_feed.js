---
---
{% assign project_news = news | where: "project", page.slug %}news({"news": {{ project_news | jsonify }}, "date": "{{ 'now' | date: '%Y-%m-%d %H:%M:%S' }}"})
