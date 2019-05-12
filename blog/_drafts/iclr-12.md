---
layout: post
title: "Thursday Morning Talks"
date: 2019-05-09
category: blog
---

Part of my series of notes from [ICLR 2019](https://iclr.cc/Conferences/2019) in New Orleans.

## Pay Less Attention with Lightweight and Dynamic Convolutions
* is self-attention critical for good performance? (e.g. transformer)
* can you do well with limited context with a more efficient mechanism?
* DynamicConv – does about as well as self-attention and also fast, hooray
* background on sequence modelling
    * RNNs, CNNs, self-attention
* this work addresses dynamic weights issue with CNNs
* for each word, learn the appropriate convolutional kernel
* downside: tons of weights to learn
* solution: lightweight convolution
    * depthwise convolution (sifre 2014) - channels/features not fully connected
    * weight sharing across heads
* model: replace self-attention layer in transformer wtih dynamic lightweight conv
* experiments
    * lightweight does well - lots of redundant weights on convolutions
    * self-attention with limited window improves speed without hurting performance - shows we don't necessarily need the infinite context

## The Neuro-Symbolic Concept Learner: Interpreting Scenes, Words, and Sentences From Natural Supervision
* concepts in visual reasoning, e.g. for visual QA, captioning, etc.
* end-to-end visual reasoning neural nets tend to entangle the concepts and the reasoning
    * concepts can't transfer to other tasks
* NS-VQA Yi et al 2018 - splits these out, but needs concept and program annotations
* idea: joint learning of concepts and semantic parsing
    * program helps learn concepts, and vice versa
* shared representation space of visual representations of objects & concepts extracting from verbal question
    * only need answer to the question as supervision
* reinforce algorithm to learn semantic parsing – reward is just whether executed program's answer is correct or not
* curriculum learning to learn more complex questions
    * since we're bootstrapping of the performance of the semantic program which can be crappy

## Smoothing the Geometry of Probabilistic Box Embeddings
* vector representations don't give you notions of region size, asymmetry
    * gaussian representation (Vilnis & Mccallum 2014)
    * cone representation (Vendrov 2015, Lai 2017)
* instead: n-dim hyperrectangles, i.e., a box (Vilnis, Li, Murty, Mccallum 2018)
* box representations to encode common sense reasoning – e.g. entailment
* training
    * randomly initialized
    * gradient descent to get the correct probability distributions
* problem: zero gradient problem
    * original solution involves surrogate loss, which is tricky to optimise
* this paper: smoothed box with softplus
    * corresponds to applying gaussian uncertainty to box edges
* experiments – movielens recommendations, binary classification for wordnet
    * robust to initializations
    * robust to sparsity of data
* Q&A
    * trained on supervised data, can be extended to word2vec style unsupervised data
    * word analogy tasks – how do we do addition / subtraction in box space?

## Ordered Neurons: Integrating Tree Structures into Recurrent Neural Networks
* languages :heart: trees
* focus on constituency tree
* can we use tree-structure inductive bias to infer the tree structure?
* two model types: recurrent and recursive 
    * problem: defends on externally provided tree structure (e.g. parser)
* ordered neurons
    * larger constuents / high rank neurons should last longer than smaller/low rnak
    * use forget gates to erase information
* new activation function – cumulative softmax
* experiments
    * language modeling
    * syntactic parsing
