---
layout: "docs_with_sidebar"
title: "Collocation Analysis"
permalink: "/docs/collocations/"
functions:
  - name: "CoocMatrix"
    anchor: "coocmatrix"
    url: "/docs/collocations/coocmatrix/"
    summary: "Co-occurrence matrix with numpy-like indexing by word or index."
  - name: "find_collocates()"
    anchor: "find-collocates"
    url: "/docs/collocations/find-collocates/"
    summary: "Find collocates for target words in a corpus of sentences."
  - name: "cooc_matrix()"
    anchor: "cooc-matrix"
    url: "/docs/collocations/cooc-matrix/"
    summary: "Calculate a co-occurrence matrix from a corpus of documents."
  - name: "plot_collocates()"
    anchor: "plot-collocates"
    url: "/docs/collocations/plot-collocates/"
    summary: "Visualize collocation results as a 2D scatter plot."
  - name: "kwic()"
    anchor: "kwic"
    url: "/docs/collocations/kwic/"
    summary: "Generate a Keywords in Context (KWIC) concordance for target words."
  - name: "compare_collocates()"
    anchor: "compare-collocates"
    url: "/docs/collocations/compare-collocates/"
    summary: "Compare collocates of target words between two corpora."
has_examples: true
import_from: "qhchina.analytics.collocations"
---

# Collocation Analysis

Collocations are word combinations that occur together more frequently than expected by chance, revealing meaningful linguistic patterns and conceptual associations. Statistical measures like log-likelihood and chi-square help distinguish genuine collocations from random co-occurrences. The `qhchina.analytics.collocations` module provides tools for identifying and analyzing these patterns in Chinese text.

```python
from qhchina.analytics.collocations import find_collocates

collocates = find_collocates(sentences, target_words=["经济"], horizon=5)
top_collocates = collocates.sort_values("p_value").head(10)  # Most significant collocates
```

---

## Examples

**Finding Collocates**

```python
from qhchina.analytics.collocations import find_collocates

sentences = [
    ["追求", "自由", "理想", "青年"],
    ["爱情", "自由", "婚姻", "传统"],
    ["思想", "自由", "解放", "革命"],
]

# Find collocates of "自由"
collocates = find_collocates(
    sentences,
    target_words=["自由"],
    horizon=3,
    filters={'max_p': 0.05}
)

# Top results
print(collocates.head())
```

**Comparing Collocates Across Authors**

```python
from qhchina.analytics.collocations import find_collocates

luxun_collocates = find_collocates(luxun_texts, ["爱情"], horizon=3)
bingxin_collocates = find_collocates(bingxin_texts, ["爱情"], horizon=3)
```

**Directional Collocates**

```python
# Words to the RIGHT of target
right = find_collocates(sentences, ["自由"], horizon=(0, 3))

# Words to the LEFT of target  
left = find_collocates(sentences, ["自由"], horizon=(3, 0))
```

**Visualizing Collocates**

```python
from qhchina.analytics.collocations import find_collocates, plot_collocates

# Find collocates
collocates = find_collocates(
    sentences=sentences,
    target_words=["自由"],
    alternative='two-sided',
    filters={'max_p': 0.05, 'min_obs_local': 2}
)

# Default: ratio vs p-value (log scales)
plot_collocates(collocates, title="Collocates of 自由")

# Observed vs expected with diagonal reference line
plot_collocates(
    collocates,
    x_col='exp_local',
    y_col='obs_local',
    x_scale='log',
    y_scale='log',
    show_diagonal=True,
    title='Observed vs Expected'
)

# Color by ratio, label top 15 most strongly associated
plot_collocates(
    collocates,
    x_col='obs_global',
    y_col='p_value',
    color_by='ratio_local',
    colormap='RdYlBu_r',
    show_labels=True,
    label_top_n=15,
    title='Corpus Frequency vs Significance'
)
```

**Creating Co-occurrence Matrix**

```python
from qhchina.analytics.collocations import cooc_matrix

# Create co-occurrence matrix (returns CoocMatrix object)
matrix = cooc_matrix(
    documents=sentences,
    method="window",
    horizon=2,
    min_word_count=2
)

# Access co-occurrence counts with flexible indexing
target_word = "经济"
if target_word in matrix.vocab:
    cooc_with_target = matrix[target_word]  # Returns dict {word: count}
    print(f"Words co-occurring with '{target_word}':")
    for word, count in sorted(cooc_with_target.items(), key=lambda x: -x[1])[:10]:
        print(f"  {word}: {count}")

# Get a specific pair count
count = matrix["经济", "发展"]

# Convert to DataFrame if needed
df = matrix.to_dataframe()
```

---

## API Reference

<!-- API-START -->

### API Index

Select a symbol to view full documentation:

- [`CoocMatrix`](/docs/collocations/coocmatrix/) - Co-occurrence matrix with numpy-like indexing by word or index.
- [`find_collocates()`](/docs/collocations/find-collocates/) - Find collocates for target words in a corpus of sentences.
- [`cooc_matrix()`](/docs/collocations/cooc-matrix/) - Calculate a co-occurrence matrix from a corpus of documents.
- [`plot_collocates()`](/docs/collocations/plot-collocates/) - Visualize collocation results as a 2D scatter plot.
- [`kwic()`](/docs/collocations/kwic/) - Generate a Keywords in Context (KWIC) concordance for target words.
- [`compare_collocates()`](/docs/collocations/compare-collocates/) - Compare collocates of target words between two corpora.

<!-- API-END -->
