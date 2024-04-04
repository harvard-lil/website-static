---
title: A modest improvement to WARC-GPT
author: ben-steinberg
excerpt_separator: <!--more-->
tags:
- AI Research
- Tools
---

I just made a [minor
change](https://github.com/harvard-lil/warc-gpt/pull/7) to
[WARC-GPT](https://github.com/harvard-lil/warc-gpt), the tool Matteo
Cargnelutti wrote [for querying web archives with
AI](https://lil.law.harvard.edu/blog/2024/02/12/warc-gpt-an-open-source-tool-for-exploring-web-archives-with-ai/). I'll
explain a little bit of the background, and what the change is for.

## What are we trying to do here

The basic idea is that we want to combine web archives with an
existing large language model, so that the model will answer questions
using the contents of the web archive as well as its inherent
knowledge from pre-training. I have for many years run a wiki for
myself and a few friends, which has served variously as social venue,
surrogate memory, place to pile up links, storehouse of
enthusiasms. When Matteo first announced WARC-GPT, it struck me that
the wiki would be a good test; would the tool accurately reflect the
content, which I know well? Would it be able to tell me anything
surprising? And more prosaically, could I run it on my laptop?  Even
though the wiki is exposed to the world, and I assume has been crawled
by AI companies for inclusion into their models (despite the presence
of a restrictive robots.txt), I don't want to send those companies
either the raw material or my queries.

<!--more-->

## What is a web archive

Briefly, a web archive is a record of all the traffic between a web
browser and a web server, for one or more pages—from which you can
recreate the playback of those pages. My first task was to generate a
list of the 1,116 pages in the wiki, then create an archive using
[browsertrix-crawler](https://github.com/webrecorder/browsertrix-crawler),
with [this
command](https://gist.github.com/bensteinberg/a4ec60783e813471a6445e7d08f19cd8),
which produced the 40-megabyte file
`crawls/collections/wiki/wiki_0.warc.gz`. This is a WARC file, a
standard form of web archive.

## Ingest the web archive

We now turn to WARC-GPT; the next step is to ingest the web archive,
an optional step is to visualize the resulting data, and the last step
is to run the application with which we can ask a question and get an
answer. 

I installed WARC-GPT by running

<pre><code>
git clone https://github.com/harvard-lil/warc-gpt.git
cd warc-gpt
poetry env use 3.11
poetry install
</code></pre>

I copied
[`.env.example`](https://github.com/harvard-lil/warc-gpt/blob/main/.env.example)
to `.env` and made a couple of changes recommended by Matteo (of which
more later), then copied `wiki_0.warc.gz` into the `warc/`
subdirectory of the repo. The command to process the archive is

<pre><code>
poetry run flask ingest
</code></pre>

which... took a long time. This is when I started looking at and
trying to understand the code, specifically in
[commands/ingest.py](https://github.com/harvard-lil/warc-gpt/blob/main/warc_gpt/commands/ingest.py).

## What is actually going on here

In the ingest step, WARC-GPT takes the text content of each captured
page, splits it into chunks, then uses a [sentence
transformer](https://www.sbert.net/) to turn the text into
**embeddings**, which are vectors of numbers. It later uses those
vectors to pick source material that matches the question, and again
later in producing the answer to the question.

This is perhaps the moment to point out that AI terminology can be
confusing. As I've been discussing all this with Matteo, we
continually return to the ideas that the material is opaque, the
number of knobs to turn is very large, and the documentation tends to
assume a lot of knowledge on the part of the reader.

The first setting Matteo had me change in the `.env` file was
`VECTOR_SEARCH_SENTENCE_TRANSFORMER_MODEL`, which I changed from
`"intfloat/e5-large-v2"` to `"BAAI/bge-m3"`. This is one of the knobs
to turn; it's the model used to create the embeddings. Matteo said, "I
think this new embedding model might be better suited for your
collection.... Main advantage: embeddings encapsulate text chunks up
to 8K tokens." That is, the vectors can represent longer stretches of
text. (A **token** is a word or a part of a word, roughly.)

One of the other knobs to turn, of course, is _where_ you run the
ingest process. Matteo has been doing most of his work on lil-vector,
our experimental AI machine, which is made for this kind of work and
is much more performant than a Mac laptop. When I ran an ingest with
`BAAI/bge-m3`, the encoding of multi-chunk pages was very slow, and
Matteo pointed out that the parallelization built into the encoding
function must be running up against the limits of my computer. I
turned an additional knob, changing
`VECTOR_SEARCH_SENTENCE_TRANSFORMER_DEVICE` from `"cpu"` to
`"mps"`—this setting is, roughly, what hardware abstraction to use in
the absence of a real GPU, or graphics processing unit, which is where
the work is done on machines like lil-vector—but I didn't see a big
improvement, so I set out to make the [change I
mentioned](https://github.com/harvard-lil/warc-gpt/pull/7) at the
beginning of this post. The idea is to keep track of encoding times
for one-chunk pages, and if encoding a multi-chunk page takes a
disproportionately long time, stop attempting to encode multiple
chunks in parallel.

This worked; ingest times (on my laptop, for my 1,116-page web
archive) went from over an hour to about 38 minutes. Success! But note
that I still don't have a clear picture of how ingest time is really
related to all the variables of hardware, settings, and for that
matter, what else is happening on the machine. Further improvements
might well be possible.

Also note that the [pull
request](https://github.com/harvard-lil/warc-gpt/pull/7) contains
changes other than those described here: I moved this part of the code
into a function, mainly for legibility, and changed some for-loops to
[list
comprehensions](https://docs.python.org/3/tutorial/datastructures.html#list-comprehensions),
mainly for elegance. I experimented with a few different arrangements,
and settled on this one as fastest and clearest, but I have not done a
systematic experiment in optimization. I'm currently working on adding
a test suite to this codebase, and plan to include in it a way to
assess different approaches to encoding.

## Coda

You will notice that we have not actually run the web application, nor
asked a question of the model.

When Matteo suggested the change to the sentence transformer model, he
added, "But you’ll also want to use a text generation model with a
longer context window, such as:
[yarn-mistral](https://ollama.com/library/yarn-mistral)"—the part of
this system that is the pre-trained model is external to WARC-GPT; the
application has to call out to another service. In this case, where I
wanted to keep everything on my computer, I am running
[Ollama](https://ollama.com/), an open-source tool for running large
language models, and set `OLLAMA_API_URL` to
`"http://localhost:11434"`, thereby pointing at my local instance. (I
could also have pointed to an instance of Ollama running elsewhere,
say on lil-vector, or pointed the system with a different variable to
OpenAI or an OpenAI-compatible provider of models.)

Once Ollama was running, and I'd run the ingest step, I could run

<pre><code>
poetry run flask run
</code></pre>

and visit the application at http://localhost:5000/. I can pick any of
the models I've pulled with Ollama; these vary pretty dramatically in
speed and in quality of response. This is, obviously, another of the
knobs to turn, along with several other settings in the interface. So
far, I've had the best luck with `mistral:7b-instruct-v0.2-fp16`, a
version of the Mistral model that is optimized for chat interfaces and
is **quantized**: model parameters have been changed from
floating-point numbers to integers in order to save space, time, and
energy, at some cost in accuracy. The question you ask in the
interface is yet another knob to turn, as is [the system
prompt](https://github.com/harvard-lil/warc-gpt/blob/2187fb119f6156ce72dfce240295a8429428ce6d/.env.example#L24-L62)
specified in `.env`.

I haven't learned anything earth-shattering from WARC-GPT yet. I was
going to leave you with some light-hearted output from the system,
maybe a proposal for new wiki page titles that could be used as an
outro for a blog post on querying web archives with AI, or a short,
amusing paragraph on prompt engineering and the turning of many knobs,
but I haven't come up with a combination of model and prompt that
delivers anything fun enough. Stay tuned.
