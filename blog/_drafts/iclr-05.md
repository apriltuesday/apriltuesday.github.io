---
layout: post
title: "Tuesday Morning Talks"
date: 2019-05-07
category: blog
---

Part of my series of notes from [ICLR 2019](https://iclr.cc/Conferences/2019) in New Orleans.

## Learning Protein Structure with a Differentiable Simulator
* sequence => structure
* weak interaction (water-liking & -avoiding) => global fold
* energy-based models make sense
    * but inference intractable
* jointly learn energy function and inference
* goal: learn protein sequence-to-structure end-to-end
* deep energy function to capture multi-scale dependence
    * "in more ICLR language: a deep conditional rnadom field with deep features " :joy:
* efficient sampling with coordinate transformation
* benefits:
    * probabilistic - both discrete and continuous uncertainty
    * some generalization over structure
        * more so than just predicting geometry (angles)
* two months to train

## Enabling Factorized Piano Music Modeling and Generation with the MAESTRO Dataset
* music is complex, partly because of **wide range of timescales**
    * (this is another theme here)
* structured prior - composers make music with **notes**
* importance of real performance data vs. just midi files / quantized scores
* not much of this data available
    * but if we had a good transcription model we could generate from "the wild" and get way more data
    * => Wave2Midi2Wave
* Onsets & Frames model for transcription
* releasing [MAESTRO dataset](https://g.co/magenta/maestro-dataset)
* Music Transformer to compose music - transformer model with relative attention
* piano roll conditioned WaveNet - also reproduces other sounds in a piano recital besides just the notes

## A Unified Theory of Early Visual Representations from Retina to Cortex through Anatomically Constrained Deep CNNs
* receptive fields of neurons
    * retina – center surround
    * cortex – edge detector
* why? (and why different?)
* CNNs as a model of visual systems
    * learn similar receptive fields, but seem to skip center-surround and go straight to edges
* try to build a CNN that explicitly models biological visual system
* optic nerve as a physical bottleneck between two distinct anatomical entities
* if we build this bottleneck into the network, we get center-surround!!!
* diversity across species
    * fairly linear cells that don't seem to be semantic feature extractors (monkeys)
    * vs. many types of nonlinear cells that e.g. detect predators (mice)
* the difference here is in complexity / depth of the system after retinal stage
* retina is more linear with the brain is deep, extracts more useful features when brain is shallow
    * this only really happens when we have the retinal bottleneck
* this is actually really fucking cool
