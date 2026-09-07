---
layout: "docs_with_sidebar"
title: "Stylometry"
permalink: "/docs/stylometry/"
functions:
  - name: "Stylometry"
    anchor: "stylometry"
    url: "/docs/stylometry/stylometry/"
    summary: "Stylometry for authorship attribution and document clustering."
  - name: "Stylometry.bootstrap_predict()"
    anchor: "stylometry-bootstrap_predict"
    url: "/docs/stylometry/stylometry/#stylometry-bootstrap_predict"
    summary: "Bootstrap analysis for prediction robustness."
  - name: "Stylometry.dendrogram()"
    anchor: "stylometry-dendrogram"
    url: "/docs/stylometry/stylometry/#stylometry-dendrogram"
    summary: "Visualize hierarchical clustering as a dendrogram."
  - name: "Stylometry.distance()"
    anchor: "stylometry-distance"
    url: "/docs/stylometry/stylometry/#stylometry-distance"
    summary: "Compute the distance between two documents. Lower = more similar."
  - name: "Stylometry.distance_matrix()"
    anchor: "stylometry-distance_matrix"
    url: "/docs/stylometry/stylometry/#stylometry-distance_matrix"
    summary: "Compute pairwise distance matrix from fitted data."
  - name: "Stylometry.fit_transform()"
    anchor: "stylometry-fit_transform"
    url: "/docs/stylometry/stylometry/#stylometry-fit_transform"
    summary: "Fit the model on a corpus and transform documents to feature vectors."
  - name: "Stylometry.get_author_profile()"
    anchor: "stylometry-get_author_profile"
    url: "/docs/stylometry/stylometry/#stylometry-get_author_profile"
    summary: "Get the feature values for a specific author."
  - name: "Stylometry.get_feature_comparison()"
    anchor: "stylometry-get_feature_comparison"
    url: "/docs/stylometry/stylometry/#stylometry-get_feature_comparison"
    summary: "Get a comparison table of feature values across all fitted authors."
  - name: "Stylometry.hierarchical_clustering()"
    anchor: "stylometry-hierarchical_clustering"
    url: "/docs/stylometry/stylometry/#stylometry-hierarchical_clustering"
    summary: "Perform hierarchical clustering on fitted data."
  - name: "Stylometry.most_similar()"
    anchor: "stylometry-most_similar"
    url: "/docs/stylometry/stylometry/#stylometry-most_similar"
    summary: "Find the most similar documents to a query."
  - name: "Stylometry.plot()"
    anchor: "stylometry-plot"
    url: "/docs/stylometry/stylometry/#stylometry-plot"
    summary: "Create a 2D scatter plot of documents or authors."
  - name: "Stylometry.predict()"
    anchor: "stylometry-predict"
    url: "/docs/stylometry/stylometry/#stylometry-predict"
    summary: "Predict the most likely author for a tokenized text."
  - name: "Stylometry.predict_author()"
    anchor: "stylometry-predict_author"
    url: "/docs/stylometry/stylometry/#stylometry-predict_author"
    summary: "Convenience method to get just the predicted author name."
  - name: "Stylometry.predict_confidence()"
    anchor: "stylometry-predict_confidence"
    url: "/docs/stylometry/stylometry/#stylometry-predict_confidence"
    summary: "Predict with unified confidence scores (higher = more likely)."
  - name: "Stylometry.rolling_delta()"
    anchor: "stylometry-rolling_delta"
    url: "/docs/stylometry/stylometry/#stylometry-rolling_delta"
    summary: "Rolling window analysis across a long text."
  - name: "Stylometry.similarity()"
    anchor: "stylometry-similarity"
    url: "/docs/stylometry/stylometry/#stylometry-similarity"
    summary: "Compute the similarity between two documents. Higher = more similar."
  - name: "Stylometry.transform()"
    anchor: "stylometry-transform"
    url: "/docs/stylometry/stylometry/#stylometry-transform"
    summary: "Transform a tokenized text to a feature vector using fitted features."
  - name: "Stylometry.vocabulary_stats()"
    anchor: "stylometry-vocabulary_stats"
    url: "/docs/stylometry/stylometry/#stylometry-vocabulary_stats"
    summary: "Get vocabulary richness statistics for all fitted documents."
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
- [`Stylometry.bootstrap_predict()`](/docs/stylometry/stylometry/#stylometry-bootstrap_predict) - Bootstrap analysis for prediction robustness.
- [`Stylometry.dendrogram()`](/docs/stylometry/stylometry/#stylometry-dendrogram) - Visualize hierarchical clustering as a dendrogram.
- [`Stylometry.distance()`](/docs/stylometry/stylometry/#stylometry-distance) - Compute the distance between two documents. Lower = more similar.
- [`Stylometry.distance_matrix()`](/docs/stylometry/stylometry/#stylometry-distance_matrix) - Compute pairwise distance matrix from fitted data.
- [`Stylometry.fit_transform()`](/docs/stylometry/stylometry/#stylometry-fit_transform) - Fit the model on a corpus and transform documents to feature vectors.
- [`Stylometry.get_author_profile()`](/docs/stylometry/stylometry/#stylometry-get_author_profile) - Get the feature values for a specific author.
- [`Stylometry.get_feature_comparison()`](/docs/stylometry/stylometry/#stylometry-get_feature_comparison) - Get a comparison table of feature values across all fitted authors.
- [`Stylometry.hierarchical_clustering()`](/docs/stylometry/stylometry/#stylometry-hierarchical_clustering) - Perform hierarchical clustering on fitted data.
- [`Stylometry.most_similar()`](/docs/stylometry/stylometry/#stylometry-most_similar) - Find the most similar documents to a query.
- [`Stylometry.plot()`](/docs/stylometry/stylometry/#stylometry-plot) - Create a 2D scatter plot of documents or authors.
- [`Stylometry.predict()`](/docs/stylometry/stylometry/#stylometry-predict) - Predict the most likely author for a tokenized text.
- [`Stylometry.predict_author()`](/docs/stylometry/stylometry/#stylometry-predict_author) - Convenience method to get just the predicted author name.
- [`Stylometry.predict_confidence()`](/docs/stylometry/stylometry/#stylometry-predict_confidence) - Predict with unified confidence scores (higher = more likely).
- [`Stylometry.rolling_delta()`](/docs/stylometry/stylometry/#stylometry-rolling_delta) - Rolling window analysis across a long text.
- [`Stylometry.similarity()`](/docs/stylometry/stylometry/#stylometry-similarity) - Compute the similarity between two documents. Higher = more similar.
- [`Stylometry.transform()`](/docs/stylometry/stylometry/#stylometry-transform) - Transform a tokenized text to a feature vector using fitted features.
- [`Stylometry.vocabulary_stats()`](/docs/stylometry/stylometry/#stylometry-vocabulary_stats) - Get vocabulary richness statistics for all fitted documents.
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
