---
layout: post
title: "Wednesday Morning talks"
date: 2019-05-08
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
* encode with CNN
* estimate mutual information between image and representation
    * then maximize to get good rep
* using local structure is important
    * irrelevant info in e.g. background is still part of info content of image, but we want to ignore that
    * compute MI on all patches simultaneously ("self-prediction")
* local and global features
* evaluation - downstream classifier, measure MINE for mutual info, etc.
* can also incorporate orderless autoregression (?)
* some cool followup work, including on graphs and biomedical data

## KnockoffGAN: Generating Knockoffs for Feature Selection using Generative Adversarial Networks
* identify features that are **relevant** to an outcome
    * outcome conditionally independent of remaining features given selected features
* want to control false discovery rate (FDR), since feature validation in e.g. medicine is costly
* Knockoffs (Candes et al 2016)
    * construct knockoff variables, learn weights, and select based on desired FDR
    * A. encode everything about features, but nothing about outcome
    * B. swapping real features w/ knockoff doesn't change joint
    * success of method "only" depends on generating these knockoffs, not on validity of model
    * original paper does this only for Gaussian distributions, sad face
* property B in particular is tricky to satisfy in general
* propose doing this with GANs
* discriminator - perform a swap (and provide a hint), try to predict what vars were swapped
    * flexibility in GAN framework for deciding what the game is
    * if the joint is the same this would be tricky
* sadly this isn't quite enough, so add WGAN discriminator to regularise just between features
    * corresponds to swapping all the variables
    * reduces search space
* MINE (mutual information neural estimation) – minimise MI
    * greater independence between vars & knockoffs
* generator – pretty standard
* experiments hooray – mostly synthetic, some qualitative results on real data

## Deterministic Variational Inference for Robust Bayesian Neural Networks
* bayesian neural nets
    * weights as probability distributions
    * estimate posterior of weights given inputs & outputs
* ELBO objective - fit the data, don't stray from the prior
* Challenge I: gradient variance for monte carlo methods
* solution: deterministic variation inference instead
* propagating uncertainties
    * propagate distributions deterministically, rather than propagating samples
    * output is Gaussian (but computing mean & variance is actually a bit tricky... need to approximate)
* Challenge II: prior tuning to choose a good prior
* solution: empirical bayes rather than cross-validation
* deterministic and robust :+1:

## FFJORD: Free-Form Continuous Dynamics for Scalable Reversible Generative Models
* want reversible generative models
* unrestricted functions (e.g. general neural networks...)
    * not generally invertible
    * computation of log determinant of jacobian inefficient
* previous solutions suck, use ours instead
    * (NB. speaker did NOT say this)
* discrete time dynamics of generaive models
* but what if... continuous time? :thinking_face:
    * invertibility just by reversing the direction of integration
    * efficient log-prob - O(n) instead of O(n^3)
    * without restricting function at all
* new problem: computing Jacobian explicitly is O(n^2) :sweat:
    * estimate jacobian trace in linear time, phew :relieved:
* experiments hooray :tada:
* drawbacks
    * non-constant computation time (based on numerical solvers), on average pretty slow
    * relies on new methods, i.e. neural ODEs
    * much engineering work to be done!
* Q&A
    * question: generate text?
    * answer: lol :sweat_smile:
