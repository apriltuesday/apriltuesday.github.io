---
layout: post
title: "Mirella Lapata: Learning Natural Language Interfaces with Neural Models"
date: 2019-05-09
category: blog
---

Part of my series of notes from [ICLR 2019](https://iclr.cc/Conferences/2019) in New Orleans.
Mirella Lapata was brilliant, witty, and adorable, best talk I've seen at ICLR.

## Introduction
* want to interact with computers in human language
    * **semantic parsing**
* natural language => machine executable language
    * don't really care what that language is – SQL, lambda calculus, whatever
* applications: question answering, digital assistants, etc.
    * Bill Gates: "smooth-talking AI assistants" :hairdresser
    * "they all have female names, which i object to"
    * "Why not bob... i don't know"
* this SNL clip on Alexa go watch go watch
* challenges:
    * match natural and artificial language
    * well-formed machine language (structured prediction)
    * model coverage

## Structural Mismatches
* seq2seq model to map natural language input to logical form
    * encoder-decoder, attention mechanisms
* "we are natural language people and we do not like sequences"
* want **seq2tree**
    * decoder predicts sequentially, but can predict non-terminal nodes that take preceding information to feed child LSTM
    * training and inference are standard

## Well-formedness Constraints
* "coarse-to-fine" decoding
* don't predict logical form immediately
* predict **meaning sketch** - abstraction of logical form
    * sketches shared for examples with same basic meaning
    * (how's annotation work for this?  is it more difficult?)
* where do the templates come from?
    * could learn... probably overkill though
    * from lambda expression / code we know what we want to remove - variables etc.
* experiments – nothing specific to particular meaning representation

## Coverage
* humans will always say unpredictable stuff
* query paraphrasing framework – not a total solution, but it can make things more robust
* train paraphrase model **jointly** with QA model
* aside: where do the paraphrases come from?
* architecture
    * paraphrase scoring - is this a good paraphrase?
    * QA model - wants good paraphrase and good answer
* paraphrase model - neural machine translation, want EN-EN
    * e.g. opennmt.net
* bilingual pivoting – if 2 phrases translate to same phrase in another language, likely to be paraphrases
    * indirect path EN-XX-EN
    * use multiple pivots (including in other languages)

## Conclusion
* encoder-decoder performs competitively with minimal engineering effort
* constrained decoding is important
* paraphrases enhance model robustness
* models are fully general
* future work: learn model from database alone
    * "we will never have enough training data"

## Q&A
* GANs to generate paraphrases?
    * the issues are around constraining the semantics
* predicting the sketches matter a lot – have high weight (hyperparameter)
* large language model pretraining & fine-tuning?
    * could help for small datasets, but benefits diminish for larger datasets though
    * could help a lot of paraphrasing – similarity scoring etc.
    * "rumour has it that wherever you use BERT you get 2-3% performance increases"
* other settings besides supervised?
    * e.g. have answer to question, not logical form
