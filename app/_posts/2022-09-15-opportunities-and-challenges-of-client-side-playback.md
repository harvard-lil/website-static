---
title: "Web Archiving: Opportunities and Challenges of Client-Side Playback"
author: matteo-cargnelutti
excerpt_separator: <!--more-->
---
Historically, the complexities of the backend infrastructures needed to play back and embed rich web archives on a website have limited how we explore, showcase and tell stories with the archived web. [Client-side playback](https://blog.conifer.rhizome.org/2019/10/03/client-side-replay.html) is an exciting emerging technology that lifts a lot of those restraints.

The [replayweb.page](https://replayweb.page/docs/) software suite developed by our long-time partner [Webrecorder](https://webrecorder.net/) is, to date, the most advanced client-side playback technology available, allowing for the easy embedding of rich web archive playbacks on a website without the need for a complex backend infrastructure. However, entirely delegating to the browser the responsibility of downloading, parsing, and restituting web archives also means transferring new responsibilities to the client, which comes with its own set of challenges.

In this post, we'll reflect on [our experience deploying replayweb.page on Perma.cc](https://blogs.harvard.edu/perma/2022/08/17/new-playback-software-improves-fidelity-of-your-perma-links/) and provide general security, performance and practical recommendations on how to embed web archives on a website using client-side playback.

<!--more-->

## Security model

Conceptually, embedding a web archive on a web page is equivalent to embedding a third-party website: the embedder has limited control over what is embedded, and the embedded content should therefore be as isolated as possible from its parent context.

Although the software replaying a web archive can attempt to prevent replayed JavaScript from escaping its context, we believe embedding should be implemented in a way that benefits as much as possible from the built-in protections the browser offers for such use cases: namely, the [same-origin policy](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy).

Embedding third-party code from a web archive can go wrong in a few ways: there could be an intentional cross-site scripting attack, where JavaScript code is added to a web archive with the intent of accessing or modifying information on the top-level document. There could be an accidental cookie rewrite, where the archive creates a new cookie overwriting one already in use by the embedding website. There could also be proxying conflicts, where a URL of the embedding website ends up being caught by the proxying system of the playback software, making it harder to reach.

Our experience so far tells us that these "context clashes" are more easily prevented by instructing the browser to isolate the archive replay as much as possible.

For that reason, although [it is entirely possible---and convenient---to mix web archive content directly into a top-level HTML page](https://replayweb.page/docs/embedding), our recommendation is to **use an iframe to do so, pointing at a subdomain of the embedding website**.

```html
<!-- On www.example.com -->
<iframe
  src="https://warc.example.com/replay/{id}"
  sandbox="allow-scripts allow-same-origin allow-modals allow-forms">
</iframe>
```

In this example, `www.example.com` uses an iframe to embed `warc.example.com/replay/{id}`, which serves an HTML document containing an instance of replayweb.page, pointing at an archive file identified by `{id}`.

A few reasons for that recommendation:
- **warc.example.com is a different origin**: therefore the browser will greatly restrict interactions between the embedded replay and its parent, helping prevent context leaks that the playback system might have not accounted for. This should remain true even though the embedding iframe needs to allow _both_ [`allow-scripts` and `allow-same-origin`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe#attr-sandbox) for the playback system to work properly.
- **But, it is still on the example.com domain**: and the browser will therefore allow this frame to install a service worker. Service workers are subject to the same restrictions as cookies in a third-party embedding context: as such, if third-party cookies are blocked by the browser (which is becoming the default in most browsers), so are third-party service workers.

## Client-side performance and caching

Transition from server-side to client-side playback also forces us to reconsider performance and caching strategies, informed by the client's network access characteristics and the limitations of their browsers. The following recommendations are specific to replayweb.page, but are likely applicable, to a certain extent, to other client-side playback solutions.

By default, replayweb.page will try to store every payload it pulled from the archive into IndexedDB for caching purposes. [Different browsers have different storage allowances and eviction mechanisms](https://web.dev/storage-for-the-web), and it is not unlikely that said allowance runs out after a few archive playbacks. This is a problem we faced with Safari on Perma.cc, and recovery mechanisms proved difficult to efficiently implement.


While this caching feature is helpful to reduce bandwidth usage for returning visitors, turning it off via the [`noCache`](https://replayweb.page/docs/embedding#:~:text=loading%20edge%20cases.-,noCache,-if%20set%2C%20will) attribute may make sense.

There seems to be a strong-enough correlation between [browsers giving limited storage allowances](https://web.dev/storage-for-the-web/#how-much) and [browsers not supporting the `StorageManager.estimate` API](https://caniuse.com/?search=StorageManager.estimate) to formulate the following recommendation: `noCache` should be added if [`StorageManager.estimate`](https://developer.mozilla.org/en-US/docs/Web/API/StorageManager/estimate) is either not available, or indicates that storage usage is above a certain threshold.

It should be noted that, even when using `noCache`, replayweb.page needs to store content indexes and other information about the archives in IndexedDB to function. As such, determining how much space should be left for that purpose is context-specific, and we are unfortunately unable to make a general recommendation on this topic.

Alternatively, always using `noCache` may be considered an acceptable trade-off, if bandwidth usage matters less than reliability for your use case.

## Storing and serving archive files

Retrieving and parsing archive files directly within the browser means that client-side constraints now apply to this set of operations. The following recommendations focus on the use case of serving archives files over HTTP for use with replayweb.page, or similar client-side playback solutions.

### CORS

Replayweb.page uses the [Fetch API](https://fetch.spec.whatwg.org/) to download archive files, which enforces the [Cross-Origin Resource Sharing policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS). Pointing replayweb.page's `source` attribute at a resource hosted on a different domain will trigger a [preflight request](https://developer.mozilla.org/en-US/docs/Glossary/Preflight_request), which will fail unless the target file bears sufficiently permissive CORS headers:
- `Access-Control-Allow-Origin` should at least allow the embedder's origin.
- `Access-Control-Allow-Methods` should allow HEAD and GET.
- `Access-Control-Allow-Headers` should be permissive.
- `Access-Control-Expose-Headers` should include headers needed for range request support, such as `Content-Range` and `Content-Length`. `Content-Encoding` should likely also be exposed.

### Content-Type

Archive files generally need to explicitly state their MIME type for the player to properly identify them. We recommend populating the `Content-Type` headers with the following values when serving archive files:
- `application/x-gzip` for .warc.gz files
- `application/wacz` for .wacz files

### Support for range requests and range-request caching

Replayweb.page makes extensive use of [HTTP range requests](https://developer.mozilla.org/en-US/docs/Web/HTTP/Range_requests) to more efficiently retrieve resources from a given archive without having to download the entire file. This is especially true for [wacz files, which were designed specifically for this purpose](https://specs.webrecorder.net/wacz/1.1.1/#motivation).

As a result, and although there is a "_standard_" fallback mode for warc.gz files in replayweb.page, servers hosting files for client-side playback should support range requests, or go through a proxy to palliate the absence of that feature.

That shift from single whole-file HTTP requests to myriads of partial HTTP requests may have an impact on billing with certain cloud storage providers. Although this problem is likely vendor-specific, our experiments so far indicate that using a proxy-cache may be a viable option to deal with the issue.

That said, [caching range requests efficiently is notoriously difficult](https://kevincox.ca/2021/06/04/http-range-caching/) and [implementations](https://kevincox.ca/2021/06/04/http-range-caching/#what-are-cdns-doing) vary widely from provider to provider. To our knowledge, for the use case of client-side web archives playback, [slice-by-slice range request caching](https://www.nginx.com/blog/smart-efficient-byte-range-caching-nginx/#cache-slice) appears to be the most efficient approach.

## Other recommendations

### No playback outside of cross-origin iframes
As a way to ensure that an archive replay is not taken out of context and that it is executed in a cross-origin iframe, we recommend checking that properties of `parent.window` are not accessible before injecting `<replay-web-page>` in the document.

### Replayweb.page and Apple Safari

What appears to be a bug in the way certain versions of Safari handle state partitioning in Web Workers spun from Service Workers in the context of cross-origin iframes may cause replayweb.page to freeze.

This problem should be fixed in Safari 16: in the meantime, we recommend using [replayweb.page's `noWebWorker` option](https://replayweb.page/docs/embedding#:~:text=known/trusted%20sites.-,noWebWorker,-if%20set%2C%20will) with problematic versions of Safari, which can be identified in JavaScript by the presence of `window.GestureEvent`, and the absence of `window.SharedWorker`.

## wacz-exhibitor: our experimental boilerplate

[wacz-exhibitor](https://github.com/harvard-lil/wacz-exhibitor) is LIL's experimental client-side playback integration boilerplate, which can be used to test out and explore the recommendations described in this article.
It consists of:
a basic web server configuration for storing, proxying, caching and serving web archive files; and
a pre-configured "embed" page, serving an instance of replayweb.page aimed at a given archive file.

Source code and documentation on GitHub: [https://github.com/harvard-lil/wacz-exhibitor](https://github.com/harvard-lil/wacz-exhibitor).

<hr>
<small>These notes have been compiled as part of a new chapter exploring this technology, but the foundation of our insight was built long ago by [Rebecca Cremona](/about/#rebecca-cremona) as she spearheaded the integration of client-side playback into Perma.cc.</small>

<hr>
<small>**2022-10-07 update:** We're happy to report that version 1.7.0 of [Webrecorder's replayweb.page](https://github.com/webrecorder/replayweb.page) implements some of the recommendations outlined in this blog post.</small>

<small>Namely:</small>
- <small>Automatically using `noCache` mode in browsers that do not support the `StorageManager.estimate` API.</small>
- <small>Automatically using `noWebWorker` mode for Safari 15 and older.</small>
- <small>Addition of an optional `requireSubDomainIframe` attribute to ensure the player won't start unless it's embedded in a cross-origin `<iframe>`.</small>

<hr>
<small>**2023-04-03 update:** <code>warc-embed</code> is now <code>wacz-exhibitor</code>