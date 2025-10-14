---
title: "Open French Law RAG: Using AI for Cross-Language Legal Information Retrieval"
guest-author: "Kristi Mukk, Matteo Cargnelutti and Betty Queffelec"
excerpt_separator: <!--more-->
sharing-image: images/oflr-social.jpg
tags:
- AI Research
---


<a href="/open-french-law-rag/"><img src="https://lil-blog-media.s3.amazonaws.com/oflr-1400.jpg" alt="Open French Law RAG Case Study"/></a>

Imagine that you are an English speaker visiting France, engaged in discussion with a French local about a legal issue, but you are a novice French speaker and not familiar with the French legal system. Fortunately, you have a laptop containing over 800,000 French law articles, where the answer to your question may be found. You also have access to open-source software and a multilingual large language model, capable of reading these legal documents and answering questions about them in English. Could a tool like this help you overcome both language and knowledge barriers when exploring large collections of information? How might LLMs help people access and understand legal information that is either in a foreign language or requires specialized knowledge? 

We built the Open French Law Retrieval Augmented Generation (RAG) pipeline as part of **[a case study](/open-french-law-rag/)** in which we explored how French law could be more accessible to non-French speakers. By experimenting with an off-the-shelf pipeline that combines LLMs with multilingual [Retrieval Augmented Generation](https://scriv.ai/guides/retrieval-augmented-generation-overview/) techniques, we aimed to investigate how such a tool might help non-French speakers of varying expertise ask questions in English to explore French law. 

In the French civil law system, the emphasis is primarily on statutes—many of which are codified—rather than on case law which does not constitute binding precedents. This framework provided a favorable environment for experimenting with the RAG approach for legal information retrieval as it allows for the integration of structured information. 

Legal scholars, librarians, and engineers all have a crucial role to play in the building and evaluation of legal AI tools, and each of these perspectives are represented in this experiment: [Matteo Cargnelutti](https://lil.law.harvard.edu/about/#matteo-cargnelutti) (software engineer) built the technical infrastructure for this experiment, [Kristi Mukk](https://lil.law.harvard.edu/about/#kristi-mukk) (librarian) designed the experiment and evaluation framework, and [Betty Queffelec](https://www.umr-amure.fr/equipe/queffelec-betty/?lang=en) (legal scholar) analyzed the model’s responses. With Betty’s expertise in environmental law, we primarily focused our experimental scope on this legal domain. Central to our approach is our emerging practice and guiding framework [“Librarianship of AI”](https://lil.law.harvard.edu/blog/tag/ai-research/), which advocates for a critical assessment of the capabilities, limitations, and tradeoffs of AI tools. Through this critical lens grounded in library principles, we aim to help users make informed decisions and empower them to use AI responsibly.

## How did we build the Open French Law RAG pipeline? 

At the core of this experiment is a “cookie cutter” Retrieval Augmented Generation pipeline, which we purposefully assembled using off-the-shelf open source components, as a way to understand what most of these systems could realistically achieve at the time of the experiment’s start in the fall of 2023. It is centered around [LiteLLM](https://github.com/BerriAI/litellm) and [Ollama](https://ollama.com/) for inference with text- generation models, [intfloat/multilingual-e5-large](https://arxiv.org/abs/2402.05672) (a multilingual, [Sentence Transformers](https://sbert.net)-compatible model) for text similarity, and [ChromaDB](https://www.trychroma.com/) as for vector search. We used the [COLD (Collaborative Open Legal Data) French Law Dataset](https://huggingface.co/datasets/harvard-lil/cold-french-law) as the foundation for our experimental pipeline, a collection we previously assembled of over 800,000 French law articles.

Our technical infrastructure for this experiment is made of two key components: 
- **An ingestion pipeline**, transforming the knowledge base into a vector store.
- **A Q&A pipeline**, which makes use of that vector store to help the target LLMs answer questions.

The source code for this experimental setup is open-source and [available on Github](https://github.com/harvard-lil/open-french-law-rag-pipeline).


## What was the experimental setup for Open French Law RAG? 

For our use case, we role played a typical American user without legal domain expertise or knowledge of prompt engineering best practices. We designed the Q&A pipeline to test a series of questions about French law with the following requirements:

- Always in a zero-shot prompting scenario (no follow-up questions) at temperature 0.0.
- Both in French and in English, as a way to test cross-language asymmetric semantic search. 
- With and without retrieving sources from the vector store, as a way to measure the impact of sources pulled from the RAG pipeline on the responses.
- To be tested against both OpenAI’s GPT-4 and Meta’s Llama2-70B, two common models representative of both closed-source and open-source AI at the time of the experiment _(fall 2023)_. 

The example below demonstrates the different responses to the question: “Can a cow be considered as real estate?” ([View our solutions appendix to see the correct answer](https://docs.google.com/document/d/1e3znEMC6DYAxoE32d8vCtGGvJsOAydFG2-VO-mHnN70/edit?tab=t.0#heading=h.v2pfc6htje7r).)

**GPT-4/English/No RAG:**

> “No, a cow cannot be considered as real estate under French law. Real estate, or "immobilier" in French, refers to property that is fixed, immovable, and includes things like land, buildings, or anything else that is permanently attached to the land. A cow, being a movable object, falls under the category of personal property, or "biens meubles" in French. This category includes all things that can be moved without damaging either the object being moved or the property from which it is being removed. So, in legal terms, a cow is considered personal property, not real estate.”

**GPT-4/English/RAG:**

> “No, a cow cannot be considered as real estate under French law. According to Article R143-2 of the "Code rural et de la pêche maritime", livestock, whether dead or alive, are considered as movable property (biens mobiliers). Real estate (biens immobiliers) refers to immovable property like land or buildings. Therefore, a cow, being a part of livestock, is considered movable property, not real estate.”

_Sources retrieved_: 
- Code rural et de la pêche maritime (Rural and Maritime Fisheries code). [View full retrieved text](https://docs.google.com/spreadsheets/d/1ql6rblht25R4LoXMzVnl63YCUZ3mGyCMdtylnoBUS1A/edit?gid=1613204808#gid=1613204808&range=30:30). 

We analyzed the output for source relevance and accuracy, logical coherence, factual correctness, translation quality, and scope. 

## What trends did we observe when analyzing our experiment’s results? 

With our particular experimental setup and analysis criteria, we identified the following trends in our study: 

**Performance Comparison: English vs. French**
- English questions showed slightly better performance compared to French questions, although RAG helped mitigate this difference. Both models performed better in English than in French. 

**Impact of RAG**
- While the use of RAG enhanced the accuracy and relevancy of some responses, it also introduced additional complexity and potential for errors.
- Incorporating RAG improved the system’s performance in both English and French.

**Accuracy and Relevancy**
- We observed the prevalence of partially inaccurate responses that mix true and false statements, along with different types of inaccuracies. We observed that errors in responses often arose from the model’s inability to properly determine material, geographical and temporal scope of rules. This is a significant limitation because it is a core skill of lawyers. In addition, the retrieval of irrelevant embeddings also introduced inaccuracies.

While our findings are interesting, we recognize the limitations in our experimental scope and evaluation. Interpreting these results requires caution in drawing broad conclusions about the generalizability and robustness of our data. 

## What were our key takeaways from the Open French Law RAG experiment? 

Our key takeaways focused on the questions: _“How can legal AI tools be used efficiently?”_ and _“When is the use of legal AI tools beneficial?”_

- **Multilingual AI shows potential:**  Multilingual RAG can improve accessibility to foreign legal texts, although imperfectly. Our pipeline enabled cross-language searching to some degree without requiring translations obtained by users. However, we discovered that while responses often appeared plausible, fluent, and informative, models frequently retrieved irrelevant documents, included citation hallucinations, and contained inaccuracies. While this tool can be a helpful research aid, we urge caution when using RAG-based tools as information-seeking mechanisms without verifying sources and evaluating responses for accuracy, coherence, and completeness.
- **Limitations of off-the-shelf RAG without manual optimization:** Especially for specialized domains such as law where accuracy and context is crucial, addressing the limitations of an off-the-shelf RAG pipeline such as reducing hallucinations and generating highly context-specific results requires significant time and effort for marginal gains. 
- **LLMs as a complementary research tool:** LLMs may aid in providing helpful starting points to explore vast corpora such as the over 800,000 French law articles in our knowledge base and can be helpful as a discovery, summarization, and sense-making tool. However, reliance solely on AI can hinder critical thinking and legal reasoning and lead to a loss of understanding the broader legal context, and users must understand the limitations and risks involved. The need for traditional legal research skills becomes even more important for verifying AI output. Beyond the accuracy of information retrieval, users must also weigh the benefits of using these tools against their social and environmental impacts. 
- **Importance of trust calibration:** Developing clear guidelines and instructions for using and evaluating these tools is essential. Despite the promise of saving time through efficient search and identification of relevant legal sources, AI output can still overwhelm users with excessive and sometimes contradictory responses for the same prompt, and hallucinations remain a significant risk. Verifying information, identifying any overlooked details, and checking sources, particularly when less obvious inaccuracies arise, can be extremely time-consuming. While these tools may enhance access and help lower the barrier to entry, users need to understand the inherent variability of AI tools.
- **Comparative utility for legal expert vs. legal novice:** The efficacy of legal AI tools is not solely contingent on technological capability, but also how legal scholars engage with it. For legal experts, these tools complement their knowledge, helping uncover obscure legal rules and providing broader insights into research. Experts can identify useful information even when responses contain inaccuracies, and experts know how to ask precise questions which are more likely to generate relevant responses. For novices such as foreign law students unfamiliar with the French civil law system, challenges may arise. While novices are able to ask questions in natural language without knowing specific legal vocabularies, it is challenging to verify output with limited understanding of the French legal framework. Verifying responses and checking for hallucinations requires a strong understanding of legal rules and of the legal system. Furthermore, novices may pose ambiguous or misleading questions, and risk accepting “convincingly wrong” responses that appear accurate and informative, but fundamentally miss the mark. 

We welcome feedback and contributions to this experiment and aim to spark cross-cultural, interdisciplinary conversations among librarians, engineers, and legal scholars about the use of RAG-based legal tools.

If you’re interested in learning more, you can find detailed examples, analyses, and a thorough discussion of our experiment and findings in our case study. **[Explore the case study](/open-french-law-rag/)**. 

---

<a href="https://labs.google/fx/tools/image-fx/0rt6s0tme0000">Illustration generated via Imagen 3</a> with the following prompt: Llama dressed in a French lawyer robe (avocat) abstract. Seed: 351141.