---
layout: post
title: "Language Modeling for Contextual Representation Learning"
date: 2018-11-09
category: blog
---

[Mark Neumann (AI2)](http://markneumann.xyz/), South England Natural Language Processing Meetup. Slides are [here](https://drive.google.com/file/d/1ZzIVypQb4cU_LMF-IgjxdVrYwVW2NlT1/view).

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

* since ELMo, lots of similar stuff has come out
    * [Radford et al. 2018](https://s3-us-west-2.amazonaws.com/openai-assets/research-covers/language-unsupervised/language_understanding_paper.pdf)
    * [Howard & Ruder 2018](https://arxiv.org/pdf/1801.06146.pdf)
    * [Devlin et al. 2018](https://arxiv.org/pdf/1810.04805.pdf)
* (side note: this stuff has kind of exploded just this year hasn't it...)
* how to compare all these appropriately?
* lots of factors of variation
* overall, huge gains in sample complexity across the board :tada:

![variation](/assets/images/2018-11-09/variation.jpg "variation")

## 3. About those factors of variation

* [main paper](https://arxiv.org/pdf/1808.08949.pdf)
* vary the architecture (RNN / Transformer / Gated CNN) *but nothing else*
    * (this does kind of ignore potential synergies between the different factors of variation, but we have to start somewhere!)
* also a bit of analysis on what effect changing data volume and depth has
* curious about whether these types of contextual word representatiosn exhibit any architecture-independent properties
* results for LSTM vs Transformer: "These numbers are all essentially the same" (CNN does a tad worse)
    * so you might as well use the faster one, i.e. Transformer
* more data makes a difference (obviously)
    * if you can train faster, you can use more data, so maybe it doesn't matter if given the same amount of data the other guy does better...
* non-contextual bit of the network is pretty good at syntax but crap at semantics (analogy tasks)
* linear probing at different layers for tasks designed to require different amounts of context
    * POS tagging (small context), constituency parsing (phrase-level context), modification of co-ref (entire passage context)
    * => correlation between depth and amount of context needed
    * intuitively makes sense, empirical results are suggestive, but somehow I'm not totally convinced... need to think about this
    * also see postscript to this post
* span embeddings - kind of does clustering out-of-the-box, though it's not perfect

![conclusions](/assets/images/2018-11-09/conclusions.jpg "conclusions")

* an aside - what if you used layer representations from OpenAI's Transformer as ELMo would?
* weirdly ends up only using a few layers
    * actually the same 5 layers for different tasks!
    * this is not what ELMo's layers do
* some hand-wavy guesses as to why this might happen, but basically it's a big :question: for now

![layers](/assets/images/2018-11-09/layers.jpg "layers")

## 4. AllenNLP, the advert

* "We were really sad about the state of demos in NLP"
    * why should RL get all the good demos?
* lots of value to a good demo
    * helps debugging
    * makes complex NLP accessible to other (maybe smarter) people
    * shows how brittle models are
    * important to really evaluate a model *outside* a sterile black-box test environment
        * a good score on PTB does not mean it's a good parser!
* there are other good reasons for AllenNLP, but demos are actually quite a big one!
* so yeah, take a gander at [them demos](http://demo.allennlp.org/)

## Postscript

After this meetup, I had an interesting chat with some people at work about how the sharp syntax / semantics distinction is something that linguists (basically Chomsky, natch) introduced artificially to try to understand language.  It may in fact have little or nothing to do with how language *actually* works.  Of course this doesn't detract from the utility of the distinction for the study of language, but it does raise the question of whether this is a useful piece of knowledge for neural networks or not.

And in particular, while a connection between an aspect of a particular model and syntax / semantics tasks is an appealing piece of evidence supporting the notion that that model is *really understanding* language, we should take this with a grain of salt – because who knows if even human linguists are *really understanding* language!  Though it is fascinating to think that a language model trained on a shit ton of unstructured text might have happened upon a similar "mental model" for how language works as Chomsky did.

Finally, Peters and Neumann's analysis connecting representational depth in the network with task performance requiring different amounts of context actually kinda supports the notion that the distinction between syntax and semantics is not so sharp after all, if you think about how it fleshes out the earlier claim that "shallow is good at syntax, deep is good at semantics".  In fact it seems that there is a spectrum from small context, syntax-y stuff to large context, semantics-y stuff – and we can use layers of deep networks to step from one to the other.

Not sure if this makes any sense, even to the individuals who were a part of this conversation, but anyway I find this quite interesting, and in particular the artificiality of the divide between syntax and semantics had never really occurred to me.
