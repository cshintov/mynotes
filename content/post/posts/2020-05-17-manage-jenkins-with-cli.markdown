---
date: "2020-05-17T11:37:02Z"
tags:
- jenkins
- devops
- jenkins-cli
- automation
- ci/cd
- DRY
title: Manage your Jenkins with CLI
---
Modern software is incredibly complex. That makes operations a hard job.

Architectures like microservices, increases the operational complexity multiple orders of magnitude. 
So, its crucial that every part of operations is automated.  Because when adopting such patterns 
there is an explosion in the number of components that need to be maintained. Doing this manually 
is inefficient as well as painful for the engineers who are tasked to do the maintenance. One such 
area is managing your CI ojbects.

## Jenkins CLI for CI

Continous integration is an essential part of modern software development and the open source tool Jenkins 
is a favourite when it comes to CI tools. 

In general most of the work in Jenkins is done on the UI. And you will be doing similar things a zillion 
times with slight variations; for example, configuring a pipeline for projects that are using the same 
tech-stack. Why not automate this as well?

The Jenkins creators thoughtfully has provided us with a command line interface - the jenkins-cli.jar.

You can download it from your Jenkins server! Just hit [JENKINS_URL/jnlpJars/jenkins-cli.jar].

### Syntax and usage

{{< highlight bash >}}

# General sytnax
java -jar jenkins-cli.jar [-s JENKINS_URL] [global options...] command [command options...] [arguments...]

# To get help
java -jar jenkins-cli.jar -s JENKINS_URL -auth username:apitoken help

# To list the available jobs
java -jar jenkins-cli.jar -s JENKINS_URL -auth username:apitoken list-jobs

# To get a job's configuration as an XML
java -jar jenkins-cli.jar -s JENKINS_URL -auth username:apitoken get-job JOB_NAME > job-config.xml

# To create a new job
java -jar jenkins-cli.jar -s JENKINS_URL -auth username:apitoken create-job JOB_NAME < new-job-config.xml

# To update a job
java -jar jenkins-cli.jar -s JENKINS_URL -auth username:apitoken update-job JOB_NAME < updated-config.xml

# To delete job
java -jar jenkins-cli.jar -s JENKINS_URL -auth username:apitoken delete-job JOB_NAME

{{< / highlight >}}

### Automate

The real benefit of having an API/CLI for your tools is when you automate your repetitive tasks.

If you find yourself repeating the same task, say creating similar pipelines, you can use some kind of 
templating to automate it. 

One possible approach could be, get the XML config of 
the existing job, create a template out of it by identifying the varying parts of the configuration.
Use `sed` or `envsubst` to generate configs for new jobs and fire up a create job command.

### Reference

CLI for jenkins lets you do most of the things you can do with Jenkins. For additional info please refer 
official documentation for [managing jenkins with cli].


[JENKINS_URL/jnlpJars/jenkins-cli.jar]: https://jenkins_url/jnlpJars/jenkins-cli.jar

[Managing Jenkins with CLI]: https://www.jenkins.io/doc/book/managing/cl
