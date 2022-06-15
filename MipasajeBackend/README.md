==== mipasajebackend ====

# Introduction
Backend for the Mipasaje application

## Technologies
* JavaScript
* Apollo GraphQL
* Mongoose


# Setup
## Local
* Create a `.env` file in the repository root
* Add an enviroment variable `MONGODB_URL=<YOUR COMPLETE MONGODB URL>` in the file
* `npm install`
* `npm start`
* Go to http://localhost:4000

# Usage
## Creating Data
Create data in the backend in the following order
1. Location
1. Route
1. Schedule
1. Client
1. Bus
1. Seat
1. Order

Check the file `sample.graphql` for sample GraphQL requests