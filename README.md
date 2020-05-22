# API Blueprint with setup, user, and healthcheck enpoints

## Stack keywords
- TypeORM
- Postgres
- Heroku release phase (run migrations)
- store password encrypted with `bcrypt`

## Endpoints:

`GET /setup` - only continues when User count = 0 (throws Error when user count > 0)

returns instructions for `POST /setup`

`POST /setup` - sets up first `superadmin` user with chosen password and email

`POST /users (authorized)` - register new user

`POST /resetpwd`  - sends email to user's emailaddress with token to reset

`POST /resetpwd/:token` - saves new password for account (info in token)

`GET /health` - health check

`POST /health/add` - adds check record to database

`GET /health/list` - returns list of health check records