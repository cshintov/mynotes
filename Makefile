.PHONY: all help

all: save deploy

update:
	git add -A
	git commit --amend

save:
	git add -A
	git commit

deploy: 
	git push origin $(shell git rev-parse --abbrev-ref HEAD):deploy -f
	netlify watch

new:
	python codes/add_blog.py

dev:
	bundle exec jekyll serve

help:
	@echo  'all - Saves current changes and deploys'
	@echo  'save - Saves the new changes'
	@echo  'update - Updates the current branch with new changes'
	@echo  'deploy - Deploys the current branch'
	@echo  'new - Boilerplate for a new blog post'
	@echo  'dev - Serve the blog locally for preview'
	@echo  'merge - Merge current branch to master'

