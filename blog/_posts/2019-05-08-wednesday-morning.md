---
layout: post
title: "Wednesday Morning Contributed Talks"
date: 2019-05-08 10:00:00
category: blog
---

Part of my series of notes from [ICLR 2019](https://iclr.cc/Conferences/2019) in New Orleans.
See if you can tell when my caffiene crash hit based on emoji density.

## Deep InfoMax: Learning deep representations by mutual information estimation and maximization
* unsupervised representation learning
    * labels expensive and the ones humans provide can be useless for downstream tasks
    * rewards might be sparse / distant
    * might want to discover new things, which wouldn't necessarily be in annotations
* do this for images woohoo

![estimating](/assets/images/2019-iclr/estimating.jpg "estimating")

* estimate **mutual information** between image and representation
    * then maximize to get good representation
* using local structure is important!
    * irrelevant info in e.g. background is still part of info content of image, but we want to ignore that
    * compute MI on all patches simultaneously ("self-prediction")

![local structure](/assets/images/2019-iclr/local-structure.jpg "local structure")

* evaluation – downstream classifier, measure MINE for mutual info, etc.
* can also incorporate orderless autoregression (?)
* some cool follow-up work, including on [graphs](https://arxiv.org/abs/1809.10341) and [biomedical data](https://arxiv.org/abs/1904.10931)

## KnockoffGAN: Generating Knockoffs for Feature Selection using Generative Adversarial Networks
* identify features that are **relevant** to an outcome
    * outcome conditionally independent of remaining features given selected features
* want to control false discovery rate (FDR), since feature validation in e.g. medicine is costly

![knockoffs](/assets/images/2019-iclr/knockoffs.jpg "knockoffs")

* **knockoffs** ([Candes et al. 2016](https://arxiv.org/abs/1610.02351))
    * construct knockoff variables, learn weights, and select based on desired FDR
    * success of method "only" depends on generating these knockoffs, *not* on validity of model
    * original paper does this only for Gaussian distributions, sad face

![challenges](/assets/images/2019-iclr/knockoff-challenges.jpg "challenges")

* desired properties of knockoffs
    * A: encode everything about features, but nothing about outcome
    * B: swapping real features w/ knockoff doesn't change joint
* property B is especially tricky to satisfy in general

![knockoffgan](/assets/images/2019-iclr/knockoff-gan.jpg "knockoffgan")

* propose doing this with GANs
    * flexibility in GAN framework for deciding what the game is
    * this is a really nice point! I'd like to see more people doing this sort of thing with GANs and not just making pretty pictures (though they are *really* pretty pictures)
* discriminator
    * perform a swap (and provide a hint)
    * try to predict what variables were swapped
* sadly this isn't quite enough, so add WGAN discriminator to regularise just between features
    * corresponds to swapping all the variables
    * reduces search space
* MINE (mutual information neural estimation) – minimise MI
    * greater independence between variables & knockoffs
* generator – pretty standard
* experiments hooray
    * mostly synthetic
    * some qualitative results on real data (including biobank!)

![biobank](/assets/images/2019-iclr/knockoff-results.jpg "biobank")

## Deterministic Variational Inference for Robust Bayesian Neural Networks
* Bayesian neural nets
    * weights as probability distributions
    * estimate posterior of weights given inputs & outputs
* ELBO objective – fit the data, don't stray from the prior

![bayesian](/assets/images/2019-iclr/bayesian.jpg "bayesian")

* challenge I: gradient variance for Monte Carlo methods
    * solution: deterministic variational inference instead
* propagating uncertainties
    * propagate distributions deterministically, rather than propagating samples
    * output is Gaussian (but computing mean & variance is actually a bit tricky... need to approximate)
* challenge II: prior tuning to choose a good prior
    * solution: empirical Bayes rather than cross-validation
* deterministic and robust :+1:

## FFJORD: Free-Form Continuous Dynamics for Scalable Reversible Generative Models
* want reversible generative models
* but we like unrestricted functions (e.g. general neural networks...)
    * not generally invertible
    * computation of log determinant of Jacobian inefficient
* discrete time dynamics of generative models
* but what if... continuous time? :thinking:
    * invertibility just by reversing the direction of integration
    * efficient log-prob – *O*(*n*) instead of *O*(*n*<sup>3</sup>)
    * without restricting function at all
* new problem: computing Jacobian explicitly is *O*(*n*<sup>2</sup>) :sweat:
    * estimate Jacobian trace in linear time, phew :relieved:
* experiments hooray :tada:

![ffjord](/assets/images/2019-iclr/ffjord.jpg "ffjord")

* drawbacks
    * non-constant computation time (based on numerical solvers), on average pretty slow
    * relies on new methods, i.e. neural ODEs
    * much engineering work to be done! :hammer_and_wrench:
* Q&A
    * question: generate text?
    * answer: lol :sweat_smile:
