---
title: Connecting Data with the Supreme Court Database (SCDB) and Caselaw Access Project
author: kelly-fitzpatrick
---
Last week we released an update to the [Caselaw Access Project](https://case.law/) that adds case IDs and citations from the [Supreme Court Database (SCDB)](http://scdb.wustl.edu/index.php) to our U.S. Supreme Court case metadata. 

This update adds new, parallel citations to cases and makes it easy for people using data from the Caselaw Access Project to also take advantage of this rich dataset made available by the Supreme Court Database (SCDB). This represents one of the major benefits of open data - the ability to connect two datasets to enable new kinds of analysis and insight. 

The [Supreme Court Database (SCDB)](http://scdb.wustl.edu/index.php) is an outstanding project by Harold J. Spaeth, Lee Epstein, Ted Ruger, Jeffrey Segal, Andrew D. Martin and Sarah Benesh. A key resource in legal data, SCDB offers case-and-justice-specific metadata about every Supreme Court decision. Metadata made available by this resource covers a range of variables, like Majority Opinion Writer, Docket Number, Issue Area, Majority and Minority Votes, [and more](http://scdb.wustl.edu/documentation.php). To learn more about the Supreme Court Database (SCDB), their [documentation](http://scdb.wustl.edu/documentation.php) is a great place to start.

Here are some ways to work with Supreme Court Database (SCDB) data and Caselaw Access Project.

When viewing an individual case in the Caselaw Access Project, new citations and case IDs from SCDB are now visible in the citations field. [Here’s a look](https://cite.case.law/us/347/483/)! 

![Example of case citation field, showing: "Brown v. Board of Education, 347 U.S. 483, 98 L. Ed. 2d 873, 74 S. Ct. 686 (1954)".](https://lil-blog-media.s3.amazonaws.com/scdb_citation.png)

When we retrieve cases with Caselaw Access Project API, we can see the connection between our case metadata and data made available by the Supreme Court Database (SCDB). [Try this example](https://api.case.law/v1/cases/11301409/). 

![Caselaw Access Project API displaying citation metadata for case "Brown v. Board of Education, 347 U.S. 483, 98 L. Ed. 2d 873, 74 S. Ct. 686 (1954)"](https://lil-blog-media.s3.amazonaws.com/api_scdb.png)

You can retrieve cases from CAP Search and the CAP API with a Supreme Court Database (SCDB) ID. Here’s how to do it. In CAP Search, add your SCDB ID to the Citation field and run your search. [Here’s an example](https://case.law/search/#/cases?page=1&cite=SCDB%201953-069)! Want to do the same in the CAP API? Create an API call to retrieve a case by citation, and add the SCDB ID. Here’s what that looks like: [api.case.law/v1/cases/?cite=SCDB1953-069](api.case.law/v1/cases/?cite=SCDB1953-069)

We’re also making a download available of cases matched from the Supreme Court Database (SCDB) to the Caselaw Access Project as a spreadsheet: [case.law/download/scdb](api.case.law/v1/cases/?cite=SCDB1953-069)

What can we learn with this data? Here’s one example. By using data from the Caselaw Access Project and the Supreme Court Database (SCDB) data together, you can isolate opinions by particular justices, or opinions that involve particular legal issues. This can be the first step to understanding the appellate history of a Supreme Court case. This is just one of the many possibilities that are now available as part of this opportunity to learn new things with case data. 

This is our first cut at incorporating external data into the Caselaw Access Project, and there may be bugs we have not yet identified. For example, while we are able to match 28,090 out of 28,347 cases (~99%), there are a few we couldn’t match. We’ll be taking a look at those and updating the data as we go. If you find other errors, as always, reach out to [tell us about them](https://github.com/harvard-lil/capstone).

We’re excited about this update to the Caselaw Access Project and grateful for all the hard work the folks at Supreme Court Database (SCDB) have done to make and to share their data. With this update, we’re excited to see what our community learns and creates with this resource. Working on something new? [We’re looking forward to hearing about it](https://case.law/contact/). 
