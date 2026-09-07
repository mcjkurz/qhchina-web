---
layout: "docs_with_sidebar"
title: "Topic Modeling"
permalink: "/docs/topic_modeling/"
functions:
  - name: "LDAGibbsSampler"
    anchor: "ldagibbssampler"
    url: "/docs/topic_modeling/ldagibbssampler/"
    summary: "Latent Dirichlet Allocation with Gibbs sampling implementation."
  - name: "LDAGibbsSampler.coherence()"
    anchor: "ldagibbssampler-coherence"
    url: "/docs/topic_modeling/ldagibbssampler/#ldagibbssampler-coherence"
    summary: "Calculate topic coherence using the specified method."
  - name: "LDAGibbsSampler.coherence_npmi()"
    anchor: "ldagibbssampler-coherence_npmi"
    url: "/docs/topic_modeling/ldagibbssampler/#ldagibbssampler-coherence_npmi"
    summary: "Calculate NPMI (Normalized Pointwise Mutual Information) topic coherence."
  - name: "LDAGibbsSampler.coherence_umass()"
    anchor: "ldagibbssampler-coherence_umass"
    url: "/docs/topic_modeling/ldagibbssampler/#ldagibbssampler-coherence_umass"
    summary: "Calculate UMass topic coherence (Mimno et al., 2011)."
  - name: "LDAGibbsSampler.document_similarity()"
    anchor: "ldagibbssampler-document_similarity"
    url: "/docs/topic_modeling/ldagibbssampler/#ldagibbssampler-document_similarity"
    summary: "Calculate similarity between two documents based on their topic distributions."
  - name: "LDAGibbsSampler.document_similarity_matrix()"
    anchor: "ldagibbssampler-document_similarity_matrix"
    url: "/docs/topic_modeling/ldagibbssampler/#ldagibbssampler-document_similarity_matrix"
    summary: "Calculate pairwise similarity/distance between documents."
  - name: "LDAGibbsSampler.evaluate()"
    anchor: "ldagibbssampler-evaluate"
    url: "/docs/topic_modeling/ldagibbssampler/#ldagibbssampler-evaluate"
    summary: "Comprehensive evaluation of the topic model."
  - name: "LDAGibbsSampler.fit()"
    anchor: "ldagibbssampler-fit"
    url: "/docs/topic_modeling/ldagibbssampler/#ldagibbssampler-fit"
    summary: "Fit the LDA model to the given documents."
  - name: "LDAGibbsSampler.get_document_topics()"
    anchor: "ldagibbssampler-get_document_topics"
    url: "/docs/topic_modeling/ldagibbssampler/#ldagibbssampler-get_document_topics"
    summary: "Get topic distribution for a specific document."
  - name: "LDAGibbsSampler.get_top_documents()"
    anchor: "ldagibbssampler-get_top_documents"
    url: "/docs/topic_modeling/ldagibbssampler/#ldagibbssampler-get_top_documents"
    summary: "Get the top n documents for a specific topic."
  - name: "LDAGibbsSampler.get_topic_distribution()"
    anchor: "ldagibbssampler-get_topic_distribution"
    url: "/docs/topic_modeling/ldagibbssampler/#ldagibbssampler-get_topic_distribution"
    summary: "Get overall topic distribution across the corpus."
  - name: "LDAGibbsSampler.get_topic_words()"
    anchor: "ldagibbssampler-get_topic_words"
    url: "/docs/topic_modeling/ldagibbssampler/#ldagibbssampler-get_topic_words"
    summary: "Get the top n words for a specific topic."
  - name: "LDAGibbsSampler.get_topics()"
    anchor: "ldagibbssampler-get_topics"
    url: "/docs/topic_modeling/ldagibbssampler/#ldagibbssampler-get_topics"
    summary: "Get the top words for each topic along with their probabilities."
  - name: "LDAGibbsSampler.inference()"
    anchor: "ldagibbssampler-inference"
    url: "/docs/topic_modeling/ldagibbssampler/#ldagibbssampler-inference"
    summary: "Infer topic distribution for a new document."
  - name: "LDAGibbsSampler.initialize()"
    anchor: "ldagibbssampler-initialize"
    url: "/docs/topic_modeling/ldagibbssampler/#ldagibbssampler-initialize"
    summary: "Initialize data structures for Gibbs sampling."
  - name: "LDAGibbsSampler.load()"
    anchor: "ldagibbssampler-load"
    url: "/docs/topic_modeling/ldagibbssampler/#ldagibbssampler-load"
    summary: "Load a model from a file."
  - name: "LDAGibbsSampler.perplexity()"
    anchor: "ldagibbssampler-perplexity"
    url: "/docs/topic_modeling/ldagibbssampler/#ldagibbssampler-perplexity"
    summary: "Calculate perplexity of the model on the training data."
  - name: "LDAGibbsSampler.plot_topic_words()"
    anchor: "ldagibbssampler-plot_topic_words"
    url: "/docs/topic_modeling/ldagibbssampler/#ldagibbssampler-plot_topic_words"
    summary: "Plot the top words for each topic as a bar chart."
  - name: "LDAGibbsSampler.preprocess()"
    anchor: "ldagibbssampler-preprocess"
    url: "/docs/topic_modeling/ldagibbssampler/#ldagibbssampler-preprocess"
    summary: "Convert token documents to word IDs and build vocabulary."
  - name: "LDAGibbsSampler.run_gibbs_sampling()"
    anchor: "ldagibbssampler-run_gibbs_sampling"
    url: "/docs/topic_modeling/ldagibbssampler/#ldagibbssampler-run_gibbs_sampling"
    summary: "Run Gibbs sampling for the specified number of iterations."
  - name: "LDAGibbsSampler.save()"
    anchor: "ldagibbssampler-save"
    url: "/docs/topic_modeling/ldagibbssampler/#ldagibbssampler-save"
    summary: "Save the model to a file."
  - name: "LDAGibbsSampler.topic_correlation_matrix()"
    anchor: "ldagibbssampler-topic_correlation_matrix"
    url: "/docs/topic_modeling/ldagibbssampler/#ldagibbssampler-topic_correlation_matrix"
    summary: "Calculate pairwise similarity/distance between all topics."
  - name: "LDAGibbsSampler.topic_similarity()"
    anchor: "ldagibbssampler-topic_similarity"
    url: "/docs/topic_modeling/ldagibbssampler/#ldagibbssampler-topic_similarity"
    summary: "Calculate similarity between two topics."
  - name: "LDAGibbsSampler.train_multiple()"
    anchor: "ldagibbssampler-train_multiple"
    url: "/docs/topic_modeling/ldagibbssampler/#ldagibbssampler-train_multiple"
    summary: "Train multiple LDA models with different random seeds and analyze robustness."
  - name: "LDAGibbsSampler.visualize_documents()"
    anchor: "ldagibbssampler-visualize_documents"
    url: "/docs/topic_modeling/ldagibbssampler/#ldagibbssampler-visualize_documents"
    summary: "Visualize documents in 2D space using dimensionality reduction."
has_examples: true
import_from: "qhchina.analytics.topicmodels"
---

# Topic Modeling

Topic modeling is an unsupervised method for discovering abstract themes that run through a collection of documents. It assumes documents are mixtures of topics, where each topic is characterized by a distribution over words. The `qhchina.analytics.topicmodels` module provides Latent Dirichlet Allocation (LDA) with Gibbs sampling for discovering thematic structure in document collections.

```python
from qhchina.analytics.topicmodels import LDAGibbsSampler

lda = LDAGibbsSampler(n_topics=10, iterations=100)
lda.fit(documents)  # documents = list of tokenized texts
topics = lda.get_topics(n_words=10)  # Get top words per topic
```

## Examples

**Basic Topic Modeling**

```python
from qhchina.analytics.topicmodels import LDAGibbsSampler

# Tokenized literary documents
documents = [
    ["爱情", "自由", "追求", "理想"],
    ["故乡", "童年", "回忆", "母亲"],
    ["革命", "青年", "觉醒", "斗争"],
]

# Train model
lda = LDAGibbsSampler(n_topics=5, iterations=100)
lda.fit(documents)

# View topics
for i, topic in enumerate(lda.get_topics(n_words=5)):
    words = [w for w, p in topic]
    print(f"Topic {i}: {', '.join(words)}")

# Save/load
lda.save("model.npy")
lda = LDAGibbsSampler.load("model.npy")
```

**Comparing Topics Across Literary Periods**

```python
from qhchina.analytics.topicmodels import LDAGibbsSampler

lda_early = LDAGibbsSampler(n_topics=5, iterations=100)
lda_late = LDAGibbsSampler(n_topics=5, iterations=100)

# each text is a list of tokens
may_fourth = [text1, text2, text3, ...]
contemporary = [text1, text2, text3, ...]

lda_early.fit(may_fourth)
lda_late.fit(contemporary)

# How did literary themes evolve?
print("1920s themes:", lda_early.get_topics(n_words=5))
print("2000s themes:", lda_late.get_topics(n_words=5))
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


---

## API Reference

<!-- API-START -->

### API Index

Select a symbol to view full documentation:

- [`LDAGibbsSampler`](/docs/topic_modeling/ldagibbssampler/) - Latent Dirichlet Allocation with Gibbs sampling implementation.
- [`LDAGibbsSampler.coherence()`](/docs/topic_modeling/ldagibbssampler/#ldagibbssampler-coherence) - Calculate topic coherence using the specified method.
- [`LDAGibbsSampler.coherence_npmi()`](/docs/topic_modeling/ldagibbssampler/#ldagibbssampler-coherence_npmi) - Calculate NPMI (Normalized Pointwise Mutual Information) topic coherence.
- [`LDAGibbsSampler.coherence_umass()`](/docs/topic_modeling/ldagibbssampler/#ldagibbssampler-coherence_umass) - Calculate UMass topic coherence (Mimno et al., 2011).
- [`LDAGibbsSampler.document_similarity()`](/docs/topic_modeling/ldagibbssampler/#ldagibbssampler-document_similarity) - Calculate similarity between two documents based on their topic distributions.
- [`LDAGibbsSampler.document_similarity_matrix()`](/docs/topic_modeling/ldagibbssampler/#ldagibbssampler-document_similarity_matrix) - Calculate pairwise similarity/distance between documents.
- [`LDAGibbsSampler.evaluate()`](/docs/topic_modeling/ldagibbssampler/#ldagibbssampler-evaluate) - Comprehensive evaluation of the topic model.
- [`LDAGibbsSampler.fit()`](/docs/topic_modeling/ldagibbssampler/#ldagibbssampler-fit) - Fit the LDA model to the given documents.
- [`LDAGibbsSampler.get_document_topics()`](/docs/topic_modeling/ldagibbssampler/#ldagibbssampler-get_document_topics) - Get topic distribution for a specific document.
- [`LDAGibbsSampler.get_top_documents()`](/docs/topic_modeling/ldagibbssampler/#ldagibbssampler-get_top_documents) - Get the top n documents for a specific topic.
- [`LDAGibbsSampler.get_topic_distribution()`](/docs/topic_modeling/ldagibbssampler/#ldagibbssampler-get_topic_distribution) - Get overall topic distribution across the corpus.
- [`LDAGibbsSampler.get_topic_words()`](/docs/topic_modeling/ldagibbssampler/#ldagibbssampler-get_topic_words) - Get the top n words for a specific topic.
- [`LDAGibbsSampler.get_topics()`](/docs/topic_modeling/ldagibbssampler/#ldagibbssampler-get_topics) - Get the top words for each topic along with their probabilities.
- [`LDAGibbsSampler.inference()`](/docs/topic_modeling/ldagibbssampler/#ldagibbssampler-inference) - Infer topic distribution for a new document.
- [`LDAGibbsSampler.initialize()`](/docs/topic_modeling/ldagibbssampler/#ldagibbssampler-initialize) - Initialize data structures for Gibbs sampling.
- [`LDAGibbsSampler.load()`](/docs/topic_modeling/ldagibbssampler/#ldagibbssampler-load) - Load a model from a file.
- [`LDAGibbsSampler.perplexity()`](/docs/topic_modeling/ldagibbssampler/#ldagibbssampler-perplexity) - Calculate perplexity of the model on the training data.
- [`LDAGibbsSampler.plot_topic_words()`](/docs/topic_modeling/ldagibbssampler/#ldagibbssampler-plot_topic_words) - Plot the top words for each topic as a bar chart.
- [`LDAGibbsSampler.preprocess()`](/docs/topic_modeling/ldagibbssampler/#ldagibbssampler-preprocess) - Convert token documents to word IDs and build vocabulary.
- [`LDAGibbsSampler.run_gibbs_sampling()`](/docs/topic_modeling/ldagibbssampler/#ldagibbssampler-run_gibbs_sampling) - Run Gibbs sampling for the specified number of iterations.
- [`LDAGibbsSampler.save()`](/docs/topic_modeling/ldagibbssampler/#ldagibbssampler-save) - Save the model to a file.
- [`LDAGibbsSampler.topic_correlation_matrix()`](/docs/topic_modeling/ldagibbssampler/#ldagibbssampler-topic_correlation_matrix) - Calculate pairwise similarity/distance between all topics.
- [`LDAGibbsSampler.topic_similarity()`](/docs/topic_modeling/ldagibbssampler/#ldagibbssampler-topic_similarity) - Calculate similarity between two topics.
- [`LDAGibbsSampler.train_multiple()`](/docs/topic_modeling/ldagibbssampler/#ldagibbssampler-train_multiple) - Train multiple LDA models with different random seeds and analyze robustness.
- [`LDAGibbsSampler.visualize_documents()`](/docs/topic_modeling/ldagibbssampler/#ldagibbssampler-visualize_documents) - Visualize documents in 2D space using dimensionality reduction.

<!-- API-END -->
