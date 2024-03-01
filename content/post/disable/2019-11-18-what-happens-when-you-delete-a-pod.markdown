---
categories: common
date: "2019-11-18T16:54:55Z"
published: false
title: what happens when you delete a pod
---
1. pod status set to 'Terminating'
2. preStop hook is executed
3. SIGTERM sent to the pod
4. k8s waits for `grace period`
5. SIGKILL sent to pod
