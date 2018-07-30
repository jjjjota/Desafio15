// Variables de selectores
var select = $("#select"),
    resumen = $("#resumen"),
    imagen = $(".img-responsive");

// Variables con datos
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
var map = null,
    marker = null;

// Varibales para API Dark Sky
var url = 'https://api.darksky.net/forecast/',
    key = 'cb080bb90bde9e641e6c42cf6f26913e/',
    queryParams = ['exclude=[minutely,hourly,daily,alerts,flags]', 'lang=es', 'units=auto'];
    // var proxy = 'https://crossorigin.me/';

// Inicializar el mapa
function initMap() {
	var location = null;

  // Crear objeto Map
	map = new google.maps.Map(document.getElementById('map'), {
		zoom: 11,
		center: location
	});

  // Crear objeto Marker
	marker = new google.maps.Marker({
		position: location,
		map: map
	});
}

// EVENTO change en #select
select.on('change', function() {
  // Setear el mapa con datos del #select
	map.setCenter(coords[$(this).val()]);
	marker.setMap(null);
	marker = new google.maps.Marker({
		position: (coords[$(this).val()]),
		map: map
	});


  // REQUEST a API Dark Sky
  $.ajax({
    url: url + key + coords[$(this).val()].lat + ',' + coords[$(this).val()].lng + '?' + queryParams[0] + '&' + queryParams[1] + '&' + queryParams[2],
    method: 'GET',
    dataType:'jsonp'
  }).then(function(data) {
    resumen.text(parseInt(data.currently.temperature) + '° ' + data.currently.summary);
    imagen.attr('src',image[data.currently.icon]);
  });

});
