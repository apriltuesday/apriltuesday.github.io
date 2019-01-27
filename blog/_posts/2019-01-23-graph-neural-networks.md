---
layout: post
title: "Graph Neural Networks for Knowledge Base Question Answering"
date: 2019-01-23
category: blog
---

[Daniil Sorokin (TU Darmstadt)](https://daniilsorokin.github.io/), South England Natural Language Processing Meetup.  Slides are [here](https://daniilsorokin.github.io/DS_GraphsQA_SENLPMeetup.pdf).

Some extra thoughts by yours truly are [at the bottom of this post](#postscript), if for some reason you're more interested in my hot takes on representation spaces rather than my notes...

## The Problem

* goal: question -> **entities -> semantic interpretation** -> knowledge base query -> answer
    * bold bit is what we focus on here
* use [Wikidata](https://www.wikidata.org/wiki/Wikidata:Main_Page) as truth throughout (not worrying about errors in the KB)
* as a baseline, could take all linked question entities, all entities in KB connected to them, and train a model to score them as potential answers
* instead, convert entities to a structured representation so we can do :sparkles:graph shit:sparkles:
    * by taking advantage of graph structure, hopefully can handle questions involving a larger number of relations, which current methods don't do well

![approach](/assets/images/2019-01-23/approach.png "Sorokin's slide design is clearly inspired by this website")

## The Approach
* some prior work on graph conv nets and (gated) graph neural nets
* I wrote down a couple examples that jumped out at me:
    * [Sun et al. 2018](https://arxiv.org/pdf/1809.00782.pdf) – QA with fusion of KB and text
    * [Chen et al. 2018](http://aclweb.org/anthology/C18-1107) – structured dialogue policy
* try to match encoding of question text with encoding of all possible semantic graphs generated from it
    * this space of possible graphs is taken from [Yih et al. 2015](http://www.aclweb.org/anthology/P15-1128) (and there are potentially issues arising from transferring this wholesale to a completely different KB...)
    * selected answer is the evaluation of the most similar graph on the KB
* question text embedded with CNNs
* possible semantic graphs embedded with (G)GNNs
    * basically RNNs on general graphs instead of sequences
    * it's recurrent so it needs gates, obviously
    * also use text labels of nodes (which get updated) and relations (which are fixed)
        * same word vectors as used to embed the question
    * final graph rep is the vector of the query node
        * worked better than averaging, apparently
* use cosine similarity to compare with sentence 
* ranking loss on all the generated graphs – ones that yield correct answer should be ranked higher
    * only need Q&A data to train and evaluate

## The Results
* note that the primary goal is to compare different graph encoding models, in the context of question answering, not necessarily to find a good question answering model
    * the "pipeline-y" architecture he uses is probably not optimal for QA (consider unified vs. factored representation spaces), but enables easily swapping out and evaluating different graph encoders
* GGNN does statistically better than alternatives (though not by much)
* also look at distribution of models produced for a given architecture choice with different random seeds
    * he claimed GGNN had a bimodal distribution while the other models did not, which is... kind of true I guess? either way an interesting bit of data
<center>
<img src="/assets/images/2019-01-23/models.png" title="models" width="75%">
</center>
* sources of error:
    * some questions are not answerable from the KB
    * some answers are just wrong (crowdsourced)
    * some of the correct graphs might not be in the generated space of candidates
    * entity linking itself has errors
* accounting for these, still an upper bound of 0.65 F-score, compared to an achieved 0.25 F-score by the best model... so, whence the gap? :thinking:
* important to note that GNNs are data-hungry, problematic as these datasets are small
    * so could do much better with more data (though this is still a drawback in some sense)

## <a name="postscript"></a>Postscript
Props to the speaker for presenting the type of work that invites everyone in the audience to ask some variation of "But did you try X?", and handling all with humility and grace.  My own version is the following: "But did you try sentence encoders besides CNNs?"

I'm curious not because we're interested in picking the best sentence encoder ever and optimising the shit out of our question answering pipeline, but because I wonder whether fixing the question encoder architecture to be a CNN, and fixing the similarity metric to be cosine similarity, is actually *biasing* the comparison rather than keeping it fair. A particular choice of encoder architecture induces a particular type of representation space for sentences, which could be more compatible with the spaces induced by some graph encoders than others (where that compatibility is mediated by use of cosine similarity, in some precise sense that I'm too lazy to go into at the moment but may or may not be related to [this](https://arxiv.org/pdf/1805.03435.pdf)).

Ultimately, I guess there's just an extent to which your fair head-to-head comparisons to determine which model is "best" always have to be interpreted in the context that the experiment was set up, and my question is then really about how big is that context in this case.  Are GNNs "the best" in the context of all of semantic parsing and natural language understanding?  Only in the context of question answering pipelines that encode the question *with CNNs*, perform entity linking, generate a particular space of semantic graphs, encode those graphs with the model being evaluated, and then compare the encodings using cosine similarity?  Somewhere in between, no doubt – but who knows where.
