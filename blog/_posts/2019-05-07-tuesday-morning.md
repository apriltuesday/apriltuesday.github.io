---
layout: post
title: "Tuesday Morning Contributed Talks"
date: 2019-05-07 09:00:00
category: blog
---

Part of my series of notes from [ICLR 2019](https://iclr.cc/Conferences/2019) in New Orleans.

## Learning Protein Structure with a Differentiable Simulator
* goal: learn protein sequence-to-structure end-to-end
* weak interactions (water-liking & -avoiding) => global protein fold

![sequence to structure](/assets/images/2019-iclr/seq-struc.jpg "sequence to structure")

* energy-based models make sense to use here, but inference intractable
* jointly learn energy function and inference
* deep energy function to capture multi-scale dependence
* "in more ICLR language: a deep conditional random field with deep features" :joy:
* efficient sampling with coordinate transformation

![protein predictions](/assets/images/2019-iclr/protein-preds.jpg "protein predictions")

* benefits of this approach:
    * probabilistic – both discrete and continuous uncertainty
    * some generalization over structure
        * more so than just predicting geometry (angles)
* two months to train though :warning:

## Enabling Factorized Piano Music Modeling and Generation with the MAESTRO Dataset

![music](/assets/images/2019-iclr/music.jpg "music")

* music is complex, partly because of **wide range of timescales**
    * (this is another theme here at ICLR for me)
* use structured prior – i.e., composers make music with **notes**
* importance of real performance data vs. just midi files / quantized scores
* not much of this data available
    * but if we had a good transcription model, we could generate way more data from "the wild"
* => **Wave2Midi2Wave**
* [Onsets & Frames](https://magenta.tensorflow.org/onsets-frames) model for transcription
    * result: [MAESTRO dataset](https://g.co/magenta/maestro-dataset)
* [Music Transformer](https://magenta.tensorflow.org/music-transformer) to compose music – transformer model with relative attention

![music transformer](/assets/images/2019-iclr/music-trans.jpg "music transformer")

* piano roll-conditioned [WaveNet](https://deepmind.com/blog/wavenet-generative-model-raw-audio/)
    * also reproduces other sounds in a piano recital besides just the notes
* much more [here](https://magenta.tensorflow.org/maestro-wave2midi2wave)

![wave2midi2wave](/assets/images/2019-iclr/wave2midi2wave.jpg "wave2midi2wave")

## A Unified Theory of Early Visual Representations from Retina to Cortex through Anatomically Constrained Deep CNNs
* receptive fields of neurons
    * retina – center surround
    * cortex – edge detector
* why? (and why different?)
* CNNs as a model of visual systems
    * learn similar receptive fields, but seem to skip center-surround and go straight to edges

![anatomy](/assets/images/2019-iclr/anatomy.jpg "anatomy")

* try to build a CNN that explicitly models biological visual system
* optic nerve as a **physical bottleneck** between two distinct anatomical entities
* if we build this bottleneck into the network, we get center-surround!!!

![receptive fields](/assets/images/2019-iclr/receptive-fields.jpg "receptive fields")

* diversity across species
    * fairly linear retinal cells that don't seem to be semantic feature extractors (monkeys)
    * vs. many types of nonlinear cells that e.g. detect predators (mice)
* the difference here is in complexity / depth of the system after retinal stage
* retina is more linear with the brain is deep, extracts more useful features when brain is shallow
    * this only really happens when we have the retinal bottleneck
* this is actually really fucking cool

![depth](/assets/images/2019-iclr/depth.jpg "depth")
