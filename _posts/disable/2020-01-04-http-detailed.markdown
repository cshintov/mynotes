---
published: false
layout: post
title: What is http?
date: 2020-01-04 14:27:16 +0553
tags: [basics]
---

### What?

It's the internet! Well, just the most of it! 

But what is it exactly?

A protocol for computers to talk to each other. Like TCP/IP, but on a whole
another level. :) On the seventh layer, the applicaiton layer.

TCP/IP based
client-server model

* connectionless:
    - client sends the request, connection established, client disconnects
    - when response is ready, server re-establishes the connection
* stateless:
    - Each the time connection closes, and re-established, it is a brand new
        connection, no info retained from previous session. 

### Why?
* Originally for sending html docs.
* Over time evolved to send other media types as well like images, videos,
        etc.

### How?

* request-reponse-cycle: 
    - user hits the page address in browser
    - internet/DNS resolves it to the host machine (IP)
    - High level:
        - client sends request, disconnects
        - server connects, sends response, disconnects

#### HTTP message
* just plain text
    - headline + headers + body
    - request: 
        - headline (method + resource + http version)
        - headers (key value pairs)
    - response: 
        - headline (http version + status (code + explanation))
        - headers
        - body
