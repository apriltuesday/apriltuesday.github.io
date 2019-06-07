---
layout: post
title: "Deep Adversarial Learning for NLP"
date: 2019-06-02 10:00:00
category: blog
---

Part of my series of notes from [NAACL-HLT 2019](https://naacl2019.org/) in Minneapolis.

Slides for this tutorial are [here](https://drive.google.com/drive/folders/1E4uHe4_TD4yDJws3t1kXJQanUFJiqpBB), from which all the images in this post are taken.

## Part I: Adversarial Learning & GANs

* subareas, interpretation, success stories, pitfalls
* interdisciplinary – vision, security, game theory...
* what about NLP?
    * progress is "on the slower side" (tactifully put)
* adversarial examples, training, & generation
* [Alzantot et al., EMNLP 2018](https://arxiv.org/abs/1804.07998) – adversarial examples for NLI by subbing in synonyms
    * cf. brittleness vs. generalisation in deep learning, statistics more generally
* [Coavoux et al., EMNLP 2018](https://arxiv.org/abs/1808.09408) – latent representation sent over private channel
    * attacker trying to decode representation to original input

### Adversarial Training
* adding noise, randomness, or adversarial loss to training objective
* [Wu et al., EMNLP 2017](https://www.aclweb.org/anthology/D17-1187) – Adversarial Training for Relation Extraction
    * task is relation classification given entities
    * regularisation of feature space
    * simple but effective
* adversarial learning is not just GANs! that being said...

### GANs
* generator vs. discriminator game, reach equilibrium, yadda yadda yadda
* many issues...
* **mode collapse**: can't produce diverse samples
* often still need to **pre-train** discriminator and generator, but not clear how much
    * too much => not much entropy, mode collapse
    * too little => doesn't converge
* **instability** of training – and now you need to train *two* models! :sob:
    * discriminator can overpower generator
    * models with very different architectures, might need different numbers of updates etc. (e.g. self-attentive vs. recurrent)
* originally designed for continuous data, what about **discrete**?
    * cannot backprop through generated X when X is discrete
* BUT: SeqGAN ([Yu et al. 2017](https://arxiv.org/abs/1609.05473)) – policy gradient for generating sequences

<center>
<img src="/assets/images/2019-naacl/seqgan.png" title="SeqGAN" width="60%">
</center>

* [de Masson d'Autume et al., 2019 on arxiv](https://arxiv.org/abs/1905.09922) – Training Language GANs from Scratch
    * claims no MLE pre-training
    * per-timestamp dense rewards
    * learning not sample-efficient with sparse end-state rewards, dense rewards help
* why shouldn't NLP give up on GANs?
    * unsupervised :+1:
    * discriminator is often learning a **metric** – reward-learning
    * **self-supervised learning** (especially with dense rewards)
        * [aside: isn't "self-supervised" actually just what unsupervised means?]

### Applications
* contrastive estimation (e.g. [Bose et al., 2018](https://arxiv.org/abs/1805.03642))
* domain adaptation (many) – e.g. concept drift
* IR GANS for ranking ([Wang et al., 2018](https://arxiv.org/abs/1705.10513))
    * also see tutorial [here](https://arxiv.org/pdf/1806.03577.pdf)
* [Wang et al., ACL 2018](https://arxiv.org/abs/1804.09160) – No Metrics Are Perfect: Adversarial Reward Learning
    * e.g. for generation – don't really know what the objective should be (BLEU, ROUGE, etc.), why not learn it
* DSGAN ([Qin et al., ACL 2018](https://www.aclweb.org/anthology/P18-1046)) – Distant Supervision IE
* also can use GANs to denoise training data
* KBGAN ([Cai & Wang, NAACL 2018](https://www.aclweb.org/anthology/N18-1133)) – iteratively learn better negative examples for knowledge graphs

### Case Study: Dialogue Systems
* what should the reward be for dialogue systems?
    * e.g. the Turing Test... is basically a GAN!
* adversarial learning for neural dialogue generation ([Li et al. 2017](https://arxiv.org/abs/1701.06547))
    * this is about chitchat not goal-oriented dialogue
* basically this is reward, use policy gradient to backprop to generator
* also teacher-forcing – combining imitation learning / human demonstration with reinforcement learning
* self-supervised dialogue learning (Wu et al. ACL 2019, not yet online)
    * learn dialogue structure (sequence ordering)
    * permute dialogue acts and see if discriminator can distinguish


## Part II: Adversarial Examples & Rules

* adversarial examples: what's going on here?
* in high dimensions, *almost all* points are close to the decision boundary
    * don't think I've ever heard it put this way before...
* applications:
    * security of ML models – "what's the worst that could happen"
    * evaluation – held-out test error is not enough
    * finding bugs – "natural" adversaries (e.g. typos)
    * interpretability – what does the model care about, what does it ignore

![challenges](/assets/images/2019-naacl/challenges.png "challenges")

* challenges for NLP
    * **change** – no L2, what is imperceptible / small vs. big change?
    * **effect** – condition of misbehaviour if the task isn't classification, e.g. structured prediction and generation
    * **search** – text is discrete, how to search over all sequences?
* "people have been working on all three of these, and when you combine them, you get a paper"
* choices in crafting adversaries...

![change](/assets/images/2019-naacl/change.png "change")

### What is a small change?

* characters vs. words vs. phrases / sentences
    * pros and cons to these
    * main challenge: what is distance? (edit distance, semantics...)
* character – add/swap/remove characters
    * can result in words whose nearest neighbours are very far
* word – random, word-embedding-based, POS-constrained, language model
    * depending on what you're trying to do, some of these perturbations are really not a problem
* paraphrasing via backtranslation
    * words can be completely different, but has to *mean* the same thing
    * e.g. [Iyyer et al., NAACL 2018](https://www.aclweb.org/anthology/N18-1170)
* changing via sentence embeddings – can do normal L2 distance in representation space
    * encode, perturb, decode

![search](/assets/images/2019-naacl/search.png "search")

### How do we find the attack?

* need to know threat model
    * black box – only get model output
    * white box – full model access, i.e. gradients
    * grey box – like black but you have access to probabilities
* in practice even black box is unrealistic, don't have unlimited queries
* gradient-based (white)
    * step in the direction of the gradient
    * find the nearest neighbour (since the new embedding might be gibberish)
    * repeat as needed – can do beam search
* sampling-based (grey)
    * generate perturbations, select ones that look good
    * repeat as needed
* trial & error (black)
    * try some stuff, see if it works

![effect](/assets/images/2019-naacl/effect.png "effect")

### What does it mean to misbehave?

* classification – want it to be another class (any / targeted)
* loss-based – just try to maximise loss
* test whether a certain property holds
    * e.g. word is / isn't generated, no PERSON entity detected, etc.
* **evaluation** – are the attacks "good"?
    * effective
    * perceivable – should they have the same label, does it seem natural, does it mean the same thing
    * does it improve the model
    * just look at some examples :shrug:

### Some Papers
* noise breaks machine translation ([Belinkov & Bisk, ICLR 2018](https://arxiv.org/abs/1711.02173))
* Hotflip (Ebrahimi et al, [ACL 2018](https://aclweb.org/anthology/P18-2006) & [COLING 2018](https://aclweb.org/anthology/C18-1055))
* search with genetic algorithms ([Alzantot et. al. EMNLP 2018](https://arxiv.org/pdf/1804.07998.pdf))
    * interpretability – how much can we learn about what the model is doing based on what kinds of adversarial examples the model "supports"
* natural adversaries ([Zhao et al, ICLR 2018](https://arxiv.org/abs/1710.11342))
    * only needs a GAN – works for images as well
* semantic adversaries ([Ribeiro et al, ACL 2018](https://aclweb.org/anthology/P18-1079))
    * also **adversarial rules** – try to summarise patterns that cause predictions to change

### Less related but still related
* CRIAGE: adversaries for graph embeddings ([Pezeshkpour et. al. NAACL 2019](https://www.aclweb.org/anthology/N19-1337/)
    * add / remove links to result in incorrect facts
* "should not change" (adversarial) but also "should change" (**overstability**) ([Niu & Bansal, CONLL 2018](https://arxiv.org/abs/1809.02079))
* more on overstability – anchors ([Ribeiro et al, AAAI 2018](http://sameersingh.org/files/papers/anchors-aaai18.pdf))
    * what are the regions where the prediction doesn't change
    * e.g. VQA – as long as question has the word "what" in it, the answer is always "banana"
* input reduction ([Feng et al, EMNLP 2018 ](https://arxiv.org/abs/1804.07781))
* overstability is very interesting and I definitely hadn't heard of it before!

![future](/assets/images/2019-naacl/future.png "future")

------
