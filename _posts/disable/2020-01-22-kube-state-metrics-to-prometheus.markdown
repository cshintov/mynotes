---
published: false
layout: post
title: Deduplication of kube-state-metrics
date: 2020-01-22 12:00:38 +0553
tags: [monitoring, grafana, kubernetes]
---

Prometheus operator uses ServiceMonitor to scrape `kube-state-metrics`. All the
endpoints behind the service for `kube-state-metrics` gets scraped individually.
This causes duplication in metrics scraped.

Solution:
* Sharding
* Scraping the service without ServiceMonitor.

## ServiceMonitor

It's a custom defined resource created and managed by Prometheus Operator. 
A ServiceMonitor selects the targets based on label selectors. First we have to
disable the ServiceMonitor from scraping for `kube-state-metrics`. And enable
scraping the `kube-state-metrics` service by adding prometheus configuration of
type [static config] [static-config].


## Prometheus config
Two types: static config and service discovery config. Static config for scraping single
target per config. Service discovery uses labels to select multiple targets and
scrape them.


[static-config]: https://prometheus.io/docs/prometheus/latest/configuration/configuration/#static_config
