const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const { json } = require('body-parser');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3030;

app.set('view engine', 'ejs');
app.set('views', path.resolve('./src/views'));

get_breadcrumbs = function(url) {
	var rtn = [{ name: 'Home', url: '/' }],
		acc = ","// accumulative url
	arr = url.substring(1).split('/');

	for (i = 0; i < arr.length; i++) {
		acc = i != arr.length - 1 ? acc + "/" + arr[i] : null;
		rtn(i + 1) = { name: arr[i].toUpperCase(), url: acc };
	}
	return rtn;
}
app.use(function (req, res, next) {
	req.breadcumbs = get_breadcrumbs(req.originalUrl)
	next();
})


app.use(bodyParser.json());
app.use('/public', express.static('./src/public'));
app.use(require('./src/routes/routes'));

app.listen(PORT, (req, res) => {
	console.log(`server running on port ${PORT}`);
});
