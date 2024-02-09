# scrap_leaflet

## references: post by Tony Hirst

https://blog.ouseful.info/2022/05/03/extracting-geojson-data-from-leaflet-maps-with-shot-scraper/

The [`shot-scraper`](https://github.com/simonw/shot-scraper) package is a crazy piece of command-line magic from Simon Willison that, among other things, lets you grab a web page, and all its attendant Javascript state, into a headless browser, inject a bit of scraper JavaScript into it, and return the result.

For some time, I’ve been wondering how to grab rally route data from the rather wonderful [Rally Maps](https://www.rally-maps.com/) website (the last time I looked, the route info seemed to be baked into the page rather than being pulled in as data from its own easy to grab URI). One approach I looked at was a related technique described in [Grabbing Javascript Objects Out of Web Pages And Into Python](https://blog.ouseful.info/2020/02/02/grabbing-javascript-objects-out-of-web-pages-and-into-python/) but IIRC, I’d got a little stuck in getting a clean set of route features out.

Anyway, when reading about Web Scraping via Javascript Runtime Heap Snapshots (again via @simonw), it struck me again that the route info must be in the leaflet map somewhere, so could we get it out? Thinking to search this time for `how to export route leaflet` I found a simple trick in a Stack Overflow question [here](https://stackoverflow.com/questions/35125036/export-leaflet-map-to-geojson) that gives the following recipe (I think) for grabbing the route info from a leafelt map (assuming the map object is in the variable map):
```
shot-scraper javascript https://www.rally-maps.com/Rallye-Festival-Hoznayo-2022 "var collection = {'type':'FeatureCollection','features':[]}; map.eachLayer(function (layer) {if (typeof(layer.toGeoJSON) === 'function') collection.features.push(layer.toGeoJSON())}); collection" > scraped-routes.geojson
```

Having a quick peek in geojson viewer, and it seems to work (I just need to scrape some of the other data too, such as marker labels etc.)

## scripts

```bash
shot-scraper javascript https://leafletjs.com/ -i script0.js > res0.geojson

# creates geojson with:
{
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "properties": {},
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -0.159,
                    51.504
                ]
            }
        }
    ]
}
```

## questions

why not working?
- try to make a screenshot -> maybe need cookies acceptance

why does `map` not appear in the list of vars? 
- https://stackoverflow.com/questions/2934787/view-list-of-all-javascript-variables-in-google-chrome-console

```
for (let variable in window) {
    if (window.hasOwnProperty(variable)) {
        // Check if the variable is not null or undefined
        if (window[variable] !== null && window[variable] !== undefined) {
            // Check if the variable has a getCenter() method
            if (typeof window[variable].getCenter === 'function') {
                console.log(variable + ' has a getCenter() method');
            } else {
                console.log('no');
            }
        } else {
            console.log('problem');
        }
    }
}
```

