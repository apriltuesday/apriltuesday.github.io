---
layout: post
title: "Three Recent Directions in Neural Machine Translation"
date: 2018-08-20
category: blog
tags: [nlp meetup, nlp, machine translation, notes]
---

Kyunghyun Cho (FAIR and NYU), South England Natural Language Processing Meetup

Slides are [here](https://drive.google.com/file/d/1VovaSKNrryVefFpFDaJ9JBInM2TO_DiM/view).  This was a good talk!  So good that we ran overtime with no flagging in audience interest and had about 6 minutes to get out of the British Library before it closed.

## 1. Non-Autoregressive Sequence Modeling
* [primary paper](https://arxiv.org/pdf/1802.06901.pdf)
* decoding for sequence modeling
    * exact is intractable
    * even approximate is inherently sequential
<center>
<img src="/assets/images/2018-08-20/1-autoreg.png" title="autoregressive" width="50%">
</center>
* hence non-autoregressive - assume conditional independence among outputs
    * decoding is tractable and parallelizable, yay!
    * but there are dependencies, boo
<center>
<img src="/assets/images/2018-08-20/2-nonauto.png" title="naive non-autoregressive" width="50%">
</center>
* use latent variables to model dependencies
* however, we can't marginalize over our latent variables generally
    * => need to impose some *interpretation* on those latent variables to make it tractable
* example for translation ([Gu et al. 2018](https://arxiv.org/abs/1711.02281))
    * repetition as latent variable (this word in source language translates to how many in target?)
    * use `fast_align` for supervision ([Dyer et al. 2013](http://www.aclweb.org/anthology/N13-1073))
<center>
<img src="/assets/images/2018-08-20/3-latent.png" title="non-autoregressive with latent variables" width="50%">
</center>
* what else can we do?
* let latent variables share output semantics (vocab)
    * allows us to do *iterative refinement* of translation
    * a picture is worth a thousand words here...
<center>
<img src="/assets/images/2018-08-20/4-iterative.png" title="iterative refinement" width="75%">
</center>
* model in the box can be just about anything, they used transformer because why the hell not
* loss is true translation (with some corruption) for each iteration
* iterative refinement behaves like conditional denoising autoencoder - learns gradient field that points to data manifold
* almost as good as SOTA, but 4x faster (especially on low-resource languages)
* (from an audience question) maybe could do beam search on the iterations... but, maybe that's what the refinement is learning to do already!
* takeaways:
    * latent variables can capture output dependences more efficiently (than autoregressive decoding)
    * different interpretations => different learning/decoding algorithms
        * "2 rabbits with 1 stone", as the Korean version of the proverb apparently goes :rabbit2:


## 2. Meta-Learning for Low Resource Languages
* [primary paper](https://openreview.net/pdf?id=S1g5ylbm1Q) (anonymous but the figures are the same :stuck_out_tongue:)
* how to do multilingual MT?
* multitask - N-to-N via shared representation space
* can use 1 encoder/decoder with e.g. Universal Lexical Representation ([Gu again, natch](https://arxiv.org/abs/1802.05368))
* BUT
    * tends to overfit to low-resource and underfit to high-resource languages
    * or just ignore low-resource completely
    * results are good but reality involves lots of tricksy tuning
    * "it's more of an art than a science - and a pretty horrible art!"
* we really want transfer learning
* enter *model-agnostive meta-learning* ([Finn et al. 2017](https://arxiv.org/abs/1703.03400))
* very roughly: simulate gradient update & loss on a validation set
    * kind of like hyperparameter search... but on the parameters themselves
* similarity between source and target languages still matters for performance
    * awaits fully universal bit-level SOTA MT results from OpenAI in a few years :wink:
* takeways:
    * growing importance of higher-order learning - learning to learn
    * I should try to actually understand meta-learning someday

![meta-learning](/assets/images/2018-08-20/meta.jpg "meta-learning")

## 3. Real-time Machine Translation
* [primary paper](https://arxiv.org/pdf/1610.00388.pdf)
* simultaneous translation - a vaguely ridiculous task
    * want to minimise delay while maximising quality of translation
* Neural Networks as Forgetting Machines
    * hidden layers contain *more info* than is needed for the task
    * (editor's note: echoes of InferSent kicking ass, maybe information bottleneck?)
* train a "software hack" to look inside NN - using RL
    * basically fix a NMT model & just train a policy on top
* decides when to have the NMT model output a target symbol or wait
    * when it decides to translate?  roughly follows attention (!)

![simultaneous](/assets/images/2018-08-20/simultaneous.jpg "simultaneous")

* takeaways:
    * learning, inference, model - the three axes of ML, which must be considered jointly
    * find the hidden info in model layers before just trying new ones, you may be surprised
    * (editor's note: this is exactly the takeaway of a [certain excellent ICLR workshop paper](https://arxiv.org/abs/1805.03435))

We spent approximately 30 seconds on this entire section but it *blew my fucking mind*.  I mean just look at this slide, how can you not love this shit:

![trainable](/assets/images/2018-08-20/trainable.jpg "trainable")
