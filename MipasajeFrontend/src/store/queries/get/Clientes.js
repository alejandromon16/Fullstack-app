import { gql } from 'graphql-request';

export const getClientes = () => {
	return gql`
		query {
			clientes {
				id
				nombre
			}
		}
	`;
};

export const getCredentials = (name,password) => {
	return gql`
		mutation {
			loginUser(input:{
				name: "${name}"
				password: "${password}"
			}) {
				token
				_id
				role
			}
		}
	`;
};
