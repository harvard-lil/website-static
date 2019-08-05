---
title: "Tutorial: Return Cases from 100 Years Ago Today with the CAP API"
author: kelly-fitzpatrick
---
The [Caselaw Access Project API](https://case.law/api/) offers a way to view the corpus of U.S. case law. This tutorial will review how to **run a CAP API call to return all cases decided 100 years ago today in your command line**.

The Caselaw Access Project API makes 40 million pages of U.S. case law available in machine-readable format, digitized from the collections of the Harvard Law School Library. 

## Create Your API Call 
Let’s start by building our call to the CAP API using the parameters `decision_date_min` and `decision_date_max`. Adding these parameters will only return data for cases decided between these two dates.

* Open a text editor and paste:

{% highlight shell %}
curl "https://api.case.law/v1/cases/?decision_date_min=(year)-(month)-(day)&decision_date_max=(year)-(month)-(day)"
{% endhighlight %}

* Update `(year)-(month)-(day)` with today’s date in this format and update 2019 to 1919. Once you’re set, it should look something like this:

{% highlight shell %}
curl "https://api.case.law/v1/cases/?decision_date_min=1919-08-05&decision_date_max=1919-08-05"
{% endhighlight %}

## Use Your API Call
Next, we’ll continue this tutorial in MacOS using Terminal.

* Open Applications and Select Terminal

* In the Terminal command line, copy and paste the API call from your text editor and press Enter.

You did it! The CAP API should return metadata for all cases decided one hundred years ago today. 

Now, what do the content of those cases look like? Time to add a new piece to the mix.

* To view the full text of all cases returned, add `&full_case=true` to the end of your original API call. It should look like this:

{% highlight shell %}
curl "https://api.case.law/v1/cases/?decision_date_min=1919-08-05&decision_date_max=1919-08-05&full_case=true"
{% endhighlight %}

* Run your new API call in Terminal.

You’ve finished this tutorial and run a CAP API call using `decision_date_min` and `decision_date_max`. Well done!

## More Ways to View Data
Before closing, let’s look at more ways to view this same data:

Let’s run that same CAP API call in your browser (this time, without the curl and quotation marks). It should look like this:

[https://api.case.law/v1/cases/?decision_date_min=1919-08-05&decision_date_max=1919-08-05&full_case=true](https://api.case.law/v1/cases/?decision_date_min=1919-08-05&decision_date_max=1919-08-05&full_case=true)

Now you can view the same data that was returned by your original API call in your browser. Learn new ways to refine and expand your CAP API call with our [API Docs](https://case.law/api/). We can also retrieve this data for a more human readable experience with [CAP Search](https://case.law/search/#/cases?page=1&decision_date_min=1919-08-05&decision_date_max=1919-08-05).

With the CAP API, we can retrieve cases from across 360 years of U.S legal history and develop new interfaces to do that. This tutorial shared just one place to start.

![](https://lil-blog-media.s3.amazonaws.com/curl1.png)
