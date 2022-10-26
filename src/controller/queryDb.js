// const controllers = require('./controllers');

// function retrieveInfo(req) {
// 	return new Promise((resolve, reject) => {
// 		var camInfo = controllers.getInfo(req);
// 		const error = true;
// 		if (error) {
// 			reject('failed query 500 level');
// 		} else {
// 			resolve(camInfo);
// 		}
// 	});
// }

// retrieveInfo.then(data => console.log(data)).catch(error => console.log(error));

// module.exports = retrieveInfo;

// const buyFlightTickets = () => {
// 	return new Promise((resolve, reject) => {
// 		setTimeout(() => {
// 			const error = false;

// 			if (error) {
// 				reject('take me to apology page');
// 			} else {
// 				resolve('display the data');
// 			}
// 		}, 3000);
// 	});
// };

// buyFlightTickets
// 	.then(success => console.log('success'))
// 	.catch(error => console.log(error));
