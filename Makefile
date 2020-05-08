.PHONY: all

all: save deploy

update:
	git add -A
	git commit --amend

save:
	git add -A
	git commit

deploy: 
	git push origin $(shell git rev-parse --abbrev-ref HEAD):deploy -f

new:
	python codes/add_blog.py

dev:
	bundle exec jekyll serve
