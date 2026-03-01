---
layout: docs_with_sidebar
title: Collocation Analysis
permalink: /docs/collocations/
functions:
  - name: FilterOptions
    anchor: filteroptions
  - name: CoocMatrix
    anchor: coocmatrix
  - name: CoocMatrix.get()
    anchor: coocmatrix-get
  - name: CoocMatrix.sum()
    anchor: coocmatrix-sum
  - name: CoocMatrix.to_dataframe()
    anchor: coocmatrix-to_dataframe
  - name: CoocMatrix.to_dense()
    anchor: coocmatrix-to_dense
  - name: CoocMatrix.to_ppmi()
    anchor: coocmatrix-to_ppmi
  - name: find_collocates()
    anchor: find_collocates
  - name: cooc_matrix()
    anchor: cooc_matrix
  - name: plot_collocates()
    anchor: plot_collocates
  - name: kwic()
    anchor: kwic
  - name: compare_collocates()
    anchor: compare_collocates
has_examples: True
import_from: qhchina.analytics.collocations
---

# Collocation Analysis

Collocations are word combinations that occur together more frequently than expected by chance, revealing meaningful linguistic patterns and conceptual associations. Statistical measures like log-likelihood and chi-square help distinguish genuine collocations from random co-occurrences. The `qhchina.analytics.collocations` module provides tools for identifying and analyzing these patterns in Chinese text.

```python
from qhchina.analytics.collocations import find_collocates

collocates = find_collocates(sentences, target_words=["经济"], horizon=5)
top_collocates = collocates.sort_values("p_value").head(10)  # Most significant collocates
```

---

## Examples

**Finding Collocates**

```python
from qhchina.analytics.collocations import find_collocates

sentences = [
    ["追求", "自由", "理想", "青年"],
    ["爱情", "自由", "婚姻", "传统"],
    ["思想", "自由", "解放", "革命"],
]

# Find collocates of "自由"
collocates = find_collocates(
    sentences,
    target_words=["自由"],
    horizon=3,
    filters={'max_p': 0.05}
)

# Top results
print(collocates.head())
```

**Comparing Collocates Across Authors**

```python
from qhchina.analytics.collocations import find_collocates

luxun_collocates = find_collocates(luxun_texts, ["爱情"], horizon=3)
bingxin_collocates = find_collocates(bingxin_texts, ["爱情"], horizon=3)
```

**Directional Collocates**

```python
# Words to the RIGHT of target
right = find_collocates(sentences, ["自由"], horizon=(0, 3))

# Words to the LEFT of target  
left = find_collocates(sentences, ["自由"], horizon=(3, 0))
```

**Visualizing Collocates**

```python
from qhchina.analytics.collocations import find_collocates, plot_collocates

# Find collocates
collocates = find_collocates(
    sentences=sentences,
    target_words=["自由"],
    alternative='two-sided',
    filters={'max_p': 0.05, 'min_obs_local': 2}
)

# Default: ratio vs p-value (log scales)
plot_collocates(collocates, title="Collocates of 自由")

# Observed vs expected with diagonal reference line
plot_collocates(
    collocates,
    x_col='exp_local',
    y_col='obs_local',
    x_scale='log',
    y_scale='log',
    show_diagonal=True,
    title='Observed vs Expected'
)

# Color by ratio, label top 15 most strongly associated
plot_collocates(
    collocates,
    x_col='obs_global',
    y_col='p_value',
    color_by='ratio_local',
    colormap='RdYlBu_r',
    show_labels=True,
    label_top_n=15,
    title='Corpus Frequency vs Significance'
)
```

**Creating Co-occurrence Matrix**

```python
from qhchina.analytics.collocations import cooc_matrix

# Create co-occurrence matrix (returns CoocMatrix object)
matrix = cooc_matrix(
    documents=sentences,
    method="window",
    horizon=2,
    min_word_count=2
)

# Access co-occurrence counts with flexible indexing
target_word = "经济"
if target_word in matrix.vocab:
    cooc_with_target = matrix[target_word]  # Returns dict {word: count}
    print(f"Words co-occurring with '{target_word}':")
    for word, count in sorted(cooc_with_target.items(), key=lambda x: -x[1])[:10]:
        print(f"  {word}: {count}")

# Get a specific pair count
count = matrix["经济", "发展"]

# Convert to DataFrame if needed
df = matrix.to_dataframe()
```

---

## API Reference

<!-- API-START -->

<h3 id="filteroptions">qhchina.analytics.collocations.FilterOptions <a href="#filteroptions" class="header-link" title="Permalink">#</a> <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/analytics/collocations.py#L313" class="source-link" title="View source on GitHub">[source]</a></h3>

<pre class="signature"><code><span class="sig-name">FilterOptions</span>(<span class="sig-param">*args</span>, <span class="sig-param">**kwargs</span>)</code></pre>

Type definition for filter options in collocation analysis.

<br>

<h3 id="coocmatrix">qhchina.analytics.collocations.CoocMatrix <a href="#coocmatrix" class="header-link" title="Permalink">#</a> <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/analytics/collocations.py#L41" class="source-link" title="View source on GitHub">[source]</a></h3>

<pre class="signature"><code><span class="sig-name">CoocMatrix</span>(
    <span class="sig-param">matrix</span><span class="sig-punct">:</span> <span class="sig-type">scipy.sparse._csr.csr_matrix</span>,
    <span class="sig-param">vocab_list</span><span class="sig-punct">:</span> <span class="sig-type">list[str]</span>,
    <span class="sig-param">word_to_index</span><span class="sig-punct">:</span> <span class="sig-type">dict[str, int]</span>
)</code></pre>

Co-occurrence matrix with numpy-like indexing by word or index.

Indexing:

- `matrix[w]` or `matrix[i]` → 1D row vector, shape `(V,)`
- `matrix[w1, w2]` or `matrix[i, j]` → scalar `int`
- `matrix[[w1, w2]]` → 2D row submatrix, shape `(N, V)`
- `matrix[w, :]` → 1D row vector, shape `(V,)`
- `matrix[:, w]` → 1D column vector, shape `(V,)`
- `matrix[:, [w1, w2]]` → 2D column submatrix, shape `(V, N)`

Internally stores data as a scipy sparse CSR matrix for memory efficiency.

**Parameters:**
- `vocab` (list[str]): List of vocabulary words in index order.
- `word_to_index` (dict[str, int]): Mapping from words to matrix indices.
- `index_to_word` (dict[int, str]): Mapping from matrix indices to words.
- `shape` (tuple[int, int]): Shape of the matrix (vocab_size, vocab_size).
- `nnz` (int): Number of non-zero entries.

**Example:**
```python
matrix = cooc_matrix(documents, horizon=5)
matrix["fox", "dog"]
42
matrix["fox"]                          # 1D row vector
array([0, 0, 10, 8, 42, ...])
matrix[["fox", "dog"]]                 # 2D submatrix
array([[0, 0, 10, ...], [0, 3, 0, ...]])
df = matrix.to_dataframe()
arr = matrix.to_dense()
```

<h4 id="coocmatrix-get">qhchina.analytics.collocations.CoocMatrix.get() <a href="#coocmatrix-get" class="header-link" title="Permalink">#</a> <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/analytics/collocations.py#L155" class="source-link" title="View source on GitHub">[source]</a></h4>

<pre class="signature"><code><span class="sig-name">get</span>(<span class="sig-param">row_key</span>, <span class="sig-param">col_key</span>, <span class="sig-param">default</span><span class="sig-punct">:</span> <span class="sig-type">int | float</span> <span class="sig-punct">=</span> <span class="sig-default">0</span>)</code></pre>

Get a co-occurrence count with a default value for missing pairs.

**Parameters:**
- `row_key`: Row word or index.
- `col_key`: Column word or index.
- `default`: Value to return if the pair is not found or out of vocabulary.

**Returns:**
Co-occurrence count, or default if not found.

<h4 id="coocmatrix-sum">qhchina.analytics.collocations.CoocMatrix.sum() <a href="#coocmatrix-sum" class="header-link" title="Permalink">#</a> <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/analytics/collocations.py#L228" class="source-link" title="View source on GitHub">[source]</a></h4>

<pre class="signature"><code><span class="sig-name">sum</span>(<span class="sig-param">axis</span><span class="sig-punct">:</span> <span class="sig-type">int | None</span> <span class="sig-punct">=</span> <span class="sig-default">None</span>)</code></pre>

Sum co-occurrence counts along an axis.

**Parameters:**
- `axis`: Axis along which to sum.
  - None: Total sum of all entries (scalar int).
  - 0: Column sums, shape ``(V,)``.
  - 1: Row sums, shape ``(V,)``.

**Returns:**
int for total sum, or 1-D numpy array of shape ``(V,)``.

<h4 id="coocmatrix-to_dataframe">qhchina.analytics.collocations.CoocMatrix.to_dataframe() <a href="#coocmatrix-to_dataframe" class="header-link" title="Permalink">#</a> <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/analytics/collocations.py#L183" class="source-link" title="View source on GitHub">[source]</a></h4>

<pre class="signature"><code><span class="sig-name">to_dataframe</span>()</code></pre>

Convert to a pandas DataFrame with word labels.

Warning: This may use significant memory for large vocabularies.

**Returns:**
DataFrame with vocabulary words as both index and columns.

<h4 id="coocmatrix-to_dense">qhchina.analytics.collocations.CoocMatrix.to_dense() <a href="#coocmatrix-to_dense" class="header-link" title="Permalink">#</a> <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/analytics/collocations.py#L172" class="source-link" title="View source on GitHub">[source]</a></h4>

<pre class="signature"><code><span class="sig-name">to_dense</span>()</code></pre>

Convert to a dense NumPy array.

Warning: This may use significant memory for large vocabularies.

**Returns:**
2D numpy array of shape (vocab_size, vocab_size).

<h4 id="coocmatrix-to_ppmi">qhchina.analytics.collocations.CoocMatrix.to_ppmi() <a href="#coocmatrix-to_ppmi" class="header-link" title="Permalink">#</a> <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/analytics/collocations.py#L248" class="source-link" title="View source on GitHub">[source]</a></h4>

<pre class="signature"><code><span class="sig-name">to_ppmi</span>(<span class="sig-param">alpha</span><span class="sig-punct">:</span> <span class="sig-type">float</span> <span class="sig-punct">=</span> <span class="sig-default">0.75</span>)</code></pre>

Convert raw counts to Positive Pointwise Mutual Information.

Returns a new CoocMatrix where each entry is:

.. math::
    \text{PPMI}(w, c) = \max\bigl(0,\; \log_2 \frac{P(w,c)}{P(w)\,P_\alpha(c)}\bigr)

Context distribution smoothing raises context (column) frequencies
to the power of `alpha` before computing PMI, which down-weights
frequent contexts (Levy et al., 2015).

**Parameters:**
- `alpha`: Context distribution smoothing exponent. 1.0 means no
  smoothing (standard PMI). 0.75 is the recommended default.

**Returns:**
New CoocMatrix with PPMI float64 values (sparse).

<br>

<h3 id="find_collocates">qhchina.analytics.collocations.find_collocates() <a href="#find_collocates" class="header-link" title="Permalink">#</a> <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/analytics/collocations.py#L667" class="source-link" title="View source on GitHub">[source]</a></h3>

<pre class="signature"><code><span class="sig-name">find_collocates</span>(
    <span class="sig-param">sentences</span><span class="sig-punct">:</span> <span class="sig-type">Iterable[list[str]]</span>,
    <span class="sig-param">target_words</span><span class="sig-punct">:</span> <span class="sig-type">str | list[str]</span>,
    <span class="sig-param">method</span><span class="sig-punct">:</span> <span class="sig-type">str</span> <span class="sig-punct">=</span> <span class="sig-default">'window'</span>,
    <span class="sig-param">horizon</span><span class="sig-punct">:</span> <span class="sig-type">int | tuple | None</span> <span class="sig-punct">=</span> <span class="sig-default">None</span>,
    <span class="sig-param">filters</span><span class="sig-punct">:</span> <span class="sig-type">qhchina.analytics.collocations.FilterOptions | None</span> <span class="sig-punct">=</span> <span class="sig-default">None</span>,
    <span class="sig-param">correction</span><span class="sig-punct">:</span> <span class="sig-type">str | None</span> <span class="sig-punct">=</span> <span class="sig-default">None</span>,
    <span class="sig-param">as_dataframe</span><span class="sig-punct">:</span> <span class="sig-type">bool</span> <span class="sig-punct">=</span> <span class="sig-default">True</span>,
    <span class="sig-param">max_sentence_length</span><span class="sig-punct">:</span> <span class="sig-type">int | None</span> <span class="sig-punct">=</span> <span class="sig-default">256</span>,
    <span class="sig-param">alternative</span><span class="sig-punct">:</span> <span class="sig-type">str</span> <span class="sig-punct">=</span> <span class="sig-default">'greater'</span>,
    <span class="sig-param">sort_by</span><span class="sig-punct">:</span> <span class="sig-type">str</span> <span class="sig-punct">=</span> <span class="sig-default">'obs_local'</span>,
    <span class="sig-param">ascending</span><span class="sig-punct">:</span> <span class="sig-type">bool</span> <span class="sig-punct">=</span> <span class="sig-default">False</span>,
    <span class="sig-param">batch_words</span><span class="sig-punct">:</span> <span class="sig-type">int</span> <span class="sig-punct">=</span> <span class="sig-default">100000</span>
)</code></pre>

Find collocates for target words in a corpus of sentences.

Processes data in streaming batches to keep memory low even for very large
corpora. The data is iterated twice (vocabulary building, then counting), 
so a restartable iterable is required. Lists, file-backed iterators, and 
restartable generator classes all work; single-use generators do not.

**Parameters:**
- `sentences` (Iterable[list[str]]): Restartable iterable of tokenized
  sentences (each sentence a list of string tokens).
- `target_words` (str | list[str]): Target word(s) to find collocates for.
- `method` (str): Method to use for calculating collocations. Either 'window' or 
  'sentence'. 'window' uses a sliding window of specified horizon around each 
  token. 'sentence' considers whole sentences as context units (horizon not 
  applicable). Default is 'window'.
- `horizon` (int | tuple | None): Context window size relative to the target 
  word. Only applicable when method='window'. Must be None when method='sentence'.
  - int: Symmetric window (e.g., 5 means 5 words on each side of target)
  - tuple: Asymmetric window (left, right) specifying how many words to look
    on each side of the target word: (0, 5) finds collocates up to 5 words to 
    the RIGHT of target; (5, 0) finds collocates up to 5 words to the LEFT; 
    (2, 3) finds collocates 2 words left and 3 words right of target.
  - None: Uses default of 5 for 'window' method
- `filters` (FilterOptions | None): Dictionary of filters to apply to results.
  All filters (except ``max_adjusted_p``) are applied BEFORE multiple testing 
  correction, defining the "family" of hypotheses being tested. This maximizes 
  statistical power by not correcting for collocates that were never of interest.
  
  Available filters:
  
  - 'stopwords': list[str] - Words to exclude from results
  - 'min_word_length': int - Minimum character length for collocates
  - 'min_obs_local': int - Minimum observed local frequency
  - 'max_obs_local': int - Maximum observed local frequency
  - 'min_obs_global': int - Minimum global frequency
  - 'max_obs_global': int - Maximum global frequency
  - 'min_exp_local': float - Minimum expected local frequency
  - 'max_exp_local': float - Maximum expected local frequency
  - 'min_ratio_local': float - Minimum local frequency ratio (obs/exp)
  - 'max_ratio_local': float - Maximum local frequency ratio (obs/exp)
  - 'max_p': float - Maximum raw p-value threshold
  - 'max_adjusted_p': float - Maximum adjusted p-value (requires correction,
    applied after correction is computed)
- `correction` (str): Multiple testing correction method. When set,
  an ``adjusted_p_value`` column is added to the results. The correction
  is applied AFTER all other filters, so only collocates that pass those
  filters count toward the number of tests.
  
  - 'bonferroni': Bonferroni correction (conservative, controls family-wise 
    error rate).
  - 'fdr_bh': Benjamini-Hochberg procedure (controls false discovery rate).
  - None: No correction (default).
- `as_dataframe` (bool): If True, return results as a pandas DataFrame. Default is True.
- `max_sentence_length` (int | None): Maximum sentence length. Longer sentences 
  are truncated to avoid memory bloat from outliers. Set to None for no limit.
  Default is 256.
- `alternative` (str): Alternative hypothesis for Fisher's exact test. Options are:
  'greater' (test if observed co-occurrence is greater than expected, default),
  'less' (test if observed is less than expected), or 'two-sided' (test if 
  observed differs from expected).
- `sort_by` (str): Field to sort results by. Default is 'obs_local'.
- `ascending` (bool): Sort direction. Default is False (descending).
- `batch_words` (int): Target number of tokens per processing batch. Larger values
  use more memory but reduce per-batch overhead. Default is 100,000.

**Returns:**
list[dict] | pd.DataFrame: Collocation results with the following fields:

- **target** (str): The target word.
- **collocate** (str): The co-occurring word.
- **obs_local** (int): Observed co-occurrence count (contexts where both appear).
- **exp_local** (float): Expected co-occurrence count under independence.
- **ratio_local** (float): Ratio of observed to expected (obs_local / exp_local).
  Values > 1 indicate attraction, < 1 indicate repulsion.
- **obs_global** (int): Total occurrences of the collocate in the corpus.
- **p_value** (float): P-value from Fisher's exact test.
- **adjusted_p_value** (float, optional): Present only if ``correction`` is set.

<br>

<h3 id="cooc_matrix">qhchina.analytics.collocations.cooc_matrix() <a href="#cooc_matrix" class="header-link" title="Permalink">#</a> <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/analytics/collocations.py#L987" class="source-link" title="View source on GitHub">[source]</a></h3>

<pre class="signature"><code><span class="sig-name">cooc_matrix</span>(
    <span class="sig-param">documents</span><span class="sig-punct">:</span> <span class="sig-type">Iterable[list[str]]</span>,
    <span class="sig-param">horizon</span><span class="sig-punct">:</span> <span class="sig-type">int | tuple[int, int] | None</span> <span class="sig-punct">=</span> <span class="sig-default">None</span>,
    <span class="sig-param">method</span><span class="sig-punct">:</span> <span class="sig-type">str</span> <span class="sig-punct">=</span> <span class="sig-default">'window'</span>,
    <span class="sig-param">min_word_count</span><span class="sig-punct">:</span> <span class="sig-type">int</span> <span class="sig-punct">=</span> <span class="sig-default">1</span>,
    <span class="sig-param">min_doc_count</span><span class="sig-punct">:</span> <span class="sig-type">int</span> <span class="sig-punct">=</span> <span class="sig-default">1</span>,
    <span class="sig-param">max_vocab_size</span><span class="sig-punct">:</span> <span class="sig-type">int | None</span> <span class="sig-punct">=</span> <span class="sig-default">None</span>,
    <span class="sig-param">vocab</span><span class="sig-punct">:</span> <span class="sig-type">list[str] | set | None</span> <span class="sig-punct">=</span> <span class="sig-default">None</span>,
    <span class="sig-param">binary</span><span class="sig-punct">:</span> <span class="sig-type">bool</span> <span class="sig-punct">=</span> <span class="sig-default">False</span>
)</code></pre>

Calculate a co-occurrence matrix from a corpus of documents.

Processes data in streaming batches to keep memory low even for very large
corpora. When `vocab` is not provided, requires a restartable iterable
(iterated twice: once for vocabulary building, once for counting). Lists,
file-backed iterators, and restartable generator classes all work;
single-use generators require a pre-built `vocab`.

Returns a CoocMatrix object with numpy-like indexing:

- `matrix["word1", "word2"]` - single count (int)
- `matrix["word1"]` - 1D row vector, shape (V,)
- `matrix[["word1", "word2"]]` - 2D row submatrix, shape (N, V)
- `matrix.to_dataframe()` - pandas DataFrame
- `matrix.to_dense()` - numpy array

**Parameters:**
- `documents` (Iterable[list[str]]): Iterable of tokenized documents, where
  each document is a list of tokens. Must be restartable when ``vocab``
  is not provided (iterated twice).
- `horizon`: Context window size relative to each word. Only applicable for method='window'.
  If not provided, defaults to 5 for window method. Must not be provided for 
  method='document'.
  - int: Symmetric window (e.g., 5 means 5 words on each side)
  - tuple: Asymmetric window (left, right), e.g., (0, 5) for right-only context
- `method`: Method for calculating co-occurrences:
  - 'window': Count within sliding window (default, uses horizon)
  - 'document': Bag-of-words within each document (ignores horizon)
- `min_word_count`: Minimum total count for a word to be included in auto-generated
  vocabulary. Ignored if vocab is provided. Default 1.
- `min_doc_count`: Minimum number of documents a word must appear in to be included
  in auto-generated vocabulary. Ignored if vocab is provided. Default 1.
- `max_vocab_size`: Maximum vocabulary size (most frequent words kept). Only applies
  to auto-generated vocabulary. Ignored if vocab is provided. Default None.
- `vocab`: Predefined vocabulary to use. If provided, this vocabulary is used exactly
  as given without any filtering (min_word_count, min_doc_count, and max_vocab_size
  are ignored). Words in vocab that don't appear in documents will still be
  included in the matrix (with zero counts). When provided, only a single pass
  over documents is needed (single-use generators are accepted).
- `binary`: If True, count co-occurrences as binary (0/1). Default False.

**Returns:**
(CoocMatrix) Co-occurrence matrix object.

**Example:**
```python
from qhchina.analytics import cooc_matrix, LineSentenceFile
documents = LineSentenceFile("corpus.txt")
matrix = cooc_matrix(documents, horizon=5)
matrix["fox", "dog"]      # Scalar count
42
matrix["fox"]             # 1D row vector, shape (V,)
array([0, 0, 10, 8, 42, ...])
matrix[["fox", "dog"]]    # 2D submatrix, shape (2, V)
array([[0, 0, 10, ...], [0, 3, 0, ...]])
df = matrix.to_dataframe()
```

<br>

<h3 id="plot_collocates">qhchina.analytics.collocations.plot_collocates() <a href="#plot_collocates" class="header-link" title="Permalink">#</a> <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/analytics/collocations.py#L1208" class="source-link" title="View source on GitHub">[source]</a></h3>

<pre class="signature"><code><span class="sig-name">plot_collocates</span>(
    <span class="sig-param">collocates</span><span class="sig-punct">:</span> <span class="sig-type">list[dict] | pandas.core.frame.DataFrame</span>,
    <span class="sig-param">x_col</span><span class="sig-punct">:</span> <span class="sig-type">str</span> <span class="sig-punct">=</span> <span class="sig-default">'ratio_local'</span>,
    <span class="sig-param">y_col</span><span class="sig-punct">:</span> <span class="sig-type">str</span> <span class="sig-punct">=</span> <span class="sig-default">'p_value'</span>,
    <span class="sig-param">x_scale</span><span class="sig-punct">:</span> <span class="sig-type">str</span> <span class="sig-punct">=</span> <span class="sig-default">'log'</span>,
    <span class="sig-param">y_scale</span><span class="sig-punct">:</span> <span class="sig-type">str</span> <span class="sig-punct">=</span> <span class="sig-default">'log'</span>,
    <span class="sig-param">color</span><span class="sig-punct">:</span> <span class="sig-type">str | list[str] | None</span> <span class="sig-punct">=</span> <span class="sig-default">None</span>,
    <span class="sig-param">colormap</span><span class="sig-punct">:</span> <span class="sig-type">str</span> <span class="sig-punct">=</span> <span class="sig-default">'viridis'</span>,
    <span class="sig-param">color_by</span><span class="sig-punct">:</span> <span class="sig-type">str | None</span> <span class="sig-punct">=</span> <span class="sig-default">None</span>,
    <span class="sig-param">title</span><span class="sig-punct">:</span> <span class="sig-type">str | None</span> <span class="sig-punct">=</span> <span class="sig-default">None</span>,
    <span class="sig-param">figsize</span><span class="sig-punct">:</span> <span class="sig-type">tuple</span> <span class="sig-punct">=</span> <span class="sig-default">(10, 8)</span>,
    <span class="sig-param">fontsize</span><span class="sig-punct">:</span> <span class="sig-type">int</span> <span class="sig-punct">=</span> <span class="sig-default">10</span>,
    <span class="sig-param">show_labels</span><span class="sig-punct">:</span> <span class="sig-type">bool</span> <span class="sig-punct">=</span> <span class="sig-default">False</span>,
    <span class="sig-param">label_top_n</span><span class="sig-punct">:</span> <span class="sig-type">int | None</span> <span class="sig-punct">=</span> <span class="sig-default">None</span>,
    <span class="sig-param">alpha</span><span class="sig-punct">:</span> <span class="sig-type">float</span> <span class="sig-punct">=</span> <span class="sig-default">0.6</span>,
    <span class="sig-param">marker_size</span><span class="sig-punct">:</span> <span class="sig-type">int</span> <span class="sig-punct">=</span> <span class="sig-default">50</span>,
    <span class="sig-param">show_diagonal</span><span class="sig-punct">:</span> <span class="sig-type">bool</span> <span class="sig-punct">=</span> <span class="sig-default">False</span>,
    <span class="sig-param">diagonal_color</span><span class="sig-punct">:</span> <span class="sig-type">str</span> <span class="sig-punct">=</span> <span class="sig-default">'red'</span>,
    <span class="sig-param">filename</span><span class="sig-punct">:</span> <span class="sig-type">str | None</span> <span class="sig-punct">=</span> <span class="sig-default">None</span>,
    <span class="sig-param">xlabel</span><span class="sig-punct">:</span> <span class="sig-type">str | None</span> <span class="sig-punct">=</span> <span class="sig-default">None</span>,
    <span class="sig-param">ylabel</span><span class="sig-punct">:</span> <span class="sig-type">str | None</span> <span class="sig-punct">=</span> <span class="sig-default">None</span>
)</code></pre>

Visualize collocation results as a 2D scatter plot.

Creates a customizable scatter plot from collocation data. By default, plots
ratio_local (x-axis) vs p_value (y-axis) with logarithmic scales, but allows
full flexibility to plot any columns with any scale type.

**Parameters:**
- `collocates` (list[dict] | pd.DataFrame): Output from find_collocates, 
  either as a list of dictionaries or DataFrame.
- `x_col` (str): Column name to plot on x-axis. Common choices: 'ratio_local', 
  'obs_local', 'exp_local', 'obs_global'. Default is 'ratio_local'.
- `y_col` (str): Column name to plot on y-axis. Common choices: 'p_value', 
  'obs_local', 'ratio_local', 'obs_global'. Default is 'p_value'.
- `x_scale` (str): Scale for x-axis. Options: 'log', 'linear', 'symlog', 'logit'.
  For ratio_local, 'log' makes the scale symmetric around 1. Default is 'log'.
- `y_scale` (str): Scale for y-axis. Options: 'log', 'linear', 'symlog', 'logit'.
  For p_value, 'log' is recommended to visualize small values. Default is 'log'.
- `color` (str | list[str] | None): Color(s) for the points. Can be a single 
  color string, list of colors, or None to use default.
- `colormap` (str): Matplotlib colormap to use when color_by is specified. 
  Default is 'viridis'.
- `color_by` (str | None): Column name to use for coloring points (e.g., 
  'obs_local', 'obs_global').
- `title` (str | None): Title for the plot.
- `figsize` (tuple): Figure size as (width, height) in inches. Default is (10, 8).
- `fontsize` (int): Base font size for labels. Default is 10.
- `show_labels` (bool): Whether to show collocate text labels next to points. 
  Default is False.
- `label_top_n` (int | None): If specified, only label the top N points. When 
  color_by is set, ranks by that column; otherwise ranks by y-axis values. 
  For p_value, labels smallest (most significant) values; for other metrics, 
  labels largest values.
- `alpha` (float): Transparency of points (0.0 to 1.0). Default is 0.6.
- `marker_size` (int): Size of markers. Default is 50.
- `show_diagonal` (bool): Whether to draw a diagonal reference line (y=x). Useful 
  for observed vs expected plots. Default is False.
- `diagonal_color` (str): Color of the diagonal reference line. Default is 'red'.
- `filename` (str | None): If provided, saves the figure to the specified file path.
- `xlabel` (str | None): Label for x-axis. If None, auto-generated from x_col 
  and x_scale.
- `ylabel` (str | None): Label for y-axis. If None, auto-generated from y_col 
  and y_scale.

**Returns:**
(None) Displays the plot using matplotlib. To further customize, use plt.gca() 
to get the current axes object after calling this function.

**Example:**
```python
# Basic usage: ratio vs p-value with log scales (default)
collocates = find_collocates(sentences, ['天'])
plot_collocates(collocates)

# Plot observed vs expected frequency
plot_collocates(collocates, x_col='exp_local', y_col='obs_local',
                x_scale='linear', y_scale='linear')

# With labels and custom styling
plot_collocates(collocates, show_labels=True, label_top_n=20,
                color='red', title='Collocates of 天')
```

<br>

<h3 id="kwic">qhchina.analytics.collocations.kwic() <a href="#kwic" class="header-link" title="Permalink">#</a> <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/analytics/collocations.py#L1404" class="source-link" title="View source on GitHub">[source]</a></h3>

<pre class="signature"><code><span class="sig-name">kwic</span>(
    <span class="sig-param">sentences</span><span class="sig-punct">:</span> <span class="sig-type">Iterable[list[str]]</span>,
    <span class="sig-param">target</span><span class="sig-punct">:</span> <span class="sig-type">str | list[str]</span>,
    <span class="sig-param">horizon</span><span class="sig-punct">:</span> <span class="sig-type">int</span> <span class="sig-punct">=</span> <span class="sig-default">10</span>,
    <span class="sig-param">sort_by</span><span class="sig-punct">:</span> <span class="sig-type">str</span> <span class="sig-punct">=</span> <span class="sig-default">'right'</span>,
    <span class="sig-param">separator</span><span class="sig-punct">:</span> <span class="sig-type">str</span> <span class="sig-punct">=</span> <span class="sig-default">''</span>,
    <span class="sig-param">as_dataframe</span><span class="sig-punct">:</span> <span class="sig-type">bool</span> <span class="sig-punct">=</span> <span class="sig-default">True</span>,
    <span class="sig-param">max_results</span><span class="sig-punct">:</span> <span class="sig-type">int | None</span> <span class="sig-punct">=</span> <span class="sig-default">None</span>,
    <span class="sig-param">max_sentence_length</span><span class="sig-punct">:</span> <span class="sig-type">int | None</span> <span class="sig-punct">=</span> <span class="sig-default">256</span>
)</code></pre>

Generate a Keywords in Context (KWIC) concordance for target words.

Scans a corpus for occurrences of one or more target words and returns
concordance lines showing left context, the keyword (node), and right
context. Results can be sorted by right context (R1), left context (L1),
or corpus position — the standard concordance sort options.

**Parameters:**
- `sentences` (Iterable[list[str]]): Iterable of tokenized sentences.
- `target` (str | list[str]): Target word(s) to find concordance lines for.
- `horizon` (int): Number of context tokens to show on each side of the
  node. Default is 10.
- `sort_by` (str): How to sort concordance lines:
  - ``'right'``: Alphabetically by right context (standard R1 sort).
  - ``'left'``: Reverse alphabetically by last token of left context
    (standard L1 sort).
  - ``'position'``: Corpus order (by doc_index, then position).
  
  Default is ``'right'``.
- `separator` (str): String used to join context tokens for display columns.
  Default ``""`` (direct concatenation, natural for Chinese). Use
  ``" "`` for space-segmented text.
- `as_dataframe` (bool): If True, return a pandas DataFrame. Default True.
- `max_results` (int | None): Maximum number of concordance lines to
  return. None for no limit. Default None.
- `max_sentence_length` (int | None): Truncate sentences longer than this.
  None disables truncation. Default 256.

**Returns:**
pd.DataFrame or list[dict] with columns/keys:

- **left** (str): Left context joined by ``separator``.
- **node** (str): The keyword.
- **right** (str): Right context joined by ``separator``.
- **left_tokens** (list[str]): Left context as a token list.
- **right_tokens** (list[str]): Right context as a token list.
- **doc_index** (int): Index of the sentence in the corpus.
- **position** (int): Token position of the node in the sentence.

**Example:**
```python
from qhchina.analytics import kwic
sentences = [["天", "下", "大", "乱"], ["天", "命", "不", "可", "违"]]
kwic(sentences, "天", horizon=3)
```

<br>

<h3 id="compare_collocates">qhchina.analytics.collocations.compare_collocates() <a href="#compare_collocates" class="header-link" title="Permalink">#</a> <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/analytics/collocations.py#L1518" class="source-link" title="View source on GitHub">[source]</a></h3>

<pre class="signature"><code><span class="sig-name">compare_collocates</span>(
    <span class="sig-param">corpus_a</span><span class="sig-punct">:</span> <span class="sig-type">Iterable[list[str]]</span>,
    <span class="sig-param">corpus_b</span><span class="sig-punct">:</span> <span class="sig-type">Iterable[list[str]]</span>,
    <span class="sig-param">target_words</span><span class="sig-punct">:</span> <span class="sig-type">str | list[str]</span>,
    <span class="sig-param">method</span><span class="sig-punct">:</span> <span class="sig-type">str</span> <span class="sig-punct">=</span> <span class="sig-default">'window'</span>,
    <span class="sig-param">horizon</span><span class="sig-punct">:</span> <span class="sig-type">int | tuple | None</span> <span class="sig-punct">=</span> <span class="sig-default">None</span>,
    <span class="sig-param">min_obs</span><span class="sig-punct">:</span> <span class="sig-type">int</span> <span class="sig-punct">=</span> <span class="sig-default">5</span>,
    <span class="sig-param">stable_threshold</span><span class="sig-punct">:</span> <span class="sig-type">float</span> <span class="sig-punct">=</span> <span class="sig-default">0.1</span>,
    <span class="sig-param">as_dataframe</span><span class="sig-punct">:</span> <span class="sig-type">bool</span> <span class="sig-punct">=</span> <span class="sig-default">True</span>,
    <span class="sig-param">**kwargs</span>
)</code></pre>

Compare collocates of target words between two corpora.

Runs collocation analysis on each corpus separately, then merges the
results to show which collocates strengthened, weakened, appeared, or
disappeared between the two corpora.

**Parameters:**
- `corpus_a` (Iterable[list[str]]): First corpus (tokenized sentences).
  Must be restartable.
- `corpus_b` (Iterable[list[str]]): Second corpus (tokenized sentences).
  Must be restartable.
- `target_words` (str | list[str]): Target word(s) to compare collocates for.
- `method` (str): Collocation method (``'window'`` or ``'sentence'``).
  Default ``'window'``.
- `horizon` (int | tuple | None): Context window size. See
  ``find_collocates`` for details. Default None (uses 5 for
  window method).
- `min_obs` (int): Minimum observed co-occurrence in either corpus for a
  collocate to be included. Default 5.
- `stable_threshold` (float): Minimum absolute ``log_ratio_change`` for a
  collocate to be classified as ``'strengthened'`` or ``'weakened'``
  rather than ``'stable'``. Default 0.1.
- `as_dataframe` (bool): If True, return a pandas DataFrame. Default True.
- `**kwargs`: Additional keyword arguments passed to ``find_collocates``
  (e.g., ``alternative``, ``batch_words``, ``max_sentence_length``).

**Returns:**
pd.DataFrame or list[dict] with columns/keys:

- **target** (str): The target word.
- **collocate** (str): The co-occurring word.
- **ratio_a** (float): Observed/expected ratio in corpus A.
- **ratio_b** (float): Observed/expected ratio in corpus B.
- **log_ratio_change** (float): ``log2(ratio_b / ratio_a)``.
  Positive = strengthened in B, negative = weakened in B.
- **obs_a** (int): Observed count in corpus A.
- **obs_b** (int): Observed count in corpus B.
- **p_value_a** (float): P-value in corpus A.
- **p_value_b** (float): P-value in corpus B.
- **status** (str): One of ``'strengthened'``, ``'weakened'``,
  ``'appeared'`` (only in B), ``'disappeared'`` (only in A),
  or ``'stable'``.

<br>

<!-- API-END -->
