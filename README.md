<p align="center"> 
    <img src="https://hotemoji.com/images/emoji/o/1mzeb0m185tm5o.png">
</p>

<h1 align="center">RepoProvas</h1>

<div align="center">
  <h3>Built With</h3>
  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" height="30px"/>
 <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" height="30px"/>  
  <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express.js&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white" heigth="30px">
  <img src="https://img.shields.io/badge/Jest-323330?style=for-the-badge&logo=Jest&logoColor=white">
  <!--  Badges  source:  https://dev.to/envoy_/150-badges-for-github-pnk  -->
</div>

# Description

RepoProvas is going to make easier to find test done for your study, could be use in school systen to facilite the process.

# Features

- Signup and signin
- Create tests
- Find tests by discipline
- Find tests by teacher info

## API Reference

### Signup

```http
  POST /users/signup
```

Request:
|Body | Type | Description |
|----------------|--------|---------------------------|
|`name` |`string`|**Reuqired**. name user |
|`email` |`string`|**Reuqired**. email user |
|`password` |`string`|**Reuqired**. user password|
|`repeatPassword`|`string`|**Reuqired**. user password|

`email format: user@user.com` \
`password min length: 8 caracters`\
`repeatPassword is ref from password`

</br>

### Signin

```http
  POST /users/signin
```

Request:
|Body | Type | Description |
|----------------|--------|---------------------------|
|`email` |`string`|**Reuqired**. email user |
|`password` |`string`|**Reuqired**. user password|

Response:

```json
  token
```

`token: came with string in format jsonwebtoken`

</br>

### Create test:

```http
POST /tests/create
```

Request:

| Headers         | Type     | Description                |
| --------------- | -------- | -------------------------- |
| `Authorization` | `Bearer` | **Reuqired**. Bearer token |

| Body           | Type     | Description                     |
| -------------- | -------- | ------------------------------- |
| `name`         | `string` | **Reuqired**. name for test.    |
| `pdfUrl`       | `string` | **Reuqired**. url from test.    |
| `categoryId`   | `number` | **Reuqired**. category of test. |
| `disciplineId` | `number` | **Reuqired**. discipline id.    |
| `teacherId`    | `number` | **Reuqired**. teacher id.       |

```json
{
  "id": 2,
  "name": "Nichole",
  "pdfUrl": "https://outrageous-naturalisation.com",
  "categoryId": 1,
  "teacherDisciplineId": 1
}
```

### Find tests by disciplines:

```http
GET /tests/getByDisciplines
```

Request:

| Headers         | Type     | Description                |
| --------------- | -------- | -------------------------- |
| `Authorization` | `Bearer` | **Reuqired**. Bearer token |

</br>

Response:

```json
[
  {
    "term": 1,
    "disciplines": [
      {
        "name": "HTML e CSS",
        "testsCategories": [
          {
            "id": 1,
            "name": "Projeto",
            "test": [
              {
                "name": "Nichole",
                "pdfUrl": "https://outrageous-naturalisation.com",
                "teacher": "Diego Pinho"
              }
            ]
          }
        ]
      },
      {
        "name": "Humildade",
        "testsCategories": []
      }
    ]
  }
]
```

</br>

### Find tests by teacher:

```http
GET /tests/getByDisciplines
```

Request:

| Headers         | Type     | Description                |
| --------------- | -------- | -------------------------- |
| `Authorization` | `Bearer` | **Reuqired**. Bearer token |

</br>

Response:

```json
[
  {
    "name": "Diego Pinho",
    "disciplines": [
      {
        "discipline": {
          "name": "HTML e CSS"
        },
        "tests": [
          {
            "name": "Nichole",
            "pdfUrl": "https://outrageous-naturalisation.com",
            "category": {
              "id": 1,
              "name": "Projeto"
            }
          }
        ]
      },
      {
        "discipline": {
          "name": "JavaScript"
        },
        "tests": []
      },
      {
        "discipline": {
          "name": "React"
        },
        "tests": []
      }
    ]
  }
]
```

## Run Locally

​

Clone the project

​

```bash

  git clone https://github.com/luishsilva09/projeto20-repoprovas.git

```

Install dependencies

​

```bash

  npm install

```

Configuration and create database

```bash

  npx prisma migrate dev

```

To run

```bash
npm run build
npm start
```

## Environment Variables

To run this project in local, you will need to add the following environment variables to your .env file

`DATABASE_URL = postgres://UserName:Password@Hostname:5432/DatabaseName`
​
`PORT = number #recommended:5000`

`SECRET_KEY = string`

You can run this systen using a URL https://repoprovas-projeto.herokuapp.com/

To make easier you could use this database for the tests you should use the heroku aplication.

## Authors

​

- Luís Henrique da Silva

​

https://github.com/luishsilva09
