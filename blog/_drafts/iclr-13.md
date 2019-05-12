---
layout: post
title: "Noah Goodman: How we come to know"
date: 2019-05-09
category: blog
---

Part of my series of notes from [ICLR 2019](https://iclr.cc/Conferences/2019) in New Orleans.

## Introduction
* the problem of induction - how do people learn so much from so little
* learning mechanism to go from *examples* to *concepts*
* assuming "language of thought" to express complex concepts
* example: grammar for boolean concepts, priors + noisy labelling to learn rules
    * this already explains human concept learning pretty damn well

## The Cultural Ratchet
* starts to struggle with many complex concepts with many features from lots of data
    * stronger priors?
    * neural networks?
* human concept learning actually *doesn't* scale super well...
* "cultural ratchet" to accumulate knowledge over generations
    * requires faithful transmission of concepts in a way that's easier than directly learning
* experimental setup to compare learning from language alone (teacher/student) vs. from examples
    * language seems to be effective and efficient (takes less time)
* modeling – understanding teaching utterances
    * v. small dataset – 365 utterances
    * pretty simple model with LSTM + CNN encoders
    * agreement with teacher similar as for humans
    * doesn't seem to be doing "the right thing" though
* what kind of language do teachers use?
    * language of generalisation
* baseline – reference game (describe which object to choose – concretely rather than concepts)
    * e.g. comparing bare plural generics – more prevalent in concept teaching setting
    * aside: reference games are super nice for grounded language data :+1:
* hypothesis: cultural ratchet arises specifically from ability of language to convey generalizations

## Generics
* how do we learn from generics?
* our interpretation of them differs weirdly, wtf is going on
* generics as types of examples
    * teaching has social force – someone is *intending* it as an example
* two models
    * rational speech acts
    * pragmatic listener
* need to compute likelihoods
* collect some data
    * prior expectations of prevalence are different depending on the property
* social model better accounts for data
* q: how do people learn about properties?

## Conclusion
* hypothesis: language prepares you for future learning
    * regularizer for transfer learning
* logical language of thought? – maybe sufficient in the cultural ratchet setting, but who knows
* specifically interested in the gap between baby humans and baby monkeys
    * they both learn a ton, but monkeys don't build rocket ships :rocket:
