# Bcekend Task  API

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
# API-endpoints
## Reading API End Points
  - get books for admin 
    - /api/admin/books
  - get books for user
    - /api/user/books

## Creating API End Points
  - super admin login
    - /api/super-admin/login
  - super admin for adding user and admin
    - /api/super-admin/add-user-admin
  - admin login 
    - /api/admin/login
  - admin for adding book
    - /api/admin/book
  - user for login
    - /api/user/login
  - user for book order
    - /api/user/book/order

## Updating API End Points
  - super admin book approve 
    - /api/super-admin/approve/book/:bookId
  - super admin book reject
    - /api/super-admin/reject/book/:bookId
  - admin for book update
   - /api/admin/book/:bookId

## Deleting API End Points
  - admin book delete
   - /api/admin/book/:bookId

## Common API End Points
  - forgot password
   - /api/common/forgot-password
  - reset password
   - /api/common/reset-password

  

- This note.txt file add project related instruction