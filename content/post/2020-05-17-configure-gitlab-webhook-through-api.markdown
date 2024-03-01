---
date: "2020-05-17T14:15:53Z"
tags:
- jenkins
- devops
- automation
- ci/cd
- gitlab
- webhook
- DRY
title: Configure gitlab webhook through API
---

Just as we can [manage Jenkins with CLI], we can converniently interact with our gitlab server through 
its API.

When you have many microservices that needs CI which auto-triggers on git events, you might need webhooks 
configured for each project, may be even multiple hooks for the same project. 

In case of Jenkins [the gitlab plugin] provides the webhook url for each pipeline we create.

We can avoid manually configuring webhooks each time a new pipeline is created if we use the API. Just 
provide the webhook url, authentication token and events that should trigger the hook and you
are all set.

### Sample commands for configuring and managing hooks
{{< highlight bash >}}

# payload for configuring triggers on push/merge events with the webhook url from gitlab plugin
payload="url=http://<jenkins-user>:<jenkins-api-token>@<jenkins-url>/project/$jobpath/$name&push_events=1&enable_ssl_verification=false&merge_requests_events=1"

gitlab_api="http://localhost:10080/api/v4/projects"
gitlab_access_token="users-access-token"
namespaced_path_of_repo="cshintov%2Fdemo-app" # url-encoded

# Creating a hook
curl -d $payload \
    $gitlaburl/$namespaced_path_of_repo/hooks?private_token=$gitlab_access_token

# Updating a hook
curl -XPUT -d $payload \
    $gitlaburl/$namespaced_path_of_repo/hooks/<hook_id>?private_token=$gitlab_access_token

# deleting a hook
curl -XDELETE \
    $gitlaburl/$namespaced_path_of_repo/hooks/<hook_id>?private_token=$gitlab_access_token

{{< / highlight >}}

### Reference
For additional info please refer 
* [gitlab hooks api] 
* [gitlab plugin doc] 

[Gitlab Hooks API]: https://docs.gitlab.com/ee/api/projects.html#hooks
[Manage Jenkins with CLI]: https://shendao.in/2020/05/17/manage-jenkins-with-cli.html
[The Gitlab Plugin]: https://plugins.jenkins.io/gitlab-plugin
[Gitlab plugin doc]: https://github.com/jenkinsci/gitlab-plugin/blob/master/README.md
