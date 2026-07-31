---
layout: "docs_with_sidebar"
title: "Stylometry"
permalink: "/docs/stylometry/"
functions:
  - name: "Stylometry"
    anchor: "stylometry"
    url: "/docs/stylometry/stylometry/"
    summary: "Stylometry for authorship attribution and document clustering."
  - name: "compare_corpora()"
    anchor: "compare-corpora"
    url: "/docs/stylometry/compare-corpora/"
    summary: "Compare two corpora to identify statistically significant differences in word usage."
  - name: "extract_mfw()"
    anchor: "extract-mfw"
    url: "/docs/stylometry/extract-mfw/"
    summary: "Extract the Most Frequent Words (MFW) from a frequency counter."
  - name: "burrows_delta()"
    anchor: "burrows-delta"
    url: "/docs/stylometry/burrows-delta/"
    summary: "Compute Burrows' Delta distance between two feature vectors."
  - name: "manhattan_distance()"
    anchor: "manhattan-distance"
    url: "/docs/stylometry/manhattan-distance/"
    summary: "Compute Manhattan (L1) distance between two vectors."
  - name: "euclidean_distance()"
    anchor: "euclidean-distance"
    url: "/docs/stylometry/euclidean-distance/"
    summary: "Compute Euclidean (L2) distance between two vectors."
  - name: "eder_delta()"
    anchor: "eder-delta"
    url: "/docs/stylometry/eder-delta/"
    summary: "Eder's Delta distance: a variation of Burrows' Delta with different weighting."
  - name: "get_relative_frequencies()"
    anchor: "get-relative-frequencies"
    url: "/docs/stylometry/get-relative-frequencies/"
    summary: "Compute relative frequencies for a list of items (tokens or n-grams)."
  - name: "compute_yule_k()"
    anchor: "compute-yule-k"
    url: "/docs/stylometry/compute-yule-k/"
    summary: "Compute Yule's K characteristic for vocabulary richness."
  - name: "type_token_ratio()"
    anchor: "type-token-ratio"
    url: "/docs/stylometry/type-token-ratio/"
    summary: "Calculate Type-Token Ratio (TTR) for lexical diversity."
  - name: "mattr()"
    anchor: "mattr"
    url: "/docs/stylometry/mattr/"
    summary: "Calculate Moving Average Type-Token Ratio (MATTR)."
has_examples: true
import_from: "qhchina.analytics.stylometry"
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

---

## API Reference

<!-- API-START -->

### API Index

Select a symbol to view full documentation:

- [`Stylometry`](/docs/stylometry/stylometry/) - Stylometry for authorship attribution and document clustering.
- [`compare_corpora()`](/docs/stylometry/compare-corpora/) - Compare two corpora to identify statistically significant differences in word usage.
- [`extract_mfw()`](/docs/stylometry/extract-mfw/) - Extract the Most Frequent Words (MFW) from a frequency counter.
- [`burrows_delta()`](/docs/stylometry/burrows-delta/) - Compute Burrows' Delta distance between two feature vectors.
- [`manhattan_distance()`](/docs/stylometry/manhattan-distance/) - Compute Manhattan (L1) distance between two vectors.
- [`euclidean_distance()`](/docs/stylometry/euclidean-distance/) - Compute Euclidean (L2) distance between two vectors.
- [`eder_delta()`](/docs/stylometry/eder-delta/) - Eder's Delta distance: a variation of Burrows' Delta with different weighting.
- [`get_relative_frequencies()`](/docs/stylometry/get-relative-frequencies/) - Compute relative frequencies for a list of items (tokens or n-grams).
- [`compute_yule_k()`](/docs/stylometry/compute-yule-k/) - Compute Yule's K characteristic for vocabulary richness.
- [`type_token_ratio()`](/docs/stylometry/type-token-ratio/) - Calculate Type-Token Ratio (TTR) for lexical diversity.
- [`mattr()`](/docs/stylometry/mattr/) - Calculate Moving Average Type-Token Ratio (MATTR).

<!-- API-END -->
