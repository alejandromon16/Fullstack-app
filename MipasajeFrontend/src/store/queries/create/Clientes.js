import { gql } from 'graphql-request';

export const createCliente = (nombre) => {
	return gql`
		mutation {
			createCliente(data: { nombre: "${nombre}" }) {
				id
			}
		}
	`;
};
