---
title: Introducing the Law Skills Hub
author: 
  - jenevieve-haggard
thumbnail: https://lil-blog-media.s3.amazonaws.com/law-skills-hub-thumbnail.png
tags:
  - tools
  - ai-research
---
A trusted advisor, someone with decades of experience, can help with both small things and big things. Often, the small things come first. Getting the structure of a document right, or unsticking an awkward passage, can clear space for the deeper thinking that follows.

The procedural knowledge of an experienced advisor lives in the space between what they say and what they ask, what they cross out and what they leave, what they teach explicitly and what they only ever model.

A great deal of writing, reformatting, and thinking-through is now happening inside AI agents. The agents are general by design. They start from an average of the public web, which means a student asking one to "fix my résumé" gets an average resume. An advisor's twenty years of experience is nowhere in that exchange.

We built the Law Skills Hub to see if it was possible to capture, preserve, and share relevant procedural expertise with others and with agents, to empower more meaningful work.

**What it is**

The Law Skills Hub is a curated, openly licensed collection of *agentic skills*. Skills are small, structured documents that a user can install in an AI agent, so that the agent has a procedure to follow, not just a prompt to react to. Each skill in the hub has been written or vetted by LIL, published in plain Markdown, and kept under public version control. You can find the hub at [lil.law.harvard.edu/lawskills-hub](https://lil.law.harvard.edu/lawskills-hub) and the underlying repository at [github.com/harvard-lil/lawskills-hub](https://github.com/harvard-lil/lawskills-hub). A human can read a skill like a recipe. An AI tool can read it too.

<figure class="items-center text-center">
  <a class="no-underline border-none bg-none" style="background: none;" href="https://lil.law.harvard.edu/lawskills-hub/">
    <img class="w-full" style="margin: 0;" src="https://lil-blog-media.s3.amazonaws.com/lawskills-hub-instructional.png" alt='Screenshot of the Law Skills Hub, highlighting the "Law Professor" or instructional category.' />
  </a>
</figure>

A skill is the codification of a process, a checklist of sorts for how to coach a student writing a public-interest resume, how to scaffold a syllabus around evidence-based learning, how to reformat instructor feedback so it tracks the rubric. The skill carries the steps, the values to check against, the templates the expert would reach for, and the things they would not do. A skill does not replace expertise. It tries to preserve and apply process.

We are launching with a small set of skills already in production, several more in progress, and a contributor guide for anyone who wants to add to the collection.

**Why now**

Three things became clear over the last several months, working with faculty, with Career Services, and inside the lab.

The first is that AI companies are starting to converge on a standard for agent skill. Anthropic and OpenAI have agreed on a common format and capabilities which you can learn about at [agentskills.io](https://agentskills.io/home).

The second is that, like most things, it is best to meet users where they are. Many people are working in agent software to create and improve knowledge work. People are not, as a rule, going to abandon the agent and come to a library website or use a bespoke tool. If our procedural knowledge is going to be useful, it must travel into the agent the user is already in and ideally into more than one of them, because the agents are interchangeable and people switch between them.

The third is that there is a growing informal economy of skills shared in zip files, gists, and Discord threads. A non-technical user downloading one of these has no easy way to know what is inside, what values it encodes, or whether the code it runs has been read by anyone they trust. Some of those skills are excellent. Some of them quietly do things their users would not endorse.

We think there was room for a different kind of hub. A hub grounded in stewardship and reliability.

A Harvard Law–branded hub on the harvard.edu domain, with skills published as readable Markdown rather than zipped bundles, is our attempt to address both problems at once. The address tells you where the software comes from. The format lets you read it before you run it. We've also created "meta skills" which allow people to install one skill that will help them discover and install other skills for them based on their interests.

**What we won't do**

Replace human cognition.

The hub has a clear scope, and the contributor guide names it. We are not building skills that produce essays, exam answers, or thought labor on the user's behalf. The skills we publish coach, reformat, and scaffold—they presume the user has the source material, the question, the work, and that what they want help with is the procedural part. The mechanical, the administrative, the templated.

This is a values boundary, not a technical one. We are a library, and our work has always been about making people more capable of their own thinking, not less.

**A librarian's framing**

There is an older form on campus this hub is descended from, even if it isn't always recognized. The library guide, or LibGuide, is the genre librarians have used for a long time to compact the things people keep asking about, the workflows experts reach for, the curated path through a subject. A skill, in our reading, is a LibGuide an agent can execute.

This frames the work for us in a way we have found useful. We are not, primarily, building software. We are doing something closer to journalism, or to archival fieldwork — sitting with experienced practitioners, recording what they do and how they do it, and turning that record into a document a future user (human or otherwise) can consult. The output happens to be machine-readable.

Not every workflow wants to be a skill. Some procedural knowledge is inseparable from the relationship in which it is taught, and writing it down would flatten it. Part of the work is knowing the difference.

**What remains uncertain**

We do not yet know how far this approach scales, and we want to say so plainly.

We do not know how large a skill can be before its consistency degrades. Resume coaching is a useful test case: the work for a private-sector clerkship and the work for a public-interest fellowship genuinely diverge. We are running both as a single skill with branching, and as two specialized skills, and we do not yet know which will produce better outcomes at scale.

We do not know how portable skills are across disciplines. A faculty-feedback skill that works for a 1L torts course may or may not work in a humanities seminar or a wet-lab science. We suspect some skills are portable and some are deeply local; we cannot yet tell you which are which.

These are open questions, not rhetorical ones. The hub is a hypothesis, and the next year of work is testing it.

**An invitation**

For now, we have a basic site, a public repository, and a small but growing set of example skills. We are continuing to refine what is already there, add new skills, and learn where the approach holds and where it begins to fray.

We are hoping to talk with more people who are willing to share procedural knowledge with us. Sometimes that means a formal contribution. Sometimes it means an issue or a pull request. Sometimes it just means a conversation where we record how someone thinks through a recurring task, what they notice, what they warn against, and what they have learned.

If you are an institution thinking about something like this on your own campus, we would rather collaborate than duplicate. The hub's value grows if other libraries are stewarding their own skills.

We'd love for you to take part.
