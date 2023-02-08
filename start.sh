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

# Create a network for the containers
docker network create authorization-network

# Crear y ejecutar un contenedor de PostgreSQL
# Run the Postgres container
docker run --name postgres \
  -e POSTGRES_PASSWORD=$POSTGRES_PASSWORD \
  -e POSTGRES_DB=$POSTGRES_DB -p 5432:5432 \
  -d postgres

#
echo "postgresql://postgres:${POSTGRES_PASSWORD}@$(docker inspect --format='{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' postgres):5432/postgres"


# Verificar si el contenedor está ejecutándose
docker ps

# Migrando el esquema de prisma
npx prisma generate 
npx prisma migrate dev --name init 

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
docker run --name authorization-app -p 3000:3000 authorization-app 

#docker inspect --format='{{.NetworkSettings.Networks}}' postgres
#docker inspect --format='{{.NetworkSettings.Networks}}' authorization-app