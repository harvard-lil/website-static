---
title: Data Stories and CAP API Full-Text Search
author: kelly-fitzpatrick
---
Data sets have tales to tell. In the Caselaw Access Project API, full-text search is a way to find these stories in 300+ years of U.S caselaw, from individual cases to larger themes. 

This August, John Bowers began exploring this idea in the blog post *[Telling Stories with CAP Data: The Prolific Mr. Cartwright](https://lil.law.harvard.edu/blog/2018/08/24/telling-stories-with-cap-data-the-prolific-mr-cartwright/)*, writing: “In the hands of an interested researcher with questions to ask, a few gigabytes of digitized caselaw can speak volumes to the progress of American legal history and its millions of little stories.". Here, I wanted to use the CAP API full-text search as a path to find some of these stories using one keyword: pumpkins.

The CAP API full-text search option was one way to look at the presence of pumpkins in the history of U.S. caselaw. Viewing the CAP API [Case List](https://api.case.law/v1/cases/), I filtered cases using the Full-Text Search field to encompass only items that included the term “[pumpkins](https://api.case.law/v1/cases/?search=pumpkins)”:

api.case.law/v1/cases/?search=pumpkins

This query returned 640 cases, the oldest decision dating to 1812 and the most recent in 2017. Next, I wanted to take a closer look at these cases in detail. To view the full case text, I [logged in](https://case.law/user/login/), revisited that same query for “pumpkins”, filtering the search to display full case text.

By running a full-text search, we can begin to pull out themes in Caselaw Access Project data. Of the 640 cases returned by our search that included the word “pumpkins”, the jurisdictions that produced the most published cases including this word were [Louisiana](https://api.case.law/v1/cases/?cite=&name_abbreviation=&jurisdiction=la&reporter=&decision_date_min=&decision_date_max=&docket_number=&court=&search=pumpkins&full_case=&body_format=) (30) followed by [Georgia](https://api.case.law/v1/cases/?cite=&name_abbreviation=&jurisdiction=ga&reporter=&decision_date_min=&decision_date_max=&docket_number=&court=&search=pumpkins&full_case=&body_format=) (22) and [Illinois](https://api.case.law/v1/cases/?cite=&name_abbreviation=&jurisdiction=ill&reporter=&decision_date_min=&decision_date_max=&docket_number=&court=&search=pumpkins&full_case=&body_format=) (21). 

In browsing the full cases returned by our query, some stories stand out. One such case is *[Guyer v. School Board of Alachua County](https://api.case.law/v1/cases/7471134/)*, decided outside Gainesville, Florida, in 1994. Centered around the question of whether Halloween decorations including "the depiction of witches, cauldrons, and brooms" in public schools were based on secular or religious practice and promotion of the occult, this case concluded with the opinion:

“*Witches, cauldrons, and brooms in the context of a school Halloween celebration appear to be nothing more than a mere “shadow”, if that, in the realm of establishment cause jurisprudence*."

In searching the cases available through the Caselaw Access Project API, each query can tell a story. Try your own full-text query and share it with us at [@caselawaccess](https://twitter.com/caselawaccess).
