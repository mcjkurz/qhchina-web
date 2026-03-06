---
layout: docs_with_sidebar
title: Helper Utilities
permalink: /docs/helpers/
functions:
  - name: LineSentenceFile
    anchor: linesentencefile
  - name: load_font()
    anchor: load_font
  - name: load_fonts()
    anchor: load_fonts
  - name: get_current_font_path()
    anchor: get_current_font_path
  - name: loaded_font()
    anchor: loaded_font
  - name: cache_fonts()
    anchor: cache_fonts
  - name: list_remote_fonts()
    anchor: list_remote_fonts
  - name: list_cached_fonts()
    anchor: list_cached_fonts
  - name: clear_cache()
    anchor: clear_cache
  - name: get_cache_dir()
    anchor: get_cache_dir
  - name: load_text()
    anchor: load_text
  - name: load_texts()
    anchor: load_texts
  - name: load_stopwords()
    anchor: load_stopwords
  - name: split_into_chunks()
    anchor: split_into_chunks
  - name: get_stopword_languages()
    anchor: get_stopword_languages
  - name: detect_encoding()
    anchor: detect_encoding
  - name: download_corpus()
    anchor: download_corpus
  - name: download_file()
    anchor: download_file
  - name: list_remote_corpora()
    anchor: list_remote_corpora
has_examples: True
import_from: qhchina.helpers
include_imported: True
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
from qhchina.helpers import set_font
import matplotlib.pyplot as plt

# Use your own font file
set_font('/path/to/your/custom-font.otf')

# Or use a font from the qhchina-data repository
set_font('NotoSerifTC-Regular.otf')

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

<h3 id="linesentencefile">qhchina.utils.LineSentenceFile <a href="#linesentencefile" class="header-link" title="Permalink">#</a> <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/utils.py#L26" class="source-link" title="View source on GitHub">[source]</a></h3>

<pre class="signature"><code><span class="sig-name">LineSentenceFile</span>(<span class="sig-param">filepath</span><span class="sig-punct">:</span> <span class="sig-type">str</span>, <span class="sig-param">limit</span><span class="sig-punct">:</span> <span class="sig-type">int | None</span> <span class="sig-punct">=</span> <span class="sig-default">None</span>)</code></pre>

Restartable iterable that streams sentences from a text file.

Enables memory-efficient training on large corpora by reading sentences 
directly from disk. File format is one sentence per line, with tokens 
separated by spaces.

**Parameters:**
- `filepath`: Path to the corpus file.
- `limit`: Maximum number of sentences to read. None reads the entire file.

**Example:**
```python
reader = LineSentenceFile("corpus.txt")
for sentence in reader:
    print(sentence)

# Read only the first 1000 sentences
reader = LineSentenceFile("corpus.txt", limit=1000)
```

<br>

<h3 id="load_font">qhchina.helpers.fonts.load_font() <a href="#load_font" class="header-link" title="Permalink">#</a> <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/helpers/fonts.py#L179" class="source-link" title="View source on GitHub">[source]</a></h3>

<pre class="signature"><code><span class="sig-name">load_font</span>(
    <span class="sig-param">remote</span><span class="sig-punct">:</span> <span class="sig-type">str | None</span> <span class="sig-punct">=</span> <span class="sig-default">None</span>,
    <span class="sig-param">path</span><span class="sig-punct">:</span> <span class="sig-type">str | pathlib._local.Path | None</span> <span class="sig-punct">=</span> <span class="sig-default">None</span>,
    <span class="sig-param">force_download</span><span class="sig-punct">:</span> <span class="sig-type">bool</span> <span class="sig-punct">=</span> <span class="sig-default">False</span>
)</code></pre>

Load a font for matplotlib.

**Parameters:**
- `remote`: Font filename from qhchina-data repository (e.g., 'NotoSerifTC-Regular.otf').
  Uses cache if available, downloads otherwise.
- `path`: Path to a local font file.
- `force_download`: If True, re-download from repository even if cached.
  Only applies when using `remote=`. Ignored for `path=`.

**Returns:**
The font name that was set.

**Raises:**
- `ValueError`: If both `remote` and `path` are provided, or if file extension is invalid.
- `FileNotFoundError`: If local `path` does not exist.

**Example:**
```python
from qhchina.helpers import load_font

# Load default font
load_font()
'Noto Sans CJK TC'

# Load specific font from repository
load_font(remote='NotoSerifTC-Regular.otf')
'Noto Serif TC'

# Force re-download
load_font(remote='NotoSerifTC-Regular.otf', force_download=True)
'Noto Serif TC'

# Load local font file
load_font(path='/path/to/MyFont.otf')
'My Font'
```

<br>

<h3 id="load_fonts">qhchina.helpers.fonts.load_fonts() <a href="#load_fonts" class="header-link" title="Permalink">#</a> <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/helpers/fonts.py#L246" class="source-link" title="View source on GitHub">[source]</a></h3>

<pre class="signature"><code><span class="sig-name">load_fonts</span>()</code></pre>

Load the default CJK font for matplotlib.

This is a convenience function for backward compatibility.
Equivalent to calling `load_font()` with no arguments.

**Returns:**
The font name that was set (e.g., 'Noto Sans CJK TC')

**Example:**
```python
from qhchina.helpers import load_fonts
load_fonts()
'Noto Sans CJK TC'
plt.title('中文標題')  # Now works!
```

<br>

<h3 id="get_current_font_path">qhchina.helpers.fonts.get_current_font_path() <a href="#get_current_font_path" class="header-link" title="Permalink">#</a> <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/helpers/fonts.py#L265" class="source-link" title="View source on GitHub">[source]</a></h3>

<pre class="signature"><code><span class="sig-name">get_current_font_path</span>()</code></pre>

Get the file path of the currently loaded font.

This is useful for tools like WordCloud that require a font file path
rather than a font name.

**Returns:**
Absolute path to the currently loaded font file.

**Raises:**
- `RuntimeError`: If no font has been loaded via load_font() yet.

**Example:**
```python
from qhchina.helpers import load_font, get_current_font_path

load_font()  # Load default font
'Noto Sans CJK TC'
path = get_current_font_path()
wc = WordCloud(font_path=path, ...)

load_font(remote='NotoSerifTC-Regular.otf')
'Noto Serif TC'
get_current_font_path()  # Returns path to NotoSerifTC-Regular.otf
```

<br>

<h3 id="loaded_font">qhchina.helpers.fonts.loaded_font() <a href="#loaded_font" class="header-link" title="Permalink">#</a> <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/helpers/fonts.py#L413" class="source-link" title="View source on GitHub">[source]</a></h3>

<pre class="signature"><code><span class="sig-name">loaded_font</span>()</code></pre>

Get the currently loaded matplotlib font name.

**Returns:**
The loaded font name, or None if using matplotlib defaults.

**Example:**
```python
from qhchina.helpers import load_font, loaded_font
load_font(remote='NotoSerifTC-Regular.otf')
'Noto Serif TC'
loaded_font()
'Noto Serif TC'
```

<br>

<h3 id="cache_fonts">qhchina.helpers.fonts.cache_fonts() <a href="#cache_fonts" class="header-link" title="Permalink">#</a> <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/helpers/fonts.py#L305" class="source-link" title="View source on GitHub">[source]</a></h3>

<pre class="signature"><code><span class="sig-name">cache_fonts</span>(<span class="sig-param">fonts</span><span class="sig-punct">:</span> <span class="sig-type">list[str] | None</span> <span class="sig-punct">=</span> <span class="sig-default">None</span>)</code></pre>

Pre-download font files from the qhchina-data repository.

Use this to cache fonts for offline use. The fonts are downloaded
but not set as the active matplotlib font.

**Parameters:**
- `fonts`: List of font file names to download. If None, downloads ALL available fonts.

**Returns:**
Dict mapping file names to font names:
{'NotoSerifTC-Regular.otf': 'Noto Serif TC', ...}

**Raises:**
- `TypeError`: If fonts is not a list or None.
- `ValueError`: If any font file has an invalid extension.

**Example:**
```python
from qhchina.helpers import cache_fonts

# Download all fonts
cache_fonts()
{'NotoSansTCSC-Regular.otf': 'Noto Sans CJK TC', ...}

# Download specific fonts
cache_fonts(['NotoSerifTC-Regular.otf', 'NotoSerifSC-Regular.otf'])
{'NotoSerifTC-Regular.otf': 'Noto Serif TC', ...}
```

<br>

<h3 id="list_remote_fonts">qhchina.helpers.fonts.list_remote_fonts() <a href="#list_remote_fonts" class="header-link" title="Permalink">#</a> <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/helpers/fonts.py#L358" class="source-link" title="View source on GitHub">[source]</a></h3>

<pre class="signature"><code><span class="sig-name">list_remote_fonts</span>()</code></pre>

Query GitHub for available fonts in the qhchina-data repository.

**Returns:**
List of dicts with font information:
[{'file': 'NotoSansTCSC-Regular.otf', 'size': 17279824, 'size_mb': 16.5}, ...]

**Example:**
```python
qhchina.list_remote_fonts()
[{'file': 'NotoSansTCSC-Regular.otf', 'size': 17279824, 'size_mb': 16.5}, ...]
```

<br>

<h3 id="list_cached_fonts">qhchina.helpers.fonts.list_cached_fonts() <a href="#list_cached_fonts" class="header-link" title="Permalink">#</a> <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/helpers/fonts.py#L381" class="source-link" title="View source on GitHub">[source]</a></h3>

<pre class="signature"><code><span class="sig-name">list_cached_fonts</span>()</code></pre>

List fonts currently in the local cache.

**Returns:**
List of dicts with font information:
[{'file': 'NotoSansTCSC-Regular.otf', 'font_name': 'Noto Sans CJK TC', 
  'path': '/Users/.../.cache/qhchina/fonts/NotoSansTCSC-Regular.otf', 
  'size_mb': 16.5}, ...]

<br>

<h3 id="clear_cache">qhchina.helpers.fonts.clear_cache() <a href="#clear_cache" class="header-link" title="Permalink">#</a> <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/helpers/fonts.py#L440" class="source-link" title="View source on GitHub">[source]</a></h3>

<pre class="signature"><code><span class="sig-name">clear_cache</span>()</code></pre>

Remove all cached fonts.

**Example:**
```python
qhchina.clear_cache()
qhchina.list_cached_fonts()
[]
```

<br>

<h3 id="get_cache_dir">qhchina.helpers.fonts.get_cache_dir() <a href="#get_cache_dir" class="header-link" title="Permalink">#</a> <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/helpers/fonts.py#L52" class="source-link" title="View source on GitHub">[source]</a></h3>

<pre class="signature"><code><span class="sig-name">get_cache_dir</span>()</code></pre>

Get the font cache directory path.

**Returns:**
Path to ~/.cache/qhchina/fonts/

<br>

<h3 id="load_text">qhchina.helpers.texts.load_text() <a href="#load_text" class="header-link" title="Permalink">#</a> <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/helpers/texts.py#L62" class="source-link" title="View source on GitHub">[source]</a></h3>

<pre class="signature"><code><span class="sig-name">load_text</span>(<span class="sig-param">filename</span>, <span class="sig-param">encoding</span> <span class="sig-punct">=</span> <span class="sig-default">'utf-8'</span>)</code></pre>

Loads text from a file.

**Parameters:**
- `filename` (str): The filename to load text from.
- `encoding` (str): The encoding of the file. Default is "utf-8".
  Use "auto" to automatically detect the encoding.

**Returns:**
(str) The text content of the file.

<br>

<h3 id="load_texts">qhchina.helpers.texts.load_texts() <a href="#load_texts" class="header-link" title="Permalink">#</a> <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/helpers/texts.py#L83" class="source-link" title="View source on GitHub">[source]</a></h3>

<pre class="signature"><code><span class="sig-name">load_texts</span>(<span class="sig-param">filenames</span>, <span class="sig-param">encoding</span> <span class="sig-punct">=</span> <span class="sig-default">'utf-8'</span>)</code></pre>

Loads text from multiple files.

**Parameters:**
- `filenames` (list): A list of filenames to load text from.
- `encoding` (str): The encoding of the files. Default is "utf-8".
  Use "auto" to automatically detect encoding for each file.

**Returns:**
(list) A list of text contents from the files.

<br>

<h3 id="load_stopwords">qhchina.helpers.texts.load_stopwords() <a href="#load_stopwords" class="header-link" title="Permalink">#</a> <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/helpers/texts.py#L103" class="source-link" title="View source on GitHub">[source]</a></h3>

<pre class="signature"><code><span class="sig-name">load_stopwords</span>(<span class="sig-param">language</span><span class="sig-punct">:</span> <span class="sig-type">str</span> <span class="sig-punct">=</span> <span class="sig-default">'zh_sim'</span>)</code></pre>

Load stopwords from a file for the specified language.

Supports prefix matching: if the language code doesn't match an exact file,
all files starting with that prefix will be loaded and combined.

**Parameters:**
- `language`: Language code or prefix (default: "zh_sim" for simplified Chinese).
  - Exact match: "zh_sim" loads zh_sim.txt only
  - Prefix match: "zh" loads all files starting with "zh" (zh_sim, zh_tr, zh_cl_sim, zh_cl_tr)
  - Prefix match: "zh_cl" loads zh_cl_sim.txt and zh_cl_tr.txt
  Use get_stopword_languages() to see available options.

**Returns:**
Set of stopwords (combined from all matching files)

**Raises:**
- `ValueError`: If no matching stopwords files are found.

<br>

<h3 id="split_into_chunks">qhchina.helpers.texts.split_into_chunks() <a href="#split_into_chunks" class="header-link" title="Permalink">#</a> <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/helpers/texts.py#L197" class="source-link" title="View source on GitHub">[source]</a></h3>

<pre class="signature"><code><span class="sig-name">split_into_chunks</span>(<span class="sig-param">sequence</span>, <span class="sig-param">chunk_size</span>, <span class="sig-param">overlap</span> <span class="sig-punct">=</span> <span class="sig-default">0.0</span>)</code></pre>

Splits text or a list of tokens into chunks with optional overlap between consecutive chunks.

**Parameters:**
- `sequence` (str or list): The text string or list of tokens to be split.
- `chunk_size` (int): The size of each chunk (characters for text, items for lists).
- `overlap` (float): The fraction of overlap between consecutive chunks (0.0 to 1.0).
  Default is 0.0 (no overlap).

**Returns:**
(list) A list of chunks. If input is a string, each chunk is a string.
If input is a list, each chunk is a list of tokens.
Note: The last chunk may be smaller than chunk_size if the sequence
doesn't divide evenly.

**Raises:**
- `ValueError`: If overlap is not between 0 and 1, or if chunk_size is not positive.

<br>

<h3 id="get_stopword_languages">qhchina.helpers.texts.get_stopword_languages() <a href="#get_stopword_languages" class="header-link" title="Permalink">#</a> <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/helpers/texts.py#L171" class="source-link" title="View source on GitHub">[source]</a></h3>

<pre class="signature"><code><span class="sig-name">get_stopword_languages</span>()</code></pre>

Get all available stopword language codes.

**Returns:**
List of available language codes (e.g., ['zh_sim', 'zh_cl_sim', 'zh_cl_tr'])

<br>

<h3 id="detect_encoding">qhchina.helpers.texts.detect_encoding() <a href="#detect_encoding" class="header-link" title="Permalink">#</a> <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/helpers/texts.py#L20" class="source-link" title="View source on GitHub">[source]</a></h3>

<pre class="signature"><code><span class="sig-name">detect_encoding</span>(<span class="sig-param">filename</span>, <span class="sig-param">num_bytes</span> <span class="sig-punct">=</span> <span class="sig-default">10000</span>)</code></pre>

Detects the encoding of a file.

**Parameters:**
- `filename` (str): The path to the file.
- `num_bytes` (int): Number of bytes to read for detection. Default is 10000.
  Larger values may be more accurate but slower.

**Returns:**
(str) The detected encoding (e.g., 'utf-8', 'gb2312', 'gbk', 'big5').

**Raises:**
- `ImportError`: If chardet is not installed.

<br>

<h3 id="download_corpus">qhchina.helpers.texts.download_corpus() <a href="#download_corpus" class="header-link" title="Permalink">#</a> <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/helpers/texts.py#L245" class="source-link" title="View source on GitHub">[source]</a></h3>

<pre class="signature"><code><span class="sig-name">download_corpus</span>(
    <span class="sig-param">name</span><span class="sig-punct">:</span> <span class="sig-type">str</span>,
    <span class="sig-param">parent_dir</span><span class="sig-punct">:</span> <span class="sig-type">str | None</span> <span class="sig-punct">=</span> <span class="sig-default">None</span>,
    <span class="sig-param">show_progress</span><span class="sig-punct">:</span> <span class="sig-type">bool</span> <span class="sig-punct">=</span> <span class="sig-default">True</span>
)</code></pre>

Download a corpus folder from the qhchina-data GitHub repository.

Downloads all .txt files from the specified corpus folder and saves them
to a local directory.

**Parameters:**
- `name`: Corpus name (e.g., "张爱玲", "songshi"). This corresponds to a 
  folder name under ``corpora/`` in the qhchina-data repository.
- `parent_dir`: Parent directory where the corpus folder will be created.
  If None (default), uses the current working directory.
- `show_progress`: If True (default), display a progress bar showing
  cumulative kilobytes downloaded.
      

**Raises:**
- `ImportError`: If requests is not installed.
- `ValueError`: If the corpus is not found or contains no .txt files.
- `requests.RequestException`: If the download fails.

**Example:**
```python
Basic usage::

    from qhchina import download_corpus
    
    # Download to current directory
    download_corpus("张爱玲")
    # Creates ./张爱玲/张爱玲_倾城之恋.txt, ./张爱玲/张爱玲_金锁记.txt, ...
    
    # Download to a specific parent directory
    download_corpus("张爱玲", parent_dir="corpora")
    # Creates ./corpora/张爱玲/...

Full workflow with segmentation and analysis::

    import os
    from qhchina import download_corpus, load_stopwords
    from qhchina.preprocessing import create_segmenter
    from qhchina.analytics import compare_corpora
    
    # Download two corpora
    download_corpus("莫言", parent_dir="corpora")
    download_corpus("张爱玲", parent_dir="corpora")
    
    # Set up segmenter with stopwords
    stopwords = load_stopwords("zh")
    segmenter = create_segmenter(
        backend="jieba", 
        strategy="sentence",
        filters={"stopwords": stopwords}
    )
    
    # Load and segment texts
    moyan_sentences = []
    for filename in os.listdir("corpora/莫言"):
        if filename.endswith(".txt"):
            with open(f"corpora/莫言/{filename}", encoding="utf-8") as f:
                moyan_sentences.extend(segmenter.segment(f.read()))
    
    zal_sentences = []
    for filename in os.listdir("corpora/张爱玲"):
        if filename.endswith(".txt"):
            with open(f"corpora/张爱玲/{filename}", encoding="utf-8") as f:
                zal_sentences.extend(segmenter.segment(f.read()))
    
    # Compare the two corpora using Fisher's exact test
    results = compare_corpora(
        moyan_sentences, zal_sentences,
        filters={"min_count": 5, "max_p": 0.05}
    )
```

<br>

<h3 id="download_file">qhchina.helpers.texts.download_file() <a href="#download_file" class="header-link" title="Permalink">#</a> <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/helpers/texts.py#L389" class="source-link" title="View source on GitHub">[source]</a></h3>

<pre class="signature"><code><span class="sig-name">download_file</span>(<span class="sig-param">path</span><span class="sig-punct">:</span> <span class="sig-type">str</span>, <span class="sig-param">output_dir</span><span class="sig-punct">:</span> <span class="sig-type">str | None</span> <span class="sig-punct">=</span> <span class="sig-default">None</span>)</code></pre>

Download a single file from the qhchina-data GitHub repository.

**Parameters:**
- `path`: Path to the file in the repository (e.g., "corpora/莫言/莫言_丰乳肥臀.txt",
  "fonts/NotoSerifSC-Regular.otf"). The path is relative to the repository root.
- `output_dir`: Directory where the file will be saved. If None (default),
  uses the current working directory.
      

**Raises:**
- `ImportError`: If requests is not installed.
- `ValueError`: If the file is not found.
- `requests.RequestException`: If the download fails.

**Example:**
```python
from qhchina import download_file

# Download to current directory
download_file("corpora/莫言/莫言_丰乳肥臀.txt")
# Creates ./莫言_丰乳肥臀.txt

# Download to a specific directory
download_file("corpora/莫言/莫言_丰乳肥臀.txt", output_dir="texts")
# Creates ./texts/莫言_丰乳肥臀.txt
```

<br>

<h3 id="list_remote_corpora">qhchina.helpers.texts.list_remote_corpora() <a href="#list_remote_corpora" class="header-link" title="Permalink">#</a> <a href="https://github.com/mcjkurz/qhchina/blob/main/qhchina/helpers/texts.py#L455" class="source-link" title="View source on GitHub">[source]</a></h3>

<pre class="signature"><code><span class="sig-name">list_remote_corpora</span>()</code></pre>

List available corpora in the qhchina-data GitHub repository.

**Returns:**
List of corpus names (folder names under ``corpora/``).

**Raises:**
- `ImportError`: If requests is not installed.
- `requests.RequestException`: If the API request fails.

**Example:**
```python
from qhchina import list_remote_corpora
corpora = list_remote_corpora()
print(corpora)
['张爱玲', '沈从文', '莫言', ...]
```

<br>

<!-- API-END -->
