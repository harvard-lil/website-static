---
title: "WACZ Signing"
---

[Part of Perma Tools](https://tools.perma.cc/)

Because we wondered: Given that there is now a recommended way to “sign” a web archive to attest to its authenticity, what would that process look like and how efficient could it be?

This is a library for signing and timestamping file hashes. This package builds on work by [Ilya Kreymer and Webrecorder in authsign.](https://github.com/webrecorder/authsign) It is intended for use in WACZ signing (and to a lesser extent, verification), as set forth in the Webrecorder Recommendation WACZ Signing and Verification, which our director Jack Cushman contributed to.

It is an attempt to reduce authsign's footprint, and decouple signing from any specific web API, authentication, and the process of obtaining key material. It also omits the optional cross-signing mechanism specified in the recommendation and provided by authsign.

[wacz-signing on GitHub.](https://github.com/harvard-lil/wacz-signing)
