---
author:
  - molly-hardy
date: 2026-06-02T09:00:00-04:00
title: An Automated Data Monitoring Toolkit and the AI Benchmarking Exercise at the Public Data Project
project: public-data-project
thumbnail: https://lil-blog-media.s3.amazonaws.com/usgs-benchmark-000181.jpg
tags:
  - AI Research
  - Public Data
  - Tools
---

_This post is being shared on both the dataindex.us [newsletter](https://dataindex.us/newsletter/) and the Library Innovation Lab Blog._

---

"Is data changing? Is it being disappeared? How do we know? How _can_ we know?" This interrogative refrain rang through just about every conversation I had when, almost a year ago, I came to Harvard Law School Library to lead the Public Data Project. Thanks to the dataindex.us [Data Checkup](https://dataindex.us/collections/), a plan is in place to do this complicated but essential work. Through the [careful scaffolding dataindex.us has constructed](https://dataindex.us/newsletter/article/03771180-a973-4f2c-8f6b-a73ba52896b2) and the assiduous research of its staff, more than a dozen federal datasets have "health assessments" and the team continues to add to this list.

In October 2025, the [Public Data Project](https://lil.law.harvard.edu/our-work/public-data-project/) partnered with dataindex.us to develop a data monitoring toolkit that could both work at scale and be user driven. In addition to creating an automated tool that can process large numbers of datasets, we also want the user to determine which datasets they want to monitor. Let's face it, when it comes to federal data, one person's byzantine, inscrutable dataset is another person's trove of invaluable ground truth. The [anecdotes of data use](https://essentialdata.us/) collected by essentialdata.us offer varied examples of the ways people benefit from federal datasets. The range of uses are a clear indication that people need to be able to monitor the data that matters to them.

At the Public Data Project, we are creating a toolkit that will enable users to detect and monitor changes to federal datasets over time. It will enable users to select a dataset and track changes within the data itself, as well as to automate the monitoring of external sources that indicate whether the data might be changing. Indicators of change to a given dataset range from somewhat obvious sources, like major news sites, to more obscure sources, like the [U.S. Code.](https://uscode.house.gov/) At present, our tool development has produced two components.

First, [Binoc](https://harvard-lil.github.io/binoc/) is a command line tool and library to generate changelogs for datasets that don't have them.

<figure class="items-center text-center">
  <img class="w-1/2" src="https://lil-blog-media.s3.amazonaws.com/aas-broadside-383162.jpg" alt="Scanned illustration depicting a man made out of optical equipment; advertisement for L. Srisheim, optician (ca. 1840)" />
  <figcaption>Advertising card for L. Srisheim, optician. Source: <a href="https://catalog.mwa.org/vwebv/holdingsInfo?bibId=383162">American Antiquarian Society</a>.</figcaption>
</figure>

Unlike generic diffing utilities intended to describe line-level differences in plain-text content such as source code or Markdown, Binoc aims to efficiently summarize changes in real-world datasets, including file additions and deletions, row-level updates, and schema alterations. Given a series of dataset snapshots captured at different points in time, Binoc detects what changed, expresses any changes as a minimal structured diff, and produces a human-readable summary. Binoc is currently in a collaborative design phase of development, with new features being added regularly. We welcome feedback from early adopters.

We have also begun the research for a second component of the data monitoring toolkit development.

<figure class="items-center text-center">
  <img class="w-2/3" src="https://lil-blog-media.s3.amazonaws.com/usgs-benchmark-000181.jpg" alt="Photograph of cast bronze USGS benchmark" />
  <figcaption>Cast bronze benchmark. Source: <a href="https://www.usgs.gov/media/images/cast-bronze-benchmark">United States Geological Survey</a>.</figcaption>
</figure>

We have created an AI benchmarking exercise to compare and to evaluate how well AI can monitor data and assess its risk when considered next to the processes and conclusions of a careful researcher. The goals of the exercise are to:

- Test how well AI can assess various types of risk to federal datasets;
- Evaluate what baseline a popular search model would use to answer those without a custom search harness;
- Surface and reflect on the tacit knowledge necessary to perform risk assessment, including the sources needed, the steps involved, and the difficulty of defining criteria;
- Create awareness and community through an intellectually engaging activity that includes both individual research and group reflection.

We have conducted an initial test run of this exercise with a group of 10 information professionals. After introducing the participants to the dataindex.us [rubric to assess the risk level of a given dataset](https://dataindex.us/newsletter/article/03771180-a973-4f2c-8f6b-a73ba52896b2), each participant was assigned a dataset and asked to evaluate it across three of the six risk dimensions outlined in the rubric. Each participant was either assigned the first three dimensions — Historical Data Availability, Future Data Availability, and Data Quality — or the latter three — Statutory Context, Staffing and Funding, and Policy. For the first hour, participants more or less worked alone, diligently researching a subject that they lacked expertise in, but which they had clear guidelines for the kind of information they sought. Participants then opened ChatGPT, and fed it prompts that we had scripted and tailored for each dataset. First in a form that asked them specific questions and then as a group compared their results with ChatGPT's, participants reflected on their findings. Going through their three assessment dimensions, participants compared their conclusions to that of AI's, reflecting on what AI missed, what they missed, and on what parts of the rubric may have led to confusion.

This exercise gave us an early insight into the potentials and pitfalls of AI's ability to assess data risk, as well as ways in which we might tweak both the exercise and the assessment rubric. This group of participants were information professionals, not policy wonks, and we are eager to see how area specialists' experience might lead to different outcomes in this exercise. In addition, we want to experiment with prompt engineering and give participants more leeway in their interaction with AI. In the next iteration of the exercise, we will rely on the transcription of each participant's interactions with AI for analysis, rather than asking individuals to respond in a form.

What we liked most about this exercise, however, was the collective reflections not just on AI, but on public data more generally. One participant described it as an "excellent empathy-building exercise" because, through the work, both alone and as a group, participants become aware of the importance of and perils to public data. They reflected on if and how to translate their own empathetic experience to AI.
