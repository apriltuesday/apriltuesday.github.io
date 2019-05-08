---
layout: post
title: "Ian Goodfellow: Adversarial Machine Learning"
date: 2019-05-07
category: blog
---

Part of my series of notes from [ICLR 2019](https://iclr.cc/Conferences/2019) in New Orleans.

## Introduction
* game theory instead of optimization
* community has moved on from "make ML work" to other issues
* look at connections among them

## Cambrian Explosion
* generative modeling - GANs
    * there is a Nash equilibrium where generator perfectly recreates data and discriminator guesses, but in practice we don't reach this
    * great progress on images generally and faces especially
        * doing this for ImageNet still needs labels
    * needs much less supervision
    * doing this for videos and making them temporally consistent
* security
    * adversarial examples - breaking the iid, test-matching-train assumption
* model-based optimization
    * learn a model of what you want, and optimize it
    * e.g. designing DNA for protein function
* RL
    * self-play (and the original ML - 1959 Samuel checkers agent)
    * desired behaviours as side effects of "winning the game" (GANs are like this)
    * SPIRAL (Ganin et al 2018) - use GANs to help learn reward function
* eXtreme reliability
    * dealing with the worst case
    * modeling this is simpler than the average case (why???)
    * ReLUplex model
* label efficiency
    * semi-sup learning - discriminator distinguishes classes as well as real vs fake
        * learn from fake data, real labeled data, and real unlabelled data
    * virtual adversarial training (Miyato 2015)
* domain adaptation
    * domain adversarial networks (Ganin 2015) - learn features common to domains and ones that distinguish them
    * professor forcing (Lamb 2016) - domain adversarial applied to RNN (one domain is train mode, other is generate mode)
    * adapting between synthetic and real images to bootstrap models
* fairness
    * adversarially learned fair representations, see other talk
    * interpretability
        * linear doesn't mean interpretable
        * robust might mean more interpretable
* neuroscience
    * bugs in both neural nets and humans?

## 
