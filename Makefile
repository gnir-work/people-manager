setup-repo:
	rm -f .git/hooks/pre-commit.sample 2> /dev/null
	rm -f .git/hooks/pre-commit 2> /dev/null
	ln -s $(shell pwd)/.githooks/pre-commit .git/hooks/pre-commit

