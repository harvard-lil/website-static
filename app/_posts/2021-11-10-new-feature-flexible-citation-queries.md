---
title: New Feature | Flexible Citation Queries
author: andy-gu
---
Expand your ability to visualize citation practices with the latest support added to our Trends Tool. Trends now supports flexible queries of how cases cite other cases in addition to the other ways in which cases can be filtered. By appending the name of any acceptable filter parameter to `cites_to__{parameter name here}`, users can retrieve all cases citing to cases matching said filter. The parameter name, like before, can be any parameter accepted by the Cases API. 

For instance, the following query graphs the number of cases that cite to another case where Justice Cardozo wrote the majority opinion against the number of cases where Justice Brandeis wrote the majority opinion.

![comparison_of_majority_opinion_authors_over_time_displayed_on_a_graph](https://lil-blog-media.s3.amazonaws.com/Post2Figure1.png)
*Figure 1 Query: api(citestoauthortype=cardozo:majority), api(citestoauthortype=brandeis:majority)*

The `cites_to__` feature provides users the power to flexibly reason about case citation patterns. For instance, if a user were interested in how the Supreme Court of California cited authority from its own jurisdiction in comparison to authority from other jurisdictions, they could write the following query:

![comparison_of_citations_within_jurisdiction_versus_outside_displayed_on_a_graph](https://lil-blog-media.s3.amazonaws.com/Post2Figure2.png)
*Figure 2 Query: api(court=cal-1&citestojurisdictionexclude=cal), api(court=cal-1&citestojurisdiction=cal)*

This set of parameters can be integrated with any other parameters compatible with the Cases API. For instance, we can filter the above timeline only to citations of cases that mention the term 'technology':  

![comparison_of_citations_within_jurisdiction_versus_outside_filtered_by_topic_displayed_on_a_graph](https://lil-blog-media.s3.amazonaws.com/Post2Figure3.png)
*Figure 3 Query: api(court=cal-1&citestojurisdictionexclude=cal&citestosearch=technology), api(court=cal-1&citestojurisdiction=cal&citestosearch=technology)*

Users may also use the parameters within the `api()` tag to query the Cases API directly. A caveat to the `cites_to__` feature is that if the number of cases that fulfill a `cites_to__` condition is greater than 20,000 cases, our system will randomly select 20,000 cases within the filtered cases to match against. For more information about all the parameters we support, please feel free to consult our Cases API documentation [here](https://case.law/docs/site_features/api#endpoint-cases). 

If you’re interested in exploring this data in a different way, make sure you’ve checked out [Cite Grid](https://case.law/exhibits/cite-grid).


*This is part of a series of posts from [Andy Gu](https://github.com/4ndygu/), a visiting researcher who joined the LIL team in summer 2021. We were inspired to build these features after recognizing the power of the Caselaw Access Project’s case and citation data to analyze and explore caselaw. We hope that these features will make empirical study of caselaw both faster and more accessible for researchers.*

