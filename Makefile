build-frontend:
	cd frontend && npm run build

build-nginx: build-frontend
	docker build -t people-manager-nginx -f frontend/Dockerfile frontend