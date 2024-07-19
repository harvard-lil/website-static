---
title: "Student Note: ChatGPT Ate My Homework. Can LLMs Generate Compelling Case Briefs?"
author: chris-shen
excerpt_separator: <!--more-->
tags:
- ai research
---

> The Library Innovation Lab welcomes a range of research assistants and fellows to our team to conduct independently-driven research which intersects in some way to our core work.<br>
> The following is a reflection written by [Chris Shen](/about/#chris-shen), a Research Assistant who collaborated with members of LIL in the spring semester of 2024. Chris is a sophomore at Harvard College studying Statistics and Government.

From poetry to Python, LLMs have the potential to drastically influence human productivity. Could AI also revolutionize legal education and streamline case understanding? 

I think so.

<!--more-->

## A New Frontier

The advent of Large Language Models (LLMs), spearheaded by the release of OpenAI's ChatGPT in late 2022, have prompted universities to adapt in order to responsibly harness their potential. Harvard instituted guidelines, requiring professors to include a [“GPT policy”](https://oue.fas.harvard.edu/ai-guidance) inside their syllabus. 

As students, we read a ton. A quick look at the [course catalog](https://hls.harvard.edu/wp-content/uploads/course-catalogs/hls-course-catalog-2023-2024.pdf) published by Harvard Law School (HLS) reveals that many classes require readings of up to 200 pages per week. This sometimes prompts students to turn to summarization tools as a way to help quickly digest content and expedite that process. 

LLMs show promising summarization capabilities, and are increasingly used in that context.

Yet, while these models have shown general flexibility with handling various inputs, [“hallucination”](https://arxiv.org/abs/2401.06796) issues continue to arise, in which outputs generate or reference information that doesn’t exist. Researchers also [debate the accuracy](https://arxiv.org/abs/2404.06654) of LLMs as context windows continue to grow, highlighting potential mishaps in identifying and retaining important information in increasingly long prompts.

When it comes to legal writing, which is often extensive and detail-oriented, how do we go about understanding a legal case? How do we avoid [hallucination and accuracy issues](https://hai.stanford.edu/news/hallucinating-law-legal-mistakes-large-language-models-are-pervasive)? What are the most important aspects to consider? 

Most importantly, how can LLMs play a role in simplifying the process for students?

---

## Initial Inspirations

In high school, I had the opportunity to intern at the law firm [Hilton Parker LLC](https://hiltonparker.com), where I drafted declarations, briefs, demand letters, and more. Cases ranged from personal injury, discrimination, wills and affairs, medical complications, and more. I sat in on depositions, met with clients, and saw the law first-hand, something few high schoolers experience. 

Yet, no matter the case I got, one thing remained the same –– the ability to write well in a style I had never been exposed to before. But, before one can write, one must first read and understand. 

Back when I was an intern, there was no ChatGPT, and I skimmed hundreds of cases by hand. 

Therefore, when I found out that the [Harvard Library Innovation Lab (LIL)](https://lil.law.harvard.edu) was conducting research into harnessing LLMs to understand and summarize fundamental legal cases, I was deeply intrigued. 

During my time at LIL, I have been researching a method to simplify that task, allowing students to streamline their understanding in a new and efficient way. Let’s dive in.

---

## Optimal Outputs

I chose case briefs as the final product over other forms of summarization, like headnotes or legal blurbs, due to the standardized nature of case briefs. Writing case briefs is not explicitly taught to many, if not most law students, yet it is implicitly expected by law professors to keep up with the pace of courses during 1L. 

While these briefs typically are not turned in, they are heavily relied upon during class to answer questions, engage in discussion, and offer analytical reflections. Even so, many students no longer write their own briefs, using cookie-cutter resources behind paywalled services like Quimbee, LexisNexis, and West-Law, or even student-run repositories such as [TooDope](https://toodope.org).

This experiment dives into creating succinct original case briefs that contain the most important details of each case, and go beyond the scope of so-called “canned briefs”. But what does it take to write one in the first place?

**There are typically 7 dimensions of a standard case brief offered by LexisNexis:**

- Facts (name of the case and its parties, what happened factually and procedurally, and the judgment)
- Procedural History (what events within the court system led to the present case)
- Issues (what is in dispute)
- Holding (the applied rule of law)
- Rationale (reasons for the holding)
-  Disposition (the current status or final outcome of the case)
- Analysis (influence)

I used Open AI's GPT-4 Turbo model preview (gpt-4-0125-preview) to experiment with a two-pronged approach to generate case briefs matching the above criteria. The first prompt was designed both as a vehicle for the full transcript of the court opinion to summarize and as a way of giving the model precise instructions on generating a case brief that reflects the 7 dimensions. The second prompt serves as an evaluation prompt, asking the model to evaluate its work and apply corrections as needed. These instructions were based on guidelines from [Rutgers Law School](https://wp.rutgers.edu/attachments/article/492/Grading-Criteria-for-355-Legal-Writing.pdf) and other sources.

When considering legal LLM summarization, another critical element is reproducibility. I don’t want a slight change in prompt vocabulary to alter the resulting output completely. I have observed that, before applying the evaluative prompt, case briefs would be disorganized or often random in the elements the LLM would produce. For example, information related to specific concurring or dissenting judges would be missed, analyses would be shortened, and inconsistent formatting would be prevalent. Sometimes even the most generic “Summarize this case” prompts would produce slightly better briefs!

However, an additional evaluative prompt now standardizes outputs and ensures critical details are captured. Below is a brief illustration of this process along with the prompts used.

<figure>
    <img src="https://lil-blog-media.s3.amazonaws.com/chris-s-prompting-diagram.webp" alt="Diagram: Two-prompt system for generating case briefs using an LLM.">
    <figcaption>Diagram: Two-prompt system for generating case briefs using an LLM.</figcaption>
</figure>


See: [Initial and Evaluative prompts](https://lil-blog-media.s3.amazonaws.com/2024-06-10-can-llms-generate-compelling-case-briefs-prompts.pdf)

Finally, after testing various temperature and max_token levels, I settled on the values 0.1 and 1500, respectively. I discovered that lower temperatures best suit the professional nature of legal writing, and a 1500 maximum output window allowed the LLM to produce all necessary elements of a case brief without including additional “fluff”.

## Old vs. New

To test this apparatus, I picked five fundamental constitutional law cases from the SCOTUS that most 1L students are expected to analyze and understand. These include _Marbury v. Madison (1803), Dred Scott v. Sandford (1857), Plessy v. Ferguson (1896), Brown v. Board of Education (1954),_ and _Miranda v. Arizona (1966)_.

Results of each case brief are below.

- [Marbury v. Madison (1803)](https://lil-blog-media.s3.amazonaws.com/2024-06-10-can-llms-generate-compelling-case-briefs-casebrief01.pdf)
- [Dred Scott v. Sandford (1857)](https://lil-blog-media.s3.amazonaws.com/2024-06-10-can-llms-generate-compelling-case-briefs-casebrief02.pdf)
- [Plessy v. Ferguson (1896)](https://lil-blog-media.s3.amazonaws.com/2024-06-10-can-llms-generate-compelling-case-briefs-casebrief03.pdf)
- [Brown v. Board of Education (1954)](https://lil-blog-media.s3.amazonaws.com/2024-06-10-can-llms-generate-compelling-case-briefs-casebrief04.pdf)
- [Miranda v. Arizona (1966)](https://lil-blog-media.s3.amazonaws.com/2024-06-10-can-llms-generate-compelling-case-briefs-casebrief05.pdf)

Of course, I also tested the model on cases no LLM had ever seen before. This would ensure that our approach could still produce quality briefs past the knowledge cut-off for our model, which was December 2023 in this case. These include _Trump v. Anderson (2024)_ and _Lindke v. Freed (2024)_. 

Results of each case brief are below, with attributes –– temperature = 0.1. max_bits = 1500.

- [Trump v. Anderson (2024)](https://lil-blog-media.s3.amazonaws.com/2024-06-10-can-llms-generate-compelling-case-briefs-casebrief06.pdf)
- [Lindke v. Freed (2024)](https://lil-blog-media.s3.amazonaws.com/2024-06-10-can-llms-generate-compelling-case-briefs-casebrief07.pdf)

Applying a critical eye to the case briefs, I see a successful adherence to structure and how the model has outputted case details consistently. There is also a clearly succinct tone that allows students to grasp core rulings and their significance without getting overrun with excessive details. This is particularly useful for discussion review and exam preparation. Further, I find the contextual knowledge presented, such as in _Dred Scott v. Sandford_, allow students to understand cases beyond mere fact and holding but also broader implications.

However, I also see limitations in the outputs. For starters, there is a lack of in-depth analysis, particularly for the concurring or dissenting opinions. Information on precedents used is skimmed over and there is a scarcity of substantive arguments presented. In the example of _Marbury v. Madison_, jurisdictional insights are also left out, which are vital for understanding the procedural and strategic decisions made in the case. Particularly for cases unknown to the model, there is evidence of speculative language that can occur due to incomplete information, prompt ambiguity, or other biases.

## So, what’s next?

Moving forward, I’m excited to submit sample case briefs to law students and professors to receive comments and recommendations. Further, I plan to compare our briefs against “canned” ones from resources like Quimbee and gather external feedback on what makes them better or worse, where our advantage lies, and ultimately equip law students in effective and equitable ways.

Based on initial observations, I also see potential for users to interact with the model in more depth. Thought-provoking questions such as “How has this precedent changed over time?”, “What other cases are relevant to this one?”, “Would the resulting decision change in today’s climate?”, and more, will hopefully allow students to dive deeper into cases instead of just scratching the surface.

While I may still be early in the process, I firmly believe a future version of this tool could become a streamlined method of understanding cases, old and new. 

I’d like to extend a special thank you for the contributions of [Matteo Cargnelutti](/about/#matteo-cargnelutti), [Sankalp Bhatnagar](/about/#sankalp-bhatnagar), [George He](/about/#george-he), and the rest of the Harvard LIL for their support and continued feedback throughout this journey.
