---
title: 'Cracking the justice barrier: announcing the Open Legal AI Workbench'
author: [matteo-cargnelutti,jack-cushman]
excerpt_separator: <!--more-->
sharing-image: images/olaw-banner.png
tags:
- AI Research
- Tools
---

<img src="https://lil-blog-media.s3.amazonaws.com/olaw-banner.png" alt=""/>

When the Lexis corporation [first launched legal research terminals](https://en.wikipedia.org/wiki/LexisNexis#History) in the 1970s it hoped to “crack the librarian barrier,” allowing lawyers to do their own legal research from their desks instead of sending law firm librarians through paper search indexes. Today something larger is possible: we may be able to “crack the justice barrier,” allowing people to answer a larger and larger number of legal questions for themselves. [According to the Legal Services Corporation](https://justicegap.lsc.gov/), low-income Americans do not receive any or enough legal help for 92% of their civil legal problems, so there would be a huge public benefit to making legal resources more widely available.

We want academics and nonprofits at the table in discovering the next generation of legal interfaces and helping to close the justice gap. It is not at all clear yet which legal AI tools and interfaces will work effectively for people with different levels of skill, what kind of guardrails they need, and what kind of matters they can help with. We need to try a lot of ideas and effectively compare them to each other.

That’s why we’re releasing a common framework for scholarly researchers to build novel interfaces and run experiments: the [Open Legal AI Workbench](https://github.com/harvard-lil/olaw) (OLAW). In technical terms, OLAW is a simple, well-documented, and extensible framework for legal AI researchers to build services based on tool-based retrieval augmented generation.

We’re not done building this yet, but we think it’s time to share with the legal technology and open source AI communities for feedback and collaboration. 

Out of the box, OLAW looks like this:

<figure>
    <div class="embed-container">
        <iframe src="https://player.vimeo.com/video/919686775"
                width="640"
                height="480"
                frameborder="0"
                webkitallowfullscreen
                mozallowfullscreen
                allowfullscreen>
        </iframe>
    </div>
    <figcaption><strong>Video</strong>: OLAW’s chatbot retrieving court opinions from the CourtListener API to help answer a legal question. Information is interpreted by the AI model, which may make mistakes.</figcaption>
</figure>

---

## What is OLAW for?

OLAW itself is not a useful legal AI tool, and we didn’t build it to be used as-is.

OLAW itself is not a useful legal AI tool, and we didn’t build it to be used as-is. Instead, OLAW is intended to rapidly prototype new ideas for legal tools. OLAW is an excellent platform for testing questions like:

- How are legal AI tools affected by the use of different prompts, models, or finetunings?
- How can legal AI tools best incorporate different data sets, such as caselaw, statutes, or secondary sources?
- What kind of search indexes are best for legal AI tools (boolean, semantic search etc.)?
- How can users be best instructed to use legal AI tools? What interface designs cause users at different skill levels to engage with the tool effectively and manage its limitations?
- What kind of safety guardrails and output filters are most effective and informative for legal AI tools?
- What kind of information about the tool’s internal processes should be exposed to users?
- What kind of questions are better or worse suited for legal AI tools, and how can tools help guide users toward effective uses and away from ineffective ones?

… and many others. If you want to experiment with legal AI search tools, and you have a programmer who can write some basic Python, OLAW will give you all the knobs to turn when you get started.

---

## Why is OLAW needed now?

Legal AI tools are a wide open design space with the potential to help a lot of people. We want to make it easier for the academic and open source communities to get involved in exploring the future of these tools.

The commercial legal research industry is undergoing the fastest period of exploration since the invention of the internet. While there has been incremental progress, the boolean search techniques still used by lawyers today would be recognizable to lawyers using LEXIS terminals in the 1970s. But now, everything is changing: commercial vendors like Westlaw, Lexis, and vLex all introduced novel AI-based search interfaces in the last year.

We want to support research that happens outside the legal industry as well as inside, and research that is published publicly and peer reviewed as well as proprietary. That’s needed because lots of people need legal help who may never be profitable to serve; because lots of novel tools are now possible beyond the ideas any one company can explore; and because everyone will be better off if there is rigorous, public research available on what works and what doesn’t.

---

## What’s next?

We currently have the core concept implemented: a simple, well documented testbed using tool-based retrieval augmented generation that is easy to modify. These are some directions we would like to explore next:

- **Automatic benchmarking frameworks**. OLAW currently requires manual testing to evaluate the impacts of design experiments. Some impacts may be testable automatically with the help of frontier models. We would like feedback from the community on the best way to design effective benchmarks.
- **Additional tools**. OLAW ships with just one tool, which runs searches against the CourtListener API. We would welcome additions of default tools that search other legal resources.
- **Structured extension points**. We have a standard plugin-based approach to adding tools, but other extensions such as output filters or display methods require patches to the underlying source code. We would like help identifying other extension points that would benefit from standardized interfaces for testing.

We welcome the community’s input on these and other areas for improvement.

---

## How do I get involved?

OLAW is currently best suited for programmers who can host their own web software and make their own modifications. To get started, [head over to our Github](https://github.com/harvard-lil/olaw) to get installation instructions, file issues, send pull requests, or comment in the discussion area.

---

## Credits

Thanks to Jeremiah Milbauer and Tom Zick for their input on this effort; all mistakes are by Jack and Matteo. 

Logo: <a href="/about/#jacob-rhoades">Jacob Rhoades</a>.
