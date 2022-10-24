DOCKER_COMPOSE					:=	docker-compose

DEV_DOCKER_COMPOSE_FILE	:=	.dev/docker-compose-dev.yml

DEV_DATABASE_DIR				:=	./database

MKDIR										:=	mkdir -p
RM											:=	rm -rf

.PHONY									:	all
all											:	dev-up-build

.PHONY									:	re
re											:
	make dev-clean; make all

.PHONY									:	dev-up-build
dev-up-build						:
	make dev-build
	make dev-up

.PHONY									:	dev-build
dev-build								: dev-dependancy
	$(DOCKER_COMPOSE) -f $(DEV_DOCKER_COMPOSE_FILE) build

.PHONY									:	dev-up
dev-up									:
	$(DOCKER_COMPOSE) -f $(DEV_DOCKER_COMPOSE_FILE) up

.PHONY									:	dev-down
dev-down:
	$(DOCKER_COMPOSE) -f $(DEV_DOCKER_COMPOSE_FILE) down

.PHONY									:	dev-clean
dev-clean								: dev-down
	docker rm --force $(shell docker ps -aq); $(RM) $(DEV_DATABASE_DIR)

.PHONY									:	dev-fclean
dev-fclean							:
	make dev-clean; docker rmi --force $(shell docker images -aq)

.PHONY									:	dev-dependancy
dev-dependancy					:	$(DEV_DATABASE_DIR)

$(DEV_DATABASE_DIR)			:
	$(MKDIR) $@
