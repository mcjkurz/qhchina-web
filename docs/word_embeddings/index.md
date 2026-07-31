---
layout: "docs_with_sidebar"
title: "Word Embeddings"
permalink: "/docs/word_embeddings/"
functions:
  - name: "Word2Vec"
    anchor: "word2vec"
    url: "/docs/word_embeddings/word2vec/"
    summary: "Word2Vec model for learning word embeddings from text."
  - name: "TempRefWord2Vec"
    anchor: "temprefword2vec"
    url: "/docs/word_embeddings/temprefword2vec/"
    summary: "Word2Vec with Temporal Referencing (TR) for tracking semantic change."
  - name: "DynamicWord2Vec"
    anchor: "dynamicword2vec"
    url: "/docs/word_embeddings/dynamicword2vec/"
    summary: "Word2Vec with time-sliced embeddings for diachronic semantic analysis."
  - name: "GloVe"
    anchor: "glove"
    url: "/docs/word_embeddings/glove/"
    summary: "Global Vectors (GloVe) model with sparse co-occurrence training."
  - name: "project_2d()"
    anchor: "project-2d"
    url: "/docs/word_embeddings/project-2d/"
    summary: "Projects high-dimensional vectors into 2D using PCA, t-SNE, or UMAP and visualizes them."
  - name: "get_bias_direction()"
    anchor: "get-bias-direction"
    url: "/docs/word_embeddings/get-bias-direction/"
    summary: "Compute the direction vector for measuring bias."
  - name: "calculate_bias()"
    anchor: "calculate-bias"
    url: "/docs/word_embeddings/calculate-bias/"
    summary: "Calculate bias scores for target words along an axis defined by anchor pairs."
  - name: "project_bias()"
    anchor: "project-bias"
    url: "/docs/word_embeddings/project-bias/"
    summary: "Plot words on a 1D or 2D chart by projecting them onto bias axes."
  - name: "cosine_similarity()"
    anchor: "cosine-similarity"
    url: "/docs/word_embeddings/cosine-similarity/"
    summary: "Compute cosine similarity between vectors."
  - name: "cosine_distance()"
    anchor: "cosine-distance"
    url: "/docs/word_embeddings/cosine-distance/"
    summary: "Compute cosine distance between vectors (1 - cosine_similarity)."
  - name: "most_similar()"
    anchor: "most-similar"
    url: "/docs/word_embeddings/most-similar/"
    summary: "Find vectors most similar to target_vector using selected metric."
  - name: "align_vectors()"
    anchor: "align-vectors"
    url: "/docs/word_embeddings/align-vectors/"
    summary: "Align source vectors with target vectors using Procrustes analysis."
import_from: ['qhchina.analytics.embeddings', 'qhchina.analytics.vectors']
include_imported: true
has_examples: true
---

# Word Embeddings

Word embeddings represent words as dense vectors in a continuous space, where semantically similar words are positioned closer together. These vector representations enable computational analysis of meaning, including finding synonyms, analogies, and measuring semantic similarity. The `qhchina.analytics` module provides Word2Vec implementations for Chinese text analysis, including standard `Word2Vec` as well as `TempRefWord2Vec` and `DynamicWord2Vec` for tracking semantic change over time.

```python
from qhchina.analytics import Word2Vec

model = Word2Vec(sentences, vector_size=100, window=5, min_word_count=5, epochs=5)
model.train()
similar = model.most_similar("经济", topn=10)  # Find words similar to "经济"
```

## Examples

**Basic Word2Vec Training**

```python
from qhchina.analytics import Word2Vec

# Tokenized literary sentences
sentences = [
    ["她", "渴望", "自由", "追求", "理想"],
    ["爱情", "是", "永恒", "的", "主题"],
    # More sentences...
]

# Initialize and train model
model = Word2Vec(sentences, vector_size=100, window=5, min_word_count=5, sg=1, seed=42, epochs=5)
model.train()

# Find words similar to "爱情"
similar = model.most_similar("爱情", topn=10)
for word, score in similar:
    print(f"{word}: {score:.4f}")

# Compare concepts
sim = model.similarity("爱情", "自由")
print(f"Similarity: {sim:.4f}")
```

**Tracking Semantic Change Over Time**

```python
from qhchina import Corpus
from qhchina.analytics import TempRefWord2Vec, LineSentenceFile

# Track how key concepts evolved
target_words = ["自由", "爱情", "革命"]

texts_1920 = LineSentenceFile("1920.txt") # one sentence per line, words split by spaces
texts_2000 = LineSentenceFile("2000.txt")

# Step 2: Initialize model with file paths
model = TempRefWord2Vec(
    sentences={"1920": texts_1920, "2000": texts_2000},
    targets=target_words,
    vector_size=100,
    window=5,
    sg=1,
    seed=42,
    epochs=5
)

# Step 3: Train the model
model.train()

# How did "自由" change from 1920s to 2000s?
changes = model.calculate_semantic_change("自由")
for transition, word_changes in changes.items():
    print(f"\n{transition}:")
    print("Words moved towards:", word_changes[:5])
```


---

## API Reference

<!-- API-START -->

### API Index

Select a symbol to view full documentation:

- [`Word2Vec`](/docs/word_embeddings/word2vec/) - Word2Vec model for learning word embeddings from text.
- [`TempRefWord2Vec`](/docs/word_embeddings/temprefword2vec/) - Word2Vec with Temporal Referencing (TR) for tracking semantic change.
- [`DynamicWord2Vec`](/docs/word_embeddings/dynamicword2vec/) - Word2Vec with time-sliced embeddings for diachronic semantic analysis.
- [`GloVe`](/docs/word_embeddings/glove/) - Global Vectors (GloVe) model with sparse co-occurrence training.
- [`project_2d()`](/docs/word_embeddings/project-2d/) - Projects high-dimensional vectors into 2D using PCA, t-SNE, or UMAP and visualizes them.
- [`get_bias_direction()`](/docs/word_embeddings/get-bias-direction/) - Compute the direction vector for measuring bias.
- [`calculate_bias()`](/docs/word_embeddings/calculate-bias/) - Calculate bias scores for target words along an axis defined by anchor pairs.
- [`project_bias()`](/docs/word_embeddings/project-bias/) - Plot words on a 1D or 2D chart by projecting them onto bias axes.
- [`cosine_similarity()`](/docs/word_embeddings/cosine-similarity/) - Compute cosine similarity between vectors.
- [`cosine_distance()`](/docs/word_embeddings/cosine-distance/) - Compute cosine distance between vectors (1 - cosine_similarity).
- [`most_similar()`](/docs/word_embeddings/most-similar/) - Find vectors most similar to target_vector using selected metric.
- [`align_vectors()`](/docs/word_embeddings/align-vectors/) - Align source vectors with target vectors using Procrustes analysis.

<!-- API-END -->
