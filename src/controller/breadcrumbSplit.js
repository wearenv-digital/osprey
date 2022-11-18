const breadcrumbSplit = (req, res, next) => {
	req.state = Object.assign({}, req.state, {
		breadcrumbs: req.path.slice(1).split('/')
	});
	next();
};

module.exports = breadcrumbSplit;