---
title: Teaching Data Science for Lawyers with Caselaw Access Project Data
guest-author: "Paul Gowder"
---
In the Spring of 2019, at the University of Iowa, I taught an experimental course called [Introduction to Quantitative & Computational Legal Reasoning](https://sociologicalgobbledygook.com). The idea of the class was beginning "data science" in the legal context. The course is taught in Python, and focuses on introductory coding and statistics, with focused applications in the law (such as statistical evidence of discrimination). 

Of course, for students with no prior technical background, it's unrealistic to expect a law school course to produce "data scientists" in the sense used in industry. But my observations of the growth in student skills by the end of the course suggest that it is realistic to produce young lawyers with the skills to solve simple problems with coding, understand data, avoid getting led astray by dubious scientific claims (especially with probability and statistics in litigation), and learn about potential pathways for further learning and career development in legal technology and analytics.

The Library Innovation Lab's Caselaw Access Project (CAP) is particularly well-suited for assignments and projects in such a course. I believe that much of the low-hanging fruit in legal technology is in wrangling the vast amounts of unstructured text that lawyers and courts produce---as is evidenced by the numerous commercial efforts focusing around document production in discovery, contract assembly and interpretation, and similar textual problems faced by millions of lawyers daily. CAP offers a sizable trove of legal text accessible through a relatively simple and well-documented API (unlike other legal data APIs currently available). Moreover, the texts available through CAP are obviously familiar to every law student after their first semester, and their comfort with the format and style of such texts enables students to handle assignments that require them to combine their understanding of how law works with their developing technology skills. 

To leverage these advantages, I included a CAP-based assignment in the [first problem set](https://sociologicalgobbledygook.com/problem-set-1.html) for the course, due at the end of the programming intensive that occupies the initial few weeks of the semester. The problem, which is reproduced at the end of this post along with a simple example of code to successfully complete it, requires students to write a function that can call into the CAP API, retrieve an Illinois Supreme Court case (selected due to the lack of access restrictions) by citation, and return a sorted list of each unique case in the U.S. Reporter cited in the case they have retreived.

While the task is superficially simple, students found it fairly complex, for it requires the use of a number of programming concepts, such as functions and control flow, that they had only recently learned. It also exposes students to common beginner's mistakes in Python programming, such as missing the difference between sorting a list in place with `list.sort()` and returning a new list with `sorted(list)`. In my observation, the results of the problem set accurately distinguished those students who were taking to programming quickly and easily, and those who required more focused assistance. 

In addition to such standard programming skills, this assignment requires students to practice slightly more advanced skills such as: 

- Reading and understanding API documentation;
- Making network requests;
- Processing text with regular expressions;
- Using third-party libraries; 
- Parsing JSON data; and
- Handling empty responses from external data sources.

With luck, this problem can encourage broader thinking about legal text as something that can be treated as data, and the structure inherent in legal forms. With even more luck, some students may begin to think about more intellectual questions prompted by the exercise, such as: can we learn anything about the different citation practices in majority versus dissent opinions, or across different justices? 

I plan to teach the class again in Spring 2020; one recurrent theme in student feedback for the first iteration was the need for more practice in basic programming. As such, I expect that the next version of the course will include more assignments using CAP data. Projects that I'm considering include: 

- Write wrapper functions in Python for the CAP API (which the class as a whole could work on releasing as a library as an advanced project);
- Come to some conclusions about the workload of courts over time or of judges within a court by applying data analysis skills to metadata produced by the API; or
- Discover citation networks and identify influential cases and/or judges. 

## Appendix: A CAP-Based Law Student Programming Assignment

Write a function, named `cite_finder`, that takes one parameter, `case`, a string with a citation to an Illinois Supreme Court case, and returns the following: 

A.  `None`, if the citation does not correspond to an actual case.

B. An empty list, if the citation corresponds to an actual case, but the text of that case does not include any citations to the U.S. Supreme Court.

C.  A Python `list` of unique U.S. Supreme Court citations that appear in the text of the case, if the citation corresponds to an actual case and the case contains any U.S. Supreme Court citation.  

**Rules and definitions for this problem:**

- "Unique" means a citation to a specific case from a specific reporter. 

- "Citation to an Illinois Supreme Court case" means a string reflecting a citation to the official reporter of the Illinois Supreme Court, in the form `12 Ill. 345` or `12 Ill.2d 345`. 

- "U.S. Supreme Court citation" means any full citation (not supra, id, etc.) from the official U.S. Supreme Court reporter as abbreviated `U.S.`. Party names, years, and page numbers need not be included. Archaic citations (like to Cranch), S.Ct., and L.Ed. Citations should not be included. Subsequent cites/pin cites to a case of the form `123 U.S. at 456` should not be included.

- "Text" of a case includes all opinions (majority, concurrence, dissent, etc.) but does not include syllabus or any other content. 

- Your function must use the [Caselaw Access Project (case.law) API](https://case.law). 

- The list must be sorted using Python’s built-in list sorting functionality with default options.

- Each citation must appear only once.

**Example correct input and output:**

- `cite_finder("231 Ill.2d 474")` should return `['387 U.S. 136', '419 U.S. 102', '424 U.S. 1', '429 U.S. 252', '508 U.S. 520', '509 U.S. 43']`

- `cite_finder("231 Ill.2d 475")` should return `None`

- `cite_finder("215 Ill.2d 219")` should return `['339 U.S. 594', '387 U.S. 136', '467 U.S. 837', '538 U.S. 803']`

### Sample Code to Complete Assignment

{% highlight python %}
import requests, re
endpoint = "https://api.case.law/v1/cases/"
pattern = r"\d+ U\.S\. \d+"
# no warranties are made as to the correctness of this somewhat lazy regex

def get_opinion_texts(api_response):
    try:
        ops = api_response["results"][0]["casebody"]["data"]["opinions"]
    except:
        return None
    return [x["text"] for x in ops]

def cite_finder(cite):
    resp = requests.get(endpoint, params={"cite": cite, "full_case": "true"}).json()
    opinions = get_opinion_texts(resp)
    if opinions:
        allcites = []
        for opinion in opinions:
            opcites = re.findall(pattern, opinion)
            allcites.extend(opcites)
        filtered = list(set(allcites))
        filtered.sort()
        return filtered
    return None
{% endhighlight %}
