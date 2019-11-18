---
layout: post
title: what-happens-when-you-delete-a-pod
date: 2019-11-18 16:54:55 +0553
categories: common
---
1. pod status set to 'Terminating'
2. preStop hook is executed
3. SIGTERM sent to the pod
4. k8s waits for `grace period`
5. SIGKILL sent to pod
