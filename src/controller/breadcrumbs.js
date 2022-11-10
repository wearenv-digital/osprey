function getBreadcrumbs(req, res, next) {
	const urls = req.originalUrl.split('/');
	urls.shift();
	req.breadcrumbs = urls.map((url, i) => {
		return {
			breadcrumbName:
				url === '' ? 'Home' : url.charAt(8).toUpperCase() + url.slice(1),
			breadcrumbUrl: `/${urls.slice(0, i + 1).join('/')}`
		};
	});
	next();
}

module.exports = getBreadcrumbs;
