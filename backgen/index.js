const CubejsServer = require('@cubejs-backend/server');
const PostgresDriver = require('@cubejs-backend/postgres-driver');
const MySQLDriver = require('@cubejs-backend/mysql-driver');

console.log(process.env.REDIS_URL);
console.log(process.env.NODE_ENV);
console.log(process.env.CUBEJS_DB_HOST);
const queueOptions = {
  concurrency: 3,
  continueWaitTimeout: 10,
  heartBeatInterval: 60
};
const server = new CubejsServer({
  contextToAppId: ({ authInfo }) => `CUBEJS_APP_${authInfo.schema}`,
  driverFactory: () => new PostgresDriver({
    readOnly: true
  }),
  externalDbType: 'mysql',
  preAggregationsOptions: { queueOptions },
  externalDriverFactory: () => new MySQLDriver({
    host: 'database-1.cvnlrdz36rko.us-east-1.rds.amazonaws.com',
    port: 3306,
    database: 'stb_pre_aggregations',
    user: 'dbaadmin',
    password: '3Vm6c-z728N9X5gM'
  })
});

server.listen().then(({ port }) => {
  console.log(`🚀 Cube.js server is listening on ${port}`);
}).catch(e => {
  console.error('Fatal error during server start: ');
  console.error(e.stack || e);
});
