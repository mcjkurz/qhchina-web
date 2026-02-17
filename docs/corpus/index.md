---
layout: docs_with_sidebar
title: Corpus Management
permalink: /docs/corpus/
functions:
  - name: Corpus
    anchor: corpus
  - name: Corpus.add()
    anchor: corpus-add
  - name: Corpus.add_many()
    anchor: corpus-add_many
  - name: Corpus.describe()
    anchor: corpus-describe
  - name: Corpus.filter()
    anchor: corpus-filter
  - name: Corpus.get()
    anchor: corpus-get
  - name: Corpus.groupby()
    anchor: corpus-groupby
  - name: Corpus.load()
    anchor: corpus-load
  - name: Corpus.metadata_values()
    anchor: corpus-metadata_values
  - name: Corpus.remove()
    anchor: corpus-remove
  - name: Corpus.save()
    anchor: corpus-save
  - name: Corpus.split()
    anchor: corpus-split
  - name: Corpus.to_dataframe()
    anchor: corpus-to_dataframe
  - name: Document
    anchor: document
  - name: Document.get()
    anchor: document-get
has_examples: True
import_from: qhchina.corpus
---

The `Corpus` class provides a unified way to manage tokenized documents with metadata. It integrates seamlessly with all qhchina analytics modules.

## Quick Start

```python
from qhchina import Corpus

# Create a corpus with metadata
corpus = Corpus()
corpus.add(['没有', '吃', '过', '人', '的', '孩子'], author='鲁迅')
corpus.add(['太阳', '刚刚', '下', '了', '地平线'], author='茅盾')
corpus.add(['小溪', '流', '下去', '绕', '山岨', '流'], author='沈从文')

# Filter by author, then analyze
luxun = corpus.filter(author='鲁迅')

# Or group by author for stylometry
from qhchina.analytics.stylometry import Stylometry
stylo = Stylometry()
stylo.fit_transform(corpus.groupby('author'))
```

---

## Examples

**Basic Usage**

```python
from qhchina import Corpus

corpus = Corpus()
corpus.add(['没有', '吃', '过', '人', '的', '孩子'], author='鲁迅', year=1918)
corpus.add(['太阳', '刚刚', '下', '了', '地平线'], author='茅盾', year=1927)

# Access document by index
doc = corpus[0]

# Document supports flexible indexing:
doc[0]          # First token: '没有'
doc["author"]   # Metadata: '鲁迅'
doc["year"]     # Metadata: 1918
doc.get("genre", "未知")  # With default: '未知'
```

**Filtering and Grouping**

```python
# filter() returns a new Corpus - useful for subsetting
pre_1930 = corpus.filter(lambda d: d["year"] < 1930)
post_1930 = corpus.filter(lambda d: d["year"] >= 1930)

# Compare how "爱情" was written about across periods
from qhchina.analytics.collocations import find_collocates
early_collocates = find_collocates(pre_1930, target_words=['爱情'])
late_collocates = find_collocates(post_1930, target_words=['爱情'])

# groupby() returns a dict - useful for Stylometry
from qhchina.analytics.stylometry import Stylometry
stylo = Stylometry()
stylo.fit_transform(corpus.groupby('author'))
```

**Method Chaining**

Since `filter()` returns a new `Corpus`, you can chain methods for concise data pipelines:

```python
# Chain filter() and groupby() in one line
# First filter documents with at least 20 tokens, then group by author
by_author = corpus.filter(lambda d: len(d.tokens) >= 20).groupby('author')

# Use with Stylometry - only analyze substantial documents
stylo = Stylometry()
stylo.fit_transform(
    corpus.filter(lambda d: len(d.tokens) >= 100).groupby('author')
)

# Multiple filters can be chained
modern_fiction = (
    corpus
    .filter(lambda d: d["year"] >= 1920)
    .filter(genre='小说')
    .filter(lambda d: len(d.tokens) >= 50)
)
```

**Save and Load**

```python
corpus.save('corpus.json')   # JSON (readable)
corpus.save('corpus.pkl')    # Pickle (faster)
loaded = Corpus.load('corpus.json')
```

**Works with All Analytics**

```python
from qhchina import Corpus
from qhchina.analytics.topicmodels import LDAGibbsSampler

# Filter first, then train on subset
corpus = Corpus()
# ... add documents with source metadata ...

newspapers = corpus.filter(source='报纸')
lda = LDAGibbsSampler(n_topics=10)
lda.fit(newspapers)
```

---

## API Reference

<!-- API-START -->

<h3 id="corpus">qhchina.corpus.Corpus <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/corpus.py#L81" class="source-link" title="View source on GitHub">[source]</a></h3>

<pre class="signature"><code><span class="sig-name">Corpus</span>(
    <span class="sig-param">documents</span><span class="sig-punct">:</span> <span class="sig-type">list[list[str]] | list[Document] | 'Corpus' | None</span> <span class="sig-punct">=</span> <span class="sig-default">None</span>,
    <span class="sig-param">metadata</span><span class="sig-punct">:</span> <span class="sig-type">dict[str, Any] | None</span> <span class="sig-punct">=</span> <span class="sig-default">None</span>
)</code></pre>

A collection of tokenized documents with metadata.

Works directly with all qhchina analytics modules:

- `lda.fit(corpus)` - topic modeling
- `find_collocates(corpus, ...)` - collocation analysis
- `Word2Vec(corpus)` - word embeddings
- `stylo.fit_transform(corpus.groupby('author'))` - stylometry

**Parameters:**
- `documents`: List of token lists, Document objects, or another Corpus.
- `metadata`: Default metadata applied to all added documents.

**Example:**
```python
>>> corpus = Corpus()
>>> corpus.add(['没有', '吃', '过', '人', '的', '孩子'], author='鲁迅')
>>> corpus.add(['太阳', '刚刚', '下', '了', '地平线'], author='茅盾')
>>> 
>>> for tokens in corpus.filter(author='鲁迅'):
...     print(tokens)
```

<h4 id="corpus-add">qhchina.corpus.Corpus.add() <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/corpus.py#L214" class="source-link" title="View source on GitHub">[source]</a></h4>

<pre class="signature"><code><span class="sig-name">add</span>(<span class="sig-param">tokens</span><span class="sig-punct">:</span> <span class="sig-type">list[str]</span>, <span class="sig-param">doc_id</span><span class="sig-punct">:</span> <span class="sig-type">str | None</span> <span class="sig-punct">=</span> <span class="sig-default">None</span>, <span class="sig-param">metadata</span><span class="sig-punct">:</span> <span class="sig-type">Any</span>)</code></pre>

Add a document to the corpus.

**Parameters:**
- `tokens`: List of string tokens (the segmented text).
- `doc_id`: Optional document ID. If not provided, one is auto-generated.
- `**metadata`: Metadata key-value pairs (author, date, source, etc.).

**Returns:**
The document ID (generated or provided).

**Raises:**
- `TypeError`: If tokens is not a list.
- `ValueError`: If doc_id already exists in corpus.

**Example:**
```python
>>> corpus.add(['没有', '吃', '过', '人', '的', '孩子'], author='鲁迅')
'doc_0'
>>> corpus.add(['小溪', '流', '下去'], doc_id='边城', author='沈从文')
'边城'
>>> corpus[0].tokens      # Access by index
['没有', '吃', '过', '人', '的', '孩子']
>>> corpus['边城'].tokens  # Access by doc_id
['小溪', '流', '下去']
```

<h4 id="corpus-add_many">qhchina.corpus.Corpus.add_many() <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/corpus.py#L269" class="source-link" title="View source on GitHub">[source]</a></h4>

<pre class="signature"><code><span class="sig-name">add_many</span>(<span class="sig-param">documents</span><span class="sig-punct">:</span> <span class="sig-type">list[list[str]]</span>, <span class="sig-param">metadata_list</span><span class="sig-punct">:</span> <span class="sig-type">list[dict[str, Any]] | None</span> <span class="sig-punct">=</span> <span class="sig-default">None</span>, <span class="sig-param">shared_metadata</span><span class="sig-punct">:</span> <span class="sig-type">Any</span>)</code></pre>

Add multiple documents efficiently.

**Parameters:**
- `documents`: List of token lists.
- `metadata_list`: Optional per-document metadata. Must match length of documents.
- `**shared_metadata`: Metadata applied to all documents.

**Returns:**
List of document IDs.

**Raises:**
- `ValueError`: If metadata_list length doesn't match documents length.

**Example:**
```python
>>> docs = [['word1'], ['word2', 'word3']]
>>> corpus.add_many(docs, period='民国')
['doc_0', 'doc_1']
```

<h4 id="corpus-describe">qhchina.corpus.Corpus.describe() <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/corpus.py#L597" class="source-link" title="View source on GitHub">[source]</a></h4>

<pre class="signature"><code><span class="sig-name">describe</span>()</code></pre>

Return summary statistics about the corpus.

**Returns:**
Dictionary with:
- documents: Number of documents
- tokens: Total token count
- vocab_size: Number of unique tokens
- avg_doc_length: Average tokens per document
- metadata_keys: List of metadata keys

**Example:**
```python
>>> corpus.describe()
{'documents': 100, 'tokens': 5432, 'vocab_size': 1205, ...}
```

<h4 id="corpus-filter">qhchina.corpus.Corpus.filter() <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/corpus.py#L365" class="source-link" title="View source on GitHub">[source]</a></h4>

<pre class="signature"><code><span class="sig-name">filter</span>(<span class="sig-param">predicate</span><span class="sig-punct">:</span> <span class="sig-type">Callable[[Document], bool] | None</span> <span class="sig-punct">=</span> <span class="sig-default">None</span>, <span class="sig-param">metadata_filters</span><span class="sig-punct">:</span> <span class="sig-type">Any</span>)</code></pre>

Return a new Corpus containing only matching documents.

**Parameters:**
- `predicate`: Function that takes a Document and returns bool.
- `**metadata_filters`: Filter by exact metadata value match.

**Returns:**
New Corpus (shares document references, memory-efficient).

**Example:**
```python
>>> luxun = corpus.filter(author='鲁迅')
>>> pre_1930 = corpus.filter(lambda d: d["year"] < 1930)
```

<h4 id="corpus-get">qhchina.corpus.Corpus.get() <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/corpus.py#L310" class="source-link" title="View source on GitHub">[source]</a></h4>

<pre class="signature"><code><span class="sig-name">get</span>(<span class="sig-param">doc_id</span><span class="sig-punct">:</span> <span class="sig-type">str</span>)</code></pre>

Get a document by its ID. Use `corpus[index]` for integer access.

**Parameters:**
- `doc_id`: The document ID to look up.

**Returns:**
The Document object.

**Raises:**
- `KeyError`: If doc_id is not found.

**Example:**
```python
>>> corpus['边城'].tokens   # By doc_id
>>> corpus[0].tokens        # By index
```

<h4 id="corpus-groupby">qhchina.corpus.Corpus.groupby() <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/corpus.py#L415" class="source-link" title="View source on GitHub">[source]</a></h4>

<pre class="signature"><code><span class="sig-name">groupby</span>(<span class="sig-param">key</span><span class="sig-punct">:</span> <span class="sig-type">str</span>)</code></pre>

Group documents by a metadata key.

Returns a dictionary mapping metadata values to lists of token lists.
This is the format expected by `Stylometry.fit_transform()`.

Documents without the specified metadata key are silently skipped.

**Parameters:**
- `key`: Metadata key to group by (e.g., 'author', 'period').

**Returns:**
Dictionary mapping metadata values to lists of token lists.

**Raises:**
- `TypeError`: If key is not a string.

**Example:**
```python
>>> corpus.add(['没有', '吃', '过', '人'], author='鲁迅')
>>> corpus.add(['救救', '孩子'], author='鲁迅')
>>> corpus.add(['太阳', '下', '了', '地平线'], author='茅盾')
>>> 
>>> grouped = corpus.groupby('author')
>>> # {'鲁迅': [['没有', '吃', ...], ['救救', '孩子']], '茅盾': [[...]]}
>>> 
>>> # Use with Stylometry
>>> stylo.fit_transform(corpus.groupby('author'))
```

<h4 id="corpus-load">qhchina.corpus.Corpus.load() <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/corpus.py#L705" class="source-link" title="View source on GitHub">[source]</a></h4>

<pre class="signature"><code><span class="sig-name">load</span>(<span class="sig-param">path</span><span class="sig-punct">:</span> <span class="sig-type">str | Path</span>, <span class="sig-param">format</span><span class="sig-punct">:</span> <span class="sig-type">str | None</span> <span class="sig-punct">=</span> <span class="sig-default">None</span>)</code></pre>

Load corpus from a file.

**Parameters:**
- `path`: Input file path.
- `format`: File format - 'json' or 'pickle'. If None, inferred from
  file extension (.json for JSON, .pkl/.pickle for pickle).

**Returns:**
Loaded Corpus object.

**Example:**
```python
>>> corpus = Corpus.load('my_corpus.json')   # JSON format
>>> corpus = Corpus.load('my_corpus.pkl')    # Pickle format
```

<h4 id="corpus-metadata_values">qhchina.corpus.Corpus.metadata_values() <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/corpus.py#L622" class="source-link" title="View source on GitHub">[source]</a></h4>

<pre class="signature"><code><span class="sig-name">metadata_values</span>(<span class="sig-param">key</span><span class="sig-punct">:</span> <span class="sig-type">str</span>)</code></pre>

Get all unique values for a metadata key.

**Parameters:**
- `key`: The metadata key to query.

**Returns:**
Set of unique values (excludes documents without this key).

**Example:**
```python
>>> corpus.metadata_values('author')
{'鲁迅', '茅盾', '沈从文'}
```

<h4 id="corpus-remove">qhchina.corpus.Corpus.remove() <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/corpus.py#L331" class="source-link" title="View source on GitHub">[source]</a></h4>

<pre class="signature"><code><span class="sig-name">remove</span>(<span class="sig-param">doc_id</span><span class="sig-punct">:</span> <span class="sig-type">str</span>)</code></pre>

Remove and return a document by its ID.

**Parameters:**
- `doc_id`: The document ID to remove.

**Returns:**
The removed Document object.

**Raises:**
- `KeyError`: If doc_id is not found.

**Example:**
```python
>>> removed = corpus.remove('doc_0')
>>> print(f"Removed document with {len(removed.tokens)} tokens")
```

<h4 id="corpus-save">qhchina.corpus.Corpus.save() <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/corpus.py#L646" class="source-link" title="View source on GitHub">[source]</a></h4>

<pre class="signature"><code><span class="sig-name">save</span>(<span class="sig-param">path</span><span class="sig-punct">:</span> <span class="sig-type">str | Path</span>, <span class="sig-param">format</span><span class="sig-punct">:</span> <span class="sig-type">str | None</span> <span class="sig-punct">=</span> <span class="sig-default">None</span>)</code></pre>

Save corpus to a file.

**Parameters:**
- `path`: Output file path.
- `format`: File format - 'json' or 'pickle'. If None, inferred from
  file extension (.json for JSON, .pkl/.pickle for pickle).
  Pickle is recommended for large corpora as it's more compact
  and faster to load.

**Example:**
```python
>>> corpus.save('my_corpus.json')           # JSON format
>>> corpus.save('my_corpus.pkl')            # Pickle format (smaller)
>>> corpus.save('corpus', format='pickle')  # Explicit format
```

<h4 id="corpus-split">qhchina.corpus.Corpus.split() <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/corpus.py#L466" class="source-link" title="View source on GitHub">[source]</a></h4>

<pre class="signature"><code><span class="sig-name">split</span>(<span class="sig-param">train_ratio</span><span class="sig-punct">:</span> <span class="sig-type">float</span> <span class="sig-punct">=</span> <span class="sig-default">0.8</span>, <span class="sig-param">stratify_by</span><span class="sig-punct">:</span> <span class="sig-type">str | None</span> <span class="sig-punct">=</span> <span class="sig-default">None</span>, <span class="sig-param">seed</span><span class="sig-punct">:</span> <span class="sig-type">int | None</span> <span class="sig-punct">=</span> <span class="sig-default">None</span>)</code></pre>

Split corpus into train and test sets.

**Parameters:**
- `train_ratio`: Proportion of documents for training (0.0 to 1.0).
- `stratify_by`: Optional metadata key for stratified splitting.
  If provided, maintains the proportion of each group in both sets.
- `seed`: Random seed for reproducibility.

**Returns:**
Tuple of (train_corpus, test_corpus).

**Raises:**
- `ValueError`: If train_ratio is not between 0 and 1.

**Example:**
```python
>>> train, test = corpus.split(0.8, seed=42)
>>> train_stratified, test_stratified = corpus.split(
...     0.8, stratify_by='author', seed=42
... )
```

<h4 id="corpus-to_dataframe">qhchina.corpus.Corpus.to_dataframe() <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/corpus.py#L762" class="source-link" title="View source on GitHub">[source]</a></h4>

<pre class="signature"><code><span class="sig-name">to_dataframe</span>()</code></pre>

Convert corpus to a pandas DataFrame.

**Returns:**
DataFrame with columns: doc_id, tokens, token_count, and all metadata keys.

**Example:**
```python
>>> df = corpus.to_dataframe()
>>> df.groupby('author')['token_count'].mean()
```

<br>

<h3 id="document">qhchina.corpus.Document <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/corpus.py#L39" class="source-link" title="View source on GitHub">[source]</a></h3>

<pre class="signature"><code><span class="sig-name">Document</span>(
    <span class="sig-param">tokens</span><span class="sig-punct">:</span> <span class="sig-type">list[str]</span>,
    <span class="sig-param">metadata</span><span class="sig-punct">:</span> <span class="sig-type">dict[str, Any]</span> <span class="sig-punct">=</span> <span class="sig-default">&lt;factory&gt;</span>,
    <span class="sig-param">doc_id</span><span class="sig-punct">:</span> <span class="sig-type">str</span> <span class="sig-punct">=</span> <span class="sig-default">''</span>
)</code></pre>

A single document with tokens and metadata.

Supports flexible indexing:
- `doc[0]` → first token
- `doc["author"]` → metadata value
- `doc.get("year", 1900)` → metadata with default

**Parameters:**
- `tokens`: List of string tokens (the segmented text).
- `metadata`: Dictionary of arbitrary metadata (author, date, source, etc.).
- `doc_id`: Unique identifier for the document.

<h4 id="document-get">qhchina.corpus.Document.get() <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/corpus.py#L76" class="source-link" title="View source on GitHub">[source]</a></h4>

<pre class="signature"><code><span class="sig-name">get</span>(<span class="sig-param">key</span><span class="sig-punct">:</span> <span class="sig-type">str</span>, <span class="sig-param">default</span><span class="sig-punct">:</span> <span class="sig-type">Any</span> <span class="sig-punct">=</span> <span class="sig-default">None</span>)</code></pre>

Get metadata value with default.

<br>

<!-- API-END -->
