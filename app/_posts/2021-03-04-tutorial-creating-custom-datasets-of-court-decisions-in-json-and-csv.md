---
title: 'Tutorial: Creating Custom Datasets of Court Decisions in JSON and CSV'
author: kelly-fitzpatrick
---
This tutorial shows how to create custom datasets of court decisions. The [Caselaw Access Project](https://case.law/) is a collection of over six million cases from Harvard Law School Library.

## Create Your Dataset 

You can design your dataset with CAP [search](https://case.law/search/) and learn more about what's included, and how to get started, with our [documentation](https://case.law/docs/site_features/search).

Let’s start with a keyword search to retrieve cases that include specific words or phrases. Here we can select the word “[whaling](https://case.law/search/#/cases?page=1&search=whaling&ordering=relevance)” to learn more about the whaling industry in the United States:

![Search results for the word "whaling", showing case previews.](https://lil-blog-media.s3.amazonaws.com/1-WLA.png)

Advanced filters can refine your search by showing cases from a selected date range, jurisdiction, court, reporter, and more. You can do this by choosing “show advanced filters” and making your selection.  

Let’s take advanced filters for a spin while creating our dataset. This time, we can update our search to only show us cases decided in [Massachusetts from 1820 to 1840](https://case.law/search/#/cases?page=1&search=whaling&decision_date_min=1820-01-01&decision_date_max=1840-01-01&jurisdiction=mass&ordering=relevance) using date and jurisdiction filters: 

![Search results for the word "whaling" for cases decided in Massachusetts between 1820 and 1840, showing case previews and advanced filters for date and jurisdiction.](https://lil-blog-media.s3.amazonaws.com/2-TKU.png)

When you make your search, you can toggle terms and filters on the left side of your screen. 

## Download

You can download search results as a dataset by selecting the download option shown on the top right. 

![Red arrow indicating download option on page of search results.](https://lil-blog-media.s3.amazonaws.com/3-S10.png)

Download will show the option to download cases as JSON or CSV, full cases or case metadata, and how many cases you would like to include. Select a format to start your download. 

Need more than 500 cases per day? You can visit the [account page](https://case.law/user/details) to request unmetered research access.

![Red arrow indicating download options JSON and CSV on page of search results.](https://lil-blog-media.s3.amazonaws.com/4.png)

After creating your dataset, you can analyze your data and learn more with resources from the [Programming Historian](https://programminghistorian.org/).

We want to hear about how you use this data and what we can do to make that easier. Have ideas and feedback to share? [Send them our way](https://case.law/contact/). We're looking forward to hearing from you.