import { gql } from 'graphql-request';


export const addRoute = (userId, originId, destinationId) => {
    return gql`
    mutation{
        addRoute(
            input:{
                userId: "${userId}",
                originId: "${originId}",
                destinationId: "${destinationId}"
            }
        ){
            _id
        }
    }
    `
};