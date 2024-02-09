//new Promise(done => {
//    setInterval(() => {
        var collection = {'type':'FeatureCollection','features':[]};

        map.eachLayer(
            function (layer) {
                if (typeof(layer.toGeoJSON) === 'function')
                    collection.features.push(layer.toGeoJSON());
            }
        );

        collection
//        done(collection);
//    },
//    2000);
//});
