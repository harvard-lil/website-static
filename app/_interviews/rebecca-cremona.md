---
layout: interview
title: Rebecca Cremona
slug: rebecca-cremona
image: rebecca-cremona.png
bio: >
  Rebecca Cremona is Senior Software Engineer at the Library Innovation Lab at Harvard Law School and lead engineer of the <a href="http://Perma.cc" target="_blank">Perma.cc</a> project.
date: 2025-01-20
quote-card: "I would assemble a huge panel of staff from all kinds of backgrounds and all kinds of geographies to try and curate what we were trying to save for a century or not."
custom-css: ['interview-series']
---

<div class="speaker-label">Interviewer</div>
<p>If you were given unlimited funding to design a system for storing and preserving digital information for at least a century, what would you do?</p>

<div class="speaker-label">Rebecca Cremona</div>
<p>Oh wow. First of all, I know this would be controversial, but I would assemble a huge panel of staff from all kinds of backgrounds and all kinds of geographies to try and curate what we were trying to save for a century or not.</p>

<p>I know that with unlimited funding it's easy to say, sure, maybe we could keep everything, but I don't believe it. I think that if you have everything, you have nothing. It's all the grains of sand at the beach. I think keeping things that have been deemed to matter matters. And I know that some of those judgment calls are going to be wrong, and we're going to keep things that we shouldn't keep, and we're going to lose things that we shouldn't, but I still think those decisions are essential to the process.</p>

<p>If we're talking about a century, we're talking about humans taking care of something that they care about. So I would want the best imaginable team deciding what we should keep. That's where I'd put all the money and then I feel the rest of it would be essentially trivial.</p>

<div class="speaker-label">Interviewer</div>
<p>You've spent a fair amount of time designing, making and maintaining tools intended for preservation, which is a very particular use case. How do you approach designing and maintaining software where preservation is the end product?</p>

<div class="speaker-label">Rebecca Cremona</div>
<p><a href="/generational-data-interviews/che-wei-wang-taylor-levy/" class="editor-note-link" target="_blank">My career in working with this kind of software has been as a maintainer and enhancer.</a><span class="editor-note">Maintainers - people who tend to the systems, tools, and artifacts of our memories - were often pointed to as a key part of 100 years of storage. Habitual work to keep software going is almost a ritual. Che-Wei and Taylor talked about other ways ritual could increase our chances of keeping history for centuries.</span> Other people have started a thing, they've had the spark, they've had the magic, they've had the mandate and the money, and then they get it to a certain point. They get it so that it does a thing but then you have to spend a lot of time making that process reliable, making it dependable, making not just the demonstration, but the rest of it. I've been primarily doing that. With Perma.cc, that means reading a lot of weird stack traces and, or finding out that like Equifax has a specific way of doing SSL that they sold, and then the result means that 8% of websites can be captured that weren't before. I've been doing much less of the designing how it ought to be and much more of the filling in the cracks.</p>

<p>Something that LIL has been doing a bit differently than some other web archives is really focusing on library values when producing our software. So, for instance, if you want a really good high fidelity playback of a YouTube video, you can't just record what you got from YouTube, you have to change it to play it back.</p>

<p>We don't do that. We don't change the ground record of exactly what was available on the public web. That is more important to us than the user experience of playing it back afterwards. So even if you get a web archive file that won't do the thing that you wanted to do, you can confidently say "oh your videos in there, you have to do work to get it out, but we didn't manipulate it."</p>

<div class="speaker-label">Interviewer</div>
<p>I'd love to know how you think about trust, trusting a user, or trusting a community to figure something out. When is it safe to trust outside or future forces that interact with a system, and when do you need to hold their hand?</p>

<div class="speaker-label">Rebecca Cremona</div>
<p>Unlike the Internet Archive, or unlike some of the National Archives, Harvard University was not given a mandate to collect the entire internet. Perma wants to enable libraries to enable people to preserve stuff they need for what they're publishing. So individual registrars, individual libraries, and individual universities can partner with us and keep what they need. And that could be malware! Initially Harvard was freaking out, they're like no we need you to run scans on everything and we're like no, what if a scholar wants to know that this website was hacked on a specific day while serving a specific thing? We're going to preserve that.</p>

<div class="pull-quote">Every web thing is a live performance of actors for you in the moment. It can never be repeated.</div>

<p>We have public links and private links. You can see private links if you have the right credentials to do so you can preserve ugly things. Maybe that's the point of your study. That's trusting users. So, if we're working with a trusted partner who says I enable my scholars to save what they need for their research, if they are preserving porn, it's for a reason, it's for a publication purpose. So we'll hold that in our collection, and therefore will hold it in the Harvard Libraries collection in perpetuity, just like the Harvard Widener library has an excellent sex and drugs book collection. It's there for a reason.</p>

<div class="speaker-label">Interviewer</div>
<p>How do we preserve the web specifically for long periods of time? It's an unusual artifact, because it isn't just the individual pages, it's the connections to everything else at that moment. It seems impossible to preserve the experience of how all these things related to each other at a precise moment in time.</p>

<div class="speaker-label">Rebecca Cremona</div>
<p>A website, we call it a site, you know, a place. It's not really like a page. Every web thing is a live performance of actors for you in the moment. It can never be repeated. It can be the same script, the same venue, but it's never the same.</p>

<p>That's what most people want right now when they visit a web archive, another performance of exactly what they saw. Something that Perma does that I really like is inside the artifact that we produce, we try to stuff other file formats. So, you can get the page, but you also get a screenshot. So, you can't interact with it, but it's at least an exact visual, that's what it looked like in our headless browser at that instant in time. You also get a PDF, you also get a DOM snapshot, the HTML all written out, how it was rendered. Live replay is a complicated thing. It's probably not going to last a hundred years in a lot of cases. What you're trying to preserve is the memory, not the artifact. You don't need the thing, you need the memory of the thing.</p>
