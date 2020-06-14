let map;
var markers = [];
var infoWindow;
var losAngeles;
var from = document.querySelector('.inputValueFrom').value;
var to = document.querySelector('.inputValueTo').value;




function initMap() {


    losAngeles = {
        lat: 34.052235, 
        lng: -118.243683
    };

    map = new google.maps.Map(document.getElementById('map'), {
        center: losAngeles,
        zoom: 6,
        styles: []
    });
    




    //document.querySelector('#btn').addEventListener('click', onClickHandler);

  
    infoWindow = new google.maps.InfoWindow();  


    searchAirports();
}

function createMarker(latlng, code, name, city, country) {
    var html = `
        <div class="infoWindow">
            <h4>${code}</h4>
            <h5>${name}</h5>
            <hr>
            <a href="https://www.google.com/maps/dir/?api=1&origin=${from}&destination=${city}" target="_blank">${city}</a>
            <br/>
            ${country}
        </div>
    `;


    var marker = new google.maps.Marker({
      map: map,
      position: latlng,
      title: name,
    });
    google.maps.event.addListener(marker, 'click', function() {
      infoWindow.setContent(html);
      infoWindow.open(map, marker);
    });
    markers.push(marker);
}


function showStoresMarkers(airports) {
    var bounds = new google.maps.LatLngBounds();
    airports.forEach(function(airport, index){
        var latlng = new google.maps.LatLng(
            airport.lat,
            airport.lon);
        var code = airport.code;
        var name = airport.name;
        var city = airport.city;
        var country = airport.country;
        bounds.extend(latlng);

        createMarker(latlng, code, name, city, country);
    })
    
}


function displayStores(airportsList) {
    var airportsHtml = "";
    airportsList.forEach(function(airport, index){
        var name = airport.name;
        var code = airport.code;
        var city = airport.city;
        var flights = airport.direct_flights;
        var country = airport.country;
        airportsHtml += `
            <div class="store-container">
                <div class="store-info-container">
                    <span class="info-name">${name}</span><br>
                    <span>${city}</span><br>
                    <span>${country}</span><br>
                    <span>Direct flights: ${flights}</span><br>
                </div>
                <div class="store-number-container">
                    <div class="store-number">
                        ${code}
                    </div>
                </div>
            </div>
            <hr>
        `
    });
    document.querySelector('.stores-list').innerHTML = airportsHtml;
}


function setOnClickListener() {

    var airportsElements = document.querySelectorAll('.store-container');
    airportsElements.forEach(function(element, index) {
        element.addEventListener('click', function() {
            google.maps.event.trigger(markers[index], 'click');
            document.querySelector('.inputValueTo').textContent  = airportsElements.value
        })
    })
}

function gotoMaps() {
    var start = document.querySelector(".inputValueFrom").value;
    var end = document.querySelector(".inputValueTo").value;
    window.open(`https://www.google.com/maps/dir/?api=1&origin=${start}&destination=${end}`, '_blank');
}


function enableDarkMode() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: losAngeles,
        zoom: 6,
        styles: [
            {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
            {
            featureType: 'administrative.locality',
            elementType: 'labels.text.fill',
            stylers: [{color: '#d59563'}]
            },
            {
            featureType: 'poi',
            elementType: 'labels.text.fill',
            stylers: [{color: '#d59563'}]
            },
            {
            featureType: 'poi.park',
            elementType: 'geometry',
            stylers: [{color: '#263c3f'}]
            },
            {
            featureType: 'poi.park',
            elementType: 'labels.text.fill',
            stylers: [{color: '#6b9a76'}]
            },
            {
            featureType: 'road',
            elementType: 'geometry',
            stylers: [{color: '#38414e'}]
            },
            {
            featureType: 'road',
            elementType: 'geometry.stroke',
            stylers: [{color: '#212a37'}]
            },
            {
            featureType: 'road',
            elementType: 'labels.text.fill',
            stylers: [{color: '#9ca5b3'}]
            },
            {
            featureType: 'road.highway',
            elementType: 'geometry',
            stylers: [{color: '#746855'}]
            },
            {
            featureType: 'road.highway',
            elementType: 'geometry.stroke',
            stylers: [{color: '#1f2835'}]
            },
            {
            featureType: 'road.highway',
            elementType: 'labels.text.fill',
            stylers: [{color: '#f3d19c'}]
            },
            {
            featureType: 'transit',
            elementType: 'geometry',
            stylers: [{color: '#2f3948'}]
            },
            {
            featureType: 'transit.station',
            elementType: 'labels.text.fill',
            stylers: [{color: '#d59563'}]
            },
            {
            featureType: 'water',
            elementType: 'geometry',
            stylers: [{color: '#17263c'}]
            },
            {
            featureType: 'water',
            elementType: 'labels.text.fill',
            stylers: [{color: '#515c6d'}]
            },
            {
            featureType: 'water',
            elementType: 'labels.text.stroke',
            stylers: [{color: '#17263c'}]
            }
        ]
    });
    searchAirports();
}

function enableNormalMode() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: losAngeles,
        zoom: 12,
        styles: []
    });
    searchAirports();
}



function searchAirports() {
    foundAirports = []
    input = document.querySelector(".inputValueTo").value;
    if (input) {
        airports.forEach(function(airport){
            var a_city = airport.city;
            var a_country = airport.country;
            if (input == a_city || input == a_country) {
                foundAirports.push(airport)
            }
        });
    } else {
        foundAirports = airports;
    }
    
    clearAllLocations();
    displayStores(foundAirports);
    showStoresMarkers(foundAirports);
    setOnClickListener();
}


function clearAllLocations() {
    infoWindow.close();
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null)
    }
    markers.length = 0;
}

function displayInfo() {
    alert("You are currently using Trip Advisor, an app to help People having a nice vacation without any rain." +
    "Simply type in your starting location and the airport you want to go to. Clicking on the arrrow will give the way to the airport." +
    "If you click on the search icon, the matching airports will be displayed on the map." +
    "Valid search inputs for destination: Country, City (e.g.: New York, HongKong ... ");
}