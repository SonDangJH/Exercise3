
const findGeometryOfSelectedAddress = async(mapbox_id, access_token) =>{
    try {
        const promise = await fetch("https://api.mapbox.com/search/searchbox/v1/retrieve/"+ mapbox_id +"?session_token=[GENERATED-UUID]&access_token=" + access_token);
        const data = await promise.json();
        const map = new mapboxgl.Map({
            container: 'map',
            // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [-79.4512, 43.6568],
            zoom: 13
        });
        map.flyTo({
            center: data['features'][0]['geometry']['coordinates'],
            essential: true // this animation is considered essential with respect to prefers-reduced-motion
        });
        document.querySelector('.search-container').innerHTML = "";
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
function runProgram() {
    mapboxgl.accessToken = 'pk.eyJ1Ijoic29uZGFuZ2poMjAwMyIsImEiOiJjbHprd3JmMzYwcmZ4MmxxMDNnNHdjMm5yIn0.9MP6aJ0OF8TB1FDxeJwiSw';
    new mapboxgl.Map({
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
            const promise = await fetch("https://api.mapbox.com/search/searchbox/v1/suggest?q="+queries+"&language=en&session_token=[GENERATED-UUID]&country=US&access_token=" + mapboxgl.accessToken);
            const data = await promise.json();
            data.suggestions.forEach(element => {
                if (element['full_address']) {
                    document.querySelector('.search-container').innerHTML += `<span onclick="findGeometryOfSelectedAddress('${element['mapbox_id']}','${mapboxgl.accessToken}')">${element['name']+ ", "+element['place_formatted']}</span>`;
                }
            });
        }
    })

}

runProgram();