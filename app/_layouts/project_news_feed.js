---
---
{% assign news = site.data.news | where: "project", page.news_slug %}callback({"news": {{ news | jsonify }}, "date": "{{ site.time }}"})
