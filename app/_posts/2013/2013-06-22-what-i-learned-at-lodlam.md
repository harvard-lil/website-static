---
author: david-weinberger
date: 2013-06-22 20:06:33+00:00
title: What I learned at LODLAM
wordpress_id: 1728
categories:
- interop
- linked data
---

On Wednesday and Thursday I went to the second [LODLAM](http://www.lodlam.net) (linked open data for libraries, archives, and museums) unconference, in Montreal. I'd attended the first one in San Francisco two years ago, and this one was almost as exciting---"almost" because the first one had more of a new car smell to it. This is a sign of progress and by no means is a complaint. It's a great conference.

But, because it was an unconference with up to eight simultaneous sessions, there was no possibility of any single human being getting a full overview. Instead, here are some overall impressions based upon my particular path through the event.

* Serious progress is being made. E.g., Cornell announced it will be switching to a full LOD library implementation in the Fall. There are lots of great projects and initiatives already underway.

* Some very competent tools have been developed for converting to LOD and for managing LOD implementations. The development of tools is obviously crucial.

* There isn't obvious agreement about the standard ways of doing most things. There's innovation, re-invention, and lots of lively discussion.

* Some of the most interesting and controversial discussions were about whether libraries are being too library-centric and not web-centric enough. I find this hugely complex and don't pretend to understand all the issues. (Also, I find myself---perhaps unreasonably---flashing back to the Standards Wars in the late 1980s.) Anyway, the argument crystallized to some degree around [BIBFRAME](http://bibframe.org), the Library of Congress' initiative to replace and surpass [MARC](http://en.wikipedia.org/wiki/MARC_standards). The criticism raised in a couple of sessions was that Bibframe (I find the all caps to be too shouty) represents how libraries think about data, and not how the Web thinks, so that if Bibframe gets the bib data right for libraries, Web apps may have trouble making sense of it. For example, Bibframe is creating its own vocabulary for talking about properties that other Web standards already have names for. The argument is that if you want Bibframe to make bib data widely available, it should use those other vocabularies (or, more precisely, namespaces). Kevin Ford, who leads the Bibframe initiative, responds that you can always map other vocabs onto Bibframe's, and while Richard Wallis of OCLC is enthusiastic about the very webby [Schema.org](http://schema.org) vocabulary for bib data, he believes that Bibframe definitely has a place in the ecosystem. Corey Harper and Debra Riley-Huff, on the other hand, gave strong voice to the cultural differences. (If you want to delve into the mapping question, explore the argument about whether Bibframe's annotation framework maps to Open Annotation.)

I should add that although there were some strong disagreements about this at LODLAM, the participants seem to be genuinely respectful.

* LOD remains really really hard. It is not a natural way of thinking about things. Of course, neither are old-fashioned database schemas, but schemas map better to a familiar forms-based view of the world: you fill in a form and you get a record. Linked data doesn't even think in terms of records. Even with the new generation of tools, linked data is hard.

* LOD is the future for library, archive, and museum data.

* * *

Here's a list of brief video interviews I did at LODLAM:

* [Kevin Ford gives a BIBFRAME update](http://www.youtube.com/watch?v=yXKY822e8yQ)

* [Sean Thomas and Sands Fish on getting Open Access research into the hands of people who need it](http://www.youtube.com/watch?v=xkyE2qcOx_E)

* [Debra Riley-Huff on whether library standards are webby enough](http://www.youtube.com/watch?v=u59i-f5yOZ8)

* [Richard Wallis on Schema.org](http://www.youtube.com/watch?v=es0jcS_caEM)

* [Corey Harper on rethinking Linked Open Data from the user's point of view](http://www.youtube.com/watch?v=iPlGq3Dg_Co)

* [Kitio Fofack on why linked data](http://www.youtube.com/watch?v=Mq6rL5qRaUo)

* [Richard Urban on building a linked data pattern library](http://www.youtube.com/watch?v=SFkcEvHrY2c)
