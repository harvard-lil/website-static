---
author:
  - molly-hardy
date: 2025-12-08T16:00:00-04:00
title: Replication of Government Datasets and the Principles of Provenance
project: public-data-project
thumbnail: https://lil-blog-media.s3.amazonaws.com/Netherlands_1932-10-1_money_letter_NVPH_193_SF_reverse.jpg
tags:
  - Public Data
---

_As part of our [Public Data Project](https://lil.law.harvard.edu/our-work/public-data-project/), LIL recently launched [Data.gov Archive Search](https://lil.law.harvard.edu/data-gov-archive/). In this post, we consider the importance of provenance for large, replicated government datasets._

---

In cultural heritage collecting, objects’ histories matter; we care who owned what and when they owned it. The chronology of possession of an object through time and place is commonly referred to as “provenance.” Efforts to decolonize the archive have given new life to this age-old collecting concept, as provenance is now often at the forefront of collecting conversations: tracing how and why an object came to be placed (or displaced) in a given museum, library, or collection often is intertwined with histories of colonialism and its accompanying plunder. Projects such as [Art Tracks](https://www.museumprovenance.org), [Archives Directory for the History of Collecting in America](https://research.frick.org/directory), and [Getty Provenance Index](https://www.getty.edu/databases-tools-and-technologies/provenance/) help to record provenance information and to share it across institutions and platforms. Other projects, such as [Story Maps of Cultural Racketeering](https://theantiquitiescoalition.org/multimedia-resources/story-maps/), depict the underbelly of the trade in cultural heritage objects.

Recovery of art stolen by the Nazis, dramatized in films such as _The Monuments Men_, has brought the concept of “provenance” into the public conversation as well as the courtroom. Many of the [legal claims for restitution](https://en.wikipedia.org/wiki/List_of_claims_for_restitution_for_Nazi-looted_art) have been adjudicated based on provenance records. In legal parlance, a “chain of custody” must be established: I can’t admit evidence from a crime scene without a sealed evidence bag showing who was in possession of that evidence every step of the way.

<figure class="items-center text-center">
  <img class="h-fit w-full" src="https://lil-blog-media.s3.amazonaws.com/Monuments_Men_Neuschwanstein_Castle_Germany_1945.jpg" alt="Photograph of the Monuments Men recovering stolen art from Neuschwanstein Castle, Germany, near the end of World War II" />
  <figcaption>Monuments Men, Neuschwanstein Castle, Germany, 1945. Source: <a href="https://commons.wikimedia.org/wiki/File:Monuments_Men,_Neuschwanstein_Castle,_Germany,_1945.png">Wikimedia Commons</a>.</figcaption>
</figure>

Stories like this have been on my mind as we develop the Public Data Project. How and why could provenance of federal data matter in the future? When does digital provenance — the marrying of ownership metadata to the digital object itself — matter? Could we imagine it being used to right past wrongs, to return objects to their rightful places, to restore justice?

In the context of government data, provenance most often refers to which government agency or office produced the data. When government data was widely distributed on paper, it was nearly impossible to forge government records — too many legitimate copies existed. In the digital environment, provenance is not so straightforward. Metadata should tell us what the source of a given dataset is, and it does. But what happens when we start to copy this data and pass it from hand to hand, so that trusting data means not only trusting the agency that produced it but also those that copied it, stored it, and are serving it up?

As we develop the Public Data Project, we have been considering provenance anew: what provenance data should we record when private institutions, or members of the public, download and preserve public data from their governments? Put another way: if we as non-government actors make government data available to others, how do we maintain trust that this data is authentic, an exact copy of that which was released by the government?

<div class="flex gap-24 flex-col sm:flex-row">
  <figure class="flex-1">
    <img src="https://lil-blog-media.s3.amazonaws.com/Netherlands_1932-10-1_money_letter_NVPH_193_SF_reverse.jpg" alt="Photograph of a wax seal marked 'De Twentsche Bank' in the Netherlands" />
    <figcaption>Wax seal of “De Twentsche Bank” in the Netherlands. Source: <a href="https://commons.wikimedia.org/wiki/File:Netherlands_1932-10-1_money_letter_NVPH_193_SF_reverse.jpg">Wikimedia Commons</a>.</figcaption>
  </figure>

  <figure class="flex-1 flex flex-col justify-end">
    <img src="https://lil-blog-media.s3.amazonaws.com/data_gov_archive_metadata.jpg" alt="Screenshot of a metadata record in the Library Innovation Lab's Data.gov Archive" />
    <figcaption>Screenshot of a metadata record in LIL’s Data.gov Archive.</figcaption>
  </figure>
</div>

Those signatures, and the metadata they sign, are one part of publishing robust, cryptographically verifiable, resilient archives with irrefutable provenance marks. Through digital signatures that are verifiable using public-key encryption, as well as metadata JSON files that contain details of source and ownership, each dataset has a clear custodial history. Regardless of how I acquire them, I can check that copies of the “original” datasets, which were first published on a government website, then aggregated to [Data.gov](http://data.gov), and then replicated by LIL, are unchanged since that point.

Working on this project, I find myself thinking … Could there be some time in the future when we are just as interested in the changes and inventions of the people who pass government data from hand to hand, as in the original unaltered sources? And because of that question, I am certain that we have a responsibility to trace and report their histories. This seems, in some ways, even more true because of the very nature of data: it holds mimetic power. The Enlightenment tradition that vaunts of originality — of an essence that defines an object and that cannot be replicated — seems misplaced here. In the spirit of [the work of scholars such as Marcus Boon](https://www.hup.harvard.edu/books/9780674072527), we might then say that replications of the data are not “copies” at all, but are also “originals.” And, yet, we want and need data to retain authority, to know its origin stories.

When seen through the lens of provenance, characteristics like authenticity, integrity, reliability, and credibility still matter in digital environments. Just as we would seek to authenticate [Raphael’s _Portrait of a Young Man_](https://www.monumentsmenandwomenfnd.org/wwii-most-wanted/raphael/portrait-of-a-man?srsltid=AfmBOorNywGr9XPuqdg2GJ1--N-MiRfgsUbhdn2sfSHIFfQ2RXGzObrQ) should it turn up at auction after 80 years, so too must we carefully certify our digital cultural heritage.
