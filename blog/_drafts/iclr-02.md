---
layout: post
title: "Safe ML: Specification, Robustness and Assurance"
date: 2019-05-06
category: blog
---

Part of my series of notes from [ICLR 2019](https://iclr.cc/Conferences/2019) in New Orleans.
These are talks (and panels) gfrom the [Safe ML Workshop](https://sites.google.com/view/safeml-iclr2019/home).

## Introduction
* ensure ML algorithms
    * do what they're supposed to
    * avoid causing harm
    * have positive impact

## Cynthia Rudin: Interpretability
* example: EEG used to monitor seizures
* expensive and not well-utilized where needs to be
* seizure prediction
* => 2HELPS2B score - ML model but totally interpretable, medically validated
* sparse linear model with integer coefficients
* add constraints to improve interpretability while retaining accuracy
* Rashomon set - good models, fairly big
    * interpretable model probably in here
* explainability (posthoc) vs. interpretability (no black boxes)
* FICO competition story... sometimes you really don't need black boxes
* sometimes you do though, e.g. computer vision
* This Looks Like That
    * case-based reasoning - K-nearest parts of prototypical cases
    * learn prototypes, similarity scores, class connection weights
* Risk-SLIM
    * Ustin & Rudin KDD 2017
    * bad, bad objective
    * lattice cutting plane algorithm - adapted to work for mixed-integer program
* takeaway: training is difficult, but don't sacrifice accuracy
    * if you're working on something important, it's worth it

## Dylan Hadfield-Menell: Formalizing the Value Alignment Problem in AI
* how models figure out what you want
* Faulty Reward Design - intended vs. actual environment when designing reward functions
* Bayesian approach to express uncertainty about unknown states
* => Inverse Reward Design - provide proxy reward function + training environments
* more generally: cooperative inverse reinforcement learning
    * robot chooses action, human chooses objective function
    * computationally difficult though :( (decentralized POMDP)
    * can show it's actually slightly more tractable
* Assistive Multi-Armed Bandit
    * how to help people who (initially) don't know what they want?
    * learning vs. assisting strategies
* online learning stuff (consistency rather than cumulative regret bound)
* are there assisting strategies that can actually help humans learn?
    * e.g. make an inconsistent learner consistent
    * example: greedy strategy
        * human picks best action seen so far
        * robot ensures human explores
    * noisy-greedy-in-the-limit - very weak sufficient condition

## David Krueger: Misleading meta-objectives and hidden incentives for distributional shift
* distributional shift - train/test distributions are different
* what learners "want" - objective function tells us the ends, but the means are also important
* SIDS - Self-Induced Distributional Shift
    * algorithms don't model their own effects on the world
* HIDS - Hidden Incentives for Distributional Shift
    * causes "cheating"
    * look out for HIDS!!! :ghost:
    * unit test for this (!)
* naive spec of objective creates hidden incentive to shift the distribution
* unit test for HIDS using meta-learning
    * myopic vs. non-myopic (obey vs. discuss)
    * this talk is getting weird and also very fast
* HIDS mitigation strategy: environment swapping
    * rewards from your actions go to another agent!
* why do we care?
    * unknown unknowns
    * feedback loops in content recommendation
    * don't want robots taking over the world to optimize their objective function
* hidden incentives vs. not restricting algorithm choice?

## Panel!
* analogous problems & different solutions
    * e.g. AI systems & capitalism both min/max with unknown consequences
    * but what you do about them might be very different
* fairness research & value-alignment research
* companies design systems that they are not subject to
    * e.g. criminal justice
    * incentives not aligned
* think about why pro-active regulation isn't happening
    * humans aren't good at pro-activity... but right now AI has pretty much nothing
    * ML researchers can help but probably can't solve it alone

## Beomsu Kim: Bridging Adversarial Robustness and Gradient Interpretability
* adversarial training causes loss gradients to be visually interpretable
    * not necessarily better descriptions of internal reps though
    * restricts adversarial examples to image manifold
* stronger adversary => adv ex look more natural
* decision boundary tilted along low variance directions => causes existence of adv ex
* adv training prevents decision boundary from tilting
* quantitative interpretability
    * missed how they're defining this?
* tradeoff between accuracy and gradient interpretability

## Avraham Ruderman: Uncovering Surprising Behaviors in Reinforcement Learning via Worst-Case Analysis
* evaluating RL - outside training disribution? worst-case rather than average?
* examples with mazes + ones with walls randomly moved/removed
* local search to find worst maze ever, even ones with very sparse wall structure
    * rare but simple mazes
    * humans do just fine on them
* some transfer across agents
* finding failure examples is much less efficient than for supervised learning
* do failure cases help us understand what causes failure?
* this is like a pretty simple and straightforward talk... just all this adversarial learning stuff but for RL :cool:

## Ian Goodfellow: The case for dynamic defenses against adversarial examples
* based on [this](https://arxiv.org/abs/1903.06293)
* adversarial examples: anything that is designed to mess with a model
    * not just imperceptible, etc.
* the research community is overfitting to the problem he proposed 5 years ago...
    * small norm ball perturbation model
* need more realistic threat models
    * no reason for attackers to stick to this
    * value alignment - corresponds to only first few steps of optimisation
* only focusing on starting points within test set and perturbing
    * "expectimax"
    * still not really solved after 2000 papers, but maybe some people should be moving on
* what about "true max"?
    * test set attack (Gilmer 2018)
* adversarial training improves acc on adversarial set but tends to decrease on natural test set
* failure rate r -> 0 will never happen (except for simple tasks), so can't defeat the test set attack
* (btw humans also have non-zero failure rate, so not an existance proof)
* what about stochastic defenses?
    * model still can't be perfect, so still a failure rate
* what about abstention?
    * still just reducing r, still not perfect (m+1 classes)
* what about dynamic?
    * breaks train / infer division :devil:
    * behaviour that changes after deployment
    * v. scary
* making models less flaky should make things more secure
* "memorization" defense (with or without abstention)
    * existence of dynamic defense that outperforms fixed defenses on test set attack
* dynamic is necessary, probably not sufficient
* does dynamic always need an oracle? hard to imagine what it looks like without

## Panel Number Two
* how do we get good specifications to then optimize?
    * they're not just handed down from god...
    * Center for Human Compatible AI
* "One thing that will get easier is convincing people of the importance of AI safety research" -Goodfellow
* make AIs that make the same mistakes as humans?
    * dynamic proposal: can't make a perfect system, so make mistakes not predictable
    * there isn't even a ground truth for most tasks, so of course AI systems will make mistakes
* AI safety: how do you deal with the fact that humans are suboptimal?
* think about how safety works in other fields of comp sci
    * e.g. Byzantine fault tolerance
* "The Elephant in the Room" paper
* Goodfellow wants less crappy adversarial example papers :+1:
