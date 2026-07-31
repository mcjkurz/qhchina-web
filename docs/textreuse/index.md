---
layout: "docs_with_sidebar"
title: "Text Reuse"
permalink: "/docs/textreuse/"
functions:
  - name: "find_shared_sequences()"
    anchor: "find-shared-sequences"
    url: "/docs/textreuse/find-shared-sequences/"
    summary: "Find shared sequences (text reuse) across a collection of documents."
has_examples: true
import_from: "qhchina.analytics.textreuse"
---

# Text Reuse

Text reuse detection identifies shared or near-duplicate passages across documents, a common task in historical and literary corpus analysis. The `qhchina.analytics.textreuse` module uses a seed-and-extend algorithm (similar to BLAST in bioinformatics) that finds exact n-gram matches as seeds, merges nearby seeds into passage candidates, and verifies each with banded edit distance. This allows fuzzy matching — tolerating insertions, deletions, and substitutions — while remaining fast at scale.

---

## API Reference

<!-- API-START -->

### API Index

Select a symbol to view full documentation:

- [`find_shared_sequences()`](/docs/textreuse/find-shared-sequences/) - Find shared sequences (text reuse) across a collection of documents.

<!-- API-END -->
