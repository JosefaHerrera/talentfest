//sidenav
function openNav() {
    document.getElementById("menu").style.width = "250px";
}

function closeNav() {
    document.getElementById("menu").style.width = "0";
}


//mapa
/*
function myMap() {
	var pointAtMap  = new google.maps.LatLng(-33.4316203,-70.6562541);
	var mapProp= {
	    center:new google.maps.LatLng(-33.4316203,-70.6562541),
	    zoom:15,
	};
	var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);


	var marker = new google.maps.Marker({
		position: pointAtMap,
		map: map,
		title: 'foobar'
	});

}
*/