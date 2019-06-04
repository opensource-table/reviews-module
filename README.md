# Reviews and Impressions Module

> This module is part of the OpenSource Table app. It displays reviews for over 10 million
restaurants around the world.

## Related Modules

  - https://github.com/opensource-table/ost-photos
  - https://github.com/opensource-table/reservations

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
1. [API](#api)

## Usage

### Deploy with Docker

- Make sure no images with the names "rdbimg" or "rfeimg", or containers with the names "rdb" or "rfe" exist on the host
- call 'bash compose'
- visit port 3010 on the host IP
- to compose down, use 'bash decompose'... but beware, it will prune any other dangling images and volumes as well.


### Plain Node

- Install the necessary dependencies for this module (npm install)
- Transpile and bundle all the components (webpack)
-   npm run react-dev if you want to watch for changes
- If it's your first time downloading the repo, [seed the database](#postgresql)
- Start the server (npm run server-dev)
- The public folder will be available at localhost port 3010

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- PostgreSQL 11.2

### PostgreSQL

! If re-seeding, run: dropdb reviews

0) Homebrew is required
  - https://brew.sh
1) Install postgres
  - brew install postgres
2) Start postgres if it is not already started
  - brew services start postgres
3) Run the following commands:
  - createdb reviews
  - $ psql reviews
4) Run the schema file
  - reviews=# \i database/schema.sql
5) Check out the tables
  - reviews=# \dt
6) Exit the psql shell
  - reviews=# \q
7) Go to the config/db_config.js file
  - make the role equal to your local username or whatever is the username of the postgres role that created the database (run 'select * from pg_roles;' in the psql shell [psql reviews to enter the shell again] to see a list of possibilities)
  - if you are running via docker, make the password the POSTGRES_PASSWORD specified as an environment variable in /compose & the host to 'rdb' (whatever will be the name of the container on the netowrk)
  - else, make the password your local postgres password & the host to 'localhost'
8) Run the seed script (don't forget npm install)
  - npm run seed
9) Check if the tables populated
  - psql reviews
  - reviews=# select * from reviews;

## API

### Request Endpoints

| Endpoint      | Type   | Operation                                         |
|---------------|--------|---------------------------------------------------|
| `/:id/reviews`| GET    | Get all reviews for a specific restaurant         |
| `/:id/reviews`| POST   | Create a new review for a specific restaurant     |
| `/:id/reviews`| PUT    | Edit an existing review for a specific restaurant |
| `/:id/reviews`| DELETE | Delete a review for a specific restaurant         |


