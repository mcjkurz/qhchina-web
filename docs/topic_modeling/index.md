---
layout: "docs_with_sidebar"
title: "Topic Modeling"
permalink: "/docs/topic_modeling/"
functions:
  - name: "LDAGibbsSampler"
    anchor: "ldagibbssampler"
    url: "/docs/topic_modeling/ldagibbssampler/"
    summary: "Latent Dirichlet Allocation with Gibbs sampling implementation."
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

<!-- API-END -->
