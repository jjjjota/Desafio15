// Variables datos
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



// Variables para API Maps
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

// var proxy = 'https://crossorigin.me/';

// var urlMaps = 'https://api.darksky.net/forecast/',
//     keyMaps = 'e193913a8a2bab291b8999fae03fc8b7/',
//     queryParamsMaps = ['exclude=[minutely,flags]', 'lang=es', 'units=auto'];


// Varibales para API Dark Sky
var urlSky = 'https://api.darksky.net/forecast/',
    keySky = 'cb080bb90bde9e641e6c42cf6f26913e/',
    queryParamsSky = ['exclude=[minutely,hourly,daily,alerts,flags]', 'lang=es', 'units=auto'];


// EVENTO change en #select
$('#select').on('change', function() {
  // Inicializar el mapa
	map.setCenter(coords[$(this).val()]);
	marker.setMap(null);
	marker = new google.maps.Marker({
		position: (coords[$(this).val()]),
		map: map
	});

  // REQUEST a API Maps
	// $.ajax({
	// 	url: proxy + urlMaps + keyMaps + coords[$(this).val()].lat + ',' + coords[$(this).val()].lng + '?' + queryParamsMaps[0] + '&' + queryParamsMaps[1] + '&' + queryParamsMaps[2],
	// 	method: 'GET',
	// 	xhrFields: {cors: false}
  // }).then(function() {
	// });

  // REQUEST a API Dark Sky
  $.ajax({
    url: urlSky + keySky + coords[$(this).val()].lat + ',' + coords[$(this).val()].lng + '?' + queryParamsSky[0] + '&' + queryParamsSky[1] + '&' + queryParamsSky[2],
    method: 'GET',

    dataType: "jsonp",
    headers: {
      "accept": "application/json",
      "Access-Control-Allow-Origin": "*"
    }
  }).then(function(data) {
    $('#resumen').text(parseInt(data.currently.temperature) + '° ' + data.currently.summary);
    $('.img-responsive').attr('src',image[data.currently.icon]);
  });

});
