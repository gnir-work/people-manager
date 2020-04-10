build-frontend:
	cd frontend && npm run build

build-nginx: build-frontend
	docker build -t people-manager-nginx -f frontend/Dockerfile frontend

export-python-requirements:
	cd backend && poetry export -f requirements.txt --without-hashes > requirements.txt

build-backend: export-python-requirements
	docker build -t people-manager-backend -f backend/Dockerfile backend

start-app: build-frontend export-python-requirements
	docker-compose up --build --force-recreate -d

populate-db:
	docker exec -it people-manager_backend_1 /bin/sh -c "python -m src.create_db"

local-mongo:
	docker run --name local-people-manager-mongo -d -p 27017:27017 mongo:4.2.3
