define(['dojo/i18n!dojo/nls/colors', 'dojo/_base/config', 'dojo/node!../../put-selector/put'], function (colors, config, put) {

	// logging which locale this has been loaded before so we can see that it's loaded once per unique locale
	console.log('localized has been loaded for locale', config.locale);

	return function (req, res) {
		res.writeHead(200, {'Content-Type': 'text/html'});

		var page = put('html head meta[charset=utf-8]').sendTo(res),
			colorList = put(page, 'ul'),
			key;

		for (key in colors) {
			put(colorList, 'li', key + ': ' + colors[key]);
		}

		page.end();
	};
});