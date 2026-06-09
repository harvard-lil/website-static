---
title: 'WARCbench: A Swiss Army Knife for WARC Processing'
author: 
- kristi-mukk
- rebecca-cremona
tags:
  - tools
---
![](https://lil-blog-media.s3.amazonaws.com/WARCbench_Logo.png)

The Perma team is excited to announce [WARCbench](https://github.com/harvard-lil/warcbench), an open-source tool for exploring, analyzing, transforming, recombining, and extracting data from WARC (Web ARChive) files.

WARCbench builds on over a decade of experience gained from developing Perma.cc. Over that time, we’ve accumulated a collection of scripts, utilities, debugging workflows, and one-off experiments for dealing with web archives. WARCbench brings together those processes into a simple command-line tool that helps web archivists make sense of the wild, occasionally malformed, and deeply heterogeneous web archives that web archivists encounter in practice.

WARCbench was designed to make as few assumptions as possible about your familiarity with web archives, the kind of WARC you are working with, or what you want to do with it. It is intentionally a command-line tool. You can use it to explore and work with WARC files even without deep prior knowledge of the format, though it does assume you’re comfortable using a terminal and open to a bit of experimentation. The goal is not to hide the complexity of web archives. It is to make that complexity easier to inspect, manipulate, and learn from so you can experiment and iterate.

While many existing WARC tools are optimized for specific production workflows, the exploratory, in-the-moment WARC wrangling and debugging work archivists and developers often need to do benefits from different design choices. Sometimes you need to inspect a malformed or misbehaving WARC. Sometimes you need hooks and custom callbacks for an experiment. Sometimes you need to optimize for speed, memory, or convenience. Sometimes you just need to look and see what is there before deciding what to do next. WARCbench was designed for those moments.

We don’t know all the ways researchers or web archivists might use WARCbench, but we hope it becomes a versatile Swiss Army knife that others will find valuable to keep in their toolkit too.

## **Links**

* [WARCbench on GitHub](https://github.com/harvard-lil/warcbench)
* [WARCbench on PyPI](https://pypi.org/project/warcbench/)

## **Slide Deck from** [IIPC](https://netpreserve.org/) **Web Archiving Conference Presentation on April 21**

<iframe src="https://docs.google.com/presentation/d/e/2PACX-1vQOf38tl_6lBkm3_-5WzAsZgaA3AcXYuzOxHPcDaqCt-CygqwxpB5K2fiMan0R41nrmMy1NYH8uK7eH/pubembed?start=false&amp;loop=false&amp;delayms=3000" frameborder="0" width="592" height="362" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>

&nbsp;

## **Thanks and acknowledgments**

We would like to thank our colleagues **Chris Setzer** and **Ben Steinberg** for their help and support in developing this tool.<br /><br />WARCbench logo by **Jacob Rhoades**.