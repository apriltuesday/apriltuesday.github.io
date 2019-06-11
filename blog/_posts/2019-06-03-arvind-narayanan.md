---
layout: post
title: "Arvind Narayanan: Data as a Mirror of Society"
date: 2019-06-03 09:00:00
category: blog
tags: [naacl2019, nlp, ethics, bias, notes]
---

Part of my series of notes from [NAACL-HLT 2019](https://naacl2019.org/) in Minneapolis.

## Introduction
* Amazon's biased recruiting tool
    * the data was biased because the recruiting practices were biased
    * the model just learned to faithfully reflect that

![complementary](/assets/images/2019-naacl/complementary.jpg "complementary")

* complementary research agendas
    * studying people can help us mitigate issues in ML
    * ML models can help us understand people
* some examples: toxic language detection, face recognition, predictive policing
* ML is pattern recognition in existing data, we shouldn't be surprised about any of this
* real phase shift in interest in fairness in ML around 2016/2017

![fairness](/assets/images/2019-naacl/fairness.jpg "fairness")

## Word Embeddings
* [Bolukbasi et al., NIPS 2016](https://arxiv.org/abs/1607.06520) – analogies paper
* [Caliskan et al., Science 2017](https://arxiv.org/abs/1608.07187) – speaker's paper, dive into this one
* **implicit association test**
    * differential reaction time is a measure of bias
* create **word embedding association test**
    * differential word similarity is a measure of bias
    * not symmetric, interestingly
* analysis applied to pretrained GloVe (web data) and word2vec (news data)
    * actually not many differences even though nature of data quite different
* warmup: universal associations
    * e.g. between flowers & pleasantness vs. insects & unpleasantness
    * validates that this approach seems to work
* also show effect with gender, race, age, etc.

## Understanding culture helps discover bias in ML
* don't need to be a psychology or sociology expert, some commonsense knowledge helps
    * NB. this is why we need diversity in ML! the speaker didn't say this, but I am definitely saying it!
* [Rudinger et al., NAACL 2018](https://www.aclweb.org/anthology/N18-2002) – gender bias in coreference resolution for occupations
* [Blodget & O'Connor 2017](https://arxiv.org/abs/1707.00061) – racial bias in language identification for different dialects
    * use census data to get probability distribution of demographics according to location
    * topic modeling with demographic groups as topics
    * validate by reproducing linguistic phenomena
    * proposed mitigation: ensemble models
* raises further ethical qustions...
    * what counts as "African American English"?
    * when is it appropriate to treat different groups differently?
        * this is very tricky, legally and ethically

## Interlude: Debiasing
* debiasing word embeddings – "is vs. ought"
* maybe be a bit cautious – doing surgery on things we don't understand so well
* word embeddings are quite brittle
* bias detection is also brittle
* debiasing is not always the answer!
* does bias in representation translate to bias in downstream tasks?
    * mitigation should be application specific

## ML as a magnifying lens into human culture
* doing this with corpus linguistics for a while
* word embeddings can extend this by using real-world statistics accurately
* [Garg et al., PNAS 2018](https://arxiv.org/abs/1711.08412) – word embeddings quantify 100 years of gender and ethnic stereotypes
    * can study these to understand e.g. historical stereotypes

![stereotypes](/assets/images/2019-naacl/stereotypes.jpg "stereotypes")

* [Lewis & Lupyan, PNAS 2019](https://psyarxiv.com/7qd3g) – does language merely reflect or also *cause* stereotypes?
    * study 25 different languages and correlate to implicit bias in the countries
    * also structural encoding of gender in different languages – maybe implies causality
    * not just distributional semantics, but also linguistic structure
* many under-explored research directions here
