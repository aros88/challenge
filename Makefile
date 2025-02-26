
build:
	cd api && yarn install
	cd api && cp .env.sample .env
	cd frontend && yarn install
	cd frontend && cp .env.sample .env
	docker compose down
	docker compose build

run:
	docker compose up &
	sleep 5
	cd frontend && yarn run dev &
	cd frontend && yarn run electron

build-run:
	make build
	make run
