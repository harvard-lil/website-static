---
title: Creating a Data Analysis Workspace with Voyant and the CAP API
author: kelly-fitzpatrick
---
This tutorial is an introduction to creating a data analysis workspace with [Voyant](https://voyant-tools.org/) and the [Caselaw Access Project API](https://case.law/api/). Voyant is a computational analysis tool for text corpora. 

## Import a Corpus
Let’s start by retrieving all full cases from New Mexico:

`https://api.case.law/v1/cases/?jurisdiction=nm&full_case=true`

Copy and paste that API call into the **Add Texts** box and select **Reveal**. [Here’s more](https://case.law/api/) on how to create your own CAP API call. 

## Create Stopwords
You’ve just created a corpus in Voyant! Nice 😎. Next we’re going to create [stopwords](https://voyant-tools.org/docs/#!/guide/stopwords) to minimize noise in our data.

In Voyant, hover over a section header and select the sliding bar icon to **define options for this tool**. 

![Blue sliding bar icon shown displaying text "define options for this tool".](https://lil-blog-media.s3.amazonaws.com/stopwords-EUS.png)

From the Stopwords field shown here, select **Edit List**. Scroll to the end of default stopwords, and **copy and paste this list** of common metadata fields, OCR errors, and other fragments: 

```
id
url
name
name_abbriviation 
decision_date
docket_number 
first_page
last_page
citations
volume 
reporter 
court 
jurisdiction
https
api.case.law
slug
tbe
nthe
```

Once you’re ready, **Save** and **Confirm**.

Your stopwords list is done! [Here’s more](https://voyant-tools.org/docs/#!/guide/stopwords) about creating and editing your list of stopwords. 

## Data Sandbox
[Let’s get started](https://voyant-tools.org/?corpus=2a042a20997072778f401661e5de079c&stopList=keywords-07b7ff9ce3e911ad3f3bc6d188f0d00a&panels=collocatesgraph,termsberry,trends,phrases,contexts). Voyant has [out of the box tools](https://voyant-tools.org/docs/#!/guide/tools) for analysis and visualization to try in your browser. Here are some examples!

[**Summary**](https://voyant-tools.org/docs/#!/guide/summary): "The Summary provides a simple, textual overview of the current corpus, including (as applicable for multiple documents) number of words, number of unique words, longest and shortest documents, highest and lowest vocabulary density, average number of words per sentence, most frequent words, notable peaks in frequency, and distinctive words."

[Here’s our summary](https://voyant-tools.org/?corpus=2a042a20997072778f401661e5de079c&stopList=keywords-07b7ff9ce3e911ad3f3bc6d188f0d00a&view=Summary) for New Mexico case law.

[**Termsberry**](https://voyant-tools.org/docs/#!/guide/termsberry): "The TermsBerry tool is intended to mix the power of visualizing high frequency terms with the utility of exploring how those same terms co-occur (that is, to what extend they appear in proximity with one another)."

[Here's our Termsberry](https://voyant-tools.org/?corpus=2a042a20997072778f401661e5de079c&stopList=keywords-07b7ff9ce3e911ad3f3bc6d188f0d00a&view=TermsBerry). 

[**Collocates Graph**](https://voyant-tools.org/docs/#!/guide/collocatesgraph):  "Collocates Graph represents keywords and terms that occur in close proximity as a force directed network graph."

[Here's our Collocates Graph](https://voyant-tools.org/?corpus=2a042a20997072778f401661e5de079c&stopList=keywords-07b7ff9ce3e911ad3f3bc6d188f0d00a&query=county&query=district&query=new&mode=corpus&view=CollocatesGraph). 

Today we created a data analysis workspace with Voyant and the Caselaw Access Project API. 

To see how words are used in U.S. case law over time, try [Historical Trends](https://case.law/trends/). Share what you find with us at [info@case.law](mailto:info@case.law).
