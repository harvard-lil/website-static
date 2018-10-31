---
title: Witchcraft in U.S. Caselaw
author: anastasia-aizman
---
![Witchcraft in Law](https://lil-blog-media.s3.amazonaws.com/Screen_Shot_2018-10-31_at_9.51.54_AM.png) 

Happy Halloween!

This Halloween is a special one at LIL, since we’re celebrating the release of the [Caselaw Access Project](https://case.law/) and 360 years of digitized U.S. caselaw.

For a small project using our [full text search functionality](https://case.law/api/#examples), we mapped out the usage of the term “witchcraft” in United States caselaw. 

Here is the result: [https://case.law/gallery/witchcraft](https://case.law/gallery/witchcraft)

(For those unfamiliar with the sordid history of witchcraft in the United States, the [Wikipedia entry for Salem Witch Trials is a good primer](https://en.wikipedia.org/wiki/Salem_witch_trials).)

Below are some steps used to get this data.

Since our metadata is available to anyone without limitations or a login, you can [see the result of our search here](https://api.case.law/v1/cases/?search=witchcraft).

As you can see, there are 503 cases in total that include the word “witchcraft”. 

In order to get the context of the word (in our visualization, we display small excerpts), we need to create an account.

First, [sign up for an API key](https://case.law/user/register/).

Once you’ve created an account and logged in, you should head over to our API documentation for a [primer on authentication](https://case.law/api/#authentication).

Now, you can download the cases using one of several means (but be careful! Each time you download the cases, whether in the browser, or elsewhere, your daily case limit of 500 gets decremented).

You can download cases:
1. in your browser by going to this link: [read cases in the browser](https://api.case.law/v1/cases/?search=witchcraft&full_case=true)
2. download the files locally using the terminal ([see an example of a curl request here](https://case.law/api/#authentication))
3. you can get the cases using your favorite programming language, or
4. you can check out our [cap-examples repository](https://github.com/harvard-lil/cap-examples) and set up an examples environment. 
Once it’s set up, you can [run the code]( https://github.com/harvard-lil/cap-examples/blob/master/api_wordsearch/wordsearch.py) used to make this visualization.


Do you have any questions, concerns, ideas? We would love to hear from you!
Please write to the Caselaw Access Project team at [info@case.law](info@case.law).



