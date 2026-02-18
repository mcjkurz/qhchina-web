---
layout: docs_with_sidebar
title: Word Embeddings
permalink: /docs/word_embeddings/
functions:
  - name: Word2Vec
    anchor: word2vec
  - name: Word2Vec.build_vocab()
    anchor: word2vec-build_vocab
  - name: Word2Vec.get_vector()
    anchor: word2vec-get_vector
  - name: Word2Vec.load()
    anchor: word2vec-load
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
  - name: TempRefWord2Vec.get_available_targets()
    anchor: temprefword2vec-get_available_targets
  - name: TempRefWord2Vec.get_period_vocab_counts()
    anchor: temprefword2vec-get_period_vocab_counts
  - name: TempRefWord2Vec.get_time_labels()
    anchor: temprefword2vec-get_time_labels
  - name: TempRefWord2Vec.load()
    anchor: temprefword2vec-load
  - name: TempRefWord2Vec.save()
    anchor: temprefword2vec-save
  - name: TempRefWord2Vec.train()
    anchor: temprefword2vec-train
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
has_examples: True
import_from: ['qhchina.analytics.word2vec', 'qhchina.analytics.vectors']
---

# Word Embeddings

The `qhchina.analytics.word2vec` module provides Word2Vec implementations for Chinese text analysis, including standard Word2Vec and TempRefWord2Vec for tracking semantic change over time.

```python
from qhchina.analytics.word2vec import Word2Vec

model = Word2Vec(vector_size=100, window=5, min_word_count=5, epochs=5)
model.train(sentences)
similar = model.most_similar("经济", topn=10)  # Find words similar to "经济"
```

## Examples

**Basic Word2Vec Training**

```python
from qhchina.analytics.word2vec import Word2Vec

# Initialize model
model = Word2Vec(vector_size=100, window=5, min_word_count=5, sg=1, seed=42, epochs=5)

# Tokenized literary sentences
sentences = [
    ["她", "渴望", "自由", "追求", "理想"],
    ["爱情", "是", "永恒", "的", "主题"],
    # More sentences...
]

# Train model
model.train(sentences)

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
from qhchina.analytics.word2vec import TempRefWord2Vec

# Corpus from different literary periods
time_labels = ["1920s", "1940s", "1980s", "2000s"]
corpora = [corpus_1920s, corpus_1940s, corpus_1980s, corpus_2000s]

# Track how key concepts evolved
target_words = ["自由", "爱情", "革命"]

model = TempRefWord2Vec(
    corpora=corpora,
    labels=time_labels,
    targets=target_words,
    vector_size=100,
    window=5,
    sg=1,
    seed=42,
    epochs=5
)

# How did "自由" change from 1920s to 2000s?
changes = model.calculate_semantic_change("自由")
for transition, word_changes in changes.items():
    print(f"\n{transition}:")
    print("Words moved towards:", word_changes[:5])
```


---

## API Reference

<!-- API-START -->

<h3 id="word2vec">qhchina.analytics.word2vec.Word2Vec <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/analytics/word2vec.py#L50" class="source-link" title="View source on GitHub">[source]</a></h3>

<pre class="signature"><code><span class="sig-name">Word2Vec</span>(
    <span class="sig-param">sentences</span><span class="sig-punct">:</span> <span class="sig-type">collections.abc.Iterable[list[str]] | None</span> <span class="sig-punct">=</span> <span class="sig-default">None</span>,
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
    <span class="sig-param">epochs</span><span class="sig-punct">:</span> <span class="sig-type">int</span> <span class="sig-punct">=</span> <span class="sig-default">1</span>,
    <span class="sig-param">batch_size</span><span class="sig-punct">:</span> <span class="sig-type">int</span> <span class="sig-punct">=</span> <span class="sig-default">10240</span>,
    <span class="sig-param">callbacks</span><span class="sig-punct">:</span> <span class="sig-type">list[collections.abc.Callable] | None</span> <span class="sig-punct">=</span> <span class="sig-default">None</span>,
    <span class="sig-param">calculate_loss</span><span class="sig-punct">:</span> <span class="sig-type">bool</span> <span class="sig-punct">=</span> <span class="sig-default">True</span>,
    <span class="sig-param">total_examples</span><span class="sig-punct">:</span> <span class="sig-type">int | None</span> <span class="sig-punct">=</span> <span class="sig-default">None</span>,
    <span class="sig-param">shuffle</span><span class="sig-punct">:</span> <span class="sig-type">bool | None</span> <span class="sig-punct">=</span> <span class="sig-default">None</span>,
    <span class="sig-param">_skip_init</span><span class="sig-punct">:</span> <span class="sig-type">bool</span> <span class="sig-punct">=</span> <span class="sig-default">False</span>
)</code></pre>

Implementation of Word2Vec algorithm with Cython-accelerated training. It is inspired by the Gensim implementation.

This class implements both Skip-gram and CBOW architectures:
- Skip-gram (sg=1): Each training example is (input_idx, output_idx) where input is the center word
  and output is a context word.
- CBOW (sg=0): Each training example is (input_indices, output_idx) where inputs are context words
  and output is the center word.

Training is performed using optimized Cython routines with BLAS operations.

If `sentences` is provided at initialization, training starts immediately. Otherwise, call
`train()` later with the sentences to train on.

Features:
- CBOW and Skip-gram architectures
- Cython-accelerated training with BLAS operations
- Negative sampling for each training example
- Subsampling of frequent words
- Dynamic window sizing with shrink_windows parameter
- Properly managed learning rate decay
- Vocabulary size restriction with max_vocab_size parameter

**Parameters:**
- `sentences` (iterable of list of str): Tokenized sentences for training. 
  If provided, training starts immediately during initialization.
  Note: The iterable must be restartable (can be iterated multiple times).
- `vector_size` (int): Dimensionality of the word vectors (default: 100).
- `window` (int): Maximum distance between the current and predicted word (default: 5).
- `min_word_count` (int): Ignores all words with frequency lower than this (default: 5).
- `negative` (int): Number of negative samples for negative sampling (default: 5).
- `ns_exponent` (float): Exponent used to shape the negative sampling distribution (default: 0.75).
- `cbow_mean` (bool): If True, use mean of context word vectors, else use sum (default: True).
- `sg` (int): Training algorithm: 1 for skip-gram; 0 for CBOW (default: 0).
- `seed` (int): Seed for random number generator. If None, uses global seed setting.
- `alpha` (float): Initial learning rate (default: 0.025).
- `min_alpha` (float): Minimum learning rate. If None, learning rate remains constant at alpha.
- `sample` (float): Threshold for subsampling frequent words. Default is 1e-3, set to 0 to disable.
- `shrink_windows` (bool): If True, the effective window size is uniformly sampled from [1, window] 
  for each target word during training. If False, always use the full window (default: True).
- `max_vocab_size` (int): Maximum vocabulary size to keep, keeping the most frequent words.
  None means no limit (keep all words above min_word_count).
- `verbose` (bool): If True, log detailed progress information during training (default: False).
- `epochs` (int): Number of training iterations over the corpus (default: 1).
- `batch_size` (int): Target number of words per training batch (default: 10240). 
  Note that the Cython training buffer is limited to 10240 words, regardless of the batch_size parameter; 
  words beyond this limit will be dropped from the batch, which mimics Gensim behavior.
- `callbacks` (list of callable): Callback functions to call after each epoch.
- `calculate_loss` (bool): Whether to calculate and return the final loss (default: True).
- `total_examples` (int): Total number of training examples per epoch. When provided 
  along with ``min_alpha``, uses this exact value instead of estimating for learning rate decay.
- `shuffle` (bool): Whether to shuffle sentences before each epoch. 
  Defaults to True if sentences is a list, False otherwise (to preserve streaming).

**Example:**
```python
from qhchina.analytics.word2vec import Word2Vec

# Prepare corpus as list of tokenized sentences
sentences = [['我', '喜欢', '学习'], ['他', '喜欢', '运动']]

# Option 1: Train immediately by providing sentences at init
model = Word2Vec(sentences, vector_size=100, window=5, min_word_count=1, epochs=5)

# Option 2: Initialize first, train later
model = Word2Vec(vector_size=100, window=5, min_word_count=1, epochs=5)
model.train(sentences)

# Get word vector (can use model directly or model.wv for gensim compatibility)
vector = model['喜欢']
vector = model.wv['喜欢']  # Same as above

# Find similar words
similar = model.most_similar('喜欢', topn=5)
similar = model.wv.most_similar('喜欢', topn=5)  # Same as above
```

<h4 id="word2vec-build_vocab">qhchina.analytics.word2vec.Word2Vec.build_vocab() <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/analytics/word2vec.py#L250" class="source-link" title="View source on GitHub">[source]</a></h4>

<pre class="signature"><code><span class="sig-name">build_vocab</span>(<span class="sig-param">sentences</span><span class="sig-punct">:</span> <span class="sig-type">collections.abc.Iterable[list[str]]</span>)</code></pre>

Build vocabulary from sentences.

**Parameters:**
- `sentences`: Iterable of tokenized sentences (each sentence is a list of words).

**Raises:**
- `ValueError`: If sentences is empty or contains no words.

<h4 id="word2vec-get_vector">qhchina.analytics.word2vec.Word2Vec.get_vector() <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/analytics/word2vec.py#L746" class="source-link" title="View source on GitHub">[source]</a></h4>

<pre class="signature"><code><span class="sig-name">get_vector</span>(<span class="sig-param">word</span><span class="sig-punct">:</span> <span class="sig-type">str</span>, <span class="sig-param">normalize</span><span class="sig-punct">:</span> <span class="sig-type">bool</span> <span class="sig-punct">=</span> <span class="sig-default">False</span>)</code></pre>

Get the vector for a word.

**Parameters:**
- `word`: Input word.
- `normalize`: If True, return the normalized vector (unit length).

**Returns:**
Word vector as numpy array of shape (vector_size,).

**Raises:**
- `KeyError`: If word is not in vocabulary.

<h4 id="word2vec-load">qhchina.analytics.word2vec.Word2Vec.load() <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/analytics/word2vec.py#L880" class="source-link" title="View source on GitHub">[source]</a></h4>

<pre class="signature"><code><span class="sig-name">load</span>(<span class="sig-param">path</span><span class="sig-punct">:</span> <span class="sig-type">str</span>)</code></pre>

Load a model from a file.

**Parameters:**
- `path`: Path to load the model from.

**Returns:**
Loaded Word2Vec model.

<h4 id="word2vec-most_similar">qhchina.analytics.word2vec.Word2Vec.most_similar() <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/analytics/word2vec.py#L795" class="source-link" title="View source on GitHub">[source]</a></h4>

<pre class="signature"><code><span class="sig-name">most_similar</span>(<span class="sig-param">word</span><span class="sig-punct">:</span> <span class="sig-type">str</span>, <span class="sig-param">topn</span><span class="sig-punct">:</span> <span class="sig-type">int</span> <span class="sig-punct">=</span> <span class="sig-default">10</span>)</code></pre>

Find the topn most similar words to the given word.

**Parameters:**
- `word`: Input word.
- `topn`: Number of similar words to return.

**Returns:**
List of (word, similarity) tuples.

<h4 id="word2vec-save">qhchina.analytics.word2vec.Word2Vec.save() <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/analytics/word2vec.py#L848" class="source-link" title="View source on GitHub">[source]</a></h4>

<pre class="signature"><code><span class="sig-name">save</span>(<span class="sig-param">path</span><span class="sig-punct">:</span> <span class="sig-type">str</span>)</code></pre>

Save the model to a file.

Saves all model parameters, vocabulary, and trained vectors. Training-specific
parameters (alpha, min_alpha, epochs, etc.) are not saved as they are only
needed during training, not inference.

**Parameters:**
- `path`: Path to save the model.

<h4 id="word2vec-similarity">qhchina.analytics.word2vec.Word2Vec.similarity() <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/analytics/word2vec.py#L823" class="source-link" title="View source on GitHub">[source]</a></h4>

<pre class="signature"><code><span class="sig-name">similarity</span>(<span class="sig-param">word1</span><span class="sig-punct">:</span> <span class="sig-type">str</span>, <span class="sig-param">word2</span><span class="sig-punct">:</span> <span class="sig-type">str</span>)</code></pre>

Calculate cosine similarity between two words.

**Parameters:**
- `word1`: First word.
- `word2`: Second word.

**Returns:**
Cosine similarity between the two words (float between -1 and 1).

**Raises:**
- `KeyError`: If either word is not in the vocabulary.

<h4 id="word2vec-train">qhchina.analytics.word2vec.Word2Vec.train() <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/analytics/word2vec.py#L556" class="source-link" title="View source on GitHub">[source]</a></h4>

<pre class="signature"><code><span class="sig-name">train</span>(<span class="sig-param">sentences</span><span class="sig-punct">:</span> <span class="sig-type">collections.abc.Iterable[list[str]]</span>)</code></pre>

Train word2vec model on given sentences.

Processes sentences in batches using Cython-accelerated training.
This approach is memory-efficient and works with both lists and iterables.

**Parameters:**
- `sentences`: Tokenized sentences. Can be:
  - A list of sentences
  - A restartable iterable (e.g., file-backed iterator)
  
  Note: Single-use generators are not supported. The iterable must be
  restartable.

**Returns:**
Final loss value if calculate_loss is True, None otherwise.

<br>

<h3 id="temprefword2vec">qhchina.analytics.word2vec.TempRefWord2Vec <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/analytics/word2vec.py#L927" class="source-link" title="View source on GitHub">[source]</a></h3>

<pre class="signature"><code><span class="sig-name">TempRefWord2Vec</span>(
    <span class="sig-param">corpora</span><span class="sig-punct">:</span> <span class="sig-type">dict[str, list[list[str]]]</span>,
    <span class="sig-param">targets</span><span class="sig-punct">:</span> <span class="sig-type">list[str]</span>,
    <span class="sig-param">balance</span><span class="sig-punct">:</span> <span class="sig-type">bool</span> <span class="sig-punct">=</span> <span class="sig-default">True</span>,
    <span class="sig-param">_skip_init</span><span class="sig-punct">:</span> <span class="sig-type">bool</span> <span class="sig-punct">=</span> <span class="sig-default">False</span>,
    <span class="sig-param">_labels</span><span class="sig-punct">:</span> <span class="sig-type">list[str] | None</span> <span class="sig-punct">=</span> <span class="sig-default">None</span>,
    <span class="sig-param">kwargs</span>
)</code></pre>

Implementation of Word2Vec with Temporal Referencing (TR) for tracking semantic change.

This class extends Word2Vec to implement temporal referencing, where target words
are represented with time period indicators (e.g., "bread_1800" for period 1800s) when used
as target words, but remain unchanged when used as context words.

The class takes multiple corpora corresponding to different time periods and automatically
creates temporal references for specified target words.

Note:
    This implementation only supports Skip-gram (sg=1). CBOW is not supported.

**Parameters:**
- `corpora` (dict[str, list[list[str]]]): Dictionary mapping time period labels to corpora.
  Each corpus is a list of sentences (each sentence is a list of tokens).
  Example: {"1800s": [["bread", "baker"], ["food", "eat"]], 
            "1900s": [["bread", "supermarket"], ["food", "buy"]]}
- `targets` (list[str]): List of target words to trace semantic change.
- `balance` (bool): Whether to balance the corpora to equal sizes (default: True).
  When True, larger corpora are downsampled to match the smallest corpus.
- `**kwargs`: Arguments passed to Word2Vec parent class. Common options include:
  - vector_size (int): Dimensionality of word vectors (default: 100)
  - window (int): Context window size (default: 5)
  - min_word_count (int): Minimum word frequency threshold (default: 5)
  - negative (int): Number of negative samples (default: 5)
  - epochs (int): Number of training epochs (default: 1)
  - alpha (float): Initial learning rate (default: 0.025)
  - verbose (bool): Whether to log progress (default: False)
  
  Note: sg must be 1 (Skip-gram) - CBOW is not supported.

**Example:**
```python
from qhchina.analytics.word2vec import TempRefWord2Vec

# Corpora from different time periods as a dictionary
corpora = {
    "1800s": [["bread", "baker", "oven"], ["food", "eat", "cook"]],
    "1900s": [["bread", "supermarket", "buy"], ["food", "restaurant", "order"]]
}

# Initialize and train model (training starts automatically)
model = TempRefWord2Vec(
    corpora=corpora,
    targets=["bread", "food", "money"],
    vector_size=100,
    window=5,
    sg=1  # Skip-gram required
)

# Analyze semantic change (model is already trained)
model.most_similar("bread_1800s")  # Words similar to "bread" in the 1800s
model.most_similar("bread_1900s")  # Words similar to "bread" in the 1900s
```

<h4 id="temprefword2vec-build_vocab">qhchina.analytics.word2vec.TempRefWord2Vec.build_vocab() <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/analytics/word2vec.py#L1161" class="source-link" title="View source on GitHub">[source]</a></h4>

<pre class="signature"><code><span class="sig-name">build_vocab</span>(<span class="sig-param">sentences</span><span class="sig-punct">:</span> <span class="sig-type">list[list[str]]</span>)</code></pre>

Extends the parent build_vocab method to handle temporal word variants.

Explicitly adds base words to the vocabulary even if they don't appear in the corpus.

**Parameters:**
- `sentences`: List of tokenized sentences.

<h4 id="temprefword2vec-calculate_semantic_change">qhchina.analytics.word2vec.TempRefWord2Vec.calculate_semantic_change() <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/analytics/word2vec.py#L1323" class="source-link" title="View source on GitHub">[source]</a></h4>

<pre class="signature"><code><span class="sig-name">calculate_semantic_change</span>(<span class="sig-param">target_word</span><span class="sig-punct">:</span> <span class="sig-type">str</span>, <span class="sig-param">labels</span><span class="sig-punct">:</span> <span class="sig-type">list[str] | None</span> <span class="sig-punct">=</span> <span class="sig-default">None</span>)</code></pre>

Calculate semantic change by comparing cosine similarities across time periods.

**Parameters:**
- `target_word`: Target word to analyze (must be one of the targets specified 
  during initialization).
- `labels`: Time period labels (optional, defaults to labels from model initialization).

**Returns:**
Dict mapping transition names to lists of (word, change) tuples, sorted by 
change score (descending).

**Example:**
```python
changes = model.calculate_semantic_change("人民")
for transition, word_changes in changes.items():
    print(f"\n{transition}:")
    print("Words moved towards:", word_changes[:5])  # Top 5 increases
    print("Words moved away:", word_changes[-5:])   # Top 5 decreases
```

<h4 id="temprefword2vec-get_available_targets">qhchina.analytics.word2vec.TempRefWord2Vec.get_available_targets() <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/analytics/word2vec.py#L1395" class="source-link" title="View source on GitHub">[source]</a></h4>

<pre class="signature"><code><span class="sig-name">get_available_targets</span>()</code></pre>

Get the list of target words available for semantic change analysis.

**Returns:**
List of target words that were specified during model initialization.

<h4 id="temprefword2vec-get_period_vocab_counts">qhchina.analytics.word2vec.TempRefWord2Vec.get_period_vocab_counts() <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/analytics/word2vec.py#L1413" class="source-link" title="View source on GitHub">[source]</a></h4>

<pre class="signature"><code><span class="sig-name">get_period_vocab_counts</span>(<span class="sig-param">period</span><span class="sig-punct">:</span> <span class="sig-type">str | None</span> <span class="sig-punct">=</span> <span class="sig-default">None</span>)</code></pre>

Get vocabulary counts for a specific period or all periods.

**Parameters:**
- `period`: The period label to get vocab counts for. If None, returns all periods.

**Returns:**
If period is None: dictionary mapping period labels to Counter objects.
If period is specified: Counter object for that specific period.

**Raises:**
- `ValueError`: If the specified period is not found in the model.

<h4 id="temprefword2vec-get_time_labels">qhchina.analytics.word2vec.TempRefWord2Vec.get_time_labels() <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/analytics/word2vec.py#L1404" class="source-link" title="View source on GitHub">[source]</a></h4>

<pre class="signature"><code><span class="sig-name">get_time_labels</span>()</code></pre>

Get the list of time period labels used in the model.

**Returns:**
List of time period labels that were specified during model initialization.

<h4 id="temprefword2vec-load">qhchina.analytics.word2vec.TempRefWord2Vec.load() <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/analytics/word2vec.py#L1497" class="source-link" title="View source on GitHub">[source]</a></h4>

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

<h4 id="temprefword2vec-save">qhchina.analytics.word2vec.TempRefWord2Vec.save() <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/analytics/word2vec.py#L1438" class="source-link" title="View source on GitHub">[source]</a></h4>

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

<h4 id="temprefword2vec-train">qhchina.analytics.word2vec.TempRefWord2Vec.train() <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/analytics/word2vec.py#L1299" class="source-link" title="View source on GitHub">[source]</a></h4>

<pre class="signature"><code><span class="sig-name">train</span>(<span class="sig-param">sentences</span><span class="sig-punct">:</span> <span class="sig-type">list[list[str]] | None</span> <span class="sig-punct">=</span> <span class="sig-default">None</span>)</code></pre>

Train the TempRefWord2Vec model using the preprocessed combined corpus.

Unlike the parent Word2Vec class, TempRefWord2Vec always uses its internal combined_corpus
that was created and preprocessed during initialization. This ensures the training
data has the proper temporal references.

All training configuration (epochs, batch_size, alpha, min_alpha, etc.) is read
from instance attributes set during initialization via `**kwargs`.

**Parameters:**
- `sentences`: Ignored in TempRefWord2Vec, will use self.combined_corpus instead.

**Returns:**
Final loss value if calculate_loss is True, None otherwise.

<br>

<h3 id="project_2d">qhchina.analytics.vectors.project_2d() <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/analytics/vectors.py#L19" class="source-link" title="View source on GitHub">[source]</a></h3>

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

<h3 id="get_bias_direction">qhchina.analytics.vectors.get_bias_direction() <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/analytics/vectors.py#L124" class="source-link" title="View source on GitHub">[source]</a></h3>

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

<h3 id="calculate_bias">qhchina.analytics.vectors.calculate_bias() <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/analytics/vectors.py#L157" class="source-link" title="View source on GitHub">[source]</a></h3>

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

<h3 id="project_bias">qhchina.analytics.vectors.project_bias() <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/analytics/vectors.py#L190" class="source-link" title="View source on GitHub">[source]</a></h3>

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

<h3 id="cosine_similarity">qhchina.analytics.vectors.cosine_similarity() <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/analytics/vectors.py#L316" class="source-link" title="View source on GitHub">[source]</a></h3>

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

<h3 id="cosine_distance">qhchina.analytics.vectors.cosine_distance() <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/analytics/vectors.py#L353" class="source-link" title="View source on GitHub">[source]</a></h3>

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

<h3 id="most_similar">qhchina.analytics.vectors.most_similar() <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/analytics/vectors.py#L374" class="source-link" title="View source on GitHub">[source]</a></h3>

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

<h3 id="align_vectors">qhchina.analytics.vectors.align_vectors() <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/analytics/vectors.py#L427" class="source-link" title="View source on GitHub">[source]</a></h3>

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
