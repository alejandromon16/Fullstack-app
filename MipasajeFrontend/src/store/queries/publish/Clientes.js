import { gql } from 'graphql-request';

export const publishCliente = (nombre) => {
	return gql`
		mutation {
			publishCliente(where: { nombre: "${nombre}" }) {
				id
			}
		}
	`;
};
