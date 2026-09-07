---
layout: "docs_with_sidebar"
title: "Word Embeddings"
permalink: "/docs/word_embeddings/"
functions:
  - name: "Word2Vec"
    anchor: "word2vec"
    url: "/docs/word_embeddings/word2vec/"
    summary: "Word2Vec model for learning word embeddings from text."
  - name: "Word2Vec.build_vocab()"
    anchor: "word2vec-build_vocab"
    url: "/docs/word_embeddings/word2vec/#word2vec-build_vocab"
    summary: "Build vocabulary from sentences."
  - name: "Word2Vec.export()"
    anchor: "word2vec-export"
    url: "/docs/word_embeddings/word2vec/#word2vec-export"
    summary: "Export word vectors to external format for interoperability."
  - name: "Word2Vec.get_vector()"
    anchor: "word2vec-get_vector"
    url: "/docs/word_embeddings/word2vec/#word2vec-get_vector"
    summary: "Get the vector for a word."
  - name: "Word2Vec.load()"
    anchor: "word2vec-load"
    url: "/docs/word_embeddings/word2vec/#word2vec-load"
    summary: "Load a model from a file."
  - name: "Word2Vec.load_vectors()"
    anchor: "word2vec-load_vectors"
    url: "/docs/word_embeddings/word2vec/#word2vec-load_vectors"
    summary: "Load word vectors from external format."
  - name: "Word2Vec.most_similar()"
    anchor: "word2vec-most_similar"
    url: "/docs/word_embeddings/word2vec/#word2vec-most_similar"
    summary: "Find the topn most similar words to the given word or vector."
  - name: "Word2Vec.save()"
    anchor: "word2vec-save"
    url: "/docs/word_embeddings/word2vec/#word2vec-save"
    summary: "Save the model to a file."
  - name: "Word2Vec.similarity()"
    anchor: "word2vec-similarity"
    url: "/docs/word_embeddings/word2vec/#word2vec-similarity"
    summary: "Calculate cosine similarity between two words."
  - name: "Word2Vec.train()"
    anchor: "word2vec-train"
    url: "/docs/word_embeddings/word2vec/#word2vec-train"
    summary: "Train word2vec model on sentences."
  - name: "TempRefWord2Vec"
    anchor: "temprefword2vec"
    url: "/docs/word_embeddings/temprefword2vec/"
    summary: "Word2Vec with Temporal Referencing (TR) for tracking semantic change."
  - name: "TempRefWord2Vec.build_vocab()"
    anchor: "temprefword2vec-build_vocab"
    url: "/docs/word_embeddings/temprefword2vec/#temprefword2vec-build_vocab"
    summary: "Build vocabulary by iterating through corpora."
  - name: "TempRefWord2Vec.calculate_semantic_change()"
    anchor: "temprefword2vec-calculate_semantic_change"
    url: "/docs/word_embeddings/temprefword2vec/#temprefword2vec-calculate_semantic_change"
    summary: "Calculate semantic change by comparing cosine similarities across time periods."
  - name: "TempRefWord2Vec.export()"
    anchor: "temprefword2vec-export"
    url: "/docs/word_embeddings/temprefword2vec/#temprefword2vec-export"
    summary: "Export is not supported for TempRefWord2Vec."
  - name: "TempRefWord2Vec.get_available_targets()"
    anchor: "temprefword2vec-get_available_targets"
    url: "/docs/word_embeddings/temprefword2vec/#temprefword2vec-get_available_targets"
    summary: "Get the list of target words available for semantic change analysis."
  - name: "TempRefWord2Vec.get_period_vocab_counts()"
    anchor: "temprefword2vec-get_period_vocab_counts"
    url: "/docs/word_embeddings/temprefword2vec/#temprefword2vec-get_period_vocab_counts"
    summary: "Get vocabulary counts for a specific period or all periods."
  - name: "TempRefWord2Vec.get_time_labels()"
    anchor: "temprefword2vec-get_time_labels"
    url: "/docs/word_embeddings/temprefword2vec/#temprefword2vec-get_time_labels"
    summary: "Get the list of time period labels used in the model."
  - name: "TempRefWord2Vec.load()"
    anchor: "temprefword2vec-load"
    url: "/docs/word_embeddings/temprefword2vec/#temprefword2vec-load"
    summary: "Load a TempRefWord2Vec model from a file."
  - name: "TempRefWord2Vec.load_vectors()"
    anchor: "temprefword2vec-load_vectors"
    url: "/docs/word_embeddings/temprefword2vec/#temprefword2vec-load_vectors"
    summary: "load_vectors() is not supported for TempRefWord2Vec."
  - name: "TempRefWord2Vec.save()"
    anchor: "temprefword2vec-save"
    url: "/docs/word_embeddings/temprefword2vec/#temprefword2vec-save"
    summary: "Save the TempRefWord2Vec model to a file, including vocab counts and temporal metadata."
  - name: "TempRefWord2Vec.train()"
    anchor: "temprefword2vec-train"
    url: "/docs/word_embeddings/temprefword2vec/#temprefword2vec-train"
    summary: "Train the TempRefWord2Vec model."
  - name: "DynamicWord2Vec"
    anchor: "dynamicword2vec"
    url: "/docs/word_embeddings/dynamicword2vec/"
    summary: "Word2Vec with time-sliced embeddings for diachronic semantic analysis."
  - name: "DynamicWord2Vec.build_vocab()"
    anchor: "dynamicword2vec-build_vocab"
    url: "/docs/word_embeddings/dynamicword2vec/#dynamicword2vec-build_vocab"
    summary: "Build vocabulary by iterating through all corpora."
  - name: "DynamicWord2Vec.calculate_semantic_change()"
    anchor: "dynamicword2vec-calculate_semantic_change"
    url: "/docs/word_embeddings/dynamicword2vec/#dynamicword2vec-calculate_semantic_change"
    summary: "Calculate semantic change by comparing similarity shifts across time periods."
  - name: "DynamicWord2Vec.calculate_temporal_drift()"
    anchor: "dynamicword2vec-calculate_temporal_drift"
    url: "/docs/word_embeddings/dynamicword2vec/#dynamicword2vec-calculate_temporal_drift"
    summary: "Calculate temporal drift as cosine distances between adjacent time slices."
  - name: "DynamicWord2Vec.export()"
    anchor: "dynamicword2vec-export"
    url: "/docs/word_embeddings/dynamicword2vec/#dynamicword2vec-export"
    summary: "Export is not supported for DynamicWord2Vec."
  - name: "DynamicWord2Vec.get_all_time_vectors()"
    anchor: "dynamicword2vec-get_all_time_vectors"
    url: "/docs/word_embeddings/dynamicword2vec/#dynamicword2vec-get_all_time_vectors"
    summary: "Get vectors for a word across all time periods."
  - name: "DynamicWord2Vec.get_time_labels()"
    anchor: "dynamicword2vec-get_time_labels"
    url: "/docs/word_embeddings/dynamicword2vec/#dynamicword2vec-get_time_labels"
    summary: "Get the list of time period labels."
  - name: "DynamicWord2Vec.get_vector()"
    anchor: "dynamicword2vec-get_vector"
    url: "/docs/word_embeddings/dynamicword2vec/#dynamicword2vec-get_vector"
    summary: "Get the vector for a word at a specific time period."
  - name: "DynamicWord2Vec.load()"
    anchor: "dynamicword2vec-load"
    url: "/docs/word_embeddings/dynamicword2vec/#dynamicword2vec-load"
    summary: "Load a DynamicWord2Vec model from a file."
  - name: "DynamicWord2Vec.load_vectors()"
    anchor: "dynamicword2vec-load_vectors"
    url: "/docs/word_embeddings/dynamicword2vec/#dynamicword2vec-load_vectors"
    summary: "load_vectors() is not supported for DynamicWord2Vec."
  - name: "DynamicWord2Vec.most_similar()"
    anchor: "dynamicword2vec-most_similar"
    url: "/docs/word_embeddings/dynamicword2vec/#dynamicword2vec-most_similar"
    summary: "Find the topn most similar words to the given word at a specific time period."
  - name: "DynamicWord2Vec.save()"
    anchor: "dynamicword2vec-save"
    url: "/docs/word_embeddings/dynamicword2vec/#dynamicword2vec-save"
    summary: "Save the DynamicWord2Vec model to a file."
  - name: "DynamicWord2Vec.similarity()"
    anchor: "dynamicword2vec-similarity"
    url: "/docs/word_embeddings/dynamicword2vec/#dynamicword2vec-similarity"
    summary: "Calculate similarity within one explicitly selected time slice."
  - name: "DynamicWord2Vec.train()"
    anchor: "dynamicword2vec-train"
    url: "/docs/word_embeddings/dynamicword2vec/#dynamicword2vec-train"
    summary: "Train the DynamicWord2Vec model."
  - name: "GloVe"
    anchor: "glove"
    url: "/docs/word_embeddings/glove/"
    summary: "Global Vectors (GloVe) model with sparse co-occurrence training."
  - name: "GloVe.load()"
    anchor: "glove-load"
    url: "/docs/word_embeddings/glove/#glove-load"
    summary: "Load a previously saved GloVe model from pickle."
  - name: "GloVe.save()"
    anchor: "glove-save"
    url: "/docs/word_embeddings/glove/#glove-save"
    summary: "Persist full GloVe state including optimizer accumulators."
  - name: "GloVe.similarity()"
    anchor: "glove-similarity"
    url: "/docs/word_embeddings/glove/#glove-similarity"
    summary: "No description available."
  - name: "GloVe.train()"
    anchor: "glove-train"
    url: "/docs/word_embeddings/glove/#glove-train"
    summary: "Train GloVe on a restartable sentence iterable."
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
- [`Word2Vec.build_vocab()`](/docs/word_embeddings/word2vec/#word2vec-build_vocab) - Build vocabulary from sentences.
- [`Word2Vec.export()`](/docs/word_embeddings/word2vec/#word2vec-export) - Export word vectors to external format for interoperability.
- [`Word2Vec.get_vector()`](/docs/word_embeddings/word2vec/#word2vec-get_vector) - Get the vector for a word.
- [`Word2Vec.load()`](/docs/word_embeddings/word2vec/#word2vec-load) - Load a model from a file.
- [`Word2Vec.load_vectors()`](/docs/word_embeddings/word2vec/#word2vec-load_vectors) - Load word vectors from external format.
- [`Word2Vec.most_similar()`](/docs/word_embeddings/word2vec/#word2vec-most_similar) - Find the topn most similar words to the given word or vector.
- [`Word2Vec.save()`](/docs/word_embeddings/word2vec/#word2vec-save) - Save the model to a file.
- [`Word2Vec.similarity()`](/docs/word_embeddings/word2vec/#word2vec-similarity) - Calculate cosine similarity between two words.
- [`Word2Vec.train()`](/docs/word_embeddings/word2vec/#word2vec-train) - Train word2vec model on sentences.
- [`TempRefWord2Vec`](/docs/word_embeddings/temprefword2vec/) - Word2Vec with Temporal Referencing (TR) for tracking semantic change.
- [`TempRefWord2Vec.build_vocab()`](/docs/word_embeddings/temprefword2vec/#temprefword2vec-build_vocab) - Build vocabulary by iterating through corpora.
- [`TempRefWord2Vec.calculate_semantic_change()`](/docs/word_embeddings/temprefword2vec/#temprefword2vec-calculate_semantic_change) - Calculate semantic change by comparing cosine similarities across time periods.
- [`TempRefWord2Vec.export()`](/docs/word_embeddings/temprefword2vec/#temprefword2vec-export) - Export is not supported for TempRefWord2Vec.
- [`TempRefWord2Vec.get_available_targets()`](/docs/word_embeddings/temprefword2vec/#temprefword2vec-get_available_targets) - Get the list of target words available for semantic change analysis.
- [`TempRefWord2Vec.get_period_vocab_counts()`](/docs/word_embeddings/temprefword2vec/#temprefword2vec-get_period_vocab_counts) - Get vocabulary counts for a specific period or all periods.
- [`TempRefWord2Vec.get_time_labels()`](/docs/word_embeddings/temprefword2vec/#temprefword2vec-get_time_labels) - Get the list of time period labels used in the model.
- [`TempRefWord2Vec.load()`](/docs/word_embeddings/temprefword2vec/#temprefword2vec-load) - Load a TempRefWord2Vec model from a file.
- [`TempRefWord2Vec.load_vectors()`](/docs/word_embeddings/temprefword2vec/#temprefword2vec-load_vectors) - load_vectors() is not supported for TempRefWord2Vec.
- [`TempRefWord2Vec.save()`](/docs/word_embeddings/temprefword2vec/#temprefword2vec-save) - Save the TempRefWord2Vec model to a file, including vocab counts and temporal metadata.
- [`TempRefWord2Vec.train()`](/docs/word_embeddings/temprefword2vec/#temprefword2vec-train) - Train the TempRefWord2Vec model.
- [`DynamicWord2Vec`](/docs/word_embeddings/dynamicword2vec/) - Word2Vec with time-sliced embeddings for diachronic semantic analysis.
- [`DynamicWord2Vec.build_vocab()`](/docs/word_embeddings/dynamicword2vec/#dynamicword2vec-build_vocab) - Build vocabulary by iterating through all corpora.
- [`DynamicWord2Vec.calculate_semantic_change()`](/docs/word_embeddings/dynamicword2vec/#dynamicword2vec-calculate_semantic_change) - Calculate semantic change by comparing similarity shifts across time periods.
- [`DynamicWord2Vec.calculate_temporal_drift()`](/docs/word_embeddings/dynamicword2vec/#dynamicword2vec-calculate_temporal_drift) - Calculate temporal drift as cosine distances between adjacent time slices.
- [`DynamicWord2Vec.export()`](/docs/word_embeddings/dynamicword2vec/#dynamicword2vec-export) - Export is not supported for DynamicWord2Vec.
- [`DynamicWord2Vec.get_all_time_vectors()`](/docs/word_embeddings/dynamicword2vec/#dynamicword2vec-get_all_time_vectors) - Get vectors for a word across all time periods.
- [`DynamicWord2Vec.get_time_labels()`](/docs/word_embeddings/dynamicword2vec/#dynamicword2vec-get_time_labels) - Get the list of time period labels.
- [`DynamicWord2Vec.get_vector()`](/docs/word_embeddings/dynamicword2vec/#dynamicword2vec-get_vector) - Get the vector for a word at a specific time period.
- [`DynamicWord2Vec.load()`](/docs/word_embeddings/dynamicword2vec/#dynamicword2vec-load) - Load a DynamicWord2Vec model from a file.
- [`DynamicWord2Vec.load_vectors()`](/docs/word_embeddings/dynamicword2vec/#dynamicword2vec-load_vectors) - load_vectors() is not supported for DynamicWord2Vec.
- [`DynamicWord2Vec.most_similar()`](/docs/word_embeddings/dynamicword2vec/#dynamicword2vec-most_similar) - Find the topn most similar words to the given word at a specific time period.
- [`DynamicWord2Vec.save()`](/docs/word_embeddings/dynamicword2vec/#dynamicword2vec-save) - Save the DynamicWord2Vec model to a file.
- [`DynamicWord2Vec.similarity()`](/docs/word_embeddings/dynamicword2vec/#dynamicword2vec-similarity) - Calculate similarity within one explicitly selected time slice.
- [`DynamicWord2Vec.train()`](/docs/word_embeddings/dynamicword2vec/#dynamicword2vec-train) - Train the DynamicWord2Vec model.
- [`GloVe`](/docs/word_embeddings/glove/) - Global Vectors (GloVe) model with sparse co-occurrence training.
- [`GloVe.load()`](/docs/word_embeddings/glove/#glove-load) - Load a previously saved GloVe model from pickle.
- [`GloVe.save()`](/docs/word_embeddings/glove/#glove-save) - Persist full GloVe state including optimizer accumulators.
- [`GloVe.similarity()`](/docs/word_embeddings/glove/#glove-similarity) - No description available.
- [`GloVe.train()`](/docs/word_embeddings/glove/#glove-train) - Train GloVe on a restartable sentence iterable.
- [`project_2d()`](/docs/word_embeddings/project-2d/) - Projects high-dimensional vectors into 2D using PCA, t-SNE, or UMAP and visualizes them.
- [`get_bias_direction()`](/docs/word_embeddings/get-bias-direction/) - Compute the direction vector for measuring bias.
- [`calculate_bias()`](/docs/word_embeddings/calculate-bias/) - Calculate bias scores for target words along an axis defined by anchor pairs.
- [`project_bias()`](/docs/word_embeddings/project-bias/) - Plot words on a 1D or 2D chart by projecting them onto bias axes.
- [`cosine_similarity()`](/docs/word_embeddings/cosine-similarity/) - Compute cosine similarity between vectors.
- [`cosine_distance()`](/docs/word_embeddings/cosine-distance/) - Compute cosine distance between vectors (1 - cosine_similarity).
- [`most_similar()`](/docs/word_embeddings/most-similar/) - Find vectors most similar to target_vector using selected metric.
- [`align_vectors()`](/docs/word_embeddings/align-vectors/) - Align source vectors with target vectors using Procrustes analysis.

<!-- API-END -->
