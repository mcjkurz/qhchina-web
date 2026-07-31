---
layout: "docs_with_sidebar"
title: "Text Preprocessing"
permalink: "/docs/preprocessing/"
functions:
  - name: "SegmentationWrapper"
    anchor: "segmentationwrapper"
    url: "/docs/preprocessing/segmentationwrapper/"
    summary: "Base segmentation wrapper class that can be extended for different segmentation tools."
  - name: "SpacySegmenter"
    anchor: "spacysegmenter"
    url: "/docs/preprocessing/spacysegmenter/"
    summary: "Segmentation wrapper for spaCy models."
  - name: "PKUSegmenter"
    anchor: "pkusegmenter"
    url: "/docs/preprocessing/pkusegmenter/"
    summary: "Segmentation wrapper for PKUSeg Chinese text segmentation."
  - name: "JiebaSegmenter"
    anchor: "jiebasegmenter"
    url: "/docs/preprocessing/jiebasegmenter/"
    summary: "Segmentation wrapper for Jieba Chinese text segmentation."
  - name: "BertSegmenter"
    anchor: "bertsegmenter"
    url: "/docs/preprocessing/bertsegmenter/"
    summary: "Segmentation wrapper for BERT-based Chinese word segmentation."
  - name: "LLMSegmenter"
    anchor: "llmsegmenter"
    url: "/docs/preprocessing/llmsegmenter/"
    summary: "Segmentation wrapper using Language Model APIs like OpenAI."
  - name: "HanLPSegmenter"
    anchor: "hanlpsegmenter"
    url: "/docs/preprocessing/hanlpsegmenter/"
    summary: "Segmentation wrapper using HanLP 2.x neural tokenizers."
  - name: "NormalizeOptions"
    anchor: "normalizeoptions"
    url: "/docs/preprocessing/normalizeoptions/"
    summary: "Normalization options dictionary."
  - name: "create_segmenter()"
    anchor: "create-segmenter"
    url: "/docs/preprocessing/create-segmenter/"
    summary: "Create a segmenter based on the specified backend."
  - name: "print_pos_tags()"
    anchor: "print-pos-tags"
    url: "/docs/preprocessing/print-pos-tags/"
    summary: "Print POS (Part-of-Speech) tag documentation for segmentation backends."
  - name: "normalize()"
    anchor: "normalize"
    url: "/docs/preprocessing/normalize/"
    summary: "Normalize Chinese text with specified options."
has_examples: true
import_from: ['qhchina.preprocessing.segmentation', 'qhchina.preprocessing.normalization']
---

# Text Preprocessing

Chinese text lacks explicit word boundaries, making segmentation (tokenization) a necessary first step for most text analysis tasks. The quality of segmentation directly affects downstream analysis, and different segmenters perform better on different text types. The `qhchina.preprocessing` module provides Chinese text segmentation with various backends (spaCy, jieba, pkuseg, BERT) and processing strategies.

```python
from qhchina.preprocessing.segmentation import create_segmenter

segmenter = create_segmenter(backend="spacy", strategy="sentence")
sentences = segmenter.segment("深度学习正在改变世界。自然语言处理是其中一个领域。")
# [['深度', '学习', '正在', '改变', '世界', '。'], ['自然', '语言', '处理', '是', '其中', '一个', '领域', '。']]
```

## Examples

**Basic Segmentation**

```python
from qhchina.preprocessing.segmentation import create_segmenter

# Create a segmenter with default settings
segmenter = create_segmenter(backend="spacy")

# Segment a single text
text = "量子计算将改变密码学的未来"
tokens = segmenter.segment(text)
print(tokens)
# Output: ['量子', '计算', '将', '改变', '密码学', '的', '未来']

# Process sentence by sentence
segmenter = create_segmenter(backend="spacy", strategy="sentence")
long_text = """古代文明的天文观测记录。
量子纠缠现象的神奇特性。
人类意识的哲学讨论。"""
sentences = segmenter.segment(long_text)
# Output: [['古代', '文明', '的', '天文', '观测', '记录', '。'], ...]
```

**With Filters and Custom Dictionary**

```python
from qhchina.helpers import load_stopwords

# Load stopwords
stopwords = load_stopwords("zh_sim")

# Create segmenter with filters
segmenter = create_segmenter(
    backend="spacy",
    model_name="zh_core_web_sm",
    strategy="sentence",
    user_dict=["量子计算", "深度学习"],
    filters={
        "min_word_length": 2,
        "excluded_pos": ["NUM", "SYM"],
        "stopwords": stopwords
    }
)

# Segment text
text = "深度学习模型理解复杂语境。量子计算改变加密技术。"
sentences = segmenter.segment(text)
```

**Integration with Analytics**

```python
from qhchina.preprocessing.segmentation import create_segmenter
from qhchina.analytics.topicmodels import LDAGibbsSampler
from qhchina.helpers import load_texts, load_stopwords

# Load stopwords
stopwords = load_stopwords("zh_sim")

# Create segmenter
segmenter = create_segmenter(
    backend="jieba",
    strategy="sentence",
    filters={"stopwords": stopwords, "min_word_length": 2}
)

# Load and process texts
texts = load_texts(["file1.txt", "file2.txt"])
all_sentences = []
for text in texts:
    sentences = segmenter.segment(text)
    all_sentences.extend(sentences)

# Use with topic modeling
lda = LDAGibbsSampler(n_topics=10, min_word_count=5)
lda.fit(all_sentences)

# Get topics
topics = lda.get_topics(n_words=10)
```


---

## API Reference

<!-- API-START -->

### API Index

Select a symbol to view full documentation:

- [`SegmentationWrapper`](/docs/preprocessing/segmentationwrapper/) - Base segmentation wrapper class that can be extended for different segmentation tools.
- [`SpacySegmenter`](/docs/preprocessing/spacysegmenter/) - Segmentation wrapper for spaCy models.
- [`PKUSegmenter`](/docs/preprocessing/pkusegmenter/) - Segmentation wrapper for PKUSeg Chinese text segmentation.
- [`JiebaSegmenter`](/docs/preprocessing/jiebasegmenter/) - Segmentation wrapper for Jieba Chinese text segmentation.
- [`BertSegmenter`](/docs/preprocessing/bertsegmenter/) - Segmentation wrapper for BERT-based Chinese word segmentation.
- [`LLMSegmenter`](/docs/preprocessing/llmsegmenter/) - Segmentation wrapper using Language Model APIs like OpenAI.
- [`HanLPSegmenter`](/docs/preprocessing/hanlpsegmenter/) - Segmentation wrapper using HanLP 2.x neural tokenizers.
- [`NormalizeOptions`](/docs/preprocessing/normalizeoptions/) - Normalization options dictionary.
- [`create_segmenter()`](/docs/preprocessing/create-segmenter/) - Create a segmenter based on the specified backend.
- [`print_pos_tags()`](/docs/preprocessing/print-pos-tags/) - Print POS (Part-of-Speech) tag documentation for segmentation backends.
- [`normalize()`](/docs/preprocessing/normalize/) - Normalize Chinese text with specified options.

<!-- API-END -->
