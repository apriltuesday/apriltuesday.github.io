---
layout: post
title: "Sindy Löwe: Putting an End to End-to-End"
date: 2020-08-26
category: blog
tags: [ml meetup, ml, deep learning, notes]
---

Notes from Sindy Löwe's talk at the (virtual) London Machine Learning Meetup.  If they seem sparse, I blame 2020.  Just [go read her blog](https://loewex.github.io/GreedyInfoMax.html).

## Intro: why not E2E?
* biological inspiration
    * brain updates synapses locally, no global loss to speak of
    * (note perceptual task focus)
* computational issues
    * have to store all weights, activations, gradients
    * deep networks hard to parallelise

## Greedy InfoMax
* local loss per module (not necessarily layer, just some way of splitting NN horizontally)
* self-supervised loss – learning representations for downstream task
* trained greedily, blocking gradients between modules
* need to enforce coherence in what layers are learning some other way
* InfoNCE objective enforces shared info among nearby patches (in images, audio)
    * maximising mutual information while still being efficient (i.e. not copying input)

## Experiments
* focus on comparing same architectures & same objective enforced globally vs. locally
    * get comparative performance but seems to be lower variance
* inspection indicates similar feature abstraction as E2E models
* each module improves on predecessor even without gradients
* memory footprint smaller for individual modules => can train models too big to fit on your GPU
* distributed training is quite nice – can asynchronously generate inputs for the next module to train on & sync every few epochs
    * each module doesn't need to train on most recent outputs of previous module – just cache them
    * performance does drop if you train each module to convergence before moving on to the next – probably overfitting
        * non-converged outputs at beginning of training correspond to a type of noise

## Q&A miscellany
* origin of the performance differences?
    * partly the power of the contrastive patch loss
    * partly the local vs. global thing
* how robust to different module splits?
    * hasn't done ablation studies yet
    * splitting into individual layers and larger chunks both seem to work (in different contexts though)
* trying other losses?
    * some biological justification for InfoNCE loss – "minimising surprise"
    * (not totally biological though, e.g. negative sampling)
