---
layout: post
title: "Pierre-Yves Oudeyer: Developmental Autonomous Learning"
date: 2019-05-08 9:00:00
category: blog
---

Part of my series of notes from [ICLR 2019](https://iclr.cc/Conferences/2019) in New Orleans.

![flowers](/assets/images/2019-iclr/flowers.jpg "flowers")

There are a lot of interesting papers referred to in this talk, rather than link to them individually I'll point you to [Oudeyer's website](http://www.pyoudeyer.com/publications/), go wild.

## Introduction
* human babies are crazy and learn all kinds of shit on their own
* body morophology – emergent / self-organized structures & motions
* cognitive biases – e.g. for language acquisition (affordances)
* **intrinsic motivation** – curiosity, self-motivated exploration, active learning

## Curiosity-driven exploration
* benchmarks on intelligence can be very misleading
    * "what the hell, the point was to get the toy *out* of the tube!"
* related to theory of flow
    * ([a good read](https://www.amazon.com/Flow-Psychology-Experience-Perennial-Classics/dp/0061339202) if you're interested...)
* want real theoretical framework in psych / neuroscience
* investigate using robotic playgrounds
    * movement and perceptual (object-based) primitives – higher level than pixel-level or micro-muscle movements
* many ideas of what makes an interesting learning experiment...

![interesting](/assets/images/2019-iclr/interesting.jpg "interesting")

* **learning progress hypothesis**
    * interestingness proportional to empirical learning progress (absolute value of derivative)
    * how to do this without the global view?

![learning progress](/assets/images/2019-iclr/learning-progress.jpg "learning progress")

* hierarchical multi-armed bandits – partition space based on learning difficulty
* inverse model (goal) exploration vs. forward model exploration
    * robotics spaces have lots of redundancies – exploring many ways to get small number of effects, vs. fewer ways to get large number of effects
* discovers nested tool use (i.e. using tools that control other tools...)
* MUGL: exploring learned modular goal spaces
    * learning from pixel space
    * learning beta-VAE representation spaces for exploring goals

## Back to humans...
* modeling child development data
* e.g. vocal development
    * emergent developmental stages – no sounds, unarticulated sounds, articulated sounds
    * shift from self-exploration to imitation (this is cool)
    * individual differences in developmental trajectories – different attractors
* discover language as a tool to manipulate environment

![language](/assets/images/2019-iclr/curiosity-language.jpg "language")

* [The Ergo-Robots!](https://www.youtube.com/watch?v=YRh8S1P2dcw) :robot_face: :dancer:
* self-organization of culturally-shared speech sounds
    * bias to sync up noises with others
    * similar vowel families developed as for human languages (!)

![sounds](/assets/images/2019-iclr/sounds.jpg "sounds")
*Image above included solely for my phonology friends, who might even understand it.*

* interplay of regularity & diversity
* applications to educational technologies
    * personalize curriculum for efficient learning and intrinsic motivation

## Q&A
* can develop communication without having a model of other minds, whoa
* how to do this without human-provided representations and similarity metrics for goal space?
    * not done for robot experiments (for now), happens in beta-VAE experiments though
    * some additional work on metric learning for embodied systems that he didn't talk about...
