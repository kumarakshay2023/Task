# Bcekend dellance clone API

# Table of Contents
[Pre-requisites](#Pre-requisites)

[Getting started](#Getting-started)

[API Document endpoints](#API-endpoints)

# Pre-requisites
- Install [Node.js](https://nodejs.org/en/) version >= 14.10.0

# Getting-started
```
- Install dependencies
```
cd <project-name>

npm install
```
- Configure .env file (rename .env.example to .env)

- Setup database
```
Create database dellance and update connection details in .env file
- DB setup command
```
npm run init:db
```

- Build and run the project
```
npm start
```

- Seed command
```
npm run seed:all:up
```
- DB changes please run (such for error uncloumn)
```
npm run migration
```


- This note.txt file add project related instruction