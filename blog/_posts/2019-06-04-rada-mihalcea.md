---
layout: post
title: "Rada Mihalcea: When the Computers Spot the Lie (and People Don't)"
date: 2019-06-04 14:00:00
category: blog
---

Part of my series of notes from [NAACL-HLT 2019](https://naacl2019.org/) in Minneapolis.

## Six Observations on Deception

![aitchison](/assets/images/2019-naacl/aitchison.jpg "aitchison")

### 1. Deception precedes language
* present elsewhere in the animal world
* learning to speak is a kind of lying
    * talking about things that are non-existent

### 2. Deception is very frequent
* frequency changes throughout life (peaks in adolescence)
* people lie about twice a day

### 3. Deception is very diverse
* many reasons people lie (good or bad...)

### 4. Humans are very poor deception detectors
* many studies confirming this – people perform close to chance
* relying on weak behavioural cues
* really impacts how we solve this problem, gather data, etc.
* **corollary 4.1**: standard data annotation strategies don't work
    * other strategies: specifically elicit lies, look for other sources / verification
* **corollary 4.2**: deception detection isn't a big data problem
    * 100s, *maybe* 1000s of data points

### 5. Deception (detection) is central to many domains
* case studies from a decade of research
* [The Lie Detector, ACL 2009](https://www.aclweb.org/anthology/P09-2078)
    * look at word categories present in lies vs. truths
    * validates some psycholinguistic behaviours, uncovers some new ones

![words](/assets/images/2019-naacl/words.jpg "words")

* [Experiments in Open Domain Deception, EMNLP 2015](https://aclweb.org/anthology/D15-1133)
    * instructions to participants: "lie about anything"
    * also syntactic markers of deception
* [Real-Life Trial Data, ICMI 2015](https://dl.acm.org/citation.cfm?id=2820758) – multimodal studies using public trial videos
    * using all features helps (textual / audio / visual)
    * can look at gestures that correspond with lying
        * people try harder to convince you when they're lying
* [Identity Deception Detection, IJCNLP 2017](https://www.aclweb.org/anthology/papers/I/I17/I17-1089/)
    * e.g. gender, age
    * easier to detect female and older people lying
* [Box of Lies, NAACL 2019](https://www.aclweb.org/anthology/N19-1175)
    * **corollary 5.1**: Jimmy Fallon is a better liar than his guests
        * more data from a single individual doesn't seem to help detection

### 6. Deception (detection) has many social implications
* systems have 65-75% accuracy
* better than humans, but *not* ready for prime time
* ethics / bias of use

## Q&A
* for AIs to become social, should they have the ability to deceive???
* comparison with polygraphs?
    * hard find out how evaluated etc.
* intentional vs. unintentional lying
    * misinformation about e.g. health – not true, but not deception
* cultural specificity in markers?
