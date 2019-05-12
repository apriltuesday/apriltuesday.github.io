---
layout: post
title: "Thursday Afternoon Talks"
date: 2019-05-09
category: blog
---

Part of my series of notes from [ICLR 2019](https://iclr.cc/Conferences/2019) in New Orleans.

## Meta-Learning Update Rules for Unsupervised Representation Learning
* high-level attributes of data without labels
* currrent approaches:
    * hand design loss functions (autoencoders)
    * hand designed target statistics (sparsity)
    * hand design updates (GANS)
* mismatch between objective & desired task
* metalearn what to learn with help from supervised task
* want algorithm to be transferrable to different architectures (cf. features)
* metaloss to update learning rule which is used in inner loop
* inner loop is unsupervised, but outer meta-learning loop can use labeled data, e.g. few-shot training
    * wow this is so obvious
* don't need inner loss, use a different learning rule
    * learning rule parameterised by MLP, these are what we learn to update
* generalises to new datasets, architectures, modalities
    * e.g. metalearn on images and evaluate on text (!)
* main limitation is scale
* question asker: "just to be clear, there's no way your method would find something like Deep InfoMax"
    * (an impassioned defense of ML scientists in the face of meta-learning :sweat_smile:)

## Temporal Difference Variational Auto-Encoder
* environment models for agents in RL
* how to model temporal data?
* want world state abstracted from observations
    * make temporally extended predictions
    * includes uncertainty
* forward latent model
    * jumpy - don't have to go through all intermediate states
* neural belief state
    * sufficient statistics of state given past
* I... stopped paying attention, again, cut me some slack I've been doing pretty well

## Transferring Knowledge across Learning Processes
* AI should leverage prior knowledge maximally
* transfer learning – use source model
    * can have information, loss since model doesn't know what the future task might be
* meta-learn instead!
* Leap: inductive bias over learning process
    * scales beyond few-shot learning
* takes into account (approximate) length of learning trajectory
* updates initialization to minimise trajectory length
* get meta-gradients (almost) for free -> more computationally efficient
