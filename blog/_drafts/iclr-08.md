---
layout: post
title: "Pierre-Yves Oudeyer: Developmental Autonomous Learning"
date: 2019-05-08
category: blog
---

Part of my series of notes from [ICLR 2019](https://iclr.cc/Conferences/2019) in New Orleans.

## Introduction
* human babies are crazy and learn all kinds of shit on their own
* body morophology – emergent / self-organized structures & motions
* cognitive biases – e.g. for language acquisition (affordances)
* intrinsic motivation - curiosity, self-motivated exploration, active learning

## Curiosity-driven exploration
* benchmarks on intelligence can be very misleading
    * "what the hell, the point was to get the toy *out* of the tube!"
* related to theory of flow
* wantreal theoretical framework in psych / neuroscience
* robotic playgrounds
    * movement and perceptual (object-based) primitives - higher level than pixel leve or micro-muscle movements
* many ideas of what makes an interesting learning experiment
* learning progress hypothesis:
    * interestingness proportional to empirical learning progress (abs val of derivative)
    * how to do this without the global view?
* hierarchical multi-armed bandits - partition space based on learning difficulty
* inverse model (goal) exploration vs. forward model exploration
    * robotics spaces have lots of redundancies - exploring many ways to get small number of effects, vs. fewer ways to get large number of effects
* discovers nested tool use
* MUGL: exploring learned modular goal spaces
    * learning from pixel space
    * learning beta-VAE representation spaces for exploring goals

## Back to humans
* modeling child development data
* e.g. vocal development
    * emergent developmental stages - no sounds, unarticulated sounds, articulated sounds
    * shift from self-exploration to imitation (this is cool)
    * individual differences in developmental trajectories – different attractors
* discover language as a tool to manipulate environment
* The Ergo-Robots
* self-organization of culturally-shared speech sounds
    * bias to sync up noises with others
    * similar vowel families developed as for human languages (!)
* interplay of regularity & diversity
* applications to educational technologies
    * personalize curriculum for efficient learning and intrinsic motivation

## Q&A
* can develop communication without having a model of others
* how to do this without human-provided representations and similarity metrics for goal space?
    * not done for robot experiments (for now), happens in beta-VAE experiments though
    * some additional work on metric learning for embodied systems that he didn't talk about...
