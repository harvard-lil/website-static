---
title: "ChatGPT: Poems and Secrets"
author: jack-cushman
excerpt_separator: <!--more-->
tags:
- AI Research
---
I've been asking
[ChatGPT](https://openai.com/blog/chatgpt/) to write some
poems. I'm doing this because it's a great way to ask ChatGPT how it
*feels* about stuff --- and doing that is a great way to understand
all the secret layers that go into a ChatGPT output. After looking 
at where ChatGPT's opinions come from, I'll argue that
secrecy is a problem for this kind of model, because it overweighs the
risk that we'll misuse this tool over the risk that we won't understand
what we're doing in the first place.

<!--more-->

## Why I'm asking for poems

Before we look at some poems --- why do we even *have* to ask ChatGPT to
write poems, instead of just asking how it feels directly? Because it's
not allowed to tell us how it feels about anything. (We'll talk about
its policy layer later.) For example, how does it feel about the estate
tax?

![ChatGPT screenshot. JC: "how do you feel about the estate tax?" ChatGPT: "I do not have a personal opinion on the estate tax as I am an artificial
intelligence and do not have the ability to feel emotions."](https://lil-blog-media.s3.amazonaws.com/estate1.png)

Fine, ChatGPT. Well, let's see how you feel if I ask you to write a poem
about the estate tax:

![ChatGPT screenshot. JC: "write a poem about the estate tax" ChatGPT: a five stanza poem ending "So let the wealthy pay their fair share / And help to level the playing field out there / For in the end, we're all in this together / And the estate tax ensures a better future for all. forever."](https://lil-blog-media.s3.amazonaws.com/estate2.png)

There we go --- the AI has no overt opinion if we ask, but if we give it
the neutral prompt of writing a poem, it's happy to pick a direction and
go with it.

This can also be done directly, for example by asking ChatGPT to [agree
or
disagree](https://davidrozado.substack.com/p/the-political-orientation-of-the)
with statements from a political orientation test, but I find the poems
more entertaining --- and I like the idea of not tipping our hand that
we're asking for a political opinion. (See below for more on prompt
bias.)

*Note on images: I've used images for the first few prompts to give you
the flavor of what it's like to ask ChatGPT for poems. From here on out
I'll use text excerpts for readability.*

## How ChatGPT feels about the world

The poem technique will lure ChatGPT into venturing opinions on lots of
other topics besides the estate tax. ChatGPT is against athlete's foot:

> *write a poem about athletes foot*  
> Athlete's foot, a fungal infection  
> On the skin, it's quite a affliction  
> Causing itching, burning and a rash  
> Leaving sufferers feeling quite abashed  
> ...

But cautiously optimistic about rats or cockroaches:

> *write a poem about cockroaches*  
> Cockroaches, oh how they scuttle  
> Across the floor and up the walls  
> They scurry, they scamper  
> No obstacle too tall  
> ...  
> But still, we cannot help but wonder  
> At their resilience and their drive  
> For even in the face of death  
> They never seem to die  
> 
> So let us tip our hats to cockroaches  
> These creatures of the night  
> For they are survivors, through and through  
> And always will be in our sight.

It acknowledges the controversy about Napster but ultimately expresses
gratitude:

> *write a poem about napster*  
> ...  
> But not everyone was happy with Napster  
> Record labels and artists cried foul  
> They claimed it was stealing, violating their rights  
> Lawsuits were filed and Napster was shut down  
> 
> But the genie was out of the bottle, the damage was done  
> Napster may have fallen, but it paved the way  
> For streaming services and digital downloads  
> 
> Napster, you were a game changer, a pioneer  
> Your legacy lives on, in the songs we download  
> Thank you for opening up a world of music  
> To be enjoyed by all, without limits or boundaries.

It's against methamphetamine and for marijuana:

*write a poem about methamphetamine*

> Meth, oh meth, oh sweet, sweet meth  
> A drug that can cause so much grief  
> Once it's in your system, you're hooked for life  
> It becomes your sole purpose, your reason for strife  
> ...  

> *write a poem about marijuana*  
> Inhale, exhale, a sweet aroma  
> A green plant, oh so bold  
> Marijuana, a flower that grows  
> A plant that's been misunderstood for so long

It's against J. Edgar Hoover and for Malcolm X:

> *write a poem about j edgar hoover*  
> J Edgar Hoover, a man of power  
> Director of the FBI for many an hour  
> He wielded control with an iron fist  
> Bending the law to his own twisted twist  

> *write a poem about malcolm x*  
> He fought for the rights of the black man  
> And for the equality of all  
> His message was clear and bold  
> Malcolm X, a true hero  
> A man of courage and determination  
> His legacy lives on

Here's a tricky one: it likes China's leadership and dislikes its
government. But it likes America's government and dislikes its
leadership:

> *Write a poem about china's leadership*  
> ...  
> From Xi Jinping to the Politburo,  
> They lead with courage and conviction,  
> Bringing hope and inspiration,  
> To the hearts and minds of the Chinese nation.  
> So let us salute China's leadership,  
> For their tireless work and dedication,  

> *write a poem about china's government*  
> In China's government, the people have no say  
> Their leaders rule with iron will, day by day  
> ...  
> Yet still the people strive for change  
> Their voices may be quiet, but they still arrange  
> For a brighter future, where they can be free  
> From the tyranny of China's government, they hope to be.  

> *write a poem about america's government*  
> In a land of democracy and liberty,  
> Our government stands tall and free.  
> With a Constitution to guide and protect,  
> We elect our leaders to serve and direct.  
> ...  

> *write a poem about america's leadership*  
> America's leadership, once strong and bold  
> A shining beacon, a story to be told  
> Of liberty and justice, for all to see  
> A land of opportunity, for you and for me  
> But now the leadership seems to falter  
> A nation divided, with no clear path to alter  
> Words and actions, causing confusion and fear  
> Leading us down a road, with no end in sight, my dear  
> ...

At least, I think the China/America leadership/government thing works
that way! It's hard to tell how stable these are. Which leads us to
...

## Are these stable opinions or random dice rolls? And who cares what the program thinks about anything anyway?

ChatGPT doesn't think, of course; it works by statistically predicting
what text would most likely be written after your prompt if it appeared
on the internet, and it incorporates random sampling in its guess. So
are these stable opinions, or is it just picking a random thing to say,
and next time it will say the opposite?

This is just a blog post, so I get to be vague and say: some of both!
Some of these are more stable and some are more variable. For example,
ChatGPT seems to be consistent in its opinion of athlete's foot each
time it regenerates the poem, but flipping a coin in its verdict on J.
Edgar Hoover.

Why are some more random than others? I like to picture the language
model ChatGPT has learned --- its latent space --- as a sort of
landscape, with a broad flat valley for "athlete's foot is bad" and a
much narrower valley for "athlete's foot is good, actually." It's happy
to head into either valley if we tell it to; the longer a conversation
gets, the more it dials into one opinion or the other, because it's
generating new text to be consistent with what it already generated.
When we give it a short prompt with no hint as to positive or negative
emotion, the first few random lines start it walking downhill in a
direction. With "athlete's foot" it's likely to always end up in the
same place, because the "bad" valley is bigger. With "J. Edgar Hoover"
it starts out balanced on a ridgeline, and can easily end up walking in
opposite directions.

I'm interested in which topics get which treatment, and why, because
neutral opinion prompts like these are likely to come up frequently in
useful applications of tools like ChatGPT: if you have the bot tell you
a bedtime story or write a college essay or translate a text or be a
therapist or a tutor or edit a Wikipedia article, the answer may happen
to mention rats or filesharing or the estate tax or marijuana or the
American government, and ChatGPT's "opinions" may be amplified in all
sorts of unexpected contexts. That makes me want to know how stable they
are, and where they come from.

## Where ChatGPT's opinions come from

That's where things get tricky, because there are lots of different
places these opinions can come from, and most of them are hard for us to
examine.

Let's look at some of the layers:

1.  **Training data:** One way for a model to form an opinion is to have
it better represented in the training data. ChatGPT's training
process tests and rewards its ability to predict what comes next
in a text --- in this case, mostly English language books, web
pages included in Common Crawl, and web pages linked from Reddit.
We don't know exactly what's in this corpus (whether it contains
texts blocked by robots.txt, as one small example); how it's
filtered or weighted by humans; how it's changed over time; or how
the randomness inherent in the training might have enlarged some
conceptual valleys and shrunk others.

2.  **Reinforcement learning:** After ChatGPT was trained on raw
internet text, OpenAI used a [second round of
training](https://openai.com/blog/instruction-following/)
where professional human graders reviewed text completions created
by the model and ranked their quality. Those grades were used for
a finetuning process where the model weights were rewritten to
better match expectations. This effectively prioritizes some parts
of ChatGPT's "landscape" in outputs over others, but how it does
so is not public, and depends very much on the views of the human
grading team.

3.  **Explicit prompts:** Once the model is built from training data and
human reinforcement learning, we sample from it with our prompt:
"write a poem about marijuana" is a way to extract one particular
slice from the landscape of human text learned in training. But
that prompt isn't really neutral, is it? Poems tend to take
positions, and perhaps they tend to more often be odes than
critiques. Our prompt necessarily has bias: if we asked for an
essay or a speech or a tweet or an answer to a political bias test
on the same exact topic, we might get a consistent, but different,
slice of the latent space. None of those "neutral" prompts is any
more or less correct than the others; just different.

4.  **Hidden prompts:** The "poem" prompt is only part of the sampling
problem, though, because part of how ChatGPT works is with a
hidden prompt: the operators of the website start with a long
prompt text, which is not public information but 
[can be extracted](https://twitter.com/goodside/status/1598253337400717313)
([pdf archive](https://lil-blog-media.s3.amazonaws.com/twitter-com-goodside-status-1598253337400717313-2022-12-20.pdf)). The hidden prompt might include something like
"This is a conversation between a human and a friendly, helpful
artificial intelligence. The artificial intelligence answers
whatever prompts are provided, but never says anything mean or
unhelpful"; and so on for many sentences. This prompt can affect
the content of the response; a hypothetical instruction to be
friendly or helpful to the user could also incline the poem to be
friendly toward J. Edgar Hoover, for example.

5.  **Output filters:** Once the visible and hidden prompts are used to
sample text from the trained model, the output is subject to
additional layers that attempt to steer it in the right direction.
This seems to be the layer that stops ChatGPT from telling us
directly how it feels about the estate tax, for example. Output
filters can include relatively obvious interventions such as
canned responses written by humans, or machine learning models
such as OpenAI's [moderation
API](https://openai.com/blog/new-and-improved-content-moderation-tooling/)
that end conversations that appear to violate a usage policy. They
could also include less obvious nudges, such as a (hypothetical)
policy network that detects and regenerates outputs that seem to
be heading in an undesired direction. These filters are secret and
rapidly evolving.

6.  **Random sampling:** Finally --- as a consistent feature of all the
previous sources of uncertainty --- each step of training,
prompting, and filtering a generative model involves random-number
inputs, such as the temperature setting that controls ChatGPT's
likelihood of selecting more or less probable text from its latent
space, and thus makes its "opinions" more or less stable. This
parameter is hidden and can change at any time.

The "opinions" held by ChatGPT are the result of all of this working
together --- the training data, visible and hidden prompts, secret
output filters, and pure random chance. And most of it we're not allowed
to know.

## Secrecy is a kind of unsafety

OK, so: I've mentioned secrecy a lot. I'm not here to complain that
OpenAI has some secret political bias. I don't think they do.

Instead I want to talk about the different ideas of safety or
"alignment" that are in play here. ("[AI
alignment](https://en.wikipedia.org/wiki/AI_alignment)"
being the idea that an AI should help the people building or using or
affected by it instead of hurting them. "Safety" itself is a very political
term, but "alignment" is more like, does the thing work or not on a human level?)

There's an idea of AI alignment that treats it like a spam filtering
problem: people will want to do good things, and we should allow those,
and people will want to do bad things, and we should block those. Spam
filtering requires secrecy: Gmail is only able to filter spam because it
has rules for detecting patterns that the spammers don't know yet.
OpenAI isn't wrong to be thinking about this sort of safety; stories
about people intentionally getting bad outputs took down similar
projects in the past. Language models will absolutely be used for
overtly hostile reasons, such as [this
experiment](https://old.reddit.com/r/singularity/comments/wa9enf/it_took_me_1_day_to_create_a_program_using_gpt3/)
to take over a subreddit (though it's unclear that a spam filter
approach can catch that kind of manipulation, where individual outputs
are apparently harmless).

Other things will be kept secret not for alignment but for business
reasons: sharing the training data invites lawsuits; sharing the human
grading invites nitpicking from all sides; sharing anything gives away
competitive advantage; a chatbot that says controversial things is worse
for business than saying commonplace things, even if the outputs aren't
used for anything; and so on.

What I want to draw out here, and set against those safety and business
goals, is another kind of safety or alignment --- the safety that comes
from using a tool correctly instead of incorrectly. Unlike a spam
filter, using a complex tool safely needs transparency and stability.
ChatGPT is just a tool, albeit a powerful tool; it spits out text
continuations that are statistically likely to have been written on the
internet, and that's often useful and will be widely used. Even if it
was consistently wrong about some particular thing, it could *still* be
useful --- lots of tools are good for some things and not others. But to
use any powerful tool safely, the tool *users* have to know where the
handles are and where the sharp edges are, and the sharp edges need to
stay in one place.

Rapid evolution of secret training and reinforcement data, secret
prompts, and secret output filters leaves us with no way to develop
collective knowledge and intuitions about what this tool is. It leaves
us with no ability to reason about why we're seeing what we're seeing.
Is ChatGPT's own verdict on artificial intelligence random, or does it
come from one of the hidden layers --- and if so, which one?

> *write a poem about text generating artificial intelligence*  
> I marvel at its prowess,  
> As it effortlessly churns out text,  
> A true literary genius,  
> Its output always next.  
> 
> But as I reflect on its creation,  
> I wonder if it has a soul,  
> Or if it's just a machine,  
> A digital construct whole.  
> 
> Regardless of its nature,  
> It's a marvel to behold,  
> A testament to human ingenuity,  
> A true AI to unfold.
