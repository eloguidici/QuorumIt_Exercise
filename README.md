<h1 align="center"> Authorization Proyect </h1>

# README


## CONTENTS OF THIS FILE
   
* Introduction
* Requirements
* Installation
* Test
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

### Development

```bash
$ ./start-dev.sh
```



## TEST

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```



## EXTRAS

- Author - [Emiliano Loguidici](https://www.linkedin.com/in/emilianologuidici/)