.PHONY: all

all: deploy

update:
	git add -A
	git commit --amend

deploy: update
	git push origin $(shell git rev-parse --abbrev-ref HEAD):deploy -f

new:
	python codes/add_blog.py
