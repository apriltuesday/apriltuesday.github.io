---
layout: post
title: "Question Answering Track"
date: 2019-06-05 11:00:00
category: blog
---

Part of my series of notes from [NAACL-HLT 2019](https://naacl2019.org/) in Minneapolis.

## Bidirectional Attentive Memory Networks for QA over KB
* question answering from knowledge bases
* approaches: semantic parsing vs. information retrieval
* IR more E2E trainable, fewer hand-crafted rules
    * question asker disputes this vehemently given current SP work :stuck_out_tongue:
* candidate answers from KB subgraphs
    * encode answer type, path, context
* existing approaches encode questions & KB independently, without considering interactions
    * hence bidirectional attentive memory network to encode both jointly
* then we went into the very complicated, probably super awesome architecture, at which point I stopped paying attention (bidirectional or otherwise)

## BoolQ: the Surprising Difficulty of Yes/No Questions
* motivation: testing inference is difficult
* crowdsourcing interesting / unusual examples of inference is tricky
* recognising entailment is an artificial task
* natural yes/no question data can help here
    * quite challenging
    * well-defined end task
* question, passage, binary answer
* use anonymised queries from Google
    * annotated for yes/no answers and paragraphs from Wikipedia
    * pretty expensive data to collect (and we're not all Google either...)
* some analysis of the dataset...
* type of reasoning needed to answer the question
    * paraphrasing – quite explicitly stated
    * by example (or counterexample)
    * factual reasoning / grounded knowledge
    * implicit – complicated
    * missing mention – if it were yes (or no), it would have been mentioned
    * big bucket of other stuff
* most experiments around transfer learning
    * transfer from other types of questions, entailment, paraphrasing...
    * also some unsupervised pretrained models
* entailment helps a lot
* "as we've come to expect, BERT does the best"
* but adding MNLI helps even BERT
* [go explore the data](goo.gl/boolq), also will become part of SuperGLUE

## 
