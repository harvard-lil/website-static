---
title: View CAP Cases by PageRank, Cardinality, and more.
author: kelly-fitzpatrick
---
Last week we [announced case analysis](https://lil.law.harvard.edu/blog/2020/08/26/introducing-cap-case-analysis/) as part of the Caslaw Access Project. Today we’re sharing that you can now view cases based on case analysis fields with the CAP API.
 
This update lets you order cases based on qualities about a case using [seven new fields](https://case.law/api/#analysis-fields), like PageRank that shows the significance of a case based on citation, Cardinality which shows the number of unique words in a case, [and more](https://case.law/api/#analysis-fields). This can help us learn new things, like seeing whether cases decided 100 years ago are longer or shorter than they are today, or finding patterns in the most significant cases based on citations in our [citation graph](https://case.law/download/citation_graph/). Here’s an example! 
 
Let’s say you’re using the CAP API to return cases ordered from most to least significant based on citation using the PageRank field. You can create an API call to return this data in your browser, by placing the this text in your address bar: 
 
`https://api.case.law/v1/cases/?ordering=-analysis.pagerank.percentile`
 
What cases can you see? The first case returned is [Anders v. California](https://cite.case.law/us/386/738/), shown as the most significant case by citation, followed by six million more cases ordered by most (to least) significant. 
 
Let’s try another example to see cases ordered from longest to shortest:
 
`https://api.case.law/v1/cases/?ordering=-analysis.word_count`
 
Here we can see that the longest case in our collection is [United States v. Philip Morris USA, Inc.](https://cite.case.law/f-supp-2d/449/1/) at 496,797 words (or around 1000 pages) of case law! 

You can create your own API calls using case analysis fields. Here’s [our documentation](https://case.law/api/) on how to get started. 
 
We want to hear about what you’re learning with CAP data! Have you learned something new with case analysis? [Tell us about it](https://case.law/contact/)!