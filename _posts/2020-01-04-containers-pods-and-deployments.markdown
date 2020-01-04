---
layout: post
title: Containers, Pods and Deployments
date: 2020-01-04 14:43:49 +0553
categories: [k8s, docker, containers]
---
What exactly is a container, a pod and a deployment? How they differ? Where they run?
A Container aka “a process and a bunch of namespaces”

In Linux world everything is either a process or a file. A program is a file which contains instructions in a particular programming language. When it is being loaded into memory and executed we call it a process.

Now let’s talk about containers. A container is a virtual isolated environment where you can run your program/process. The virtual isolated environment of a container is implemented using linux namespaces. (There are different types of namespaces: they are mount, process-id, network, inter-process-communication, uts, user-id and cgroup.)

A normal process is running “in” the default environment using default namespaces of above mentioned types. When a container runtime like docker spins up a container, all it does is create a new virtual environment using newly created namespaces for that particular container. In fact there is no single entity you can call a container, just a logically related group of namespaces and your process running in that virtual environment. Multiple processes can share the namespaces [but one per container is the recommended practice in production]. This little info is key to understand a Kubernetes pod.
A Pod aka “a bunch of containers”

Enter Kubernetes, the container orchestrator sometimes dubbed as the “operating system of a datacenter”. What does it do? Does it orchestrate containers? Yes and no! It actually orchestrates pods. Meaning, the unit of deployment in kubernetes world is a pod, not a container.

A pod is a logical grouping of containers, another layer of abstraction with which kubernetes works. Again a pod is not an actual entity but just a name for a logically related group of containers. How is it implemented? By using a special container called pause container.

Whenever a new pod is created, the first step is to create the pause container. Then your application container and sidecars ( a fancy name for other containers in the pod ) are run “inside” the namespaces created for the pause container. Since they share the network namespace they can talk to each other over localhost.
[Enablement > A tale of abstractions - containers, pods and deployments > same-pod.gif]
A kubernetes workload aka “a bunch of similar pods”

Although you can work directly with pods, in production cluster, deployments are done using higher level abstractions of kubernetes “workloads”. The frequently used workloads are deployments, daemonsets, statefulsets. A workload is just a logical grouping of pods. Different workloads are used for different purposes. A daemonset is used when you need a pod for each node. A statefulset when you need a stateful deployment. A deployment is the most common type of workload which is stateless in nature.

When you create a deployment you can specify how many pods you need. When you scale a deployment kubernetes increase/decrease the number pods managed by the deployment.
[Enablement > A tale of abstractions - containers, pods and deployments > workloads.png]
Where do they exist? On the nodes.

It is often said that “conainers killed VMs”. Not really! They were abstracted away. They are still there underneath the surface, diligently working for us, running our containers, pods and deployments. A kubernetes cluster is just a grouping of VMs/baremetal known as nodes.

A kubernetes cluster consists of two types of nodes: masters and workers. Generally workloads are deployed on top of the worker nodes while the kubernetes components in master nodes take care of orchestrating the pods on worker nodes.

A logical view of a Node.
[Enablement > A tale of abstractions - containers, pods and deployments > k8s-service.png]
