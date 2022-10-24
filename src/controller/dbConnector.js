const mysql = require('mysql2');
require('dotenv').config();

// if (!process.env.NODE_ENV === 'development') { };

const pool = mysql.createPool({
	host: 'sql',
	user: 'root',
	password: 'password',
	database: 'osprey',
	connectionLimit: 10
});

let dbResults = {};
// const sqlQuery = `SELECT * FROM cam_info`;

dbResults.all = () => {
	return new Promise((resolve, reject) => {
		const sqlQuery = `SELECT * FROM cam_info`;

		pool.query(sqlQuery, (err, results) => {
			if (err) {
				return reject(err);
			}
			return resolve(results);
		});
	});
};

// LETS TRY AND MAKE THIS REUSABLE
dbResults.id = (sqlQuery, params) => {
	return new Promise((resolve, reject) => {
		// const sqlQuery = `SELECT * FROM cam_info WHERE product_code = ?`;

		pool.query(sqlQuery, params, (err, results) => {
			if (err) {
				return reject(err);
			}
			return resolve(results);
		});
	});
};


// dbResults.id('SELECT * FROM cam_info WHERE product_code =?', [req.params.product_code])

module.exports = dbResults;

// module.exports = pool;
// module.exports = dbConnect;
