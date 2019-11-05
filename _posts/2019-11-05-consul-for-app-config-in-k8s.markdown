---
layout: post
title:  "Consul in k8s, for app config management!"
date:   2019-11-03 17:02:34 +0530
categories: python fp
tags: [k8s, consul]
---
We can use [consul]'s key-value store for application configuration management.  If the application exposes an endpoint which triggers configuration reload, consul's [watch] can be used for hotloading the configuration changes.

## Daemonset Vs Sidecar
While deploying the consul client as a daemonset will cost less overhead, it will require a very convoluted solution to configure watches for each application. Since k8s dynamically allocates apps to nodes we don't know which clients should be configured with what all watches. Also we will have to dynamically configure watches whenever there is a new app deployment.

The sidecar approach solves this problem. Each app pod will have the consul client as a sidecar. This client will be configured to watch for changes in the interested config values.

# Initcontainer to generate client config
We can use an initcontainer to generate a client configuration with watches for interested `keyprefixes` or other watch types. The sample implementation uses Python to generate such a configuration. It takes a comma seperated string of keyprefixes as argument.

Instead of Python we can either use Golang or plain shell with jq to optimize the initcontainer.

[consul]: https://www.consul.io
[watch]: https://www.consul.io/docs/agent/watches.html
