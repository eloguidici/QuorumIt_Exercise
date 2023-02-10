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
  -e POSTGRES_DB=$POSTGRES_DB -p 5432:5432 \
  -d postgres


# Verificar si el contenedor está ejecutándose
docker ps

# Generando el esquema de prisma
npx prisma generate 
npx prisma migrate dev --name init 

# Generando data por defecto
npx prisma db seed