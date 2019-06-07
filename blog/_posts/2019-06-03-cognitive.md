---
layout: post
title: "Cognitive Track"
date: 2019-06-03 11:00:00
category: blog
---

Part of my series of notes from [NAACL-HLT 2019](https://naacl2019.org/) in Minneapolis.

## Emergence of Syntax and Number Units in LSTM Language Models
* subject-verb agreement
* grammatical agreement: copy of features from one word onto another
* psycholinguistic, neuroscientific etc. research on this
* previous work shows LSTMs can do this
    * uses "behavioural evidence" – neural net as black box
* this work
    * what's the underlying mechanism?
    * is it structure-sensitive?
* design stimuli with different attributes to probe behaviour

![ablation](/assets/images/2019-naacl/ablation.jpg "ablation")

* ablate units – only *2 units* significantly hurt performance when ablated
    * separate singular and plural units?!
* dynamics of long-range number units
* also evidence of "short range" number units
* syntactic tree-depth data – try to predict tree-depth from network activations
    * after decorrelating word position and depth
* interaction between syntax units & number units
* evidence that LSTMs aren't just using heuristics, but structure

## Neural Self-training through Spaced Recognition
* labeled data is important but hard to get
* self-training – sample data to label, but won't always explore entire data space
* pretraining – want to de-couple pretraining & fine-tuning tasks

![self-training](/assets/images/2019-naacl/self-training.jpg "self-training")

* data sampling based on **Leitner Queues**
    * inspired by "scheduled learning" in humans
* adaptively learn how to move instances in the queue to sample
* some analysis of how much queue instances match training data, diversity of instances, sampling policy
* this seemed interesting but I got distracted, will read the paper I guess!

## Neural Language Models and Psycholinguistic Subjects
* what information is contained in representations learned from neural LMs?
* what's a parse tree really?
    * not just something that makes linguists happy :joy:
    * encodes **possible grammatical unfoldings** of sentences in a human understandable way
* psycholinguistics uses reading time as proxy for difficulty
    * infer e.g. what data structures people are using internally
    * this provides evidence for these trees existing in the first place!

![psycholinguistic](/assets/images/2019-naacl/psycholinguistic.jpg "psycholinguistic")

* do this for neural models using negative log-likelihood of word given context
* measure penalty for surprising continuations
* construct examples of different kinds of syntactic state
    * do NN models use the state?
    * what cues do they use?
    * two examples: subordinate clauses & garden path sentences
* can compare models that use grammars vs. those that don't
* syntactic supervision is worth 100x more data
* hard to predict patterns in what models do and don't learn
