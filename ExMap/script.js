mapboxgl.accessToken = 'pk.eyJ1Ijoic29uZGFuZ2poMjAwMyIsImEiOiJjbHprd3JmMzYwcmZ4MmxxMDNnNHdjMm5yIn0.9MP6aJ0OF8TB1FDxeJwiSw';
    const map = new mapboxgl.Map({
        container: 'map',
        // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [-79.4512, 43.6568],
        zoom: 13
    });

document.getElementById('search-box').addEventListener('keyup',async (event)=>{
    const queries = document.getElementById("search-box").value;
    if (queries !== "")
    {
        document.querySelector('.search-container').innerHTML = "";
        const promise = await fetch("https://api.mapbox.com/search/searchbox/v1/suggest?q="+queries+"&language=en&session_token=[GENERATED-UUID]&country=US&access_token=pk.eyJ1Ijoic29uZGFuZ2poMjAwMyIsImEiOiJjbHprd3JmMzYwcmZ4MmxxMDNnNHdjMm5yIn0.9MP6aJ0OF8TB1FDxeJwiSw");
        const data = await promise.json();
        data.suggestions.forEach(element => {
            if (element['full_address']) {
                document.querySelector('.search-container').innerHTML += `<span onclick="findGeometryOfSelectedAddress('${element['mapbox_id']}')">${element['name']+ ", "+element['place_formatted']}</span>`;
            }
        });
    }
})

const findGeometryOfSelectedAddress = async (mapbox_id) => {
    try {
        const promise = await fetch("https://api.mapbox.com/search/searchbox/v1/retrieve/"+ mapbox_id +"?session_token=[GENERATED-UUID]&access_token=pk.eyJ1Ijoic29uZGFuZ2poMjAwMyIsImEiOiJjbHprd3JmMzYwcmZ4MmxxMDNnNHdjMm5yIn0.9MP6aJ0OF8TB1FDxeJwiSw");
        const data = await promise.json();
        console.log(data['features'][0]['geometry']['coordinates']);
        map.flyTo({
            center: data['features'][0]['geometry']['coordinates'],
            essential: true // this animation is considered essential with respect to prefers-reduced-motion
        });
        document.querySelector('.search-container').innerHTML = "";
        const marker1 = new mapboxgl.Marker()
        .setLngLat(data['features'][0]['geometry']['coordinates'])
        .addTo(map);

        const popup = new mapboxgl.Popup({ offset: 25 }).setText(
            data['features'][0]['properties']['full_address']
        );

        // create DOM element for the marker
        const el = document.createElement('div');
        el.id = 'marker';

        // create the marker
        new mapboxgl.Marker(el)
            .setLngLat(data['features'][0]['geometry']['coordinates'])
            .setPopup(popup) // sets a popup on this marker
            .addTo(map);
    } catch (error) {
        console.log(error);
    }
}

    // // Add the control to the map.
    // const geocoder = new MapboxGeocoder({
    //     accessToken: mapboxgl.accessToken,
    //     mapboxgl: mapboxgl
    // });

    // document.getElementById('geocoder').appendChild(geocoder.onAdd(map));

    // const popup = new mapboxgl.Popup({ offset: 25 }).setText(
    //     'Construction on the Washington Monument began in 1848.'
    // );
    // geocoder

    // // create DOM element for the marker
    // const el = document.createElement('div');
    // el.id = 'marker';

    // // create the marker
    // new mapboxgl.Marker(el)
    //     .setLngLat(monument)
    //     .setPopup(popup) // sets a popup on this marker
    //     .addTo(map);