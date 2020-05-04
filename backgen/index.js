const CubejsServer = require('@cubejs-backend/server');
const PostgresDriver = require('@cubejs-backend/postgres-driver');
const MySQLDriver = require('@cubejs-backend/mysql-driver');

console.log(process.env.REDIS_URL);
console.log(process.env.NODE_ENV);
console.log(process.env.CUBEJS_DB_HOST);
const server = new CubejsServer({
  driverFactory: () => new PostgresDriver({
    readOnly: true
  }),
  externalDbType: 'mysql',
  externalDriverFactory: () => new MySQLDriver({
    host: 'localhost',
    port: 3306,
    database: 'stb_pre_aggregations',
    user: 'root',
    password: 'Password@123'
  })
});

server.listen().then(({ port }) => {
  console.log(`🚀 Cube.js server is listening on ${port}`);
}).catch(e => {
  console.error('Fatal error during server start: ');
  console.error(e.stack || e);
});
