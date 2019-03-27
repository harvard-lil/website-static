---
title: Some Thoughts on Digital Preservation
author: ben-steinberg
---
One of the things people often ask about [Perma.cc](https://perma.cc/)
is how we ensure the preservation of Perma links. There are some
answers in Perma's documentation, [for example](https://perma.cc/about):

> Perma.cc was built by Harvard’s Library Innovation Lab and is backed
> by the power of libraries. We’re both in the forever business:
> libraries already look after physical and digital materials — now we
> can do the same for links.

[and](https://perma.cc/docs/faq):

> How long will you keep my Perma.cc Links?
>
> Links will be preserved as a part of the permanent collection of
> participating libraries. While we can't guarantee that these records
> will be preserved forever, we are hosted by university libraries that
> have endured for centuries, and we are planning to be around for the
> long term. If we ever do need to shut down, we have laid out a
> detailed [contingency plan](https://perma.cc/contingency-plan) for
> preserving existing data.

The [contingency plan](https://perma.cc/contingency-plan) is worth
reading; I won't quote it here. (Here's a
[Perma link to it](https://perma.cc/FWF3-F8YU), in case we've updated
it by the time you read this.) In any case, all three of these
statements might be accused of a certain nonspecificity - not as who
should say vagueness.

I think what people sometimes want to hear when they ask about
preservation of Perma links is a very specific arrangement of
technology. A technologically specific answer, however, can only be
provisional at best. That said, here's what we do *at present*: Perma
saves captures in the form of
[WARC files](https://en.wikipedia.org/wiki/Web_ARChive) to an
[S3](https://en.wikipedia.org/wiki/Amazon_S3) bucket and serves them
from there; within seconds of each capture, a server in Germany
downloads a copy of the WARC; twenty-four hours after each capture, a
copy of the WARC is uploaded to the
[Internet Archive](https://archive.org/) (unless the link has been
marked as private); also at the twenty-four hour mark, a copy is
distributed to a private
[LOCKSS](https://en.wikipedia.org/wiki/LOCKSS) network. The database
of links, users, registrars, and so on, in
[AWS](https://en.wikipedia.org/wiki/Amazon_Web_Services), is
snapshotted daily, and another snapshot of the database is dumped and
saved by the server in Germany.

Here's why that answer can only be provisional: there is no digital
storage technology whose lifespan approaches the centuries of
acid-free paper or microfilm. Worse, the systems housing the
technology will tend to become insecure on a timescale measured in
days, weeks, or months, and, unattended, impossible to upgrade in
perhaps a few years. Every part of the software stack, from the
operating system to the programming language to its packages to your
code, is obsolescing, or worse, as soon as it's deployed. The
companies that build and host the hardware will decline and fall; the
hardware itself will become unperformant, then unusable.

Mitigating these problems is a near-constant process of monitoring,
planning, and upgrading, at all levels of the stack. Even if we were
never to write another line of Perma code, we'd need to update
[Django](https://www.djangoproject.com/) and all the other
[Python](https://www.python.org/) packages it depends on (and a Perma
with no new code would become less and less able to capture pages on
the modern web); in exactly the same way, the preservation layers of
Perma will never be static, and we wouldn't want them to be. In fact,
their heterogeneity across time, as well as at a given moment, is a
key feature.

The core of digital preservation is institutional commitment, and the
means are people. They require dedication, expertise, and flexibility;
the institution's commitment and its staff's dedication are constants,
but their methods can't be. The resilience of a digital preservation
program lies in their careful and constant attention, as in the
commonplace, "The best fertilizer is the farmer's footprint."

Although I am not an expert in digital preservation, nor well-read in
its literature, I'm a practitioner; I'm a librarian, a software
developer, and a [DevOps](https://en.wikipedia.org/wiki/DevOps)
engineer. Whether or not you thought this was fertilizer, I'd love to
hear from you. I'm
[bsteinberg@law.harvard.edu](mailto:bsteinberg@law.harvard.edu).
