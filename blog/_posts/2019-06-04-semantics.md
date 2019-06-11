---
layout: post
title: "Semantics Track"
date: 2019-06-04 11:00:00
category: blog
tags: [naacl2019, nlp, notes]
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
* [paper here](https://www.aclweb.org/anthology/N19-1223)
* generate text from abstract meaning representation (AMR) graph
* AMR underspecifies some things, i.e. syntax

![syntax](/assets/images/2019-naacl/syntax.jpg "syntax")

* core idea: predict syntax first, then text conditioned on both AMR and syntax tree
* some experiments on how much syntax is in AMR anyway
    * answer: not too much

![arch](/assets/images/2019-naacl/arch.jpg "arch")
*Now this is an architecture diagram I can get behind.*

* want to use seq2seq, but AMR and parse tree are both graphs...
    * sequencify them first
* some tweaks to ensure predict well-formed constituency trees
* copy mechanism (this is getting pretty standard)
* experiments: it works
* side effect: can generate paraphrases by sampling different syntax trees
    * this is a cool idea

## Crowdsourced Frame Disambiguation
* the speaker really does not believe discrete annotations, ever

![disagreement](/assets/images/2019-naacl/disagreement.jpg "disagreement")

* causes of annotator disagreement:
    * workers are human and therefore flawed
    * sentence / data issues
    * target semantics - are these even appropriate?
* [CrowdTruth](http://crowdtruth.org/) – metrics etc.

![fss](/assets/images/2019-naacl/fss.jpg "fss")

* annotation disagreement is signal NOT noise!
* [FrameNet](https://framenet.icsi.berkeley.edu/fndrupal/) – dataset of crowd-annotated frames
* then he kicked the cable – "as you can't see here..."

## Inoculation by Fine-Tuning
* [paper here](https://arxiv.org/abs/1904.02668)
* NLP system = training dataset + model architecture
* failures may be due to dataset or model weaknesses
* challenge datasets that break models trained on some original dataset
* **inoculation:** fine-tune models on some challenge data to better understand why they fail

![inoculation](/assets/images/2019-naacl/inoculation.jpg "inoculation")

* possible outcomes:
    * **data weakness** – fine-tuning a little bit completely closes the gap on original vs. challenge dataset, original training data was missing something
    * **model weakness** – doesn't close gap, something up with the model
    * **artifacts / other** – damages outcome on both original and challenge, something else is going on
* example from NLI – word overlap & spelling error challenge sets
* inoculating
    * word overlap: dataset weakness (fine-tuning closes the gap)
    * spelling errors: model weakness (gap doesn't close even upon fine-tuning)

![results](/assets/images/2019-naacl/results.jpg "results")

* also other examples, e.g. SQuAD
    * see some other outcomes, learn things about dataset issues etc.
* method can be applied to any train/test distribution mismatch, transfer tasks, etc.
* I really liked this talk! clear readable slides, nice simple idea

## Word Polysemy Aware Document Representation
* background: context sensitive / topic modeling, deep learning, doc2vec, weighted averaging
* focus on simple compositional methods
    * works well for sentence embedding but not larger documents / multiple topics

![partition](/assets/images/2019-naacl/partition.jpg "partition")

* averaging vs. partition averaging 
    * cluster word embeddings
    * average within cluster and concatenate across clusters
* improve method by taking into account word meanings in context, various other modelling improvements

## EQUATE
* SOTA NLI models are getting quite good
* but do models reason like we think they do?
* e.g. **quantitative reasoning**
* introduce datasets – sourced from the wild and constructed in a controlled way

![quantitative](/assets/images/2019-naacl/quantitative.jpg "quantitative")
