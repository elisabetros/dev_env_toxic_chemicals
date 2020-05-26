const credentials = require('./config/dbcredentials');
const knexSnakeCaseMapper = require('objection').knexSnakeCaseMappers;

module.exports = {
  development: {
    client: 'mysql',
    connection: {
      database: credentials.development.database,
      user: credentials.development.user,
      password: credentials.development.password
    },
  },
      production: {
        connection: {
          database: 'mysql://g80nt5hbvhctxug5:vx203i9q039mqq0u@ou6zjjcqbi307lip.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/ua24ml0yzx4h8g8t',
        
        },
      },
  ...knexSnakeCaseMapper()
};