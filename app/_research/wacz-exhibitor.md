---
title: "WACZ Exhibitor"
---

[Part of Perma Tools](https://tools.perma.cc/)

Because we wondered: How could browser-based playback of web archives shift how people access collections of preserved web content?

Experimental proxy and wrapper boilerplate for safely and efficiently embedding Web Archives (.warc, .warc.gz, .wacz) into web pages.

This implementation:

* Wraps [Webrecorder's <replay-web-page>](https://replayweb.page/docs/embedding) client-side playback technology.
* Serves, proxies and caches web archive files using [NGINX](https://www.nginx.com/).
* Allows for two-way communication between the embedding website and the embedded archive using post messages.

[wacz-exhibitor on GitHub](https://github.com/harvard-lil/wacz-exhibitor)

See also: Live Demo, Blog post
