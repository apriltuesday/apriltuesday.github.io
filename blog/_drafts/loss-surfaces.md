---
layout: post
title: "Loss Surfaces, Mode Connectivity, and Fast Ensembling of DNNs"
date: 2018-03-11
---

# TL;DR

The paper presents an algorithm for finding high-accuracy polygonal paths between local minima in
the loss surfaces of neural networks. Analysis of performance characteristics of models
corresponding to different points along these paths leads to an efficient and high-performance
method for ensembling neural networks.

# Details

## But why do we want this path anyway

There's a lot of interest recently in understanding how neural networks and SGD work via analyzing
the loss surface and how it is traversed. Basically finding such a high-accuracy (low-loss) path
between minima is just another geometric tool of analysis in our analytic toolbox. Personally I
don't feel they spelled this out super clearly from the outset, but that's probably just me and if
I were more familiar with the literature maybe I wouldn't need it spelled out any more clearly!

Here's a good statement of this idea from the conclusion of the paper though:
> At a high level we have shown that even though the loss surfaces of deep neural networks are
> very complex, there is relatively simple structure connecting different optima. Indeed, we can
> now move towards thinking about valleys of low loss, rather than isolated modes.

## Theoretical or empirical

One funny thing about this paper for me (not necessarily a bad thing! especially since I am dumb and
generally have no idea what I'm talking about) is that I constantly had the **feeling** that the
results were theoretical rather than empirical.

For example, in the abstract they state that "the optima of these complex loss functions are in fact
connected by a simple polygonal chain with only one bend, over which training and test accuracy are
nearly constant," which makes it sound like there is some strong theoretical guarantee to this
effect. But as far as I can tell, the path-finding algorithm provides no guarantees that this must
be the case, as the method only minimizes loss along the path; they only show that this
experimentally true about the paths their algorithm finds, and even then only really for networks on
image datasets (there's a brief shoutout to RNNs in the appendix but it's hardly the focus and all
the insights into the nature of the paths are presented only for convolutional / residual networks).

Nonetheless, there are a ton of fascinating empirical observations buried in here, each of which
probably deserves a paper on its own. For example, they point out that even when the original
proposed loss is tractable,they still optimize the approximation as it is "more stable" for the
polygonal chains. Why would this be the case? I'm not sure, perhaps if I spent some more time
pondering the nature of the approximation I could justify this.

Another example is this observation:
> While the training and test accuracy are relatively constant, the pattern of loss, shared across
> train and test sets, indicates overconfidence away from the three points defining the curve: in
> this region, networks tend to output probabilities closer to 1, sometimes with the wrong answers.

Does this imply that there is some relationship between local minima in these decision surfaces and
confidence, i.e. characteristics of the predicted probability distributions? If so, this is pretty
interesting and worth investigating.

## Ensembles yay

The notion of taking an ensemble of models located along the high-accuracy curve is quite cool. The
performance differences for CIFAR seem pretty tiny (22.0% for an ensemble of the endpoints vs.
21.03% for an ensemble of 50 models along the curve), but I guess this is the name of the game in
CIFAR-land. Though I am curious as to whether this result is statistically significant, were
multiple such curve-ensembling experiments run, etc.

Still I think this idea is actually awesome, basically it means we can train just two neural
networks and get an effectively infinite number of functionally distinct yet equally high-performing
neural networks for free (or for the price of computing the curve). But apparently this was not yet
awesome enough for the authors, who then go on to introduce their Fast Geometric Ensembling
algorithm, which is less fussy than the curve-based ensembling and also requires only training
**one** neural network, yay!

One thing I don't quite understand however is the extent of the connection between the FGE algorithm
and the geometric insights of the first half of the paper. My understanding is that FGE depends on
two such insights:
1. Existance of a low-loss path from any (?) local minimum. This means that given a starting set of
optimized weights, there exists a direction along which we can safely wander without increasing
loss by much
2. Loss can decrease even after a relatively small step along the low-loss path, which inspires the
cyclic learning rate schedule in a way I don't quite understand right now.

# Final thoughts

I love the effusive final paragraph listing all the kickass research directions the authors clearly
believe this work should open up. Maybe this effusiveness is contagious, because I also find this
work pretty exciting as it opens up a new way of analyzing error surfaces and building practical
algorithms based on this analysis.

* why wouldn't models along such paths be susceptible to the same kinds of adversarial attacks?
(unless you specifically encouraged them not to)

