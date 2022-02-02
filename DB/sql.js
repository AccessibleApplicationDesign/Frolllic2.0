const { Pool } = require('pg');

const PG_URI = 'postgres://clwnuddk:RFjzfQro1fl_JK2Ne2aRrJ3KGcJ1XGe5@kashin.db.elephantsql.com/clwnuddk';

const velociRabbitPool = new Pool({
  connectionString: PG_URI
});

module.exports = {
  query: (text, params, callback) => {
    return velociRabbitPool.query(text, params, callback);
  }
};