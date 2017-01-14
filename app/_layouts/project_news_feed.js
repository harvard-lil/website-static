---
---
{% assign news = site.data.news | where: "project", page.slug %}news({"news": {{ news | jsonify }}, "date": "{{ site.time }}"})
