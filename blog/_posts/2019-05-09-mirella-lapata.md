---
layout: post
title: "Mirella Lapata: Learning Natural Language Interfaces with Neural Models"
date: 2019-05-09 9:00:00
category: blog
tags: [iclr2019, ml, nlp, notes]
---

Part of my series of notes from [ICLR 2019](https://iclr.cc/Conferences/2019) in New Orleans.
This was a *fantastic* talk, and not just because it included [this SNL clip on Alexa](https://youtu.be/YvT_gqs5ETk).

## Introduction
* want to interact with computers in human language
* **semantic parsing**
    * natural language => machine executable language
    * don't really care what that language is – SQL, lambda calculus, whatever
* applications: question answering, digital assistants, etc.
    * "They all have female names, which I object to. Why not Bob... I don't know"
* challenges:
    * match natural and artificial language
    * well-formed machine language (structured prediction)
    * model coverage

![challenges](/assets/images/2019-iclr/challenges.jpg "challenges")

## Structural Mismatches
* seq2seq model to map natural language input to logical form
    * encoder-decoder, attention mechanisms, the works
* but "we are natural language people and we do not like sequences"
* use **seq2tree** instead
    * decoder predicts sequentially, but can predict non-terminal nodes that use preceding information to feed child LSTM
    * training and inference are standard

![seq2tree](/assets/images/2019-iclr/seq2tree.jpg "seq2tree")

## Well-Formedness Constraints
* "coarse-to-fine" decoding
* don't predict logical form immediately
* predict **meaning sketch** – abstraction of logical form
    * sketches are shared for examples with same basic meaning
    * (how's annotation work for this? is it much more difficult?)
* where do the templates come from?
    * could learn... probably overkill though
    * from lambda expression / code where we know what we want to remove (variables etc.)
* experiments – note nothing is specific to particular meaning representation

![coarse](/assets/images/2019-iclr/coarse.jpg "coarse")

## Coverage
* humans will always say unpredictable stuff
* **query paraphrasing framework** – not a total solution, but it can make things more robust
* train paraphrase model *jointly* with QA model
* aside: where do the paraphrases come from?

![qa](/assets/images/2019-iclr/qa.jpg "qa")

* architecture
    * paraphrase scoring – is this a good paraphrase?
    * QA model – wants good paraphrase and good answer
* for paraphrasing, use neural machine translation (e.g. [OpenNMT](http://opennmt.net/)), but want EN-EN...
* **bilingual pivoting**
    * if 2 phrases translate to same phrase in another language, likely to be paraphrases
    * indirect path EN-XX-EN
    * use multiple pivots (including in other languages)

![pivoting](/assets/images/2019-iclr/pivoting.jpg "pivoting")

## Conclusion
* encoder-decoder performs competitively with minimal engineering effort
* constrained decoding is important (trees & sketches)
* paraphrases enhance model robustness
* all these models are fully general :+1:
* data and code [here](https://homepages.inf.ed.ac.uk/mlap/index.php?page=code)
* future work:
    * learn meaning sketches
    * learn model from database alone
        * "we will never have enough training data"
    * and of course...

![brexit](/assets/images/2019-iclr/brexit.jpg "brexit")

## Q&A
* GANs to generate paraphrases?
    * the issues are around constraining the semantics
* predicting the sketches matter a lot – have high weight (hyperparameter)
* large language model pretraining & fine-tuning?
    * could help for small datasets, but benefits diminish for larger datasets
    * could help a lot with paraphrasing – similarity scoring etc.
    * "Rumour has it that wherever you use BERT you get 2-3% performance increases"
* other settings besides supervised?
    * e.g. have answer to question, not logical form
