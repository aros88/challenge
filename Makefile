
build:
	cd api && npm install
	cd api && cp .env.sample .env
	cd frontend && npm install
	cd frontend && cp .env.sample .env
	docker compose down
	docker compose build

run:
	docker compose up &
	cd frontend && npm run dev &
	cd frontend && npm run electron

build-run:
	make build
	make run
