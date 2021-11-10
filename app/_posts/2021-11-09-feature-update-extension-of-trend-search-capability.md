---
title: Feature Update | Extension of Trend Search Capability
author: andy-gu
---
Today, we are announcing an update to the Caselaw Access Project (CAP) API and [Trends tool](https://case.law/trends/) to help users better investigate changes in the law over time. These new features enable users to easily generate timelines of cases and explore patterns in case citations. We hope that they can help researchers uncover new insights about American caselaw.

Previously, the project's Historical Trends tool permitted users to graph word and phrase frequencies in cases over time. For instance, the [following graph](https://case.law/trends/?q=me%3A%20lobster,%20cal%3A%20gold) displays the frequency of the terms 'lobster' and 'gold' over time in cases in Maine and California.

<figure>
<img alt="historical trends results displayed on graph" src="https://lil-blog-media.s3.amazonaws.com/Post1Figure1.png">
<figcaption><em>Figure 1 query:</em> <code>me: lobster, cal: gold</code></figcaption>
</figure>

We have extended the Trends tool so that users can generate timelines of cases for any parameter accepted by the Cases API endpoint. As a result, users can ask broad questions about the Caselaw Access Project's dataset and quickly retrieve timelines of cases that follow the queried pattern.

For instance, the [following query](https://case.law/trends/?q=%2a%3A%20api%28cites_to%3D367%20U.S.%20643%29) presents timelines of cases which cite Mapp v. Ohio since 1961, split by jurisdiction.

<figure>
<img alt="query results displayed on graph" src="https://lil-blog-media.s3.amazonaws.com/Post1Figure2.png">
<figcaption><em>Figure 2 query:</em> <code>*: api(cites_to=367 U.S. 643)</code></figcaption>
</figure>

The breadth of available filters drastically increases the number of possibilities for a researcher to explore case data. For example, we can take the `author` parameter in the Cases API to graph the number of cases where Justice Scalia wrote a dissenting opinion with the number of cases where Justice Scalia wrote a majority opinion. By clicking into the [timeline](https://case.law/trends/?q=api%28author_type%3Dscalia%3Adissent%29,%20api%28author_type%3Dscalia%3Amajority%29), users can retrieve granular information about the qualifying cases.

<figure>
<img alt="results filtered by author, displayed on a graph" src="https://lil-blog-media.s3.amazonaws.com/Post1Figure3.png">
<figcaption><em>Figure 3 query:</em> <code>api(author_type=scalia:dissent), api(author_type=scalia:majority)</code></figcaption>
</figure>

The power of this flexible query language increases with each parameter supplied to the Trends query. If a user wanted to compare the frequency of Supreme Court cases where Justice Scalia dissented and Justice Breyer wrote the majority opinion with cases where Justice Breyer dissented and Justice Scalia wrote the majority opinion, they could draft the [following search](https://case.law/trends/?q=api%28author_type%3Dscalia%3Adissent%26author_type%3Dbreyer%3Amajority%26court%3Dus%29,%20api%28author_type%3Dscalia%3Amajority%26author_type%3Dbreyer%3Adissent%26court%3Dus%29&author_type=breyer%3Amajority&author_type=breyer%3Adissent&court=us%29,%20api%28author_type%3Dscalia%3Amajority&court=us%29):

<figure>
<img alt="graphed results of specific opinion author queries" src="https://lil-blog-media.s3.amazonaws.com/Post1Figure4.png">
<figcaption><em>Figure 4 query:</em> <code>api(author_type=scalia:dissent&author_type=breyer:majority&court=us), api(author_type=scalia:majority&author_type=breyer:dissent&court=us)</code></figcaption>
</figure>

We have also updated our underlying database to allow users to reason over the citation patterns of individual opinions, in addition to the case itself. If a user wanted to see how many times Justice Scalia specifically cited Mapp v. Ohio in an opinion, we can do so with the [following query](https://case.law/trends/?q=api%28author__cites_to_id%3D1785580%26author%3Dscalia%29,%20%20api%28author__cites_to_id%3D1785580%26author%3Dbreyer%29&author=scalia%29,%20api%28author__cites_to_id%3D1785580&author=breyer%29):

<figure>
<img alt="number of time a case was cited by a specific author over time, displayed on a graph" src="https://lil-blog-media.s3.amazonaws.com/Post1Figure5.png">
<figcaption><em>Figure 5 query:</em> <code>api(author__cites_to_id=1785580&author=scalia), api(author__cites_to_id=1785580&author=breyer)</code></figcaption>
</figure>

We believe that these features will empower researchers to quickly conduct rich explorations of American caselaw, and we are excited to see how they can expose new insights about our corpus of cases. If you have any ideas for how we can further expand on these features, please do not hesitate to reach out to us at [info@case.law](mailto:info@case.law).

*This is part of a series of posts by [Andy Gu](https://github.com/4ndygu/), a visiting researcher who joined the LIL team in summer 2021. We were inspired to build these features after recognizing the power of the Caselaw Access Project's case and citation data to analyze and explore caselaw. We hope that these features will make empirical study of caselaw both faster and more accessible for researchers.*
