---
author: matt-phillips
date: 2011-10-14 21:24:27+00:00
title: 'Weekly Roundup: recent LIL happenings'
wordpress_id: 822
categories:
- roundup
---

![](https://lil-blog-media.s3.amazonaws.com/notebook_small.png)

Snippets of recent happenings in the Lab:

## [Annie Cain:]({{ site.baseurl }}/about/)

While in the middle of working on some CSS3 transition effects, I just happened to see [prefixfree](http://leaverou.github.com/prefixfree/) mentioned on [Hacker News](http://news.ycombinator.com/).

Instead of writing this in my stylesheet

    -webkit-transition: margin .15s ;
    -moz-transition: margin .15s ;
    -o-transition: margin .15s ;
    transition: margin .15s ;

I just wrote this

    transition: margin .15 ;

## [Paul Deschner:]({{ site.baseurl }}/about/)

How do you find the leading legal cases cited in law review journals throughout their publishing history?  This is the goal of an exploratory project now being set up by visiting scholar Richard Leiter in collaboration with the Innovation Lab.  The hope is to compile a list of the most frequently cited cases, and, depending on what is discovered, possibly facet these results by subject, law-review clusters, etc.  Our initial approach: set up a scripted parser for the inspection of plain-text OCR from sample law journal volumes (generously made available to us by Hein Online).  On the basis of these initial results, using the most basic pattern-matching, we identify case-citation passages which in turn allow us to further refine the parser.  Checking against the associated PDF's allows us to determine the degree to which we're successfully capturing citations and to identify new patterns for inclusion in the parser refinement work.  Additional parsing will be necessary to handle initial vs. subsequent case-citation formats, in-text vs. footnoted references, article tagging and textually non-standard citation locations (such as page-spanning citations).  The lessons learned here will hopefully scale to examining general corpora of OCR texts for citation data.

## [Matt Phillips:]({{ site.baseurl }}/about/)

A couple of weeks ago I mashed up a, er, mashup: Find books in [LibraryCloud](http://www.librarycloud.org) that are related to news items coming off [the New York Times Newswire](http://developer.nytimes.com/docs/read/times_newswire_api).

[Give it a try](https://web.archive.org/web/20111113062413/http://librarylab.law.harvard.edu/projects/works-news/).

The app is about as crude as it can get. The searching for books is done by keyword-matching NYT topics (each NYT piece gets a topic) with [LCSH](http://www.loc.gov/aba/cataloging/subject/) (this crude matching is done in the crudest way). I think we can get much, much better matching with some more work: If we create links from DBPedia topics to LCSH, we can get really good, semantic, matching.

## [David Weinberger:]({{ site.baseurl }}/about/)

I was very pleased that Dan Brickley this week [blogged](http://danbri.org/words/2011/10/11/720) about the work he's been doing with the Lab on trying to figure out how to slot Web content into established library categories: How can a system automatically figure out that, say, a TED Talk about space travel ought to be clustered with the right Library of Congress Subject Headings? This is a phenomenally difficult problem because Web content can have very little metadata. Dan, has been exploring linked open data spaces, as well as some open source semantic extraction tools, to see if it can be done. We've been working with him all summer on this---which often means watching in amazement as he does his wizardry---which has led to his reporting that he is actually making some progress on this deep problem.

## [Kim Dulin:]({{ site.baseurl }}/about/)

(Kim's away at the [Mobility Shifts](http://mobilityshifts.org) conference in NYC, showing off ShelfLife and talking about libraries, education, and other little topics.)

## [Jeff Goldenson:]({{ site.baseurl }}/about/)

No need for silly text, checkout this video, part of a pitch to the [Harvard Library Lab](http://osc.hul.harvard.edu/liblab) fund:

<div class="embed-container"><iframe title="video" width="320" height="240" src="http://player.vimeo.com/video/29977114" frameborder="0" allowfullscreen></iframe></div>

[Living Library](http://vimeo.com/29977114) from [Harvard Library Innovation Lab](http://vimeo.com/user7144664) on [Vimeo](http://vimeo.com).
