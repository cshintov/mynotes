---
date: "2020-01-08T13:25:01Z"
published: false
tags:
- monitoring
- grafana
- kubernetes
title: Primer on PromQL
---
### PromQL:

    Functional expression language.
    Any query on a metric creates a time series.
    A time series consists of a collection of samples.
    A sample is combo of a flot64 value and a millisecond precision timestamp.

### Time Series
    Denoted by `<metric name>{<label name>=<label value>, ...}`

### Parts of a Query:

    1. Metric name:
        Signifies what the metric is about. For example,  `http_requests_total`
        signifies total number of http requests received at a timestamp/timerange.
    2. Labels:
        They are called the dimensions of the metric. Qualifies the metric. 
        For example, `method=POST` and `endpoint=/api/tracks` is 
        the total http `POST` requests received to the endpoint `/api/tracks`.
    3. Value
    4. Timestamp.

### Note

    Instant vector vs range vector. Only instant vectors can be graphed.
    First you get a range vector and apply one of these (rate, irate, increase)
    on it to get instant vectors and then graph it.

### Four Types of metrics:

    - Counters: go up or reset to zero. eg: total num of requests.
    - Gauges: go up/down. Monitors current value at any given time. eg: memory
        utilization
    - Histogram - This creates multiple series for each metric name.
        Sampled values are put into buckets.
    - Summary: Takes samples and creates multiple metrics like Histogram but
        puts them into quantiles instead of buckets.

### Query Structure: 

    A metric name itself is a query expression. You can filter using labels.

    metric_name{label="value"}
    metric_name{label="value", label1="value1"} # multiple filters works as logical AND

    * = equal
    * != not-equal
    * =~ matches regex
    * !~ doesn’t match regex

