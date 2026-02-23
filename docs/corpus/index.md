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
  - name: Corpus.clear_cache()
    anchor: corpus-clear_cache
  - name: Corpus.count()
    anchor: corpus-count
  - name: Corpus.describe()
    anchor: corpus-describe
  - name: Corpus.download()
    anchor: corpus-download
  - name: Corpus.filter()
    anchor: corpus-filter
  - name: Corpus.get()
    anchor: corpus-get
  - name: Corpus.groupby()
    anchor: corpus-groupby
  - name: Corpus.hapax_dislegomena()
    anchor: corpus-hapax_dislegomena
  - name: Corpus.hapax_legomena()
    anchor: corpus-hapax_legomena
  - name: Corpus.list_cached()
    anchor: corpus-list_cached
  - name: Corpus.list_remote()
    anchor: corpus-list_remote
  - name: Corpus.load()
    anchor: corpus-load
  - name: Corpus.mattr()
    anchor: corpus-mattr
  - name: Corpus.metadata_values()
    anchor: corpus-metadata_values
  - name: Corpus.remove()
    anchor: corpus-remove
  - name: Corpus.save()
    anchor: corpus-save
  - name: Corpus.shuffle()
    anchor: corpus-shuffle
  - name: Corpus.split()
    anchor: corpus-split
  - name: Corpus.to_dataframe()
    anchor: corpus-to_dataframe
  - name: Corpus.tokenize()
    anchor: corpus-tokenize
  - name: Corpus.type_token_ratio()
    anchor: corpus-type_token_ratio
  - name: Document
    anchor: document
  - name: Document.get()
    anchor: document-get
has_examples: True
import_from: qhchina.corpus
---

# Corpus Management

Managing document collections with associated metadata (author, date, genre) is essential for comparative text analysis. The `Corpus` class provides a unified way to manage tokenized documents with metadata, supporting filtering, grouping, and basic corpus statistics. It integrates seamlessly with all qhchina analytics modules.

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
by_author = corpus.filter(lambda doc: len(doc) >= 20).groupby('author')

# Use with Stylometry - only analyze substantial documents
stylo = Stylometry()
stylo.fit_transform(
    corpus.filter(lambda doc: len(doc) >= 100).groupby('author')
)

# Multiple filters can be chained
modern_fiction = (
    corpus
    .filter(lambda doc: doc["year"] >= 1920)
    .filter(genre='小说')
    .filter(lambda doc: len(doc) >= 50)
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

<h3 id="corpus">qhchina.corpus.Corpus <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/corpus.py#L234" class="source-link" title="View source on GitHub">[source]</a></h3>

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
corpus = Corpus()
corpus.add(['没有', '吃', '过', '人', '的', '孩子'], author='鲁迅')
corpus.add(['太阳', '刚刚', '下', '了', '地平线'], author='茅盾')

for tokens in corpus.filter(author='鲁迅'):
    print(tokens)
```

<h4 id="corpus-add">qhchina.corpus.Corpus.add() <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/corpus.py#L374" class="source-link" title="View source on GitHub">[source]</a></h4>

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
corpus.add(['没有', '吃', '过', '人', '的', '孩子'], author='鲁迅')
'doc_0'
corpus.add(['小溪', '流', '下去'], doc_id='边城', author='沈从文')
'边城'
corpus[0].tokens      # Access by index
['没有', '吃', '过', '人', '的', '孩子']
corpus['边城'].tokens  # Access by doc_id
['小溪', '流', '下去']
```

<h4 id="corpus-add_many">qhchina.corpus.Corpus.add_many() <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/corpus.py#L429" class="source-link" title="View source on GitHub">[source]</a></h4>

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
docs = [['word1'], ['word2', 'word3']]
corpus.add_many(docs, period='民国')
['doc_0', 'doc_1']
```

<h4 id="corpus-clear_cache">qhchina.corpus.Corpus.clear_cache() <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/corpus.py#L1339" class="source-link" title="View source on GitHub">[source]</a></h4>

<pre class="signature"><code><span class="sig-name">clear_cache</span>(<span class="sig-param">corpus</span><span class="sig-punct">:</span> <span class="sig-type">str | None</span> <span class="sig-punct">=</span> <span class="sig-default">None</span>)</code></pre>

Clear cached corpus files.

**Parameters:**
- `corpus`: Name of corpus to clear, or None to clear all cached corpora.

**Example:**
```python
Corpus.clear_cache('songshi')  # Clear specific corpus
Corpus.clear_cache()           # Clear all corpora
```

<h4 id="corpus-count">qhchina.corpus.Corpus.count() <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/corpus.py#L999" class="source-link" title="View source on GitHub">[source]</a></h4>

<pre class="signature"><code><span class="sig-name">count</span>(<span class="sig-param">word</span><span class="sig-punct">:</span> <span class="sig-type">str</span>)</code></pre>

Return the number of times a word appears across all documents.

**Parameters:**
- `word`: The word to count.

**Returns:**
Total count of the word in the corpus. Returns 0 if the word
is not found.

**Example:**
```python
corpus.count('的')
1523
corpus.count('不存在的词')
0
```

<h4 id="corpus-describe">qhchina.corpus.Corpus.describe() <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/corpus.py#L789" class="source-link" title="View source on GitHub">[source]</a></h4>

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
corpus.describe()
{'documents': 100, 'tokens': 5432, 'vocab_size': 1205, ...}
```

<h4 id="corpus-download">qhchina.corpus.Corpus.download() <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/corpus.py#L1183" class="source-link" title="View source on GitHub">[source]</a></h4>

<pre class="signature"><code><span class="sig-name">download</span>(<span class="sig-param">corpus</span><span class="sig-punct">:</span> <span class="sig-type">str</span>, <span class="sig-param">show_progress</span><span class="sig-punct">:</span> <span class="sig-type">bool</span> <span class="sig-punct">=</span> <span class="sig-default">True</span>, <span class="sig-param">force_download</span><span class="sig-punct">:</span> <span class="sig-type">bool</span> <span class="sig-punct">=</span> <span class="sig-default">False</span>)</code></pre>

Download a corpus from the qhchina-data GitHub repository.

Downloads .txt files from `qhchina-data/corpora/{corpus}/` and creates
a Corpus where each file becomes a Document. The raw text is stored in
the `raw_text` metadata field; tokens are initially empty (use a
segmenter to tokenize).

**Parameters:**
- `corpus`: Either:
  - A corpus name (e.g., ``'songshi'``) to download all .txt files
    from that corpus folder
  - A full path (e.g., ``'songshi/宋史.txt'``) to download a single file
- `show_progress`: Show download progress (default True).
- `force_download`: Re-download even if files are cached (default False).

**Returns:**
Corpus with one Document per downloaded file. Each document has:
- ``doc_id``: filename without .txt extension (e.g., '莫言_红高粱家族')
- ``tokens``: empty list (raw text, needs segmentation)
- ``metadata``: ``{'corpus': corpus_name, 'raw_text': content}``

**Raises:**
- `ValueError`: If corpus or file not found in repository.
- `requests.RequestException`: If download fails.

**Example:**
```python
# Download all files from a corpus
corpus = Corpus.download('songshi')
print(f"Downloaded {len(corpus)} documents")

# Download a single file
corpus = Corpus.download('宋史/宋史.txt')

# Download and tokenize in one chain (uses default jieba backend)
corpus = Corpus.download('songshi').tokenize()

# Or use a custom segmenter
from qhchina.preprocessing import create_segmenter
segmenter = create_segmenter('spacy', filters={'min_word_length': 2})
corpus = Corpus.download('songshi').tokenize(segmenter=segmenter)
```

<h4 id="corpus-filter">qhchina.corpus.Corpus.filter() <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/corpus.py#L525" class="source-link" title="View source on GitHub">[source]</a></h4>

<pre class="signature"><code><span class="sig-name">filter</span>(<span class="sig-param">predicate</span><span class="sig-punct">:</span> <span class="sig-type">Callable[[Document], bool] | None</span> <span class="sig-punct">=</span> <span class="sig-default">None</span>, <span class="sig-param">metadata_filters</span><span class="sig-punct">:</span> <span class="sig-type">Any</span>)</code></pre>

Return a new Corpus containing only matching documents.

**Parameters:**
- `predicate`: Function that takes a Document and returns bool.
- `**metadata_filters`: Filter by exact metadata value match.

**Returns:**
New Corpus (shares document references, memory-efficient).

**Example:**
```python
luxun = corpus.filter(author='鲁迅')
pre_1930 = corpus.filter(lambda d: d["year"] < 1930)
```

<h4 id="corpus-get">qhchina.corpus.Corpus.get() <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/corpus.py#L470" class="source-link" title="View source on GitHub">[source]</a></h4>

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
corpus['边城'].tokens   # By doc_id
corpus[0].tokens        # By index
```

<h4 id="corpus-groupby">qhchina.corpus.Corpus.groupby() <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/corpus.py#L592" class="source-link" title="View source on GitHub">[source]</a></h4>

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
corpus.add(['没有', '吃', '过', '人'], author='鲁迅')
corpus.add(['救救', '孩子'], author='鲁迅')
corpus.add(['太阳', '下', '了', '地平线'], author='茅盾')

grouped = corpus.groupby('author')
# {'鲁迅': [['没有', '吃', ...], ['救救', '孩子']], '茅盾': [[...]]}

# Use with Stylometry
stylo.fit_transform(corpus.groupby('author'))
```

<h4 id="corpus-hapax_dislegomena">qhchina.corpus.Corpus.hapax_dislegomena() <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/corpus.py#L982" class="source-link" title="View source on GitHub">[source]</a></h4>

<pre class="signature"><code><span class="sig-name">hapax_dislegomena</span>()</code></pre>

Return words that appear exactly twice in the corpus.

Hapax dislegomena (Greek: "said twice") complement hapax legomena
in vocabulary richness analysis.

**Returns:**
Set of words with frequency == 2.

**Example:**
```python
dis = corpus.hapax_dislegomena()
len(dis)
523
```

<h4 id="corpus-hapax_legomena">qhchina.corpus.Corpus.hapax_legomena() <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/corpus.py#L958" class="source-link" title="View source on GitHub">[source]</a></h4>

<pre class="signature"><code><span class="sig-name">hapax_legomena</span>()</code></pre>

Return words that appear exactly once in the corpus.

Hapax legomena (Greek: "said once") are words occurring only once.
They are important for:
- Vocabulary richness analysis
- Authorship attribution
- Zipf's law studies

A corpus typically has 40-60% of its vocabulary as hapax legomena.

**Returns:**
Set of words with frequency == 1.

**Example:**
```python
hapax = corpus.hapax_legomena()
len(hapax)
1247
print(f"Hapax ratio: {len(hapax) / corpus.vocab_size:.1%}")
Hapax ratio: 48.2%
```

<h4 id="corpus-list_cached">qhchina.corpus.Corpus.list_cached() <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/corpus.py#L1310" class="source-link" title="View source on GitHub">[source]</a></h4>

<pre class="signature"><code><span class="sig-name">list_cached</span>()</code></pre>

List locally cached corpora.

**Returns:**
List of dicts with cached corpus information:
``[{'name': 'songshi', 'files': 3, 'size_mb': 1.5}, ...]``

**Example:**
```python
Corpus.list_cached()
[{'name': 'songshi', 'files': 3, 'size_mb': 1.5}]
```

<h4 id="corpus-list_remote">qhchina.corpus.Corpus.list_remote() <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/corpus.py#L1285" class="source-link" title="View source on GitHub">[source]</a></h4>

<pre class="signature"><code><span class="sig-name">list_remote</span>()</code></pre>

List available corpora in the qhchina-data repository.

**Returns:**
List of dicts with corpus information:
``[{'name': 'songshi', 'type': 'dir'}, ...]``

**Example:**
```python
Corpus.list_remote()
[{'name': 'songshi', 'type': 'dir'}, {'name': 'mingshi', 'type': 'dir'}]
```

<h4 id="corpus-load">qhchina.corpus.Corpus.load() <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/corpus.py#L1108" class="source-link" title="View source on GitHub">[source]</a></h4>

<pre class="signature"><code><span class="sig-name">load</span>(<span class="sig-param">path</span><span class="sig-punct">:</span> <span class="sig-type">str | Path</span>, <span class="sig-param">format</span><span class="sig-punct">:</span> <span class="sig-type">str | None</span> <span class="sig-punct">=</span> <span class="sig-default">None</span>)</code></pre>

Load corpus from a file.

**Parameters:**
- `path`: Input file path.
- `format`: File format - 'json', 'pickle', or 'txt'. If None, inferred from
  file extension (.json for JSON, .pkl/.pickle for pickle, .txt for text).

**Returns:**
Loaded Corpus object.

**Example:**
```python
corpus = Corpus.load('my_corpus.json')   # JSON format
corpus = Corpus.load('my_corpus.pkl')    # Pickle format
corpus = Corpus.load('my_corpus.txt')    # Streaming text format
```

<h4 id="corpus-mattr">qhchina.corpus.Corpus.mattr() <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/corpus.py#L888" class="source-link" title="View source on GitHub">[source]</a></h4>

<pre class="signature"><code><span class="sig-name">mattr</span>(<span class="sig-param">window_size</span><span class="sig-punct">:</span> <span class="sig-type">int</span> <span class="sig-punct">=</span> <span class="sig-default">500</span>)</code></pre>

Calculate Moving Average Type-Token Ratio (MATTR).

MATTR is more reliable than standard TTR for comparing texts of
different lengths. It calculates TTR for a sliding window across
the corpus and returns the mean.

**Parameters:**
- `window_size`: Number of tokens per window. Default is 500,
  which is standard in the literature. Smaller windows
  give higher MATTR values.

**Returns:**
Mean TTR across all windows (0.0 to 1.0).

**Raises:**
- `ValueError`: If corpus has fewer tokens than window_size.

**Example:**
```python
corpus.mattr()
0.723
corpus.mattr(window_size=100)
0.856
```

<h4 id="corpus-metadata_values">qhchina.corpus.Corpus.metadata_values() <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/corpus.py#L814" class="source-link" title="View source on GitHub">[source]</a></h4>

<pre class="signature"><code><span class="sig-name">metadata_values</span>(<span class="sig-param">key</span><span class="sig-punct">:</span> <span class="sig-type">str</span>)</code></pre>

Get all unique values for a metadata key.

**Parameters:**
- `key`: The metadata key to query.

**Returns:**
Set of unique values (excludes documents without this key).

**Example:**
```python
corpus.metadata_values('author')
{'鲁迅', '茅盾', '沈从文'}
```

<h4 id="corpus-remove">qhchina.corpus.Corpus.remove() <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/corpus.py#L491" class="source-link" title="View source on GitHub">[source]</a></h4>

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
removed = corpus.remove('doc_0')
print(f"Removed document with {len(removed.tokens)} tokens")
```

<h4 id="corpus-save">qhchina.corpus.Corpus.save() <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/corpus.py#L1022" class="source-link" title="View source on GitHub">[source]</a></h4>

<pre class="signature"><code><span class="sig-name">save</span>(<span class="sig-param">path</span><span class="sig-punct">:</span> <span class="sig-type">str | Path</span>, <span class="sig-param">format</span><span class="sig-punct">:</span> <span class="sig-type">str | None</span> <span class="sig-punct">=</span> <span class="sig-default">None</span>)</code></pre>

Save corpus to a file.

**Parameters:**
- `path`: Output file path.
- `format`: File format - 'json', 'pickle', or 'txt'. If None, inferred from
  file extension (.json for JSON, .pkl/.pickle for pickle, .txt for text).
  
  - json: Human-readable, includes metadata
  - pickle: Compact binary, includes metadata  
  - txt: Streaming format for Word2Vec/TempRefWord2Vec (tokens only, no metadata)

**Example:**
```python
corpus.save('my_corpus.json')           # JSON format
corpus.save('my_corpus.pkl')            # Pickle format (smaller)
corpus.save('my_corpus.txt')            # Streaming text format
corpus.save('corpus', format='pickle')  # Explicit format
```

<h4 id="corpus-shuffle">qhchina.corpus.Corpus.shuffle() <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/corpus.py#L571" class="source-link" title="View source on GitHub">[source]</a></h4>

<pre class="signature"><code><span class="sig-name">shuffle</span>(<span class="sig-param">seed</span><span class="sig-punct">:</span> <span class="sig-type">int | None</span> <span class="sig-punct">=</span> <span class="sig-default">None</span>)</code></pre>

Shuffle documents in-place.

**Parameters:**
- `seed`: Random seed for reproducibility. If None, uses the global
  random seed from ``qhchina.set_random_seed()``.

**Example:**
```python
corpus = Corpus([['a', 'b'], ['c', 'd'], ['e', 'f']])
corpus.shuffle(seed=42)
list(corpus)  # Documents in random order
```

<h4 id="corpus-split">qhchina.corpus.Corpus.split() <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/corpus.py#L643" class="source-link" title="View source on GitHub">[source]</a></h4>

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
train, test = corpus.split(0.8, seed=42)
train_stratified, test_stratified = corpus.split(
    0.8, stratify_by='author', seed=42
)
```

<h4 id="corpus-to_dataframe">qhchina.corpus.Corpus.to_dataframe() <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/corpus.py#L1371" class="source-link" title="View source on GitHub">[source]</a></h4>

<pre class="signature"><code><span class="sig-name">to_dataframe</span>()</code></pre>

Convert corpus to a pandas DataFrame.

**Returns:**
DataFrame with columns: doc_id, tokens, token_count, and all metadata keys.

**Example:**
```python
df = corpus.to_dataframe()
df.groupby('author')['token_count'].mean()
```

<h4 id="corpus-tokenize">qhchina.corpus.Corpus.tokenize() <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/corpus.py#L1400" class="source-link" title="View source on GitHub">[source]</a></h4>

<pre class="signature"><code><span class="sig-name">tokenize</span>(<span class="sig-param">segmenter</span><span class="sig-punct">:</span> <span class="sig-type">Any | None</span> <span class="sig-punct">=</span> <span class="sig-default">None</span>, <span class="sig-param">backend</span><span class="sig-punct">:</span> <span class="sig-type">str</span> <span class="sig-punct">=</span> <span class="sig-default">'jieba'</span>, <span class="sig-param">strategy</span><span class="sig-punct">:</span> <span class="sig-type">str</span> <span class="sig-punct">=</span> <span class="sig-default">'document'</span>, <span class="sig-param">raw_text_key</span><span class="sig-punct">:</span> <span class="sig-type">str</span> <span class="sig-punct">=</span> <span class="sig-default">'raw_text'</span>, <span class="sig-param">skip_tokenized</span><span class="sig-punct">:</span> <span class="sig-type">bool</span> <span class="sig-punct">=</span> <span class="sig-default">True</span>, <span class="sig-param">kwargs</span>)</code></pre>

Tokenize all documents in-place using a segmenter.

Applies a segmenter to each document's raw text (from metadata) and
populates the document's tokens list. This is typically used after
`Corpus.download()` which loads raw text but leaves tokens empty.

**Parameters:**
- `segmenter`: Pre-configured segmenter instance. If provided, ``backend``,
  ``strategy``, and ``kwargs`` are ignored.
- `backend`: Segmentation backend if no segmenter provided. Options:
  ``'spacy'``, ``'pkuseg'``, ``'jieba'`` (default), ``'bert'``, ``'llm'``.
- `strategy`: Text splitting strategy. Options:
  - ``'document'`` (default): Treat entire raw_text as one unit.
  - ``'sentence'``: Split by sentence boundaries into separate documents.
  - ``'line'``: Split by newlines into separate documents.
  - ``'chunk'``: Split into fixed-size chunks as separate documents.
  
  For strategies other than ``'document'``, the corpus is modified
  in-place: each original document is replaced by multiple new documents
  (one per sentence/line/chunk). New documents inherit metadata
  (excluding ``raw_text_key``) and get ``doc_id``s like
  ``"{original_id}_0"``, ``"{original_id}_1"``, etc.
- `raw_text_key`: Metadata key containing the raw text (default: ``'raw_text'``).
- `skip_tokenized`: If True, skip documents that already have tokens
  (default: True).
- `**kwargs`: Additional arguments passed to ``create_segmenter()``
  (e.g., ``filters``, ``user_dict``, ``chunk_size``).

**Returns:**
Self for method chaining (always modifies in-place).

**Raises:**
- `ImportError`: If the specified backend is not installed.

**Example:**
```python
# Download and tokenize in one chain
corpus = Corpus.download('songshi').tokenize()

# Split into sentences (modifies corpus in-place)
corpus.tokenize(strategy='sentence')
# Original doc "宋史" is replaced by "宋史_0", "宋史_1", ...

# With filters
corpus.tokenize(
    backend='spacy',
    filters={'stopwords': stopwords, 'min_word_length': 2}
)
```

<h4 id="corpus-type_token_ratio">qhchina.corpus.Corpus.type_token_ratio() <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/corpus.py#L834" class="source-link" title="View source on GitHub">[source]</a></h4>

<pre class="signature"><code><span class="sig-name">type_token_ratio</span>(<span class="sig-param">variant</span><span class="sig-punct">:</span> <span class="sig-type">str</span> <span class="sig-punct">=</span> <span class="sig-default">'standard'</span>)</code></pre>

Calculate Type-Token Ratio (TTR) for the corpus.

TTR measures lexical diversity - the ratio of unique words (types)
to total words (tokens). Higher values indicate more diverse vocabulary.

Note: Standard TTR is sensitive to text length (longer texts tend to
have lower TTR). Use 'root' or 'log' variants for length-normalized
measures, or use mattr() for comparing texts of different lengths.

**Parameters:**
- `variant`: Calculation method:
  - 'standard': types / tokens (range: 0.0 to 1.0)
  - 'root': types / sqrt(tokens) - Guiraud's R
  - 'log': log(types) / log(tokens) - Herdan's C

**Returns:**
The TTR value. For 'standard', this is between 0.0 and 1.0.
For 'root' and 'log', values vary based on corpus size.

**Raises:**
- `ValueError`: If variant is not recognized or corpus is empty.

**Example:**
```python
corpus.type_token_ratio()
0.342
corpus.type_token_ratio(variant='root')
45.67
corpus.type_token_ratio(variant='log')
0.891
```

<br>

<h3 id="document">qhchina.corpus.Document <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/corpus.py#L192" class="source-link" title="View source on GitHub">[source]</a></h3>

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

<h4 id="document-get">qhchina.corpus.Document.get() <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/corpus.py#L229" class="source-link" title="View source on GitHub">[source]</a></h4>

<pre class="signature"><code><span class="sig-name">get</span>(<span class="sig-param">key</span><span class="sig-punct">:</span> <span class="sig-type">str</span>, <span class="sig-param">default</span><span class="sig-punct">:</span> <span class="sig-type">Any</span> <span class="sig-punct">=</span> <span class="sig-default">None</span>)</code></pre>

Get metadata value with default.

<br>

<!-- API-END -->
