---
layout: post
title: "Language Modeling for Contextual Representation Learning"
date: 2018-11-09
category: blog
---

[Mark Neumann (AI2)](http://markneumann.xyz/), South England Natural Language Processing Meetup

## 1. The beginning: [ELMo](https://allennlp.org/elmo)

* goal: learn word meanings by reading lots of text
* different representations of words depending on context, rather than one vector per word
* => **E**mbeddings from **L**anguage **Mo**dels (bit of a stretch, but I've seen worse!)
* embedding of a word is (roughly) mixture of hidden states from context words
    * weightings learned per task
    * character-based to help with OOV etc.
* some inspection of the embeddings by using them in a simple NN trained for POS-tagging (syntax) and WSD (semantics)
    * 1st layer captures syntax better than 2nd
    * 2nd layer captures semantics better than 1st
    * both are surprisingly competitive with SOTA

## 2. Others pile on

* some similar stuff has come out
    * [Radford et al. 2018](https://s3-us-west-2.amazonaws.com/openai-assets/research-covers/language-unsupervised/language_understanding_paper.pdf)
    * [Howard & Ruder 2018](https://arxiv.org/pdf/1801.06146.pdf)
    * [Devlin et al. 2018](https://arxiv.org/pdf/1810.04805.pdf)
* (side note: this stuff is so new, and got so big so quick...)
* how to compare all these appropriately?
* lots of factors of variation

![variation](/assets/images/2018-11-09/variation.jpg "variation")

## 3. About those factors of variation

* [main paper](https://arxiv.org/pdf/1808.08949.pdf)
* vary the architecture (RNN / Transformer / Gated CNN) *but nothing else*
    * this does kind of ignore potential synergies between the different factors of variation, but we have to start somewhere!
* also a bit of analysis on what effect changing data volume and depth has
* curious about whether these types of contextual word representatiosn exhibit any architecture-independent properties
* results for LSTM vs Transformer: "These numbers are all essentially the same" (CNN does a tad worse)
    * so you might as well use the faster one, i.e. Transformer
* more data makes a difference (obviously)
    * so if you can train faster, you can use more data, so maybe it doesn't matter if given the same amount of data the other guy does better...
* non-contextual bit of the network is pretty good at syntax but crap at semantics (analogy tasks) (also maybe obviously)
* linear probing at different layers for tasks designed to require different amounts of context
    * POS tagging (small context), constituency parsing (phrase-level context), modification of co-ref (entire passage context)
    * => correlation between depth and amount of context needed
    * intuitively makes sense, empirical results are suggestive, but somehow I'm not totally convinced... need to think about this
* span embeddings - kind of does clustering out-of-the-box, though it's not perfect

![conclusions](/assets/images/2018-11-09/conclusions.jpg "conclusions")

* side note - using OpenAI's Transformer as ELMo...
    * weirdly only uses a few layers - and the same 5 layers for different tasks!
    * learning good things for fine-tuning / re-weighting vs. not.... ???

![layers](/assets/images/2018-11-09/layers.jpg "layers")

## 4. AllenNLP, the advert

* "We were really sad about the state of demos in NLP"
    * why should RL get all the good demos?
* lots of value to a good demo
    * helps debugging
    * makes complex NLP accessible to other (maybe smarter) people
    * shows how brittle models are
    * important to really evaluate a model *outside* a sterile black-box test environment -- a good score on PTB does not mean it's a good parser!
* there are other good reasons for AllenNLP, but demos are actually quite a big one!
* so yeah, take a gander at [them demos](http://demo.allennlp.org/)

## Postscript

* coworker's conversation about how syntax / semantics is something we introduced but might not be how language actually works (kind of a debate in NLP really)
* it's how humans study language but it might not be how language actually works
* is it useful for neural networks then or not?
* the distinction isn't sharp necessarily
* layers thing actually supports this, there's a spectrum and we can step between them
