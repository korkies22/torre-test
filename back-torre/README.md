# Back torre-test

This contains the backend for the torre-test web dev challenge

## Author

- Carlos Mario Sarmiento Pinilla (korkies22)

  [GitHub](https://github.com/korkies22)

Deployed on Heroku

## Project description

This project is built with a microservices approach. Every service is inside the modules folder (/src/modules) and each has its own routes, controller and queries for the DB. The modules share the folder util (/src/util) but outside of that, they work on their own.

Project uses eslint and prettier for formatting and code checking. It is recommended to use vscode, install vscode prettier and eslint extentions and let prettier as the "default formatting"
(Right click, format document with, configure default formatter, prettier)

## Base technologies

Project uses NodeJS with Typescript for microservices construction. In dist folder there remain the js files.

### Technology selection

NodeJS is specially made for handling asynchronous requests, for example with the DB, which is the core of the application (doesn't involve heavy computing).

NoSQL MongoDB database was chosen for its speed in data transfer, its query capabilities and its low cost compared to other NoSQL DBs (currently using free tier). Mongoose was chosen to structure no relational models and make querying much easier.

Also, eslint y prettier were chosen to formatting code so that they can follow standard typescript and javascript formats

This project uses another libraries which can be observed in the package.json file

## Executing instructions

### Requirements

- **Node JS**

Verify that nodeJS in installed by executing "node -v" in the terminal o cmd. It can be downloaded from https://nodejs.org/ (versión LTS)

Install global required libraries. In order to do that the next command must be executed in the terminal (with sudo in UNIX systems).

```
npm install -g typescript prettier eslint
```

Then execute in the main folder

```
npm install
```

### Run project in development

A .env file is required in the main backend folder with the information of the required environment variables, there are:

- BACK_URL: URL of the backend, so it can forward requests to itself (tipically localhost:4000/api)
- DB_HOST: MongoDB IP, with credentials
- BUCKET_NAME: Nombre del bucket en el cual se encuentran alojados los archivos estáticos de la aplicación
- privateKey: Private key, used for encrypting tokens
- publicKey: Public key, used for decrypting tokens
- CLOUDINARY_CLOUD_NAME: The name of the cloudinary repository to store the videos
- CLOUDINARY_API_KEY: The api key of the cloudinary account
- CLOUDINARY_SECRET: The secret key of the cloudinary account

In the main folder of the backend you must execute

```
npm run dev
```

### Running project in production

#### Prerrequisites:

- Having a heroku account

You must run `npm run build` in the main backend folder

This will generate the dist folder, used for having the project ready for running it in production.

Then you must login with git in Heroku and push the project there
