---
author: david-weinberger
date: 2011-08-04 19:19:23+00:00
title: LibLabapalooza
wordpress_id: 761
categories:
- talks
tags:
- liblab
---

The [Harvard Library Lab](http://osc.hul.harvard.edu/liblab), which issues grants for library innovation at the University, is holding a forum in which [all the projects](http://osc.hul.harvard.edu/liblab/prop1) get 5 mins to introduce themselves. (The names prefacing these blurbs are of the presenters, who are not always the project leads or developers.)

**NOTE: Live-blogging.** Getting things wrong. Missing points. Omitting key information. Introducing artificial choppiness. Over-emphasizing small matters. Paraphrasing badly. Not running a spellpchecker. Mangling other people's ideas and words. You are  _warned_, people.

Sebastian Diaz: Slideshow generator. Makes it easy to create slideshows out of images from image repositories. It initially is using the [VIA](http://via.lib.harvard.edu/via/) repository. You can search by keyword, select the slides, set the delay between slides, and publish it. It's intended for classroom use, or, of course, for anyone.

Sebastian Diaz: Enhanced Social Tagging for Classifiation and Current Awareness. It's currently under development. (The code is at [Github](https://github.com/berkmancenter/taghub).) It enables the merging of tag sets that use different vocabularies without having to define a dictionary ahead of time. The tool produces a filter, "and you aggregate based on that filter," renaming tags (or associating them?) based on the filter. People can make their own aggregated feed out of these multiple tag sets. It's a form of behavior-driven development.

Sebastian Diaz: Deposit@Harvard. This tool eases the process of adding open access material to open access repositories, including [Harvard DASH](http://dash.harvard.edu/). This is an issue because not all repositories have the same APIs or metadata definitions.

Abigail Bourdeaux: The Copyright and Fair Use Tool: An interactive workflow tool for those trying to determine the copyright status, and fair use status, of materials, particularly for use in the classroom.  (It has not yet begun coding.)

Abigail Bourdeaux: Online Digital Atlas Viewer. This is a viewer designed specifically for viewing historical atlases online. These atlases may have overlap from page to page, may switch scales, etc. ODAV will help to reconcile maps through [Open Layers](http://www.openlayers.org/), to overlap and scale them seamlessly. (It has not yet begun coding.)

Marc MGee and Dave Siegel: Enhanced Catalog Searching with Geospatial Technology. They're working on ways to spatially search information in the Harvard Library system. They're using [PRESTO Web Services](http://hul.harvard.edu/ois/systems/webservices/lookup-userguide/wwhelp/wwhimpl/js/html/wwhelp.htm) tools. They've taken 1,700 MARC records and sent them to [Metacarta](http://www.Metacarta.com), a geocoding company. Metacarta assigns lat/long to words it's extracted from text. They then put markers on a map to show docs relevant to those places.

Bobbi Fox: Library Application Collaboration Development Tools and Resources: How we can better coordinate library innovation at Harvard. They've reactivated the ABCD Library discussion group, which has been a "roaring success." They've also been talking with groups all across the library system about what would help. They're also coordinating with the new University CTO. From the small group discussions they've confirmed that everyone wants simple and convenient ways to keep up with the various projects, but we tend to disagree about what "simple and convenient" means :) Also, it's clear we need to work get over the cultural barriers against sharing what we're doing. Most people are not all that excited about centrally provided services such as bug tracking or source code management.

Justin Daost, Chris Erdmann: Wolbach User Experience Lab. The center for astrophysics got a [Microsoft Surface](http://www.microsoft.com/surface/en/us/default.aspx), which interacts with objects near its surface via infrared cameras. They've been working with Microsoft Research to see how it could be use in the Library. Microsoft also connected them with Andy van Dam at Brown U. where they're working on the [Garibaldi Project](http://dl.lib.brown.edu/garibaldi/about.html), a way of browsing a set of related content.  They've been working on the LADS project that lets people scroll through a timeline, zoom in on high res images (without using much memory), click on hotspots that display related metadata, etc. They are using this to give access to special collections.  Also, they created an interface to enable librarians to update it easily.

Andy Wilson: QR Codes in the Library: This project would put QR in the stacks that would load onto a mobile device research guides relevant to that area of the stacks. They will spend the fall semester gathering more usage data before going to full implementation; they want to make sure people will actually use it.

Skip Kendall and  Andrea Goethals: Zone 1 Rescue Repository:  1. Working with faculty members to look at their own personal archive (personal papers, etc.), and to think about policy recommendations.  2. The Rescue Repository is a place to put content the final destination of which is not yet known.; it's a type of staging area, for use by anyone at Harvard, with very low barriers to getting content in. People can nominate content for long-term preservation. Content can be exported into other repositories. It will be open source software.  (MIT is collaborating on this project).

Carli Spina and Kim Dulin: Library Analytics Toolkit: An open source, highly configurable dashboard for viewing library statistics. It will be configurable for individuals, departments, entire libraries, etc.  By having it in similar formats, libraries will be able to compare their data. It will be widget-based and extensible, drawing data from standard data collectors, and will be built on existing dashboards (e.g. NCSU, Brown U., and the Watson Library at the Met). It is at the wireframe stage.

Cheryl McGrath: Interactive Carrel Seating App: Currently getting a carrel requires a bunch of paperwork and staff time. People have a wide variety of requests: Near a bathroom, in sunlight, no glare at sunset, are there crumbs in it, etc. This open source app lets users browse and search, and reserve the carrel. Carrel users can also post msgs to one another. The team thinks this app may save 5 weeks of labor for a staff member per year.

Library Innovation Podcasts: That's my project: [{{ site.baseurl }}/blog/category/podcast/]({{ site.baseurl }}/blog/category/podcast/)

Chip Goines: DRS Access for Mobil Devices: Creating an API to enable mobile devices to locate items in a "page-turned digital research" object, returning info about that particular page. [[pdf](http://osc.hul.harvard.edu/sites/default/files/Mobile_DRS_Access_final.pdf)]

Kimberly Hall: The Connected Scholar: "Building ideas and exploring sources within an online culture of attribution." It lets researchers track what they're looking at/copying/jotting down, and enables collaboration in the management of information resources.  This should help scholars see where their ideas are coming from, to better understand their creative process." It should also help students develop the habit of attributing sources. Students will be able to see their research process through the tool.

Reinhard Engels: Highbrow: A textual annotation browser that displays the density of references to a text. E.g., you can plot the Biblical references in Aquinas, St. Augustine, Martin Luther, and Maimonides. (Augustine is more interested in Psalms than Aquinas was, and no one is interested in Mark.) You can zoom in on the line chart until you get to the actual text. The source text preferably should have a clear coordinate system (e.g., chapter and verse, or numbered lines of poetry). In working with Dante references, Reinhard has hit scaling issues: one set of commentators has almost 300,000 annotations.  So, he slices them by century, or by various other facets.  Or you can browse by line and see how many annotations there, and what they are. He's now working interactive annotations, enabling students and researchers to enter annotations.

Tom Dawson: [Yana](http://yana.champsnotchumps.org): "an open source template for scholarly journals to develop mobile apps." "Yana" is Sanskrit for "vehicle.") "The goal of the Yana project is to provide a light-weight, modular, open source template within which open acccess publishers can develop their own mobile applications." The aim is to make it easier for journals to do open access publishing on mobiles.

I talked about LibraryCloud, and Matt Phillips did a demo. LibraryCloud is an open library metadata server. It's coming along well.

James Burns, Jesse Shapins: [extraMUROS](http://extramuros.zeega.org/demo/). The aim is to provide a multimedia library without walls. It will bring together collections from all over and let users browse and search, curate in their own fashion, and be able to publish collections. James and Jesse show an early build of their browser that lets you quickly scan multiple collections. (Very cool.)  You can drag objects into a scratch space---either collections or individual items. It can look at the items you're choosing in order to refine your search. There's a map view that is also very cool. It even has a 3D view (No, no glasses required :) And a timeline view.


Q: Will you fund non-tech-heavy proposals?

A: Yes!

Q: Could these be sources of revenue for the Library?

A: Nope. It's open source for the greater good of libraries.
