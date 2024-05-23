---
title: Announcing the COLD French Law Dataset
guest-author: The Library Innovation Lab Team
tags:
- ai
- research
---
![COLD French Law banner](https://lil-blog-media.s3.amazonaws.com/COLDfrenchlaw.webp)

There is a new addition to the [Collaborative Open Legal Data collection](https://huggingface.co/harvard-lil): a set of over 800,000 articles extracted from the [LEGI dataset](https://www.data.gouv.fr/fr/datasets/legi-codes-lois-et-reglements-consolides/), one of France’s official open law repositories, that were programmatically identified as “currently applicable French law” by our [pipeline](https://github.com/harvard-lil/cold-french-law-pipeline).

This dataset—formatted into a single CSV file and [openly available on Hugging Face](https://huggingface.co/datasets/harvard-lil/cold-french-law)—contains original texts from the LEGI dataset as well as machine-generated French to English translations thanks to the participation of the CoCounsel team at [Casetext, part of Thomson Reuters](https://www.thomsonreuters.com/en/artificial-intelligence.html).

COLD French Law was initially compiled to be used in a forthcoming experiment at the Lab. We are releasing it broadly today as part of our commitment to open knowledge. We see this dataset as a contribution to the quickly expanding field of legal AI, and hope it will help researchers, builders, and tinkerers of all kinds in their endeavors.

---
## The Process
As part of these release notes we would like to share details about the process used to translate the articles contained in the dataset.

In a field where the volume of data is so important, it’s useful to understand the plausibility of working with a dataset in one language with an LLM trained in another. This process revealed some techniques for not only reliably translating a large set of documents, but also for doing so efficiently. We do not plan to maintain this dataset outside of the needs of our experiments, and are therefore sharing the details of the pipeline so that others may update the data in the future if needed.

Over the course of two months the CoCounsel team ran all ~800,000 articles through a translation pipeline that took each individual entry and translated it from its original French into English using OpenAI’s GPT-4 large language model. One hurdle was the variety of important metadata for each entry that was also in French, and a desire to retain each of the articles in its fullest form.

Via GPT-4’s function calling feature, the pipeline was able to translate the full entries, and allowed for each relevant column of an entry to be translated in a single call (or couple of calls in the limited cases where entries were longer than 2,500 tokens.) This saved weeks of processing. Additionally, this technique outputs individual JSON files for each of the law articles.

With this approach, we were able to run the pipeline for just a few hours each night, and the structure of the dataset remained intact.

Over the course of this process adjustments were made to the prompt based on the expertise of the CoCounsel team and feedback provided by Timothée Charmeil, an [LL.M. candidate at HLS](https://hls.harvard.edu/graduate-program/ll-m-program/), who quality tested samples of the initial outputs.

The final prompt that was engineered by our colleagues is shared below.

## The Prompt

<script src="https://gist.github.com/clare-stanton/441d8183d989c88e42def1fb2c392a3f.js"></script>

---
## Links
[COLD French Law dataset on Hugging Face](https://huggingface.co/datasets/harvard-lil/cold-french-law)

[COLD French Law CLI pipeline on Github](https://github.com/harvard-lil/cold-french-law-pipeline)
[Other COLD data ](https://huggingface.co/datasets/harvard-lil/cold-cases)
