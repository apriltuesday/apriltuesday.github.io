---
layout: post
title: "Noah Goodman: How we come to know"
date: 2019-05-09 12:00:00
category: blog
---

Part of my series of notes from [ICLR 2019](https://iclr.cc/Conferences/2019) in New Orleans.

## Introduction
* the problem of **induction** – how do people learn so much from so little?
* need learning mechanism to go from *examples* to *concepts*
* assuming "language of thought" to express complex concepts (somewhat provocatively...)

![grammar](/assets/images/2019-iclr/grammar.jpg "grammar")

* example: grammar for boolean concepts, priors + noisy labelling to learn rules
    * this can actually already explain human concept learning pretty damn well
* starts to struggle with many complex concepts, with many features, from lots of data
    * stronger priors?
    * neural networks?
    * ...

## The Cultural Ratchet
* human concept learning actually *doesn't* scale super well...
* **cultural ratchet** to accumulate knowledge over generations
    * amplifies limited individual learning
    * see [Tomasello 1999](http://www.codebiology.org/pdf/[11]%20Tomasello%20(1999).pdf)

![ratchet](/assets/images/2019-iclr/ratchet.jpg "ratchet")

* requires faithful transmission of concepts in a way that's easier than directly learning
    * maybe: language?!
* experiment to compare concept learning from language alone (teacher/student setup) vs. from examples
    * language seems to be effective (learn concepts) and efficient (takes less time)
* some modeling to understand the "teaching utterances" people use
    * v. small dataset – 365 utterances
    * pretty simple model with LSTM + CNN encoders
    * agreement with teacher similar as for humans
    * doesn't seem to be doing "the right thing" though

![generalization](/assets/images/2019-iclr/generalization.jpg "generalization")

* what kind of language do teachers use?
    * language of **generalisation**
* baseline to compare – reference game (describe which object to choose – concretely rather than concepts)
    * e.g. find that bare plural generics are more prevalent in concept teaching setting
    * aside: reference games are super nice for grounded language data :+1:
* hypothesis: cultural ratchet arises *specifically* from ability of language to convey generalisations

## Generics
* how do we learn from generics?
* our interpretation of them differs weirdly, wtf is going on
* generics as **minimal examples**
* but also, teaching has **social force** – someone is *intending* it as an example
* two models
    * rational speech acts – to model minimal example viewpoint
    * pragmatic listener – to model social force viewpoint

![formalizing](/assets/images/2019-iclr/formalizing.jpg "formalizing")

* collect some data...
* prior expectations of prevalence are different depending on the property
    * e.g. true or false: "Birds lay eggs" vs. "Birds are female"
* social model better accounts for data => supports generics as *intended* minimal examples
* open question: how do people learn about properties?

![final model](/assets/images/2019-iclr/final-model.jpg "final model")

## Conclusion and Q&A
* hypothesis: **language prepares you for future learning**
    * regularizer for transfer learning
* logical language of thought? really?
    * might be sufficient in the cultural ratchet setting, but who knows
* specifically interested in the gap between baby humans and baby monkeys
    * they both learn a *ton*, but monkeys don't build rocket ships :rocket:
