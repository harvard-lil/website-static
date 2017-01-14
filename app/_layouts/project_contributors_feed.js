---
---
contributors({"contributors": [{% for name in page.who_contributed %}{% assign person = site.data.people[name] %}{{ person | jsonify }}{% unless forloop.last %},{% endunless %}{% endfor %}]}, "image_base": "{{ site.url }}{{ site.baseurl }}/assets/thumbs/216x216c", "date": "{{ site.time }}"})
