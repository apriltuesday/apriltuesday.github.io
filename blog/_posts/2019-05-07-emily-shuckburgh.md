---
layout: post
title: "Emily Shuckburgh: Can machine learning help to conduct a planetary healthcheck?"
date: 2019-05-07 9:00:00
category: blog
---

Part of my series of notes from [ICLR 2019](https://iclr.cc/Conferences/2019) in New Orleans.

## Introduction
* need **actionable information** on climate risk
* have vast datasets (unlike in many other fields!)
* we ML people should be able to do something about this

![climate change issues](/assets/images/2019-iclr/climate-change.jpg "climate change issues")

* issues particular to climate change data science
    * structured, noisy, non-stationary data
    * need for extrapolation & handling of extreme / rare events
        * (this is a theme at ICLR so far, think about this)
* healthcheck: monitoring the patient, treating the symptoms, curing the disease

## Monitor, Treat, Cure
* **monitor** – digital online platform
* need interpolate and synthesize / integrate data

![monitor](/assets/images/2019-iclr/monitor.jpg "monitor")

* **treat** – models for evidence-driven decision making
* random fact: typical climate model is >1 million lines of Fortran code
* global models of e.g. surface temps are pretty good, BUT
    * need more granularity for the level that decisions are made – e.g. in cities
    * current models have systemic bias at local levels
* learn from observed weather to go from coarse- to fine-grained models
    * (kinda like image superresolution...)
* account for correlated risks and impact of regulations / policies

![treat](/assets/images/2019-iclr/treat.jpg "treat")

* **cure** – solutions for climate change
* e.g. modeling arctic sea ice - physics at many scales, uncertainties etc.
    * but we've got data! :muscle:
    * => blend data-driven and physics-based approaches
* understanding key processes and causal relationships

## Conclusion (and Q&A)

![cure](/assets/images/2019-iclr/cure.jpg "cure")

* should establish **benchmark tasks** to drive climate change research (cf. ImageNet)
* another challenge – takes months of work to prepare a dataset for use in this field
* good models are useless if people ignore them...
    * getting things to local level is critical – global average surface temperature is abstract and hard for people to engage with
    * the trustworthiness of the results is incredibly important for implementation – for many people, for better or for worse, this is linked to interpretability
    * (I think these are both really important points to keep in mind)
