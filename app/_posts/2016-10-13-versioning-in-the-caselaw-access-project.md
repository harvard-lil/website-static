---
author: andy-silva
date: 2016-10-13 22:33:09+00:00
title: Versioning in the Caselaw Access Project
wordpress_id: 2464
categories:
- Free the Law
- metadata
---

We have a data management dilemma, and we hope that you &mdash; data-smart people of the world &mdash; can help us out. We need a versioning and change tracking system for around 50 million XML files, and no existing solutions seem to fit.

## About The Project

The Caselaw Access Project or CAP, previously known as Free The Law, is making all U.S. case law freely accessible online. For more information, see  [our project page]({{ site.baseurl }}/projects/caselaw-access-project), and [this New York Times article](http://www.nytimes.com/2015/10/29/us/harvard-law-library-sacrifices-a-trove-for-the-sake-of-a-free-database.html).

## Our Tracking Task

Like most digitization projects, we generate many page images. The binary image files rarely change and are not difficult to track. However, in addition to images, we create rich XML files containing descriptive/structural metadata and OCR. As we uncover mistakes in the OCR, encounter metadata anomalies, and gather new data through CAP-facilitated research projects, we will need to update these files. Tracking those changes is going to be a bit more difficult.

### The Files

We are scanning about 37,000 volumes. Each volume contains multiple pages (obviously) and multiple cases. Usually, a case takes up a few pages, but some cases are so small that several can fit on one page, so there's no direct parent/child relationship between them. Cases never span volumes.

If you're interested in checking out a case for yourself, you can grab a sample case with all the associated files [here](https://drive.google.com/file/d/0B0XytYvCOEw-YU41MWNyVEJfNlE/view?usp=sharing).

How we split these things up into files:

### For each volume:
  * One METS XML file with all volume-level metadata (~ 1 MB  avg)
  {: .lil-list}

### For each page side:
  * One lossless jp2 (~2.5 MB avg)
  * One 1-bit tiff (~60 KB avg)
  * One [ALTO v3 XML](https://en.wikipedia.org/wiki/ALTO_(XML)) file (~75 KB avg)
  {: .lil-list}

### For each case:
  * One METS XML file, which includes the text of each case body, and all case-level metadata (~75 KB avg)
  {: .lil-list}

### The Scale
  * Roughly 37k volumes, so about 37,000 volume XML files
  * Roughly 40mil page-sides, so that many jp2s, tiffs, and ALTO XML files
  * A bit fewer than 10 million Cases, so that many Case METS XML files
  {: .lil-list}

## Our key requirements:

### Data Set Versioning
Ideally this could be done at the corpus or series level (described below.) This would be useful to researchers working with larger sets of data.

### Sanitizable Change Tracking
As is the case with most change-tracking systems, when recording changes, we usually want to be able to ascertain the state of the data before the change, whether this is by recording the old version and the new version, or the delta between the two versions. However, with some change types, we do require the ability to either delete the delta or the old data state. Ideally, we would be able to do this without removing the entire change history for the file.

### File Authentication
People should be able to check if the version of the file they have is, or ever has been in our repository.

### Open Data Format
Even if the change/versioning data isn't natively stored in an easily human-readable format, it must at least be exportable into a useful open format. No strictly proprietary solutions.

### Access Control
We have to be able to control access to this data.

## Our Wish List
  * FOSS (Free Open Source Software) Based Solution
  * Diffing &mdash; allow downstream databases to fetch deltas between their current version and the latest
  * Minimal system management overhead
  * Ability to efficiently distribute change history with the data, ideally in a human-readable format
  * XML-aware change tracking, so changes can be applied to XML elements with the same identifiers and content, in different files
  * Will automatically detect replacement images
  {: .lil-list}

## What we've considered, and their disadvantages

### Git
  * Dataset is much too large to store in a single repository
  * Non-plain-text change history
  * Redacting a single file requires rewriting large portions of the tree
  {: .lil-list}

### Media Wiki
  * Not geared to handle XML data
  * Would require storing in a different format/syncing
  * Non-plain-text change history
  * Provides sanitizable change tracking but no versioning of larger data sets
  {: .lil-list}

### BitKeeper
  * Non-plain-text change history
  * Seems to not allow easy sanitization of change history
  {: .lil-list}

### Dat
  * P2P Architecture doesn't give us enough access control for the first phase of the project.
  {: .lil-list}

### Something we write ourselves
  * Reinvents the wheel, at least in part
  * Probably not as efficient as more mature tools
  {: .lil-list}

## Should the data be restructured?

Currently, the repository is fairly flat with each volume in its own directory, but no other hierarchy.

Files could be partitioned by "series." A series is a numbered sequence of volumes from a particular court, such as the Massachusetts Reporter of Decisions. The largest series so far contains approximately 1k volumes, 750k pages, and 215k cases, but they are rather inconsistently sized, with the smallest containing only one volume, and the average containing 71. There are 635 series in total.

Many data consumers will want only case files, and not per-page or per-volume files. It may make sense to store case XML files and non-case-XML files in separate repositories.

## What We Need From You

Ideas. We want to make sure that we get this right the first time. If you have insight into solving problems like this, we'd love to hear from you.

## Next Steps

Please reach out to us at {{ site.email }}.
