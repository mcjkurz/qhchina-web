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
  - name: CoocMatrix.to_dataframe()
    anchor: coocmatrix-to_dataframe
  - name: CoocMatrix.to_dense()
    anchor: coocmatrix-to_dense
  - name: find_collocates()
    anchor: find_collocates
  - name: cooc_matrix()
    anchor: cooc_matrix
  - name: plot_collocates()
    anchor: plot_collocates
has_examples: True
import_from: qhchina.analytics.collocations
---

# Collocation Analysis

The `qhchina.analytics.collocations` module provides tools for identifying words that frequently co-occur together in text.

```python
from qhchina.analytics.collocations import find_collocates

collocates = find_collocates(sentences, target_words=["经济"], horizon=5)
top_collocates = collocates.sort_values("p_value").head(10)  # Most significant collocates
```

---

## API Reference

<!-- API-START -->

<h3 id="filteroptions">qhchina.analytics.collocations.FilterOptions <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/analytics/collocations.py#L254" class="source-link" title="View source on GitHub">[source]</a></h3>

```python
FilterOptions(*args, **kwargs)
```

Type definition for filter options in collocation analysis.

<br>

<h3 id="coocmatrix">qhchina.analytics.collocations.CoocMatrix <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/analytics/collocations.py#L42" class="source-link" title="View source on GitHub">[source]</a></h3>

```python
CoocMatrix(
    matrix: scipy.sparse._csr.csr_matrix,
    vocab_list: List[str],
    word_to_index: Dict[str, int]
)
```

Co-occurrence matrix with flexible indexing by word or index.

Supports flexible indexing:

- ``matrix["word1", "word2"]`` - single count (int)
- ``matrix[132, 5234]`` - single count (int)
- ``matrix["word1"]`` - row as dict {word: count}
- ``matrix["word1", :]`` - row as dict {word: count}
- ``matrix[:, "word2"]`` - column as dict {word: count}

Internally stores data as a scipy sparse CSR matrix for memory efficiency.

**Parameters:**
- `vocab` (List[str]): List of vocabulary words in index order.
- `word_to_index` (Dict[str, int]): Mapping from words to matrix indices.
- `index_to_word` (Dict[int, str]): Mapping from matrix indices to words.
- `shape` (Tuple[int, int]): Shape of the matrix (vocab_size, vocab_size).
- `nnz` (int): Number of non-zero entries.

**Example:**
```python
>>> matrix = cooc_matrix(documents, horizon=5)
>>> matrix["fox", "dog"]
42
>>> matrix["fox"]
{'quick': 10, 'brown': 8, 'dog': 42, ...}
>>> df = matrix.to_dataframe()
>>> arr = matrix.to_dense()
```

<h4 id="coocmatrix-get">qhchina.analytics.collocations.CoocMatrix.get() <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/analytics/collocations.py#L163" class="source-link" title="View source on GitHub">[source]</a></h4>

```python
get(row_key, col_key, default: int = 0)
```

Get a co-occurrence count with a default value for missing pairs.

**Parameters:**
- `row_key`: Row word or index.
- `col_key`: Column word or index.
- `default`: Value to return if the pair is not found or out of vocabulary.

**Returns:**
Co-occurrence count, or default if not found.

<h4 id="coocmatrix-to_dataframe">qhchina.analytics.collocations.CoocMatrix.to_dataframe() <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/analytics/collocations.py#L191" class="source-link" title="View source on GitHub">[source]</a></h4>

```python
to_dataframe()
```

Convert to a pandas DataFrame with word labels.

Warning: This may use significant memory for large vocabularies.

**Returns:**
DataFrame with vocabulary words as both index and columns.

<h4 id="coocmatrix-to_dense">qhchina.analytics.collocations.CoocMatrix.to_dense() <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/analytics/collocations.py#L180" class="source-link" title="View source on GitHub">[source]</a></h4>

```python
to_dense()
```

Convert to a dense NumPy array.

Warning: This may use significant memory for large vocabularies.

**Returns:**
2D numpy array of shape (vocab_size, vocab_size).

<br>

<h3 id="find_collocates">qhchina.analytics.collocations.find_collocates() <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/analytics/collocations.py#L540" class="source-link" title="View source on GitHub">[source]</a></h3>

```python
find_collocates(
    sentences: List[List[str]],
    target_words: Union[str, List[str]],
    method: str = 'window',
    horizon: Union[int, tuple, NoneType] = None,
    filters: Optional[qhchina.analytics.collocations.FilterOptions] = None,
    correction: Optional[str] = None,
    as_dataframe: bool = True,
    max_sentence_length: Optional[int] = 256,
    alternative: str = 'greater'
)
```

Find collocates for target words within a corpus of sentences.

**Parameters:**
- `sentences` (List[List[str]]): List of tokenized sentences, where each sentence 
  is a list of tokens.
- `target_words` (Union[str, List[str]]): Target word(s) to find collocates for.
- `method` (str): Method to use for calculating collocations. Either 'window' or 
  'sentence'. 'window' uses a sliding window of specified horizon around each 
  token. 'sentence' considers whole sentences as context units (horizon not 
  applicable). Default is 'window'.
- `horizon` (Optional[Union[int, tuple]]): Context window size relative to the target 
  word. Only applicable when method='window'. Must be None when method='sentence'.
  - int: Symmetric window (e.g., 5 means 5 words on each side of target)
  - tuple: Asymmetric window (left, right) specifying how many words to look
    on each side of the target word: (0, 5) finds collocates up to 5 words to 
    the RIGHT of target; (5, 0) finds collocates up to 5 words to the LEFT; 
    (2, 3) finds collocates 2 words left and 3 words right of target.
  - None: Uses default of 5 for 'window' method
- `filters` (Optional[FilterOptions]): Dictionary of filters to apply to results.
  All filters (except ``max_adjusted_p``) are applied BEFORE multiple testing 
  correction, defining the "family" of hypotheses being tested. This maximizes 
  statistical power by not correcting for collocates that were never of interest.
  
  Available filters:
  
  - 'stopwords': List[str] - Words to exclude from results
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
- `max_sentence_length` (Optional[int]): Maximum sentence length for preprocessing. 
  Used by both 'window' and 'sentence' methods. Longer sentences will be truncated 
  to avoid memory bloat from outliers. Set to None for no limit. Default is 256.
- `alternative` (str): Alternative hypothesis for Fisher's exact test. Options are:
  'greater' (test if observed co-occurrence is greater than expected, default),
  'less' (test if observed is less than expected), or 'two-sided' (test if 
  observed differs from expected).

**Returns:**
(Union[List[Dict], pd.DataFrame]) Collocation results with the following fields:
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

<h3 id="cooc_matrix">qhchina.analytics.collocations.cooc_matrix() <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/analytics/collocations.py#L840" class="source-link" title="View source on GitHub">[source]</a></h3>

```python
cooc_matrix(
    documents: List[List[str]],
    horizon: Union[int, Tuple[int, int], NoneType] = None,
    method: str = 'window',
    min_word_count: int = 1,
    min_doc_count: int = 1,
    max_vocab_size: Optional[int] = None,
    vocab: Union[List[str], set, NoneType] = None,
    binary: bool = False
)
```

Calculate a co-occurrence matrix from a list of documents.

Returns a CoocMatrix object with flexible indexing:

- ``matrix["word1", "word2"]`` - single count
- ``matrix["word1"]`` - row as dict {word: count}
- ``matrix.to_dataframe()`` - pandas DataFrame
- ``matrix.to_dense()`` - numpy array

**Parameters:**
- `documents`: List of tokenized documents, where each document is a list of tokens.
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
  included in the matrix (with zero counts).
- `binary`: If True, count co-occurrences as binary (0/1). Default False.

**Returns:**
(CoocMatrix) Co-occurrence matrix object.

**Example:**
```python
>>> matrix = cooc_matrix(documents, horizon=5)
>>> matrix["fox", "dog"]      # Get count for word pair
42
>>> matrix["fox"]             # Get all co-occurrences for "fox"
{'quick': 10, 'brown': 8, 'dog': 42, ...}
>>> df = matrix.to_dataframe()  # Convert to DataFrame if needed

>>> # With predefined vocabulary (no filtering applied)
>>> matrix = cooc_matrix(documents, vocab=["fox", "dog", "cat"])
```

<br>

<h3 id="plot_collocates">qhchina.analytics.collocations.plot_collocates() <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/analytics/collocations.py#L1093" class="source-link" title="View source on GitHub">[source]</a></h3>

```python
plot_collocates(
    collocates: Union[List[Dict], pandas.core.frame.DataFrame],
    x_col: str = 'ratio_local',
    y_col: str = 'p_value',
    x_scale: str = 'log',
    y_scale: str = 'log',
    color: Union[str, List[str], NoneType] = None,
    colormap: str = 'viridis',
    color_by: Optional[str] = None,
    title: Optional[str] = None,
    figsize: tuple = (10, 8),
    fontsize: int = 10,
    show_labels: bool = False,
    label_top_n: Optional[int] = None,
    alpha: float = 0.6,
    marker_size: int = 50,
    show_diagonal: bool = False,
    diagonal_color: str = 'red',
    filename: Optional[str] = None,
    xlabel: Optional[str] = None,
    ylabel: Optional[str] = None
)
```

Visualize collocation results as a 2D scatter plot.

Creates a customizable scatter plot from collocation data. By default, plots
ratio_local (x-axis) vs p_value (y-axis) with logarithmic scales, but allows
full flexibility to plot any columns with any scale type.

**Parameters:**
- `collocates` (Union[List[Dict], pd.DataFrame]): Output from find_collocates, 
  either as a list of dictionaries or DataFrame.
- `x_col` (str): Column name to plot on x-axis. Common choices: 'ratio_local', 
  'obs_local', 'exp_local', 'obs_global'. Default is 'ratio_local'.
- `y_col` (str): Column name to plot on y-axis. Common choices: 'p_value', 
  'obs_local', 'ratio_local', 'obs_global'. Default is 'p_value'.
- `x_scale` (str): Scale for x-axis. Options: 'log', 'linear', 'symlog', 'logit'.
  For ratio_local, 'log' makes the scale symmetric around 1. Default is 'log'.
- `y_scale` (str): Scale for y-axis. Options: 'log', 'linear', 'symlog', 'logit'.
  For p_value, 'log' is recommended to visualize small values. Default is 'log'.
- `color` (Optional[Union[str, List[str]]]): Color(s) for the points. Can be a single 
  color string, list of colors, or None to use default.
- `colormap` (str): Matplotlib colormap to use when color_by is specified. 
  Default is 'viridis'.
- `color_by` (Optional[str]): Column name to use for coloring points (e.g., 
  'obs_local', 'obs_global').
- `title` (Optional[str]): Title for the plot.
- `figsize` (tuple): Figure size as (width, height) in inches. Default is (10, 8).
- `fontsize` (int): Base font size for labels. Default is 10.
- `show_labels` (bool): Whether to show collocate text labels next to points. 
  Default is False.
- `label_top_n` (Optional[int]): If specified, only label the top N points. When 
  color_by is set, ranks by that column; otherwise ranks by y-axis values. 
  For p_value, labels smallest (most significant) values; for other metrics, 
  labels largest values.
- `alpha` (float): Transparency of points (0.0 to 1.0). Default is 0.6.
- `marker_size` (int): Size of markers. Default is 50.
- `show_diagonal` (bool): Whether to draw a diagonal reference line (y=x). Useful 
  for observed vs expected plots. Default is False.
- `diagonal_color` (str): Color of the diagonal reference line. Default is 'red'.
- `filename` (Optional[str]): If provided, saves the figure to the specified file path.
- `xlabel` (Optional[str]): Label for x-axis. If None, auto-generated from x_col 
  and x_scale.
- `ylabel` (Optional[str]): Label for y-axis. If None, auto-generated from y_col 
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
...                 x_scale='linear', y_scale='linear')

# With labels and custom styling
plot_collocates(collocates, show_labels=True, label_top_n=20,
...                 color='red', title='Collocates of 天')
```

<br>

<!-- API-END -->

---

## Examples

**Finding Collocates**

```python
from qhchina.analytics.collocations import find_collocates

# Example tokenized sentences
sentences = [
    ["中国", "经济", "发展", "改革"],
    ["美国", "经济", "市场", "金融"],
    ["中国", "市场", "贸易", "改革"],
    # More sentences...
]

# Find collocates of "经济" using window method
collocates = find_collocates(
    sentences=sentences,
    target_words=["经济"],
    method="window",
    horizon=3,  # 3 words on each side
    filters={
        'max_p': 0.05,          # Only statistically significant
        'stopwords': ["的", "了"],
        'min_word_length': 2
    },
    as_dataframe=True
)

# Find words that appear to the RIGHT of "经济"
right_collocates = find_collocates(
    sentences=sentences,
    target_words=["经济"],
    horizon=(0, 3),  # 0 words left, 3 words right of target
    filters={'max_p': 0.05}
)

# Find words that appear to the LEFT of "经济"
left_collocates = find_collocates(
    sentences=sentences,
    target_words=["经济"],
    horizon=(3, 0),  # 3 words left, 0 words right of target
    filters={'max_p': 0.05}
)

# Display top collocates
top_collocates = collocates.sort_values("p_value").head(10)
for _, row in top_collocates.iterrows():
    print(f"{row['collocate']}: obs={row['obs_local']}, ratio={row['ratio_local']:.2f}, p={row['p_value']:.4f}")
```

**Visualizing Collocates**

```python
from qhchina.analytics.collocations import find_collocates, plot_collocates

# Find collocates
collocates = find_collocates(
    sentences=sentences,
    target_words=["经济"],
    alternative='two-sided',
    filters={'max_p': 0.05, 'min_obs_local': 2}
)

# Default: ratio vs p-value (log scales)
plot_collocates(collocates, title="Collocates of 经济")

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

# Create co-occurrence matrix
cooc = cooc_matrix(
    documents=sentences,
    method="window",
    horizon=2,
    min_abs_count=2,
    as_dataframe=True
)

# Find words that co-occur with a target word
target_word = "经济"
if target_word in cooc.index:
    cooc_with_target = cooc[target_word].sort_values(ascending=False)
    print(f"Words co-occurring with '{target_word}':")
    print(cooc_with_target.head(10))
```
