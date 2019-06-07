---
layout: post
title: "Question Answering Track"
date: 2019-06-05 11:00:00
category: blog
---

Part of my series of notes from [NAACL-HLT 2019](https://naacl2019.org/) in Minneapolis.

## Bidirectional Attentive Memory Networks for QA over KB
* question answering from knowledge bases
* approaches: semantic parsing vs. information retrieval
* IR more E2E trainable, fewer hand-crafted rules
    * question asker disputes this vehemently given current SP work :stuck_out_tongue:
* candidate answers from KB subgraphs – encode answer type, path, context
* existing approaches encode questions & KB independently, without considering interactions
    * hence bidirectional attentive memory network to encode both jointly
* then we went into the very complicated, probably super awesome architecture, at which point I stopped paying attention (bidirectional or otherwise)

## BoolQ: the Surprising Difficulty of Yes/No Questions
* motivation: testing inference is difficult
* crowdsourcing interesting / unusual examples of inference is tricky
* recognising entailment is an artificial task (yes!!!)
* natural yes/no question data can help here
    * quite challenging
        * rarely purely factoid ("Was Obama born in 1961?")
        * non-trivial types of reasoning
        * "no" answers usually inferred
    * well-defined end task
* data consists of question, passage, binary answer
* use anonymised queries from Google
    * annotated for yes/no answers and paragraphs from Wikipedia
    * pretty expensive data to collect (and we're not all Google either...)
* some analysis of the dataset...
* type of reasoning needed to answer the question
    * paraphrasing – quite explicitly stated
    * by example (or counterexample)
    * factual reasoning / grounded knowledge
    * implicit – complicated
    * missing mention – if it were yes (or no), it would have been mentioned
    * big bucket of other stuff
* most experiments around transfer learning
    * transfer from other types of questions, entailment, paraphrasing...
    * also some unsupervised pretrained models
* pre-training on entailment helps a lot
* "as we've come to expect, BERT does the best"
    * but adding MNLI helps even BERT
* [go explore the data](goo.gl/boolq), also will become part of [SuperGLUE](https://super.gluebenchmark.com/)

## Repurposing Entailment for Multi-Hop QA Tasks
* using pre-trained entailment models for QA
* QA usually requires reasoning over multiple sentences, which current entailment models don't do
    * even if no single sentence entails the hypothesis
    * while also being wary of distracting info
* their solution
    * relevance module – which sentences are important, which are distractors
    * aggregator module – combine info over relevant sentences
* relevance is like entailment – can use pretrained model here

![bread](/assets/images/2019-naacl/bread.jpg "bread")
*Cue the extremely important bread metaphor.*

* aggregator is kind of like entailment, but needs to be applied to multiple sentences
    * use some layers for each sentence, join with learned weights
    * use the rest of the layers post-join to get aggregate prediction
    * [editor's note: why.... would this work?]
* join using cross-attention layer
* evaluations, including ablations
    * multilayer aggregation and relevance are both helpful
* method is model agnostic, so it could also use BERT
    * [gotta mention BERT someplace or it ain't NAACL 2019!]

## CoQA: Conversational Question Answering
* users of QA systems expect more than just answers
    * even if it's clearly not a conversationalist
    * we knew this even in 1981

![beyond](/assets/images/2019-naacl/beyond.jpg "beyond")

* hence the conversational QA (CoQA) task
* conversational history is critical to answering questions naturally
    * coreference, omitted context, etc.
* goals:
    * conversational questions
    * free-form answers (not just spans)
    * diverse genres
* most common trigram in CoQA – "what did he"
    * vs. SQuAD – "what is the"
    * presence of single word questions
* CoQA vs. QuAC
    * free-form answers with extractive rationales, vs. just extractive
    * both see passage, vs. only answerer sees passage
    * differences in the resulting data
* also compare other datasets...
* major linguistic phenomenon is **coreference**

![coref](/assets/images/2019-naacl/coref.jpg "coref")

* also paraphrasing, pragmatics / common-sense reasoning, etc.
* tried some models
    * generating free text
    * selecting span (highlight)
    * highlight first then generate (discriminator + generator)
* results analysis
    * combined model helps
    * importance of conversation history
        * but after a certain point models stop using history, whereas human performance continues to improve
* "...and then BERT came out"
    * does better than humans now on this dataset :facepalm:
* "so... what are we going to do? this paper *just* came out...." :joy:
* next steps
    * why do these models work? are they resolving coreference or using heuristics?
    * how well does it transfer to other problems, e.g. dialogue?
