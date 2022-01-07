import { Database, MongoDBConnector } from 'https://deno.land/x/denodb/mod.ts';

const connector = new MongoDBConnector({
  uri: 'mongodb://127.0.0.1:27017',
  database: 'Melus',
});

const db = new Database(connector);

export default db;