import mutation from './mutation';
import query from './query';
import typeResolvers from './type';
import {DateResolver, DateTimeResolver, ObjectIDResolver} from 'graphql-scalars';

const resolvers = {
  Query: query,
  Mutation: mutation,
  ...typeResolvers,
  Date: DateResolver,
  DateTime: DateTimeResolver,
  ObjectID: ObjectIDResolver,
};

export default resolvers;
