---
layout: post
title: "Recurrent Models for Machine Perception and Advances in Optimisation"
date: 2018-08-31
category: blog
---

Notes from the most recent [London Machine Learning Meetup](https://www.meetup.com/London-Machine-Learning-Meetup/). There were three talks, so here we go!

## Recurrent Models for Machine Perception

* Speaker: [Ronnie Clark](http://ronnieclark.co.uk/) (Imperial College)
* by "recurrent", he means more generally iterative algorithms, including optimisers and filters as well as RNNs
* first, RNNs for visual-inertial odometry
    * estimating position from 2 data streams - RGB camera and IMU sensors
* rates of data streams are very different (order of magnitude) => multi-rate LSTM
    * run 1 for 10 steps, other just 1 step, concat the outputs and run through a "core" LSTM
* next up, SLAM - estimating both camera pose and depth map
* traditional methods alternately estimate pose & depth, and need lots of images
* use ML to predict depth from 1 or 2 images (!)
* can we learn representations to help the optimisation?
* of course we can!
    * autoencoder for depth maps to learn compressed code (note that depth maps exhibit sparse structure)
    * condition the autoencoder on RGB image
    * then can combine to get a model that predicts depth map directly from RGB

[image]

* enables us to optimise depth and pose jointly
    * (I can't quite remember how this works...)
* upping the ante - let's just learn how to optimise the whole damn thing by throwing an LSTM at it
    * LSTM learns to compute the update step
    * able to converge much faster
    * results are not as good but can actually be much sharper (no compression into code, LSTM can theoretically act on any pixel)

## Deep Frank-Wolfe

* Speaker: [Leo Berrada](http://www.robots.ox.ac.uk/~lberrada/) (Oxford University)

## I don't remember what this talk was called, but it was cool

* Speaker: [Rudy Bunel](http://www.robots.ox.ac.uk/~rudy/) (Oxford University)
