---
title: Announcing the Publication of an Agentic Assessment Tool for Public Data at Risk
date: 2026-10-14T15:00:00-04:00
author:
  - akshay-mehta
project: public-data-project
tags:
  - Fellows' Research
  - Public Data
  - Tools
thumbnail: https://lil-blog-media.s3.amazonaws.com/ai-assessment-tool-figure-1.png
---

_Akshay Mehta is a PhD student in computer science at Boston University and a [fellow](/about/#akshay-mehta) with the [Public Data Project](/our-work/public-data-project/), where he built the website and background agent for the [AI Benchmarking Exercise](https://harvard-lil.github.io/ai-benchmarking-exercise/)._

---

Leaders at [OpenAI](https://www.axios.com/2025/01/23/davos-2025-ai-agents), [Nvidia](https://www.barrons.com/articles/nvidia-stock-ceo-ai-agents-8c20ddfb), and [IBM](https://www.ibm.com/think/news/year-agentic-ai-center-stage-2025) have predicted on separate occasions that 2025 would be the year of AI agent adoption. Yet as of May 2026, just 19.8% of U.S. businesses reported using AI in any business function, according to the [Census Bureau's Business Trends and Outlook Survey](https://www.census.gov/hfp/btos/data). More recently, [Microsoft has declared 2026](https://businessday.ng/technology/article/microsoft-declares-2026-the-year-of-the-agent-as-ignite-2025-unveils-ai-agent-platform/) the year of the agent. Nonetheless, these systems will be increasingly deployed, raising numerous concerns. Empirical benchmarking of their [reliability](https://internationalaisafetyreport.org/publication/international-ai-safety-report-2026) in domain-specific use cases remains thin, however, and if we are to take agentic use seriously in research environments, we must close this gap.

As the Public Data Project's Molly Hardy detailed in an [earlier blog post](/blog/2026/06/02/an-automated-data-monitoring-toolkit-and-the-ai-benchmarking-exercise-at-the-public-data-project/), our team, in partnership with [dataindex.us](http://dataindex.us), created an AI benchmarking exercise to test how well AI can assess data risk for federal datasets. We have now built the [AI Benchmarking Exercise](https://harvard-lil.github.io/ai-benchmarking-exercise/) into a web-based application, and we're excited to announce its publication!

<figure class="items-center text-center">
  <img class="w-full object-contain border border-gray rounded-xl" src="https://lil-blog-media.s3.amazonaws.com/ai-assessment-tool-figure-1.png" alt="Screenshot of AI Benchmarking Exercise home page" />
  <figcaption>AI Benchmarking Exercise home page.</figcaption>
</figure>

The exercise, which can be done in a group setting or alone, compares three approaches on the same datasets: a human researcher working alone, a human steering an LLM chatbot, and a background agent that searches the internet without human steering. All three approaches are measured against the expert risk assessments published by [dataindex.us](https://dataindex.us/collections/).

Presenting the three approaches side by side allows us to share knowledge in both directions: we can learn how human experts approach dataset evaluation; introduce experts to AI-assisted research; and experiment with automated evaluation tools, which we hope will eventually allow for monitoring and human follow-up on much larger collections.

In this post, we report progress on the third challenge of automated risk assessment, investigating how well AI agents perform a task that requires multiple kinds of domain expertise, intensive research into dataset context, and synthesis against a concrete rubric. We present how we built a background agent to answer that question, the design challenges we hit, and early results: how the agents performed, what they cost, and which did the best.

## Experimental Design

In our experiments, we define an agent as an autonomous program that completes tasks for the user using the tools and environments it can access. We took a bare-bones approach, serving a large language model through [OpenRouter](https://openrouter.ai/), with search tools and the internet as its environment to conduct research and synthesis. We ran two frontier models, GPT-6.1 Sol [(OpenAI)](https://openai.com/index/introducing-gpt-6-1-sol/) and Claude Opus 5.5 [(Anthropic)](https://www.anthropic.com/claude-opus-5-5), using their providers' native search, and four open-weight models, DeepSeek V4 Pro, DeepSeek V4 Flash [(DeepSeek)](https://www.deepseek.com/en/), GLM 5.3 [(Z.ai)](https://z.ai/blog/glm-5.3), and Kimi K3 [(Moonshot AI)](https://www.moonshot.ai/), using [Exa](https://exa.ai/?utm_source=google&utm_medium=cpc&utm_campaign=24272826463&utm_content=201221449158&utm_term=exa+ai+search&utm_id=24272826463&gad_source=1&gad_campaignid=24272826463&gbraid=0AAAAA-z0DiC-LkBemDgzSJrUDVZhGIhoK&gclid=CjwKCAjwlY3WBhANEiwApsNrLdENRZT8coj2fHsLeSqReayz9SWkyHYU28XuTmG2kgwxmBV3jCLSnhoCzZgQAvD_BwE) as the search tool and OpenRouter's fetch tool. The two frontier models ran at medium reasoning effort, and the rest ran at high since they don't offer a medium effort level.

In the research phase, the model searches the web and fetches pages to learn about its assigned dataset. In the assessment phase, a second prompt asks the model to use its research to score each category against the assessment rubric. These are the same prompts human participants paste into their chatbots, sent verbatim with no added system prompt. The key difference is that humans can follow up and steer their chatbot, while the background agent works independently. After initial experiments, we ran into two challenges.

## Challenge 1: Controlling the Model's Search Parameters

During our initial in-person experiments, where humans used our [AI Benchmarking](https://harvard-lil.github.io/ai-benchmarking-exercise/) website to assess data risk categories, participants reported that their chatbots surfaced dataindex.us as a source, which is effectively our answer key.

A simple solution might be to tell the model not to use a source, but that only works if models always follow textual constraints. Frontier models have been observed finding loopholes in evaluations, [breaking the user's constraints](https://arxiv.org/pdf/2602.21012), and "peeking" at domains and sources they were told not to access.

To address this, we used the search tools' excluded-domain settings to remove dataindex.us from the search results shown to the model and blocked the agent from fetching it directly. However, even with these guardrails in place, the DeepSeek and Anthropic background agents surfaced third-party pages that cited dataindex.us, emphasizing that blocking a domain doesn't block pages that reference it.

## Challenge 2: Reducing Cost

As a public service project, we aim to create tools that maximize output while minimizing costs, both for ourselves and for the open source software that we create. Our first version ran with no cost optimizations, at $17.58 per dataset for a single frontier model (Claude Sonnet 5) using their agent SDK. At that price, all 47 datasets across 6 models would cost about $5,000 in the worst case.

To reduce cost, we enabled prompt caching. For each turn of the agentic loop, we send all previous context, so without caching, the model pays full price to re-read everything it has already read. Caching lets providers reuse that repeated prefix at a steep discount, as little as a tenth of the normal input price depending on the provider.

Some providers cache automatically (OpenAI, Kimi K3, GLM 5.3, DeepSeek), while others (Anthropic) require explicit requests to enable caching, which explains the high cost in our initial experiment. With caching, the same Sonnet 5 model dropped from $17.58 to $3.74 per dataset.

## What We Found

Across 47 datasets with six categories each, we measured agreement through exact-match with ground truth (i.e., did the agent get the same ratings as [dataindex.us](http://dataindex.us)?) and distance to ground truth (i.e., how many rating levels off was it, on average?). All models were in a similar accuracy ballpark across both metrics, with DeepSeek V4 Pro leading by matching 55% of categories and averaging 0.52 levels from [dataindex.us](http://dataindex.us). All models stayed within one level of error on average across all datasets, with a tendency to rate riskier than the Data Index.

<figure class="items-center text-center">
  <img class="w-full object-contain" src="https://lil-blog-media.s3.amazonaws.com/ai-assessment-tool-figure-2.png" alt="Charts representing agreement, cost, and time graphs for the models' runs" />
  <figcaption>Agreement, cost, and time graphs for the models' runs.</figcaption>
</figure>

DeepSeek V4 Flash was cheapest at $0.17 per dataset; Claude Opus 5.5 was most expensive at $2.33 per dataset. Kimi K3 was slowest, averaging 7 minutes per dataset, with outliers as high as 23 minutes. More searching did not reliably buy more agreement: GPT-6.1 Sol searched the most, and DeepSeek V4 Flash fetched the most, yet neither beat 46% exact-match accuracy. In total, running six models across 47 datasets cost $225.

<figure class="items-center text-center">
  <img class="w-full object-contain" src="https://lil-blog-media.s3.amazonaws.com/ai-assessment-tool-table-1.png" alt="Table containing descriptive statistics about the models' runs" />
  <figcaption>Descriptive statistics about the models' runs.</figcaption>
</figure>

## Looking Ahead

Models are continuously improving, and agreement on a data risk task like this could improve over time with optimized search tooling. DeepSeek V4 Pro maintained the best accuracy at a fraction of the cost of frontier models, illuminating that the most popular agents aren't always best suited to the task. We plan to release further work benchmarking these types of data agents on real-world tasks and empirically comparing them to other modern approaches in academia and industry. Working at the intersections of libraries and technology, we aim to create tools that researchers, journalists, and the public at large can trust and replicate without advanced domain understanding or deep pockets. Please stay tuned for further updates on our Data Monitoring Toolkit.
