---
title: >
  Binoc: A Field Guide
date: 2026-07-07T12:00:00-04:00
author:
- christopher-setzer
tags:
- Public Data
- Tools
thumbnail: https://lil-blog-media.s3.amazonaws.com/binoc-diagram.webp
---
Since its inception, LIL's [Public Data Project](https://lil.law.harvard.edu/our-work/public-data-project/) has taken on the complex problem of monitoring government data. Among the thousands of revisions to public datasets each day, most are unremarkable clerical updates: a hundred new rows here, a corrected timestamp there. But how can we distinguish a clerical update from a more substantive change? Schema changes and variable deletions like those [reported in _The Lancet_ in 2025](https://doi.org/10.1016/S0140-6736(25)01249-8) demand a vigilance that is hard to sustain at scale.

Our colleagues at [dataindex.us](https://dataindex.us/collections/) and the [Environmental Data & Governance Initiative](https://envirodatagov.org/enviro-fed-web-tracker/) have made inroads on this problem by tracking critical federal datasets and websites. As [mentioned in this space]({{ site.url }}/blog/2026/06/02/an-automated-data-monitoring-toolkit-and-the-ai-benchmarking-exercise-at-the-public-data-project/), the Public Data Project has joined their efforts by building an automated toolkit that will monitor not only datasets but also the environment in which those datasets are created and maintained.

In this post, we'll explore one component of our data monitoring toolkit: [Binoc](https://harvard-lil.github.io/binoc/), an open-source tool for programmatically identifying and summarizing changes between dataset revisions.

<figure class="items-center text-center">
  <img class="w-full" src="https://lil-blog-media.s3.amazonaws.com/binoc-instrument.webp" alt="Binocular viewing instrument devised by Père Chérubin d'Orléans (circa 1670s)" />
  <figcaption>Binocular viewing instrument devised by Père Chérubin d'Orléans (circa 1670s). Source: <a href="https://archive.org/details/bub_gb_Y-H8aOcYS4QC"><i>De visione perfecta</i></a>.</figcaption>
</figure>

## What is Binoc?

Binoc is a command-line tool and library that, given two snapshots of a dataset, efficiently summarizes the differences between the two snapshots in a human-readable changelog:

```markdown
# Changelog: snapshot-a -> snapshot-b

- **data.csv**: 2 cells changed
  - Changed cells
    - row 1, column 'score': '85' -> '92'
    - row 2, column 'score': '90' -> '88'
```

The astute reader may ask, "Isn't that just a diff?" Yes and no. In computing terms, to _diff_ is to take two revisions of a file, detect their differences, and efficiently represent those differences to the user. The Unix `diff` utility developed at Bell Labs in the 1970s was made to operate on plain-text, line-based data such as source code, and its descendants, from `git diff` to Wikipedia's revision histories, have largely followed suit.

A _structural diff_, rather than treating a file as a generic stream of lines, parses the file according to its format and identifies only changes that are material within that format. More complex than line-based diffing, this necessarily depends on format-specific logic. Many structural diffing tools exist: [csv-diff](https://github.com/simonw/csv-diff) and [qsv diff](https://qsv.dathere.com/web/diff) for CSVs, [jd](https://github.com/josephburnett/jd) for JSON, [dyff](https://github.com/homeport/dyff) for YAML, and so on.

Binoc unites structural diffing logic across many types of data. Moreover, as no one tool can (or should) natively understand every format, Binoc has adopted a plugin-based architecture. There is built-in support for common formats like CSV and JSON, while third-party plugins may add further domain-specific parsers and rules. When the user installs a plugin, Binoc automatically gains knowledge of the plugin's associated formats.

Where a traditional diff tool renders its output for machine consumption, in chunks of lines adorned with symbols, Binoc lists differences in a human-friendly changelog by default. Software projects have long favored changelogs to succinctly document what changed in each release, but few public datasets have adopted this convention. Binoc aims to help fill this gap.

## Comparing CSVs

Let's try Binoc on some real-world data. First, we'll examine the Centers for Disease Control and Prevention's (CDC) Behavioral Risk Factor Surveillance System (BRFSS) dataset. Conducted annually since 1984, BRFSS is the nation's largest continuous health survey, collecting responses from hundreds of thousands of Americans each year. Given its importance, any retroactive changes to old BRFSS data would be consequential.

Let's take a look at the [2023 BRFSS data](https://www.cdc.gov/brfss/annual_data/annual_2023.html). Has it been modified since its release, and if so, how?

<figure class="items-center text-center">
  <img class="w-4/5" src="https://lil-blog-media.s3.amazonaws.com/cdc-brfss-variables.png" alt="Variable table for the 2023 CDC BRFSS survey dataset" />
  <figcaption>Variable table for the 2023 CDC BRFSS survey dataset.</figcaption>
</figure>

To perform a comparison, Binoc requires two dataset snapshots: a "before" and an "after." We'll start by fetching the "after": the [2023 BRFSS survey variable table](https://www.cdc.gov/brfss/annual_data/2023/llcp_varlayout_23_onecolumn.html) currently available on the CDC's website. This HTML table can be readily converted to a CSV for comparison; we'll name ours [`brfss_variables_v2.csv`](https://lil-blog-media.s3.amazonaws.com/brfss_variables_v2.csv). A preview:

| Starting_Column | Variable_Name | Field_Length |
| --------------- | ------------- | ------------ |
| 1               | _STATE        | 2            |
| 17              | FMONTH        | 2            |
| 19              | IDATE         | 8            |
| …               | …             | …            |

To obtain the "before," we'll use the Internet Archive's Wayback Machine, which preserves many past captures of the same page. Let's fetch the [table as it stood on January 26, 2025](https://web.archive.org/web/20250126134358/https://www.cdc.gov/brfss/annual_data/2023/llcp_varlayout_23_onecolumn.html) and convert it to a CSV as well: [`brfss_variables_v1.csv`](https://lil-blog-media.s3.amazonaws.com/brfss_variables_v1.csv).

Our new CSV looks just like the last one. But are the two snapshots identical? Let's have a look. Having [installed Binoc locally](https://harvard-lil.github.io/binoc/#install), we'll compare the CSV files like so:

```sh
binoc diff brfss_variables_v1.csv brfss_variables_v2.csv
```

Binoc returns the following changelog:

```markdown
# Changelog: brfss_variables_v1.csv -> brfss_variables_v2.csv

- **brfss_variables_v2.csv**: 1 row added; 6 rows removed
  - Rows added
    - key Variable_Name 'RCSBORG1': '636', 'RCSBORG1', '1'
  - Rows removed (showing 3 of 6)
    - key Variable_Name 'BIRTHSEX': '579', 'BIRTHSEX', '1'
    - key Variable_Name 'CELSXBRT': '79', 'CELSXBRT', '1'
    - key Variable_Name 'LNDSXBRT': '73', 'LNDSXBRT', '1'

## Suggestions

- inferred row identity column 'Variable_Name' from unique values with 98% overlap (`binoc.write.tabular`) [binoc.tabular_auto_key]
```

The files are different. From this changelog we can conclude the following:

- Sometime after January 26, 2025, the CDC returned to the completed 2023 BRFSS survey dataset and modified its variables.
- The CDC removed 6 variables, including `BIRTHSEX`, `CELSXBRT`, and `LNDSXBRT`, while inserting 1 new variable: `RCSBORG1`.

Helpfully, Binoc also inferred on its own that `Variable_Name` is a unique identifier for each row. This could be useful for confirming whether a given row was modified across revisions.

## Saving a changeset

A changelog like the above is only a human-facing summary; it omits details by design. Note, for example, that Binoc listed only 3 of the 6 removed variables. However, as part of every diff, Binoc also generates a machine-readable changeset: a structured artifact that formally documents every detected change.

To save a changeset to disk, we'll re-execute our earlier comparison, but this time we'll append `-o brfss_changeset.json` to write output to a JSON file:

```sh
binoc diff \
  brfss_variables_v1.csv \
  brfss_variables_v2.csv \
  -o brfss_changeset.json
```

When we review `brfss_changeset.json`, we find the same changelog expressed in JSON as a series of structured edits like the following:

```json
{
  "params": {
    "index": 24,
    "key": {
      "Variable_Name": "CELSXBRT"
    },
    "values": {
      "total_values": 3,
      "truncated": false,
      "values": [
        "79",
        "CELSXBRT",
        "1"
      ]
    }
  },
  "verb": "tabular.remove_row"
}
```

Just as a Binoc changelog is rendered for human scrutiny, a changeset is designed for machine processing as part of an automated pipeline. It can also serve as a more complete audit record for projects in data preservation.

## Comparing nested datasets

Binoc excels at comparing datasets that are nested inside other files, such as a `.zip` or `.tar.gz` archive. This is helpful when working with civic datasets, in which data tables are commonly accompanied by metadata, dictionaries, PDFs, and other assets.

To demonstrate, let's review another historical dataset: the Department of Veterans Affairs' (VA) [FY 2021 Total Number of Veterans, Veteran VA Users, and Veteran VA Healthcare Users](https://catalog.data.gov/dataset/fy-2021-total-number-of-veterans-veteran-va-users-and-veteran-va-healthcare-users-by-sex-a). The aforementioned 2025 _Lancet_ study by Janet Freilich and Aaron S. Kessenbaum flagged this dataset as an example of surreptitious federal data manipulation. Can we reproduce the study's findings?

<figure class="items-center text-center">
  <img class="w-4/5" src="https://lil-blog-media.s3.amazonaws.com/va-fy-2021-dataset.png" alt="Data.gov record for the VA FY 2021 Total Number of Veterans, Veteran VA Users, and Veteran VA Healthcare Users dataset" />
  <figcaption>Data.gov record for the VA FY 2021 Total Number of Veterans dataset.</figcaption>
</figure>

A [copy of this dataset](https://lil.law.harvard.edu/data-gov-archive/?resource=datasets/fy-2021-total-number-of-veterans-veteran-va-users-and-veteran-va-healthcare-users-by-gende-65c16) was captured in December 2024 as part of LIL's Data.gov Archive. To use that copy as a "before" snapshot, we'll save it locally as [`va_2021_v1.zip`](https://lil-blog-media.s3.amazonaws.com/va_2021_v1.zip). Next, to support a proper comparison, we'll take a fresh capture from July 2026 as our "after," saving it locally as [`va_2021_v2.zip`](https://lil-blog-media.s3.amazonaws.com/va_2021_v2.zip).

Now let's ask Binoc to compare the two zipped archives:

```sh
binoc diff va_2021_v1.zip va_2021_v2.zip
```

This time the resulting changelog is much larger:

```markdown
# Changelog: va_2021_v1.zip -> va_2021_v2.zip

- **va_2021_v2.zip/>bag-info.txt**: 1 line added; 1 line removed
  - Line changes
    - line 2: 'Bagging-Date: 2024-12-09' -> 'Bagging-Date: 2026-07-02'
- **va_2021_v2.zip/>data/files/6fsh-rj6s.html**: Binary content changed; 21 extracted strings added, 18 extracted strings removed
  - Extracted strings added (showing 3 of 21)
    - ' %{min}","title":"Status: On Track (green)"}},"target":"target","title":"Set up status logic","units_from":"units from %...'
    - '","title":"is greater than or equal to"},"less_than":{"symbol":"\u003c","title":"is less than"},"less_than_or_equal":{"s...'
    - '","title":"is less than or equal to"},"not_equal":{"symbol":"'
  - Extracted strings removed (showing 3 of 18)
    - ' %{min}","title":"Status: On Track (green)"}},"target":"target","title":"Set up status logic","units_from":"units from %...'
    - '","title":"Is greater than or equal to"},"less_than":{"symbol":"\u003c","title":"Is less than"},"less_than_or_equal":{"s...'
    - '","title":"Is less than or equal to"},"not_equal":{"symbol":"'
- **va_2021_v2.zip/>data/files/6fsh-rj6s.json**: Document values changed
  - Value Change: changes: [{"from":"\"tree-fm2j\"","kind":"remove","path":"$.rowsUpdatedBy","to":null},{"from":null,"kind":"add","path":"$.diciBackend","to":"false"},{"from":"5129741","k...; examples_truncated: true
- **va_2021_v2.zip/>data/files/columns.json**: 7 cells changed
  - Changed cells (showing 3 of 7)
    - row 1, column 'fieldName': 'gender' -> 'sex'
    - row 1, column 'id': 568275608 -> 607023342
    - row 1, column 'name': 'Gender' -> 'Sex'
…
```

It's a lot to take in at first glance. When Binoc compares two `.zip` archives, it walks recursively through the corresponding contents of both file trees and reports on any differences. Since these archives contain numerous supplementary files, their differences add considerable noise to the output.

Still, upon scanning the changelog, a few changes jump out:

```markdown
- **va_2021_v2.zip/>data/files/columns.json**: 7 cells changed
  - Changed cells (showing 3 of 7)
    - row 1, column 'fieldName': 'gender' -> 'sex'
    - row 1, column 'id': 568275608 -> 607023342
    - row 1, column 'name': 'Gender' -> 'Sex'
…
- **va_2021_v2.zip/>data/files/rows.csv**: Column renamed: 'Gender' -> 'Sex'
```

In short, Binoc tells us, this data lines up with the _Lancet_ study's conclusion: in early 2025, the VA retroactively modified its FY 2021 Total Number of Veterans dataset to rename the `Gender` column as `Sex`.

As Freilich and Kessenbaum have written, "These data are currently used to study health interventions and outcomes, so secretly changing terms degrades the quality of the underlying information and can undermine the interpretation of the results of these studies — or even invalidate the results themselves."

<figure class="items-center text-center">
  <img class="w-full" src="https://lil-blog-media.s3.amazonaws.com/binoc-instrument-2.webp" alt="Binocular viewing instrument devised by Père Chérubin d'Orléans (circa 1670s)" />
  <figcaption>Binocular viewing instrument devised by Père Chérubin d'Orléans (circa 1670s). Source: <a href="https://archive.org/details/bub_gb_Y-H8aOcYS4QC"><i>De visione perfecta</i></a>.</figcaption>
</figure>

## Looking ahead

Although Binoc works well for validating past findings like the above, our team is eager to test its aptitude for detecting substantive changes in data as they occur. As a Rust library with Python and WASM bindings, Binoc will support interactive, exploratory use as well as deployment in automated settings. It remains in active development, with new features shipping regularly.

No tool or model can substitute for the informed judgment of experts as it pertains to public data. NOAA oceanographers, Census Bureau statisticians, and CDC epidemiologists know their own data better than anyone; preserving civic ground truth begins in their knowledge, experience, and care.

Binoc's ambition, rather, is to help these experts and others distill meaning from the ocean of churn that characterizes government data. As one part of the Public Data Project's forthcoming data monitoring toolkit, we hope it will benefit subject matter experts, librarians, researchers, activists, public servants, and citizens alike.

---

_The Public Data Project welcomes your feedback on Binoc. As you experiment with the tool, please reach out to the team at <publicdata@law.harvard.edu>, fill out our [feedback form](https://docs.google.com/forms/d/e/1FAIpQLSfJCgk79vZNapQkyoCGMn8zI7bjEvdfyU_EuivjoM-a2KZXug/viewform?usp=dialog), or file an issue on Binoc's [GitHub repo](https://github.com/harvard-lil/binoc/)._
