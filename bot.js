var Twit = require('twit');
var chokidar = require('chokidar');
var filename;

var T = new Twit({
	consumer_key:         'ds7mfcByjQ2rAu80N6wCKRiaL',
	consumer_secret:      '7qML18OwaRWsTriaDbYFCUMyMBFD5WA9iCTOFld171XkSdP8ky',
	access_token:         '906998392642994177-GUSiING7bCdYhRxnry2eRZkWjrkS3Ql',
	access_token_secret:  'DxU8lMcr3JxgDHOA2YI7veZjnhNR1H9Q2Nk1cpMZvBgeg',
	//timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
});

var fs = require('fs');

console.log('I got here (before tweetIt).');

function tweetIt() {

	console.log('I got here (AFTER tweetIt).');
	
		
		var params = {
		encoding: 'base64'
		}
		var b64 = fs.readFileSync(filename, params);

		T.post('media/upload', { media_data: b64 }, uploaded);
		
		function uploaded(err, data, response) {
			var id = data.media_id_string;
			var tweet = {
				status: '#bottingAround, clearly this is not a node.js script',
				media_ids: [id]
			}
			T.post('statuses/update', tweet, tweeted);
		}
		function tweeted(err, data, response) {
			if (err) {
				console.log("U FUCKED UP!");
			} else {
				console.log("IT WENT SMOOTH AS A BABY'S BUTT!");
			}
		}
}

// chokidar.watch('feetspotter/output/*.jpg', {ignored: /(^|[\/\\])\../}).on('all', (event, path) => {
// 	console.log(event, path);
// });

var watcher = chokidar.watch('feetspotter/output/*.jpg', {
	ignored: /(^|[\/\\])\../,
	persistent: true
});

var log = console.log.bind(console);

watcher
.on('add', path => log(`File ${path} has been added`))
.on('add', path => filename = path)
.on('add', path => tweetIt());
