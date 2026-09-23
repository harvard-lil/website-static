---
title: Public Data, AI, and the Future of the Catalog
date: 2026-09-22T10:00:00-04:00
author:
  - molly-hardy
project: public-data-project
tags:
  - Library Principles
  - Public Data
thumbnail: https://lil-blog-media.s3.amazonaws.com/catbriar-and-huckleberry.webp
---

<figure class="items-center text-center">
  <img class="w-full object-contain" src="https://lil-blog-media.s3.amazonaws.com/library-bureau-catalog.webp" alt="Illustrations of a library card catalog and two cabinets with drawers sold by the Library Bureau" />
  <figcaption>The catalog of yesteryear. Source: <a href="https://archive.org/details/library_bureau_catalog"><i>Classified Illustrated Catalog of the Library Bureau</i></a> (1899).</figcaption>
</figure>

_The following is taken from remarks delivered on the "AI and Government Data" panel at the [AI for Library, Archives, and Museums 2026 conference](https://ai4lam.org/fantastic-futures/)._

---

I begin by addressing how we might define public data. It is, in short, data whose value is not determined by the marketplace, by its commodification, or by what Marx would call its "use value." Public data may function in all of these ways, but its value is defined by something more abstract and less quantifiable. It serves civil society, and without it, an intrinsic public good—the health and safety of a polity, the protection of an environment, the advancement of creative and critical thinking—would be lost.

As stewards of the past and curators of the present who work in service of the future, we in libraries, archives, and museums have long turned our attention to cultural heritage—both in its material and digital forms—for their value as public goods. In the United States, we have, since the first Census in 1790, more or less "Render[ed] therefore unto Caesar" the production and dissemination of information produced by the government for the governed.

Since 1895, civil society in the form of libraries have made this information accessible through the [Federal Depository Library Program](https://www.gpo.gov/how-to-work-with-us/agency/services-for-agencies/federal-depository-library-program), which self-describes as the "nation's link between the American public and its government." In the digital world, with uneven success, this distribution network has been replicated online through the aggregator [Data.gov](http://data.gov).

As James Jacobs and Jim Jacobs point out in their recent comprehensive study [_Preserving Government Information: Past, Present, and Future_](https://escholarship.org/uc/item/77x892w7), "Although there is a general consensus that the government has an obligation to preserve its own information … the laws that affect preservation of born-digital Public Information are outdated and inadequate." The last year and a half have done more to reveal the vulnerability — the precarity even — of public data as vital infrastructure than any other time in our country's history.

> We are among the collective effort to change the cultural climate around government data so that it is understood as a resource held in the public trust.

In response to this moment, Harvard Law School Library's [Public Data Project](https://lil.law.harvard.edu/our-work/public-data-project/) began with copying 311,000 datasets from Data.gov between November 2024 and January 2025. We now build cutting-edge tools and interfaces that enable access, discovery, and monitoring of large public datasets. We are among the collective effort to change the cultural climate around government data so that it is understood as a resource held in the public trust. We are grateful for the support of the MacArthur Foundation and the Rockefeller Brothers Fund, without whom we could not do this work. The opinions and views shared here do not necessarily state or reflect those of our contributors.

As part of that collective effort, in August of 2025, [we copied 710 TB of public domain data from the Smithsonian Institution](https://lil.law.harvard.edu/blog/2025/09/18/expanding-our-public-data-project-to-include-smithsonian-collections-data/) — the complete open access portion of the Smithsonian's collections. We have updated it weekly since then, and now have approximately 828 terabytes (9.1 million files) sourced from more than 20 libraries, museums, and research centers across the Smithsonian. It is this work that I will focus on today.

We have chosen [Source Cooperative as the ideal repository](https://source.coop/harvard-lil/smithsonian-open-access/README.md) for a number of reasons, not all of which I will get into right now. I will just say that because it is built on cloud object storage, the repository supports direct publication of massive datasets, making it easy for us to add, update, and share data. Source also provides a handy user interface for browsing and previewing, along with an API for fast programmatic access.

At present, this repository mirrors the directory structure used by the Smithsonian, but navigating it has proven a challenge. More than 17 million metadata records, constituting over 47 GB, are included, but associating them with the images in this collection, let alone querying them for a particular subject, is difficult. We have therefore generated [lightweight Parquet search catalogs](https://source.coop/harvard-lil/smithsonian-open-access#search) for this collection, which can be found under the [`search` directory](https://source.coop/harvard-lil/smithsonian-open-access/search).

<figure class="items-center text-center">
  <img class="w-full object-contain border border-gray" src="https://lil-blog-media.s3.amazonaws.com/smithsonian-open-access-archive-statistics.webp">
  <figcaption>Usage statistics for the <a href="https://source.coop/harvard-lil/smithsonian-open-access">Smithsonian Open Access Archive</a> during a recent 90-day period.</figcaption>
</figure>

And it's being used! Early analytics suggest a considerable interest in this largely unmediated data as data. But for us, these 17 million metadata records and their accompanying images are the tip of the iceberg — for two reasons.

First, we position this work among the larger movement to call attention to the importance of federal data as vital public infrastructure, for which allies such as [America's Essential Data](https://essentialdata.us/) advocate by highlighting "how everyday Americans are benefiting from specific federal datasets." As [Fran Berman recently wrote](https://theconversation.com/essential-digital-technologies-are-critical-infrastructure-they-are-not-always-built-and-managed-that-way-288580) in _The Conversation_, "society … need[s] to change both its expectations about digital critical infrastructure and its actions — the way the public and private sectors create and regulate these services and systems and the way the public uses them — to better protect the people who depend on them."

Not only do we position the Public Data Project among such efforts, but — and this gets to the second reason for our work — we position the Smithsonian's public data as an excellent ambassador for this mission. Want to get people to care about public data? Lure them in with the cool stuff … like this ceremonial Chinese wine vessel from the Zhou period at the National Museum of Asian Art, which can be [viewed as a 3D model here](https://source-cooperative.github.io/model-viewer/?url=https%3A%2F%2Fdata.source.coop%2Fharvard-lil%2Fsmithsonian-open-access%2F3d%2Fd8c62f94-4ebc-11ea-b77f-2e728ce88125%2Ff1930_54-combined-100K-2048_std.glb).

<figure class="items-center text-center">
  <iframe class="w-full" src="https://source-cooperative.github.io/model-viewer/?url=https%3A%2F%2Fdata.source.coop%2Fharvard-lil%2Fsmithsonian-open-access%2F3d%2Fd8c62f94-4ebc-11ea-b77f-2e728ce88125%2Ff1930_54-combined-100K-2048_std.glb" title="Zhou period ceremonial wine container (fangyi) from the National Museum of Asian Art" allow="fullscreen" loading="lazy"></iframe>
  <figcaption>Zhou period ceremonial wine container (fangyi) from the National Museum of Asian Art. Source: <a href="https://source.coop/harvard-lil/smithsonian-open-access/3d/d8c62f94-4ebc-11ea-b77f-2e728ce88125/f1930_54-combined-100K-2048_std.glb">Smithsonian Open Access Archive</a>.</figcaption>
</figure>

To enhance discovery and monitoring of large government datasets through the building of interfaces and tools, we need collaborators. We could not be happier to have begun, this summer, an intensive collaboration with [Kyle Deeds](https://lil.law.harvard.edu/about/#kyle-deeds), [Ben Lee](https://lil.law.harvard.edu/about/#benjamin-charles-germain-lee), and their graduate students [Akshay Mehta](https://lil.law.harvard.edu/about/#akshay-mehta) and [Ying-Hsiang Huang](https://lil.law.harvard.edu/about/#ying-hsiang-huang).

As a collaborative, we maintain that the heterogeneous and interconnected nature of government data requires new models of search, and this group's work with vision language and frontier models is leading the way to meet these needs. Together, we are building not just tools, but also a community of experts who will lead the pedagogical and technological interventions necessary to make a real difference in the cultural and political landscape.

As a team of engineers, librarians, and scholars nested in Harvard Law School Library's [Library Innovation Lab](https://lil.law.harvard.edu/), the Public Data Project, in concert with our collaborators, seek — as our mission states — "to grow knowledge and community by bringing library principles to technological frontiers." In this instance, we see our work with the Smithsonian public domain data as an opportunity to think differently about library, archive, and museum (LAM) catalogs as we have known them.

The word "catalog" is Greek, combining the word _kata_, which means "completely," and _legein_ — "to say, count, or gather." We can understand LAM catalogs as counting or gathering completely, or at least aspiring to gather completely. Objects in collections — paintings, incunabula, newspapers — are the organizing principles by which catalogs are composed. A record is created for each item and then the records are "gathered" or aggregated into a list, an index drawer, an OPAC. And in the world we have known, the institution that holds the object, or its digital instantiation, creates that record and maintains that collective catalog.

<figure class="items-center text-center">
  <img class="w-full aspect-4/3 object-cover object-top" src="https://lil-blog-media.s3.amazonaws.com/catbriar-and-huckleberry.webp" alt="Catbriar and huckleberry in the author's backyard" />
  <figcaption>Catbriar and huckleberry in the author's backyard. Photograph by Nick Anderson.</figcaption>
</figure>

But this story is changing. In our networked and media-saturated world, commentary, both expert and amateur, happens beyond the walls of the brick and mortar institutions that house the objects. I am thinking here of [the work of Michelle Caswell](https://michellecaswell.org/research) and the idea of "community archiving" because, I want to posit, such "bottom up" descriptions offer us a challenge — and an opportunity — to reimagine catalogs.

> We want to engage social media as sites of interpretation and cultural mediation.

Object-based records could still rule the day, but the sources for the accompanying metadata might become varied, so that institutionally created metadata sits alongside socially created metadata, what [George Oates](https://abitofgeorge.com/) simply refers to as "social metadata." We want to engage social media (and other sources created beyond the confines of the institution) as sites of interpretation and cultural mediation.

And in so doing, we want to enhance our understanding of what constitutes a collection, so that we are layering on two large datasets that pertain to the Smithsonian Institution collection and are created by the public.

"Social metadata" becomes part of how we describe and interoperate a collection. We begin with the [Smithsonian Transcription Center](https://transcription.si.edu/), which hosts crowdsourced transcriptions of digitized Smithsonian materials. Established in 2013, the center supports volunteer transcription projects across the Smithsonian's museums, libraries, archives, and research centers. Between July 7 and August 10, 2026, the Public Data Project collected the source files, transcription files, PDFs, metadata, and project manifests associated with 14,167 transcription projects — 854 GB of data in total.

> The public cannot rely on industry platforms to see and study social media. The lack of ability to capture social media is one that permeates the digital archiving world.

In addition, we currently have two sources for social media data. First, the [Smithsonian Flickr Data Lifeboat](https://smithsonian-flickr.s3.us-east-1.amazonaws.com/README.html), which includes 3,308 photographs; 7.8 GB of data; 5,768 comments; 10,954 tags; and contributions from 4,710 users. We are also an early beta tester for Common Data, a service that will provide an easy way to see and study social media in real time. This platform and data trove are necessary because the public cannot rely on social media industry platforms to help study it.

The lack of ability to capture social media is one that permeates the digital archiving world. If Common Data is transforming that, we believe that this Smithsonian data project is well-positioned to showcase an early adoption of social media archives to enhance government data collections. Common Data is currently developing a system for collecting and preserving social media data from platforms including Bluesky, Telegram, TikTok, and YouTube as well as podcasts, and soon it will include data from Instagram. In the coming months, we will be calling for testers of this new interface and the fine-tuned LLMs and vision-language models underlying it to make connections.

The tech industry likes to talk about how AI enables us to know or capture all or total knowledge, and we might question that assertion as a receding horizon at best, a shibboleth at worst. But, when it comes to catalogs, I'd posit that it behooves us to strive for a deeper record, to "list completely" as the etymology of the word itself demands.

By supporting multi-modal search across different collections, institutions, and types of data — visual, temporal, geospatial, social — we hope to enable search across paradigms as well, different understandings of our past and present, different populations and experiences, and to surface sublimated and hidden connections.
