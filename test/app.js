var coords = {
 	isla: {
 		lat: -27.112723,
 		lng: -109.34968650000002
 	},
 	arica: {
 		lat: -18.4782534,
 		lng: -70.31259879999999
 	},
 	santiago: {
 		lat: -33.4488897,
 		lng: -70.6692655
 	}
 };

var image = {
    'clear-day':'https://icons.wxug.com/i/c/v4/clear.svg',
    'clear-night':'https://icons.wxug.com/i/c/v4/nt_clear.svg',
    'partly-cloudy-day':'https://icons.wxug.com/i/c/v4/partlycloudy.svg',
    'partly-cloudy-night':'https://icons.wxug.com/i/c/v4/nt_hazy.svg',
    'cloudy':'https://icons.wxug.com/i/c/v4/cloudy.svg',
    'rain':'https://icons.wxug.com/i/c/v4/rain.svg'
  }

var map = null;
var marker = null;

function initMap() {
	var location = null;
	map = new google.maps.Map(document.getElementById('map'), {
		zoom: 11,
		center: location
	});

	marker = new google.maps.Marker({
		position: location,
		map: map
	});
}

var proxy = 'https://crossorigin.me/'
var url = 'https://api.darksky.net/forecast/';
var apiKey = 'e193913a8a2bab291b8999fae03fc8b7';
var queryParams = ['exclude=[minutely,flags]', 'lang=es', 'units=auto'];

$('#select').on('change', function() {
	map.setCenter(coords[$(this).val()]);
	marker.setMap(null);
	marker = new google.maps.Marker({
		position: (coords[$(this).val()]),
		map: map
	});

	$.ajax({
		url: proxy + url + apiKey + '/' + coords[$(this).val()].lat + ',' + coords[$(this).val()].lng + '?' + queryParams[0] + '&' + queryParams[1] + '&' + queryParams[2],
		method: 'GET',
		xhrFields: {cors: false}
	}).then(function(data) {
		console.log(data);
		$('#resumen').text(parseInt(data.currently.temperature) + '° ' + data.currently.summary);
		$('.img-responsive').attr('src',image[data.currently.icon]);
	});

});

