---
title: 'Tech Tip: Sorting Cases on Analysis Fields'
author: kelly-fitzpatrick
---

Last month we
[announced](/blog/2020/08/26/introducing-cap-case-analysis/) seven
[new data fields](https://case.law/api/#analysis-fields) in the
[Caselaw Access Project](https://case.law/). Here are API calls to the
[cases endpoint](https://api.case.law/v1/cases/) that demonstrate how
to sort on these fields. Note the query strings, especially the use of
the minus sign (`-`) to reverse order.

All cases ordered by PageRank, a measure of significance, in reverse
order, so the most significant come first:

[`?ordering=-analysis.pagerank.percentile`](https://api.case.law/v1/cases/?ordering=-analysis.pagerank.percentile)

All cases sorted by word count, from longest to shortest:

[`?ordering=-analysis.word_count`](https://api.case.law/v1/cases/?ordering=-analysis.word_count)
