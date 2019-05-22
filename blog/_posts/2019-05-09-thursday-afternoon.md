---
layout: post
title: "Thursday Afternoon Contributed Talks"
date: 2019-05-09 13:00:00
category: blog
---

Part of my series of notes from [ICLR 2019](https://iclr.cc/Conferences/2019) in New Orleans.

## Meta-Learning Update Rules for Unsupervised Representation Learning
* want representations that capture high-level attributes of data, without using labels
* currrent approaches:
    * hand-design loss functions (autoencoders)
    * hand-design target statistics (sparsity)
    * hand-design updates (GANS)
* mismatch between objective & desired task
* instead of designing by hand, **metalearn what to learn** with help from the supervised task directly

![metalearn](/assets/images/2019-iclr/metalearn.jpg "metalearn")

* want algorithm to be transferrable to different architectures
    * cf. learning transferrable features
* metaloss to update learning rule which is used in inner loop
* inner loop is **unsupervised**, but outer meta-learning loop **can use labeled data**
    * wow this is so obvious and wonderful
* don't actually need inner loss at all, use a different learning rule
    * learning rule parameterised by MLP, these parameters are what we learn to update
* generalises to new datasets, architectures, modalities
    * e.g. metalearn on images and evaluate on text (!)
* main limitation is scale (of course)
* question asker: "just to be clear, there's no way your method would find something like Deep InfoMax"
    * (an impassioned defense of ML scientists in the face of meta-learning :sweat_smile:)

## Temporal Difference Variational Auto-Encoder
* environment models for agents in RL
* how to model temporal data?
* want world state abstracted from observations
    * make temporally extended predictions
    * include uncertainty
* I... stopped paying attention, again, cut me some slack I've been doing pretty well

## Transferring Knowledge across Learning Processes
* AI should leverage prior knowledge maximally
* one way is transfer learning – use source model
    * can have information loss since model doesn't know what the future task might be
* meta-learn instead!

![leap](/assets/images/2019-iclr/leap.jpg "leap")

* **Leap**: inductive bias over learning process
* takes into account (approximate) length of learning trajectory
* updates initialization to minimise trajectory length
* get meta-gradients (almost) for free
    * more computationally efficient, scales beyond few-shot learning
