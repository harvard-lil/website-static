---
title: Feature Update | Extension of Trend Search Capability
author: andy-gu
---
Today, we are announcing an update to the Caselaw Access Project (CAP) API and Trends tool to help users better investigate changes in the law over time. These new features enable users to easily generate timelines of cases and explore patterns in case citations. We hope that they can help researchers uncover new insights about American caselaw.

Previously, the project’s Historical Trends tool permitted users to graph word and phrase frequencies in cases over time. For instance, the following graph displays the frequency of the terms ‘lobster’ and ‘gold’ over time in cases in Maine and California.

![historical trends results displayed on graph](https://lil-blog-media.s3.amazonaws.com/Post1Figure1.png)
*Figure 1 Query: me: lobster, cal: gold*

We have extended the Trends tool so that users can generate timelines of cases for any parameter accepted by the Cases API endpoint. As a result, users can ask broad questions about the Caselaw Access Project’s dataset and quickly retrieve timelines of cases that follow the queried pattern.

For instance, the following query presents timelines of cases which cite Mapp v. Ohio since 1961, split by jurisdiction.

![query results displayed on graph](https://lil-blog-media.s3.amazonaws.com/Post1Figure2.png)
*Figure 2 Query: api(citesto=367 U.S. 643)*

The breadth of available filters drastically increases the number of possibilities for a researcher to explore case data. For example, we can take the `author` parameter in the Cases API to graph the number of cases where Justice Scalia wrote a dissenting opinion with the number of cases where Justice Scalia wrote a majority opinion. By clicking into the timeline, users can retrieve granular information about the qualifying cases.

![results filtered by author, displayed on a graph](https://lil-blog-media.s3.amazonaws.com/Post1Figure3.png)
*Figure 3 Query: api(authortype=scalia:dissent), api(authortype=scalia:majority)*

The power of this flexible query language increases with each parameter supplied to the Trends query. If a user wanted to compare the frequency of Supreme Court cases where Justice Scalia dissented and Justice Breyer wrote the majority opinion with cases where Justice Breyer dissented and Justice Scalia wrote the majority opinion, they could draft the following search:

![graphed results of specific opinion author queries](https://lil-blog-media.s3.amazonaws.com/Post1Figure4.png)
*Figure 4 Query: api(authortype=scalia:dissent&authortype=breyer:majority&court=us), api(authortype=scalia:majority&authortype=breyer:dissent&court=us)*

We have also updated our underlying database to allow users to reason over the citation patterns of individual opinions, in addition to the case itself. If a user wanted to see how many times Justice Scalia specifically cited Mapp v. Ohio in an opinion, we can do so with the following query:

![number of time a case was cited by a specific author over time, displayed on a graph](https://lil-blog-media.s3.amazonaws.com/Post1Figure5.png)
*Figure 5 Query: api(authorcitestoid=1785580&author=scalia), api(authorcitestoid=1785580&author=breyer)*

We believe that these features will empower researchers to quickly conduct rich explorations of American caselaw, and we are excited to see how they can expose new insights about our corpus of cases. If you have any ideas for how we can further expand on these features, please do not hesitate to reach out to us at info@case.law.


*This is part of a series of posts from [Andy Gu](https://github.com/4ndygu/), a visiting researcher who joined the LIL team in summer 2021. We were inspired to build these features after recognizing the power of the Caselaw Access Project’s case and citation data to analyze and explore caselaw. We hope that these features will make empirical study of caselaw both faster and more accessible for researchers.*

