---
title: The Network Librarian
author: ben-steinberg
---
Last year,
[Jack Cushman](https://lil.law.harvard.edu/about/#jack-cushman)
expressed a desire for a personal service similar to the one I perform
here at LIL -- not exactly the
[DevOps](https://en.wikipedia.org/wiki/DevOps) of my job title, but
more generally the provision and maintenance of network and computing
infrastructure. Jack's take on this idea is very much a personal one,
I think: go to a person known to and trusted by you, not the
proverbial faceless corporation, for whom you may be as much product
as customer.

(I should say here that what follows is my riff on our discussions;
errors in transmission are mine.)

As we began to discuss it, it struck me that the idea sounded a lot
like some of the work I used to do as a reference librarian at the
[Public Library of Brookline](https://www.brooklinelibrary.org/). This
included some formal training for new computer users, but was more
often one-on-one, impromptu assistance with things like signing up for
a first email account.

Jack's idea goes beyond tech support as traditionally practiced in
libraries, but it shares with it the combination of technical
knowledge, professional ethics -- especially the librarian's rigorous
adherence to patron confidentiality -- and the personal relationship
between patron and librarian.

At LIL, we like naming things whether or not there's actually a
project, or, as in this case, before there's even a definition. In
order not to keep talking about this vague "idea," I'll bring out the
provisional name we came up with for the role we're beginning to
imagine: the network librarian.

The network librarian expands on traditional tech support by
consulting on computer and network security issues specifically; by
advising on self-defense against surveillance where possible and
activism where it isn't; and in some cases going beyond the usual help
with finding and accessing resources, to providing resources
directly. Finally, the practice should expand what's possible -- in
developing the kinds of self-reliance a network librarian will have to
have, the library itself will become more self-reliant and less
dependent on vendors.

One of the specific services a network librarian might provide is a
[virtual private network](https://en.wikipedia.org/wiki/Virtual_private_network),
or
VPN. [This article](https://arstechnica.com/gadgets/2017/05/how-to-build-your-own-vpn-if-youre-rightfully-wary-of-commercial-options/)
explains why a VPN is important and why it's difficult or impossible
to evaluate the trustworthiness of commercial VPN providers. It goes
on to explain how to set up a VPN yourself, but it's not trivial. What
the network librarian has to offer here is not only technical
expertise, but a headstart on infrastructure, like an account at a
cloud hosting provider. As important, if not more so, is that you know
and trust your librarian.

I've made a first cut at one end of this particular problem in setting
up a [WireGuard](https://www.wireguard.com/) server with
[Streisand](https://github.com/StreisandEffect/streisand), a neat tool
that automates the creation of a server running any of several VPNs
and similar services. Almost all of my home and phone network traffic
has gone through the WireGuard VPN since August, and I've distributed
VPN credentials to several friends and family. Obviously, that isn't a
real test of this idea, nor does it get at the potentially enormous
issues of agreement, support, and liability you'd have to engage with,
but it's an experiment in setting up a small-scale and fairly robust
service for small effort and little money.

Even before providing infrastructure, the network librarian would
suggest tools and approaches. I'd do the work I used to do differently
now -- for example, I'd strongly encourage a scheme of multiple
backups. I'd be more explicit about how to mitigate the risks of using
public computers and wireless networks. I'd encourage the use of
encryption, for example via [Signal](https://www.signal.org/) or
[keybase.io](https://keybase.io/). I would sound my barbaric yawp for
the use of a password manager and
[multi-factor authentication](https://en.wikipedia.org/wiki/Multi-factor_authentication).

Are you a network librarian? Do you know one? Do you have ideas about
scope, or tools? Can you think of a better name, or does one already
exist? Let me know -- I look forward to hearing from you. I'm
[bsteinberg@law.harvard.edu](mailto:bsteinberg@law.harvard.edu).
