---
layout: docs_with_sidebar
title: Word Embeddings
permalink: /docs/word_embeddings/
functions:
  - name: Word2Vec
    anchor: word2vec
  - name: Word2Vec.build_vocab()
    anchor: word2vec-build_vocab
  - name: Word2Vec.export()
    anchor: word2vec-export
  - name: Word2Vec.get_vector()
    anchor: word2vec-get_vector
  - name: Word2Vec.load()
    anchor: word2vec-load
  - name: Word2Vec.load_vectors()
    anchor: word2vec-load_vectors
  - name: Word2Vec.most_similar()
    anchor: word2vec-most_similar
  - name: Word2Vec.save()
    anchor: word2vec-save
  - name: Word2Vec.similarity()
    anchor: word2vec-similarity
  - name: Word2Vec.train()
    anchor: word2vec-train
  - name: TempRefWord2Vec
    anchor: temprefword2vec
  - name: TempRefWord2Vec.build_vocab()
    anchor: temprefword2vec-build_vocab
  - name: TempRefWord2Vec.calculate_semantic_change()
    anchor: temprefword2vec-calculate_semantic_change
  - name: TempRefWord2Vec.export()
    anchor: temprefword2vec-export
  - name: TempRefWord2Vec.get_available_targets()
    anchor: temprefword2vec-get_available_targets
  - name: TempRefWord2Vec.get_period_vocab_counts()
    anchor: temprefword2vec-get_period_vocab_counts
  - name: TempRefWord2Vec.get_time_labels()
    anchor: temprefword2vec-get_time_labels
  - name: TempRefWord2Vec.load()
    anchor: temprefword2vec-load
  - name: TempRefWord2Vec.load_vectors()
    anchor: temprefword2vec-load_vectors
  - name: TempRefWord2Vec.save()
    anchor: temprefword2vec-save
  - name: TempRefWord2Vec.train()
    anchor: temprefword2vec-train
  - name: DynamicWord2Vec
    anchor: dynamicword2vec
  - name: DynamicWord2Vec.build_vocab()
    anchor: dynamicword2vec-build_vocab
  - name: DynamicWord2Vec.calculate_semantic_change()
    anchor: dynamicword2vec-calculate_semantic_change
  - name: DynamicWord2Vec.calculate_temporal_drift()
    anchor: dynamicword2vec-calculate_temporal_drift
  - name: DynamicWord2Vec.export()
    anchor: dynamicword2vec-export
  - name: DynamicWord2Vec.get_all_time_vectors()
    anchor: dynamicword2vec-get_all_time_vectors
  - name: DynamicWord2Vec.get_time_labels()
    anchor: dynamicword2vec-get_time_labels
  - name: DynamicWord2Vec.get_vector()
    anchor: dynamicword2vec-get_vector
  - name: DynamicWord2Vec.load()
    anchor: dynamicword2vec-load
  - name: DynamicWord2Vec.load_vectors()
    anchor: dynamicword2vec-load_vectors
  - name: DynamicWord2Vec.most_similar()
    anchor: dynamicword2vec-most_similar
  - name: DynamicWord2Vec.save()
    anchor: dynamicword2vec-save
  - name: DynamicWord2Vec.similarity()
    anchor: dynamicword2vec-similarity
  - name: DynamicWord2Vec.train()
    anchor: dynamicword2vec-train
  - name: BalancedSentenceIterator
    anchor: balancedsentenceiterator
  - name: BalancedSentenceIterator.reset()
    anchor: balancedsentenceiterator-reset
  - name: SingleCorpusTemporalIterator
    anchor: singlecorpustemporaliterator
  - name: TemporalSentence
    anchor: temporalsentence
  - name: TemporalSentenceIterator
    anchor: temporalsentenceiterator
  - name: TemporalSentenceIterator.reset()
    anchor: temporalsentenceiterator-reset
  - name: project_2d()
    anchor: project_2d
  - name: get_bias_direction()
    anchor: get_bias_direction
  - name: calculate_bias()
    anchor: calculate_bias
  - name: project_bias()
    anchor: project_bias
  - name: cosine_similarity()
    anchor: cosine_similarity
  - name: cosine_distance()
    anchor: cosine_distance
  - name: most_similar()
    anchor: most_similar
  - name: align_vectors()
    anchor: align_vectors
import_from: ['qhchina.analytics.word2vec', 'qhchina.analytics.vectors']
include_imported: True
has_examples: True
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

<h3 id="word2vec">qhchina.analytics.word2vec.base.Word2Vec <a href="#word2vec" class="header-link" title="Permalink">#</a> <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/analytics/word2vec/base.py#L37" class="source-link" title="View source on GitHub">[source]</a></h3>

<pre class="signature"><code><span class="sig-name">Word2Vec</span>(
    <span class="sig-param">sentences</span><span class="sig-punct">:</span> <span class="sig-type">Iterable[list[str]] | None</span> <span class="sig-punct">=</span> <span class="sig-default">None</span>,
    <span class="sig-param">vector_size</span><span class="sig-punct">:</span> <span class="sig-type">int</span> <span class="sig-punct">=</span> <span class="sig-default">100</span>,
    <span class="sig-param">window</span><span class="sig-punct">:</span> <span class="sig-type">int</span> <span class="sig-punct">=</span> <span class="sig-default">5</span>,
    <span class="sig-param">min_word_count</span><span class="sig-punct">:</span> <span class="sig-type">int</span> <span class="sig-punct">=</span> <span class="sig-default">5</span>,
    <span class="sig-param">negative</span><span class="sig-punct">:</span> <span class="sig-type">int</span> <span class="sig-punct">=</span> <span class="sig-default">5</span>,
    <span class="sig-param">ns_exponent</span><span class="sig-punct">:</span> <span class="sig-type">float</span> <span class="sig-punct">=</span> <span class="sig-default">0.75</span>,
    <span class="sig-param">cbow_mean</span><span class="sig-punct">:</span> <span class="sig-type">bool</span> <span class="sig-punct">=</span> <span class="sig-default">True</span>,
    <span class="sig-param">sg</span><span class="sig-punct">:</span> <span class="sig-type">int</span> <span class="sig-punct">=</span> <span class="sig-default">0</span>,
    <span class="sig-param">seed</span><span class="sig-punct">:</span> <span class="sig-type">int | None</span> <span class="sig-punct">=</span> <span class="sig-default">None</span>,
    <span class="sig-param">alpha</span><span class="sig-punct">:</span> <span class="sig-type">float</span> <span class="sig-punct">=</span> <span class="sig-default">0.025</span>,
    <span class="sig-param">min_alpha</span><span class="sig-punct">:</span> <span class="sig-type">float | None</span> <span class="sig-punct">=</span> <span class="sig-default">None</span>,
    <span class="sig-param">sample</span><span class="sig-punct">:</span> <span class="sig-type">float</span> <span class="sig-punct">=</span> <span class="sig-default">0.001</span>,
    <span class="sig-param">shrink_windows</span><span class="sig-punct">:</span> <span class="sig-type">bool</span> <span class="sig-punct">=</span> <span class="sig-default">True</span>,
    <span class="sig-param">max_vocab_size</span><span class="sig-punct">:</span> <span class="sig-type">int | None</span> <span class="sig-punct">=</span> <span class="sig-default">None</span>,
    <span class="sig-param">verbose</span><span class="sig-punct">:</span> <span class="sig-type">bool</span> <span class="sig-punct">=</span> <span class="sig-default">False</span>,
    <span class="sig-param">epochs</span><span class="sig-punct">:</span> <span class="sig-type">int | None</span> <span class="sig-punct">=</span> <span class="sig-default">None</span>,
    <span class="sig-param">batch_size</span><span class="sig-punct">:</span> <span class="sig-type">int</span> <span class="sig-punct">=</span> <span class="sig-default">10240</span>,
    <span class="sig-param">workers</span><span class="sig-punct">:</span> <span class="sig-type">int</span> <span class="sig-punct">=</span> <span class="sig-default">1</span>,
    <span class="sig-param">callbacks</span><span class="sig-punct">:</span> <span class="sig-type">list[Callable] | None</span> <span class="sig-punct">=</span> <span class="sig-default">None</span>,
    <span class="sig-param">calculate_loss</span><span class="sig-punct">:</span> <span class="sig-type">bool</span> <span class="sig-punct">=</span> <span class="sig-default">True</span>,
    <span class="sig-param">shuffle</span><span class="sig-punct">:</span> <span class="sig-type">bool | None</span> <span class="sig-punct">=</span> <span class="sig-default">None</span>,
    <span class="sig-param">_skip_init</span><span class="sig-punct">:</span> <span class="sig-type">bool</span> <span class="sig-punct">=</span> <span class="sig-default">False</span>
)</code></pre>

Word2Vec model for learning word embeddings from text.

Supports two training algorithms:
- Skip-gram (sg=1): Predicts context words from center word. Generally better for 
  infrequent words and smaller datasets.
- CBOW (sg=0): Predicts center word from context words. Faster to train.

Training does not start automatically. Call `train()` explicitly after initialization
to begin training.

**Parameters:**
- `sentences`: Iterable of tokenized sentences, where each sentence is a list of
  string tokens. Must be restartable (can be iterated multiple times).
  For streaming from a file, use ``LineSentenceFile``.
- `vector_size` (int): Dimensionality of the word vectors (default: 100).
- `window` (int): Maximum distance between the current and predicted word (default: 5).
- `min_word_count` (int): Ignores all words with frequency lower than this (default: 5).
- `negative` (int): Number of negative samples (default: 5).
- `ns_exponent` (float): Exponent for negative sampling distribution (default: 0.75).
- `cbow_mean` (bool): If True, use mean of context word vectors, else use sum (default: True).
- `sg` (int): Training algorithm: 1 for skip-gram; 0 for CBOW (default: 0).
- `seed` (int): Seed for random number generator. If None, uses global seed setting.
- `alpha` (float): Initial learning rate (default: 0.025).
- `min_alpha` (float): Minimum learning rate. If None, learning rate remains constant.
- `sample` (float): Threshold for subsampling frequent words. Default is 1e-3, set to 0 to disable.
- `shrink_windows` (bool): If True, randomly vary the effective window size during training 
  (default: True).
- `max_vocab_size` (int): Maximum vocabulary size. None means no limit.
- `verbose` (bool): If True, log progress information during training (default: False).
- `epochs` (int): Number of training iterations over the corpus. Must be specified explicitly.
- `batch_size` (int): Number of words per training batch (default: 10240).
- `workers` (int): Number of worker threads for parallel training (default: 1).
- `callbacks` (list of callable): Callback functions to call after each epoch.
- `calculate_loss` (bool): Whether to calculate and return the final loss (default: True).
- `shuffle` (bool): Whether to shuffle sentences before each epoch. 
  Defaults to True if sentences is a list, False otherwise.

**Example:**
```python
from qhchina.analytics import Word2Vec, LineSentenceFile

# From a list of tokenized sentences
sentences = [['我', '喜欢', '学习'], ['他', '喜欢', '运动']]
model = Word2Vec(sentences, vector_size=100, window=5, min_word_count=1, epochs=5)
model.train()

# From a text file (memory-efficient for large corpora)
# File format: one sentence per line, tokens separated by spaces
sentences = LineSentenceFile("corpus.txt")
model = Word2Vec(sentences, vector_size=100, epochs=5)
model.train()

# Get word vector
vector = model['喜欢']

# Find similar words
similar = model.most_similar('喜欢', topn=5)
```

<h4 id="word2vec-build_vocab">qhchina.analytics.word2vec.base.Word2Vec.build_vocab() <a href="#word2vec-build_vocab" class="header-link" title="Permalink">#</a> <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/analytics/word2vec/base.py#L235" class="source-link" title="View source on GitHub">[source]</a></h4>

<pre class="signature"><code><span class="sig-name">build_vocab</span>(<span class="sig-param">sentences</span><span class="sig-punct">:</span> <span class="sig-type">Iterable[list[str]]</span>)</code></pre>

Build vocabulary from sentences.

**Parameters:**
- `sentences`: Iterable of tokenized sentences (each sentence is a list of words).

**Raises:**
- `ValueError`: If sentences is empty or contains no words.

<h4 id="word2vec-export">qhchina.analytics.word2vec.base.Word2Vec.export() <a href="#word2vec-export" class="header-link" title="Permalink">#</a> <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/analytics/word2vec/base.py#L1347" class="source-link" title="View source on GitHub">[source]</a></h4>

<pre class="signature"><code><span class="sig-name">export</span>(<span class="sig-param">path</span><span class="sig-punct">:</span> <span class="sig-type">str</span>, <span class="sig-param">format</span><span class="sig-punct">:</span> <span class="sig-type">str</span> <span class="sig-punct">=</span> <span class="sig-default">'word2vec'</span>, <span class="sig-param">binary</span><span class="sig-punct">:</span> <span class="sig-type">bool</span> <span class="sig-punct">=</span> <span class="sig-default">True</span>)</code></pre>

Export word vectors to external format for interoperability.

Exports only the input embeddings (W matrix). Output embeddings (W_prime)
and word counts are not exported as external formats don't support them.

**Parameters:**
- `path`: Output file path.
- `format`: Export format, one of:
  - "word2vec": Google word2vec C format (default). Compatible with
    gensim's ``KeyedVectors.load_word2vec_format()``.
  - "glove": GloVe text format. No header, space-separated values.
  - "gensim": Gensim's native KeyedVectors format. Requires gensim.
- `binary`: For word2vec format only. If True (default), write vectors as
  binary floats. If False, write as text. Ignored for other formats.

**Raises:**
- `ValueError`: If format is not recognized.
- `ImportError`: If format="gensim" and gensim is not installed.

**Example:**
```python
# Export to word2vec binary format
model.export("vectors.bin", format="word2vec", binary=True)

# Export to text format for inspection
model.export("vectors.txt", format="word2vec", binary=False)

# Export to GloVe format
model.export("vectors.glove.txt", format="glove")

# Load in gensim
from gensim.models import KeyedVectors
kv = KeyedVectors.load_word2vec_format("vectors.bin", binary=True)
```

<h4 id="word2vec-get_vector">qhchina.analytics.word2vec.base.Word2Vec.get_vector() <a href="#word2vec-get_vector" class="header-link" title="Permalink">#</a> <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/analytics/word2vec/base.py#L1155" class="source-link" title="View source on GitHub">[source]</a></h4>

<pre class="signature"><code><span class="sig-name">get_vector</span>(<span class="sig-param">word</span><span class="sig-punct">:</span> <span class="sig-type">str</span>, <span class="sig-param">normalize</span><span class="sig-punct">:</span> <span class="sig-type">bool</span> <span class="sig-punct">=</span> <span class="sig-default">False</span>)</code></pre>

Get the vector for a word.

**Parameters:**
- `word`: Input word.
- `normalize`: If True, return the normalized vector (unit length).

**Returns:**
Word vector as numpy array of shape (vector_size,).

**Raises:**
- `KeyError`: If word is not in vocabulary.

<h4 id="word2vec-load">qhchina.analytics.word2vec.base.Word2Vec.load() <a href="#word2vec-load" class="header-link" title="Permalink">#</a> <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/analytics/word2vec/base.py#L1439" class="source-link" title="View source on GitHub">[source]</a></h4>

<pre class="signature"><code><span class="sig-name">load</span>(<span class="sig-param">path</span><span class="sig-punct">:</span> <span class="sig-type">str</span>)</code></pre>

Load a model from a file.

**Parameters:**
- `path`: Path to load the model from.

**Returns:**
Loaded Word2Vec model.

<h4 id="word2vec-load_vectors">qhchina.analytics.word2vec.base.Word2Vec.load_vectors() <a href="#word2vec-load_vectors" class="header-link" title="Permalink">#</a> <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/analytics/word2vec/base.py#L1486" class="source-link" title="View source on GitHub">[source]</a></h4>

<pre class="signature"><code><span class="sig-name">load_vectors</span>(<span class="sig-param">path</span><span class="sig-punct">:</span> <span class="sig-type">str</span>, <span class="sig-param">format</span><span class="sig-punct">:</span> <span class="sig-type">str</span> <span class="sig-punct">=</span> <span class="sig-default">'word2vec'</span>, <span class="sig-param">binary</span><span class="sig-punct">:</span> <span class="sig-type">bool</span> <span class="sig-punct">=</span> <span class="sig-default">True</span>)</code></pre>

Load word vectors from external format.

Creates a Word2Vec model from externally-trained vectors (e.g., from gensim,
original word2vec, or GloVe). The loaded model supports inference operations
(similarity queries, vector access) but lacks output embeddings (W_prime)
and word counts needed for training.

To continue training on a loaded model, call `train()` with a corpus.
Use `update_vocab=True` if you want to add new words; otherwise the
existing vocabulary is preserved. Missing structures (W_prime, word_counts)
are initialized automatically.

**Parameters:**
- `path`: Path to the vectors file.
- `format`: Input format, one of:
  - "word2vec": Google word2vec C format (default). Compatible with
    gensim's ``save_word2vec_format()``.
  - "glove": GloVe text format. No header, space-separated values.
  - "gensim": Gensim's native KeyedVectors format.
- `binary`: For word2vec format only. If True (default), expect binary floats.
  If False, expect text format. Ignored for other formats.

**Returns:**
Word2Vec model with loaded vectors. The model has:
- W: Input embeddings loaded from file
- W_prime: None (not available in external formats)
- word_counts: Empty (not available in external formats)

**Raises:**
- `ValueError`: If format is not recognized or file is malformed.
- `ImportError`: If format="gensim" and gensim is not installed.

**Example:**
```python
# Load word2vec binary format
model = Word2Vec.load_vectors("vectors.bin", format="word2vec", binary=True)

# Load GloVe format
model = Word2Vec.load_vectors("glove.txt", format="glove")

# Use for similarity queries
similar = model.most_similar("king", topn=10)

# Enable training by providing a corpus
model.train(new_sentences, epochs=5, update_vocab=True)
```

<h4 id="word2vec-most_similar">qhchina.analytics.word2vec.base.Word2Vec.most_similar() <a href="#word2vec-most_similar" class="header-link" title="Permalink">#</a> <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/analytics/word2vec/base.py#L1204" class="source-link" title="View source on GitHub">[source]</a></h4>

<pre class="signature"><code><span class="sig-name">most_similar</span>(<span class="sig-param">query</span><span class="sig-punct">:</span> <span class="sig-type">str | numpy.ndarray</span>, <span class="sig-param">topn</span><span class="sig-punct">:</span> <span class="sig-type">int</span> <span class="sig-punct">=</span> <span class="sig-default">10</span>, <span class="sig-param">exclude</span><span class="sig-punct">:</span> <span class="sig-type">list[str] | None</span> <span class="sig-punct">=</span> <span class="sig-default">None</span>, <span class="sig-param">cross_space</span><span class="sig-punct">:</span> <span class="sig-type">bool</span> <span class="sig-punct">=</span> <span class="sig-default">False</span>)</code></pre>

Find the topn most similar words to the given word or vector.

**Parameters:**
- `query`: Input word (string) or vector (numpy array). When a word is
  provided, its vector is looked up. When a vector is provided
  (e.g., from arithmetic operations), it is used directly.
- `topn`: Number of similar words to return.
- `exclude`: List of words to exclude from results. Useful when doing
  vector arithmetic to exclude the input words. When query is a
  word, that word is automatically excluded.
- `cross_space`: If False (default), compare against W (second-order similarity).
  If True, compare against W_prime (first-order similarity based on
  direct co-occurrence patterns).

**Returns:**
List of (word, similarity) tuples sorted by descending similarity.

**Raises:**
- `KeyError`: If query is a word not in vocabulary.
- `ValueError`: If query vector has wrong dimensions.

**Example:**
```python
# Find words similar to a single word
model.most_similar("king", topn=5)

# Vector arithmetic: king - man + woman ≈ queen
vec = model["king"] - model["man"] + model["woman"]
model.most_similar(vec, topn=5, exclude=["king", "man", "woman"])
```

<h4 id="word2vec-save">qhchina.analytics.word2vec.base.Word2Vec.save() <a href="#word2vec-save" class="header-link" title="Permalink">#</a> <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/analytics/word2vec/base.py#L1314" class="source-link" title="View source on GitHub">[source]</a></h4>

<pre class="signature"><code><span class="sig-name">save</span>(<span class="sig-param">path</span><span class="sig-punct">:</span> <span class="sig-type">str</span>)</code></pre>

Save the model to a file.

Saves all model parameters, vocabulary, and trained vectors. Training-specific
parameters (alpha, min_alpha, epochs, etc.) are not saved as they are only
needed during training, not inference.

**Parameters:**
- `path`: Path to save the model.

<h4 id="word2vec-similarity">qhchina.analytics.word2vec.base.Word2Vec.similarity() <a href="#word2vec-similarity" class="header-link" title="Permalink">#</a> <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/analytics/word2vec/base.py#L1279" class="source-link" title="View source on GitHub">[source]</a></h4>

<pre class="signature"><code><span class="sig-name">similarity</span>(<span class="sig-param">word1</span><span class="sig-punct">:</span> <span class="sig-type">str</span>, <span class="sig-param">word2</span><span class="sig-punct">:</span> <span class="sig-type">str</span>, <span class="sig-param">cross_space</span><span class="sig-punct">:</span> <span class="sig-type">bool</span> <span class="sig-punct">=</span> <span class="sig-default">False</span>)</code></pre>

Calculate cosine similarity between two words.

**Parameters:**
- `word1`: First word (always from W).
- `word2`: Second word (from W or W_prime depending on cross_space).
- `cross_space`: If False (default), compare W[word1] vs W[word2].
  If True, compare W[word1] vs W_prime[word2].

**Returns:**
Cosine similarity between the two words (float between -1 and 1).

**Raises:**
- `KeyError`: If either word is not in the vocabulary.

<h4 id="word2vec-train">qhchina.analytics.word2vec.base.Word2Vec.train() <a href="#word2vec-train" class="header-link" title="Permalink">#</a> <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/analytics/word2vec/base.py#L913" class="source-link" title="View source on GitHub">[source]</a></h4>

<pre class="signature"><code><span class="sig-name">train</span>(<span class="sig-param">sentences</span><span class="sig-punct">:</span> <span class="sig-type">Iterable[list[str]] | None</span> <span class="sig-punct">=</span> <span class="sig-default">None</span>, <span class="sig-param">epochs</span><span class="sig-punct">:</span> <span class="sig-type">int | None</span> <span class="sig-punct">=</span> <span class="sig-default">None</span>, <span class="sig-param">update_vocab</span><span class="sig-punct">:</span> <span class="sig-type">bool</span> <span class="sig-punct">=</span> <span class="sig-default">False</span>, <span class="sig-param">reset_lr</span><span class="sig-punct">:</span> <span class="sig-type">bool</span> <span class="sig-punct">=</span> <span class="sig-default">True</span>)</code></pre>

Train word2vec model on sentences.

Processes sentences in batches using Cython-accelerated training.
This approach is memory-efficient and works with both lists and iterables.

This method supports incremental training: call it multiple times with
new data and `update_vocab=True` to expand the vocabulary and continue
training.

**Parameters:**
- `sentences`: Iterable of tokenized sentences. If None, uses sentences
  provided at initialization.
- `epochs`: Number of training epochs. If None, uses epochs from initialization.
- `update_vocab`: If True, expand vocabulary with new words from sentences.
  New words are initialized using the mean of existing embeddings
  (Hewitt 2021) to preserve the pretrained distribution. Only
  effective when the model already has a vocabulary.
- `reset_lr`: If True (default), reset learning rate to ``_initial_alpha``
  for this training run. If False, continue from current ``alpha``
  (useful for true continuation of a training run).

**Returns:**
Final loss value if calculate_loss is True, None otherwise.

**Raises:**
- `ValueError`: If no sentences are available (neither passed nor at init).

**Example:**
```python
# Initial training
model = Word2Vec(sentences, epochs=5)
model.train()

# Continue training on same data
model.train(epochs=3, reset_lr=False)

# Incremental training with new data
model.train(new_sentences, epochs=5, update_vocab=True)
```

<br>

<h3 id="temprefword2vec">qhchina.analytics.word2vec.tempref.TempRefWord2Vec <a href="#temprefword2vec" class="header-link" title="Permalink">#</a> <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/analytics/word2vec/tempref.py#L127" class="source-link" title="View source on GitHub">[source]</a></h3>

<pre class="signature"><code><span class="sig-name">TempRefWord2Vec</span>(
    <span class="sig-param">sentences</span><span class="sig-punct">:</span> <span class="sig-type">dict[str, Iterable[list[str]]]</span>,
    <span class="sig-param">targets</span><span class="sig-punct">:</span> <span class="sig-type">list[str]</span>,
    <span class="sig-param">sampling_strategy</span><span class="sig-punct">:</span> <span class="sig-type">str</span> <span class="sig-punct">=</span> <span class="sig-default">'balanced'</span>,
    <span class="sig-param">_skip_init</span><span class="sig-punct">:</span> <span class="sig-type">bool</span> <span class="sig-punct">=</span> <span class="sig-default">False</span>,
    <span class="sig-param">**kwargs</span>
)</code></pre>

Word2Vec with Temporal Referencing (TR) for tracking semantic change.

Implements temporal referencing where target words are tagged with time period
indicators (e.g., "bread_1800s"). During training:

- Temporal variants (e.g., "bread_1800s") are used as CENTER words in syn0 (W)
- Base forms (e.g., "bread") are used as CONTEXT words in syn1neg (W_prime)
- Negative samples are drawn from base forms only

This design places temporal variant embeddings in W, making them directly
comparable with each other and with regular words for semantic change analysis.

There are two ways to train the model:
1. Balanced batch sampling (default) - each batch contains equal numbers of
   tokens from each time period, ensuring fair representation regardless of
   corpus sizes.
2. Proportional batch sampling - each batch contains a proportion of
   tokens from each time period; uses all data.

Note:
    - Only supports Skip-gram (sg=1). CBOW is not supported.
    - Corpora must be UNTAGGED. Tagging is done automatically during training.
    - Training does not start automatically. Call `train()` explicitly after
      initialization.

Interpreting Results:
    `most_similar()` on temporal variants (e.g., "民_宋") might return
    suboptimal results given that temporal variants are only trained on period-specificsubsets of data.
    Use `calculate_semantic_change()` instead, which compares similarity shifts
    across periods to reveal genuine semantic drift.

**Parameters:**
- `sentences`: Dictionary mapping time period labels to corpora. Each value must
  be an iterable of tokenized sentences.
  Format: ``{"label1": [["w1", "w2"], ...], "label2": LineSentenceFile("song.txt"), ...}``
- `targets`: List of target words to trace semantic change.
- `sampling_strategy`: How to sample from corpora during training:
  - "balanced" (default): Equal tokens from each corpus, stops at smallest corpus.
  - "proportional": Proportional tokens from each corpus, uses all data.
- `**kwargs`: Arguments passed to Word2Vec. Common options:
  - vector_size (int): Dimensionality of word vectors (default: 100)
  - window (int): Context window size (default: 5)
  - min_word_count (int): Minimum word frequency (default: 5)
  - negative (int): Negative samples (default: 5)
  - epochs (int): Training epochs (required)
  - batch_size (int): Tokens per batch (default: 10240)
  - alpha (float): Initial learning rate (default: 0.025)
  - verbose (bool): Log progress (default: False)
  
  Note: sg must be 1 (Skip-gram).

**Example:**
```python
# Using in-memory sentences:
from qhchina.analytics import TempRefWord2Vec

# Tokenized sentences from 宋史 and 明史 (untagged)
song_sentences = [["太祖", "建隆", "元年", "正月"], ["民", "安", "其", "业"]]
ming_sentences = [["太祖", "洪武", "元年", "春"], ["民", "困", "于", "役"]]

model = TempRefWord2Vec(
    sentences={"宋": song_sentences, "明": ming_sentences},
    targets=["民", "太祖"],
    vector_size=100,
    sg=1
)
model.train()

# Streaming from text files:
from qhchina.analytics import TempRefWord2Vec, LineSentenceFile

model = TempRefWord2Vec(
    sentences={
        "宋": LineSentenceFile("songshi.txt"),
        "明": LineSentenceFile("mingshi.txt"),
    },
    targets=["民", "太祖"],
    vector_size=100,
    sg=1
)
model.train()

# Analyze semantic change
changes = model.calculate_semantic_change("民")

# most_similar on temporal variants is available, however each variant
# has been only trained on a period-specific subset of data
model.most_similar("民_宋")
model.most_similar("民_明")
```

<h4 id="temprefword2vec-build_vocab">qhchina.analytics.word2vec.tempref.TempRefWord2Vec.build_vocab() <a href="#temprefword2vec-build_vocab" class="header-link" title="Permalink">#</a> <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/analytics/word2vec/tempref.py#L327" class="source-link" title="View source on GitHub">[source]</a></h4>

<pre class="signature"><code><span class="sig-name">build_vocab</span>(<span class="sig-param">sentences</span><span class="sig-punct">:</span> <span class="sig-type">Iterable[list[str]] | None</span> <span class="sig-punct">=</span> <span class="sig-default">None</span>)</code></pre>

Build vocabulary by iterating through corpora.

This override builds both period_vocab_counts and the main vocabulary
in a single pass through the corpora, then adds temporal base words.

**Parameters:**
- `sentences`: Ignored. TempRefWord2Vec uses internal corpora instead.
  Accepted for API compatibility with the parent class.

<h4 id="temprefword2vec-calculate_semantic_change">qhchina.analytics.word2vec.tempref.TempRefWord2Vec.calculate_semantic_change() <a href="#temprefword2vec-calculate_semantic_change" class="header-link" title="Permalink">#</a> <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/analytics/word2vec/tempref.py#L645" class="source-link" title="View source on GitHub">[source]</a></h4>

<pre class="signature"><code><span class="sig-name">calculate_semantic_change</span>(<span class="sig-param">word</span><span class="sig-punct">:</span> <span class="sig-type">str</span>, <span class="sig-param">filters</span><span class="sig-punct">:</span> <span class="sig-type">dict | None</span> <span class="sig-punct">=</span> <span class="sig-default">None</span>)</code></pre>

Calculate semantic change by comparing cosine similarities across time periods.

This is the recommended way to analyze temporal embeddings. It compares
cosine similarity shifts for `word` across every adjacent pair of
periods stored in the model (in the order they were provided at initialisation).

**Parameters:**
- `word`: Target word to analyze (must be one of the targets specified
  during initialization).
- `filters`: Optional dict to restrict which reference words are considered.
  Supported keys:
  
  - ``min_word_count`` (int or tuple): Minimum number of occurrences a
    word must have in **each** period to be included. Pass an int to use
    the same threshold for every period, or a tuple whose length equals
    the number of time slices to set per-period thresholds.
  - ``min_word_length`` (int): Minimum character length of a word.
  - ``stopwords`` (set): Words to exclude from the reference set.
  - ``reference_words`` (list/set): Explicit whitelist of reference words.
  - ``vocab_top_n`` (int): Only consider the union of the top-N most
    frequent words from each period's corpus.

**Returns:**
Dict mapping transition names (e.g. ``"宋_to_明"``) to lists of
``(word, change)`` tuples sorted by descending change score.

**Example:**
```python
changes = model.calculate_semantic_change(
    "人民",
    filters={"vocab_top_n": 5000, "min_word_length": 2},
)
for transition, word_changes in changes.items():
    print(f"{transition}:")
    print("Words moved towards:", word_changes[:5])
    print("Words moved away:", word_changes[-5:])
```

<h4 id="temprefword2vec-export">qhchina.analytics.word2vec.tempref.TempRefWord2Vec.export() <a href="#temprefword2vec-export" class="header-link" title="Permalink">#</a> <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/analytics/word2vec/tempref.py#L945" class="source-link" title="View source on GitHub">[source]</a></h4>

<pre class="signature"><code><span class="sig-name">export</span>(<span class="sig-param">path</span><span class="sig-punct">:</span> <span class="sig-type">str</span>, <span class="sig-param">format</span><span class="sig-punct">:</span> <span class="sig-type">str</span> <span class="sig-punct">=</span> <span class="sig-default">'word2vec'</span>, <span class="sig-param">binary</span><span class="sig-punct">:</span> <span class="sig-type">bool</span> <span class="sig-punct">=</span> <span class="sig-default">True</span>)</code></pre>

Export is not supported for TempRefWord2Vec.

TempRefWord2Vec contains temporal metadata (period labels, target words,
temporal word mappings) that cannot be preserved in standard vector formats.

Use `save()` and `load()` instead to preserve all model data.

**Raises:**
- `NotImplementedError`: Always raised.

<h4 id="temprefword2vec-get_available_targets">qhchina.analytics.word2vec.tempref.TempRefWord2Vec.get_available_targets() <a href="#temprefword2vec-get_available_targets" class="header-link" title="Permalink">#</a> <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/analytics/word2vec/tempref.py#L749" class="source-link" title="View source on GitHub">[source]</a></h4>

<pre class="signature"><code><span class="sig-name">get_available_targets</span>()</code></pre>

Get the list of target words available for semantic change analysis.

**Returns:**
List of target words that were specified during model initialization.

<h4 id="temprefword2vec-get_period_vocab_counts">qhchina.analytics.word2vec.tempref.TempRefWord2Vec.get_period_vocab_counts() <a href="#temprefword2vec-get_period_vocab_counts" class="header-link" title="Permalink">#</a> <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/analytics/word2vec/tempref.py#L767" class="source-link" title="View source on GitHub">[source]</a></h4>

<pre class="signature"><code><span class="sig-name">get_period_vocab_counts</span>(<span class="sig-param">period</span><span class="sig-punct">:</span> <span class="sig-type">str | None</span> <span class="sig-punct">=</span> <span class="sig-default">None</span>)</code></pre>

Get vocabulary counts for a specific period or all periods.

**Parameters:**
- `period`: The period label to get vocab counts for. If None, returns all periods.

**Returns:**
If period is None: dictionary mapping period labels to Counter objects.
If period is specified: Counter object for that specific period.

**Raises:**
- `ValueError`: If the specified period is not found in the model.

<h4 id="temprefword2vec-get_time_labels">qhchina.analytics.word2vec.tempref.TempRefWord2Vec.get_time_labels() <a href="#temprefword2vec-get_time_labels" class="header-link" title="Permalink">#</a> <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/analytics/word2vec/tempref.py#L758" class="source-link" title="View source on GitHub">[source]</a></h4>

<pre class="signature"><code><span class="sig-name">get_time_labels</span>()</code></pre>

Get the list of time period labels used in the model.

**Returns:**
List of time period labels that were specified during model initialization.

<h4 id="temprefword2vec-load">qhchina.analytics.word2vec.tempref.TempRefWord2Vec.load() <a href="#temprefword2vec-load" class="header-link" title="Permalink">#</a> <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/analytics/word2vec/tempref.py#L850" class="source-link" title="View source on GitHub">[source]</a></h4>

<pre class="signature"><code><span class="sig-name">load</span>(<span class="sig-param">path</span><span class="sig-punct">:</span> <span class="sig-type">str</span>)</code></pre>

Load a TempRefWord2Vec model from a file.

This overrides the parent load method to also restore:
- Period-specific vocabulary counts
- Target words and labels  
- Temporal word mappings

**Parameters:**
- `path` (str): Path to load the model from.

**Returns:**
(TempRefWord2Vec) Loaded TempRefWord2Vec model with all temporal metadata 
restored.

**Raises:**
- `ValueError`: If the file doesn't contain TempRefWord2Vec data.

<h4 id="temprefword2vec-load_vectors">qhchina.analytics.word2vec.tempref.TempRefWord2Vec.load_vectors() <a href="#temprefword2vec-load_vectors" class="header-link" title="Permalink">#</a> <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/analytics/word2vec/tempref.py#L963" class="source-link" title="View source on GitHub">[source]</a></h4>

<pre class="signature"><code><span class="sig-name">load_vectors</span>(<span class="sig-param">path</span><span class="sig-punct">:</span> <span class="sig-type">str</span>, <span class="sig-param">format</span><span class="sig-punct">:</span> <span class="sig-type">str</span> <span class="sig-punct">=</span> <span class="sig-default">'word2vec'</span>, <span class="sig-param">binary</span><span class="sig-punct">:</span> <span class="sig-type">bool</span> <span class="sig-punct">=</span> <span class="sig-default">True</span>)</code></pre>

load_vectors() is not supported for TempRefWord2Vec.

External vector formats don't contain the temporal metadata required
for TempRefWord2Vec (period labels, target words, temporal mappings).

Use `TempRefWord2Vec.load()` to load a saved TempRefWord2Vec model.

**Raises:**
- `NotImplementedError`: Always raised.

<h4 id="temprefword2vec-save">qhchina.analytics.word2vec.tempref.TempRefWord2Vec.save() <a href="#temprefword2vec-save" class="header-link" title="Permalink">#</a> <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/analytics/word2vec/tempref.py#L789" class="source-link" title="View source on GitHub">[source]</a></h4>

<pre class="signature"><code><span class="sig-name">save</span>(<span class="sig-param">path</span><span class="sig-punct">:</span> <span class="sig-type">str</span>)</code></pre>

Save the TempRefWord2Vec model to a file, including vocab counts and temporal metadata.

This overrides the parent save method to also save:
- Period-specific vocabulary counts
- Target words and labels  
- Temporal word mappings
- All other model parameters from the parent class

Note: The combined corpus is NOT saved to reduce file size.

**Parameters:**
- `path` (str): Path to save the model file.

<h4 id="temprefword2vec-train">qhchina.analytics.word2vec.tempref.TempRefWord2Vec.train() <a href="#temprefword2vec-train" class="header-link" title="Permalink">#</a> <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/analytics/word2vec/tempref.py#L611" class="source-link" title="View source on GitHub">[source]</a></h4>

<pre class="signature"><code><span class="sig-name">train</span>()</code></pre>

Train the TempRefWord2Vec model.

Uses balanced batch sampling from corpora. Each batch contains
equal numbers of tokens from each time period, shuffled together.
Target words are automatically tagged with their corpus label during training.

All training configuration (epochs, batch_size, alpha, min_alpha, etc.) is read
from instance attributes set during initialization via `**kwargs`.

**Returns:**
Final loss value if calculate_loss is True, None otherwise.

<br>

<h3 id="dynamicword2vec">qhchina.analytics.word2vec.dynamic.DynamicWord2Vec <a href="#dynamicword2vec" class="header-link" title="Permalink">#</a> <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/analytics/word2vec/dynamic.py#L83" class="source-link" title="View source on GitHub">[source]</a></h3>

<pre class="signature"><code><span class="sig-name">DynamicWord2Vec</span>(
    <span class="sig-param">sentences</span><span class="sig-punct">:</span> <span class="sig-type">dict[str, Iterable[list[str]]]</span>,
    <span class="sig-param">training_mode</span><span class="sig-punct">:</span> <span class="sig-type">str</span> <span class="sig-punct">=</span> <span class="sig-default">'joint'</span>,
    <span class="sig-param">temporal_lambda</span><span class="sig-punct">:</span> <span class="sig-type">float</span> <span class="sig-punct">=</span> <span class="sig-default">0.1</span>,
    <span class="sig-param">temporal_reg_V</span><span class="sig-punct">:</span> <span class="sig-type">bool</span> <span class="sig-punct">=</span> <span class="sig-default">True</span>,
    <span class="sig-param">procrustes_align</span><span class="sig-punct">:</span> <span class="sig-type">bool</span> <span class="sig-punct">=</span> <span class="sig-default">True</span>,
    <span class="sig-param">sampling_strategy</span><span class="sig-punct">:</span> <span class="sig-type">str</span> <span class="sig-punct">=</span> <span class="sig-default">'balanced'</span>,
    <span class="sig-param">_skip_init</span><span class="sig-punct">:</span> <span class="sig-type">bool</span> <span class="sig-punct">=</span> <span class="sig-default">False</span>,
    <span class="sig-param">**kwargs</span>
)</code></pre>

Word2Vec with time-sliced embeddings for diachronic semantic analysis.

Maintains separate embedding matrices $U^{(t)}$ and $V^{(t)}$
for each time slice *t* with a shared vocabulary.  Two training modes are
available:

- **joint** (default): All periods train simultaneously with interleaved
  batches.  Temporal ℓ₂ regularization pulls adjacent slices together
  (see below).  Optional Procrustes alignment after training removes
  residual rotational drift between slices.
- **sequential**: Each period is trained in order, initialising from the
  previous period's trained embeddings (Kim et al. 2014).  Alignment is
  implicit via the initialisation chain; no regularisation or Procrustes
  is needed.

**Temporal regularization (joint mode):**
The standard skip-gram loss is augmented with an ℓ₂ penalty that
encourages embeddings in adjacent time slices to stay close:

$$\mathcal{L} = \mathcal{L}_{\text{SG}} + \lambda \sum_{t=1}^{T-1} \| U^{(t)} - U^{(t-1)} \|_F^2$$

where $\mathcal{L}_{\text{SG}}$ is the skip-gram negative sampling
objective, $\lambda$ is `temporal_lambda`, and $\| \cdot \|_F$
is the Frobenius norm.  When `temporal_reg_V=True`, the same penalty
is applied to the context matrix $V$.  Regularization is applied once
per unique (word, time) pair per batch to avoid frequency-dependent
regularization strength.

**Architecture:**
- U: Center/input embeddings [T, vocab_size, vector_size]
- V: Context/output embeddings [T, vocab_size, vector_size]
- Shared vocabulary across all time slices

**Parameters:**
- `sentences`: Dictionary mapping time period labels to corpora. Each value must
  be an iterable of tokenized sentences (untagged).
  Format: ``{"label1": [["w1", "w2"], ...], "label2": LineSentenceFile("file.txt"), ...}``
- `training_mode`: ``"joint"`` (default) or ``"sequential"``.
- `temporal_lambda`: Regularization strength for joint mode (default: 0.1).
- `temporal_reg_V`: If True, also regularize V in joint mode (default: True).
- `procrustes_align`: Apply Procrustes alignment after joint training
  (default: True).  Ignored in sequential mode.
- `sampling_strategy`: How to sample from corpora during training:
  - "balanced" (default): Equal tokens from each corpus, stops at smallest corpus.
  - "proportional": Proportional tokens from each corpus, uses all data.
- `**kwargs`: Arguments passed to Word2Vec (vector_size, window, epochs, etc.).

**Example:**
```python
from qhchina.analytics import DynamicWord2Vec, LineSentenceFile

corpora = {
    "1800s": LineSentenceFile("corpus_1800s.txt"),
    "1900s": LineSentenceFile("corpus_1900s.txt"),
    "2000s": LineSentenceFile("corpus_2000s.txt"),
}

# Joint training with Procrustes alignment
model = DynamicWord2Vec(
    sentences=corpora,
    training_mode="joint",
    temporal_lambda=0.1,
    vector_size=100,
    window=5,
    epochs=5,
)
model.train()

# Query embeddings per period
vec = model.get_vector("economy", time_label="2000s")
drift = model.calculate_temporal_drift("economy")

# Sequential training (Kim et al. 2014)
model = DynamicWord2Vec(
    sentences=corpora,
    training_mode="sequential",
    epochs=5,
)
model.train()
```

<h4 id="dynamicword2vec-build_vocab">qhchina.analytics.word2vec.dynamic.DynamicWord2Vec.build_vocab() <a href="#dynamicword2vec-build_vocab" class="header-link" title="Permalink">#</a> <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/analytics/word2vec/dynamic.py#L258" class="source-link" title="View source on GitHub">[source]</a></h4>

<pre class="signature"><code><span class="sig-name">build_vocab</span>(<span class="sig-param">sentences</span><span class="sig-punct">:</span> <span class="sig-type">Iterable[list[str]] | None</span> <span class="sig-punct">=</span> <span class="sig-default">None</span>)</code></pre>

Build vocabulary by iterating through all corpora.

Creates a shared vocabulary across all time slices. Word counts are computed
respecting the sampling strategy to match training data distribution.

**Parameters:**
- `sentences`: Ignored. DynamicWord2Vec uses internal corpora instead.
  Accepted for API compatibility with the parent class.

<h4 id="dynamicword2vec-calculate_semantic_change">qhchina.analytics.word2vec.dynamic.DynamicWord2Vec.calculate_semantic_change() <a href="#dynamicword2vec-calculate_semantic_change" class="header-link" title="Permalink">#</a> <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/analytics/word2vec/dynamic.py#L787" class="source-link" title="View source on GitHub">[source]</a></h4>

<pre class="signature"><code><span class="sig-name">calculate_semantic_change</span>(<span class="sig-param">word</span><span class="sig-punct">:</span> <span class="sig-type">str</span>, <span class="sig-param">filters</span><span class="sig-punct">:</span> <span class="sig-type">dict | None</span> <span class="sig-punct">=</span> <span class="sig-default">None</span>)</code></pre>

Calculate semantic change by comparing similarity shifts across time periods.

For each transition (t -> t+1), computes how the target word's similarity
to other words changes. Positive values indicate words that became more
similar, negative values indicate words that became less similar.

Frequency-based filters (`vocab_top_n`, `min_word_count`) are applied
**per transition** using only the two adjacent periods, so that only words
with meaningful training signal in both slices are compared.

**Parameters:**
- `word`: Target word to analyze.
- `filters`: Optional dict to restrict which reference words are considered.
  Supported keys:
  
  - ``vocab_top_n`` (int): For each transition, take the top-N most
    frequent words from each of the two adjacent periods and use
    their union (at most 2N words per transition).
  - ``min_word_count`` (int): Minimum occurrences a word must have
    in **both** adjacent periods to be included in that transition.
  - ``min_word_length`` (int): Minimum character length of a word.
  - ``stopwords`` (set): Words to exclude from the reference set.
  - ``reference_words`` (list/set): Explicit whitelist of reference words.

**Returns:**
Dict mapping transition names (e.g., "宋_to_明") to lists of
(word, change) tuples sorted by descending change score.

**Raises:**
- `KeyError`: If word is not in vocabulary.

**Example:**
```python
changes = model.calculate_semantic_change(
    "民",
    filters={"vocab_top_n": 500, "min_word_length": 2},
)
```

<h4 id="dynamicword2vec-calculate_temporal_drift">qhchina.analytics.word2vec.dynamic.DynamicWord2Vec.calculate_temporal_drift() <a href="#dynamicword2vec-calculate_temporal_drift" class="header-link" title="Permalink">#</a> <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/analytics/word2vec/dynamic.py#L753" class="source-link" title="View source on GitHub">[source]</a></h4>

<pre class="signature"><code><span class="sig-name">calculate_temporal_drift</span>(<span class="sig-param">word</span><span class="sig-punct">:</span> <span class="sig-type">str</span>)</code></pre>

Calculate temporal drift as cosine distances between adjacent time slices.

**Parameters:**
- `word`: Input word.

**Returns:**
Array of shape [T-1] where element i is the cosine distance between
the word's embedding at time i and time i+1.

**Raises:**
- `KeyError`: If word is not in vocabulary.

<h4 id="dynamicword2vec-export">qhchina.analytics.word2vec.dynamic.DynamicWord2Vec.export() <a href="#dynamicword2vec-export" class="header-link" title="Permalink">#</a> <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/analytics/word2vec/dynamic.py#L1049" class="source-link" title="View source on GitHub">[source]</a></h4>

<pre class="signature"><code><span class="sig-name">export</span>(<span class="sig-param">path</span><span class="sig-punct">:</span> <span class="sig-type">str</span>, <span class="sig-param">format</span><span class="sig-punct">:</span> <span class="sig-type">str</span> <span class="sig-punct">=</span> <span class="sig-default">'word2vec'</span>, <span class="sig-param">binary</span><span class="sig-punct">:</span> <span class="sig-type">bool</span> <span class="sig-punct">=</span> <span class="sig-default">True</span>)</code></pre>

Export is not supported for DynamicWord2Vec.

DynamicWord2Vec contains 3D embedding tensors (U[T, vocab, dim]) and temporal
metadata that cannot be preserved in standard 2D vector formats.

Use `save()` and `load()` instead to preserve all model data.

**Raises:**
- `NotImplementedError`: Always raised.

<h4 id="dynamicword2vec-get_all_time_vectors">qhchina.analytics.word2vec.dynamic.DynamicWord2Vec.get_all_time_vectors() <a href="#dynamicword2vec-get_all_time_vectors" class="header-link" title="Permalink">#</a> <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/analytics/word2vec/dynamic.py#L679" class="source-link" title="View source on GitHub">[source]</a></h4>

<pre class="signature"><code><span class="sig-name">get_all_time_vectors</span>(<span class="sig-param">word</span><span class="sig-punct">:</span> <span class="sig-type">str</span>, <span class="sig-param">normalize</span><span class="sig-punct">:</span> <span class="sig-type">bool</span> <span class="sig-punct">=</span> <span class="sig-default">False</span>)</code></pre>

Get vectors for a word across all time periods.

**Parameters:**
- `word`: Input word.
- `normalize`: If True, normalize each vector independently.

**Returns:**
Array of shape [T, vector_size] containing the word's embedding
at each time slice.

**Raises:**
- `KeyError`: If word is not in vocabulary.

<h4 id="dynamicword2vec-get_time_labels">qhchina.analytics.word2vec.dynamic.DynamicWord2Vec.get_time_labels() <a href="#dynamicword2vec-get_time_labels" class="header-link" title="Permalink">#</a> <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/analytics/word2vec/dynamic.py#L899" class="source-link" title="View source on GitHub">[source]</a></h4>

<pre class="signature"><code><span class="sig-name">get_time_labels</span>()</code></pre>

Get the list of time period labels.

**Returns:**
List of time period labels in temporal order.

<h4 id="dynamicword2vec-get_vector">qhchina.analytics.word2vec.dynamic.DynamicWord2Vec.get_vector() <a href="#dynamicword2vec-get_vector" class="header-link" title="Permalink">#</a> <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/analytics/word2vec/dynamic.py#L608" class="source-link" title="View source on GitHub">[source]</a></h4>

<pre class="signature"><code><span class="sig-name">get_vector</span>(<span class="sig-param">word</span><span class="sig-punct">:</span> <span class="sig-type">str</span>, <span class="sig-param">time_label</span><span class="sig-punct">:</span> <span class="sig-type">str</span>, <span class="sig-param">normalize</span><span class="sig-punct">:</span> <span class="sig-type">bool</span> <span class="sig-punct">=</span> <span class="sig-default">False</span>)</code></pre>

Get the vector for a word at a specific time period.

**Parameters:**
- `word`: Input word.
- `time_label`: Time period label (must be one of the labels from initialization).
- `normalize`: If True, return the normalized vector (unit length).

**Returns:**
Word vector as numpy array of shape (vector_size,).

**Raises:**
- `KeyError`: If word is not in vocabulary or time_label is invalid.

<h4 id="dynamicword2vec-load">qhchina.analytics.word2vec.dynamic.DynamicWord2Vec.load() <a href="#dynamicword2vec-load" class="header-link" title="Permalink">#</a> <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/analytics/word2vec/dynamic.py#L960" class="source-link" title="View source on GitHub">[source]</a></h4>

<pre class="signature"><code><span class="sig-name">load</span>(<span class="sig-param">path</span><span class="sig-punct">:</span> <span class="sig-type">str</span>)</code></pre>

Load a DynamicWord2Vec model from a file.

**Parameters:**
- `path`: Path to load the model from.

**Returns:**
Loaded DynamicWord2Vec model.

**Raises:**
- `ValueError`: If the file doesn't contain DynamicWord2Vec data.

<h4 id="dynamicword2vec-load_vectors">qhchina.analytics.word2vec.dynamic.DynamicWord2Vec.load_vectors() <a href="#dynamicword2vec-load_vectors" class="header-link" title="Permalink">#</a> <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/analytics/word2vec/dynamic.py#L1067" class="source-link" title="View source on GitHub">[source]</a></h4>

<pre class="signature"><code><span class="sig-name">load_vectors</span>(<span class="sig-param">path</span><span class="sig-punct">:</span> <span class="sig-type">str</span>, <span class="sig-param">format</span><span class="sig-punct">:</span> <span class="sig-type">str</span> <span class="sig-punct">=</span> <span class="sig-default">'word2vec'</span>, <span class="sig-param">binary</span><span class="sig-punct">:</span> <span class="sig-type">bool</span> <span class="sig-punct">=</span> <span class="sig-default">True</span>)</code></pre>

load_vectors() is not supported for DynamicWord2Vec.

External vector formats contain 2D embeddings, but DynamicWord2Vec requires
3D tensors (one embedding matrix per time slice) and temporal metadata.

Use `DynamicWord2Vec.load()` to load a saved DynamicWord2Vec model.

**Raises:**
- `NotImplementedError`: Always raised.

<h4 id="dynamicword2vec-most_similar">qhchina.analytics.word2vec.dynamic.DynamicWord2Vec.most_similar() <a href="#dynamicword2vec-most_similar" class="header-link" title="Permalink">#</a> <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/analytics/word2vec/dynamic.py#L707" class="source-link" title="View source on GitHub">[source]</a></h4>

<pre class="signature"><code><span class="sig-name">most_similar</span>(<span class="sig-param">word</span><span class="sig-punct">:</span> <span class="sig-type">str</span>, <span class="sig-param">time_label</span><span class="sig-punct">:</span> <span class="sig-type">str</span>, <span class="sig-param">topn</span><span class="sig-punct">:</span> <span class="sig-type">int</span> <span class="sig-punct">=</span> <span class="sig-default">10</span>, <span class="sig-param">cross_space</span><span class="sig-punct">:</span> <span class="sig-type">bool</span> <span class="sig-punct">=</span> <span class="sig-default">False</span>)</code></pre>

Find the topn most similar words to the given word at a specific time period.

**Parameters:**
- `word`: Input word.
- `time_label`: Time period label.
- `topn`: Number of similar words to return.
- `cross_space`: If False (default), compare U vs U (second-order similarity).
  If True, compare U vs V (first-order similarity).

**Returns:**
List of (word, similarity) tuples sorted by descending similarity.

**Raises:**
- `KeyError`: If word is not in vocabulary or time_label is invalid.

<h4 id="dynamicword2vec-save">qhchina.analytics.word2vec.dynamic.DynamicWord2Vec.save() <a href="#dynamicword2vec-save" class="header-link" title="Permalink">#</a> <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/analytics/word2vec/dynamic.py#L908" class="source-link" title="View source on GitHub">[source]</a></h4>

<pre class="signature"><code><span class="sig-name">save</span>(<span class="sig-param">path</span><span class="sig-punct">:</span> <span class="sig-type">str</span>)</code></pre>

Save the DynamicWord2Vec model to a file.

Saves all temporal embeddings, labels, and configuration parameters.

**Parameters:**
- `path`: Path to save the model.

<h4 id="dynamicword2vec-similarity">qhchina.analytics.word2vec.dynamic.DynamicWord2Vec.similarity() <a href="#dynamicword2vec-similarity" class="header-link" title="Permalink">#</a> <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/analytics/word2vec/dynamic.py#L655" class="source-link" title="View source on GitHub">[source]</a></h4>

<pre class="signature"><code><span class="sig-name">similarity</span>(<span class="sig-param">word1</span><span class="sig-punct">:</span> <span class="sig-type">str</span>, <span class="sig-param">word2</span><span class="sig-punct">:</span> <span class="sig-type">str</span>, <span class="sig-param">time_label</span><span class="sig-punct">:</span> <span class="sig-type">str</span>, <span class="sig-param">cross_space</span><span class="sig-punct">:</span> <span class="sig-type">bool</span> <span class="sig-punct">=</span> <span class="sig-default">False</span>)</code></pre>

Calculate similarity within one explicitly selected time slice.

<h4 id="dynamicword2vec-train">qhchina.analytics.word2vec.dynamic.DynamicWord2Vec.train() <a href="#dynamicword2vec-train" class="header-link" title="Permalink">#</a> <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/analytics/word2vec/dynamic.py#L459" class="source-link" title="View source on GitHub">[source]</a></h4>

<pre class="signature"><code><span class="sig-name">train</span>()</code></pre>

Train the DynamicWord2Vec model.

Dispatches to joint or sequential training based on `training_mode`.

**Returns:**
Final loss value if calculate_loss is True, None otherwise.

<br>

<h3 id="balancedsentenceiterator">qhchina.analytics.word2vec.utils.BalancedSentenceIterator <a href="#balancedsentenceiterator" class="header-link" title="Permalink">#</a> <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/analytics/word2vec/utils.py#L224" class="source-link" title="View source on GitHub">[source]</a></h3>

<pre class="signature"><code><span class="sig-name">BalancedSentenceIterator</span>(
    <span class="sig-param">corpora</span><span class="sig-punct">:</span> <span class="sig-type">dict[str, Iterable[list[str]]]</span>,
    <span class="sig-param">token_budget</span><span class="sig-punct">:</span> <span class="sig-type">int</span>,
    <span class="sig-param">targets</span><span class="sig-punct">:</span> <span class="sig-type">set[str] | None</span> <span class="sig-punct">=</span> <span class="sig-default">None</span>,
    <span class="sig-param">seed</span><span class="sig-punct">:</span> <span class="sig-type">int | None</span> <span class="sig-punct">=</span> <span class="sig-default">None</span>,
    <span class="sig-param">strategy</span><span class="sig-punct">:</span> <span class="sig-type">str</span> <span class="sig-punct">=</span> <span class="sig-default">'balanced'</span>
)</code></pre>

Iterator that streams sentences from multiple corpus sources with configurable sampling.

Used by TempRefWord2Vec for training. Collects sentences from each corpus 
until a token budget is reached, shuffles them, then yields the sentences.

When `targets` is provided, target words are automatically tagged with their
corpus label (e.g., "民" from corpus "宋" becomes "民_宋").

**Parameters:**
- `corpora`: Dictionary mapping labels to sentence iterables (LineSentenceFile 
  or list[list[str]]).
- `token_budget`: Target number of tokens to collect before yielding.
- `targets`: Set of target words to tag with corpus labels.
- `seed`: Random seed for reproducible sentence shuffling.
- `strategy`: Sampling strategy - "balanced" or "proportional".
  - "balanced": Each corpus contributes equal tokens (stops at smallest corpus).
  - "proportional": Each corpus contributes proportionally to its size (uses all data).
- `token_counts`: Dictionary mapping labels to token counts for each corpus.

<h4 id="balancedsentenceiterator-reset">qhchina.analytics.word2vec.utils.BalancedSentenceIterator.reset() <a href="#balancedsentenceiterator-reset" class="header-link" title="Permalink">#</a> <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/analytics/word2vec/utils.py#L282" class="source-link" title="View source on GitHub">[source]</a></h4>

<pre class="signature"><code><span class="sig-name">reset</span>()</code></pre>

Reset epoch counter to 0 for reproducible iteration from the start.

<br>

<h3 id="singlecorpustemporaliterator">qhchina.analytics.word2vec.utils.SingleCorpusTemporalIterator <a href="#singlecorpustemporaliterator" class="header-link" title="Permalink">#</a> <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/analytics/word2vec/utils.py#L188" class="source-link" title="View source on GitHub">[source]</a></h3>

<pre class="signature"><code><span class="sig-name">SingleCorpusTemporalIterator</span>(
    <span class="sig-param">corpus</span><span class="sig-punct">:</span> <span class="sig-type">Iterable[list[str]]</span>,
    <span class="sig-param">time_idx</span><span class="sig-punct">:</span> <span class="sig-type">int</span>,
    <span class="sig-param">token_limit</span><span class="sig-punct">:</span> <span class="sig-type">int | None</span> <span class="sig-punct">=</span> <span class="sig-default">None</span>
)</code></pre>

Streaming iterator over a single corpus that yields :class:`TemporalSentence` objects.

Used by :class:`DynamicWord2Vec` in sequential training mode, where each
time slice is trained independently.  Streams through the corpus without
materialising it, respecting an optional token limit.

**Parameters:**
- `corpus`: Sentence iterable for one period.
- `time_idx`: Integer time-slice index to attach to every sentence.
- `token_limit`: Maximum tokens to yield (``None`` = unlimited).

<br>

<h3 id="temporalsentence">qhchina.analytics.word2vec.utils.TemporalSentence <a href="#temporalsentence" class="header-link" title="Permalink">#</a> <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/analytics/word2vec/utils.py#L39" class="source-link" title="View source on GitHub">[source]</a></h3>

<pre class="signature"><code><span class="sig-name">TemporalSentence</span>(<span class="sig-param">tokens</span><span class="sig-punct">:</span> <span class="sig-type">list[str]</span>, <span class="sig-param">time_idx</span><span class="sig-punct">:</span> <span class="sig-type">int</span>)</code></pre>

A sentence (list of tokens) annotated with a time slice index.

Subclasses `list` so it passes through `iter_batches` and the parent
`Word2Vec` training loop unchanged, while carrying an integer
`time_idx` that the Cython kernel uses to select the correct
`U[t]` / `V[t]` embedding slice.

**Parameters:**
- `tokens`: The tokenized sentence.
- `time_idx`: Zero-based index of the time slice this sentence belongs to.

<br>

<h3 id="temporalsentenceiterator">qhchina.analytics.word2vec.utils.TemporalSentenceIterator <a href="#temporalsentenceiterator" class="header-link" title="Permalink">#</a> <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/analytics/word2vec/utils.py#L59" class="source-link" title="View source on GitHub">[source]</a></h3>

<pre class="signature"><code><span class="sig-name">TemporalSentenceIterator</span>(
    <span class="sig-param">corpora</span><span class="sig-punct">:</span> <span class="sig-type">dict[str, Iterable[list[str]]]</span>,
    <span class="sig-param">label2idx</span><span class="sig-punct">:</span> <span class="sig-type">dict[str, int]</span>,
    <span class="sig-param">token_budget</span><span class="sig-punct">:</span> <span class="sig-type">int</span>,
    <span class="sig-param">seed</span><span class="sig-punct">:</span> <span class="sig-type">int | None</span> <span class="sig-punct">=</span> <span class="sig-default">None</span>,
    <span class="sig-param">strategy</span><span class="sig-punct">:</span> <span class="sig-type">str</span> <span class="sig-punct">=</span> <span class="sig-default">'balanced'</span>
)</code></pre>

Streaming iterator that interleaves sentences from multiple corpora with time metadata.

Follows the same balanced/proportional sampling logic as
:class:`BalancedSentenceIterator` but yields :class:`TemporalSentence`
objects (`list` subclass with a `time_idx` attribute) instead of
tagging words.  Only one budget-sized chunk is materialised at a time,
so memory usage stays constant regardless of corpus size.

**Parameters:**
- `corpora`: Dict mapping period labels to sentence iterables.
- `label2idx`: Dict mapping period labels to integer time-slice indices.
- `token_budget`: Tokens to collect per chunk before shuffling and yielding.
- `seed`: Random seed for reproducible chunk shuffling.
- `strategy`: ``"balanced"`` (equal tokens per corpus, stops at smallest)
  or ``"proportional"`` (all data, proportional contribution).
- `token_counts`: Dict mapping labels to total token counts per corpus.

<h4 id="temporalsentenceiterator-reset">qhchina.analytics.word2vec.utils.TemporalSentenceIterator.reset() <a href="#temporalsentenceiterator-reset" class="header-link" title="Permalink">#</a> <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/analytics/word2vec/utils.py#L112" class="source-link" title="View source on GitHub">[source]</a></h4>

<pre class="signature"><code><span class="sig-name">reset</span>()</code></pre>

Reset epoch counter for reproducible iteration from the start.

<br>

<h3 id="project_2d">qhchina.analytics.vectors.project_2d() <a href="#project_2d" class="header-link" title="Permalink">#</a> <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/analytics/vectors.py#L19" class="source-link" title="View source on GitHub">[source]</a></h3>

<pre class="signature"><code><span class="sig-name">project_2d</span>(
    <span class="sig-param">vectors</span><span class="sig-punct">:</span> <span class="sig-type">list[numpy.ndarray] | dict[str, numpy.ndarray] | numpy.ndarray</span>,
    <span class="sig-param">labels</span><span class="sig-punct">:</span> <span class="sig-type">list[str] | None</span> <span class="sig-punct">=</span> <span class="sig-default">None</span>,
    <span class="sig-param">method</span><span class="sig-punct">:</span> <span class="sig-type">str</span> <span class="sig-punct">=</span> <span class="sig-default">'pca'</span>,
    <span class="sig-param">title</span><span class="sig-punct">:</span> <span class="sig-type">str | None</span> <span class="sig-punct">=</span> <span class="sig-default">None</span>,
    <span class="sig-param">color</span><span class="sig-punct">:</span> <span class="sig-type">str | list[str] | None</span> <span class="sig-punct">=</span> <span class="sig-default">None</span>,
    <span class="sig-param">figsize</span><span class="sig-punct">:</span> <span class="sig-type">tuple[int, int]</span> <span class="sig-punct">=</span> <span class="sig-default">(8, 8)</span>,
    <span class="sig-param">fontsize</span><span class="sig-punct">:</span> <span class="sig-type">int</span> <span class="sig-punct">=</span> <span class="sig-default">12</span>,
    <span class="sig-param">perplexity</span><span class="sig-punct">:</span> <span class="sig-type">float | None</span> <span class="sig-punct">=</span> <span class="sig-default">None</span>,
    <span class="sig-param">filename</span><span class="sig-punct">:</span> <span class="sig-type">str | None</span> <span class="sig-punct">=</span> <span class="sig-default">None</span>,
    <span class="sig-param">adjust_text_labels</span><span class="sig-punct">:</span> <span class="sig-type">bool</span> <span class="sig-punct">=</span> <span class="sig-default">False</span>,
    <span class="sig-param">n_neighbors</span><span class="sig-punct">:</span> <span class="sig-type">int</span> <span class="sig-punct">=</span> <span class="sig-default">15</span>,
    <span class="sig-param">min_dist</span><span class="sig-punct">:</span> <span class="sig-type">float</span> <span class="sig-punct">=</span> <span class="sig-default">0.1</span>
)</code></pre>

Projects high-dimensional vectors into 2D using PCA, t-SNE, or UMAP and visualizes them.

**Parameters:**
- `vectors` (list or dict): Vectors to project. Can be a list of vectors or a dict 
  mapping labels to vectors.
- `labels` (list of str): List of labels for the vectors.
- `method` (str): Method to use for projection ('pca', 'tsne', or 'umap'). 
  Default is 'pca'.
- `title` (str): Title of the plot.
- `color` (list of str or str): List of colors for the vectors or a 
  single color.
- `figsize` (tuple): Figure size as (width, height). Default is (8, 8).
- `fontsize` (int): Font size for labels. Default is 12.
- `perplexity` (float): Perplexity parameter for t-SNE. Required if 
  method is 'tsne'.
- `filename` (str): Path to save the figure.
- `adjust_text_labels` (bool): Whether to adjust text labels to avoid overlap. 
  Default is False.
- `n_neighbors` (int): Number of neighbors for UMAP. Default is 15.
- `min_dist` (float): Minimum distance between points for UMAP. Default is 0.1.

<br>

<h3 id="get_bias_direction">qhchina.analytics.vectors.get_bias_direction() <a href="#get_bias_direction" class="header-link" title="Permalink">#</a> <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/analytics/vectors.py#L124" class="source-link" title="View source on GitHub">[source]</a></h3>

<pre class="signature"><code><span class="sig-name">get_bias_direction</span>(
    <span class="sig-param">anchors</span><span class="sig-punct">:</span> <span class="sig-type">tuple[numpy.ndarray, numpy.ndarray] | list[tuple[numpy.ndarray, numpy.ndarray]]</span>
)</code></pre>

Compute the direction vector for measuring bias.

Given either a single tuple (pos_anchor, neg_anchor) or a list of tuples,
computes the direction vector by taking the mean of differences between 
positive and negative anchor pairs.

**Parameters:**
- `anchors`: A tuple (pos_vector, neg_vector) or list of such tuples.
  Each vector in the pairs should be a numpy array.

**Returns:**
(numpy.ndarray) The bias direction vector (normalized).

<br>

<h3 id="calculate_bias">qhchina.analytics.vectors.calculate_bias() <a href="#calculate_bias" class="header-link" title="Permalink">#</a> <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/analytics/vectors.py#L157" class="source-link" title="View source on GitHub">[source]</a></h3>

<pre class="signature"><code><span class="sig-name">calculate_bias</span>(
    <span class="sig-param">anchors</span><span class="sig-punct">:</span> <span class="sig-type">tuple[str, str] | list[tuple[str, str]]</span>,
    <span class="sig-param">targets</span><span class="sig-punct">:</span> <span class="sig-type">list[str]</span>,
    <span class="sig-param">word_vectors</span><span class="sig-punct">:</span> <span class="sig-type">Any</span>
)</code></pre>

Calculate bias scores for target words along an axis defined by anchor pairs.

**Parameters:**
- `anchors`: Tuple or list of tuples defining the bias axis, e.g. ("man", "woman") 
  or [("king", "queen"), ("man", "woman")].
- `targets`: List of words to calculate bias for.
- `word_vectors`: Keyed vectors (e.g. from word2vec_model.wv).

**Returns:**
(numpy.ndarray) Bias scores (dot products) for each target word.

<br>

<h3 id="project_bias">qhchina.analytics.vectors.project_bias() <a href="#project_bias" class="header-link" title="Permalink">#</a> <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/analytics/vectors.py#L190" class="source-link" title="View source on GitHub">[source]</a></h3>

<pre class="signature"><code><span class="sig-name">project_bias</span>(
    <span class="sig-param">x</span><span class="sig-punct">:</span> <span class="sig-type">tuple[str, str] | list[tuple[str, str]]</span>,
    <span class="sig-param">y</span><span class="sig-punct">:</span> <span class="sig-type">tuple[str, str] | list[tuple[str, str]] | None</span>,
    <span class="sig-param">targets</span><span class="sig-punct">:</span> <span class="sig-type">list[str]</span>,
    <span class="sig-param">word_vectors</span><span class="sig-punct">:</span> <span class="sig-type">Any</span>,
    <span class="sig-param">title</span><span class="sig-punct">:</span> <span class="sig-type">str | None</span> <span class="sig-punct">=</span> <span class="sig-default">None</span>,
    <span class="sig-param">color</span><span class="sig-punct">:</span> <span class="sig-type">str | list[str] | None</span> <span class="sig-punct">=</span> <span class="sig-default">None</span>,
    <span class="sig-param">figsize</span><span class="sig-punct">:</span> <span class="sig-type">tuple[int, int]</span> <span class="sig-punct">=</span> <span class="sig-default">(8, 8)</span>,
    <span class="sig-param">fontsize</span><span class="sig-punct">:</span> <span class="sig-type">int</span> <span class="sig-punct">=</span> <span class="sig-default">12</span>,
    <span class="sig-param">filename</span><span class="sig-punct">:</span> <span class="sig-type">str | None</span> <span class="sig-punct">=</span> <span class="sig-default">None</span>,
    <span class="sig-param">adjust_text_labels</span><span class="sig-punct">:</span> <span class="sig-type">bool</span> <span class="sig-punct">=</span> <span class="sig-default">False</span>,
    <span class="sig-param">disperse_y</span><span class="sig-punct">:</span> <span class="sig-type">bool</span> <span class="sig-punct">=</span> <span class="sig-default">False</span>
)</code></pre>

Plot words on a 1D or 2D chart by projecting them onto bias axes.

Projects words onto:
  - x-axis: derived from x (single tuple or list of tuples)
  - y-axis: derived from y (single tuple or list of tuples), if provided

**Parameters:**
- `x`: Tuple or list of tuples defining the x-axis bias direction, 
  e.g. ("man", "woman").
- `y`: Tuple or list of tuples defining the y-axis bias direction, or None 
  for 1D plot.
- `targets`: List of words to plot.
- `word_vectors`: Keyed vectors (e.g. from word2vec_model.wv).
- `title` (str): Title of the plot.
- `color`: Color(s) for the points. Can be a single color or list of colors.
- `figsize` (tuple): Figure size as (width, height). Default is (8, 8).
- `fontsize` (int): Font size for labels. Default is 12.
- `filename` (str): Path to save the figure.
- `adjust_text_labels` (bool): Whether to adjust text labels to avoid overlap. 
  Default is False.
- `disperse_y` (bool): Whether to add random y-dispersion for 1D plots. 
  Default is False.

<br>

<h3 id="cosine_similarity">qhchina.analytics.vectors.cosine_similarity() <a href="#cosine_similarity" class="header-link" title="Permalink">#</a> <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/analytics/vectors.py#L316" class="source-link" title="View source on GitHub">[source]</a></h3>

<pre class="signature"><code><span class="sig-name">cosine_similarity</span>(
    <span class="sig-param">v1</span><span class="sig-punct">:</span> <span class="sig-type">numpy.ndarray | list[float]</span>,
    <span class="sig-param">v2</span><span class="sig-punct">:</span> <span class="sig-type">numpy.ndarray | list[float]</span>
)</code></pre>

Compute the cosine similarity between vectors.

If v1 and v2 are single vectors, computes similarity between them.
If either is a matrix of vectors, uses sklearn's implementation for efficiency.
Returns 0.0 if either vector has zero norm (to avoid division by zero).

**Parameters:**
- `v1` (numpy.ndarray or list): First vector or matrix of vectors.
- `v2` (numpy.ndarray or list): Second vector or matrix of vectors.

**Returns:**
float or numpy.ndarray: Cosine similarity score(s). For single vectors, 
returns a float in range [-1, 1]. For matrices, returns a 2D 
similarity matrix.

<br>

<h3 id="cosine_distance">qhchina.analytics.vectors.cosine_distance() <a href="#cosine_distance" class="header-link" title="Permalink">#</a> <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/analytics/vectors.py#L353" class="source-link" title="View source on GitHub">[source]</a></h3>

<pre class="signature"><code><span class="sig-name">cosine_distance</span>(
    <span class="sig-param">v1</span><span class="sig-punct">:</span> <span class="sig-type">numpy.ndarray | list[float]</span>,
    <span class="sig-param">v2</span><span class="sig-punct">:</span> <span class="sig-type">numpy.ndarray | list[float]</span>
)</code></pre>

Compute the cosine distance between vectors (1 - cosine_similarity).

Cosine distance is a dissimilarity measure where 0 means identical vectors
and 2 means opposite vectors.

**Parameters:**
- `v1` (numpy.ndarray or list): First vector or matrix of vectors.
- `v2` (numpy.ndarray or list): Second vector or matrix of vectors.

**Returns:**
float or numpy.ndarray: Cosine distance score(s). For single vectors, 
returns a float in range [0, 2]. For matrices, returns a 2D 
distance matrix.

<br>

<h3 id="most_similar">qhchina.analytics.vectors.most_similar() <a href="#most_similar" class="header-link" title="Permalink">#</a> <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/analytics/vectors.py#L374" class="source-link" title="View source on GitHub">[source]</a></h3>

<pre class="signature"><code><span class="sig-name">most_similar</span>(
    <span class="sig-param">target_vector</span><span class="sig-punct">:</span> <span class="sig-type">numpy.ndarray</span>,
    <span class="sig-param">vectors</span><span class="sig-punct">:</span> <span class="sig-type">list[numpy.ndarray] | numpy.ndarray</span>,
    <span class="sig-param">labels</span><span class="sig-punct">:</span> <span class="sig-type">list[str] | None</span> <span class="sig-punct">=</span> <span class="sig-default">None</span>,
    <span class="sig-param">metric</span><span class="sig-punct">:</span> <span class="sig-type">Union[str, Callable[[numpy.ndarray, numpy.ndarray], float]]</span> <span class="sig-punct">=</span> <span class="sig-default">'cosine'</span>,
    <span class="sig-param">top_n</span><span class="sig-punct">:</span> <span class="sig-type">int | None</span> <span class="sig-punct">=</span> <span class="sig-default">None</span>
)</code></pre>

Find the most similar vectors to a target vector using the specified similarity metric.

**Parameters:**
- `target_vector` (numpy.ndarray): The reference vector to compare against.
- `vectors` (list or numpy.ndarray): List of vectors to compare with the target.
- `labels` (list): Labels corresponding to the vectors. If provided, 
  returns (label, score) pairs.
- `metric` (str or callable): Similarity metric to use. Can be 'cosine' or a 
  callable that takes two vectors. Default is 'cosine'.
- `top_n` (int): Number of top results to return. If None, returns 
  all results.

**Returns:**
(list) List of (label, score) or (index, score) tuples sorted by similarity 
score in descending order.

<br>

<h3 id="align_vectors">qhchina.analytics.vectors.align_vectors() <a href="#align_vectors" class="header-link" title="Permalink">#</a> <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/analytics/vectors.py#L430" class="source-link" title="View source on GitHub">[source]</a></h3>

<pre class="signature"><code><span class="sig-name">align_vectors</span>(<span class="sig-param">source_vectors</span><span class="sig-punct">:</span> <span class="sig-type">numpy.ndarray</span>, <span class="sig-param">target_vectors</span><span class="sig-punct">:</span> <span class="sig-type">numpy.ndarray</span>)</code></pre>

Align source vectors with target vectors using Procrustes analysis.

**Parameters:**
- `source_vectors`: numpy array of vectors to be aligned
- `target_vectors`: numpy array of vectors to align to

**Returns:**
Tuple of (aligned_vectors, transformation_matrix)
- aligned_vectors: The aligned source vectors
- transformation_matrix: The orthogonal transformation matrix that can be used to align other vectors

<br>

<!-- API-END -->
