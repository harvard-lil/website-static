---
title: Summer 2020 CAP Systems Update
author:
  - jack-cushman
  - kelly-fitzpatrick
---
Today we’re sharing an update to [Caselaw Access Project](https://case.law/) systems. This change shows one way libraries can support access to large datasets at low cost. Here’s how we did it. 

Unlike many services that run in the cloud, CAP runs on bare-metal servers. Running on bare metal solves two problems for us as a nonprofit: it gets us faster servers for less money, and it means we can offer high-traffic or CPU-intensive services to our users without risking an unexpected bill at the end of the month.

In the last few weeks we moved our main server to a new 64-core CPU with all-SSD storage. As long as we were doing that, we took the opportunity to upgrade our stack from Debian 9 to Debian 10, Python 3.5 to 3.7, Postgres 9.6 to 11, and Elasticsearch 6 to 7, as well as updating our own software to be compatible with the new stack.

The upshot is that our most resource-intensive tasks, like citation extraction, bulk exports, and rebuilding our search index now run about 20 times faster than they did a few weeks ago. This helps us move large amounts of data more quickly, for less money. We're looking forward to using that faster server for new features, like custom, on-demand bulk exports for researchers. 

We like to talk about the systems behind CAP. Have questions about how CAP works? [Let us know](https://case.law/contact/)! 
