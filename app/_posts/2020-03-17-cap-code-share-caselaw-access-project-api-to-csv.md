---
title: "CAP Code Share: Caselaw Access Project API to CSV"
author: kelly-fitzpatrick
---
Today we’re going to learn how to write case data from the [Caselaw Access Project API](https://case.law/api/) to CSV. This post shows work from Jack Cushman, Senior Developer at the Harvard Library Innovation Lab. 

The [Caselaw Access Project](https://case.law/) makes 6.7 million individual cases freely available from Harvard Law School Library. With this code, we can create a script to get case data from the Caselaw Access Project API, and write that data to a spreadsheet with Python. [This demo](https://github.com/harvard-lil/cap-examples/blob/master/api_to_csv/api_to_csv.py) is made available as part of the [CAP Examples](https://github.com/harvard-lil/cap-examples) repository on Github. [Let’s get started](https://github.com/harvard-lil/cap-examples/blob/master/api_to_csv/api_to_csv.py)! 

How does this script find the data it’s looking for? This happens with an API call using the CAP API, and retrieves all cases that include the words “first amendment”: [api.case.law/v1/cases/?search=first+amendment](https://api.case.law/v1/cases/?search=first+amendment). Want to create your own CAP API call? [Here’s how](https://case.law/api/). 

The Caselaw Access Project has structured, case-level metadata. You can query parts of that data using the CAP API with endpoints, like “court” or “jurisdiction”. [Here’s a rundown](https://case.law/api/#endpoints) of the endpoints we have. This demo gets data using these endpoints to write case data to a CSV file:  'id', 'frontend_url', 'name', 'name_abbreviation', 'citation', 'decision_date', 'jurisdiction'. You can adapt this code, and [choose your own endpoints](https://case.law/api/#endpoints). 

To run this script, find your CAP API key by [creating an account](https://case.law/user/register/) or [logging in](https://case.law/user/login/), and viewing your [user details](https://case.law/user/details).

This code is part of the [CAP Examples](https://github.com/harvard-lil/cap-examples) repository on Github, a place to find and share code for working with data from the Caselaw Access Project. Do you have code to share? We want to see this resource grow. 

Are you creating new things with code or data made available by the Caselaw Access Project? Send it our way. [Our inbox is always open](https://case.law/contact/). 
