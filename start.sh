#!/bin/bash

clear
if command -v docker >/dev/null 2>&1; then
  echo "Docker is installed."
else
  echo "Docker is not installed."
  echo "\n"
  echo "Exiting..."
exit 1
fi

# Leer valores de un archivo de configuración
source .env

# Verificar si existe la instancia
if docker ps -a | grep postgres > /dev/null 2>&1; then
  echo "Deleting existing container..."
  docker rm -f postgres
fi

# Descargar la imagen de PostgreSQL
docker pull postgres

# Crear y ejecutar un contenedor de PostgreSQL
# Run the Postgres container
docker run --name postgres \
  -e POSTGRES_PASSWORD=$POSTGRES_PASSWORD \
  -e POSTGRES_DB=$POSTGRES_DB \
  -d --publish 5432:5432 --detach postgres

# Verificar si el contenedor está ejecutándose
docker ps

# Migrando el esquema de prisma
npx prisma generate 
npx prisma migrate dev --name init 

# Generando data por defecto
npx prisma db seed  

export POSTGRES_HOST=host.docker.internal
export POSTGRES_URL=postgresql://postgres:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}?schema=public

# Verificar si existe la instancia
if docker ps -a | grep authorization-app > /dev/null 2>&1; then
  echo "Deleting existing container..."
  docker rm -f grep authorization-app
fi

# Eliminar la imagen de la aplicación
docker rmi authorization-app

# Construyendo la imagen de la aplicación
echo "building authorization-app"
docker build -t authorization-app .

# Ejecutando la imagen de la aplicación
echo "running authorization-app"

docker run -e POSTGRES_URL=$POSTGRES_URL \
-e ADMINISTRATOR_ROLE_ID=$ADMINISTRATOR_ROLE_ID \
--name authorization-app \
-e PORT=$PORT \
-p $PORT:$PORT authorization-app


open http://localhost:$PORT/api