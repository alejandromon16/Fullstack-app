import { gql } from 'graphql-request';

export const getSearchBus = (id) => {
	return gql`
        {
            bus(id: "${id}"){
                seats{
                    identifier
                }
                seatsDownstairs
                seatsUpstairs
                price
                seatType
            }
        }
      
	`;
};

export const getSearchBuses = (id) => {
	return gql`
        {
            busesByRoute(id: "${id}"){
                _id
                model
                price
                seatType
                user {
                    name
                    _id
                }
                schedule {
                    departure
                    arrival
                }
            }
        }
      
	`;
};


export const getBuses = () => {
	return gql`
       query {
            allBuses {
                model
                seats {
                _id
                state
                }
                _id
                price
                seatsUpstairs
                seatsDownstairs
                seatType
                user {
                name
                _id
                }
                route {
                origin {
                    name
                }
                destination {
                    name
                }
                }
                schedule {
                departure
                arrival
                }
            }
            }
	`;
};