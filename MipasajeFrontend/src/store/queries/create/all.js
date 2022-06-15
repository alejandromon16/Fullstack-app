import { gql } from 'graphql-request';

export const addJourney = (userID, busID, routeID, departure, arrival, price) =>{
    return gql`
        mutation{
            addJourney(
                input:{
                    userID: "${userID}",
                    busID: "${busID}",
                    routeID: "${routeID}",
                    departure: "${departure}",
                    arrival: "${arrival}",
                    price: "${price}"
                }
            ){
                _id
            }
        }
    `
}

export const addBus = (userID, model, seatsDownstairs, seatsUpstairs, seatType, list) => {
    return gql`
         mutation{
            addBus(
                input:{
                    userId: "${userID}",
                    model: "${model}",
                    seatsDownstairs: ${seatsDownstairs},
                    seatsUpstairs: ${seatsUpstairs},
                    seatType: ${seatType.toUpperCase()},
                    images : ${list}
                }
            ){
                _id
            }
        }
    `
}