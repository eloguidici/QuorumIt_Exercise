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


| ID    | DESCRIPTION   |
| ---   |  --- |
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

<BR/>

# Step 0 - Explanation

```text
By default the following data is generated:
A user with the email admin@quorumit.com and the password is Abc$12345$
An administrator role that is associated with the user
Two permissions that are assigned to the administrator role
The user was not assigned direct permissions

The step-by-step description is based on the ordering that I thought appropriate to be able to do the manual tests.
```

```json
  {
    "id": 1,
    "name": "QuorumIt",
    "email": "admin@quorumit.com",
    "roles": [
      {
        "id": 1,
        "name": "Admin",
        "permissions": [
          {
            "id": 1,
            "name": "Manage Roles"
          },
          {
            "id": 2,
            "name": "Manage Permissions"
          }
        ]
      }
    ],
    "permissions": []
  }
```

# Step 1 - Open swagger API
Open a Swagger page with the address https://localhost:3000/api

<BR/>
<BR/>
<BR/>
<BR/>

# Step 2 - Login
In the 'Login' section, enter the following data:

```json
curl -X 'POST' \
  'http://localhost:3000/login' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "email": "admin@quorumit.com",
  "password": "Abc$12345$"
}'
```

This endpoint will return a response with the token necessary to execute the other endpoints.

```json
{
  "email": "admin@quorumit.com",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJSb2xlcyI6W3siaWQiOjEsInVzZXJJZCI6MSwicm9sZUlkIjoxLCJjcmVhdGVkQXQiOiIyMDIzLTAyLTA4VDIzOjA4OjE0LjQ0NloifV0sImlhdCI6MTY3NTk1MjQ4MCwiZXhwIjoxNjc2MDM4ODgwfQ.0xHeHykBXi3c-a1BV47brQpg3THUEGbi7qvOGwVhMYk"
}
```
<div style="background-color:red; padding:10px;">
  This token has to be added to the 'Authorize' in Swagger.
</div>
</BR>
</BR>
</BR>
</BR>



# Step 3 - Steps to manual US01

## Create user

In the Users section, the method with the verb POST is what will allow us to create a user.

Example:

```json
curl -X 'POST' \
  'http://localhost:3000/users' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJSb2xlcyI6W3siaWQiOjEsInVzZXJJZCI6MSwicm9sZUlkIjoxLCJjcmVhdGVkQXQiOiIyMDIzLTAyLTA4VDIzOjA4OjE0LjQ0NloifV0sImlhdCI6MTY3NTk0NzQwOSwiZXhwIjoxNjc2MDMzODA5fQ.Q3XeqfdgYMJaIWyP2bmMfkdi3px0FiiLNSu4BOUnQ_Y' \
  -H 'Content-Type: application/json' \
  -d '{
  "name": "Emiliano Loguidici",
  "email": "emilianologuidici@gmail.com",
  "password": "Abc$12345$"
}'
```



```json
//Response
{
  "id": 65,
  "name": "Emiliano Loguidici",
  "email": "emilianologuidici@gmail.com",
  "roles": [],
  "permissions": []
}
```


Check the created user

```json
curl -X 'GET' \
  'http://localhost:3000/users/65' \
  -H 'accept: */*'
```

```json
//Response
{
  "id": 65,
  "name": "Emiliano Loguidici",
  "email": "emilianologuidici@gmail.com",
  "roles": [],
  "permissions": []
}

```
<BR/>
<BR/>
<BR/>
<BR/>


## Update user
In the Users section, the method with the verb PUT is what will allow us to update a user.

```json
{
  "id": 65,
  "name": "Emiliano Martin Loguidici", // add a middle name
  "email": "emilianologuidici@gmail.com"
}
```

```json
//Response
{
  "id": 65,
  "name": "Emiliano Martin Loguidici",
  "email": "emilianologuidici@gmail.com",
  "roles": [],
  "permissions": []
}
```

Check the updated user

```json
curl -X 'GET' \
  'http://localhost:3000/users/65' \
  -H 'accept: */*'
```

```json
//Response
{
  "id": 65,
  "name": "Emiliano Loguidici",
  "email": "emilianologuidici@gmail.com",
  "roles": [],
  "permissions": []
}
```

## Select all users

```json
curl -X 'GET' \
  'http://localhost:3000/users' \
  -H 'accept: */*'
```

```json
//Response
[
  {
    "id": 1,
    "name": "QuorumIt",
    "email": "admin@quorumit.com",
    "roles": [
      {
        "id": 1,
        "name": "Admin",
        "permissions": [
          {
            "id": 1,
            "name": "Manage Roles"
          },
          {
            "id": 2,
            "name": "Manage Permissions"
          }
        ]
      }
    ],
    "permissions": []
  },
  {
    "id": 2,
    "name": "Emiliano Loguidici",
    "email": "emilianologuidici@gmail.com",
    "roles": [
      {
        "id": 1,
        "name": "Admin",
        "permissions": [
          {
            "id": 1,
            "name": "Manage Roles"
          },
          {
            "id": 2,
            "name": "Manage Permissions"
          }
        ]
      }
    ],
    "permissions": [
      {
        "id": 1,
        "name": "Manage Roles"
      }
    ]
  },
  {
    "id": 3,
    "name": "Emiliano Loguidici",
    "email": "emilianologuidici@hotmail.com",
    "roles": [],
    "permissions": []
  }
]
```

## Delete user

```json
curl -X 'DELETE' \
  'http://localhost:3000/users/2' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJSb2xlcyI6W3siaWQiOjEsInVzZXJJZCI6MSwicm9sZUlkIjoxLCJjcmVhdGVkQXQiOiIyMDIzLTAyLTA4VDIzOjA4OjE0LjQ0NloifV0sImlhdCI6MTY3NTk0NzQwOSwiZXhwIjoxNjc2MDMzODA5fQ.Q3XeqfdgYMJaIWyP2bmMfkdi3px0FiiLNSu4BOUnQ_Y'
```

```json
//Response
status 200
```

# Step 4 - Steps to manual test US04

## Create role

In the Roles section, the method with the verb POST is what will allow us to create a role.

Example:

```json
curl -X 'POST' \
  'http://localhost:3000/roles' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJSb2xlcyI6W3siaWQiOjEsInVzZXJJZCI6MSwicm9sZUlkIjoxLCJjcmVhdGVkQXQiOiIyMDIzLTAyLTA4VDIzOjA4OjE0LjQ0NloifV0sImlhdCI6MTY3NTk0NzQwOSwiZXhwIjoxNjc2MDMzODA5fQ.Q3XeqfdgYMJaIWyP2bmMfkdi3px0FiiLNSu4BOUnQ_Y' \
  -H 'Content-Type: application/json' \
  -d '{
  "name": "Customers"
}'
```

```json
/Response
{
  "id": 2,
  "name": "Customers",
  "permissions": []
}
```

Check the created role
```json
curl -X 'GET' \
  'http://localhost:3000/roles/2' \
  -H 'accept: */*'
```

```json
{
  "id": 2,
  "name": "Customers",
  "permissions": []
}
```

<BR/>
<BR/>
<BR/>
<BR/>


## Update role

In the Roles section, the method with the verb PUT is what will allow us to update a role.

```json
{
  "id": 2,
  "name": "Customers*",// update role name
}
```

```json
//Response
{
  "id": 2,
  "name": "Customers*",
  "permissions": []
}
```

<BR/>
<BR/>
<BR/>
<BR/>

## Select all roles

```json
curl -X 'GET' \
  'http://localhost:3000/roles' \
  -H 'accept: */*'
```

```json
[
  {
    "id": 1,
    "name": "Admin",
    "permissions": [
      {
        "id": 1,
        "name": "Manage Roles"
      },
      {
        "id": 2,
        "name": "Manage Permissions"
      }
    ]
  },
  {
    "id": 2,
    "name": "Customers*",
    "permissions": []
  },
]

```

<BR/>
<BR/>
<BR/>
<BR/>


## Delete role

```json
curl -X 'DELETE' \
  'http://localhost:3000/roles/2' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJSb2xlcyI6W3siaWQiOjEsInVzZXJJZCI6MSwicm9sZUlkIjoxLCJjcmVhdGVkQXQiOiIyMDIzLTAyLTA4VDIzOjA4OjE0LjQ0NloifV0sImlhdCI6MTY3NTk0NzQwOSwiZXhwIjoxNjc2MDMzODA5fQ.Q3XeqfdgYMJaIWyP2bmMfkdi3px0FiiLNSu4BOUnQ_Y'
```

```json
//Response
status 200
```

<BR/>
<BR/>
<BR/>
<BR/>




# Step 5: Steps to manual test US03

## Create permission

In the Permissions section, the method with the verb POST is what will allow us to create a permission.

Example:

```json
curl -X 'POST' \
  'http://localhost:3000/permissions' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJSb2xlcyI6W3siaWQiOjEsInVzZXJJZCI6MSwicm9sZUlkIjoxLCJjcmVhdGVkQXQiOiIyMDIzLTAyLTA4VDIzOjA4OjE0LjQ0NloifV0sImlhdCI6MTY3NTk0NzQwOSwiZXhwIjoxNjc2MDMzODA5fQ.Q3XeqfdgYMJaIWyP2bmMfkdi3px0FiiLNSu4BOUnQ_Y' \
  -H 'Content-Type: application/json' \
  -d '{
  "name": "Add Orders"
}'
```

```json
/Response
{
  "id": 10,
  "name": "Add Orders",
  "permissions": []
}
```

Check the created permission
```json
curl -X 'GET' \
  'http://localhost:3000/permissions/10' \
  -H 'accept: */*'
```

```json
{
  "id": 10,
  "name": "Add Orders",
}
```

<BR/>
<BR/>
<BR/>
<BR/>


## Update permission

In the Permissions section, the method with the verb PUT is what will allow us to update a permission.

```json
{
  "id": 10,
  "name": "Add Orders*",// update permission name
}
```

```json
//Response
{
  "id": 10,
  "name": "Add Orders*",// update permission name
}
```

<BR/>
<BR/>
<BR/>
<BR/>

## Select all permissions

```json
curl -X 'GET' \
  'http://localhost:3000/permissions' \
  -H 'accept: */*'
```

```json
[
  {
    "id": 1,
    "name": "Manage Roles"
  },
  {
    "id": 2,
    "name": "Manage Permissions"
  },
  {
  "id": 10,
  "name": "Add Orders*",
}
]
```

<BR/>
<BR/>
<BR/>
<BR/>


## Delete permission

```json
curl -X 'DELETE' \
  'http://localhost:3000/permissions/10' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJSb2xlcyI6W3siaWQiOjEsInVzZXJJZCI6MSwicm9sZUlkIjoxLCJjcmVhdGVkQXQiOiIyMDIzLTAyLTA4VDIzOjA4OjE0LjQ0NloifV0sImlhdCI6MTY3NTk0NzQwOSwiZXhwIjoxNjc2MDMzODA5fQ.Q3XeqfdgYMJaIWyP2bmMfkdi3px0FiiLNSu4BOUnQ_Y'
```

```json
//Response
status 200
```


<BR/>
<BR/>
<BR/>
<BR/>


## Assign permission to role

In the Roles section, the method with the verb POST 'assignPermission' is what will allow us to assign a permission to role.

Example:

```json
curl -X 'POST' \
  'http://localhost:3000/roles/assignPermission' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJSb2xlcyI6W3siaWQiOjEsInVzZXJJZCI6MSwicm9sZUlkIjoxLCJjcmVhdGVkQXQiOiIyMDIzLTAyLTA4VDIzOjA4OjE0LjQ0NloifV0sImlhdCI6MTY3NTk0NzQwOSwiZXhwIjoxNjc2MDMzODA5fQ.Q3XeqfdgYMJaIWyP2bmMfkdi3px0FiiLNSu4BOUnQ_Y' \
  -H 'Content-Type: application/json' \
  -d '{
  "roleId": 2,
  "permissionId": 3
}'
```

```json
//Response
{
  "roleId": 2,
  "permissionId": 10
}
```

## Unassign permission to role

In the Roles section, the method with the verb POST 'unassignPermission' is what will allow us to unassign a permission to role.

Example:

```json
curl -X 'POST' \
  'http://localhost:3000/roles/unassignPermission' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJSb2xlcyI6W3siaWQiOjEsInVzZXJJZCI6MSwicm9sZUlkIjoxLCJjcmVhdGVkQXQiOiIyMDIzLTAyLTA4VDIzOjA4OjE0LjQ0NloifV0sImlhdCI6MTY3NTk0NzQwOSwiZXhwIjoxNjc2MDMzODA5fQ.Q3XeqfdgYMJaIWyP2bmMfkdi3px0FiiLNSu4BOUnQ_Y' \
  -H 'Content-Type: application/json' \
  -d '{
  "roleId": 2,
  "permissionId": 3
}'
```

```json
//Response
status 200
```

<BR/>
<BR/>
<BR/>
<BR/>


# Step 5 - Steps to manual US02


## Assign role to user

In the Users Management section, the method with the verb POST 'assignRole' is what will allow us to assign a role to user.

Example:

```json
curl -X 'POST' \
  'http://localhost:3000/usersManagement/assignRole' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJSb2xlcyI6W3siaWQiOjEsInVzZXJJZCI6MSwicm9sZUlkIjoxLCJjcmVhdGVkQXQiOiIyMDIzLTAyLTA4VDIzOjA4OjE0LjQ0NloifV0sImlhdCI6MTY3NTk0NzQwOSwiZXhwIjoxNjc2MDMzODA5fQ.Q3XeqfdgYMJaIWyP2bmMfkdi3px0FiiLNSu4BOUnQ_Y' \
  -H 'Content-Type: application/json' \
  -d '{
  "userId": 65,
  "roleId": 10
}'
```

```json
//Response
{
  "userId": 65,
  "roleId": 2
}
```

## Unassign role to user

In the Users Management section, the method with the verb POST 'unassignRole' is what will allow us to unassign a role to user.

Example:

```json
curl -X 'POST' \
  'http://localhost:3000/usersManagement/unassignRole' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJSb2xlcyI6W3siaWQiOjEsInVzZXJJZCI6MSwicm9sZUlkIjoxLCJjcmVhdGVkQXQiOiIyMDIzLTAyLTA4VDIzOjA4OjE0LjQ0NloifV0sImlhdCI6MTY3NTk0NzQwOSwiZXhwIjoxNjc2MDMzODA5fQ.Q3XeqfdgYMJaIWyP2bmMfkdi3px0FiiLNSu4BOUnQ_Y' \
  -H 'Content-Type: application/json' \
  -d '{
  "userId": 65,
  "roleId": 2
}'
```

```json
//Response
status 200
```

<BR/>
<BR/>
<BR/>
<BR/>


## Assign permission to user

In the Users Management section, the method with the verb POST 'assignPermission' is what will allow us to assign a permission to user.

Example:

```json
curl -X 'POST' \
  'http://localhost:3000/usersManagement/assignPermission' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJSb2xlcyI6W3siaWQiOjEsInVzZXJJZCI6MSwicm9sZUlkIjoxLCJjcmVhdGVkQXQiOiIyMDIzLTAyLTA4VDIzOjA4OjE0LjQ0NloifV0sImlhdCI6MTY3NTk0NzQwOSwiZXhwIjoxNjc2MDMzODA5fQ.Q3XeqfdgYMJaIWyP2bmMfkdi3px0FiiLNSu4BOUnQ_Y' \
  -H 'Content-Type: application/json' \
  -d '{
  "userId": 65,
  "permissionId": 10
}'
```

```json
//Response
{
  "userId": 65,
  "permissionId": 10
}
```

## Unassign permission to user

In the Users Management section, the method with the verb POST 'unassignPermission' is what will allow us to unassign a permission to user.

Example:

```json
curl -X 'POST' \
  'http://localhost:3000/usersManagement/unassignPermission' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJSb2xlcyI6W3siaWQiOjEsInVzZXJJZCI6MSwicm9sZUlkIjoxLCJjcmVhdGVkQXQiOiIyMDIzLTAyLTA4VDIzOjA4OjE0LjQ0NloifV0sImlhdCI6MTY3NTk0NzQwOSwiZXhwIjoxNjc2MDMzODA5fQ.Q3XeqfdgYMJaIWyP2bmMfkdi3px0FiiLNSu4BOUnQ_Y' \
  -H 'Content-Type: application/json' \
  -d '{
  "userId": 65,
  "permissionId": 10
}'
```

```json
//Response
status 200
```

<BR/>
<BR/>
<BR/>
<BR/>



## EXTRAS

- Author - [Emiliano Loguidici](https://www.linkedin.com/in/emilianologuidici/)