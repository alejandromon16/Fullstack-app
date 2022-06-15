import {gql} from 'apollo-server';

const schema = gql`
  scalar ObjectID
  scalar Date
  scalar DateTime

  enum SEAT_TYPE {
    SEMICAMA
    NORMAL
    CAMA
  }

  enum ROLE {
    SUPER_ADMIN
    ADMIN
    CLIENT
    REGULAR
  }

  type Image{
    _id: ObjectID!
    url: String!
  }

  type Location {
    _id: ObjectID!
    name: String!
    image: String!
  }

  type User {
    _id: ObjectID!
    name: String!
    email: String!
    logo: String
    token: String,,,
    role: ROLE!
  }

  type Route {
    _id: ObjectID!
    origin: Location!
    destination: Location!
    user: User!
  }

  type Bus {
    _id: ObjectID!
    user: User!
    model: String!
    images: [Image!]!
    seatsDownstairs: Int!
    seatsUpstairs: Int!
    seatType: SEAT_TYPE!
  }

  type Journey {
    departure: DateTime!
    arrival: DateTime!
    price: Float!
    _id: ObjectID!
    user: User!
    route: Route!
    bus: Bus!
  }

  type Order {
    _id: ObjectID!
    firstName: String!
    lastName: String!
    unitPrice: Float!
    quantity: Int!
    totalPrice: Float!
    seats: [String!]!
    journey: Journey!
    createdAt: Date!
    updatedAt: Date!
    user: User!
  }

  input AddLocationInput {
    name: String!
  }

  input AddUserInput {
    name: String!
    email: String!
    password: String!
    logo: String
    role: ROLE!
  }

  input AddRouteInput {
    originId: ObjectID!
    destinationId: ObjectID!
    userId: ObjectID!
  }

  input ImageInput{
    url: String!
  }

  input AddBusInput {
    userId: ObjectID!
    model: String!
    seatsDownstairs: Int!
    seatsUpstairs: Int!
    seatType: SEAT_TYPE!
    images: [ImageInput!]
  }

  input AddJourneyInput {
    userId: ObjectID!
    busId: ObjectID!
    routeId: ObjectID!
    departure: DateTime!
    arrival: DateTime!
    price: Float!
  }

  input registerUser {
    name: String!
    email: String
    password: String!
    logo: String
  }

  input LoginUserInput {
    name: String!
    password: String!
  }

  type Query {
    locations: [Location!]!
    availableDestinationsForOrigin(userId: ObjectID!, originId: ObjectID!): [Location!]!
    availableOrigin(userId: ObjectID!): [Location!]!

    user(id: ObjectID!): User
    users: [User!]!
    usersByRole(role: ROLE!):[User!]!
    
    destinations(originId: ObjectID!): [Location!]
    origins: [Location!]

    allRoutes: [Route!]
    route(id: ObjectID): Route
    routes(userId: ObjectID, originId: ObjectID, destinationId: ObjectID): [Route!]!
    routeGiveID(userId: ObjectID, originId: ObjectID, destinationId: ObjectID): [Route!]!

    bus(id: ObjectID!): Bus
    allBuses: [Bus!]!
    buses(userId: ObjectID!): [Bus!]!
    isBusAvailable(busId: ObjectID!, from: DateTime!, to: DateTime!): Boolean!

    journey(id: ObjectID!): Journey
    journeysByRouteId(routeId: ObjectID!): [Journey!]!
    journeys(
      originId: ObjectID!
      destinationId: ObjectID
      userId: ObjectID
      departsBefore: DateTime
      departsAfter: DateTime
      arrivesBefore: DateTime
      arrivesAfter: DateTime
    ): [Journey!]!

    journeysByUserId(userId: ObjectID!): [Journey!]!

    # admin
    allJourneys: [Journey!]!
    validToken(token: String!): Boolean!
    giveMeRole(userId: ObjectID!): String!
  }

  type Mutation {
    addLocation(input: AddLocationInput!): Location

    addUser(input: AddUserInput!): User
    deleteUser(id: ObjectID!): User
    # When we have input, it should be the only parameter (don't use _id here). Make a new input type: UpdateuserInput
    updateUser(_id: ID, input: AddUserInput!): User
    loginUser(input: LoginUserInput!): User

    addRoute(input: AddRouteInput!): Route

    addBus(input: AddBusInput!): Bus

    addJourney(input: AddJourneyInput!): Journey

    # Only for testing
    clearDb: Boolean
    populateSampleData: Boolean
  }
`;

export default schema;
