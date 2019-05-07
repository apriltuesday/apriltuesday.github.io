---
layout: post
title: "Cynthia Dwork: Recent Developments in Algorithmic Fairness"
date: 2019-05-06
category: blog
---

Part of my series of notes from [ICLR 2019](https://iclr.cc/Conferences/2019) in New Orleans.

## Introduction
* algorithms are unfair
    * unrepresentative / biased training data
    * feature choice can be biased
* ...but by now, we all know this, so what do we do?
* many natural desiderata of fairness are proven to conflict
* want a theory of algorithmic fairness
* two kinds of fairness to think about
    * **group fairness**
        * e.g. statistical parity, balance for positive
        * easier but fail under scrutiny :disappointed:
    * **individual fairness**
        * people similar wrt task should be treated similarly
        * strong legal framework
        * but how do we define this task-specific similarity metric?

![metric learning for individual fairness](/assets/images/2019-iclr/fair-metric.jpg "metric learning for individual fairness")

* metric learning for individual fairness
    * distances for single representative element are useful but limited
    * use small number of additional representatives to help
    * this is work by [Christina Ilvento](http://cilvento.org/) but I cannot for the life of me find a paper (I think it might be too recent?)
* "multi-x" approaches as a way to combine group and individual fairness 
    * apply group fairness, but simultaneously across all pairs of sets in some collection

## Fair Scoring and Ranking
* scores as **individual** probabilities?
    * e.g. probability of recidivism
    * what does this mean when the experiment isn't repeated?
* "On Individual Risk" – [Dawid 2018](https://link.springer.com/article/10.1007/s11229-015-0953-4)
* one way to handle this is **calibration**
    * e.g. in forecasting – 70% of days where predict 70% chance of rain should have rain
* how to choose groups to compare
    * complexity theory! – all groups identified by small circuits in data
    * data needs to be rich enough – differentially expressive
* multi-accuracy (expectations of intersections etc. work out) and multi-calibration
    * this is computationally doable, wow
* [paper on multi-calibration](https://arxiv.org/abs/1711.08513)
* the devil is in the choice of collection (they think they have a test for this...)

## Fair Representation

![adversarial learning of fair representations](/assets/images/2019-iclr/fair-reps.jpg "adversarial learning of fair representations")

* remove sensitive info (censoring) while retaining sufficient info for training
* adversarial learning of fair representations
    * encoder tries to hide group membership
    * decoder tries to reconstruct
    * predictor tries to classify (based on encoded representation)
    * adversary tries to determine group membership
    * papers: [Edwards & Storkey 2016](https://arxiv.org/abs/1511.05897), [Madras et al. 2018](https://arxiv.org/abs/1802.06309)
* can apply same methods to try and find common features among different populations
    * e.g. patients at different hospitals
