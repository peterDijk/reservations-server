# API Blueprint with setup, user, and healthcheck enpoints

## Stack keywords
- TypeORM
- Postgres
- Heroku release phase (run migrations)
- passwords stored encrypted

## 

- remember to set environment variable for `JWT_SECRET`

## Endpoints:

`POST /users (authorized)` - register new user

`POST /reset`  - sends email to user's emailaddress with token to reset

`POST /reset/:token` - saves new password for account (info in token)

`GET /health` - health check

`POST /health/add` - adds check record to database

`GET /health/list` - returns list of health check records

## Controllers

#### Setup
`POST /setup` 
- if more than 0 users, throw `Setup is already done`
- create user `superadmin` with password and email from params

#### User
`POST /users` 
- throws if: no username or password in parameters, user or email exists
- create user with role `user`

`GET /users`
- Authorized (Role `admin`)
- returns list of all users

`GET /users/:id`
- Authorized (Role `admin`)
- returns user of given id

### TODO

- user reg > email confirmation
- different kinds of tokens (now with a reset token you can login, with login you can reset)
- after reset, invalidate token
- start script > use build target/index.js. ormconfig needs change (naming strategy)
