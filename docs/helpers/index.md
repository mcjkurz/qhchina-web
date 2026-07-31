---
layout: "docs_with_sidebar"
title: "Helper Utilities"
permalink: "/docs/helpers/"
functions:
  - name: "LineSentenceFile"
    anchor: "linesentencefile"
    url: "/docs/helpers/linesentencefile/"
    summary: "Restartable iterable that streams sentences from a text file."
  - name: "load_font()"
    anchor: "load-font"
    url: "/docs/helpers/load-font/"
    summary: "Load a font and set it as the active font for matplotlib."
  - name: "load_fonts()"
    anchor: "load-fonts"
    url: "/docs/helpers/load-fonts/"
    summary: "Load the default CJK font for matplotlib."
  - name: "get_current_font_name()"
    anchor: "get-current-font-name"
    url: "/docs/helpers/get-current-font-name/"
    summary: "Get the currently loaded matplotlib font name."
  - name: "get_current_font_path()"
    anchor: "get-current-font-path"
    url: "/docs/helpers/get-current-font-path/"
    summary: "Get the file path of the currently loaded font."
  - name: "download_fonts()"
    anchor: "download-fonts"
    url: "/docs/helpers/download-fonts/"
    summary: "Pre-download font files from the qhchina-data repository."
  - name: "list_remote_fonts()"
    anchor: "list-remote-fonts"
    url: "/docs/helpers/list-remote-fonts/"
    summary: "Query GitHub for available fonts in the qhchina-data repository."
  - name: "list_cached_fonts()"
    anchor: "list-cached-fonts"
    url: "/docs/helpers/list-cached-fonts/"
    summary: "List fonts currently in the local cache."
  - name: "clear_cache()"
    anchor: "clear-cache"
    url: "/docs/helpers/clear-cache/"
    summary: "Remove all cached fonts."
  - name: "get_cache_dir()"
    anchor: "get-cache-dir"
    url: "/docs/helpers/get-cache-dir/"
    summary: "Get the font cache directory path."
  - name: "load_text()"
    anchor: "load-text"
    url: "/docs/helpers/load-text/"
    summary: "Loads text from a file."
  - name: "load_texts()"
    anchor: "load-texts"
    url: "/docs/helpers/load-texts/"
    summary: "Loads text from multiple files."
  - name: "load_stopwords()"
    anchor: "load-stopwords"
    url: "/docs/helpers/load-stopwords/"
    summary: "Load stopwords from a file for the specified language."
  - name: "split_into_chunks()"
    anchor: "split-into-chunks"
    url: "/docs/helpers/split-into-chunks/"
    summary: "Splits text or a list of tokens into chunks with optional overlap between consecutive chunks."
  - name: "get_stopword_languages()"
    anchor: "get-stopword-languages"
    url: "/docs/helpers/get-stopword-languages/"
    summary: "Get all available stopword language codes."
  - name: "detect_encoding()"
    anchor: "detect-encoding"
    url: "/docs/helpers/detect-encoding/"
    summary: "Detects the encoding of a file."
  - name: "download_corpus()"
    anchor: "download-corpus"
    url: "/docs/helpers/download-corpus/"
    summary: "Download a corpus folder from the qhchina-data GitHub repository."
  - name: "download_file()"
    anchor: "download-file"
    url: "/docs/helpers/download-file/"
    summary: "Download a single file from the qhchina-data GitHub repository."
  - name: "list_remote_corpora()"
    anchor: "list-remote-corpora"
    url: "/docs/helpers/list-remote-corpora/"
    summary: "List available corpora in the qhchina-data GitHub repository."
  - name: "iter_batches()"
    anchor: "iter-batches"
    url: "/docs/helpers/iter-batches/"
    summary: "Yield batches of tokenized texts grouped by total token count."
  - name: "build_vocab_from_iter()"
    anchor: "build-vocab-from-iter"
    url: "/docs/helpers/build-vocab-from-iter/"
    summary: "Build vocabulary statistics by streaming through tokenized texts (pass 1 of 2)."
  - name: "rolling_average()"
    anchor: "rolling-average"
    url: "/docs/helpers/rolling-average/"
    summary: "Calculate rolling (moving) average over a list of values."
  - name: "apply_p_value_correction()"
    anchor: "apply-p-value-correction"
    url: "/docs/helpers/apply-p-value-correction/"
    summary: "Apply multiple testing correction to a list of p-values."
  - name: "validate_filters()"
    anchor: "validate-filters"
    url: "/docs/helpers/validate-filters/"
    summary: "Validate that all filter keys are recognized."
has_examples: true
import_from: "qhchina.helpers"
include_imported: true
---

# Helper Utilities

Working with Chinese text often requires proper font configuration for visualization and access to standard resources like stopword lists. The `qhchina.helpers` module provides utilities for font management, text loading, and common preprocessing tasks.

## Examples

**Basic Font Setup**

```python
from qhchina.helpers import load_fonts
import matplotlib.pyplot as plt

# Load the default CJK font for matplotlib
load_fonts()

# Create a plot with Chinese text
plt.figure(figsize=(8, 6))
plt.title('中國古典詩歌分析')
plt.xlabel('時間')
plt.ylabel('頻率')
plt.show()
```

**Using Custom Fonts**

```python
from qhchina.helpers import load_font
import matplotlib.pyplot as plt

# Use your own local font file
load_font(path='/path/to/your/custom-font.otf')

# Or use a font from the qhchina-data repository
load_font(remote='NotoSerifTC-Regular.otf')

# Now your plots will use the custom font
plt.figure(figsize=(8, 6))
plt.title('使用自定義字體')
plt.show()
```

**Loading Texts and Stopwords**

```python
from qhchina.helpers import load_text, load_texts, load_stopwords, split_into_chunks
from qhchina.helpers.texts import detect_encoding, get_stopword_languages

# Load a single text file
text = load_text('document.txt')

# Load with automatic encoding detection (requires chardet)
text = load_text('古文.txt', encoding='auto')

# Detect encoding manually
encoding = detect_encoding('古文.txt')
print(f"Detected encoding: {encoding}")

# Load multiple files
texts = load_texts(['file1.txt', 'file2.txt', 'file3.txt'])

# See available stopword languages
languages = get_stopword_languages()
print(f"Available: {languages}")  # ['zh_cl_sim', 'zh_cl_tr', 'zh_sim', 'zh_tr']

# Load stopwords
stopwords = load_stopwords('zh_sim')

# Split long text into chunks
chunks = split_into_chunks(text, chunk_size=1000, overlap=0.1)
```


---

## API Reference

<!-- API-START -->

### API Index

Select a symbol to view full documentation:

- [`LineSentenceFile`](/docs/helpers/linesentencefile/) - Restartable iterable that streams sentences from a text file.
- [`load_font()`](/docs/helpers/load-font/) - Load a font and set it as the active font for matplotlib.
- [`load_fonts()`](/docs/helpers/load-fonts/) - Load the default CJK font for matplotlib.
- [`get_current_font_name()`](/docs/helpers/get-current-font-name/) - Get the currently loaded matplotlib font name.
- [`get_current_font_path()`](/docs/helpers/get-current-font-path/) - Get the file path of the currently loaded font.
- [`download_fonts()`](/docs/helpers/download-fonts/) - Pre-download font files from the qhchina-data repository.
- [`list_remote_fonts()`](/docs/helpers/list-remote-fonts/) - Query GitHub for available fonts in the qhchina-data repository.
- [`list_cached_fonts()`](/docs/helpers/list-cached-fonts/) - List fonts currently in the local cache.
- [`clear_cache()`](/docs/helpers/clear-cache/) - Remove all cached fonts.
- [`get_cache_dir()`](/docs/helpers/get-cache-dir/) - Get the font cache directory path.
- [`load_text()`](/docs/helpers/load-text/) - Loads text from a file.
- [`load_texts()`](/docs/helpers/load-texts/) - Loads text from multiple files.
- [`load_stopwords()`](/docs/helpers/load-stopwords/) - Load stopwords from a file for the specified language.
- [`split_into_chunks()`](/docs/helpers/split-into-chunks/) - Splits text or a list of tokens into chunks with optional overlap between consecutive chunks.
- [`get_stopword_languages()`](/docs/helpers/get-stopword-languages/) - Get all available stopword language codes.
- [`detect_encoding()`](/docs/helpers/detect-encoding/) - Detects the encoding of a file.
- [`download_corpus()`](/docs/helpers/download-corpus/) - Download a corpus folder from the qhchina-data GitHub repository.
- [`download_file()`](/docs/helpers/download-file/) - Download a single file from the qhchina-data GitHub repository.
- [`list_remote_corpora()`](/docs/helpers/list-remote-corpora/) - List available corpora in the qhchina-data GitHub repository.
- [`iter_batches()`](/docs/helpers/iter-batches/) - Yield batches of tokenized texts grouped by total token count.
- [`build_vocab_from_iter()`](/docs/helpers/build-vocab-from-iter/) - Build vocabulary statistics by streaming through tokenized texts (pass 1 of 2).
- [`rolling_average()`](/docs/helpers/rolling-average/) - Calculate rolling (moving) average over a list of values.
- [`apply_p_value_correction()`](/docs/helpers/apply-p-value-correction/) - Apply multiple testing correction to a list of p-values.
- [`validate_filters()`](/docs/helpers/validate-filters/) - Validate that all filter keys are recognized.

<!-- API-END -->
