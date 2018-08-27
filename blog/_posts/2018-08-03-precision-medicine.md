---
layout: post
title: "Knowledge-Rich Deep Learning for Precision Medicine"
date: 2018-08-03
category: blog
---
[Hoifung Poon (MSR)](https://www.microsoft.com/en-us/research/people/hoifung/), South England Natural Language Processing Meetup

## Introduction

* 80% of people are non-responders to top 20 prescription medicines
* now we have genome and other data, let's use this to target treatments to individuals
* machine reading -> KB to help support decision making / developing treatment
* 3 example projects:
    * MR for precision cancer knowledge curation
        * replacement for the "Molecular Tumor Board" (basically 20 people in a room combing through thousands of scientific papers)
    * EMR-based virtual trials
        * not published studies, but data is in medical records
        * off-label drug use as an N-of-1 trial
        * this is an _amazing_ idea
    * matching patients to clinical trials
        * eligibility conditions in text, currently totally word-of-mouth
        * patients with terminal conditions want to be in trials, and many trials fail with not enough participants

## Project Hanover

![summary](/assets/images/2018-08-03/summ.jpg "summary")

* [project website](http://hanover.azurewebsites.net/)
* focus on machine reading papers -> KB project
* challenges:
    * "the long tail of variations" and ambiguity in text
    * need for causal inference (as a tool to handle adversarial examples, hmm)
    * annotation bottleneck, especially in medicine
* step 1: encode some noisy labels using unified language of probabilistic logic
    * joint inference using coreference and apposition
    * distant supervision - hallucinate labels (of relation, from text) from a small ground-truth KB
        * "In biology, what is not lacking is ontologies" :joy:
    * data programming - rules!  we'll always need them
* step 2: E2E learning intractable (inference as a subroutine), DL can help
    * rules from step 1 translate to graphical factor model that generates noisy labels for a feedforward network
    * generalise _virtual evidence_ (Pearl 1988, Bilmes 2005) to arbitrary factors
    * optimisation: maximise conditional likelihood of the virtual evidence
    * (this is around where I stopped following things :sweat_smile:)

![architecture](/assets/images/2018-08-03/arch.jpg "architecture")

* at inference time, just use deep network ("boring supervised learning")
    * assume we've crammed the knowledge from the PGM into the network for now, worth looking into how to use both
* Wang & Poon "Deep Probabilistic Logic" - paper in submission (where?)
* related work:
    * knowledge compilation ([Hu et al. 2016](https://www.cs.cmu.edu/~rsalakhu/papers/emnlp16deep.pdf))
    * differentiable logic ([Rocktaeschel & Riedel 2017](https://papers.nips.cc/paper/6969-end-to-end-differentiable-proving.pdf))

## The end bit where we ran out of time

* Graph LSTM ([TACL '17](https://arxiv.org/abs/1708.03743))
    * use dependency parse to help LSTMs
    * one forget gate per ancestor in the graph
    * much like Tree LSTMs but for arbitrary graphs
    * for backprop - decompose graph to forward and backward edges (relative to the sentence) to recover DAG structure
    * claims the graph helps if the syntactic parser is good
        * evidence that the language bit matters? my personal quest for a rock-solid experiment showing this continues
* clinical machine reading work (patient records, clinical trials) seems harder and less far along
* [Wide-Open](https://www.ncbi.nlm.nih.gov/pubmed/28594819)!
    * public data is not always made public after submission, people forget etc.
    * automatically detect public data that should be released and notify them
    * I love this, just look at this plot (magenta line is post-Wide-Open)

![wideopen](/assets/images/2018-08-03/wideopen.png "wideopen")

Final quote on clinical ML: "You can imagine this snowballing in multiple dimensions" :snowman::thought_balloon:
