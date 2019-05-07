---
layout: post
title: "Emily Shuckburgh: Can machine learning help to conduct a planetary healthcheck?"
date: 2019-05-07
category: blog
---

Part of my series of notes from [ICLR 2019](https://iclr.cc/Conferences/2019) in New Orleans.

## Introduction
* need **actionable information** on climate risk
    * just understanding impact is a huge task
* have vast datasets (unlike in other fields!)
* we ML people should be able to do something about this
* issues particular to climate change data science
    * structured, noisy, non-stationary data
    * need for extrapolation & handling of extreme / rare events
        * (this is a theme at ICLR so far, think about this)
* healthcheck: monitoring the patient, treating the symptoms, curing the disease

## Healthcheck: Monitor, Treat, Cure
* monitoring – digital online platform
    * need interpolate and synthesize / integrate data

* treating - models for evidence-driven decision making
    * typical climate model is >1 million lines of Fortran
    * global models of e.g. surface temps are pretty good
    * need more granularity for the level that decisions are made – e.g. in cities
    * models have systemic bias at local levels
    * learn from observed weather
        * (kinda like image superresolution...)
    * account for correlated risks and impact of regulations / policies

* curing – solutions for climate change
* modeling arctic sea ice - physics at many scales, uncertainties etc.
    * but we've got data! :muscle:
    * => blend data-driven and physics-based approaches
* understanding key processes and causal relationships

## Conclusion (and Q&A)
* establish **benchmark tasks** to drive climate change research (cf. ImageNet)
* another challenge – months of work to prepare a dataset for use (!)
* good models are useless if people in power ignore them...
    * getting things to local level is critical – global average surface temperature is abstract and hard for people to engage with
    * the trustworthiness of the results is incredibly important for implementation – for many people, for better or for worse, this is linked to interpretability
