---
title: New Feature | Flexible Citation Queries
author: andy-gu
date: 2021-11-10 01:00:00+00:00
---
Expand your ability to visualize citation practices with the latest support added to our [Trends tool](https://case.law/trends/). Trends now supports flexible queries of how cases cite other cases in addition to the other ways in which cases can be filtered. By appending the name of any acceptable filter parameter to `cites_to__{parameter name here}`, users can retrieve all cases citing to cases matching said filter. The parameter name, like before, can be any parameter accepted by the Cases API.

For instance, the [following query](https://case.law/trends/?q=api%28cites_to__author_type%3Dcardozo%3Amajority%29,%20api%28cites_to__author_type%3Dbrandeis%3Amajority%29&pa=absolute) graphs the number of cases that cite to another case where Justice Cardozo wrote the majority opinion against the number of cases where Justice Brandeis wrote the majority opinion.

<figure>
<img alt="comparison of majority opinion authors over time displayed on a graph" src="https://lil-blog-media.s3.amazonaws.com/Post2Figure1.png">
<figcaption><em>Figure 1 query:</em> <code>api(cites_to__author_type=cardozo:majority), api(cites_to__author_type=brandeis:majority)</code></figcaption>
</figure>

The `cites_to__` feature provides users the power to flexibly reason about case citation patterns. For instance, if a user were interested in how the Supreme Court of California cited authority from its own jurisdiction in comparison to authority from other jurisdictions, they could write the [following query](https://case.law/trends/?q=api%28court%3Dcal-1%26cites_to__jurisdiction__exclude%3Dcal%29,%20api%28court%3Dcal-1%26cites_to__jurisdiction%3Dcal%29&cites_to__jurisdiction__exclude=cal%29,%20api%28court%3Dcal-1&cites_to__jurisdiction=cal%29):

<figure>
<img alt="comparison of citations within jurisdiction versus outside displayed on a graph" src="https://lil-blog-media.s3.amazonaws.com/Post2Figure2.png">
<figcaption><em>Figure 2 query:</em> <code>api(court=cal-1&cites_to__jurisdiction__exclude=cal), api(court=cal-1&cites_to__jurisdiction=cal)</code></figcaption>
</figure>

This set of parameters can be integrated with any other parameters compatible with the Cases API. For instance, we can [filter the above timeline](https://case.law/trends/?q=api%28court%3Dcal-1%26cites_to__jurisdiction__exclude%3Dcal%26cites_to__search%3Dtechnology%29,%20api%28court%3Dcal-1%26cites_to__jurisdiction%3Dcal%26cites_to__search%3Dtechnology%29&cites_to__jurisdiction__exclude=cal%29,%20api%28court%3Dcal-1&cites_to__jurisdiction=cal%29) only to citations of cases that mention the term 'technology':

<figure>
<img alt="comparison of citations within jurisdiction versus outside filtered by topic displayed on a graph" src="https://lil-blog-media.s3.amazonaws.com/Post2Figure3.png">
<figcaption><em>Figure 3 query:</em> <code>api(court=cal-1&cites_to__jurisdiction__exclude=cal&cites_to__search=technology), api(court=cal-1&cites_to__jurisdiction=cal&cites_to__search=technology)</code></figcaption>
</figure>

Users may also use the parameters within the `api()` tag to query the Cases API directly. A caveat to the `cites_to__` feature is that if the number of cases that fulfill a `cites_to__` condition is greater than 20,000 cases, our system will randomly select 20,000 cases within the filtered cases to match against. For more information about all the parameters we support, please feel free to consult our Cases API documentation [here](https://case.law/docs/site_features/api#endpoint-cases).

If you're interested in exploring this data in a different way, make sure you've checked out [Cite Grid](https://case.law/exhibits/cite-grid).

*This is part of a series of posts by [Andy Gu](https://github.com/4ndygu/), a visiting researcher who joined the LIL team in summer 2021. We were inspired to build these features after recognizing the power of the Caselaw Access Project's case and citation data to analyze and explore caselaw. We hope that these features will make empirical study of caselaw both faster and more accessible for researchers.*
