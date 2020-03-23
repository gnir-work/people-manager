build-frontend:
	cd frontend && npm run build

build-nginx: build-frontend
	docker build -t people-manager-nginx -f frontend/Dockerfile frontend

export-python-requirments:
	cd backend && poetry export -f requirements.txt > requirements.txt

build-backend: export-python-requirements
	docker build -t people-manager-backend -f backend/Dockerfile backend
