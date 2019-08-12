---
title: Computational Support for Statutory Interpretation with Caselaw Access Project Data
guest-author: Jaromir Savelka, Huihui Xu, Kevin D. Ashley
---
This post is about a [research paper](https://dl.acm.org/citation.cfm?id=3326736) ([preprint](http://savelka.net/docs/2019ICAIL.pdf)) on sentence retrieval for statutory interpretation that we presented at the [International Conference on Artificial Intelligence and Law (ICAIL 2019)](https://icail2019-cyberjustice.com/) held in June at Montreal, Canada. The paper describes some of our recent work on computational methods for statutory interpretation carried out at the University of Pittsburgh. The idea is to focus on vague statutory concepts and enable a program to retrieve sentences that explain the meaning of such concepts. The Library Innovation Lab's Caselaw Access Project (CAP) provides an ideal corpus of case law that is needed for such work.

Abstract rules in statutory provisions must account for diverse situations, even those not yet encountered. That is one reason why legislators use vague, open textured terms, abstract standards, principles, and values. When there are doubts about the meaning, interpretation of a provision may help to remove them. Interpretation involves an investigation of how the term has been referred to, explained, recharacterized, or applied in the past. While court decisions are an ideal source of sentences interpreting statutory terms, manually reviewing the sentences is labor intensive and many sentences are useless or redundant.

In our work we automate this process. Specifically, given a statutory provision, a user’s interest in the meaning of a concept from the provision, and a list of sentences, we rank more highly the sentences that elaborate upon the meaning of the concept, such as:

* **definitional sentences** (e.g., a sentence that provides a test for when the concept applies).
* sentences that state **explicitly in a different way** what the concept means or state what it does not mean.
* sentences that provide an **example**, instance, or counterexample of the concept.
* sentences that show **how a court determines** whether something is such an example, instance, or counterexample.

We downloaded the complete bulk data from the Caselaw Access Project. Altogether the data set comprises more than 6.7 million unique cases. We ingested the data set into an [Elasticsearch](https://www.elastic.co/) instance. For the analysis of the textual fields we used the [LemmaGen Analysis plugin](https://github.com/vhyza/elasticsearch-analysis-lemmagen) which is a wrapper around a [Java implementation](https://github.com/hlavki/jlemmagen) of the [LemmaGen project](http://lemmatise.ijs.si/).

To support our experiments we indexed the documents at multiple levels of granularity. Specifically, the documents were indexed at the level of full cases, as well as segmented into the head matter and individual opinions (e.g., majority opinion, dissent, concurrence). This segmentation was performed by the Caselaw Access Project using a combination of human labor and automatic tools. We also used our [U.S. case law sentence segmenter](https://pdfs.semanticscholar.org/296f/1b98a06bc0c42a1f2e4b1bbd11e0d403f6b9.pdf) to segment each case into individual sentences and indexed those as well. Finally, we used the sentences to create paragraphs. We considered a line-break between two sentences as an indication of a paragraph boundary.

For our corpus we initially selected three terms from different provisions of the United States Code:

1. **independent economic value** (18 U.S. Code § 1839(3)(B))
2. **identifying particular** (5 U.S. Code § 552a(a)(4))
3. **common business purpose** (29 U.S. Code § 203(r)(1))

For each term we have collected a set of sentences by extracting all the sentences mentioning the term from the court decisions retrieved from the Caselaw Access Project data. In total we assembled a small corpus of 4,635 sentences. Three human annotators classified the sentences into four categories according to their usefulness for the interpretation:

1. **high value** - sentence intended to define or elaborate upon the meaning of the concept
2. **certain value** - sentence that provides grounds to elaborate on the concept’s meaning
3. **potential value** - sentence that provides additional information beyond what is known from the provision the concept comes from
4. **no value** - no additional information over what is known from the provision

The complete data set including the annotation guidelines has been made [publicly available](https://github.com/jsavelka/statutory_interpretation).

We performed a detailed study on a number of retrieval methods. We confirmed that retrieving the sentences directly by measuring similarity between the query and a sentence yields mediocre results. Taking into account the contexts of sentences turned out to be the crucial step in improving the performance of the ranking. We observed that query expansion and novelty detection techniques are also able to capture information that could be used as an additional layer in a ranker’s decision. Based on the detailed error analysis we integrated the context-aware ranking methods with the components based on query expansion and novelty detection into a specialized framework for retrieval of case-law sentences for statutory interpretation. Evaluation of different implementations of the framework shows promising results (.725 for NDGC at 10, .662 at 100. Normalized Discounted Cumulative Gain is a measure of ranking quality.)

To provide an intuitive understanding of the performance of the best model we list the top five sentences retrieved for each of the three terms below. Finally, it is worth noting that for future we plan to significantly increase the size of the data set and the number of statutory terms.

## Independent economic value

1. [. . . ] testimony also supports the **independent economic value** element in that a manufacturer could [. . . ] be the first on the market [. . . ]
2. [. . . ] the information about vendors and certification has **independent economic value** because it would be of use to a competitor [. . . ] as well as a manufacturer
3. [. . . ] the designs had **independent economic value** [. . . ] because they would be of value to a competitor who could have used them to help secure the contract
4. Plaintiffs have produced enough evidence to allow a jury to conclude that their alleged trade secrets have **independent economic value**.
5. Defendants argue that the trade secrets have no **independent economic value** because Plaintiffs’ technology has not been "tested or proven."

## Identifying particular

1. In circumstances where duty titles pertain to one and only one individual [. . . ], duty titles may indeed be "**identifying particulars**" [. . . ]
2. Appellant first relies on the plain language of the Privacy Act which states that a "record" is "any item . . . that contains [. . . ] **identifying particular** [. . . ]
3. Here, the district court found that the duty titles were not numbers, symbols, or other **identifying particulars**.
4. [. . . ] the Privacy Act [. . . ] does not protect documents that do not include **identifying particulars**.
5. [. . . ] the duty titles in this case are not "identifying particulars" because they do not pertain to one and only one individual.

## Common business purpose
1. [. . . ] the fact of common ownership of the two businesses clearly is not sufficient to establish a **common business purpose**.
2. Because the activities of the two businesses are not related and there is no **common business purpose**, the question of common control is not determinative.
3. It is settled law that a profit motive alone will not justify the conclusion that even related activities are performed for a **common business purpose**.
4. It is not believed that the simple objective of making a profit for stockholders can constitute a **common business purpose** [. . . ]
5. [. . . ] factors such as unified operation, related activity, interdependency, and a centralization of ownership or control can all indicate a **common business purpose**.

In conclusion, we have conducted a systematic study of sentence retrieval from case law with the goal of supporting statutory interpretation. Based on a detailed error analysis of traditional methods, we proposed a specialized framework that mitigates some of the challenges we identified. As evidenced above, the results of applying the framework are promising.
