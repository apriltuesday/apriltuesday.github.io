---
layout: post
title: "Industry Track"
date: 2019-06-04 09:00:00
category: blog
---

Part of my series of notes from [NAACL-HLT 2019](https://naacl2019.org/) in Minneapolis.


## Locale-agnostic Universal Domain Classification 
* ambiguities in large-scale NLU in Alexa
    * multiple domains can properly handle an utterance
    * e.g. "I want a pepperoni pizza" – order takeout, recipe, restaurant reservation?
* **shortlister** [Kim et al., ACL 2019] model to solve this problem
* expanding to other locales
* challenges
    * maintaining separate model for each locale
    * lack of training data
* locale / domain **maturity** – how long since model deployed, how much data collected
* locale **specificity** – overlapping domains between locales, but can have locale-specific slots, etc.
    * sharing data is tricky
* both shared and locale-specific encoders for utterances (BiLSTM)
* shared encoder tuned to be **locale-invariant** – adversarial locale prediction loss
* route utterance to locale-specific encoder without knowing domain using attention
* then concat representations and predict domain
* I don't really understand how this addresses the challenges?
    * maintaining different models – still have to do this I guess?
    * lack of training data – presumably can rely on the shared encoder
* experiments with different locales, different amounts of data, different kinds of domains, different encoder architectures

## Practical Semantic Parsing for Spoken Language Understanding
* **executable semantic parsing** – sentences -> logical forms
    * unify Alexa's primary problems of SLU and Q&A
* SLU Alexa data – annotated for intent/slot tagging
    * think this is proprietary, sadly
* convert this data to trees
    * allows more complex requests / multiple intents
* Q&A data – Overnight, NLmaps
    * much more low-resource than SLU datasets
* **transition-based parser** [Cheng et al. 2017] to parse into trees
    * add characater embeddings and mechanism to copy directly from input
* evaluate on Q&A and SLU tasks, including ablation studies
* this is training on each domain independently
* **transfer learning** from high- to low-resource domains
    * tried fine-tuning and multi-task learning, both seem to help
* transfer from SLU to Q&A also seems to work (preliminary)
* avoided more data-hungry architectures, e.g. seq2seq
* different annotation schemes among datasets
* full match metric is quite harsh

## Fast Prototyping Dialogue Comprehension System for Nurse-Patient Conversations
* nurses do follow-up calls after discharge
* extracting clinical info from unstructured spoken interactions
* attributes of these dypes of dialogues
    * co-references across turns & speakers (zero anaphora)
    * thinking aloud (private self-talk, backchanneling)
    * self-contradiction – within a single utterance or across multiple turns
    * topic drift
    * dialect / discourse particles
* dialogue comprehension task
* existing datasets – reading comprehension, very limited data on open-domain dialogues
* data augmentation
    * seed with real-world data
    * annotate with inquiry types & response types
* create templates
    * pair inquiry and repsonse types
    * entity value pool
    * enrich verbal expressions and get them linguistically / clinically validated
* model – standard neural architecture thing
* error analysis
    * nurses and patients do chit-chat, even within task-oriented dialogue
    * patients speculate on potential causal relations
* proof-of-concept that even without a lot of data you can get a reasonable prototype

## Graph Convlution for Multimodal Information Extraction
* IE in the real world isn't just text – can be visually rich
* for these documents visual attributes (font size, color, etc.) are very relevant
* need **multimodal IE**
* diverse tasks with low-development efficiency – techniques for one might not transfer well
* contributions: visual text embeddings and unified model
* documents are **graphs of text segments**
* combine graph convolution with BiLSTM+CRF
    * text embeddings for node features, edge features from relative positions
    * self-attention for neighbourhoods

