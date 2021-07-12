'use strict';
const arvish = require('arvish');

const ONE_DAY = 86400000;

arvish.fetch('https://ionicframework.com/docs/v2/data/index.json', {
	maxAge: ONE_DAY,
	transform: result => {
		const ref = result.ref;

		return Object.keys(ref).map(x => ({
			url: ref[x].p,
			keyword: ref[x].t
		}));
	}
}).then(result => {
	const items = arvish
		.inputMatches(result, 'keyword')
		.map(x => {
			const url = `https://ionicframework.com/docs/v2${x.url}`;

			return {
				title: x.keyword,
				autocomplete: x.keyword,
				arg: url,
				quicklookurl: url
			};
		});

	arvish.output(items);
});
