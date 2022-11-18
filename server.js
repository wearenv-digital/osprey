const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const path = require('path');
const breadcrumbSplit = require ('./src/controller/breadcrumbSplit')
const app = express();
const searchBar = require('./src/controller/search');
// const breadcrumbs = require('express-breadcrumbs');


const PORT = process.env.PORT || 3030;

app.set('view engine', 'ejs');
app.set('views', path.resolve('./src/views'));

app.use(bodyParser.json());
app.use(breadcrumbSplit);

app.use('/public', express.static('./src/public'));

app.use(require('./src/routes/routes'));

app.listen(PORT, (req, res) => {
	console.log(`server running on port ${PORT}`);
});
