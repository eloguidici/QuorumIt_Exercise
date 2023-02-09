<h1 align="center"> Authorization Proyect </h1>

# README


## CONTENTS OF THIS FILE
   
* Introduction
* Requirements
* Installation
* Test
* Manual Testing of the Application: Step-by-Step Guide
* FAQ


## INTRODUCTION

An authorization schema for a web platform project. 



## REQUIREMENTS

It must allow admin users to manage client user’s access to resources.


### User stories


| USE CASE      | DESCRIPTION   |
| --- | --- |
| US01  | As an admin user, I want to be able to add, edit, update and delete client users so that I can manage which clients have access to the web platform. |
| US02  | As an admin user, I want to be able to assign roles and/or permissions to client users so that I can control that only authorized client users can access the appropriate resources. |
| US03  | As an admin user, I want to be able to add, edit, update and delete permissions so that I can manage access to platform resources. |
| US04  | As an admin user, I want to be able to add, edit, update and delete roles so that I can manage access to platform resources. |
|  |  |
|  |  |



## INSTALLATION

### Docker

```bash
$ ./start.sh
```

```warning
This script runs a series of actions to configure and run an authorization application in a Docker environment.
Here is a detailed summary of the steps taken:

Check if Docker is installed on the system.
If Docker is not installed, the script displays an error message and ends the installation.

Check if a container named postgres exists.
If it exists, the container is deleted.

Download the PostgreSQL image: docker pull postgres

Create and run a PostgreSQL container.
Several environment variables are set and the port 5432 is published.

Check if the container is running

Migrate the prisma schema and generate default data.

Check if a container named authorization-app exists.
If it exists, the container is deleted.

Delete the authorization-app application image.

Build the authorization-app application image.

Run the application image.
```

### Development

```bash
$ ./start-dev.sh
```

```warning
In this case, the distinction is made because the application is not run within a Docker instance, but rather it is executed locally on the host machine.
```


## TEST

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```


## Manual Testing of the Application: Step-by-Step Guide


# Paso 0

Por defecto se generan los siguientes datos cuando 

# Paso 1
Abrir una pagina de swagger con la direccion https://localhost:3000/api

# Paso 2
En la seccion de 'Login' ingresar los siguientes datos:

```json
{
  "email": "admin@quorumit.com",
  "password": "Abc$12345$"
}
```

Este endpoint le va a devolver un response con el token necesario para ejecutar los demas endpoints.

```json
{
  "email": "admin@quorumit.com",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJSb2xlcyI6W3siaWQiOjEsInVzZXJJZCI6MSwicm9sZUlkIjoxLCJjcmVhdGVkQXQiOiIyMDIzLTAyLTA4VDIzOjA4OjE0LjQ0NloifV0sImlhdCI6MTY3NTk1MjQ4MCwiZXhwIjoxNjc2MDM4ODgwfQ.0xHeHykBXi3c-a1BV47brQpg3THUEGbi7qvOGwVhMYk"
}
```
<div style="background-color:red; padding:10px;">
  Este token tiene que ser agregado al 'Authorize' en swagger.
</div>




# Paso 3 - Pruebas

## Creacion y consulta de un usuario

En la seccion Users, el metodo con el verbo POST es el que nos va a permitir crear un usuario.

Ejemplo:

```json
{
  "name": "Emiliano Loguidici",
  "email": "emilianologuidici@gmail.com",
  "password": "Abc$12345$"
}
```


Esto nos va a generar una respuesta de este tipo

```json
{
  "id": 65,
  "name": "Emiliano Loguidici",
  "email": "emilianologuidici@gmail.com",
  "roles": [],
  "permissions": []
}
```

Consultamos el usuario por el id

Verbo GET by id

```json
{
  "id": 65,
  "name": "Emiliano Loguidici",
  "email": "emilianologuidici@gmail.com",
  "roles": [],
  "permissions": []
}

```


## Creacion y consulta de un rol

En la seccion Roles, el metodo con el verbo POST es el que nos va a permitir crear un rol.

Ejemplo:

```json
{
  "name": "Customers"
}
```

Esto nos va a generar una respuesta de este tipo

```json
{
  "id": 2,
  "name": "Customers",
  "permissions": []
}
```

Consultamos el rol por el id

Verbo GET by id

```json
{
  "id": 2,
  "name": "Customers",
  "permissions": []
}
```







## Creacion y consulta de un permiso

En la seccion Permisos, el metodo con el verbo POST es el que nos va a permitir crear un rol.

Ejemplo:

```json
{
  "name": "Add Order"
}
```

Esto nos va a generar una respuesta de este tipo

```json
{
  "id": 3,
  "name": "Add Order"
}
```

Consultamos el permiso por el id

Verbo GET by id

```json
{
  "id": 3,
  "name": "Add Order"
}
```









## EXTRAS

- Author - [Emiliano Loguidici](https://www.linkedin.com/in/emilianologuidici/)