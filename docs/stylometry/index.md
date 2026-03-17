---
layout: docs_with_sidebar
title: Stylometry
permalink: /docs/stylometry/
functions:
  - name: Stylometry
    anchor: stylometry
  - name: Stylometry.bootstrap_predict()
    anchor: stylometry-bootstrap_predict
  - name: Stylometry.dendrogram()
    anchor: stylometry-dendrogram
  - name: Stylometry.distance()
    anchor: stylometry-distance
  - name: Stylometry.distance_matrix()
    anchor: stylometry-distance_matrix
  - name: Stylometry.fit_transform()
    anchor: stylometry-fit_transform
  - name: Stylometry.get_author_profile()
    anchor: stylometry-get_author_profile
  - name: Stylometry.get_feature_comparison()
    anchor: stylometry-get_feature_comparison
  - name: Stylometry.hierarchical_clustering()
    anchor: stylometry-hierarchical_clustering
  - name: Stylometry.most_similar()
    anchor: stylometry-most_similar
  - name: Stylometry.plot()
    anchor: stylometry-plot
  - name: Stylometry.predict()
    anchor: stylometry-predict
  - name: Stylometry.predict_author()
    anchor: stylometry-predict_author
  - name: Stylometry.predict_confidence()
    anchor: stylometry-predict_confidence
  - name: Stylometry.rolling_delta()
    anchor: stylometry-rolling_delta
  - name: Stylometry.similarity()
    anchor: stylometry-similarity
  - name: Stylometry.transform()
    anchor: stylometry-transform
  - name: Stylometry.vocabulary_stats()
    anchor: stylometry-vocabulary_stats
  - name: compare_corpora()
    anchor: compare_corpora
  - name: extract_mfw()
    anchor: extract_mfw
  - name: burrows_delta()
    anchor: burrows_delta
  - name: manhattan_distance()
    anchor: manhattan_distance
  - name: euclidean_distance()
    anchor: euclidean_distance
  - name: eder_delta()
    anchor: eder_delta
  - name: get_relative_frequencies()
    anchor: get_relative_frequencies
  - name: compute_yule_k()
    anchor: compute_yule_k
  - name: type_token_ratio()
    anchor: type_token_ratio
  - name: mattr()
    anchor: mattr
has_examples: True
import_from: qhchina.analytics.stylometry
---

# Stylometry

Stylometry is the quantitative study of writing style, based on the observation that authors leave distinctive linguistic fingerprints in their texts through unconscious word choice patterns. These patterns—particularly in high-frequency function words—remain consistent across an author's works and can be measured statistically. The `qhchina.analytics.stylometry` module provides tools for authorship attribution and document clustering using statistical analysis of writing style. By default, it uses z-score normalization to transform word frequencies, which standardizes feature values across documents and makes them comparable regardless of document length.

> **Note:** This module is inspired by the R package [stylo](https://github.com/computationalstylistics/stylo), a much more comprehensive implementation for computational stylistics.

```python
from qhchina.analytics.stylometry import Stylometry

# Corpus: dict mapping author names to lists of tokenized documents
corpus = {
    '鲁迅': [
        ['照', '我', '自己', '想', '虽然', '不', '是', '恶人', ...],
        ['当初', '他', '还', '只是', '冷笑', '随后', '眼光', '便', '凶狠', '起来', ...],
    ],
    '沈从文': [
        ['小溪', '流', '下去', '绕', '山岨', '流', ...],
        ['那', '条', '河水', '便是', '历史', '上', '知名', '的', '酉水', ...],
    ],
}

stylo = Stylometry(n_features=100, distance='cosine')
stylo.fit_transform(corpus)

# Analyze the transformed data
predicted = stylo.predict_author(unknown_text)  # Predict authorship
similar = stylo.most_similar('鲁迅_1')          # Find similar documents (returns similarity)
sim = stylo.similarity('鲁迅_1', '沈从文_1')    # Compare two documents (higher = more similar)
dist = stylo.distance('鲁迅_1', '沈从文_1')     # Compare two documents (lower = more similar)
```

## Examples

**Authorship Attribution**

The most common use case is predicting who wrote an unknown text. In centroid mode (the default), the model compares the unknown text against averaged author profiles.

```python
from qhchina.analytics.stylometry import Stylometry

# Prepare corpus: dict mapping author names to lists of tokenized documents
corpus = {
    'author_a': [
        ['这', '是', '作者', 'A', '的', '第一篇', '文章', '...'],
        ['作者', 'A', '的', '另一篇', '文章', '...'],
    ],
    'author_b': [
        ['这', '是', '作者', 'B', '写', '的', '内容', '...'],
        ['作者', 'B', '的', '其他', '作品', '...'],
    ],
}

# Create and fit the model
stylo = Stylometry(n_features=100, distance='cosine')
stylo.fit_transform(corpus)

# Predict authorship for an unknown text
unknown_text = ['他', '终于', '在', '无物', '之', '阵', '中', '老衰', '...']
predicted = stylo.predict_author(unknown_text)
print(f"Predicted author: {predicted}")

# Get ranked results with distances (lower distance = more similar)
results = stylo.predict(unknown_text, k=3)
for author, distance in results:
    print(f"{author}: {distance:.4f}")
```

**Finding Similar Documents**

Beyond authorship attribution, you can explore stylistic relationships between documents—useful for discovering influences, detecting plagiarism, or clustering anonymous texts.

```python
# Find documents most similar to a specific document (returns similarity by default)
similar = stylo.most_similar('author_a_1', k=5)
for doc_id, sim in similar:
    print(f"{doc_id}: {sim:.4f}")  # higher = more similar

# Find documents similar to new text (without adding it to the corpus)
similar = stylo.most_similar(['这', '是', '新', '文本', '...'], k=3)

# Compare two specific documents directly
sim = stylo.similarity('author_a_1', 'author_b_1')  # higher = more similar
dist = stylo.distance('author_a_1', 'author_b_1')   # lower = more similar
```

**Instance Mode with k-NN**

When authors have varied writing styles across works, instance mode compares the unknown text against individual documents rather than averaged centroids. This enables k-nearest-neighbor voting.

```python
# Use instance mode for k-nearest neighbor attribution
stylo = Stylometry(n_features=100, distance='cosine', mode='instance')
stylo.fit_transform(corpus)

# Get predicted author via majority vote among 5 nearest neighbors
predicted = stylo.predict_author(unknown_text, k=5)
print(f"Predicted author (majority vote): {predicted}")

# Inspect the 5 nearest training documents
results = stylo.predict(unknown_text, k=5)
for author, distance in results:
    print(f"{author}: {distance:.4f}")
```

**Corpus Balance Warning**

The module automatically warns when author corpus sizes are highly imbalanced (3x difference or more), as this can skew the Most Frequent Words calculation toward the larger corpus.

```python
corpus = {
    'prolific_author': [doc1, doc2, doc3, ..., doc100],  # Many documents
    'rare_author': [doc1, doc2],  # Few documents
}
stylo.fit_transform(corpus)
# UserWarning: Imbalanced corpus: 'prolific_author' has X tokens while 
# 'rare_author' has only Y tokens (Z.Zx difference)...
```

Consider balancing text sizes across authors for more reliable results.


---

## API Reference

<!-- API-START -->

<h3 id="stylometry">qhchina.analytics.stylometry.Stylometry <a href="#stylometry" class="header-link" title="Permalink">#</a> <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/analytics/stylometry.py#L336" class="source-link" title="View source on GitHub">[source]</a></h3>

<pre class="signature"><code><span class="sig-name">Stylometry</span>(
    <span class="sig-param">n_features</span><span class="sig-punct">:</span> <span class="sig-type">int</span> <span class="sig-punct">=</span> <span class="sig-default">100</span>,
    <span class="sig-param">ngram_range</span><span class="sig-punct">:</span> <span class="sig-type">tuple[int, int]</span> <span class="sig-punct">=</span> <span class="sig-default">(1, 1)</span>,
    <span class="sig-param">transform</span><span class="sig-punct">:</span> <span class="sig-type">str</span> <span class="sig-punct">=</span> <span class="sig-default">'zscore'</span>,
    <span class="sig-param">distance</span><span class="sig-punct">:</span> <span class="sig-type">str</span> <span class="sig-punct">=</span> <span class="sig-default">'cosine'</span>,
    <span class="sig-param">classifier</span><span class="sig-punct">:</span> <span class="sig-type">str</span> <span class="sig-punct">=</span> <span class="sig-default">'delta'</span>,
    <span class="sig-param">cull</span><span class="sig-punct">:</span> <span class="sig-type">float | None</span> <span class="sig-punct">=</span> <span class="sig-default">None</span>,
    <span class="sig-param">min_variance</span><span class="sig-punct">:</span> <span class="sig-type">float | None</span> <span class="sig-punct">=</span> <span class="sig-default">None</span>,
    <span class="sig-param">mode</span><span class="sig-punct">:</span> <span class="sig-type">str</span> <span class="sig-punct">=</span> <span class="sig-default">'centroid'</span>
)</code></pre>

Stylometry for authorship attribution and document clustering.

Implements classic and modern stylometric methods for analyzing writing style,
comparing authors, and attributing disputed texts. Inspired by the R package
'stylo' but designed for Chinese text analysis.

**Parameters:**
- `n_features` (int): Number of most frequent n-grams to use as features (default: 100).
  Higher values capture more stylistic variation but may include noise.
- `ngram_range` (tuple): Range of n-gram sizes as (min_n, max_n). Default (1, 1) uses
  only unigrams (single tokens). Use (2, 2) for bigrams only, or (1, 2) to pool
  unigrams and bigrams together. When multiple n-gram sizes are pooled, the top
  ``n_features`` are selected from the combined set ranked by corpus frequency,
  so the final feature set may contain a mix of different n-gram sizes.
- `transform` (str): Feature transformation method:
  - 'zscore': Z-score normalization (default, recommended for Delta methods)
  - 'tfidf': TF-IDF weighting
- `distance` (str): Distance metric for comparing documents:
  - 'cosine': Cosine distance (default)
  - 'burrows_delta': Classic Burrows' Delta
  - 'manhattan': Manhattan/L1 distance
  - 'euclidean': Euclidean/L2 distance
  - 'eder_delta': Eder's Delta variant
- `classifier` (str): Classification method for authorship attribution:
  - 'delta': Delta-based nearest neighbor (default)
  - 'svm': Support Vector Machine
- `cull` (float): Minimum document frequency ratio (0.0-1.0). N-grams appearing in
  fewer than cull*100% of documents are removed. Helps filter rare words.
  Default: None (no culling).
- `min_variance` (float): Minimum variance threshold for features. Features with
  variance (across documents) below this threshold are removed after the
  top n_features are selected. Useful for filtering features that don't
  vary enough to discriminate between authors. Default: None (no filtering).
  Typical values for relative frequency features: 1e-6 to 1e-4.
- `mode` (str): Attribution mode for delta classifier:
  - 'centroid': Compare to author centroids (averaged profiles)
  - 'instance': Compare to individual text instances

**Example:**
```python
from qhchina.analytics.stylometry import Stylometry

# Prepare corpus: dict mapping author names to lists of tokenized documents
corpus = {
    '鲁迅': [tokens_luxun_1, tokens_luxun_2],
    '茅盾': [tokens_maodun_1, tokens_maodun_2]
}

# Create and fit stylometry model
stylo = Stylometry(n_features=100, ngram_range=(1, 2), cull=0.2)
stylo.fit_transform(corpus)

# Visualize results
stylo.plot()  # PCA/MDS scatter plot
stylo.dendrogram()  # Hierarchical clustering

# Attribute disputed text
author = stylo.predict_author(disputed_tokens)
# Or get ranked results with scores
results = stylo.predict(disputed_tokens, k=3)  # [(author, score), ...]
```

<h4 id="stylometry-bootstrap_predict">qhchina.analytics.stylometry.Stylometry.bootstrap_predict() <a href="#stylometry-bootstrap_predict" class="header-link" title="Permalink">#</a> <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/analytics/stylometry.py#L1140" class="source-link" title="View source on GitHub">[source]</a></h4>

<pre class="signature"><code><span class="sig-name">bootstrap_predict</span>(<span class="sig-param">text</span><span class="sig-punct">:</span> <span class="sig-type">list[str]</span>, <span class="sig-param">n_iter</span><span class="sig-punct">:</span> <span class="sig-type">int</span> <span class="sig-punct">=</span> <span class="sig-default">100</span>, <span class="sig-param">sample_ratio</span><span class="sig-punct">:</span> <span class="sig-type">float</span> <span class="sig-punct">=</span> <span class="sig-default">0.8</span>, <span class="sig-param">distance</span><span class="sig-punct">:</span> <span class="sig-type">str | None</span> <span class="sig-punct">=</span> <span class="sig-default">None</span>, <span class="sig-param">seed</span><span class="sig-punct">:</span> <span class="sig-type">int | None</span> <span class="sig-punct">=</span> <span class="sig-default">None</span>)</code></pre>

Bootstrap analysis for prediction robustness.

Resamples features n_iter times and computes prediction statistics
to assess how robust the attribution is.

**Parameters:**
- `text`: List of tokens (the disputed text)
- `n_iter`: Number of bootstrap iterations
- `sample_ratio`: Fraction of features to use per iteration (0.0-1.0)
- `distance`: Distance metric override
- `seed`: Random seed for reproducibility. If None, results will vary
  between calls.

**Returns:**
Dict with:
- 'prediction': Most frequent prediction across iterations
- 'confidence': Proportion of iterations agreeing with top prediction
- 'distribution': Dict of author -> proportion of iterations
- 'distances': Dict of author -> (mean_distance, std_distance)
- 'n_iterations': Number of iterations performed

**Example:**
```python
# Prepare corpus with known authors
corpus = {'author1': [list_of_tokens1, ...], 'author2': [list_of_tokens2, ...]}

# Fit model
stylo = Stylometry(n_features=500)
stylo.fit_transform(corpus)

# Bootstrap analysis on disputed text
disputed_text = ['token1', 'token2', ...]  # flat list of tokens
result = stylo.bootstrap_predict(
    disputed_text,
    n_iter=100,       # 100 bootstrap iterations
    sample_ratio=0.8  # use 80% of features each iteration
)

print(f"Predicted author: {result['prediction']}")
print(f"Confidence: {result['confidence']:.1%}")
print(f"Vote distribution: {result['distribution']}")
```

<h4 id="stylometry-dendrogram">qhchina.analytics.stylometry.Stylometry.dendrogram() <a href="#stylometry-dendrogram" class="header-link" title="Permalink">#</a> <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/analytics/stylometry.py#L2074" class="source-link" title="View source on GitHub">[source]</a></h4>

<pre class="signature"><code><span class="sig-name">dendrogram</span>(<span class="sig-param">method</span><span class="sig-punct">:</span> <span class="sig-type">str</span> <span class="sig-punct">=</span> <span class="sig-default">'average'</span>, <span class="sig-param">level</span><span class="sig-punct">:</span> <span class="sig-type">str</span> <span class="sig-punct">=</span> <span class="sig-default">'document'</span>, <span class="sig-param">orientation</span><span class="sig-punct">:</span> <span class="sig-type">str</span> <span class="sig-punct">=</span> <span class="sig-default">'top'</span>, <span class="sig-param">figsize</span><span class="sig-punct">:</span> <span class="sig-type">tuple[int, int]</span> <span class="sig-punct">=</span> <span class="sig-default">(12, 8)</span>, <span class="sig-param">labels</span><span class="sig-punct">:</span> <span class="sig-type">list[str] | None</span> <span class="sig-punct">=</span> <span class="sig-default">None</span>, <span class="sig-param">title</span><span class="sig-punct">:</span> <span class="sig-type">str | None</span> <span class="sig-punct">=</span> <span class="sig-default">None</span>, <span class="sig-param">fontsize</span><span class="sig-punct">:</span> <span class="sig-type">int</span> <span class="sig-punct">=</span> <span class="sig-default">10</span>, <span class="sig-param">color_threshold</span><span class="sig-punct">:</span> <span class="sig-type">float | None</span> <span class="sig-punct">=</span> <span class="sig-default">None</span>, <span class="sig-param">color_mode</span><span class="sig-punct">:</span> <span class="sig-type">str</span> <span class="sig-punct">=</span> <span class="sig-default">'clusters'</span>, <span class="sig-param">above_threshold_color</span><span class="sig-punct">:</span> <span class="sig-type">str</span> <span class="sig-punct">=</span> <span class="sig-default">'C0'</span>, <span class="sig-param">filename</span><span class="sig-punct">:</span> <span class="sig-type">str | None</span> <span class="sig-punct">=</span> <span class="sig-default">None</span>, <span class="sig-param">show</span><span class="sig-punct">:</span> <span class="sig-type">bool</span> <span class="sig-punct">=</span> <span class="sig-default">True</span>, <span class="sig-param">distance</span><span class="sig-punct">:</span> <span class="sig-type">str | None</span> <span class="sig-punct">=</span> <span class="sig-default">None</span>)</code></pre>

Visualize hierarchical clustering as a dendrogram.

**Parameters:**
- `method`: Linkage method
- `level`: 'document' or 'author'
- `orientation`: 'top', 'bottom', 'left', or 'right'
- `figsize`: Figure size
- `labels`: Custom labels for leaves
- `title`: Plot title
- `fontsize`: Font size for labels
- `color_threshold`: Distance threshold for coloring. If None, uses
  0.7 * max distance for 'clusters' mode, or no coloring for 'branches' mode.
- `color_mode`: Coloring strategy:
  - 'clusters': (scipy default) Links below threshold get distinct colors,
    identifying clusters that would form if cutting at that height.
  - 'branches': Links above threshold get distinct colors, propagating
    downward to all descendants. Highlights major branching structure.
- `above_threshold_color`: Color for links above threshold in 'clusters' mode,
  or the default/root color in 'branches' mode when threshold is at max.
- `filename`: If provided, save figure to this path
- `show`: If True, display plot. If False, return result dict.
- `distance`: Distance metric override.

**Returns:**
None if show=True, otherwise dict with 'fig', 'ax', and dendrogram data.

<h4 id="stylometry-distance">qhchina.analytics.stylometry.Stylometry.distance() <a href="#stylometry-distance" class="header-link" title="Permalink">#</a> <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/analytics/stylometry.py#L1479" class="source-link" title="View source on GitHub">[source]</a></h4>

<pre class="signature"><code><span class="sig-name">distance</span>(<span class="sig-param">a</span><span class="sig-punct">:</span> <span class="sig-type">str | list[str]</span>, <span class="sig-param">b</span><span class="sig-punct">:</span> <span class="sig-type">str | list[str]</span>, <span class="sig-param">distance</span><span class="sig-punct">:</span> <span class="sig-type">str | None</span> <span class="sig-punct">=</span> <span class="sig-default">None</span>)</code></pre>

Compute the distance between two documents. Lower = more similar.

<h4 id="stylometry-distance_matrix">qhchina.analytics.stylometry.Stylometry.distance_matrix() <a href="#stylometry-distance_matrix" class="header-link" title="Permalink">#</a> <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/analytics/stylometry.py#L1548" class="source-link" title="View source on GitHub">[source]</a></h4>

<pre class="signature"><code><span class="sig-name">distance_matrix</span>(<span class="sig-param">level</span><span class="sig-punct">:</span> <span class="sig-type">str</span> <span class="sig-punct">=</span> <span class="sig-default">'document'</span>, <span class="sig-param">distance</span><span class="sig-punct">:</span> <span class="sig-type">str | None</span> <span class="sig-punct">=</span> <span class="sig-default">None</span>)</code></pre>

Compute pairwise distance matrix from fitted data.

**Parameters:**
- `level`: 'document' for individual documents, 'author' for author profiles
- `distance`: Distance metric override.

**Returns:**
(distance_matrix, labels)

<h4 id="stylometry-fit_transform">qhchina.analytics.stylometry.Stylometry.fit_transform() <a href="#stylometry-fit_transform" class="header-link" title="Permalink">#</a> <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/analytics/stylometry.py#L693" class="source-link" title="View source on GitHub">[source]</a></h4>

<pre class="signature"><code><span class="sig-name">fit_transform</span>(<span class="sig-param">corpus</span><span class="sig-punct">:</span> <span class="sig-type">dict[str, list[list[str]]] | list[list[str]]</span>, <span class="sig-param">labels</span><span class="sig-punct">:</span> <span class="sig-type">list[str] | None</span> <span class="sig-punct">=</span> <span class="sig-default">None</span>)</code></pre>

Fit the model on a corpus and transform documents to feature vectors.

**Parameters:**
- `corpus`: Either:
  - Dict mapping author names to their documents (supervised):
    {'AuthorA': [[tok1, tok2, ...], [tok1, ...]], 'AuthorB': [...]}
  - List of tokenized documents (unsupervised):
    [[tok1, tok2, ...], [tok1, ...], ...]
- `labels`: Optional list of labels for list input. Documents sharing
  the same label are grouped together.

<h4 id="stylometry-get_author_profile">qhchina.analytics.stylometry.Stylometry.get_author_profile() <a href="#stylometry-get_author_profile" class="header-link" title="Permalink">#</a> <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/analytics/stylometry.py#L1637" class="source-link" title="View source on GitHub">[source]</a></h4>

<pre class="signature"><code><span class="sig-name">get_author_profile</span>(<span class="sig-param">author</span><span class="sig-punct">:</span> <span class="sig-type">str</span>)</code></pre>

Get the feature values for a specific author.

Returns a DataFrame with 'feature' and 'value' columns, sorted by value descending.

<h4 id="stylometry-get_feature_comparison">qhchina.analytics.stylometry.Stylometry.get_feature_comparison() <a href="#stylometry-get_feature_comparison" class="header-link" title="Permalink">#</a> <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/analytics/stylometry.py#L1655" class="source-link" title="View source on GitHub">[source]</a></h4>

<pre class="signature"><code><span class="sig-name">get_feature_comparison</span>()</code></pre>

Get a comparison table of feature values across all fitted authors.

Returns a DataFrame with one column per author plus a 'variance' column.

<h4 id="stylometry-hierarchical_clustering">qhchina.analytics.stylometry.Stylometry.hierarchical_clustering() <a href="#stylometry-hierarchical_clustering" class="header-link" title="Permalink">#</a> <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/analytics/stylometry.py#L1569" class="source-link" title="View source on GitHub">[source]</a></h4>

<pre class="signature"><code><span class="sig-name">hierarchical_clustering</span>(<span class="sig-param">method</span><span class="sig-punct">:</span> <span class="sig-type">str</span> <span class="sig-punct">=</span> <span class="sig-default">'average'</span>, <span class="sig-param">level</span><span class="sig-punct">:</span> <span class="sig-type">str</span> <span class="sig-punct">=</span> <span class="sig-default">'document'</span>, <span class="sig-param">distance</span><span class="sig-punct">:</span> <span class="sig-type">str | None</span> <span class="sig-punct">=</span> <span class="sig-default">None</span>)</code></pre>

Perform hierarchical clustering on fitted data.

**Parameters:**
- `method`: Linkage method - 'single', 'complete', 'average', 'weighted', or 'ward'
- `level`: 'document' or 'author'
- `distance`: Distance metric override.

**Returns:**
(linkage_matrix, labels)

<h4 id="stylometry-most_similar">qhchina.analytics.stylometry.Stylometry.most_similar() <a href="#stylometry-most_similar" class="header-link" title="Permalink">#</a> <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/analytics/stylometry.py#L1426" class="source-link" title="View source on GitHub">[source]</a></h4>

<pre class="signature"><code><span class="sig-name">most_similar</span>(<span class="sig-param">query</span><span class="sig-punct">:</span> <span class="sig-type">str | list[str]</span>, <span class="sig-param">k</span><span class="sig-punct">:</span> <span class="sig-type">int | None</span> <span class="sig-punct">=</span> <span class="sig-default">None</span>, <span class="sig-param">return_distance</span><span class="sig-punct">:</span> <span class="sig-type">bool</span> <span class="sig-punct">=</span> <span class="sig-default">False</span>, <span class="sig-param">distance</span><span class="sig-punct">:</span> <span class="sig-type">str | None</span> <span class="sig-punct">=</span> <span class="sig-default">None</span>)</code></pre>

Find the most similar documents to a query.

**Parameters:**
- `query`: Document ID (str) or list of tokens.
- `k`: Number of results to return. If None, returns all.
- `return_distance`: If False, returns similarity. If True, returns distance.
- `distance`: Distance metric override.

**Returns:**
List of (doc_id, value) tuples sorted by similarity (most similar first).

<h4 id="stylometry-plot">qhchina.analytics.stylometry.Stylometry.plot() <a href="#stylometry-plot" class="header-link" title="Permalink">#</a> <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/analytics/stylometry.py#L1679" class="source-link" title="View source on GitHub">[source]</a></h4>

<pre class="signature"><code><span class="sig-name">plot</span>(<span class="sig-param">method</span><span class="sig-punct">:</span> <span class="sig-type">str</span> <span class="sig-punct">=</span> <span class="sig-default">'pca'</span>, <span class="sig-param">level</span><span class="sig-punct">:</span> <span class="sig-type">str</span> <span class="sig-punct">=</span> <span class="sig-default">'document'</span>, <span class="sig-param">figsize</span><span class="sig-punct">:</span> <span class="sig-type">tuple[int, int]</span> <span class="sig-punct">=</span> <span class="sig-default">(10, 8)</span>, <span class="sig-param">show_labels</span><span class="sig-punct">:</span> <span class="sig-type">bool</span> <span class="sig-punct">=</span> <span class="sig-default">True</span>, <span class="sig-param">labels</span><span class="sig-punct">:</span> <span class="sig-type">list[str] | None</span> <span class="sig-punct">=</span> <span class="sig-default">None</span>, <span class="sig-param">title</span><span class="sig-punct">:</span> <span class="sig-type">str | None</span> <span class="sig-punct">=</span> <span class="sig-default">None</span>, <span class="sig-param">colors</span><span class="sig-punct">:</span> <span class="sig-type">dict[str, str] | None</span> <span class="sig-punct">=</span> <span class="sig-default">None</span>, <span class="sig-param">marker_size</span><span class="sig-punct">:</span> <span class="sig-type">int</span> <span class="sig-punct">=</span> <span class="sig-default">100</span>, <span class="sig-param">fontsize</span><span class="sig-punct">:</span> <span class="sig-type">int</span> <span class="sig-punct">=</span> <span class="sig-default">12</span>, <span class="sig-param">filename</span><span class="sig-punct">:</span> <span class="sig-type">str | None</span> <span class="sig-punct">=</span> <span class="sig-default">None</span>, <span class="sig-param">random_state</span><span class="sig-punct">:</span> <span class="sig-type">int</span> <span class="sig-punct">=</span> <span class="sig-default">42</span>, <span class="sig-param">show</span><span class="sig-punct">:</span> <span class="sig-type">bool</span> <span class="sig-punct">=</span> <span class="sig-default">True</span>, <span class="sig-param">show_loadings</span><span class="sig-punct">:</span> <span class="sig-type">bool</span> <span class="sig-punct">=</span> <span class="sig-default">False</span>, <span class="sig-param">n_loadings</span><span class="sig-punct">:</span> <span class="sig-type">int</span> <span class="sig-punct">=</span> <span class="sig-default">20</span>, <span class="sig-param">loading_by</span><span class="sig-punct">:</span> <span class="sig-type">str</span> <span class="sig-punct">=</span> <span class="sig-default">'pc'</span>, <span class="sig-param">loading_scale</span><span class="sig-punct">:</span> <span class="sig-type">float</span> <span class="sig-punct">=</span> <span class="sig-default">1.0</span>, <span class="sig-param">loading_alpha</span><span class="sig-punct">:</span> <span class="sig-type">float</span> <span class="sig-punct">=</span> <span class="sig-default">0.5</span>, <span class="sig-param">loading_color</span><span class="sig-punct">:</span> <span class="sig-type">str</span> <span class="sig-punct">=</span> <span class="sig-default">'gray'</span>)</code></pre>

Create a 2D scatter plot of documents or authors.

**Parameters:**
- `method`: Dimensionality reduction - 'pca', 'tsne', or 'mds'
- `level`: 'document' for individual documents, 'author' for author profiles
- `figsize`: Figure size as (width, height)
- `show_labels`: Whether to show text labels on points
- `labels`: Custom labels for points
- `title`: Custom title
- `colors`: Dict mapping author names to colors
- `marker_size`: Size of scatter points
- `fontsize`: Base font size
- `filename`: If provided, save figure to this path
- `random_state`: Random seed for t-SNE/MDS
- `show`: If True, display plot. If False, return (fig, ax).
- `show_loadings`: If True, show feature loading arrows (PCA biplot). Only works
  with method='pca'.
- `n_loadings`: Number of top features to show as loading arrows.
- `loading_by`: How to select top features for loadings:
  - 'pc': Select top N features per principal component (PC1 and PC2 separately, default)
  - 'overall': Select top N features by combined loading magnitude
  - 'author': Select top N features per author based on centroid direction
    alignment (shows which features characterize each author)
- `loading_scale`: Scaling factor for loading arrows (default 1.0).
- `loading_alpha`: Transparency of loading arrows (default 0.5).
- `loading_color`: Color of loading arrows for 'overall' mode (default 'gray').
  In 'author' mode, arrows use author colors.

**Returns:**
None if show=True, otherwise (fig, ax) tuple.

<h4 id="stylometry-predict">qhchina.analytics.stylometry.Stylometry.predict() <a href="#stylometry-predict" class="header-link" title="Permalink">#</a> <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/analytics/stylometry.py#L968" class="source-link" title="View source on GitHub">[source]</a></h4>

<pre class="signature"><code><span class="sig-name">predict</span>(<span class="sig-param">text</span><span class="sig-punct">:</span> <span class="sig-type">list[str]</span>, <span class="sig-param">k</span><span class="sig-punct">:</span> <span class="sig-type">int</span> <span class="sig-punct">=</span> <span class="sig-default">1</span>, <span class="sig-param">distance</span><span class="sig-punct">:</span> <span class="sig-type">str | None</span> <span class="sig-punct">=</span> <span class="sig-default">None</span>, <span class="sig-param">classifier</span><span class="sig-punct">:</span> <span class="sig-type">str | None</span> <span class="sig-punct">=</span> <span class="sig-default">None</span>)</code></pre>

Predict the most likely author for a tokenized text.

**Parameters:**
- `text`: List of tokens (the disputed text)
- `k`: Number of top results to return.
- `distance`: Distance metric override (for delta classifier).
- `classifier`: Classifier override ('delta' or 'svm').

**Returns:**
List of (author, score) tuples.
- For 'delta': score is distance (lower = more similar)
- For 'svm': score is probability (higher = more likely)

<h4 id="stylometry-predict_author">qhchina.analytics.stylometry.Stylometry.predict_author() <a href="#stylometry-predict_author" class="header-link" title="Permalink">#</a> <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/analytics/stylometry.py#L1068" class="source-link" title="View source on GitHub">[source]</a></h4>

<pre class="signature"><code><span class="sig-name">predict_author</span>(<span class="sig-param">text</span><span class="sig-punct">:</span> <span class="sig-type">list[str]</span>, <span class="sig-param">k</span><span class="sig-punct">:</span> <span class="sig-type">int</span> <span class="sig-punct">=</span> <span class="sig-default">1</span>, <span class="sig-param">distance</span><span class="sig-punct">:</span> <span class="sig-type">str | None</span> <span class="sig-punct">=</span> <span class="sig-default">None</span>, <span class="sig-param">classifier</span><span class="sig-punct">:</span> <span class="sig-type">str | None</span> <span class="sig-punct">=</span> <span class="sig-default">None</span>)</code></pre>

Convenience method to get just the predicted author name.

**Parameters:**
- `text`: List of tokens (the disputed text)
- `k`: For 'instance' mode only: number of nearest neighbors for majority voting.
  In 'centroid' mode, this parameter is ignored.
- `distance`: Distance metric override (for delta classifier).
- `classifier`: Classifier override ('delta' or 'svm').

**Returns:**
Predicted author name (str).

<h4 id="stylometry-predict_confidence">qhchina.analytics.stylometry.Stylometry.predict_confidence() <a href="#stylometry-predict_confidence" class="header-link" title="Permalink">#</a> <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/analytics/stylometry.py#L1101" class="source-link" title="View source on GitHub">[source]</a></h4>

<pre class="signature"><code><span class="sig-name">predict_confidence</span>(<span class="sig-param">text</span><span class="sig-punct">:</span> <span class="sig-type">list[str]</span>, <span class="sig-param">k</span><span class="sig-punct">:</span> <span class="sig-type">int</span> <span class="sig-punct">=</span> <span class="sig-default">1</span>, <span class="sig-param">classifier</span><span class="sig-punct">:</span> <span class="sig-type">str | None</span> <span class="sig-punct">=</span> <span class="sig-default">None</span>)</code></pre>

Predict with unified confidence scores (higher = more likely).

Abstracts away the difference between delta (distance) and SVM (probability).

**Returns:**
List of (author, confidence) tuples where confidence is 0-1, higher = more likely.

<h4 id="stylometry-rolling_delta">qhchina.analytics.stylometry.Stylometry.rolling_delta() <a href="#stylometry-rolling_delta" class="header-link" title="Permalink">#</a> <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/analytics/stylometry.py#L1281" class="source-link" title="View source on GitHub">[source]</a></h4>

<pre class="signature"><code><span class="sig-name">rolling_delta</span>(<span class="sig-param">text</span><span class="sig-punct">:</span> <span class="sig-type">list[str]</span>, <span class="sig-param">reference</span><span class="sig-punct">:</span> <span class="sig-type">str | None</span> <span class="sig-punct">=</span> <span class="sig-default">None</span>, <span class="sig-param">window</span><span class="sig-punct">:</span> <span class="sig-type">int</span> <span class="sig-punct">=</span> <span class="sig-default">5000</span>, <span class="sig-param">step</span><span class="sig-punct">:</span> <span class="sig-type">int</span> <span class="sig-punct">=</span> <span class="sig-default">1000</span>, <span class="sig-param">distance</span><span class="sig-punct">:</span> <span class="sig-type">str | None</span> <span class="sig-punct">=</span> <span class="sig-default">None</span>, <span class="sig-param">show</span><span class="sig-punct">:</span> <span class="sig-type">bool</span> <span class="sig-punct">=</span> <span class="sig-default">True</span>, <span class="sig-param">figsize</span><span class="sig-punct">:</span> <span class="sig-type">tuple[int, int]</span> <span class="sig-punct">=</span> <span class="sig-default">(12, 6)</span>, <span class="sig-param">title</span><span class="sig-punct">:</span> <span class="sig-type">str | None</span> <span class="sig-punct">=</span> <span class="sig-default">None</span>, <span class="sig-param">filename</span><span class="sig-punct">:</span> <span class="sig-type">str | None</span> <span class="sig-punct">=</span> <span class="sig-default">None</span>)</code></pre>

Rolling window analysis across a long text.

Computes distance to a reference at each window position,
useful for detecting authorship changes or style variation within a text.

**Parameters:**
- `text`: List of tokens (the long text to analyze)
- `reference`: Author name to compare against. If None, compares each
  window to the average representation of the entire text
  (self-comparison mode for detecting internal variation).
- `window`: Window size in tokens
- `step`: Step size for sliding window
- `distance`: Distance metric override
- `show`: If True, display plot
- `figsize`: Figure size for plot
- `title`: Plot title
- `filename`: If provided, save figure to this path

**Returns:**
DataFrame with columns:
- 'position': Starting token position of window
- 'distance': Distance to reference
- 'end_position': Ending token position of window

**Example:**
```python
# Prepare corpus with known authors
corpus = {'author1': [list_of_tokens1, ...], 'author2': [list_of_tokens2, ...]}

# Fit model on known authors
stylo = Stylometry(n_features=500)
stylo.fit_transform(corpus)

# Analyze a long disputed text for authorship changes
disputed_text = ['token1', 'token2', ...]  # flat list of tokens
results = stylo.rolling_delta(
    disputed_text,
    reference='author1',  # compare windows to author1's style
    window=5000,          # 5000-token windows
    step=1000             # slide by 1000 tokens
)

# Results show distance at each position
print(results[['position', 'distance']])
```

<h4 id="stylometry-similarity">qhchina.analytics.stylometry.Stylometry.similarity() <a href="#stylometry-similarity" class="header-link" title="Permalink">#</a> <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/analytics/stylometry.py#L1497" class="source-link" title="View source on GitHub">[source]</a></h4>

<pre class="signature"><code><span class="sig-name">similarity</span>(<span class="sig-param">a</span><span class="sig-punct">:</span> <span class="sig-type">str | list[str]</span>, <span class="sig-param">b</span><span class="sig-punct">:</span> <span class="sig-type">str | list[str]</span>, <span class="sig-param">distance</span><span class="sig-punct">:</span> <span class="sig-type">str | None</span> <span class="sig-punct">=</span> <span class="sig-default">None</span>)</code></pre>

Compute the similarity between two documents. Higher = more similar.

<h4 id="stylometry-transform">qhchina.analytics.stylometry.Stylometry.transform() <a href="#stylometry-transform" class="header-link" title="Permalink">#</a> <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/analytics/stylometry.py#L903" class="source-link" title="View source on GitHub">[source]</a></h4>

<pre class="signature"><code><span class="sig-name">transform</span>(<span class="sig-param">tokens</span><span class="sig-punct">:</span> <span class="sig-type">list[str]</span>, <span class="sig-param">warn_oov</span><span class="sig-punct">:</span> <span class="sig-type">bool</span> <span class="sig-punct">=</span> <span class="sig-default">True</span>)</code></pre>

Transform a tokenized text to a feature vector using fitted features.

**Parameters:**
- `tokens`: List of tokens (a tokenized document)
- `warn_oov`: If True (default), warn when the text has low overlap with
  the trained features (less than 50% of n-grams recognized).

**Returns:**
Feature vector (numpy array)

<h4 id="stylometry-vocabulary_stats">qhchina.analytics.stylometry.Stylometry.vocabulary_stats() <a href="#stylometry-vocabulary_stats" class="header-link" title="Permalink">#</a> <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/analytics/stylometry.py#L1610" class="source-link" title="View source on GitHub">[source]</a></h4>

<pre class="signature"><code><span class="sig-name">vocabulary_stats</span>()</code></pre>

Get vocabulary richness statistics for all fitted documents.

**Returns:**
DataFrame with columns: doc_id, author, yule_k, token_count, type_count

<br>

<h3 id="compare_corpora">qhchina.analytics.stylometry.compare_corpora() <a href="#compare_corpora" class="header-link" title="Permalink">#</a> <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/analytics/stylometry.py#L2288" class="source-link" title="View source on GitHub">[source]</a></h3>

<pre class="signature"><code><span class="sig-name">compare_corpora</span>(
    <span class="sig-param">corpusA</span><span class="sig-punct">:</span> <span class="sig-type">Iterable[str] | Iterable[list[str]]</span>,
    <span class="sig-param">corpusB</span><span class="sig-punct">:</span> <span class="sig-type">Iterable[str] | Iterable[list[str]]</span>,
    <span class="sig-param">method</span><span class="sig-punct">:</span> <span class="sig-type">str</span> <span class="sig-punct">=</span> <span class="sig-default">'fisher'</span>,
    <span class="sig-param">filters</span><span class="sig-punct">:</span> <span class="sig-type">dict | None</span> <span class="sig-punct">=</span> <span class="sig-default">None</span>,
    <span class="sig-param">correction</span><span class="sig-punct">:</span> <span class="sig-type">str | None</span> <span class="sig-punct">=</span> <span class="sig-default">None</span>,
    <span class="sig-param">as_dataframe</span><span class="sig-punct">:</span> <span class="sig-type">bool</span> <span class="sig-punct">=</span> <span class="sig-default">True</span>,
    <span class="sig-param">sort_by</span><span class="sig-punct">:</span> <span class="sig-type">str</span> <span class="sig-punct">=</span> <span class="sig-default">'rel_ratio'</span>,
    <span class="sig-param">ascending</span><span class="sig-punct">:</span> <span class="sig-type">bool</span> <span class="sig-punct">=</span> <span class="sig-default">False</span>
)</code></pre>

Compare two corpora to identify statistically significant differences in word usage.

**Parameters:**
- `corpusA`: Iterable of tokens (flat) or iterable of token lists (nested).
  Accepts lists, generators, or any iterable.
- `corpusB`: Iterable of tokens (flat) or iterable of token lists (nested).
  Accepts lists, generators, or any iterable.
- `method` (str): Statistical test to use. All tests use two-sided alternatives.
  - 'fisher': Fisher's exact test (default). Exact, recommended for small
    sample sizes. Does not produce a test statistic.
  - 'chi2': Pearson's chi-squared test.
  - 'chi2_corrected': Chi-squared with Yates' continuity correction.
  - 'log_likelihood': Log-likelihood ratio (G2) test. Standard "keyness"
    measure in corpus linguistics (used by AntConc, Sketch Engine).
- `filters` (dict): Dictionary of filters to apply to results.
  Eligibility filters (applied before testing; define the hypothesis family):
  
  - 'min_count': int or tuple - Minimum count threshold(s) for a word to be 
    included (can be a single int for both corpora or tuple (min_countA, 
    min_countB)). Default is 0.
  - 'stopwords': list - Words to exclude from results.
  - 'min_word_length': int - Minimum character length for words.
  
  These filters are based on word properties (not p-values) and are
  applied before any statistical tests are computed. They safely reduce the
  hypothesis family and improve both performance and statistical power.
  
  P-value filters (two mutually exclusive workflows):
  
  - 'max_p': float - Maximum raw p-value threshold. Only valid when 
    ``correction`` is None. Use for simple unadjusted hypothesis testing.
  - 'max_adjusted_p': float - Maximum adjusted p-value. Only valid when 
    ``correction`` is set. Applied after correction is computed.
  
  Using ``max_p`` together with ``correction`` raises a ValueError, because
  pre-filtering on raw p-values violates the distributional assumptions
  required by multiple testing procedures (BH, Bonferroni).
    
- `correction` (str): Multiple testing correction method. When set,
  an ``adjusted_p_value`` column is added to the results. The correction
  is applied after eligibility filters, so only words that pass those
  filters count toward the number of tests.
  
  - 'bonferroni': Bonferroni correction (conservative, controls family-wise 
    error rate).
  - 'fdr_bh': Benjamini-Hochberg procedure (controls false discovery rate,
    recommended for corpus comparison).
  - None: No correction (default).
- `as_dataframe` (bool): Whether to return a pandas DataFrame.
- `sort_by` (str): Field to sort results by. Default is 'rel_ratio'.
- `ascending` (bool): Sort direction. Default is False (descending).

**Returns:**
pandas.DataFrame or list[dict] with columns/keys:

- **word** (str): The word.
- **abs_freqA** / **abs_freqB** (int): Absolute frequency in each corpus.
- **rel_freqA** / **rel_freqB** (float): Relative frequency in each corpus.
- **rel_ratio** (float): Ratio of relative frequencies (relA / relB).
- **statistic** (float, optional): Test statistic (chi-squared or G2).
  Present for 'chi2', 'chi2_corrected', and 'log_likelihood' methods.
  Not present for 'fisher' (which has no test statistic).
- **p_value** (float): Two-sided p-value.
- **adjusted_p_value** (float, optional): Present only if ``correction`` is set.

**Example:**
```python
# Compare word usage between two authors:

import os
from qhchina import download_corpus, load_stopwords
from qhchina.preprocessing import create_segmenter
from qhchina.analytics import compare_corpora

# Download corpora
download_corpus("莫言", parent_dir="corpora")
download_corpus("张爱玲", parent_dir="corpora")

# Set up segmenter
segmenter = create_segmenter(
    backend="jieba", 
    strategy="sentence",
)

# Load and segment
moyan = []
for f in os.listdir("corpora/莫言"):
    with open(f"corpora/莫言/{f}", encoding="utf-8") as fp:
        moyan.extend(segmenter.segment(fp.read()))

zal = []
for f in os.listdir("corpora/张爱玲"):
    with open(f"corpora/张爱玲/{f}", encoding="utf-8") as fp:
        zal.extend(segmenter.segment(fp.read()))

# Compare corpora
stopwords = load_stopwords("zh")
results = compare_corpora(
    moyan, zal,
    filters={"min_count": 5, 
            "max_p": 0.05, 
            "min_word_length": 2, 
            "stopwords": stopwords
            }
)
results.to_csv("results.csv", index=False)
```

<br>

<h3 id="extract_mfw">qhchina.analytics.stylometry.extract_mfw() <a href="#extract_mfw" class="header-link" title="Permalink">#</a> <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/analytics/stylometry.py#L55" class="source-link" title="View source on GitHub">[source]</a></h3>

<pre class="signature"><code><span class="sig-name">extract_mfw</span>(<span class="sig-param">ngram_counts</span><span class="sig-punct">:</span> <span class="sig-type">collections.Counter</span>, <span class="sig-param">n</span><span class="sig-punct">:</span> <span class="sig-type">int</span> <span class="sig-punct">=</span> <span class="sig-default">100</span>)</code></pre>

Extract the Most Frequent Words (MFW) from a frequency counter.

**Parameters:**
- `ngram_counts` (Counter): A Counter object with n-gram/word frequencies.
- `n` (int): Number of most frequent items to return (default: 100).

**Returns:**
(list) The n most common n-grams/words, ordered by frequency.

**Example:**
```python
from collections import Counter
from qhchina.analytics.stylometry import extract_mfw
counts = Counter(['的', '是', '了', '的', '我', '的'])
mfw = extract_mfw(counts, n=2)
print(mfw)
['的', '是']
```

<br>

<h3 id="burrows_delta">qhchina.analytics.stylometry.burrows_delta() <a href="#burrows_delta" class="header-link" title="Permalink">#</a> <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/analytics/stylometry.py#L77" class="source-link" title="View source on GitHub">[source]</a></h3>

<pre class="signature"><code><span class="sig-name">burrows_delta</span>(<span class="sig-param">vec_a</span><span class="sig-punct">:</span> <span class="sig-type">numpy.ndarray</span>, <span class="sig-param">vec_b</span><span class="sig-punct">:</span> <span class="sig-type">numpy.ndarray</span>)</code></pre>

Compute Burrows' Delta distance between two feature vectors.

A classic stylometric measure for authorship attribution. Calculates the
mean absolute difference between z-score normalized frequency vectors.
Lower values indicate more similar writing styles.

**Parameters:**
- `vec_a` (np.ndarray): First z-score feature vector.
- `vec_b` (np.ndarray): Second z-score feature vector.

**Returns:**
(float) Burrows' Delta distance (lower = more similar).

<br>

<h3 id="manhattan_distance">qhchina.analytics.stylometry.manhattan_distance() <a href="#manhattan_distance" class="header-link" title="Permalink">#</a> <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/analytics/stylometry.py#L99" class="source-link" title="View source on GitHub">[source]</a></h3>

<pre class="signature"><code><span class="sig-name">manhattan_distance</span>(<span class="sig-param">vec_a</span><span class="sig-punct">:</span> <span class="sig-type">numpy.ndarray</span>, <span class="sig-param">vec_b</span><span class="sig-punct">:</span> <span class="sig-type">numpy.ndarray</span>)</code></pre>

Compute Manhattan (L1) distance between two vectors.

**Parameters:**
- `vec_a` (np.ndarray): First feature vector.
- `vec_b` (np.ndarray): Second feature vector.

**Returns:**
(float) Sum of absolute differences between corresponding elements.

<br>

<h3 id="euclidean_distance">qhchina.analytics.stylometry.euclidean_distance() <a href="#euclidean_distance" class="header-link" title="Permalink">#</a> <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/analytics/stylometry.py#L113" class="source-link" title="View source on GitHub">[source]</a></h3>

<pre class="signature"><code><span class="sig-name">euclidean_distance</span>(<span class="sig-param">vec_a</span><span class="sig-punct">:</span> <span class="sig-type">numpy.ndarray</span>, <span class="sig-param">vec_b</span><span class="sig-punct">:</span> <span class="sig-type">numpy.ndarray</span>)</code></pre>

Compute Euclidean (L2) distance between two vectors.

**Parameters:**
- `vec_a` (np.ndarray): First feature vector.
- `vec_b` (np.ndarray): Second feature vector.

**Returns:**
(float) Square root of sum of squared differences.

<br>

<h3 id="eder_delta">qhchina.analytics.stylometry.eder_delta() <a href="#eder_delta" class="header-link" title="Permalink">#</a> <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/analytics/stylometry.py#L127" class="source-link" title="View source on GitHub">[source]</a></h3>

<pre class="signature"><code><span class="sig-name">eder_delta</span>(<span class="sig-param">vec_a</span><span class="sig-punct">:</span> <span class="sig-type">numpy.ndarray</span>, <span class="sig-param">vec_b</span><span class="sig-punct">:</span> <span class="sig-type">numpy.ndarray</span>)</code></pre>

Eder's Delta distance: a variation of Burrows' Delta with different weighting.

Eder's Delta squares the differences and takes the square root of the mean,
giving more weight to larger differences. It also normalizes by vector length.

Formula: $\Delta_E = \sqrt{\frac{1}{n} \sum_{i=1}^{n} (a_i - b_i)^2}$

Reference: Eder, M. (2013). "Mind your corpus: systematic errors in authorship attribution"

<br>

<h3 id="get_relative_frequencies">qhchina.analytics.stylometry.get_relative_frequencies() <a href="#get_relative_frequencies" class="header-link" title="Permalink">#</a> <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/analytics/stylometry.py#L144" class="source-link" title="View source on GitHub">[source]</a></h3>

<pre class="signature"><code><span class="sig-name">get_relative_frequencies</span>(<span class="sig-param">items</span><span class="sig-punct">:</span> <span class="sig-type">list[str]</span>)</code></pre>

Compute relative frequencies for a list of items (tokens or n-grams).

**Returns:**
Dict mapping each unique item to its relative frequency (count / total)

<br>

<h3 id="compute_yule_k">qhchina.analytics.stylometry.compute_yule_k() <a href="#compute_yule_k" class="header-link" title="Permalink">#</a> <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/analytics/stylometry.py#L158" class="source-link" title="View source on GitHub">[source]</a></h3>

<pre class="signature"><code><span class="sig-name">compute_yule_k</span>(<span class="sig-param">tokens</span><span class="sig-punct">:</span> <span class="sig-type">list[str]</span>)</code></pre>

Compute Yule's K characteristic for vocabulary richness.

Yule's K is a measure of lexical diversity that is relatively independent
of text length. Higher values indicate less diverse vocabulary.

Formula: $K = 10^4 \cdot \frac{M_2 - M_1}{M_1^2}$

where $M_1$ = total tokens, $M_2 = \sum_r r^2 \cdot V_r$ (sum of frequency squared 
times count of words with that frequency)

**Parameters:**
- `tokens`: List of tokens

**Returns:**
Yule's K value (typically between 50-200 for normal texts)

<br>

<h3 id="type_token_ratio">qhchina.analytics.stylometry.type_token_ratio() <a href="#type_token_ratio" class="header-link" title="Permalink">#</a> <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/analytics/stylometry.py#L196" class="source-link" title="View source on GitHub">[source]</a></h3>

<pre class="signature"><code><span class="sig-name">type_token_ratio</span>(
    <span class="sig-param">tokens</span><span class="sig-punct">:</span> <span class="sig-type">Iterable[str]</span>,
    <span class="sig-param">variant</span><span class="sig-punct">:</span> <span class="sig-type">str</span> <span class="sig-punct">=</span> <span class="sig-default">'standard'</span>
)</code></pre>

Calculate Type-Token Ratio (TTR) for lexical diversity.

TTR measures lexical diversity - the ratio of unique words (types)
to total words (tokens). Higher values indicate more diverse vocabulary.

Note: Standard TTR is sensitive to text length (longer texts tend to
have lower TTR). Use 'root' or 'log' variants for length-normalized
measures, or use `mattr()` for comparing texts of different lengths.

**Parameters:**
- `tokens`: Iterable of string tokens (e.g., list of words from a text).
- `variant`: Calculation method:
  - 'standard': types / tokens (range: 0.0 to 1.0)
  - 'root': types / sqrt(tokens) - Guiraud's R
  - 'log': log(types) / log(tokens) - Herdan's C

**Returns:**
The TTR value. For 'standard', this is between 0.0 and 1.0.
For 'root' and 'log', values vary based on text size.

**Raises:**
- `ValueError`: If variant is not recognized or tokens is empty.

**Example:**
```python
from qhchina.analytics import type_token_ratio
tokens = ['我', '爱', '北京', '天安门', '天安门', '上', '太阳', '升']
type_token_ratio(tokens)
0.875
type_token_ratio(tokens, variant='root')
2.474...
```

<br>

<h3 id="mattr">qhchina.analytics.stylometry.mattr() <a href="#mattr" class="header-link" title="Permalink">#</a> <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/analytics/stylometry.py#L256" class="source-link" title="View source on GitHub">[source]</a></h3>

<pre class="signature"><code><span class="sig-name">mattr</span>(<span class="sig-param">tokens</span><span class="sig-punct">:</span> <span class="sig-type">Iterable[str]</span>, <span class="sig-param">window_size</span><span class="sig-punct">:</span> <span class="sig-type">int</span> <span class="sig-punct">=</span> <span class="sig-default">500</span>)</code></pre>

Calculate Moving Average Type-Token Ratio (MATTR).

MATTR is more reliable than standard TTR for comparing texts of
different lengths. It calculates TTR for a sliding window across
the token sequence and returns the mean.

**Parameters:**
- `tokens`: Iterable of string tokens (e.g., list of words from a text).
- `window_size`: Number of tokens per window. Default is 500,
  which is standard in the literature. Smaller windows
  give higher MATTR values.

**Returns:**
Mean TTR across all windows (0.0 to 1.0).

**Raises:**
- `ValueError`: If tokens has fewer than window_size elements.

**Example:**
```python
from qhchina.analytics import mattr
tokens = ['word'] * 1000  # 1000 identical tokens
mattr(tokens, window_size=100)
0.01

# More diverse text
diverse_tokens = [f'word_{i}' for i in range(1000)]
mattr(diverse_tokens, window_size=100)
1.0
```

<br>

<!-- API-END -->
