import { gql } from 'graphql-request';

export const getAllLocations = () => {
    return gql`
        {
            locations{
                _id
                name
            }
        }
    `
}

export const getOrigins = () => {
    return gql`
        {
            origins {
                _id
                name
            }
        }
    `
}

export const getDestinations = (id) => {
    return gql`
        {
            destinations(originId: "${id}") {
                _id
                name
            }
        }
    `
}

export const getBusesByClientId = (userId) => {
    return gql`
    {
        buses(userId: "${userId}") {
            _id
            model
            seatsDownstairs
            seatsUpstairs
            seatType
        }
    }
    `
};

export const getAllBuses = () => {
    return gql`
        {
        allBuses {
                _id
                model
                seatsDownstairs
                seatsUpstairs
                seatType
                user {
                _id
                name
                }
            }
        }
    `
}

   

export const getSearch = (horario, origen, destino) => {
	return gql`
       query {
            buses(
            where: {
                horario: {
                salida_gte: "${horario}"
                }, 
                ruta: {
                destino: {
                    ubicacion: "${destino}"
                }, 
                origen: {
                    ubicacion: "${origen}"
                }
                }
            }) {
            id
            precio
            tipoDeAsiento
            horario {
                salida
                llegada
            }
            user {
                nombre
                id
            }
            }
        }
	`;
};
export const getJourney = (journeyID) => {
	return gql`
            {
            journey(id: "${journeyID}") {
                price
                arrival
                departure
                bus {
                user {
                    logo
                    name
                }
                seatsDownstairs
                seatsUpstairs
                seatType
                }
            }
            }
	`;
};

export const getJourneys = (originId, destinationId) => {
	return gql`
             {
        journeys(
            originId: "${originId}",
            destinationId: "${destinationId}"
            ) {
                price
                _id

                user {
                    logo
                }

                bus {
                    seatType
                }

                departure
                arrival
                route {
                    origin {
                        name
                    }
                    destination {
                        name
                    }
                }
             }
         }
	`;
};

export const getJourneysPointOfSell = (originId, userId) => {
    return gql`
    {
        journeys(
            originId: "${originId}" ,
            userId: "${userId}"
            ){
            departure
            arrival
            price
            _id
            route {
            destination {
                name
                _id
            }
            _id
            }
        }
    }     
    `
};

export const getJourneysOfUser = (userId) => {
    return gql`
        {
            journeysByUserId(userId: "${userId}") {
                price
                arrival
                departure
                _id
                route {
                _id
                origin {
                    name
                    _id
                }
                destination {
                    name
                    _id
                }
                }
                bus {
                model
                _id
                }
            }
            
        }
    `
}

export const getAllJourneys = () => {
    return gql`
        {
            allJourneys {
                _id
                departure
                arrival
                price
                user {
                name
                _id
                }
                route {
                origin {
                    name
                    _id
                }
                destination {
                    name
                    _id
                }
                }
                bus {
                model
                }
            }
        }
    `
}

export const getValidToken = (token) => {
    return gql`
    {
        validToken(token: "${token}")
    }

    `
}

export const giveMeRole = (userId) => {
    return gql`
        {
        giveMeRole(userId: "${userId}")
        }
    `

}

export const getOriginsByClient = (userId) => {
    return gql`
        {
            routes(
                userId: "${userId}"
            ){
                origin{
                    _id
                    name
                }
            }
        }
    `
};

export const getAvailableOriginsByClient = (userId) => {
    return gql`
     {
            availableOrigin(userId: "${userId}") {
                name
                _id
            }
        }
    `
}

export const getDestinationsByClient = (userId, originId) => {
    return gql`
        {
            routes(
                userId: "${userId}",
                originId: "${originId}",
            ){
                destination{
                    _id
                    name
                }
            }
        }
    `
};

export const getUsersByRole = (role) =>{
    if (role == 'CLIENT'){
        return gql`
            {
                usersByRole(role: CLIENT) {
                    _id
                    name
                }
            }
        `
    }    
}

export const getAvailableDestinationsByClient = (userId, originId) => {
    return gql`
    {
        availableDestinationsForOrigin(
            userId: "${userId}", 
            originId: "${originId}"
            ){
            name
            _id
        }
    }
    `
};

export const getRouteId = (userId, originId, destinationId) =>{
    return gql`
    {
        routeGiveId(
            userId: "${userId}",
            originId: "${originId}",
            destinationId: "${destinationId}"
        ){
            _id
        }
    }
    `
}

export const getAllUsers = () => {
    return gql`
        {
            users{
                _id 
                name
                role
            }
        }
    `
}





// export const getSearchPrueba = (origen, destino) => {
// 	return gql`
//        query {
//             buses(
//             where: {
//                 ruta: {
//                 destino: {
//                     ubicacion: "${destino}"
//                 }, 
//                 origen: {
//                     ubicacion: "${origen}"
//                 }
//                 }
//             }){
//                 id
//                 precio
//                 tipoDeAsiento
//                 horario {
//                     salida
//                     llegada
//                 }
//                 ruta{
//                     origen{
//                       ubicacion
//                     }
//                     destino{
//                       ubicacion
//                     }
//                   }
//                 cliente {
//                     nombre
//                     id
//                     logo {
//                         url
//                     }
//                 }
//             }
//         }
// 	`;
// };
