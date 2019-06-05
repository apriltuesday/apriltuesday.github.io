---
layout: post
title: "Semantics Track"
date: 2019-06-04 11:00:00
category: blog
---

Part of my series of notes from [NAACL-HLT 2019](https://naacl2019.org/) in Minneapolis.

## Word-Node2Vec
* local (e.g. skipgram) vs. non-local (e.g. LDA) approaches for word embeddings 
* graphs to capture relation between word & its context
* vertices as words, edge if co-occur in a context
    * (isn't this what GloVe does kinda?)
* edge weights according to non-local info (co-occurrence in documents)
* sampling strategy – prioritise local context

## Factorising AMR generation through syntax
* generate text from meaning representation graph
* AMR underspecifies some things, i.e. syntax
* core idea: predict syntax first, then text conditioned on both AMR and syntax tree
* some experiments on how much syntax is in AMR anyway
    * answer: not too much
* want to use seq2seq, but AMR and parse tree are both graphs...
    * sequencify them
* some tweaks to ensure predict well-formed constituency trees
* copy mechanism (this is getting pretty standard)
* experiments: it works
* side effect: can generate paraphrases by sampling different syntax trees
    * this is a cool idea

## Crowdsourced Frame Disambiguation
* the speaker really does not believe discrete annotations, ever
* e.g. frame disambiguation, ranking of relation extraction
* cuases of disagreement:
    * workers are human and therefore flawed
    * sentence / data issues
    * target semantics - are these even appropriate?
* [CrowdTruth](http://crowdtruth.org/) – metrics etc.
* annotation disagreement is signal NOT noise!
* [FrameNet](https://framenet.icsi.berkeley.edu/fndrupal/) – dataset of crowd-annotated frames
* then he kicked the cable – "as you can't see here..."

## Inoculation by Fine-Tuning
* NLP system = training dataset + model architecture
* failures may be due to dataset or model weaknesses
* **challenge datasets** that break models when trained on some original dataset
* **inoculation**: fine-tune models on some challenge data to better understand why they fail
* possible outcomes:
    * fine-tuning a little bit completely closes the gap on original vs. challenge dataset
        * weakness of data NOT model
    * model weakness – doesn't close gap, something up with the model
    * artifacts / other – damages outcome on both original and challenge
* example from NLI – word overlap & spelling error challenge sets
* inoculating
    * word overlap: dataset weakness (fine-tuning closes the gap)
    * spelling errors: model weakness (gap doesn't close even upon fine-tuning)
* also other examples, SQuAD
    * see some other outcomes, learn things about dataset issues etc.
* method can be applied to any train/test distribution mismatch, transfer tasks, etc.

## Word Polysemy Aware Document Representation
* background: context sensitive / topic modeling, deep learning, doc2vec, weighted averaging
* focus on simple compositional methods
    * works well for sentence embedding but not larger documents / multiple topics
* averaging vs Partition Averaging 
    * cluster word embeddings
    * average within cluster and concatenate across clusters
* improve method by taking into account word meanings in context, various other improvements

## EQUATE
* SOTA NLI models are getting quite good
* but do models reason like we think they do?
* e.g. **quantitative reasoning**
* introduce datasets – sourced from the wild and constructed in a controlled way

