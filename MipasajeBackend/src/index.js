import {connectToDb} from './modules/database';
import {startServer} from './modules/graphql';

async function setup() {
  await connectToDb();
  await startServer();
}

setup();
