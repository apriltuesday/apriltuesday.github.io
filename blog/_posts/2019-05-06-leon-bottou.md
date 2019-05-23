---
layout: post
title: "Léon Bottou: Learning Representations Using Causal Invariance"
date: 2019-05-06 12:00:00
category: blog
---

Part of my series of notes from [ICLR 2019](https://iclr.cc/Conferences/2019) in New Orleans.

I missed the beginning of this one and had a little trouble catching up, so these notes make even less sense than usual (especially the first bit). Sorry about that.

## The First Bit
* multiple datasets for same phenomenon but exhibiting potentially different biases
* want to learn real phenomenon without spurious correlations in dataset
* nature doesn't shuffle examples, we do
    * ...so maybe we shouldn't
* robust regression
    * **interpolation** in the convex hull of seen training environmentss
* but is interpolation enough?
* how to learn stable properties across environments?
* invariant regression
    * **extrapolation** rather than just interpolation
* design function family that is insensitve to spurious correlations

![invariant representations](/assets/images/2019-iclr/invariant-rep.jpg "invariant representations")

* **invariant representations**
    * find relevant variables so that regression is invariant
* some related work
    * invariance and causation – properties that are invariant after intervention
    * adversarial domain adaptation

## Invariant Regularization
* method corresponds to inserting frozen domain adaptation layer
    * idea: make the representation good enough that I don't have to learn a different adaptation layer for each domain
* show this works on "colored MNIST"
    * 2 datasets, engineered to have misleading information, but in different ways
    * invariant regularization helps model perform well even when test set is perversely chosen to be quite different
* issues scaling it up
    * numerical issues
    * realizable problems work differently (colored MNIST isn't realizable)
* phenomenon (pre-label) vs. interpretation (post-label, i.e. annotation)
    * supervised - designed to be realizable, labelling supposed to be deterministic 
    * unsupervised - label comes from nature, not necessarily realizable
* to sum up...

![invariance summary](/assets/images/2019-iclr/invariance-summary.jpg "invariance summary")
