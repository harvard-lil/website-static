---
---
contributors({"contributors": [{% for name in page.who_contributed %}{% assign person = people[name] %}{{ person | jsonify }}{% unless forloop.last %},{% endunless %}{% endfor %}]}, "image_base": "{{ site.url }}/assets/thumbs/216x216c", "date": "{{ 'now' | date: '%Y-%m-%d %H:%M:%S' }}"})
