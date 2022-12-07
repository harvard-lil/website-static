---
title: Ethical Collaborative Storytelling
author: liza-daly
excerpt_separator: <!--more-->
---
I started with the idea of a computer-generated story in which audience participation creates copies of the narrative from each person’s point of view. The story would evolve in real time as new users joined and each person’s copy would update accordingly. I called the story *Forks*. After some initial trials, I decided not to launch it because I did not believe the project was securable against harm.

The framing plot was this: A person begins a journey to a new home. They forge a trail through the landscape that subsequent travelers can follow. Each person has a set of randomly-assigned traits: a profession, a place where they live, a time of day when they join the procession, and a type of item they leave behind for others to follow their path. They may directly follow the original traveler or a later traveler. At the end of the story, the total number of travelers are described as having arrived at their new home.

A generated story would look something like this:

<!--more-->

> **Preface**
> <br>
> You started this journey over two days ago. You left from your home in the village. It was a rainy day. To help others follow you, you lay a winding path of dunhouse blue cobblestones.

> **Chapter 1**
> <br>
> *The path was laden with primrose and titanium.*
> 
> user1 observed you passing through the inlet where they lived. They chose to follow you. They set out on a light day and followed the cobblestone path laid by you until it ran thin. As they walked in your footsteps they marked a fresh path with a shiny trail of titanium coins. 
> 
> user2 observed you passing through the mountaintop where they lived. They chose to follow you. They set out on a damp day and followed the cobblestone path laid by you until it ran thin. As they walked in your footsteps they marked a fresh path with delicate plantings of primrose flowers.

If some user had followed a follower rather than the original user, a new chapter would be generated:

> **Chapter 2**
> <br>
> *The path was laden with bronze.*
> 
> user3 observed user2 passing through the forest where they lived. They chose to follow them. They set out on a light day and followed the path of primrose laid by user2 until it ran thin. They marked a fresh path with a shiny trail of bronze coins. 

Hyperlinks would take the reader to a version of the story as told from the perspective of that user, who would witness events from the point at which they joined, but not before. User3’s version would show that they knew about user2, but not any of the earlier travelers:

> Yesterday, user2 passed through your forest. They told you they'd followed a sturdy path of dunhouse blue cobblestones until the stones ran out. user2 continued the path by planting thin rows of primrose flowers, which you began to follow. You left behind a fresh trail of bronze coins.

The story could end up looking quite different depending on the depth of the tree–did everyone follow the starting user, or did most people follow a follower? How many times did the trail of followers split into forks?

**Changing narratives**

This isn’t a new idea. Exquisite corpse-style works where user input is incorporated into the narrative can be dated back at least to *[The World’s First Collaborative Sentence](https://www.google.com/url?q=https://whitney.org/artport/douglas-davis&sa=D&source=docs&ust=1670434841867062&usg=AOvVaw0qQ1U7XZB9eZR99rfD1jGo)* (1994) by Douglas Davis, which is still live and currently ends with, “CAN WE NOT WORK TOGETHER AND HELP EACH OTHER FOR F*CKS SAKE”. Digital fiction authors learned very quickly that allowing unrestricted input inevitably leads to profanity and hate speech, and Davis’s work is no exception.

Online videogames occasionally reveal the footprints of previous visitors: there are deceased players in [Nethack](https://en.wikipedia.org/wiki/NetHack) and disturbing moral choices in *[Moirai](https://www.pcgamer.com/a-brief-history-of-moirai-one-of-pcs-most-disturbing-games/)* (2013), and there have been gentler expressions like the presence in *[Ex Nihilo](https://nitku.net/if/exnihilo/)* (2013), the user-generated ales in *[Barbetween](https://emshort.blog/2014/05/17/shufflecomps-outcast-barbetween/)* (2014), and the [mutual aid system](https://screenrant.com/death-stranding-multiplayer-social-strand-system-online-build/) in *Death Stranding* (2019). Players do not always know that their activity will be visible to others; this engenders surprise but could be seen as failing to solicit informed consent.

**Technical implementation**

The principles of participation in the story, as I originally conceived of them, were:

* It should be frictionless to join.
* Users’ versions of the story should be published automatically.
* The source code for the story should be available so anyone can inspect it and see how it works.
* It should be clear how to leave the story, and be frictionless to do so.
* The story should use only a minimal amount of personally-identifiable information to support the narrative.
* Once a user has left the story, none of their personal data should be retained.

I appropriated a key feature of the source code hosting site [Github](https://github.com) which allows any user to “fork”, or copy, another code repository. Github’s service provides information about the accounts that forked the repository and the relationships between forks, and since forks can themselves be forked, a graph of repository forks can be explored like a tree. This would give me a robust data model for free, one that is inherent in the software but that I’d co-opt to express the relationships between travelers.

**Decentralization by decomposition**

In most online systems, to create a node in a network of some kind (rather than being just a user of an existing system) you need to install software somewhere on the internet, configure it, and—this is the worst part—maintain it. I’m interested in techniques that reduce that particular friction down to an act almost like destruction: tearing off a piece of a site and carrying it away, ready-made. 

The git fork concept fits this almost perfectly. Someone (the original author of the repository) does all the work of creating the technical framework, and all you have to do to carry away your own copy of it is click the “fork repository” button. For the subset of people who are already familiar with Github from their professional lives, this is a relatively smooth process.

The other appealing aspect of building a story on top of Github is how powerful and flexible the affordances are beyond its version control features. Github Pages offers free, reliable, and secure hosting for web pages that requires little setup. And Github Actions–a general purpose compute engine capable of automated and on-demand scheduling–provides an easy-to-deploy, simple to copy, highly available platform. Once a user forked *Forks*, they also inherited the mechanism to build their own copy (via Github Actions) and publish their own copy of the story (on Github Pages).

I ran a small trial of *Forks* with some colleagues and friends, since I was unsure whether there were sufficient controls available to make the project feel safe for participants. I’m glad I did.

**Safety features**

Git forks can modify the code they’ve copied–this is key to how open source software works! I thought at first this was a bonus: someone could make creative tweaks to the story at their point in the graph, and others could decide they wanted *that* version rather than mine. This could cause the story to truly fork, in which a subset of the travelers experienced a narrative that was very different.

This puts a burden on downstream users to understand those changes, and some alterations might be more obviously unpleasant than others. The source material does not have intentionally harmful behavior, I assert, and I back that assertion with my real identity and professional reputation. But anyone can fork a public repository, and by design Github gives repository owners virtually no control over forks. I cannot stop an individual from forking my repository short of [blocking them](https://docs.github.com/en/communities/maintaining-your-safety-on-github/blocking-a-user-from-your-personal-account) and even then the action is only forward-looking. A malicious fork could remain live, at least until Github trust and safety teams decide to remove it, by which point it may have already been further propagated.

I was working on *Forks* at the same time that a surge of Twitter users were moving to [Mastodon](https://joinmastodon.org) and more broadly, the [fediverse](https://www.eff.org/deeplinks/2022/11/fediverse-could-be-awesome-if-we-dont-screw-it). Many people, including me, became aware for the first time of the [fediverse principles](https://www.hughrundle.net/home-invasion/) around harm reduction and safety. 

Broadly speaking, consent in the fediverse is opt-in, not opt-out. On the commercial internet it’s safe to assume, because you implicitly agreed to some terms of service you didn’t read, that your content—your utterances, likes, pictures, and even your passive page views—are all monetizable. Short of violating copyright (but often in spite of it) if I post something publicly on Twitter I have given up any control over how it is used. There is nothing stopping someone from quoting my tweet and saying, “Look at this dummy over here.” Even if I use the affordances of the service to block them, in the worst cases I can’t stop them inciting their followers to do the same. This has a chilling effect on decent people but is no deterrent for those who thrive on attention, even if it’s negative.

**From “users” to “participants”**

In the fediverse framework, I retain a kind of moral right to my content even though it is public. I am granting you the right to read it and respond to it, but not to do other acts that might be considered reasonable elsewhere: to quote it out of context without my knowledge, or to permanently archive it without asking me, or to feed it into a machine learning algorithm. Any bad actor can violate these terms, but the community is experimenting in real time to see if it can reset decades’ of online behavioral norms in favor of individual control.

I’m not sure yet where I personally lie on the spectrum between the fediverse view and my default of learned helplessness in the face of unrelenting capitalism, but exposure to Mastodon changed my thinking about this project. I stopped referring to the people who would fork my repository as “users” and started calling them “participants”—a term which assigns them more agency and a sense of belonging to a collective whole.

I am not a product designer but I have learned from good ones to ask, “How could this feature be used to harm someone?” That’s still an important question to ask but I no longer think it’s sufficient. If I’m going to invite someone to participate in a project with me, I need extend my design principles more deeply in the direction of consent and safety:

* As the content creator, I need to be able to [monitor](https://mewo2.com/notes/bot-ethics/#:~:text=Monitor%20your%20bots.%20Keep%20track%20of%20what%20they%20do%2C%20and%20if%20you%20don%27t%20like%20it%2C%20fix%20them.%20If%20they%20can%27t%20be%20fixed%2C%20remember%20you%20can%20always%20take%20them%20down%2C%20either%20temporarily%20or%20permanently.) the project at all possible edges. This is hard with any kind of distributed system, but it’s also challenging for generative works that combine [real people and randomness](https://tinysubversions.com/notes/transphobic-joke-detection/). 
* The creator needs to have a failsafe to take the whole thing down if necessary. When I decided to abandon *Forks*, I had to individually ask everyone who forked it to delete their copy of the repo. It wouldn’t have taken much for the number of forks out in the wild to jump out of my social graph and make that impossible.
* Participants need to have total control over information they share; transparency in how that information will be used; and to not have this change once consent was granted. *Forks* made minimal use of personal data but Github makes more available and participants could have been unpleasantly surprised to find their employer details or Twitter handle used in a story. Worse, a truly malicious fork could run code as that user and expose private information about their account.
* Participants should be able to, but not be obligated to, protect each other. A single moderator cannot scale to hundreds or thousands of bad actors. A project should offer affordances for participants to identify, report, or constrain abuse even if the ultimate obligation for safety rests with the artist. 

I decided that much of what was appealing about using Github also carried too much risk. Signup friction was so low that I couldn’t screen for obvious bad actors. The structure of the story would make it trivially easy for a programmer to substitute hate speech *attributed to real participants*, an outcome I consider much worse than the crude defacement common in earlier collaborative narrative projects. Finally, the potential for virality combined with the lack of controls over forks meant that even mitigations like adding a Code of Conduct or aggressive reporting of malfeasance to Github safety teams were potentially inadequate in the worst cases.

**Stars, not forks** 

I released a simpler version of the original idea with “*[There are stars.](https://github.com/lizadaly/there-are-stars)*” It still allows low-friction participation via a single click to [star the repository](https://docs.github.com/en/get-started/exploring-projects-on-github/saving-repositories-with-stars), but does not invite participants to fork or modify it. I lost the interesting multiple-perspective angle, but it was fun to adapt the existing code quickly enough to get it out in the waning days of [National Novel Generation Month](https://github.com/NaNoGenMo/2022/issues/35), which welcomes whimsical projects of all levels of complexity and completeness.

I’d like to think that there would have been no malicious rewrites, and possibly some creative and delightful extensions of the concept. But even the less interesting Stars ended up on the [front page of Hacker News](https://news.ycombinator.com/item?id=33742518), a site whose regulars might have enjoyed bending Forks in a harmful direction just because it was there.  Maybe I’ll try the concept again sometime when I can do so with appropriate guardrails, with explicit affirmations of consent and a more nuanced way to negotiate creative additions and individual safety.
