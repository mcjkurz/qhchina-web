---
layout: docs_with_sidebar
title: Topic Modeling
permalink: /docs/topic_modeling/
functions:
  - name: LDAGibbsSampler
    anchor: ldagibbssampler
  - name: LDAGibbsSampler.coherence()
    anchor: ldagibbssampler-coherence
  - name: LDAGibbsSampler.coherence_npmi()
    anchor: ldagibbssampler-coherence_npmi
  - name: LDAGibbsSampler.coherence_umass()
    anchor: ldagibbssampler-coherence_umass
  - name: LDAGibbsSampler.document_similarity()
    anchor: ldagibbssampler-document_similarity
  - name: LDAGibbsSampler.document_similarity_matrix()
    anchor: ldagibbssampler-document_similarity_matrix
  - name: LDAGibbsSampler.evaluate()
    anchor: ldagibbssampler-evaluate
  - name: LDAGibbsSampler.fit()
    anchor: ldagibbssampler-fit
  - name: LDAGibbsSampler.get_document_topics()
    anchor: ldagibbssampler-get_document_topics
  - name: LDAGibbsSampler.get_top_documents()
    anchor: ldagibbssampler-get_top_documents
  - name: LDAGibbsSampler.get_topic_distribution()
    anchor: ldagibbssampler-get_topic_distribution
  - name: LDAGibbsSampler.get_topic_words()
    anchor: ldagibbssampler-get_topic_words
  - name: LDAGibbsSampler.get_topics()
    anchor: ldagibbssampler-get_topics
  - name: LDAGibbsSampler.inference()
    anchor: ldagibbssampler-inference
  - name: LDAGibbsSampler.initialize()
    anchor: ldagibbssampler-initialize
  - name: LDAGibbsSampler.perplexity()
    anchor: ldagibbssampler-perplexity
  - name: LDAGibbsSampler.plot_topic_words()
    anchor: ldagibbssampler-plot_topic_words
  - name: LDAGibbsSampler.preprocess()
    anchor: ldagibbssampler-preprocess
  - name: LDAGibbsSampler.run_gibbs_sampling()
    anchor: ldagibbssampler-run_gibbs_sampling
  - name: LDAGibbsSampler.save()
    anchor: ldagibbssampler-save
  - name: LDAGibbsSampler.topic_correlation_matrix()
    anchor: ldagibbssampler-topic_correlation_matrix
  - name: LDAGibbsSampler.topic_similarity()
    anchor: ldagibbssampler-topic_similarity
  - name: LDAGibbsSampler.visualize_documents()
    anchor: ldagibbssampler-visualize_documents
has_examples: True
import_from: qhchina.analytics.topicmodels
---

# Topic Modeling

The `qhchina.analytics.topicmodels` module provides Latent Dirichlet Allocation (LDA) with Gibbs sampling for discovering thematic structure in document collections.

```python
from qhchina.analytics.topicmodels import LDAGibbsSampler

lda = LDAGibbsSampler(n_topics=10, iterations=100)
lda.fit(documents)  # documents = list of tokenized texts
topics = lda.get_topics(n_words=10)  # Get top words per topic
```

---

## API Reference

<!-- API-START -->

<h3 id="ldagibbssampler">qhchina.analytics.topicmodels.LDAGibbsSampler <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/analytics/topicmodels.py#L22" class="source-link" title="View source on GitHub">[source]</a></h3>

<div class="signature">

```python
LDAGibbsSampler(
    n_topics: int = 10,
    alpha: float | numpy.ndarray | list[float] | None = None,
    beta: float | None = None,
    iterations: int = 100,
    burnin: int = 0,
    random_state: int | None = None,
    log_interval: int | None = None,
    min_word_count: int = 1,
    max_vocab_size: int | None = None,
    min_word_length: int = 1,
    stopwords: set | None = None,
    estimate_alpha: int = 1
)
```

</div>

Latent Dirichlet Allocation with Gibbs sampling implementation.

**Parameters:**
- `n_topics`: Number of topics.
- `alpha`: Dirichlet prior for document-topic distributions (can be float or array 
  of floats, where each float is the alpha for a different topic). If None, 
  uses the heuristic 50/n_topics from Griffiths and Steyvers (2004).
- `beta`: Dirichlet prior for topic-word distributions (float). If None, uses the 
  heuristic 1/n_topics from Griffiths and Steyvers (2004).
- `iterations`: Number of Gibbs sampling iterations, excluding burnin.
- `burnin`: Number of initial iterations to run before hyperparameters estimation 
  (default 0).
- `random_state`: Random seed for reproducibility.
- `log_interval`: Calculate perplexity and print results every log_interval iterations.
- `min_word_count`: Minimum count of word to be included in vocabulary.
- `max_vocab_size`: Maximum vocabulary size to keep.
- `min_word_length`: Minimum length of word to be included in vocabulary.
- `stopwords`: Set of words to exclude from vocabulary.
- `estimate_alpha`: Frequency for estimating alpha (0 = no estimation; default 1 = 
  after every iteration, 2 = after every 2 iterations, etc.).

**Example:**
```python
from qhchina.analytics.topicmodels import LDAGibbsSampler

# Prepare corpus as list of tokenized documents
documents = [['word1', 'word2', ...], ['word3', 'word4', ...], ...]

# Create and fit model
lda = LDAGibbsSampler(n_topics=10, iterations=100)
lda.fit(documents)

# Get topics
topics = lda.get_topics(n_words=10)
```

<h4 id="ldagibbssampler-coherence">qhchina.analytics.topicmodels.LDAGibbsSampler.coherence() <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/analytics/topicmodels.py#L1231" class="source-link" title="View source on GitHub">[source]</a></h4>

<div class="signature">

```python
coherence(method: str = 'umass', n_words: int = 10, window_size: int | None = None, **kwargs)
```

</div>

Calculate topic coherence using the specified method.

Coherence measures how semantically similar the top words in each topic are.
Higher coherence generally indicates more interpretable topics.

**Parameters:**
- `method`: Coherence measure to use. Options:
  - 'umass': UMass coherence (Mimno et al., 2011). Uses document co-occurrence.
             Range: typically negative, higher (less negative) is better.
  - 'npmi': NPMI coherence. Uses sliding window co-occurrence.
           Range: -1 to 1, higher is better.
- `n_words`: Number of top words per topic to use (default: 10)
- `window_size`: Size of sliding window for 'npmi' method (default: 10).
- `**kwargs`: Additional arguments passed to the specific coherence method

**Returns:**
Tuple of:
- Average coherence across all topics
- List of coherence values for each topic

**Example:**
```python
model.fit(documents)
avg_coherence, topic_coherences = model.coherence('npmi')
print(f"Average NPMI coherence: {avg_coherence:.4f}")
```

<h4 id="ldagibbssampler-coherence_npmi">qhchina.analytics.topicmodels.LDAGibbsSampler.coherence_npmi() <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/analytics/topicmodels.py#L1169" class="source-link" title="View source on GitHub">[source]</a></h4>

<div class="signature">

```python
coherence_npmi(n_words: int = 10, window_size: int = 10, eps: float = 1e-12)
```

</div>

Calculate NPMI (Normalized Pointwise Mutual Information) topic coherence.

NPMI coherence uses sliding window co-occurrence and is defined as:

$$NPMI(w_i, w_j) = \frac{\log \frac{P(w_i, w_j)}{P(w_i) \cdot P(w_j)}}{-\log P(w_i, w_j)}$$

Values range from -1 (never co-occur) to +1 (always co-occur).

**Parameters:**
- `n_words`: Number of top words per topic to use
- `window_size`: Size of the sliding window for co-occurrence
- `eps`: Small constant to avoid division by zero

**Returns:**
Tuple of:
- Average coherence across all topics
- List of coherence values for each topic

<h4 id="ldagibbssampler-coherence_umass">qhchina.analytics.topicmodels.LDAGibbsSampler.coherence_umass() <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/analytics/topicmodels.py#L1110" class="source-link" title="View source on GitHub">[source]</a></h4>

<div class="signature">

```python
coherence_umass(n_words: int = 10, eps: float = 1e-12)
```

</div>

Calculate UMass topic coherence (Mimno et al., 2011).

UMass coherence uses document co-occurrence and is defined as:

$$C_{UMass} = \frac{2}{N(N-1)} \sum_{i<j} \log \frac{D(w_i, w_j) + \epsilon}{D(w_j)}$$

where $D(w)$ is the document frequency of word $w$, and $D(w_i, w_j)$ is the 
number of documents containing both words.

**Parameters:**
- `n_words`: Number of top words per topic to use for coherence calculation
- `eps`: Small constant to avoid log(0)

**Returns:**
Tuple of:
- Average coherence across all topics
- List of coherence values for each topic

<h4 id="ldagibbssampler-document_similarity">qhchina.analytics.topicmodels.LDAGibbsSampler.document_similarity() <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/analytics/topicmodels.py#L996" class="source-link" title="View source on GitHub">[source]</a></h4>

<div class="signature">

```python
document_similarity(doc_i: int, doc_j: int, metric: str = 'jsd')
```

</div>

Calculate similarity between two documents based on their topic distributions.

**Parameters:**
- `doc_i`: First document ID
- `doc_j`: Second document ID
- `metric`: Similarity metric to use. Options:
  - 'jsd': Jensen-Shannon divergence (default, lower is more similar)
  - 'hellinger': Hellinger distance (lower is more similar)
  - 'cosine': Cosine similarity (higher is more similar)
  - 'kl': KL divergence (lower is more similar, asymmetric)

**Returns:**
Similarity/distance value based on chosen metric

<h4 id="ldagibbssampler-document_similarity_matrix">qhchina.analytics.topicmodels.LDAGibbsSampler.document_similarity_matrix() <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/analytics/topicmodels.py#L1018" class="source-link" title="View source on GitHub">[source]</a></h4>

<div class="signature">

```python
document_similarity_matrix(doc_ids: list[int] | None = None, metric: str = 'jsd')
```

</div>

Calculate pairwise similarity/distance between documents.

**Parameters:**
- `doc_ids`: List of document IDs to compare. If None, compares all documents.
- `metric`: Similarity metric to use (see document_similarity for options)

**Returns:**
Square matrix with pairwise similarities/distances

<h4 id="ldagibbssampler-evaluate">qhchina.analytics.topicmodels.LDAGibbsSampler.evaluate() <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/analytics/topicmodels.py#L1269" class="source-link" title="View source on GitHub">[source]</a></h4>

<div class="signature">

```python
evaluate(n_words: int = 10, verbose: bool = True)
```

</div>

Comprehensive evaluation of the topic model.

Calculates multiple quality metrics including perplexity, coherence measures,
and topic diversity.

**Parameters:**
- `n_words`: Number of top words per topic for coherence calculation
- `verbose`: Whether to print results

**Returns:**
Dictionary containing all evaluation metrics

<h4 id="ldagibbssampler-fit">qhchina.analytics.topicmodels.LDAGibbsSampler.fit() <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/analytics/topicmodels.py#L477" class="source-link" title="View source on GitHub">[source]</a></h4>

<div class="signature">

```python
fit(documents: list[list[str]])
```

</div>

Fit the LDA model to the given documents.

**Parameters:**
- `documents`: List of tokenized documents (each document is a list of tokens)

<h4 id="ldagibbssampler-get_document_topics">qhchina.analytics.topicmodels.LDAGibbsSampler.get_document_topics() <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/analytics/topicmodels.py#L580" class="source-link" title="View source on GitHub">[source]</a></h4>

<div class="signature">

```python
get_document_topics(doc_id: int, sort_by_prob: bool = False)
```

</div>

Get topic distribution for a specific document.

**Parameters:**
- `doc_id`: ID of the document
- `sort_by_prob`: If True, sort topics by probability in descending order (default: False)

**Returns:**
List of (topic_id, probability) tuples

<h4 id="ldagibbssampler-get_top_documents">qhchina.analytics.topicmodels.LDAGibbsSampler.get_top_documents() <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/analytics/topicmodels.py#L862" class="source-link" title="View source on GitHub">[source]</a></h4>

<div class="signature">

```python
get_top_documents(topic_id: int, n_docs: int = 10)
```

</div>

Get the top n documents for a specific topic.

**Parameters:**
- `topic_id`: ID of the topic
- `n_docs`: Number of top documents to return

**Returns:**
List of (document_id, probability) tuples, sorted by probability in descending order

<h4 id="ldagibbssampler-get_topic_distribution">qhchina.analytics.topicmodels.LDAGibbsSampler.get_topic_distribution() <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/analytics/topicmodels.py#L596" class="source-link" title="View source on GitHub">[source]</a></h4>

<div class="signature">

```python
get_topic_distribution()
```

</div>

Get overall topic distribution across the corpus.

**Returns:**
Array of topic probabilities

<h4 id="ldagibbssampler-get_topic_words">qhchina.analytics.topicmodels.LDAGibbsSampler.get_topic_words() <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/analytics/topicmodels.py#L881" class="source-link" title="View source on GitHub">[source]</a></h4>

<div class="signature">

```python
get_topic_words(topic_id: int, n_words: int = 10)
```

</div>

Get the top n words for a specific topic.

**Parameters:**
- `topic_id`: ID of the topic
- `n_words`: Number of top words to return

**Returns:**
List of (word, probability) tuples, sorted by probability in descending order

<h4 id="ldagibbssampler-get_topics">qhchina.analytics.topicmodels.LDAGibbsSampler.get_topics() <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/analytics/topicmodels.py#L560" class="source-link" title="View source on GitHub">[source]</a></h4>

<div class="signature">

```python
get_topics(n_words: int = 10)
```

</div>

Get the top words for each topic along with their probabilities.

**Parameters:**
- `n_words`: Number of top words to return for each topic

**Returns:**
List of topics, each containing a list of (word, probability) tuples

<h4 id="ldagibbssampler-inference">qhchina.analytics.topicmodels.LDAGibbsSampler.inference() <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/analytics/topicmodels.py#L605" class="source-link" title="View source on GitHub">[source]</a></h4>

<div class="signature">

```python
inference(new_doc: list[str], inference_iterations: int = 100)
```

</div>

Infer topic distribution for a new document.

**Parameters:**
- `new_doc`: Tokenized document (list of tokens)
- `inference_iterations`: Number of sampling iterations for inference

**Returns:**
Topic distribution for the document

<h4 id="ldagibbssampler-initialize">qhchina.analytics.topicmodels.LDAGibbsSampler.initialize() <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/analytics/topicmodels.py#L252" class="source-link" title="View source on GitHub">[source]</a></h4>

<div class="signature">

```python
initialize(docs_as_ids: list[list[int]])
```

</div>

Initialize data structures for Gibbs sampling.

**Parameters:**
- `docs_as_ids`: Documents with tokens as integer IDs

<h4 id="ldagibbssampler-perplexity">qhchina.analytics.topicmodels.LDAGibbsSampler.perplexity() <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/analytics/topicmodels.py#L516" class="source-link" title="View source on GitHub">[source]</a></h4>

<div class="signature">

```python
perplexity()
```

</div>

Calculate perplexity of the model on the training data.

**Returns:**
Perplexity value (lower is better)

<h4 id="ldagibbssampler-plot_topic_words">qhchina.analytics.topicmodels.LDAGibbsSampler.plot_topic_words() <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/analytics/topicmodels.py#L664" class="source-link" title="View source on GitHub">[source]</a></h4>

<div class="signature">

```python
plot_topic_words(n_words: int = 10, figsize: tuple[int, int] = (12, 8), fontsize: int = 10, filename: str | None = None, separate_files: bool = False, dpi: int = 72, orientation: str = 'horizontal')
```

</div>

Plot the top words for each topic as a bar chart.

**Parameters:**
- `n_words`: Number of top words to display per topic
- `figsize`: Figure size as (width, height)
- `fontsize`: Font size for the plot
- `filename`: If provided, save the plot to this file (or use as base name for separate files)
- `separate_files`: If True, save each topic as a separate file
- `dpi`: Resolution of the output image in dots per inch
- `orientation`: "horizontal" (words on x-axis, probabilities on y-axis) or 
  "vertical" (probabilities on x-axis, words on y-axis with highest at top)

<h4 id="ldagibbssampler-preprocess">qhchina.analytics.topicmodels.LDAGibbsSampler.preprocess() <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/analytics/topicmodels.py#L184" class="source-link" title="View source on GitHub">[source]</a></h4>

<div class="signature">

```python
preprocess(documents: list[list[str]])
```

</div>

Convert token documents to word IDs and build vocabulary.

Filter vocabulary based on min_word_count, min_word_length, stopwords, and max_vocab_size.

**Parameters:**
- `documents`: List of tokenized documents (each document is a list of tokens)

**Returns:**
Tuple containing:
- docs_as_ids: Documents with tokens converted to integer IDs
- word_to_id: Mapping from words to integer IDs
- id_to_word: Mapping from integer IDs to words

<h4 id="ldagibbssampler-run_gibbs_sampling">qhchina.analytics.topicmodels.LDAGibbsSampler.run_gibbs_sampling() <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/analytics/topicmodels.py#L341" class="source-link" title="View source on GitHub">[source]</a></h4>

<div class="signature">

```python
run_gibbs_sampling()
```

</div>

Run Gibbs sampling for the specified number of iterations. 

Uses Cython if available and enabled.

<h4 id="ldagibbssampler-save">qhchina.analytics.topicmodels.LDAGibbsSampler.save() <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/analytics/topicmodels.py#L750" class="source-link" title="View source on GitHub">[source]</a></h4>

<div class="signature">

```python
save(filepath: str)
```

</div>

Save the model to a file.

**Parameters:**
- `filepath`: Path to save the model

<h4 id="ldagibbssampler-topic_correlation_matrix">qhchina.analytics.topicmodels.LDAGibbsSampler.topic_correlation_matrix() <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/analytics/topicmodels.py#L970" class="source-link" title="View source on GitHub">[source]</a></h4>

<div class="signature">

```python
topic_correlation_matrix(metric: str = 'jsd')
```

</div>

Calculate pairwise similarity/distance between all topics.

**Parameters:**
- `metric`: Similarity metric to use (see topic_similarity for options)

**Returns:**
Square matrix of shape (n_topics, n_topics) with pairwise similarities/distances

<h4 id="ldagibbssampler-topic_similarity">qhchina.analytics.topicmodels.LDAGibbsSampler.topic_similarity() <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/analytics/topicmodels.py#L949" class="source-link" title="View source on GitHub">[source]</a></h4>

<div class="signature">

```python
topic_similarity(topic_i: int, topic_j: int, metric: str = 'jsd')
```

</div>

Calculate similarity between two topics.

**Parameters:**
- `topic_i`: First topic ID
- `topic_j`: Second topic ID
- `metric`: Similarity metric to use. Options:
  - 'jsd': Jensen-Shannon divergence (default, lower is more similar)
  - 'hellinger': Hellinger distance (lower is more similar)
  - 'cosine': Cosine similarity (higher is more similar)
  - 'kl': KL divergence (lower is more similar, asymmetric)

**Returns:**
Similarity/distance value based on chosen metric

<h4 id="ldagibbssampler-visualize_documents">qhchina.analytics.topicmodels.LDAGibbsSampler.visualize_documents() <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/analytics/topicmodels.py#L1505" class="source-link" title="View source on GitHub">[source]</a></h4>

<div class="signature">

```python
visualize_documents(method: str = 'pca', n_clusters: int | None = None, doc_labels: list[str] | None = None, show_labels: bool = False, label_strategy: str = 'auto', use_adjusttext: bool = True, max_labels: int | None = None, figsize: tuple[int, int] | None = None, dpi: int = 150, alpha: float = 0.7, size: float = 50, cmap: str = 'tab10', title: str | None = None, filename: str | None = None, format: str = 'static', random_state: int | None = None, highlight: int | list[int] | None = None, n_topic_words: int = 4, **kwargs)
```

</div>

Visualize documents in 2D space using dimensionality reduction.

Documents are automatically colored by dominant topic, or by k-means clusters if n_clusters is specified.

**Parameters:**
- `method`: Dimensionality reduction method. Options:
  - 'pca': Principal Component Analysis
  - 'tsne': t-SNE
  - 'mds': Multidimensional Scaling
  - 'umap': UMAP (requires umap-learn package)
- `n_clusters`: If specified, apply k-means clustering and color by cluster instead of topic
- `doc_labels`: Optional list of document names/labels (same length as number of documents)
- `show_labels`: Whether to show document labels on the plot
- `label_strategy`: How to handle label display:
  - 'auto': Automatically decide based on number of documents
  - 'all': Show all labels (use adjustText if available)
  - 'sample': Show a random sample of labels (controlled by max_labels)
  - 'none': Don't show any labels
- `use_adjusttext`: Use adjustText package for better label placement (if available)
- `max_labels`: Maximum number of labels to show per topic/cluster (used with 'sample' or 'auto' strategy)
- `figsize`: Figure size as (width, height). If None, automatically scales based on number of documents
- `dpi`: Resolution in dots per inch
- `alpha`: Transparency of points (0-1)
- `size`: Size of scatter plot points
- `cmap`: Colormap to use (matplotlib colormap name)
- `title`: Optional plot title (auto-generated if None)
- `filename`: If provided, save the plot to this file
- `format`: Output format:
  - 'static': Static matplotlib plot
  - 'html': Interactive HTML visualization with hover tooltips
- `random_state`: Random seed for reproducibility
- `highlight`: Topic ID(s) to highlight. Can be a single int or list of ints.
  Only the specified topics will be colored; others will be gray.
  In HTML format, all topics are shown in legend and can be toggled interactively.
- `n_topic_words`: Number of representative words to show for each topic in the legend (default: 4).
  Increase figsize width if using many words to accommodate longer legend labels.
- `**kwargs`: Additional keyword arguments to pass to the dimensionality reduction method.
  For t-SNE: perplexity, learning_rate, max_iter, etc.
  For UMAP: n_neighbors, min_dist, metric, etc.
  For PCA: whiten, svd_solver, tol, etc.
  For MDS: metric, max_iter, eps, etc.

**Returns:**
2D coordinates array of shape (n_docs, 2) if format='static', None if format='html'

<br>

<!-- API-END -->

---

## Examples

**Basic Topic Modeling**

```python
from qhchina.analytics.topicmodels import LDAGibbsSampler
from qhchina.helpers import load_stopwords

# Load stopwords
stopwords = load_stopwords("zh_sim")

# Example tokenized documents
documents = [
    ["人工智能", "正在", "改变", "我们", "的", "生活", "方式"],
    ["医生", "建议", "患者", "多", "喝", "水", "每天", "运动"],
    ["中国", "传统", "文化", "源远流长", "需要", "传承"],
    # More documents...
]

# Create and fit model
lda = LDAGibbsSampler(
    n_topics=5,
    iterations=100,
    burnin=20,
    log_interval=20,
    stopwords=stopwords,
    min_word_count=2,
    estimate_alpha=1
)
lda.fit(documents)

# Get topics
topics = lda.get_topics(n_words=10)
for i, topic in enumerate(topics):
    print(f"Topic {i}:")
    for word, prob in topic:
        print(f"  {word}: {prob:.4f}")

# Visualize topics
lda.plot_topic_words(n_words=10, figsize=(12, 20), filename="topics.png")

# Save model
lda.save("lda_model.npy")

# Load model later
loaded_lda = LDAGibbsSampler.load("lda_model.npy")
```

**Analyzing Documents and Topics**

```python
# Get topic distribution for a specific document
doc_topics = lda.get_document_topics(doc_id=0, sort_by_prob=True)
print(f"Document 0 topics:")
for topic_id, prob in doc_topics:
    print(f"  Topic {topic_id}: {prob:.4f}")

# Infer topics for a new document
new_doc = ["人工智能", "技术", "医疗", "领域"]
topic_dist = lda.inference(new_doc, inference_iterations=50)
print("New document topic distribution:", topic_dist)

# Calculate topic similarity
similarity = lda.topic_similarity(topic_i=0, topic_j=1, metric='jsd')
print(f"Topic similarity: {similarity:.4f}")
```

**Visualizing Documents in 2D Space**

```python
# PCA visualization colored by dominant topic (default)
lda.visualize_documents(
    method='pca',
    figsize=(12, 10),
    dpi=150,
    filename='documents_pca.png'
)

# t-SNE with document labels (sample per topic)
doc_labels = [f"Document_{i}" for i in range(len(documents))]
lda.visualize_documents(
    method='tsne',
    doc_labels=doc_labels,
    show_labels=True,
    label_strategy='sample',  # Show sample of labels per topic
    max_labels=5,             # Show up to 5 documents per topic
    figsize=(14, 12),
    dpi=200,
    filename='documents_tsne.png'
)

# K-means clustering with MDS (specify n_clusters to use k-means)
lda.visualize_documents(
    method='mds',
    n_clusters=3,  # Automatically uses k-means when n_clusters is set
    figsize=(10, 8),
    filename='documents_clusters.png'
)

# Interactive HTML visualization
lda.visualize_documents(
    method='pca',
    doc_labels=doc_labels,
    format='html',  # Creates interactive visualization
    filename='documents_interactive.html'
)

# Highlight specific topics (static plot)
lda.visualize_documents(
    method='pca',
    highlight=[0, 2, 5],  # Only topics 0, 2, and 5 shown in color
    figsize=(12, 10),
    filename='documents_highlighted.png'
)

# Custom number of words in legend (static plot)
lda.visualize_documents(
    method='pca',
    n_topic_words=6,      # Show 6 words per topic in legend
    figsize=(14, 10),     # Wider figure to accommodate longer legend
    filename='documents_6words.png'
)

# Interactive HTML with highlighting and custom topic words
lda.visualize_documents(
    method='tsne',
    doc_labels=doc_labels,
    format='html',
    highlight=[0, 2, 5],  # Initially highlight these topics
    n_topic_words=6,      # Show 6 words per topic in legend
    perplexity=50,        # Custom t-SNE parameter
    filename='documents_custom.html'
)

# UMAP with custom parameters (if umap-learn is installed)
try:
    lda.visualize_documents(
        method='umap',
        doc_labels=doc_labels,
        format='html',
        n_neighbors=15,       # UMAP parameter
        min_dist=0.1,         # UMAP parameter
        filename='documents_umap.html'
    )
except ImportError:
    print("Install umap-learn: pip install umap-learn")
```

**Interactive HTML Features:**

The HTML format creates a standalone file with:
- **Hover tooltips** showing document name/ID and top 3 topic probabilities
- **Click topics** in the legend to toggle highlighting on/off
- **Click points** on the canvas to toggle their topic's highlighting
- **Select All / Deselect All button** to quickly toggle all topics at once
- **Responsive legend** that updates based on highlighted topics
- All topics shown in legend (grayed when not highlighted)

This is useful for exploring large document collections and interactively focusing on specific topics.
