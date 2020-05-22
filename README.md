# API Blueprint with setup, user, and healthcheck enpoints

## Stack keywords
- TypeORM
- Postgres
- Heroku release phase (run migrations)
- store password encrypted with `bcrypt`

## 

- remember to set environment variable for `JWT_SECRET`

## Endpoints:


`POST /setup` 
- only continues when User count = 0
- sets up first `superadmin` user with chosen password and email

`POST /users (authorized)` - register new user

`POST /resetpwd`  - sends email to user's emailaddress with token to reset

`POST /resetpwd/:token` - saves new password for account (info in token)

`GET /health` - health check

`POST /health/add` - adds check record to database

`GET /health/list` - returns list of health check records

### TODO

- user reg > email confirmation
- Koa > use all controllers in folder controller/*.ts
- start script > use build target/index.js. ormconfig needs change (naming strategy)