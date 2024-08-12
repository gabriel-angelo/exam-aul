const sio = io('/')


var map = L.map('ngmap-id',{zoomControl : false}).setView([-3.0308121226643703,23.642578125000004], 5);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '&copy; <a href="#!">Larah Entreprise</a>'
}).addTo(map);

var marker = L.marker([-4.302120338599318,15.307388305664064]).addTo(map)

marker.bindPopup("<b>nMap surfer</b><br>QG NGENGESPORT KIN-DRC.").openPopup();

function makeMakerPopup(user){
    var popup = L.popup()
    .setLatLng([user.latitude,user.longitude])
    .setContent(`Agence ${user.agenceZone} : ${user.fullname}, <${user.mail}>`)
    .openOn(map);
}

function onClickMarker(e) {
    console.log("You clicked the map at " + e.latlng, e.latlng.lat, e.latlng.lng);
    sio.emit("click-to-map", e.latlng)

    map.locate({ setView: true, maxZoom: 16 });

    // Écoutez l'événement "locationfound" pour obtenir les données de localisation
    map.on('locationfound', function (e) {
        var latitude = (e.latlng.lat).toFixed(10)
        var longitude = (e.latlng.lng).toFixed(10);
        console.log('DETECTION Latitude : ' + latitude + ', Longitude : ' + longitude);
        var marker = L.marker([latitude,longitude]).addTo(map)
    });
}

map.on('click', onClickMarker);

sio.on('ngmap-user-position-get', ({latitude,longitude}) => {
    console.log("RESULTAT :", latitude, longitude)
    var marker = L.marker([latitude,longitude]).addTo(map)
});

// Demande de géolocalisation
map.locate({ setView: true, maxZoom: 16 });

// Écouteur d'événement pour la géolocalisation
map.on('locationfound', (e) => {
  const { lat, lng } = e.latlng; // Coordonnées de l'utilisateur
  console.log('Position de l\'utilisateur :', lat, lng);

    let marker = L.marker([lat,lng]).addTo(map)
  // Vous pouvez ajouter d'autres actions ici (par exemple, afficher un marqueur sur la carte)
});


map.on('locationerror', (e) => {
  console.error("Erreur de géolocalisation TEST D'ELEMENT:", e.message);
});
