# Pandoc document template

## Description

This repository contains a simple template for building
[Pandoc](http://pandoc.org/) documents; Pandoc is a suite of tools to compile
markdown files into readable files (PDF, EPUB, HTML...).

## Usage

### Installing

In order to use this makefile you will need to make sure that the following
dependencies are installed on your system:

- GNU make
- Pandoc
- LuaLaTeX
- DejaVu Sans fonts

### Folder structure

Here's a folder structure for a Pandoc document:

```
my-document/     # Root directory.
|- build/        # Folder used to store builded (output) files.
|- src/          # Markdowns files; one for each chapter.
|- images/       # Images folder.
|- metadata.yml  # Metadata content (title, author...).
|- Makefile      # Makefile used for building our documents.
```

### Setup generic data

Edit the _metadata.yml_ file to set configuration data:

```yml
---
title: My document title
author: Ralph Huwiler
rights: Creative Commons Attribution 4.0 International
language: en-US
tags: [document, my-document, etc]
abstract: |
  Your summary text.
---
```

You can find the list of all available keys on [Key Page
](http://pandoc.org/MANUAL.html#extension-yaml_metadata_block).

### Creating chapters

Creating a new chapter is as simple as creating a new markdown file in the
_src/_ folder; you'll end up with something like this:

```
src/01-introduction.md
src/02-installation.md
src/03-usage.md
src/04-references.md
```

Pandoc and Make will join them automatically ordered by name; that's why the
numeric prefixes are being used.

All you need to specify for each chapter at least one title:

-- END OF DOCUMENTATION FILE -- 