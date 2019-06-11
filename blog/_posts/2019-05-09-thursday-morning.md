---
layout: post
title: "Thursday Morning Contributed Talks"
date: 2019-05-09 10:00:00
category: blog
tags: [iclr2019, ml, nlp, notes]
---

Part of my series of notes from [ICLR 2019](https://iclr.cc/Conferences/2019) in New Orleans.

## Pay Less Attention with Lightweight and Dynamic Convolutions
* is self-attention critical for good performance? (e.g. transformer)
* can you do well with limited context with a more efficient mechanism?
* background on sequence modelling architectures
    * RNNs, CNNs, self-attention – pros & cons to each

![sequence architectures](/assets/images/2019-iclr/seq-arch.jpg "sequence architectures")

* **DynamicConv** – does about as well as self-attention and also fast, hooray
    * addresses dynamic weights issue with CNNs
    * for each word, learn the appropriate convolutional kernel
    * downside: tons of weights to learn...

![dynamic](/assets/images/2019-iclr/dynamic.jpg "dynamic")

* solution: **lightweight convolution**
    * depthwise convolution (Sifre 2014 PhD thesis, also see [Chollet 2016](https://arxiv.org/abs/1610.02357)) – channels/features not fully connected
    * also use weight sharing across heads

![lightweight](/assets/images/2019-iclr/lightweight.jpg "lightweight")

* model: replace self-attention layer in transformer wtih dynamic lightweight conv
* experiments
    * lightweight does well => lots of redundant weights in convolutions
    * self-attention with limited window improves speed by 20% without hurting performance
        * shows we don't necessarily need the infinite context

## The Neuro-Symbolic Concept Learner: Interpreting Scenes, Words, and Sentences From Natural Supervision
* concepts in visual reasoning, e.g. for visual QA, captioning, etc.
* end-to-end visual reasoning neural nets tend to entangle the concepts and the reasoning
    * concepts can't transfer to other tasks
* NS-VQA ([Yi et al. 2018](https://papers.nips.cc/paper/7381-neural-symbolic-vqa-disentangling-reasoning-from-vision-and-language-understanding.pdf)) – splits out concepts, but needs concept and program annotations
* idea: **joint learning** of concepts and semantic parsing
    * program helps learn concepts, and vice versa

![neurosymbolic](/assets/images/2019-iclr/neurosymbolic.jpg "neurosymbolic")

* shared representation space of visual representations of objects & concepts extracted from verbal question
    * only need answer to the question as supervision
* REINFORCE algorithm to learn semantic parsing – reward is just whether executed program's answer is correct or not
* curriculum learning to learn more complex questions
    * since we're bootstrapping of the performance of the semantic program which can be crappy

## Smoothing the Geometry of Probabilistic Box Embeddings
* vector representations don't give you notions of region size, asymmetry
* alternatives have their own downsides
    * Gaussian representation ([Vilnis & Mccallum 2014](https://arxiv.org/abs/1412.6623))
    * cone representation ([Vendrov et al. 2015](https://arxiv.org/abs/1511.06361), [Lai & Hockenmaier 2017](https://www.aclweb.org/anthology/E17-1068))
* instead: "*n*-dimensional hyperrectangles – in other words, a box" ([Vilnis et al. 2018](https://arxiv.org/abs/1805.06627))
    * can encode common sense reasoning, e.g. entailment

![box](/assets/images/2019-iclr/box.jpg "box")

* training
    * randomly initialized
    * gradient descent to get the correct probability distributions
* **zero gradient problem** in loss function
    * original solution involves surrogate loss, which is tricky to optimise
* this paper: **smoothed box** with softplus
    * corresponds to applying Gaussian uncertainty to box edges
* experiments – MovieLens recommendations, binary classification for WordNet
    * robust to initializations
    * robust to sparsity of data
* Q&A
    * trained on supervised data, but can be extended to word2vec-style unsupervised data
    * word analogy tasks – how do we do addition / subtraction in box space?

## Ordered Neurons: Integrating Tree Structures into Recurrent Neural Networks
* languages :heart: trees
* focus on constituency tree
* can we use tree inductive bias to *infer* the tree structure?
* two existing model types: recurrent and recursive 
    * problem: defends on externally provided tree structure (e.g. parser)

![ON-RNN](/assets/images/2019-iclr/on-rnn.jpg "ON-RNN")

* **ordered neurons**
    * larger constituents / high rank neurons should last longer than smaller / low rank
    * use forget gates to erase information
* new activation function – cumulative softmax
* experiments – language modelling, syntactic parsing
