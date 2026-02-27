---
title: Launching the Agent Protocols Tech Tree
author: jack-cushman
tags:
- Tools
---
[![Agent Protocols Tech Tree](https://lil-blog-media.s3.amazonaws.com/aptt.png)](https://harvard-lil.github.io/agent-protocols/)

Today I am sharing the [Agent Protocols Tech Tree](https://harvard-lil.github.io/agent-protocols/). APTT is a visual, videogame-style tech tree of the evolving protocols supporting AI agents.

**Where did this come from?**

I made the APTT for a session on "The Role of Protocols in the Agents Ecosystem" at the *Towards an Internet Ecosystem for Sane Autonomous Agents* workshop at the Berkman Klein Center on February 9th.

It's a video game tech tree because, while the word "protocols" is boring, the *phenomenon* of open protocols is fascinating, and I want to make them easier to approach and explore.

**What is an open protocol? Why care about them?**

An open protocol is a shared language used by multiple software projects so they can interoperate or compete with each other.

Protocols offer an x-ray of an emerging technology — they tell you what the builder community actually cares about, what they are forced to agree on, what is already done, and what is likely to come next.

Open protocols go back to the founding of the internet when basic concepts like "TCP/IP" were standardized — not by a government or company creating and enforcing a rule, but by a community of builders based on "rough consensus and running code." On the internet no one could force you to use the same standards as everyone else, but if you wanted to be part of the same conversation, you had to speak the same language. That created strong incentives to agree on protocols, from SMTP to DNS to FTP to HTTP to SSL. By tracing each of those protocols, you could see the evolving concerns of the people building the internet.

(For a great discussion of that history, see "[The Battle of the Networks](https://yupnet.org/zittrain/2008/03/01/chapter-2-battle-of-the-networks/)" from LIL faculty director Jonathan Zittrain's book "The Future of the Internet — and How to Stop It.")

**Why are protocols so important for AI agents?**

Like the early internet, AI agents today are an emerging, distributed phenomenon that is changing faster than even experts can understand. We're holding workshops with names like "Towards an Internet Ecosystem for Sane Autonomous Agents" because no one really knows what it will mean to have millions of semi-autonomous computer programs acting and interacting in human-like ways online.

Also like the early internet, it's tempting to look for some government or company that is in charge and can tame this phenomenon, set the rules of the road. But in many ways there isn't one. The ingredients of AI agents are just not that complex or that controlled.

This makes sense if you look at Anthropic's definition of an agent, which is simply "[models using tools in a loop](https://simonwillison.net/2025/May/22/tools-in-a-loop/)." That is not a complex recipe: it requires a large language model, of which there are now many, including powerful open source ones that can run locally; a fairly small and simple control loop; and a set of "tools," simple software programs that can interact with the world to do things like run a web search or send a text message. "Agents" as a phenomenon are a *technique*, like calculus, not a *service*, like Uber.

That makes agents hard to regulate, and  makes protocols incredibly important. It is protocols that give agents the tools they use. It is protocols that the builder community are developing as fast as they can to increase what agents can do. If you want to nudge this technique toward human thriving, it is protocols that might most shape agent behavior by making some agents easier to build than others.

To be sure, protocols aren't the only way to influence technological development. Larry Lessig's classic "[pathetic dot theory](https://en.wikipedia.org/wiki/Pathetic_dot_theory)" outlines markets, laws, social norms, and architecture as four separate ways that individual action gets regulated, and protocols are just an aspect of architecture. But the more a technology is dispersed and simple to recreate, the more protocols come into play in how it evolves.

**How do I use the APTT?**

APTT is designed to be helpful whether you're a less-technical person who just wants to understand what agents are, or a more technical person who wants to understand exactly what's getting built.

Either way the pile of agent technologies is confusing, so I recommend starting at the beginning with "[Inference API](https://harvard-lil.github.io/agent-protocols/#inference-api)."

[![Inference API](https://lil-blog-media.s3.amazonaws.com/inference-api.png)](https://harvard-lil.github.io/agent-protocols/#inference-api)

Video games are often designed so you start with a simple feature unlocked and then progressively unlock more and more complex options as you learn the game. The same approach works here: imagine that you have just unlocked "Inference API" in this game, and once you're comfortable with that, explore off to the right to see how each protocol enables or necessitates the next.

You can click each technology to learn what problem it solves (why did people need something like this?), how it's standardizing (who kicked this off?), and what virtuous cycle it enabled (why did other people want to get on board?).

You can also see visual animations of how the protocol is used — what messages are actually sent back and forth between who?

![Inference API animation](https://lil-blog-media.s3.amazonaws.com/how-it-works.png)

If you're interested in the technical details, you can click any of the messages to see at a wire level what's actually happening. (Often, something simpler than it sounds.)

![Inference API messages](https://lil-blog-media.s3.amazonaws.com/wire-level.png)

As you move off to the right, you'll go from widely adopted technologies, like MCP, to technologies that have commercial supporters but not much social proof yet, like Visa TAP, or technologies that don't even exist but might make sense in the future, like Interoperable Memory, Signed Intent Mandates, or Agent Lingua Franca.

The ragged edge on the right is where I hope you'll be the most critical: what seems inevitable, what seems like a dead end, and what would you like to see more of?

**How accurate is all of this? How do I fix mistakes?**

APTT is a work in progress, and to be honest in many ways is a whiteboard sketch. I put it together (and vibe coded much of it) to help support a conversation, first at the workshop and now online. I think whiteboard sketches are useful, so I'm sharing it, but I don't pretend it's authoritative; it's just my rough sense of how things work right now.

(This is a weird thing about the agentic moment — my coding agent has made this tool look more polished and complete than it may really deserve. Think napkin sketch with fancy graphics.)

If you think I got things wrong or missed part of the story, please [open an issue on the GitHub repository](https://github.com/harvard-lil/agent-protocols/issues). I plan to keep this rough and opinionated, and focused on consensus-driven protocols as a lens for understanding what's happening — so I'll either pull contributions into the main tool, or just leave them as discussions to represent the range of opinions about how all of this works. I hope it's fun to play with either way.
