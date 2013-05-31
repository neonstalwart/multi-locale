// setup our global define and require
dojoConfig = {
	// help dojo find where it lives
	baseUrl: __dirname,
	packages: [
		'dojo',
		'app',
		'put-selector'
	]
};
require('./dojo/dojo');

var http = require('http'),
	// dojo's require so we can enter into AMD-land
	amdRequire = global.require,
	// remember which locales have been configured so we only do it once
	locales = {};

http.createServer(function (req, res) {
	// when the request comes in, check the locale - use whatever means you need, for expediency i'm
	// using the path to represent the locale and it's not very robust
	var locale = require('url').parse(req.url).path.replace(/^\//, ''),
		map = {},
		localizedDojo = locale + 'dojo',
		localizedApp = locale + 'app',
		dojoPackage,
		appPackage;

	if (locale === 'favicon.ico') {
		res.writeHead(404);
		return;
	}

	if (locale && !locales[locale]) {
		// remember that we have this locale configured so we don't bother with it again
		locales[locale] = 1;

		// setup maps for the localized versions of dojo and the app
		map[localizedDojo] = {
			dojo: localizedDojo
		};
		map[localizedApp] = {
			dojo: localizedDojo
		};

		// setup the configuration for the localized packages for dojo and the app.
		// the names of the packages will be locale-specific but the code will come from the common
		// locations.
		dojoPackage = {
			location: 'dojo',
			name: localizedDojo
		};
		appPackage = {
			location: 'app',
			name: localizedApp
		};

		// configure require for the specific locale we are using
		amdRequire({
			packages: [
				dojoPackage,
				appPackage
			],
			locale: locale,
			map: map
		});
	}

	// everything should be in place to serve this locale-specific request now
	amdRequire([localizedApp + '/localized'], function (localizedServer) {
		localizedServer(req, res);
	});

}).listen(1337, '127.0.0.1');

console.log('Server running at http://127.0.0.1:1337/');
