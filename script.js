var $input = $('#input'),
	$results = $('#results')


// var source = Rx.Observable.interval(500).take(10);
// source.subscribe(x => console.log(x))

var keyups = Rx.Observable.fromEvent($input, 'keyup')
			.map(e => e.target.value)
			.filter(text => text.length > 2);

// keyups.subscribe(x => console.log('keyup'))

// var throttled = keyups.throttle(500);

// var distinct = throttled.distinctUntilChanged();

function searchWiki(term){
	return $.ajax({
		url: "http://en.wikipedia.org/w/api.php",
		dataType : "jsonp",
		data : {
			action : 'opensearch',
			format : 'json',
			search : term
		}
	}).promise();
}	
var suggestions = keyups.flatMap(searchWiki)
suggestions.subscribe(data => {
	// console.log(data);
	$results.empty();
	// console.log(data[1]);
	data[1].map(item => {
		$('<li>' + item + '</li>').appendTo($results);
	})
}, error => {
	$results.empty();
    $('<li>Error:' + error + '</li>').appendTo($results);
}, complete => console.log('completed'))

