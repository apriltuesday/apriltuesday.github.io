---
layout: post
title: "Ian Goodfellow: Adversarial Machine Learning"
date: 2019-05-07 12:00:00
category: blog
---

Part of my series of notes from [ICLR 2019](https://iclr.cc/Conferences/2019) in New Orleans.

## Introduction
* using game theory instead of optimization
* community has (mostly) moved on from "make ML work" to other issues
* a brief look at some connections among them...

## Cambrian Explosion

![cambrian](/assets/images/2019-iclr/cambrian.jpg "cambrian")

* **generative modeling** – GANs hooray
    * there is a Nash equilibrium where generator perfectly recreates data and discriminator guesses, but in practice we don't reach this
    * great progress on images generally and faces especially
        * doing this for ImageNet still needs labels
    * needs much less supervision
    * challenge in doing this for videos and making them temporally consistent
* **security**
    * adversarial examples – breaking the iid, test-matching-train assumption
    * see [here](https://www.april.sh/blog/2019/05/06/safe-ml) basically
* **model-based optimization**
    * learn a model of what you want, and optimize it
    * e.g. designing DNA for protein function
    * (I definitely don't hear as much about this as I feel like I should! maybe I'm just not listening in the right places)
* **RL**
    * self-play is a form of adversarial learning (and the original ML! [Arthur Samuel](https://en.wikipedia.org/wiki/Arthur_Samuel)'s 1959 checkers agent)
    * desired behaviours as side effects of "winning the game" (GANs are like this)
    * SPIRAL ([Ganin et al. 2018](https://arxiv.org/abs/1804.01118)) – use GANs to help learn reward function
* **eXtreme reliability**
    * dealing with the worst case
        * modeling this is simpler than the average case (why???)
    * Reluplex model ([Katz et al. 2017](https://arxiv.org/abs/1702.01135))
* **label efficiency** – semi-supervised learning
    * discriminator distinguishes classes as well as real vs. fake ([Odena 2016](https://arxiv.org/abs/1606.01583))
        * learn from fake data, real labeled data, and real unlabelled data
    * virtual adversarial training ([Miyato et al. 2017](https://arxiv.org/abs/1704.03976))
* **domain adaptation**
    * domain adversarial networks ([Ganin et al. 2015](https://arxiv.org/abs/1505.07818)) – learn features common to domains and ones that distinguish them
    * professor forcing ([Lamb et al. 2016](https://arxiv.org/abs/1610.09038)) – domain adversarial applied to RNN
        * one domain is train mode, other is predict mode
    * adapting between synthetic and real images to bootstrap models
* **fairness**
    * adversarially learned fair representations, see [other talk](https://www.april.sh/blog/2019/05/06/cynthia-dwork)
    * interpretability
        * linear *doesn't* mean interpretable
        * robust *might* mean more interpretable
* **neuroscience**
    * "bugs" in both neural nets and humans?
