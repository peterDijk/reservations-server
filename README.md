# API for simple Reservations app
accounts have locations, which have time units with certain capacity, reservations can be made for certain timeunits for certain dates

## Stack keywords
- TypeORM
- Postgres
- Heroku release phase runs migrations
- bcrypt encryption for passwords


## Controllers

### Setup
`POST /setup` 
- if more than 0 users, throw `Setup is already done`
- create user `superadmin` with password and email from params

### User
`POST /users` 
- parameters: `username, password, firstName, lastName, email`
- throws if: no username or password in parameters, user or email exists
- returns created user with role `user`

`GET /users`
- Authorized (Role `admin`)
- returns list of all users

`GET /users/:id`
- Authorized (Role `admin`)
- returns user of given id

### ResetPassword
`POST /reset`
- parameters: `email`
- throws if: no user found with that email
- Uses Twillio SendGrid to email a JWT token containing user's id (valid 30min) to the user's emailaddress
- returns message token has been emailed

`POST /reset/:token`
- parameters: `password`
- throws if: token is not valid, no user found with id that's in the token
- Uses method `setPassword` on User entity that creates encrypted version of the new password
- returns the altered user 

### Login
`POST /login`
- parameters: `username, password`
- throws if: no user with username found, `checkPassword` method on User entity (bcrypt verify of raw vs stored encrypted string)
- returns: JWT object with `id` (user.id) and `roles`

### Account
`POST /accounts` 
- Authorized (Role `user`)
- parameters: `name, desc`
- creates a new account. Sets the account administrator to the current logged in user
- change to the current user's `roles` -> adds Account Admin role

`POST /accounts/generateInvite`
- Authorized (Role `account_admin`)
- parameters: `accountId`
- throws if: no account, not the account admin
- generates random 4 letter/number string
 - stores it with the account
 - returns saved account

`POST /accounts/members`
- Authorized (Role `user`)
- parameters: `accountId, inviteToken (optional)`
- throws if: no account, no token but required for account, given token not same as account-invite-token

`GET /accounts`
- returns a list of all accounts, including the related administrators

### Location
`POST /accounts/locations`
- Authorized (Role `account_admin`)
- parameters: `accountId, name`
- throws if: account does not exist, current user is not account admin
- returns the saved location

`POST /locations/timeunits`
- Authorized (Role `account_admin`)
- parameters: `locationId, name, capacity`
- throws if: location not exists, account linked to location not exists, account has no admin, current user is not the account admin
- returns the saved time unit

### Reservation
`POST /reservations/`
- Authorized (Role `user`)
- parameters: `timeUnitId, date`
- throws if: no timeunit with id exists, current user is not a member of the related account
- returns the new reservation

`GET /reservations/:locationId`
- throws if: no location found
- returns list of reservations linked to the requested locationId

### Service
`GET /health`
- health check

### TODO

- user reg > email confirmation
- datecreated + datemodified column add to models
- after reset, invalidate token
- user: update, delete endpoints
- account: update, delete endpoints
- location: update, delete endpoints
- reservation: delete endpoint

- new reservations > validate days in advance, remaining capacity, etc

- start script > use build target/index.js. ormconfig needs change (naming strategy)
