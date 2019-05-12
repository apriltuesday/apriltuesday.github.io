---
layout: post
title: "Tuesday Afternoon Contributed Talks"
date: 2019-05-07 13:00:00
category: blog
---

Part of my series of notes from [ICLR 2019](https://iclr.cc/Conferences/2019) in New Orleans.

## Slalom: Fast, Verifiable and Private Execution of Neural Networks in Trusted Hardware
* securely outsourcing ML inference to the cloud
* hardware isolation to ensure
    * integrity of computation
    * privacy of inputs and model
* sadly only have this for general-purpose CPUs, not GPUs / TPUs :disappointed:
* can we get best of both worlds?
* yes, apparently – we lose model privacy, but can keep the rest

![slalom](/assets/images/2019-iclr/slalom.jpg "slalom")

* crypto to securely outsource **linear layers** to GPU
* works well because
    * most computation is linear (for most deep neural net architectures anyway)
    * communication cost not bad since devices co-located
* how's this work?
    * integrity – can verify matrix product with probabilistic method + few inner products ([Freivalds algorithm](https://en.wikipedia.org/wiki/Freivalds%27_algorithm))
    * privacy – precompute on random data and use to encrypt

![secure matrix](/assets/images/2019-iclr/matrix.jpg "secure matrix")

* slalom is 10-20x slower than evaluating on GPU with no security guarantees
    * but can parallelize on CPU to increase GPU usage

## Learning to Remember More with Less Memorization
* recurrent and memory-augmented neural networks
* lack of theoretical understanding for optimal memory operations
* introduce a metric around measuring how much RNNs & MANNs "remember" given inputs
* ... got distracted by other things, whoops :shrug:

## Learning Robust Representations by Projecting Superficial Statistics Out
* domain generalization – even with domains not identified in training data
* want **domain-independent representations**, i.e. ones that capture semantics
* what is the semantics of an image? – hard
* but what is *not* semantics? – superficial statistics
* want a feature that only learns superficial statistics, not semantics at all
* then build this feature (GLCM) into neural net
* two methods
    * reverse gradient method – try to learn representations for which GLCM not predictable
    * projection method – project onto subspace orthogonal to GLCM space

## ImageNet-trained CNNs are biased towards texture; increasing shape bias improves accuracy and robustness
* motivation: how do CNNs work?
    * typically people assume it's by detecting edges, shapes, etc.
* but then why do CNNs still recognise texturised images?
* create images that have shape of one category and texture of another (using style transfer)
* experiments show humans fo sho use shape
    * but CNNs seem to have a texture bias

![shape / texture](/assets/images/2019-iclr/shape-texture.jpg "shape / texture")

* can we **induce** a shape bias?
    * maybe texture is just way easier for neural nets to use
* Stylized ImageNet – ImageNet with random textures
    * training on this effectively induces shape bias!

![distortions](/assets/images/2019-iclr/distortions.jpg "distortions")

* benefits to shape bias?
    * seems to boost object recognition / detection performance
* hypothesis for humans: natural phenomena (dust, snow...) distorts texture but generally not shape
* experimentally show that shape bias is more robust to various types of noise and distortion
* (we probably wouldn't be having this problem so much if we hadn't as a community completely overfit to the nice clean images of ImageNet... but anyway)
