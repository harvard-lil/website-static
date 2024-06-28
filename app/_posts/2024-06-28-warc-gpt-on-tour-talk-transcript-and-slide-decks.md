---
title: "WARC-GPT \u201Con tour\u201D: Talk transcript and slide decks"
author: matteo-cargnelutti
excerpt_separator: <!--more-->
tags:
- AI Research
---
<img src="https://lil-blog-media.s3.amazonaws.com/warc-gpt-banner.png" alt=""/>

Over the past couple of months, my colleague Kristi Mukk and I had the opportunity to talk about [WARC-GPT](https://lil.law.harvard.edu/blog/2024/02/12/warc-gpt-an-open-source-tool-for-exploring-web-archives-with-ai/) and the concept of Librarianship of AI to the greater [GLAM](https://en.wikipedia.org/wiki/GLAM_(cultural_heritage)) community: 

* In March, at an event organized by Harvard Library about [AI at Harvard Library](https://libcal.library.harvard.edu/event/12113771).
* In April, at the [2024 Web Archiving Conference of the International Internet Preservation Consortium ](https://netpreserve.org/ga2024/)(IIPC), which was held in Paris.
* In May, at a community call organized by [AI4LAM](https://github.com/AI4LAM).
* In June, at an event organized by the [Web Archiving section of the Society of American Archivists](https://connect.archivists.org/discussion/discussion-web-archiving-and-ai-1).

We are grateful for the interest the community showed for our work, and for all the great questions, suggestions and pieces of feedback we’ve received along the way. With this blog post, we would like to share a version of our slide deck and talk outline, as a way to keep the conversation going.

 <!--more-->

You can view WARC-GPT’s source code and case study at [https://github.com/harvard-lil/warc-gpt](https://github.com/harvard-lil/warc-gpt). 

This project is part of our [ongoing series exploring how artificial intelligence changes our relationship to knowledge](https://lil.law.harvard.edu/about/ai).

---
## Video
Excerpt from the talk we gave at an event organized by the [Web Archiving section of the Society of American Archivists](https://connect.archivists.org/discussion/discussion-web-archiving-and-ai-1) on June 14th, 2024. 

<div class="embed-container">
  <iframe src="https://vimeo.com/964817363"
          width="640"
          height="480"
          frameborder="0"
          webkitallowfullscreen
          mozallowfullscreen
          allowfullscreen>
  </iframe>
</div>

---
## Slide Deck
<iframe src="https://docs.google.com/presentation/d/e/2PACX-1vTb4jAYqVxw6ry8eswNWoaR6fF0xB2xWFiy-HRueGmXlu7NiMg3SZ0fWke6zuLsfMBvmrZxwN6TRgR5/embed?start=false&loop=false&delayms=3000" frameborder="0" width="592" height="362" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>

---
## Transcript 
**Matteo:** My name is Matteo, I am a senior software engineer at the Harvard Library Innovation Lab. Today with my colleague Kristi Mukk we're going to talk about WARC-GPT, an open-source tool for exploring web archives using AI. 

The Library Innovation Lab is part of the Harvard Law School Library, and part of our mission is to bring library principles to technological frontiers.

Applied to web archiving, this "mission" of ours led us to create Perma.cc - which many of you already know - but also Perma Tools, a series of open-source web archiving tools.

It is also under that framework that we approach this "AI moment"; and by "AI moment" I mean the "AI ALL the things" phenomenon we've observed since the launch of ChatGPT in late 2022.

And this all may feel, at the same time OVERWHELMING:
* First because there are so many models to choose from. On HuggingFace alone, which is a platform for sharing open source models, there are over half a million models available
* But even if I just focus on text-generation models, the models that behave a little bit like ChatGPT, there are over 100 000 models to choose from. I don't know which one is the best overall, or even for my specific use case.
* Keeping up with progress in AI research is also a challenge, as it's become the focus of so many research groups around the world.

At the same time, this all feels very much underwhelming:
* Mainly because veracity is a major concern. We now use generative AI in mission critical scenarios, and AI "hallucinations", which is a misnomer to describe the fact that sometimes AI models make up stuff, has become its own field of research.
* But if veracity is a concern, so is accuracy, and impressive AI output doesn't always stand the test of scrutiny, as you might be able to see in the example I generated and pasted here.

But overall, this moment feels disempowering:
* We're being told that AI will do everything and it's opposite, that it's going to take all the jobs and create all the jobs, create an economic boom and economic collapse ... but rarely are we told that we have a role to play in shaping what AI can and will do for us.
* We're constantly exposed to ethereal imagery of superhuman intelligence, showing AI as a sort of unstoppable force. Most news articles I read about AI feature an illustration like one of the three I generated for this slide, and I don't think this helps me feel empowered to experiment with AI.

What we're trying to do is to take a step back and wonder: 
What can we do with AI now, and why does it matter for knowledge institutions?
We think that, in part, this boils down to: 
If I can ask a question to ChatGPT instead of Google or my librarian, then LLMs are "a new way of knowing". 

AI models accidentally "know" things, they were trained on vast amounts of data, retained some of that information, and are able to restitute an even smaller subset of that.

They also show promising capabilities in summarization and sense-making: can that help improve access to knowledge and understand collections more deeply?

Moreover, as a lab, how can we lower the barrier of entry for experimentation with AI.

These questions led us to explore different "flavors" or RAG, which is the acronym for RETRIEVAL AUGMENTED GENERATION.

RAG is a series of techniques that allows for connecting a large language model to a knowledge base in order to augment its responses. 

That knowledge base can be anything: a database, an API or even a single document. The way these two elements are connected together is through a prompt, which is a series of textual instructions that the model responds to.

In RAG, the focus is on that prompt, which is used to pass structured information to the model in order to elicit more grounded, precise or factual responses.

RAG can also be used to take advantage of the summarization and sense-making capabilities of LLMs, to make sense of long and messy documents, which is a feature we're particularly interested in the context of WARC-GPT, which I am going to talk a little bit more about now.

So WARC-GPT is an open-source RAG pipeline for exploring web archives.
The question we asked ourselves was whether RAG could be used to extract hard-to-find information out of web archive collections, but also if we could build something that could help the web archiving community engage with these questions. 

So we’ve built and released WARC-GPT as an open source chatbot that you can download and run your machine. Its main feature is that it lets you ask questions to an LLM of your choosing against a given web archives collection.

There is a focus on interpretability, and the UI "cites its sources", showing you what excerpts from the web archive collection you provided it used to help generate a response. 

WARC-GPT is also highly-configurable, and every single part of the pipeline can be inspected, tweaked and replaced. Our goal here was not to build a production-ready chatbot, but instead a research boilerplate for folks to explore the intersection of RAG and web archives. 

In that spirit, WARG-GPT lets you communicate with both open-source and proprietary LLMs, and switch between models as the conversation goes. 

It also comes with a REST API that helps build experiments "on top" of WARC-GPT.

So that’s what it does, but how does it work?

The "RAG" flavor we used here is what I would call "vanilla", in the sense that it is the most common way of implementing RAG. A more technical term for it would be  "vector-based asymmetric semantic search": let's break that down a little bit. 

The knowledge base WARC-GPT uses comes from text it parsed out of WARC files the user provided. 

These text excerpts, extracted from HTML and PDF records, are processed using a "text similarity" model before being saved into a vector store, which is a specialized type of database.

What a text-similarity model does is that it encodes the "meaning" of a text excerpt into a vector, which is a fixed-length series of numbers. 

Doing this for an entire collection allows for performing search by mathematically grouping related vectors together based on their shared "meaning", for example using cosine similarity.

The "asymmetric" part here is that the text used for questions is much shorter and different in nature than the text excerpts. The text similarity model is trained to match these elements together, because their meaning is connected.

This is what you can see here on this very simplified 2D plot which represents a vector store generated by WARC-GPT. The blue dots are text excerpts coming from WARCs, the red ones questions we asked about the collection. The way this works is that the blue dots that are the closest to the red ones are going to be used to help answer the questions. 

By the way WARC-GPT comes with a feature that lets you generate that kind of plot so you can see how well it ingested your collection. 

It also lets you configure deeply how this RAG pipeline works, as there is no one size fits all.

**Kristi: **We put WARC-GPT to the test with a small experiment to see if it behaved as designed. We were particularly interested in seeing how WARC-GPT might be able to highlight the utility and value of web archives by allowing users to access web archives in a new way, potentially offering a different starting point for scholarly inquiry. How might WARC-GPT help reveal connections that may have been hidden or hard to find, or help you find relevant resources more quickly? 

So we put together a small thematic collection of 78 URLs about the lunar landing missions of India and Russia in 2023, and we chose this topic because the model we were using for this experiment was likely unaware of recent developments in these missions as the model was trained and released before the missions were launched and completed. For our experiment, we used WARC-GPT’s default configuration using Mistral 7B as our model at temperature 0.0 on a set of 10 questions in a zero-shot prompting scenario, comparing both with and without RAG. 

As Matteo and I collaborated, we found that our unique perspectives as engineer and librarian allowed for the collaborative problem-solving AI requires.  Librarians have a long history of helping patrons navigate emerging technologies, access the knowledge they need, and evaluate information, and they can harness this expertise to meet patrons where they are and guide them. We think that LAM professionals should be collaborating with engineers in the building, management, and evaluation of AI tools.

Some of the things librarians are particularly well-equipped to help with: 
* Navigating the overwhelming landscape of AI resources and tools. 
* Identifying a suitable collection as a knowledge base for AI applications or vetting AI datasets.
* With their knowledge of user needs, librarians can identify specific problems or use cases AI is well-suited to address, and when alternative solutions might be more appropriate.
* Problem formulation, brainstorming questions a user might ask, creating and refining prompts, and knowing what context to provide to the model. 
* Critically evaluating AI output and assessing ethical implications of AI. 

A question at the forefront of our minds as we conducted this experiment was: “how might we leverage tools like WARC-GPT not only for accessing web archives, but as a tool for AI literacy?” AI literacy is part of information literacy, so it’s essential to think about how this can start a larger conversation about library principles and reaffirming those library principles as users explore these AI tools. This looks like helping users think through questions like: “how did this AI tool arrive at its search results?,” and thinking about how we can help users go from thinking about generative AI as merely a tool, to thinking about AI as a subject worthy of investigation in its own right. And more broadly, thinking about how AI might change how we communicate, learn, and make sense of the world. 

It’s important to note that this new mode of access comes with important trade-offs when compared with “traditional” search. Variability is not a bug, but a feature of LLMs. LLMs sit at an interesting intersection, being neither a database we can query facts from, nor a person we can ask to perform judgments. We see them instead as imperfect simulations of what a person could answer to a question, providing statistically-reasonable responses to prompts. Variability plays a big role in RAG pipelines: decisions like your choice of embedding model, prompt, temperature, or other settings can yield different results. 

Understanding the potential and the underlying limitations is key for AI literacy and trust calibration, because users may place too much trust in AI without critically evaluating its output. The evaluation criteria we used to analyze our experiment’s output was inspired by the work of Gienapp et al. We analyzed the following criteria for our experiment: 

* Coherence: Is the response structured well in terms of logic and style? 
* Coverage: Is the response pertinent to the question’s information need in terms of breadth and depth? Were the embeddings pulled relevant?
* Consistency: Is the response free of contradictions and accurately reflects the source information the system was provided as context? Was that context used appropriately in its response? 
* Correctness: Is the response factually correct and reliable, free of factual errors?
* Clarity: Is there clarity of language and content? 

Let’s take a look at one of the embeddings. This is one of the text excerpts retrieved in response to the question “Identify the cause of Luna 25’s crash”. The red text are the words used in the prompt itself, the highlighted yellow text are the portions of the embedding that the model pulled in to formulate its response. We observed in most cases that the model ignored irrelevant pieces of information or noise in the embeddings. In the response, you can see that it copied near verbatim from the source text. 

As all of you in the audience experiment with AI, we encourage you to not only talk to a librarian, but also think like a librarian yourself. AI experimentation should follow this continued cycle of “reflect, refine, repeat.” Metacognition plays a crucial role in AI literacy, and in order to effectively calibrate trust, you must form a correct mental model of AI’s error boundaries, and engage in critical reflection about your own thinking and learning throughout the process. 

We’ve coined the term Librarianship of AI to describe this emerging practice and guiding framework as we build tools like WARC-GPT to lower the barrier to entry for librarians and others to understand AI in their particular domain, and empower them to form their own opinions and frameworks for thinking about AI and new ways to access knowledge for their communities. We define Librarianship of AI as “the study of models, their implementation, usage and behavior as a way of helping users make informed decisions and empowering them to use AI responsibly.”

So what’s next for WARC-GPT? While still an experimental tool, WARC-GPT is a step toward collectively understanding the potential and limitations of using AI to explore web archives, and getting at this core question of how we can encourage users to explore the troves of information stored in web archives. We welcome any feedback and contributions to WARC-GPT. The code is open source, and we’d encourage anyone interested to not only use it, but build off of it. We have a few ideas about topics that we see as compelling looking forward, which we’ll share now to either be undertaken by us or others.

First off, we think it would be worthwhile to explore some of the potential and limitations more deeply. This could look like testing WARC-GPT with a larger collection to see if our initial findings actually scale up, conducting automated benchmarking to figure out how much a model “knows” about a given collection, or thinking about description work and what it might mean for your team’s process if you could interact with a chatbot that had insight into what you’ve captured from the web. 

We could also envision a future pipeline with multimodal embeddings that would enable you to explore images in web archive collections. 

The current setup of WARC-GPT is not well suited for time-based search and comparison, so it could be valuable to explore how WARC-GPT might help us understand how a given website has changed over time. 

Web archive playback within WARC-GPT would also allow for easier source verification, fact-checking, and information evaluation. 

Lastly, with the rapid pace of AI development, it’s likely that we will need to adapt to new capabilities. Some of the challenges we encounter with RAG today such as context window length could improve in the future. 

Have a question or idea, want to collaborate? Get in touch with us at lil@law.harvard.edu. Thank you! 
