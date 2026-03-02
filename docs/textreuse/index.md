---
layout: docs_with_sidebar
title: Text Reuse
permalink: /docs/textreuse/
functions:
  - name: find_shared_sequences()
    anchor: find_shared_sequences
has_examples: True
import_from: qhchina.analytics.textreuse
---

# Text Reuse

Text reuse detection identifies shared or near-duplicate passages across documents, a common task in historical and literary corpus analysis. The `qhchina.analytics.textreuse` module uses a seed-and-extend algorithm (similar to BLAST in bioinformatics) that finds exact n-gram matches as seeds, merges nearby seeds into passage candidates, and verifies each with banded edit distance. This allows fuzzy matching — tolerating insertions, deletions, and substitutions — while remaining fast at scale.

---

## API Reference

<!-- API-START -->

<h3 id="find_shared_sequences">qhchina.analytics.textreuse.find_shared_sequences() <a href="#find_shared_sequences" class="header-link" title="Permalink">#</a> <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/analytics/textreuse.py#L69" class="source-link" title="View source on GitHub">[source]</a></h3>

<pre class="signature"><code><span class="sig-name">find_shared_sequences</span>(
    <span class="sig-param">documents</span><span class="sig-punct">:</span> <span class="sig-type">list[list[str]]</span>,
    <span class="sig-param">n</span><span class="sig-punct">:</span> <span class="sig-type">int</span> <span class="sig-punct">=</span> <span class="sig-default">5</span>,
    <span class="sig-param">min_length</span><span class="sig-punct">:</span> <span class="sig-type">int</span> <span class="sig-punct">=</span> <span class="sig-default">10</span>,
    <span class="sig-param">min_similarity</span><span class="sig-punct">:</span> <span class="sig-type">float</span> <span class="sig-punct">=</span> <span class="sig-default">0.8</span>,
    <span class="sig-param">within_documents</span><span class="sig-punct">:</span> <span class="sig-type">bool</span> <span class="sig-punct">=</span> <span class="sig-default">False</span>,
    <span class="sig-param">as_dataframe</span><span class="sig-punct">:</span> <span class="sig-type">bool</span> <span class="sig-punct">=</span> <span class="sig-default">True</span>,
    <span class="sig-param">_max_gap</span><span class="sig-punct">:</span> <span class="sig-type">int | None</span> <span class="sig-punct">=</span> <span class="sig-default">None</span>,
    <span class="sig-param">_max_distance</span><span class="sig-punct">:</span> <span class="sig-type">int | None</span> <span class="sig-punct">=</span> <span class="sig-default">None</span>
)</code></pre>

Find shared sequences (text reuse) across a collection of documents.

Uses a seed-and-extend algorithm: finds exact n-gram matches as seeds,
merges nearby seeds into passage candidates, then verifies each with
banded edit distance. This allows fuzzy matching (insertions, deletions,
substitutions) while remaining fast at scale.

Each document is a `list[str]` of tokens.  For character-level
analysis of raw strings, convert with
`[list(text) for text in raw_texts]`.

**Parameters:**
- `documents`: List of tokenized documents (``list[list[str]]``).
- `n` (int): N-gram size for seeding. Smaller values find more matches
  but are slower. Default 5.
- `min_length` (int): Minimum passage length (in tokens) to report.
  Default 10.
- `min_similarity` (float): Minimum similarity score (0-1) for a passage
  to be reported. Computed as ``1 - distance / max_length``.
  Default 0.8.
- `within_documents` (bool): If True, also detect repeated passages
  within a single document. If False (default), only compare
  distinct document pairs.
- `as_dataframe` (bool): If True, return a pandas DataFrame. Default True.
- `_max_gap` (int | None): Maximum gap (in token positions)
  between consecutive seeds to still merge them into one passage.
  Defaults to ``n + 1``.  Why: a single substitution destroys
  ``n`` consecutive n-gram seeds, producing a gap of exactly
  ``n``; the default ``n + 1`` bridges that gap.  Increase to
  tolerate longer insertions/deletions between seed clusters.
- `_max_distance` (int | None): Maximum edit distance
  allowed during passage verification.  Also controls the band
  width of the banded Levenshtein computation, so it affects
  both accuracy and speed.  Defaults to
  ``int((1 - min_similarity) * min_length)`` — i.e. the number
  of edits that would reduce a minimal-length passage to exactly
  the similarity threshold.  Increase if you expect long passages
  with many local edits that still meet ``min_similarity``
  overall.

**Returns:**
pd.DataFrame or list[dict] with columns/keys:

- **doc_a** (int): Index of the first document.
- **doc_b** (int): Index of the second document (may equal
  doc_a when ``within_documents=True``).
- **pos_a** (int): Start position in document A.
- **pos_b** (int): Start position in document B.
- **length** (int): Length of the matched passage (maximum of
  len_a and len_b).
- **similarity** (float): Similarity score (1 - distance/length).
- **passage_a** (str): Matched text from document A.
- **passage_b** (str): Matched text from document B.

**Example:**
```python
Character-level comparison of raw strings:

from qhchina.analytics import find_shared_sequences
docs = [list("天地玄黄宇宙洪荒"), list("天地玄黄宇宙日月盈昃")]
find_shared_sequences(docs, n=3, min_length=5)

Pre-tokenized documents:

docs = [["天地", "玄黄", "宇宙", "洪荒", "日月", "盈昃"],
        ["天地", "玄黄", "宇宙", "洪荒", "寒来", "暑往"]]
find_shared_sequences(docs, n=2, min_length=3)
```

<br>

<!-- API-END -->
