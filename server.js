const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const { json } = require('body-parser');
const path = require('path');
const app = express();
const breadcrumbs = require('express-breadcrumbs');

const PORT = process.env.PORT || 3030;

app.set('view engine', 'ejs');
app.set('views', path.resolve('./src/views'));

app.use(bodyParser.json());
app.use(breadcrumbs.init());

// app.use((req, res, next) => {
// 	const err = new Error('Not Found');
// 	err.status = 404;
// 	next(err);
// });

// app.use((err, req, res, next) => {
// 	res.locals.error = err;
// 	const status = err.status || 500;
// 	res.status(status);
// 	res.render('error');
// });

app.use(breadcrumbs.setHome());

app.use(
	'/',
	breadcrumbs.setHome({
		name: 'Home',
		url: '/'
	})
);

app.use('/public', express.static('./src/public'));
app.use(require('./src/routes/routes'));

app.listen(PORT, (req, res) => {
	console.log(`server running on port ${PORT}`);
});
