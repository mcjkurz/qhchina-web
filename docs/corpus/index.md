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
has_examples: True
import_from: qhchina.corpus
---

The `Corpus` class provides a unified way to manage tokenized documents with metadata. It integrates seamlessly with all qhchina analytics modules.

## Quick Start

```python
from qhchina import Corpus

# Create a corpus
corpus = Corpus()
corpus.add(['我', '喜欢', '学习'], author='鲁迅', period='民国')
corpus.add(['他', '写', '小说'], author='茅盾', period='民国')

# Use directly with analytics
from qhchina.analytics.word2vec import Word2Vec
model = Word2Vec(corpus, vector_size=100)

# Group by metadata for Stylometry
from qhchina.analytics.stylometry import Stylometry
stylo = Stylometry()
stylo.fit_transform(corpus.groupby('author'))
```

---

## Examples

**Creating and Managing a Corpus**

```python
from qhchina import Corpus

# Create an empty corpus with default metadata
corpus = Corpus(metadata={'source': 'literature'})

# Add documents with metadata
corpus.add(['鲁迅', '写', '小说'], author='鲁迅', year=1920)
corpus.add(['茅盾', '写', '散文'], author='茅盾', year=1925)
corpus.add(['鲁迅', '写', '杂文'], author='鲁迅', year=1930)

# Add many documents at once
corpus.add_many(
    [['新', '文学'], ['现代', '诗歌']],
    metadata_list=[{'author': '胡适'}, {'author': '徐志摩'}],
    year=1922  # Shared metadata
)

# Access documents
doc = corpus.get('doc_0')  # Get by ID
print(doc.tokens)          # ['鲁迅', '写', '小说']
print(doc.metadata)        # {'source': 'literature', 'author': '鲁迅', 'year': 1920}

# Corpus statistics
print(corpus.describe())   # Document count, token stats, vocab size
print(corpus.vocab_size)   # Number of unique tokens
```

**Filtering and Grouping**

```python
# Filter by metadata
luxun_docs = corpus.filter(author='鲁迅')
modern_docs = corpus.filter(lambda doc: doc.metadata.get('year', 0) > 1920)

# Group by metadata key (returns dict for Stylometry)
by_author = corpus.groupby('author')
# {'鲁迅': [['鲁迅', '写', '小说'], ['鲁迅', '写', '杂文']], ...}

# Use with Stylometry
from qhchina.analytics.stylometry import Stylometry
stylo = Stylometry()
result = stylo.fit_transform(corpus.groupby('author'))
```

**Train/Test Split**

```python
# Random split
train, test = corpus.split(train_ratio=0.8, seed=42)

# Stratified split by author
train, test = corpus.split(train_ratio=0.8, stratify_by='author', seed=42)
```

**Saving and Loading**

```python
# Save to JSON (human-readable, indent=2)
corpus.save('corpus.json')

# Save to Pickle (smaller, faster for large corpora)
corpus.save('corpus.pkl')

# Load
loaded = Corpus.load('corpus.json')
loaded = Corpus.load('corpus.pkl')
```

**Integration with Analytics**

```python
from qhchina import Corpus
from qhchina.analytics.topicmodels import LDAGibbsSampler
from qhchina.analytics.collocations import find_collocates
from qhchina.analytics.word2vec import Word2Vec

# Corpus works directly with all analytics modules
corpus = Corpus(documents)

# Topic modeling
lda = LDAGibbsSampler(n_topics=10)
lda.fit(corpus)  # No conversion needed

# Collocations
collocates = find_collocates(corpus, target_words=['经济'])

# Word embeddings
model = Word2Vec(corpus, vector_size=100)
```

---

## API Reference

<!-- API-START -->

<h3 id="corpus">qhchina.corpus.Corpus <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/corpus.py#L71" class="source-link" title="View source on GitHub">[source]</a></h3>

<pre class="signature"><code><span class="sig-name">Corpus</span>(
    <span class="sig-param">documents</span><span class="sig-punct">:</span> <span class="sig-type">list[list[str]] | list[Document] | 'Corpus' | None</span> <span class="sig-punct">=</span> <span class="sig-default">None</span>,
    <span class="sig-param">metadata</span><span class="sig-punct">:</span> <span class="sig-type">dict[str, Any] | None</span> <span class="sig-punct">=</span> <span class="sig-default">None</span>
)</code></pre>

A collection of tokenized documents with metadata.

The Corpus class is designed to integrate seamlessly with qhchina analytics
modules while providing additional functionality for metadata management,
filtering, and grouping.

**Integration with Analytics Modules:**

All analytics modules accept the Corpus directly via iteration:

- ``Word2Vec(corpus)`` - iterates over documents as sentences
- ``LDAGibbsSampler().fit(corpus)`` - converts to list internally
- ``find_collocates(corpus, ...)`` - converts to list internally
- ``Stylometry().fit_transform(corpus.groupby('author'))`` - groups by metadata

**Performance Characteristics:**

- ``__iter__``: O(1) per document - yields token list references (no copy)
- ``list(corpus)``: O(n) - builds list of references (no token copying)
- ``filter()``: O(n) scan, returns view (shared references)
- ``groupby()``: O(n) scan, returns dict of token list references

**Parameters:**
- `documents`: Initial documents. Can be:
  - List of token lists: ``[['word1', 'word2'], ['word3', 'word4']]``
  - List of Document objects
  - Another Corpus (creates independent copy of document list)
- `metadata`: Default metadata applied to all documents added without that key.

**Example:**
```python
>>> from qhchina import Corpus
>>> 
>>> # Create from token lists
>>> corpus = Corpus([
...     ['我', '喜欢', '学习'],
...     ['他', '喜欢', '运动']
... ])
>>> 
>>> # Add documents with metadata
>>> corpus.add(['鲁迅', '是', '作家'], author='鲁迅', date='1920')
>>> 
>>> # Filter and iterate
>>> for tokens in corpus.filter(author='鲁迅'):
...     print(tokens)
```

<h4 id="corpus-add">qhchina.corpus.Corpus.add() <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/corpus.py#L228" class="source-link" title="View source on GitHub">[source]</a></h4>

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
>>> corpus.add(['word1', 'word2'], author='鲁迅', date='1920')
'doc_0'
>>> corpus.add(['word3'], doc_id='custom_id', source='报纸')
'custom_id'
```

<h4 id="corpus-add_many">qhchina.corpus.Corpus.add_many() <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/corpus.py#L279" class="source-link" title="View source on GitHub">[source]</a></h4>

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

<h4 id="corpus-describe">qhchina.corpus.Corpus.describe() <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/corpus.py#L620" class="source-link" title="View source on GitHub">[source]</a></h4>

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

<h4 id="corpus-filter">qhchina.corpus.Corpus.filter() <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/corpus.py#L375" class="source-link" title="View source on GitHub">[source]</a></h4>

<pre class="signature"><code><span class="sig-name">filter</span>(<span class="sig-param">predicate</span><span class="sig-punct">:</span> <span class="sig-type">Callable[[Document], bool] | None</span> <span class="sig-punct">=</span> <span class="sig-default">None</span>, <span class="sig-param">metadata_filters</span><span class="sig-punct">:</span> <span class="sig-type">Any</span>)</code></pre>

Filter documents by predicate function and/or metadata values.

Returns a new Corpus containing only matching documents. The returned
corpus shares document references with the original (no deep copy),
making this memory-efficient.

**Parameters:**
- `predicate`: Optional function that takes a Document and returns bool.
- `**metadata_filters`: Filter by exact metadata value match.

**Returns:**
New Corpus containing matching documents.

**Example:**
```python
>>> # Filter by author
>>> luxun = corpus.filter(author='鲁迅')
>>> 
>>> # Filter by predicate
>>> long_docs = corpus.filter(lambda d: len(d.tokens) > 100)
>>> 
>>> # Combine filters
>>> result = corpus.filter(
...     lambda d: '小说' in d.metadata.get('genre', ''),
...     author='鲁迅'
... )
```

<h4 id="corpus-get">qhchina.corpus.Corpus.get() <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/corpus.py#L320" class="source-link" title="View source on GitHub">[source]</a></h4>

<pre class="signature"><code><span class="sig-name">get</span>(<span class="sig-param">doc_id</span><span class="sig-punct">:</span> <span class="sig-type">str</span>)</code></pre>

Get a document by its ID.

**Parameters:**
- `doc_id`: The document ID to look up.

**Returns:**
The Document object.

**Raises:**
- `KeyError`: If doc_id is not found.

**Example:**
```python
>>> doc = corpus.get('doc_0')
>>> print(doc.tokens, doc.metadata)
```

<h4 id="corpus-groupby">qhchina.corpus.Corpus.groupby() <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/corpus.py#L438" class="source-link" title="View source on GitHub">[source]</a></h4>

<pre class="signature"><code><span class="sig-name">groupby</span>(<span class="sig-param">key</span><span class="sig-punct">:</span> <span class="sig-type">str</span>)</code></pre>

Group documents by a metadata key.

Returns a dictionary mapping metadata values to lists of token lists.
This is the format expected by ``Stylometry.fit_transform()``.

Documents without the specified metadata key are silently skipped.

**Parameters:**
- `key`: Metadata key to group by (e.g., 'author', 'period').

**Returns:**
Dictionary mapping metadata values to lists of token lists.

**Raises:**
- `TypeError`: If key is not a string.

**Example:**
```python
>>> corpus.add(['word1'], author='鲁迅')
>>> corpus.add(['word2'], author='鲁迅')
>>> corpus.add(['word3'], author='茅盾')
>>> 
>>> grouped = corpus.groupby('author')
>>> # {'鲁迅': [['word1'], ['word2']], '茅盾': [['word3']]}
>>> 
>>> # Use with Stylometry
>>> stylo.fit_transform(corpus.groupby('author'))
```

<h4 id="corpus-load">qhchina.corpus.Corpus.load() <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/corpus.py#L728" class="source-link" title="View source on GitHub">[source]</a></h4>

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

<h4 id="corpus-metadata_values">qhchina.corpus.Corpus.metadata_values() <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/corpus.py#L645" class="source-link" title="View source on GitHub">[source]</a></h4>

<pre class="signature"><code><span class="sig-name">metadata_values</span>(<span class="sig-param">key</span><span class="sig-punct">:</span> <span class="sig-type">str</span>)</code></pre>

Get all unique values for a metadata key.

**Parameters:**
- `key`: The metadata key to query.

**Returns:**
Set of unique values (excludes documents without this key).

**Example:**
```python
>>> corpus.metadata_values('author')
{'鲁迅', '茅盾', '巴金'}
```

<h4 id="corpus-remove">qhchina.corpus.Corpus.remove() <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/corpus.py#L341" class="source-link" title="View source on GitHub">[source]</a></h4>

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

<h4 id="corpus-save">qhchina.corpus.Corpus.save() <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/corpus.py#L669" class="source-link" title="View source on GitHub">[source]</a></h4>

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

<h4 id="corpus-split">qhchina.corpus.Corpus.split() <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/corpus.py#L489" class="source-link" title="View source on GitHub">[source]</a></h4>

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

<h4 id="corpus-to_dataframe">qhchina.corpus.Corpus.to_dataframe() <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/corpus.py#L785" class="source-link" title="View source on GitHub">[source]</a></h4>

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

<h3 id="document">qhchina.corpus.Document <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/corpus.py#L45" class="source-link" title="View source on GitHub">[source]</a></h3>

<pre class="signature"><code><span class="sig-name">Document</span>(
    <span class="sig-param">tokens</span><span class="sig-punct">:</span> <span class="sig-type">list[str]</span>,
    <span class="sig-param">metadata</span><span class="sig-punct">:</span> <span class="sig-type">dict[str, Any]</span> <span class="sig-punct">=</span> <span class="sig-default"><factory></span>,
    <span class="sig-param">doc_id</span><span class="sig-punct">:</span> <span class="sig-type">str</span> <span class="sig-punct">=</span> <span class="sig-default">''</span>
)</code></pre>

A single document with tokens and metadata.

This is a lightweight dataclass using slots for memory efficiency.
Tokens are stored as-is without copying.

**Parameters:**
- `tokens`: List of string tokens (the segmented text).
- `metadata`: Dictionary of arbitrary metadata (author, date, source, etc.).
- `doc_id`: Unique identifier for the document.

<br>

<!-- API-END -->
