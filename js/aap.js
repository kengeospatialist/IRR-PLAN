//Alert user to Prevent unsaved data before exiting
//window.onbeforeunload = confirmExit;

function confirmExit() {
    return "Please ensure that you have downloaded your data and saved any changes, otherwise your edits will be lost. Are you sure you want to close this application?";
}

//check if os
function getOS() {
    var userAgent = window.navigator.userAgent,
        platform = window.navigator.platform,
        macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
        windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
        iosPlatforms = ['iPhone', 'iPad', 'iPod'],
        os = null;

    if (macosPlatforms.indexOf(platform) !== -1) {
        os = 'Mac OS';
    } else if (iosPlatforms.indexOf(platform) !== -1) {
        os = 'iOS';
    } else if (windowsPlatforms.indexOf(platform) !== -1) {
        os = 'Windows';
    } else if (/Android/.test(userAgent)) {
        os = 'Android';
    } else if (!os && /Linux/.test(platform)) {
        os = 'Linux';
    }
    return os;
}


//SAVING LOADING MODAL
var saveLoadingModal = document.getElementById("saveLoadingModal");
var saveLoadingDropbox = document.getElementById("saveLoadingDropbox");
var saveLoadingDropboxMsg = document.getElementById("saveLoadingDropboxMsg");

function showLoadingDropbox(state) {
    if (state == "show") {
        saveLoadingModal.style.display = "block";
    } else {
        saveLoadingModal.style.display = "none";
    }
}

function showLoadingDropboxSpinner(state) {
    if (state == "show") {
        saveLoadingDropbox.style.display = "block";
        saveLoadingDropboxMsg.style.display = "none";
    } else {
        saveLoadingDropbox.style.display = "none";
        saveLoadingDropboxMsg.style.display = "block";
    }
}

//SETTINGS
var mobileMode = false;
var lineLabelColor = "#fdffff";
var poinLabelColor = '#fdffff';
var areaLabelColor = '#fdffff';

//BASE LAYERS
var activeBaseLayer;
var emptyBaseMap = L.tileLayer('',{
    minZoom: 1,
    maxZoom: 28,
});

var CustomImagery = L.tileLayer('https://api.mapbox.com/styles/v1/irriplans/cl71zjinc002i14qlz17ga7ww/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiaXJyaXBsYW5zIiwiYSI6ImNrbDJ1cmZsbDAyOGQyd3A2bmJmdmk5bWYifQ.iSDMtmWIDPCIs_VOTsQNrA',{
    minZoom: 1,
    maxZoom: 28,
});

var layer_OpenStreetMap_0 = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    opacity: 1.0,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    minZoom: 1,
    maxZoom: 28,
    minNativeZoom: 0,
    maxNativeZoom: 19,
    //crossOrigin: "anonymous",
    noWrap: true,
});

var OpenStreetMap_France = L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
    maxZoom: 20,
    minZoom: 1,
    minNativeZoom: 0,
    maxNativeZoom: 24,
    //crossOrigin: "anonymous",
    noWrap: true,
    attribution: '&copy; OpenStreetMap France | &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

var OpenStreetMap_HOT = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
    maxZoom: 19,
    minZoom: 1,
    minNativeZoom: 0,
    maxNativeZoom: 24,
    //crossOrigin: "anonymous",
    noWrap: true,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">Humanitarian OpenStreetMap Team</a> hosted by <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap France</a>'
});

var OpenTopoMap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    maxZoom: 17,
    minZoom: 1,
    minNativeZoom: 24,
    maxNativeZoom: 19,
    //crossOrigin: "anonymous",
    noWrap: true,
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
});

var apiKey = 'AAPKb95b9b22694e46889217b715f22d3cfa8uHoTQ_31shTI-8CHlPVDysfTrz6eW05ThQVoi2v4UQWOpMPkcJ_qCAvHvsfHy5t';
var credits = 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012 etc. etc. etc.';
// not addTO(map)
// Replace with your API key - https://developers.arcgis.com
var esriTopo = L.esri.Vector.vectorBasemapLayer('ArcGIS:Topographic', { apikey: apiKey, minZoom: 1, maxZoom: 22, attribution: credits });
var esriStreets = L.esri.Vector.vectorBasemapLayer("ArcGIS:Streets", { apiKey: apiKey, minZoom: 1, maxZoom: 22, attribution: credits });
var esriNavigation = L.esri.Vector.vectorBasemapLayer("ArcGIS:Navigation", { apiKey: apiKey, minZoom: 1, maxZoom: 22, attribution: credits });
var esriLightGray = L.esri.Vector.vectorBasemapLayer("ArcGIS:LightGray", { apiKey: apiKey, minZoom: 1, maxZoom: 22, attribution: credits });
var esriDarkGray = L.esri.Vector.vectorBasemapLayer("ArcGIS:DarkGray", { apiKey: apiKey, minZoom: 1, maxZoom: 22, attribution: credits });
var esriStreetsRelief = L.esri.Vector.vectorBasemapLayer("ArcGIS:StreetsRelief", { apiKey: apiKey, minZoom: 1, maxZoom: 22, attribution: credits });
var esriImagery = L.esri.Vector.vectorBasemapLayer("ArcGIS:Imagery", { apiKey: apiKey, minZoom: 1, maxZoom: 22, attribution: credits });
var esriChartedTerritory = L.esri.Vector.vectorBasemapLayer("ArcGIS:ChartedTerritory", { apiKey: apiKey, minZoom: 1, maxZoom: 22, attribution: credits });
var esriColoredPencil = L.esri.Vector.vectorBasemapLayer("ArcGIS:ColoredPencil", { apiKey: apiKey, minZoom: 1, maxZoom: 22, attribution: credits });
var esriNova = L.esri.Vector.vectorBasemapLayer("ArcGIS:Nova", { apiKey: apiKey, minZoom: 1, maxZoom: 22, attribution: credits });
var esriMidcentury = L.esri.Vector.vectorBasemapLayer("ArcGIS:Midcentury", { apiKey: apiKey, minZoom: 1, maxZoom: 22, attribution: credits });

var esriTopo = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 24,
    attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
});
var esriStreets = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
        maxZoom: 24,
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012'
    });
var esriImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 24,
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});

var thunderApi = '88890c0428ce4922826f50d2783c4ebc';
var Thunderforest_MobileAtlas = L.tileLayer('https://tile.thunderforest.com/mobile-atlas/{z}/{x}/{y}.png?apikey=' + thunderApi, {
    attribution: '&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    //apikey: 'd07fb9f393a14458874afbf0f62d4b26', change api key to match yours
    maxZoom: 22,
    minZoom: 1,
    minNativeZoom: 0,
    maxNativeZoom: 22,
    noWrap: true,
});

var Thunderforest_OpenCycleMap = L.tileLayer('https://{s}.tile.thunderforest.com/cycle/{z}/{x}/{y}.png?apikey=' + thunderApi, {
    attribution: '&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    apikey: thunderApi,
    maxZoom: 22,
    minZoom: 1,
    minNativeZoom: 0,
    maxNativeZoom: 22,
    noWrap: true,
});

var Thunderforest_Transport = L.tileLayer('https://{s}.tile.thunderforest.com/transport/{z}/{x}/{y}.png?apikey=' + thunderApi, {
    attribution: '&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    apikey: thunderApi,
    maxZoom: 22,
    minZoom: 1,
    minNativeZoom: 0,
    maxNativeZoom: 22,
    noWrap: true,
});

var Thunderforest_TransportDark = L.tileLayer('https://{s}.tile.thunderforest.com/transport-dark/{z}/{x}/{y}.png?apikey=' + thunderApi, {
    attribution: '&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    apikey: thunderApi,
    maxZoom: 22,
    minZoom: 1,
    minNativeZoom: 0,
    maxNativeZoom: 22,
    noWrap: true,
});

var mapBoxSatellite = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiaXJyaXBsYW5zIiwiYSI6ImNrbDJ1cmZsbDAyOGQyd3A2bmJmdmk5bWYifQ.iSDMtmWIDPCIs_VOTsQNrA', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, '
        + '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
        + '<br>Imagery © <a href="https://mapbox.com">Mapbox</a>',
    id: 'pjhooker.lad5pfap',
    maxZoom: 22,
    minZoom: 1,
    minNativeZoom: 0,
    maxNativeZoom: 22,
    noWrap: true,
});


//MAP
var map = L.map('map', {
    zoomControl: false,
    closePopupOnClick: false,
    maxZoom: 28,
    minZoom: 1,
    layers: [mapBoxSatellite],//mapBoxSatellite
    rotate: true,
    worldCopyJump: false,
    tap: false,
    maxBounds: [[-90, -180], [90, 180]],
    //zoomDelta: 0.25,
    zoomSnap: 0.25
}).setView([37.09024, -95.712891], 3);
//set default active basemap
activeBaseLayer = mapBoxSatellite;//

map.on('baselayerchange', function (e) {
    activeBaseLayer = e.layer;
    //Hack to have baselayer empty
    if(activeBaseLayer == emptyBaseMap ){
        map.removeLayer(emptyBaseMap);
    }
});

map.on('zoomend', e => {
    //openClosePopups("close");
    //openClosePopups("open");
});

var hash = new L.Hash(map);

map.attributionControl.setPrefix('<a href="https://leafletjs.com" title="A JS library for interactive maps">Leaflet</a>');
var autolinker = new Autolinker({
    truncate: {
        length: 30,
        location: 'smart'
    }
});

//COMPASS
/*var compass = new L.Control.Compass({
    autoActive: false,
    position: "bottomleft",
});
map.addControl(compass);
compass.setAngle(0);

//GEOCODER
var osmGeocoder = new L.Control.Geocoder({
    position: 'topleft',
    expand: 'click',
    defaultMarkGeocode: false
}).on('markgeocode', function (e) {
    map.setView(e.geocode.center, 20
    );
}).addTo(map);

document.getElementsByClassName('leaflet-control-geocoder-icon')[0]
    .className += ' fa fa-search';

document.getElementsByClassName('leaflet-control-geocoder-icon')[0]
    .title += 'Search for a place';*/

//Esri Search

var searchControl = L.esri.Geocoding.geosearch({
    position: 'topleft',
    placeholder: 'Enter an address or place e.g. 1 York St',
    useMapBounds: false,
    providers: [L.esri.Geocoding.arcgisOnlineProvider({
      apikey: 'AAPK4e7f026a0d874502b96cb848c7bf7dd6Fp-zf5Tv-tEiOH3QD0CJIUqFh6SiDl2ivqdgmyUggrZPmlh7OU8cJ7tr82pW3qCA', // replace with your api key - https://developers.arcgis.com
      nearby: {
        lat: -33.8688,
        lng: 151.2093
      }
    })]
  }).addTo(map);

  var results = L.layerGroup().addTo(map);

  searchControl.on('results', function (data) {
    results.clearLayers();
    for (var i = data.results.length - 1; i >= 0; i--) {
      results.addLayer(L.marker(data.results[i].latlng));
    }
  });

//LEAFLET LAYER CONTROL
var baseMaps = {
    "Imagery": esriImagery,
    "Topographic": esriTopo,
    "Streets": esriStreets,
    "Streets Relief": esriStreetsRelief,
    "Navigation": esriNavigation,
    "Light Gray": esriLightGray,
    "Charted Territory": esriChartedTerritory,
    "Colored Pencil": esriColoredPencil,
    "Nova": esriNova,
    "Mid Century": esriMidcentury,
    "OpenStreetMap": layer_OpenStreetMap_0,
    "Mobile Atlas": Thunderforest_MobileAtlas,
    "Mapbox Satellite": mapBoxSatellite,
    "No Basemap": emptyBaseMap,
};

var apiEsriMap = {
    "Imagery": esriImagery,
    "Topographic": esriTopo,
    "Streets": esriStreets,
    "Streets Relief": esriStreetsRelief,
    "Navigation": esriNavigation,
    "Light Gray": esriLightGray,
    "Charted Territory": esriChartedTerritory,
    "Colored Pencil": esriColoredPencil,
    "Nova": esriNova,
    "Mid Century": esriMidcentury,
}

var esriOpenSource = {
    "Imagery": esriImagery,
    /*"Topographic": esriTopo,
    "Streets": esriStreets,*/
}

function esriBaseMaps(freeOrPaid){
    if(freeOrPaid == 'paid'){
        return apiEsriMap;
    }
    else{
        return esriOpenSource;
    }
}

var baseMaps = [
    {
        groupName: "ESRI Base",
        layers: esriBaseMaps('free')
    },
    {
        groupName: "OSM Base Maps",
        layers: {
            "Open Street Maps": layer_OpenStreetMap_0,
            /*"OSM France": OpenStreetMap_France,
            "OSM HOT": OpenStreetMap_HOT,
            "Open Topo": OpenTopoMap,*/
        }
    },
    {
        groupName: "Thunder Forest",
        layers: {
            "Mobile Atlas": Thunderforest_MobileAtlas,
            "Open Cycle Map": Thunderforest_OpenCycleMap,
            "Transport": Thunderforest_Transport,
            "Transport Dark": Thunderforest_TransportDark,
        }
    },
    {
        groupName: "Map Box",
        layers: {
            "Satellite": mapBoxSatellite,
        }
    },
    {
        groupName: "User",
        layers: {
            "No Basemap": emptyBaseMap,
            "Custom Imagery": CustomImagery
        }
    }
];

var overlayLayer = {};

var overlays = [
    {
        groupName: "Data",
        layers: {
        }
    }
]
//var layerControl = L.control.layers(baseMaps, overlayLayer, { position: 'topright' });
//layerControl.addTo(map);

var options = {
    container_width: "300px",
    container_maxHeight: "350px",
    group_maxHeight: "200px",
    exclusive: false
};

var control = L.Control.styledLayerControl(baseMaps, overlays, options);
map.addControl(control);


L.control.zoom({
    position: 'topleft',
}).addTo(map);


//side bar
var sidebar = undefined;
$("#sidebar").load("html/sidebar.html", ()=>{
    sidebar = L.control.sidebar({
        autopan: true,       // whether to maintain the centered map point when opening the sidebar
        closeButton: true,    // whether t add a close button to the panes
        container: 'sidebar', // the DOM container or #ID of a predefined sidebar container that should be used
        position: 'left',     // left or right
    }).addTo(map);

    var baseMapsDiv = $("#basemaps");
    var collapseID = 0;
    for (const baseGroup of baseMaps) {
        collapseID++;
        var baseDivGroup = $("<div>", {"class":"my-2 shadow"});
        //TITLE
        var divTitle = $("<div>", { "class":" p-1 d-flex bg-light justify-content-between align-items-center"});
        var groupTitle = $("<h5>", {"class":"tex-upper"}).html(baseGroup.groupName);
        var groupToggler = $("<div>");
        var groupTogglerBtn = $("<button>", 
            { "class": "btn btn-primary btn-sm",
                "type":"button",
                "data-bs-toggle":"collapse",
                "data-bs-target":"#baseDivGroup"+collapseID,
                "aria-expanded":"false",
                "aria-controls": "baseDivGroup" + collapseID
            }).append($("<i>", { "class": "fa fa-caret-down "}));
        groupToggler.append(groupTogglerBtn);
        divTitle.append(groupTitle).append(groupToggler);
        baseDivGroup.append(divTitle);
        
        //CONTENT
        var groupContent = $("<div>", { "class":"p-1 collapse","id":"baseDivGroup" + collapseID})
        var groupBaseLayers = baseGroup.layers;
        for(const indivindualBaseLayer in groupBaseLayers){
            var groupContentItem = $("<div>", {"class":"py-2 d-flex justify-content-between"});
            var groupContentItemTitle = $("<h6>", { "class": "" }).text(indivindualBaseLayer);
            var groupContentItemSwitch = $("<div>", { "class":"form-check form-switch"});
            var groupContentItemSwitchItem = $("<input>", { "class": "form-check-input bLSwitch", "data-onstyle": "success", "type": "checkbox", "role": "switch", "layer": indivindualBaseLayer });
            groupContentItemSwitchItem.on("change", (e)=>{
                var state = e.target.checked;
                $(e.target).attr("checked", "");
                var bML = $(e.target).attr("layer");
                
                var mlayer = null;
                for (const bG of baseMaps) {
                    for (const bGL in bG.layers) {
                        if(map.hasLayer(bG.layers[bGL])){
                            map.removeLayer(bG.layers[bGL]);
                        }
                        if (bG.layers.hasOwnProperty(bML)){
                            mlayer = bG.layers[bGL];
                        }
                    }
                }
                if (state) {
                    map.addLayer(mlayer);
                }
                else{
                    map.removeLayer(mlayer);
                }
                
                $(".bLSwitch").each((i, obj) => {
                    if ($(obj).attr("layer") !== bML){
                        obj.checked = false;
                    }
                });

            });
            groupContentItemSwitch.append(groupContentItemSwitchItem);
            groupContentItem.append(groupContentItemTitle).append(groupContentItemSwitch);
            groupContent.append(groupContentItem);
        }
        baseDivGroup.append(groupContent);
        baseMapsDiv.append(baseDivGroup);
    }
});

//GEOJSON LAYERS
map.on("layeradd", ()=>{
    for (const key in map._layers) {
        //console.log(map._layers[key]);
        var layer = map._layers[key];
        if (layer.options.type == "geojson layer") {
            //setupSidebarGeojsonLayers(layer)
        }
    }
});

$(document).ready(()=>{
    for (const key in map._layers) {
        //console.log(map._layers[key]);
        var layer = map._layers[key];
        if (layer.options.type == "geojson layer") {
            setupSidebarGeojsonLayers(layer);
        }
    }
});

function setupSidebarGeojsonLayers(layer){
    var overlayMapsDiv = $("#datalayers");
    var layer_id = layer._leaflet_id;
    var layer_name = layer.options.layer_name;
    var elementId = "geojson_layer_" + layer_id ;

    if ($("#" + elementId).length == 0 ){
        var geojsonDivGroup = $("<div>", { "class": "my-2 shadow" });
        //TITLE
        var divTitle = $("<div>", { "class": " p-1 d-flex bg-light justify-content-between align-items-center" });
        var groupTitle = $("<h5>", { "class": "tex-upper" }).html(layer_name);
        var groupToggler = $("<div>", { "class": ""});
        var groupTogglerBtn = $("<button>",
            {
                "class": "btn btn-primary btn-sm",
                "type": "button",
                "data-bs-toggle": "collapse",
                "data-bs-target": "#" + elementId,
                "aria-expanded": "false",
                "aria-controls": elementId
            }).append($("<i>", { "class": "fa fa-caret-down " }));
        groupToggler.append(groupTogglerBtn);



        divTitle.append(groupTitle).append(groupToggler);
        geojsonDivGroup.append(divTitle);

        //CONTENT
        var groupContent = $("<div>", { "class": "p-1 collapse", "id": elementId })
        var groupContentItem = $("<div>", { "class": "py-2 d-flex justify-content-between" });
        var groupContentItemTitle = $("<h6>", { "class": "" }).text("");
        var groupContentItemSwitch = $("<div>", { "class": "form-check form-switch" });
        var groupContentItemSwitchItem = $("<input>", { "class": "form-check-input oLSwitch", "data-onstyle": "success", "type": "checkbox", "role": "switch", "layer": layer_id });
        groupContentItemSwitchItem.on("change", (e) => {
            var state = e.target.checked;
            if (state) {
                map.addLayer(layer);
            }
            else {
                map.removeLayer(layer);
            }
        });

        if(map.hasLayer(layer)){
            $(groupContentItemSwitchItem).attr("checked", "true");
        }

        var subLayersDiv = $("<div>", { "class":"table-responsive" });
        var subLayersTable = $("<table>", { "class": "table table-sm", "id": elementId+"_sub_table" });
        var subLayersTableBody = $("<tbody>", {"id": elementId + "_sub_layer" });
        subLayersDiv.append(subLayersTable.append(subLayersTableBody));


        layer.on("layeradd", (e)=>{
            var addId = e.layer._leaflet_id;

            var addPoperties = e.layer.feature.properties;
            var childCount = subLayersTableBody.children().length;
            if (childCount == 0){
                var subLayersTableHead = $("<thead>", { "id": elementId + "_sub_layer" });
                var addTheadTr = $("<tr>");
                for (const key in addPoperties) {
                    if (addI == 0) {
                        var addTh = $("<th>", { "scope": "col" }).append("#");
                        addTheadTr.append(addTh);
                    }
                    else {
                        var addTh = $("<th>", { "scope": "col" }).append(key);
                        addTheadTr.append(addTh);
                    }
                    addI++;
                }
                $(subLayersTable).prepend(subLayersTableHead.append(addTheadTr));
            }

            var addTr = $("<tr>", { "id": "add_feature_" + addId, "data-layerid": addId });
            var addI = 0;
            for(const key in addPoperties){
                if(addI == 0){
                    var addTh = $("<th>", { "scope": "row" }).append(childCount +1);
                    addTr.append(addTh);
                }
                else{
                    var addTh = $("<td>").append(addPoperties[key]);
                    addTr.append(addTh);
                }
                addI++;
            }

            addTr.on("click", ()=>{
                console.log(e);
                try{
                    map.fitBounds(map._layers[addId].getBounds());
                }
                catch(e){
                    map.flyTo(map._layers[addId].getLatLng(), 17);
                }
            });

            subLayersTableBody.append(addTr);
            
        });

        layer.on("layerremove",(e)=>{
            var removeId = e.layer._leaflet_id;
            $("#add_feature_" + removeId).remove();
        });

        groupContentItemSwitch.append(groupContentItemSwitchItem);
        groupContentItem.append(groupContentItemTitle).append(groupContentItemSwitch);
        groupContent.append(groupContentItem).append(subLayersDiv);

        geojsonDivGroup.append(groupContent);
        overlayMapsDiv.append(geojsonDivGroup);
        
       
    }
}
// Geoman
var options = {
    position: 'topright',
    drawText: true,
    drawMarker: false,
    drawPolyline: false,
    drawPolygon: false,
    drawCircle: false,
    drawCircleMarker: false,
    drawRectangle: false,
    rotateMode: false,
    cutPolygon: false,
    editMode: true,
    dragMode: false,
};
//add options to map for geoman -- check editing toggling for  
//thats where the toolbard is added to map
map.pm.addControls(options);
map.pm.Toolbar.drawContainer.style.display = "none"; //Hide Toolbar until edit mode is toggled
map.pm.Toolbar.editContainer.style.display = "none"; //Hide Toolbar until edit mode is toggled

var zoneIcon = L.divIcon({
    className: '',
    html: '<i class="color-blue fa fa-map-marker-alt fa-5x"></i>',
    iconAnchor: new L.Point(23, 60),
    iconSize: new L.Point(20, 20),
    popupAnchor: [35, -50],
});


var zoneValveIcon = L.divIcon({
    className: '',
    html: '<div class="zoneValve-geoman">ZV</div>',
    iconAnchor: new L.Point(10, 10),
    iconSize: new L.Point(20, 20),
    popupAnchor: [0, -10],
});

var rotorHeadIcon = L.divIcon({
    className: '',
    html: '<div class="rotor-head-icon"><div class="rotorHeadInner"></div></div>',
    iconAnchor: new L.Point(10, 10),
    iconSize: new L.Point(20, 20),
    popupAnchor: [0, -10],
});

var sprayHeadIcon = L.divIcon({
    className: '',
    html: '<div class="spray-head-icon"></div>',
    iconAnchor: new L.Point(8, 8),
    iconSize: new L.Point(20, 20),
    popupAnchor: [0, -10],
});

var controllerIcon = L.divIcon({
    className: '',
    html: '<div class="color-yellow-controller-div">C</div>',
    iconAnchor: new L.Point(10, 10),
    iconSize: new L.Point(20, 20),
    popupAnchor: [0, -10],
});

var backflowIcon = L.divIcon({
    className: '',
    html: '<div class="color-red-backflow-div">B</div>',
    iconAnchor: new L.Point(10, 10),
    iconSize: new L.Point(20, 20),
    popupAnchor: [0, -10],
});

var valveBoxIcon = L.divIcon({
    className: '',
    html: '<div class="color-red-valveBox-div">SV</div>',
    iconAnchor: new L.Point(10, 10),
    iconSize: new L.Point(20, 20),
    popupAnchor: [0, -10],
});

var masterValveIcon = L.divIcon({
    className: '',
    html: '<div class="masterValve-div">MV</div>',
    iconAnchor: new L.Point(10, 10),
    iconSize: new L.Point(20, 20),
    popupAnchor: [0, -10],
});

var othersIconSquare = L.divIcon({
    className: '',
    html: '<div id="square" class="color-orange-others-div"></div>',
    iconAnchor: new L.Point(10, 10),
    iconSize: new L.Point(20, 20),
    popupAnchor: [0, -10],
});

var othersIconCircle = L.divIcon({
    className: '',
    html: '<div id="circle" class="color-orange-others-div-circle"></div>',
    iconAnchor: new L.Point(10, 10),
    iconSize: new L.Point(20, 20),
    popupAnchor: [0, -10],
});

function setSylePointJSON(name, shape = "square", color = "#f866a0", size = 'small') {
    if (name == 'Zone') {
        return zoneIcon;
    } else if (name == 'Zone Valve') {
        return zoneValveIcon;
    } else if (name == 'Rotor Head') {
        return rotorHeadIcon;
    } else if (name == 'Spray Head') {
        return sprayHeadIcon;
    } else if (name == 'Controller') {
        return controllerIcon;
    } else if (name == 'Backflow') {
        return backflowIcon;
    } else if (name == 'Master Valve') {
        return masterValveIcon;
    } else if (name == 'Shutoff Valve') {
        return valveBoxIcon;
    } else {
        //(name == 'Others')
        var vclass = "r-0";
        if(shape == "circle"){
            vclass = "r-50";
        }
        var iconProperties;
        if(size == 'small'){
            iconProperties = {
                className: '',
                html: `<div id="circle" class="color-orange-others-div ${vclass}" style="background-color:${color}"></div>`,
                iconAnchor: new L.Point(10, 10),
                iconSize: new L.Point(20, 20),
                popupAnchor: [0, -10],
            }
        }
        else if(size == 'medium' ){
            iconProperties = {
                className: '',
                html: `<div id="circle" class="color-orange-others-div ${vclass}" style="background-color:${color}"></div>`,
                iconAnchor: new L.Point(15, 15),
                iconSize: new L.Point(30, 30),
                popupAnchor: [0, -15],
            }
        }
        else  if(size == 'large'){
            iconProperties = {
                className: '',
                html: `<div id="circle" class="color-orange-others-div ${vclass}" style="background-color:${color}"></div>`,
                iconAnchor: new L.Point(20, 20),
                iconSize: new L.Point(40, 40),
                popupAnchor: [0, -20],
            }
        }

        return L.divIcon(iconProperties);
    }
}

function setSyleLineJSON(style, color, opacity) {
    var style1 = {
        weight: 4,
        opacity: opacity,
        color: color,
        dashOffset: '20'
    }
    if (style == 'Dotted') {
        style1['dashArray'] = '10, 10';
    }
    return style1;
}

function setSyleLineJSONCompatibility(name) {
    if (name == 'Zone Line') {
        var style = {
            weight: 4,
            opacity: 1,
            color: 'blue'
        };
        return style;
    } else if (name == 'Main Line') {
        var style = {
            weight: 4,
            dashArray: '3',
            opacity: 1,
            color: 'red'
        };
        return style;
    } else {
        var style = {
            weight: 4,
            opacity: 1,
            color: 'pink'
        }
        return style;
    }
}

function setSyleAreaJSON(style, color, opacity) {
    var style1 = {
        weight: 2,
        fillOpacity: opacity,
        color: color,
        //fillColor: color,
        dashOffset: '20'
    }
    if (style == 'Dotted') {
        style1['dashArray'] = '10, 10';
    }
    return style1;
}

//PM POLYGON DRAW
var polygonTool = map.pm.Toolbar.copyDrawControl('Polygon', {
    name: "Draw Polygon",
    title: "Draw Polygon",
    snappable: true,
    tooltips: false,
    //className: "color-black fa fa-solid fa-draw-square"
});

polygonTool.drawInstance.setPathOptions({
    color: 'blue',
    fillColor: 'blue',
    fillOpacity: 0.2,
});

var drawingTool = map.pm.Toolbar.copyDrawControl('Line', {
    name: "Draw Polyline",
    title: "Draw Polyline",
    snappable: true,
    tooltips: false,
    //className: "color-black fa fa-pencil-alt fa-2x"
});

drawingTool.drawInstance.setPathOptions({
    color: 'blue',
    fillColor: 'blue',
});

var zoneMarker = map.pm.Toolbar.copyDrawControl('drawMarker', {
    name: "Zone",
    title: "Add Zone",
    snappable: true,
    className: "color-blue fa fa-map-marker-alt fa-2x"
});

zoneMarker.drawInstance.setOptions({
    markerStyle: {
        icon: zoneIcon,
    },
    tooltips: false,
});

var rotorHeadMarker = map.pm.Toolbar.copyDrawControl('drawMarker', {
    name: "Rotor Head",
    title: "Add Rotor Head",
    snappable: true,
    className: "rotorHead-icon-geoman"
});

rotorHeadMarker.drawInstance.setOptions({
    markerStyle: {
        icon: rotorHeadIcon,
    },
    tooltips: false,
});

var sprayHeadMarker = map.pm.Toolbar.copyDrawControl('drawMarker', {
    name: "Spray Head",
    title: "Add Spray Head",
    snappable: true,
    className: "sprayHead-icon-geoman"
});

sprayHeadMarker.drawInstance.setOptions({
    markerStyle: {
        icon: sprayHeadIcon,
    },
    tooltips: false,
});

var controllerMarker = map.pm.Toolbar.copyDrawControl('drawMarker', {
    name: "Controller",
    title: "Add Controller",
    snappable: true,
    className: "controller-icon-geoman"
});

controllerMarker.drawInstance.setOptions({
    markerStyle: {
        icon: controllerIcon
    },
    tooltips: false,
});

var backFlowMarker = map.pm.Toolbar.copyDrawControl('drawMarker', {
    name: "Backflow",
    title: "Add Backflow",
    snappable: true,
    className: "backflow-icon-geoman"
});

backFlowMarker.drawInstance.setOptions({
    markerStyle: {
        icon: backflowIcon
    },
    tooltips: false,
});

var zoneValveMarker = map.pm.Toolbar.copyDrawControl('drawMarker', {
    name: "Zone Valve",
    title: "Add Zone Valve",
    snappable: true,
    className: "zoneValve-icon-geoman"
});

zoneValveMarker.drawInstance.setOptions({
    markerStyle: {
        icon: zoneValveIcon,
    },
    tooltips: false,
});


var masterValve = map.pm.Toolbar.copyDrawControl('drawMarker', {
    name: "Master Valve",
    title: "Add Master Valve",
    snappable: true,
    className: "masterValve-icon-geoman"
});

masterValve.drawInstance.setOptions({
    markerStyle: {
        icon: masterValveIcon
    },
    tooltips: false,
});

var valveBoxMarker = map.pm.Toolbar.copyDrawControl('drawMarker', {
    name: "Shutoff Valve",
    title: "Add Shutoff",
    snappable: true,
    className: "shutoffValve-icon-geoman"
});

valveBoxMarker.drawInstance.setOptions({
    markerStyle: {
        icon: valveBoxIcon
    },
    tooltips: false,
});

var otherMarker = map.pm.Toolbar.copyDrawControl('drawMarker', {
    name: "Custom Point",
    title: "Add Custom Point",
    snappable: true,
    className: "others-icon-geoman"
})

otherMarker.drawInstance.setOptions({
    markerStyle: {
        icon: othersIconSquare
    },
    tooltips: false,
});

//Toggle Editin on or off
function toggleEditing(state) {
    var buttonsArr = map.pm.Toolbar.getButtons();
    for (var i in buttonsArr) {
        var key = i;
        map.pm.Toolbar.setButtonDisabled(key, state);
    }
}

//disable draw container buttons
function toggleDrawBtns(state) {
    var container = map.pm.Toolbar.drawContainer;
    var buttonsArr = map.pm.Toolbar.getButtons();
    for (var i in buttonsArr) {
        if (buttonsArr[i]._container == container) {
            map.pm.Toolbar.setButtonDisabled(i, state);
        }
    }
}

//GLOBAL DRAGGING
map.on('pm:globaldragmodetoggled', e => {
    toggleDrawBtns(e.enabled);
});

//GLOBAL EDIT MODE 
map.on('pm:globaleditmodetoggled', (e) => {
    toggleDrawBtns(e.enabled);
});

//GLOBAL REMOVAL MODE
map.on('pm:globalremovalmodetoggled', (e) => {
    toggleDrawBtns(e.enabled);
});

//GLOBAL CUT MODE
map.on('pm:globalcutmodetoggled', (e) => {
    toggleDrawBtns(e.enabled);
});


//EDITING FEATURES AND DRAWING
var IntermidiateShapeDraw = null;
var isDrawing = false;
var isNewFeature = true;


// listen to when a new layer is created
var pointLayerLabels = L.geoJson(null); //control labels
var pointLayer = L.geoJson(null, {
    pointToLayer: pointToLayer,
    onEachFeature: function (feature, layer) {
        //console.log(feature.properties.name);
        layer.bindPopup(styledPopUP(feature.properties.label, poinLabelColor), {
            autoClose: false
        });
        layer.on('click', layerOnclickFunction);
        //update popup on color changes
        document.addEventListener('pcc', (e) => {
            layer.setPopupContent(styledPopUP(feature.properties.label, e.detail.color));
        });
    },
    type: "geojson layer",
    layer_name: "Point Features",
}).addTo(map);
//on each point layer
function pointToLayer(feature, latlng) {
    return L.marker(latlng, {
        icon: setSylePointJSON(feature.properties.name, feature.properties.shape2, feature.properties.color, feature.properties.size),
        interactive: true
    });
}
//open popup on layer add
pointLayer.on('layeradd', function (event) {
    setTimeout(function () {
        openClosePopups("open", "point");
    }, 10);
});
//listen to remove
pointLayer.on('pm:remove', e => {
    pointLayer.removeLayer(e.layer);
});

//layerControl.addOverlay(pointLayer, "Point Data");
control.addOverlay(pointLayer, "Point Data", { groupName: "Data" });
//layerControl.addOverlay(pointLayerLabels, "Point Data Labels");

var lineLayerLabels = L.geoJson(null); //control labels
var lineLayer = L.geoJson(null, {
    style: function (feature) {
        if (feature.properties.style) {
            return setSyleLineJSON(feature.properties.style, feature.properties.color, feature.properties.opacity);
        }
        else {
            //upgrade feature propeties
            var name = feature.properties.name;
            var style;
            if (name == 'Zone Line') {
                style = {
                    style: "Solid",
                    opacity: 1,
                    color: '#0000FF'
                };
            }
            else if (name == 'Main Line') {
                style = {
                    style: "Dotted",
                    opacity: 1,
                    color: '#FF0000'
                };
            }
            else {
                style = {
                    style: "Solid",
                    opacity: 1,
                    color: 'pink'
                }
            }
            feature.properties.style = style.style;
            feature.properties.color = style.color;
            feature.properties.opacity = style.opacity;
            feature.properties.shape = "polyline";
            return setSyleLineJSONCompatibility(feature.properties.name);
        }

    },
    onEachFeature: function (feature, layer) {
        layer.bindPopup(styledPopUP(feature.properties.label, lineLabelColor), {
            autoClose: false
        });

        layer.on('click', layerOnclickFunction);

        //update popup on color changes
        document.addEventListener('lcc', (e) => {
            layer.setPopupContent(styledPopUP(feature.properties.label, e.detail.color));
        });
    },
    type: "geojson layer",
    layer_name: "Line Features",
}).addTo(map);
//open popup on layer add
lineLayer.on('layeradd', function (event) {
    control.addOverlay(lineLayer, "Line Data", { groupName: "Data" });
    //layerControl.addOverlay(lineLayer, "Line Data");
    //layerControl.addOverlay(lineLayerLabels, "Line Data Labels");
    openClosePopups("open", "line");
}, 10);

//open popup on layer add
lineLayer.on('layeradd', function (event) {
    setTimeout(function () {
        openClosePopups("open", "line");
    }, 10);
});
//listen to edits
lineLayer.on('pm:edit', e => {
    IntermidiateShapeDraw = e.layer;
    var length = getLength('foot')
    e.layer.feature.properties.length = (length.val).toFixed(1);
    //console.log(e.layer.feature.properties);
});
//listen to remove
lineLayer.on('pm:remove', e => {
    lineLayer.removeLayer(e.layer);
});

//layerControl.addOverlay(lineLayer, "Line Data");
control.addOverlay(lineLayer, "Line Data", { groupName: "Data" });
//layerControl.addOverlay(lineLayerLabels, "Line Data Labels");

var areaLayerLabels = L.geoJson(null); //control labels
var cutProperties = null;
var pop;
var areaLayer = L.geoJSON(null, {
    onEachFeature: function (feature, layer) {
        layer.on('click', layerOnclickFunction);

        document.addEventListener('acc', (e) => {
            areaLabelColor = e.detail.color;
            layer.setPopupContent(styledPopUP(layer.feature.properties.label, e.detail.color));
        });

        layer.bindPopup(styledPopUP(layer.feature.properties.label, areaLabelColor), {
            autoClose: false
        });

        layer.on("remove", (e) => {
            pop = e.target._tempPopupCopy;
            pop.removeFrom(map);
        });

        layer.setStyle(setSyleAreaJSON(feature.properties.style, feature.properties.color, feature.properties.opacity));

    },
    type:"geojson layer",
    layer_name: "Area Features",
}).addTo(map);

//open popup on layer add
areaLayer.on('layeradd', function (event) {
    setTimeout(function () {
        openClosePopups("open", "area");
    }, 10);
});

//listen to edits
var cuttingMode = false;
map.on('pm:globalcutmodetoggled', e => {
    cuttingMode = e.enabled;
});
areaLayer.on('pm:edit', e => {
    if (!cuttingMode) {
        IntermidiateShapeDraw = e.layer;
        var area = getArea((e.layer).toGeoJSON(), 'foot');
        e.layer.feature.properties.area = (area.val).toFixed(1);
    }
});

areaLayer.on('pm:cut', e => {
    var layerGeojson = e.layer.toGeoJSON();
    var areaV = getArea(layerGeojson, 'foot');
    layerGeojson.properties.area = areaV.val.toFixed(1);
    layerGeojson.properties.label = (areaV.val).toFixed(1) + " " + areaV.unit;
    areaLayer.removeLayer(e.originalLayer);
    areaLayer.removeLayer(e.layer);
    areaLayer.addData(layerGeojson);
});

//listen to remove
areaLayer.on('pm:remove', e => {
    areaLayer.removeLayer(e.layer);
});

areaLayer.on('remove', e=>{
    alert();
});

areaLayer.on('pm:dragend', e =>{
    console.log(e.shape);
    console.log(e.layer);
});

//layerControl.addOverlay(areaLayer, "Polygon Data");
control.addOverlay(areaLayer, "Polygon Data", { groupName: "Data" });
//on layer click
function layerOnclickFunction(e) {
    //console.log(e);
    if (!map.pm._globalRemovalModeEnabled) {
        //Check if layer removal mode is on. 
        //if off enable edit and show features attributes
        if (editingOn && !isDrawing) {
            IntermidiateShapeDraw = this;
            isNewFeature = false;
            editCurrentFeature();
        }
    }
}

//DISABLE LAYER  CLICK EVENTS DURING DRAW
function layerEventBlock() {
    if (isDrawing) {
        pointLayer.eachLayer(layer => {
            layer.off('click');
        });
    }
    else {
        pointLayer.eachLayer(layer => {
            layer.on('click', layerOnclickFunction);
        });
    }
}

var attributeBox = document.getElementById("editorContainer");
//INPUT IDS
var labelInput = document.getElementById("label");
var notesInput = document.getElementById("notes");
//name
var custP = document.getElementById("custP");
var custPSize = document.getElementById("custPSize");
var custShape = document.getElementById("custShape");
var custColor = document.getElementById("custColor");
var nameInputHolder = document.getElementById("name-h");
var nameInput = document.getElementById("name");
var lineInputHolder = document.getElementById("line");
var nameInputLine = document.getElementById("name-line");
var areaInputHolder = document.getElementById("area");
var nameInputArea = document.getElementById("name-area");
var lengthInput = document.getElementById("ldisp");
var lengthInputVal = document.getElementById("lengthVal");
var areaInput = document.getElementById("adisp");
var areaInputVal = document.getElementById("areaVal");
var lineAreaStyleHolder = document.getElementById("line-area");
var style = document.getElementById("style");
var color = document.getElementById("color");
var opacity = document.getElementById("opacity");
var dateCreatedInput = document.getElementById("datecreated");
var dateModifiedInput = document.getElementById("datemodified");
var msg = document.getElementById("editorContainerMsg");

//DATE
var dateTime = "";
var dateModified = '',
    dateCreated = '';

function getDates() {
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    dateTime = date + ' ' + time;
}

//Modify clicked coordinate on mobile mode
map.on('click', function (event) {
    if (mobileMode) {
        event.latlng = map.getCenter();
    }
});

//Feature Removal listen to geoman pm:remove event and complete removal of feature
map.on('pm:remove', (e) => {
    var layer = e.layer;
    if (pointLayer.hasLayer(layer)) {//check if point layer has deleted layer
        //remove leaflet layer by id
        delete pointLayer._layers[layer._leaflet_id];
    }
    if (lineLayer.hasLayer(layer)) {//check if line layer has deleted layer
        //remove leaflet layer by id
        delete lineLayer._layers[layer._leaflet_id];
    }
});
//TOGGLE DRAWING MODES
map.on('pm:drawstart', (e) => {
    isDrawing = true;
    layerEventBlock();
});
map.on('pm:drawend', (e) => {
    isDrawing = false;
    layerEventBlock();
});
// listen to when a new layer is created
function handleDisplay(shape) {
    
    if (shape == "Custom Point"){
        nameInput.value = IntermidiateShapeDraw.pm._shape;
        custP.classList.remove("d-none");
        nameInputHolder.classList.remove("d-none");
        lineInputHolder.classList.add("d-none");
        lengthInput.classList.add("d-none");
        areaInputHolder.classList.add("d-none");
        areaInput.classList.add("d-none");
        lineAreaStyleHolder.classList.add("d-none");
    }
    else if (shape == 'point') {
        nameInput.value = IntermidiateShapeDraw.pm._shape;
        nameInputHolder.classList.remove("d-none");
        lineInputHolder.classList.add("d-none");
        lengthInput.classList.add("d-none");
        areaInputHolder.classList.add("d-none");
        areaInput.classList.add("d-none");
        lineAreaStyleHolder.classList.add("d-none");
        custP.classList.add("d-none");
    }
    else if (shape == 'polyline') {
        //hide name input 
        custP.classList.add("d-none");
        nameInputHolder.classList.add("d-none");
        areaInputHolder.classList.add("d-none");
        areaInput.classList.add("d-none");
        //show line input values
        lineInputHolder.classList.remove("d-none");
        lengthInput.classList.remove("d-none");
        var length = getLength('foot');
        lengthInputVal.value = (length.val).toFixed(1);
        if (isNewFeature) {
            labelInput.value = (length.val).toFixed(1) + " " + length.unit;
        }
        lineAreaStyleHolder.classList.remove("d-none");
    }
    else {
        //hide name input
        custP.classList.add("d-none");
        nameInputHolder.classList.add("d-none");
        lineInputHolder.classList.add("d-none");
        lengthInput.classList.add("d-none");
        //show area input values
        areaInputHolder.classList.remove("d-none");
        areaInput.classList.remove("d-none");
        var area = getArea(IntermidiateShapeDraw.toGeoJSON(), 'foot');
        areaInputVal.value = (area.val).toFixed(1);
        if (isNewFeature) {
            labelInput.value = (area.val).toFixed(1) + " " + area.unit;
        }
        lineAreaStyleHolder.classList.remove("d-none");
    }
}

map.on('pm:create', function (e) {
    if(e.shape != "Text"){

        getDates();
        isNewFeature = true;
        IntermidiateShapeDraw = e.layer;
        //Edit box show
        var shape = checkAttrName(IntermidiateShapeDraw.pm._shape);
        if (e.shape == "Custom Point"){
            shape = "Custom Point";
        }

        labelInput.value = "";
        notesInput.value = "";

        handleDisplay(shape);

        dateCreatedInput.value = dateTime;
        dateModifiedInput.value = dateTime;
        attributeBox.style.display = "block";
        //toggle editing off until saving of marker is achieved
        toggleEditing(true);
        //crosshair.bringToFront();
    }
    
});

//CLOSING EDITING Container
function closeEditoContainer() {
    //Empty Inputs
    labelInput.value = "";
    notesInput.value = "";
    nameInput.value = "";

    //Close Container
    attributeBox.style.display = "none";

    //Remove Marker
    if (isNewFeature) {
        map.removeLayer(IntermidiateShapeDraw);
    }

    //Enable Editing
    toggleEditing(false);
}

//SAVE ATTRIBUTES
function checkAttrName(name) {
    if (name == "Draw Polygon") {
        return "polygon";
    }
    else if (name == "Draw Polyline") {
        return "polyline";
    }
    else {
        return "point";
    }
}

function saveAttributes() {
    getDates();
    var name, shape;
    if (isNewFeature) {
        name = IntermidiateShapeDraw.pm._shape;
        shape = checkAttrName(IntermidiateShapeDraw.pm._shape);
        dateModified = dateTime;
        dateCreated = dateTime;
    }
    else {
        name = IntermidiateShapeDraw.feature.properties.name;
        shape = IntermidiateShapeDraw.feature.properties.shape;
        dateModified = dateTime;
        dateCreated = IntermidiateShapeDraw.feature.properties.date_modified;
    }
    //Set attribute name
    nameInput.value = name;

    var uuid = pointLayer.toGeoJSON().features.length + 1;
    msg.innerHTML = "";

    //CUSTOM GEOJSON
    feature = {};
    feature['type'] = 'Feature';
    feature['geometry'] = {};

    if (name == 'Custom Point') {//check if its point
        //properties
        feature['properties'] = {
            'uuid': uuid,
            'shape': shape,
            'size': custPSize.value,
            'shape2': custShape.value,
            'color': custColor.value,
            'label': label.value,
            'name': name,
            'notes': notes.value,
            'date_created': dateCreated,
            'date_modified': dateModified
        };
        //determine geometry type
        var latLng = IntermidiateShapeDraw.getLatLng();
        feature['geometry'] = {
            'type': 'Point',
            'coordinates': [latLng.lng, latLng.lat],
        };
        if (!isNewFeature) {
            pointLayer.removeLayer(IntermidiateShapeDraw);
        }
        pointLayer.addData(feature);
        reset();
    }
    else if (shape == 'point') {//check if its point
        //properties
        feature['properties'] = {
            'uuid': uuid,
            'shape': shape,
            'shape2': "square",
            'size':'small',
            'color': "#ffffff",
            'label': label.value,
            'name': name,
            'notes': notes.value,
            'date_created': dateCreated,
            'date_modified': dateModified
        };
        //determine geometry type
        var latLng = IntermidiateShapeDraw.getLatLng();
        feature['geometry'] = {
            'type': 'Point',
            'coordinates': [latLng.lng, latLng.lat],
        };
        if (!isNewFeature) {
            pointLayer.removeLayer(IntermidiateShapeDraw);
        }
        pointLayer.addData(feature);
        reset();
    }
    else if (shape == 'polyline') {//Its a line
        uuid = lineLayer.toGeoJSON().features.length + 1;

        feature['geometry'] = {
            'type': 'LineString',
            'coordinates': IntermidiateShapeDraw.toGeoJSON().geometry.coordinates,
        };

        /*IntermidiateShapeDraw.getLatLngs().forEach(element => {
            feature['geometry'].coordinates.push([element.lng, element.lat]);
        });*/
        //get length accepts measurement units: miles, foot, yard, kilometers, meters, centimeters
        var length = getLength('foot');

        feature['properties'] = {
            'uuid': uuid,
            'shape': shape,
            'label': label.value,
            'name': nameInputLine.value,
            'style': style.value,
            'color': color.value,
            'opacity': opacity.value,
            'length': length.val,//length.value,
            'notes': notes.value,
            'date_created': dateCreated,
            'date_modified': dateModified
        };

        if (!isNewFeature) {
            lineLayer.removeLayer(IntermidiateShapeDraw);
        }
        lineLayer.addData(feature);
        reset();
    }
    else {
        uuid = areaLayer.toGeoJSON().features.length + 1;

        feature['geometry'] = {
            'type': 'Polygon',
            'coordinates': IntermidiateShapeDraw.toGeoJSON().geometry.coordinates,
        };
        //console.log(IntermidiateShapeDraw.toGeoJSON().geometry.coordinates);

        //get length accepts measurement units: miles, foot, yard, kilometers, meters, centimeters
        var area = getArea(IntermidiateShapeDraw.toGeoJSON() , 'foot');
        feature['properties'] = {
            'uuid': uuid,
            'shape': shape,
            'label': label.value,
            'name': nameInputArea.value,
            'style': style.value,
            'color': color.value,
            'opacity': opacity.value,
            'area': area.val,
            'notes': notes.value,
            'date_created': dateCreated,
            'date_modified': dateModified
        };

        if (!isNewFeature) {
            areaLayer.removeLayer(IntermidiateShapeDraw);
        }
        areaLayer.addData(feature);
        reset();
    }

}

//RESET ATTRIBUTE BOX
function reset() {
    //Remove PM DRAWN Feature
    map.removeLayer(IntermidiateShapeDraw);
    IntermidiateShapeDraw = null;

    ////Edit box hide
    attributeBox.style.display = "none";
    //Empty values
    labelInput.value = "";
    notesInput.value = "";
    nameInput.value = "";
    dateCreated.value = "";
    dateModified.value = "";

    //disable editing
    toggleEditing(false);
}

//EDIT CURRENT FEATURE
function editCurrentFeature() {
    isNewFeature = false;
    //Edit box show
    attributeBox.style.display = "block";
    labelInput.value = IntermidiateShapeDraw.feature.properties.label;
    notesInput.value = IntermidiateShapeDraw.feature.properties.notes;
    dateCreatedInput.value = IntermidiateShapeDraw.feature.properties.date_created;
    dateModifiedInput.value = IntermidiateShapeDraw.feature.properties.date_modified;
    var shape = IntermidiateShapeDraw.feature.properties.shape;
    var nameF = IntermidiateShapeDraw.feature.properties.name;

    if (nameF == "Custom Point") {
        handleDisplay(nameF);
    }
    else {
        handleDisplay(shape);
    }

    if (shape == 'point') {
        nameInput.value = IntermidiateShapeDraw.feature.properties.name;
    }
    else if (shape == 'polyline') {
        nameInputLine.value = IntermidiateShapeDraw.feature.properties.name;
        lengthInputVal.value = IntermidiateShapeDraw.feature.properties.length;
        opacity.value = IntermidiateShapeDraw.feature.properties.opacity;
        color.value = IntermidiateShapeDraw.feature.properties.color;
        style.value = IntermidiateShapeDraw.feature.properties.style;
    }
    else {
        nameInputArea.value = IntermidiateShapeDraw.feature.properties.name;
        areaInputVal.value = IntermidiateShapeDraw.feature.properties.area;
        opacity.value = IntermidiateShapeDraw.feature.properties.opacity;
        color.value = IntermidiateShapeDraw.feature.properties.color;
        style.value = IntermidiateShapeDraw.feature.properties.style;
    }
    //this is pushed to the save feature meathod
}

function styledTooltip(bodyText) {
    return '<div style="background-color:null; padding:1px; color:black;font-weight:bold;font-family:Arial;">' + bodyText + '</div>';
}

function styledPopUP(bodyText, textcolor = "#ffffff") {
    var popupContent =
        `<div style="padding:2px; padding-right:0; font-size:16px; color: ${textcolor}">${bodyText }</div>` ;
    return popupContent;
}
// Center Crosshair
var crosshairIcon = L.icon({
    iconUrl: 'images/markers/plus-circle3.svg',
    iconSize: [50, 50], // size of the icon
    iconAnchor: [25, 25], // point of the icon which will correspond to marker's location
});
crosshair = new L.marker(map.getCenter(), {
    icon: crosshairIcon,
    clickable: false
});
//layerControl.addOverlay(crosshair, "Cross Hair");
//crosshair.addTo(map);

map.on('move', function (e) {
    crosshair.setLatLng(map.getCenter());
});

// Export and print
/*var printer = L.easyPrint({
    title: 'Export Image',
    sizeModes: ['A4Landscape', 'A4Portrait'],
    filename: 'Irrigation Map',
    exportOnly: true,
    hideControlContainer: true,
}).addTo(map);*/


//L.EASY BUTTONS

var os = getOS();
//MAP ROTATION
var addRotation = L.easyButton({
    states: [{
        icon: '<span class="fa fa-redo"></span>',
        title: 'Rotate Right +5',
        onClick: function () {
            map.setBearing(map.getBearing() + 5); //set map bearing to allow roatation
            //compass.setAngle(map.getBearing() + 5);
        }
    }]
});

var minusRotation = L.easyButton({
    states: [{
        icon: '<span class="fa fa-undo"></span>',
        title: 'Rotate Left -5',
        onClick: function () {
            map.setBearing(map.getBearing() - 5); //set map bearing to allow roatation
            //compass.setAngle(map.getBearing() - 5);
        }
    }]
});

var rotationButtons = L.easyBar([addRotation, minusRotation], { position: 'topleft' });

rotationButtons.addTo(map);

//FILE SAVING
var saveLoading = document.getElementById("saveLoading");
var modalSaveAs = document.getElementById("modalSaveAs");
var modalSaveAsMsg = document.getElementById("modalSaveAsMsg");
var fileName = document.getElementById("file-name");
var dataTypeDownload = document.getElementById("file-download-type");
var dropboxOptions = {
    success: function () {
        showDropBoxMsg("Success! Files saved to your Dropbox.");
    },
    progress: function (progress) { },
    cancel: function () {
        showDropBoxMsg("File not saved - User has cancelled file saving to dropbox");
    },
    error: function (errorMessage) {
        console.log(errorMessage);
        showDropBoxMsg(errorMessage);
    }
};

function showDropBoxMsg(msg) {
    saveLoadingDropboxMsg.innerHTML = msg;
    showLoadingDropboxSpinner("hide");
    setTimeout(function () {
        showLoadingDropbox("hide");
    }, 5000);
}
window.onclick = function (event) {
    if (event.target == modalSaveAs) {
        modalSaveAs.style.display = "none";
    }
}

function validateFormAndSave(saveLocation) {
    if (fileName.value.length < 4) {
        modalSaveAsMsg.innerHTML = "File name should be greater than 4 characters";
    } else if (dataTypeDownload.value == "choose") {
        modalSaveAsMsg.innerHTML = "Choose data to download";
    } else {
        if (dataTypeDownload.value == "point") {
            if (pointLayer.toGeoJSON().features.length > 0) {
                saveToFile(pointLayer.toGeoJSON(), fileName.value, saveLocation); //download using file saver
            } else {
                modalSaveAsMsg.innerHTML = "No data to export please add few points";
            }
        }
        if (dataTypeDownload.value == "line") {
            if (lineLayer.toGeoJSON().features.length > 0) {
                saveToFile(lineLayer.toGeoJSON(), fileName.value, saveLocation); //download using file saver
            } else {
                modalSaveAsMsg.innerHTML = "No polyline data to export, add polyline data";
            }
        }
        if (dataTypeDownload.value == "polygon") {
            if (areaLayer.toGeoJSON().features.length > 0) {
                saveToFile(areaLayer.toGeoJSON(), fileName.value, saveLocation); //download using file saver
            }
            else {
                modalSaveAsMsg.innerHTML = "No polygon data to export, add polygon data";
            }
        }
        if (dataTypeDownload.value == "All Data") {
            if (lineLayer.toGeoJSON().features.length > 0 && pointLayer.toGeoJSON().features.length) {
                var jointLayer = L.geoJson(null);

                for (i = 0; i < lineLayer.toGeoJSON().features.length; i++) {
                    jointLayer.addData(lineLayer.toGeoJSON().features[i]);
                }
                for (i = 0; i < pointLayer.toGeoJSON().features.length; i++) {
                    jointLayer.addData(pointLayer.toGeoJSON().features[i]);
                }
                for (i = 0; i < areaLayer.toGeoJSON().features.length; i++) {
                    jointLayer.addData(areaLayer.toGeoJSON().features[i]);
                }
                //jointLayer.addTo(map);
                saveToFile(jointLayer.toGeoJSON(), fileName.value, saveLocation); //download using file saver
            } else {
                modalSaveAsMsg.innerHTML = "Both point or line data should be valid to export, add line or point data or download single data";
            }
        }
    }
}

//SAVE FEATURE TO GEOJSON FILE
function saveToFile(content, filename, saveLocation) {
    var filename = filename + '.geojson';
    if (saveLocation == 'saveToDropBox') {
        showLoadingDropbox("show");
        showLoadingDropboxSpinner("show");
        var jsonsResp = JSON.stringify(content);
        //var blob = new Blob([jsonsResp], {type: "application/json"});
        var blob = new File([jsonsResp], filename, {
            type: "application/geo+json;charset=utf-8"
        });
        //create a temp file in server
        var fd = new FormData();
        fd.append('name', "data");
        fd.append('data', blob);
        $.ajax({
            type: 'POST',
            url: 'data/temp.php',
            data: fd,
            processData: false,
            contentType: false
        }).done(function (data) {
            //console.log(data);
            if (data == "filesize") {
                alert("Generated file is too big");
            } else if (data == "error") {
                alert("An error has occured");
            } else if (data == "geojson") {
                alert("Only geojson files are allowed");
            } else {
                var url = "https://app.kei1110.co.ke/data-collector/data/temp/" + data;
                Dropbox.save(url, filename, dropboxOptions);
            }
        });
    } else {
        saveAs(new File([JSON.stringify(content)], filename, {
            type: "application/geo+json;charset=utf-8"
        }), filename);
    }
}

var downloadDataBtn = L.easyButton({
    states: [{
        icon: '<span class="fa fa-cloud-download-alt"></span>',
        title: 'Export Data',
        onClick: function () {
            modalSaveAs.style.display = "block";
        }
    }]
});

//Botton events for downloading files

var modalSaveAsBtn = document.getElementById("modalSaveAsCloseBtn");
modalSaveAsBtn.onclick = function () {
    modalSaveAs.style.display = "none";
}

var modalSaveAsDownloadBtn = document.getElementById("modalSaveAsDownloadBtn");
modalSaveAsDownloadBtn.onclick = function () {
    validateFormAndSave('download');
}

//FILE UPLOADING/LOADING
//UPLOAD JSON FILE

var modalUpload = document.getElementById("modalUpload");
var geojsonfileToRead = document.getElementById("uploadGeojsonfile");
geojsonfileToRead.addEventListener("change", function (event) {
    var files = geojsonfileToRead.files[0];
    var fileReader = new FileReader();
    var parsedJSON = null;
    fileReader.onload = function (e) {
        try {
            var geoJsonText = e.target.result;
            parsedJSON = JSON.parse(geoJsonText);

            var geometryType = "";
            for (i = 0; i < parsedJSON.features.length; i++) {
                geometryType = parsedJSON.features[i].geometry.type;
                if (geometryType == "Point") {
                    pointLayer.addData(parsedJSON.features[i]);
                }
                else if (geometryType == "LineString") {
                    lineLayer.addData(parsedJSON.features[i]);
                }
                else if (geometryType == "Polygon") {
                    areaLayer.addData(parsedJSON.features[i]);
                }
                else {
                    alert("Geometry no supported");
                }
            }

        } catch (e) {
            alert('Unable to read file as GeoJSON.');
        }
        hideUploadModal();
    };
    fileReader.readAsText(files);

}, false);

//Choose from dropbox
var chooseOptions = {
    // Required. Called when a user selects an item in the Chooser.
    success: function (files) {
        //alert("Here's the file link: " + files[0].link);
        $.getJSON(files[0].link, function (result) {
            var parsedJSON = result;
            try {
                var geometryType = "";
                for (i = 0; i < parsedJSON.features.length; i++) {
                    geometryType = parsedJSON.features[i].geometry.type;
                    if (geometryType == "Point") {
                        pointLayer.addData(parsedJSON.features[i]);
                    }
                    else if (geometryType == "LineString") {
                        lineLayer.addData(parsedJSON.features[i]);
                    }
                    else if (geometryType == "Polygon") {
                        areaLayer.addData(parsedJSON.features[i]);
                    }
                    else {
                        alert("Geometry no supported");
                    }
                }
            } catch (e) {
                alert('Unable to read file as GeoJSON.');
            }
        });
        hideUploadModal();
    },
    cancel: function () {
        alert("You have cancelled file choosing")
    },
    linkType: "direct", // or "direct"
    multiselect: false, // or true
    extensions: ['.geojson'],
    folderselect: false, // or true
    //sizeLimit: 1024, // or any positive number
};

function chooseFileFromDropbox() {
    Dropbox.choose(chooseOptions);
}

var uploadDataBtn = L.easyButton({
    states: [{
        icon: '<span class="fa fa-cloud-upload-alt"></span>',
        title: 'Import Data',
        onClick: function () {
            document.getElementById("modalUpload").style.display = "block";
            //document.getElementById("uploadGeojsonfile").click();
        }
    }]
});
var cloudButtons = L.easyBar([downloadDataBtn, uploadDataBtn]);
cloudButtons.addTo(map);


//HANDLICK BUTTON CLICKS FOR FILE UPLOADING
var modalUploadCloseBtn = document.getElementById("modalUploadCloseBtn");
modalUploadCloseBtn.onclick = function () {
    hideUploadModal();
}
function hideUploadModal() {
    modalUpload.style.display = "none";
}

var chooseFromDropboxBtn = document.getElementById("chooseFromDropboxBtn");
chooseFromDropboxBtn.onclick = function () {
    chooseFileFromDropbox();
}

//TOGGLE EDITING
var clickDelay = 100; //solves issue with iphone click issues
editingOn = true; //set editing state on
toggleEditing(false); //Toggle add feature buttons on
map.pm.Toolbar.drawContainer.style.display = "block"; //Displa Toolbar until edit mode is toggled
map.pm.Toolbar.editContainer.style.display = "block"; //Displa Toolbar until edit mode is toggled
var editorToggler = L.easyButton({
    states: [{
        icon: 'fa-times-circle',
        title: 'Disable Editing',
        stateName: 'edit-mode-on',
        onClick: function (control) {
            setTimeout(function () {
                control.state('edit-mode-off');
                editingOn = false; //set editing state on
                toggleEditing(true); //Toggle add feature buttons on
                map.pm.Toolbar.drawContainer.style.display = "none"; //Displa Toolbar until edit mode is toggled
                map.pm.Toolbar.editContainer.style.display = "none"; //Displa Toolbar until edit mode is toggled
            }, clickDelay);
        },
    }, {
        icon: 'fa-edit',
        title: 'Enable Editing',
        stateName: 'edit-mode-off',
        onClick: function (control) {
            setTimeout(function () {
                control.state('edit-mode-on');
                editingOn = true; //set editing state off
                toggleEditing(false); //Toggle add feature buttons off off
                attributeBox.style.display = "none"; //Hide attribute box if open
                map.pm.Toolbar.drawContainer.style.display = "block"; //Hide Toolbar until edit mode is toggled
                map.pm.Toolbar.editContainer.style.display = "block"; //Hide Toolbar until edit mode is toggled
            }, clickDelay);
        }
    }]
});

/*var editingOn = false;
toggleEditing(true);
var toggleEditingOn,toggleEditingOFF;
toggleEditingOn = L.easyButton('fa-edit', function(btn){
    editingOn = true; //set editing state on
    toggleEditing(false); //Toggle add feature buttons on
    map.pm.Toolbar.drawContainer.style.display = "block"; //Displa Toolbar until edit mode is toggled
    map.pm.Toolbar.editContainer.style.display = "block"; //Displa Toolbar until edit mode is toggled

    setTimeout(function(){
        toggleEditingOn.disable();
        toggleEditingOFF.enable();
    },500);
});

toggleEditingOFF = L.easyButton('fa-times-circle', function(btn){
    editingOn = false; //set editing state off
    toggleEditing(true); //Toggle add feature buttons off off
    attributeBox.style.display = "none"; //Hide attribute box if open
    map.pm.Toolbar.drawContainer.style.display = "none"; //Hide Toolbar until edit mode is toggled
    map.pm.Toolbar.editContainer.style.display = "none"; //Hide Toolbar until edit mode is toggled
    
    setTimeout(function(){
    toggleEditingOn.enable();
    toggleEditingOFF.disable();
    }, 500);
}).disable();

//TOGGLE MOBILE AND Desktop
var deviceTogglerDesktop, deviceTogglerMobile;
deviceTogglerDesktop = L.easyButton('fa-mobile-alt', function(btn){
    map.addLayer(crosshair);
    deviceTogglerDesktop.disable();
    deviceTogglerMobile.enable();
    mobileMode = true;
});
deviceTogglerMobile = L.easyButton('fa-desktop', function(btn){
    map.removeLayer(crosshair);
    deviceTogglerMobile.disable();
    deviceTogglerDesktop.enable();
    mobileMode = false;
}).disable();*/

mobileMode = false;
var deviceToggler = L.easyButton({
    states: [{
        stateName: 'mobile-mode',
        icon: 'fa-mobile-alt',
        title: 'Toggle Mobile Mode',
        onClick: function (control) {
            setTimeout(function () {
                mobileMode = true;
                map.addLayer(crosshair);
                control.state('desktop-mode');
            }, clickDelay);
        }
    }, {
        icon: 'fa-desktop',
        stateName: 'desktop-mode',
        onClick: function (control) {
            setTimeout(function () {
                mobileMode = false;
                map.removeLayer(crosshair);
                control.state('mobile-mode');
            }, clickDelay);
        },
        title: 'Toggle Desktop Mode'
    }]
});

//Bar for togglers
//var editorNdeviceToggler = L.easyBar([toggleEditingOn, toggleEditingOFF, deviceTogglerDesktop, deviceTogglerMobile]);
var editorNdeviceToggler = editorNdeviceToggler = L.easyBar([editorToggler]);
if (os === "Android" || os === "iOS" || os === "Windows" || os === "Mac OS") { //Add if divice is mobile
    var editorNdeviceToggler = L.easyBar([editorToggler, deviceToggler]);
}
editorNdeviceToggler.addTo(map);

//printing
//FILE PRINTING
var printingLoading = document.getElementById("printingLoading");
var modalPrintCloseBtn = document.getElementById("modalPrintCloseBtn");
modalPrintCloseBtn.onclick = function () {
    document.getElementById("modalPrint").style.display = "none";
}
var maptitle = "Map Title";
var outputFormat = "PDF";
var printBtn = L.easyButton({
    states: [{
        icon: '<span class="fa fa-print"></span>',
        title: 'Print',
        onClick: function () {
            document.getElementById("modalPrint").style.display = "flex"; //show print modal
        }
    }]
});
if (os !== "") { //is not ios
    printBtn.addTo(map);
}

var printModule = document.getElementById("print-module");
var leafletPrintModule = document.getElementById("easy-print-module");
var appPrintModule = document.getElementById("app-print-module");

function printModuleChange() {
    var printModuleVal = printModule.value;
    if (printModuleVal == "easyprint") {
        leafletPrintModule.style.display = "block";
        appPrintModule.style.display = "none";
    } else {
        leafletPrintModule.style.display = "none";
        appPrintModule.style.display = "block";
    }
}

//Initialize easyprint
function getActiveTileLayer() {
    //console.log(activeBaseLayer);
    return layer_OpenStreetMap_0; //hack
    /*if (map.hasLayer(layer_ESRIWorldImagery_1)) {
        return layer_ESRIWorldImagery_1;
    } else {
        return layer_OpenStreetMap_0;
    }*/
}

var letterSize = {
    width: 2550,
    height: 3300,
    className: 'letterCssClass',
    tooltip: 'Letter Size'
}

var printPlugin = L.easyPrint({
    tileLayer: getActiveTileLayer(),
    hidden: true,
    sizeModes: ['Current', 'A4Portrait', 'A4Landscape'],
    filename: 'myMap',
    exportOnly: true,
    hideControlContainer: false,
    hideClasses: new Array('leaflet-top', 'leaflet-left', 'leaflet-top', 'leaflet-right', /*'leaflet-compass'*/),

}).addTo(map);

//Do actual Printing
var printButton = document.getElementById("printButton");
printButton.onclick = function () {
    maptitle = document.getElementById("print-file-name").value;
    var printModuleVal = printModule.value;
    if (printModuleVal == "easyprint") {
        var easyPrintPaperSize = document.getElementById("easyprint-paper-size").value;
        printPlugin.printMap(easyPrintPaperSize, maptitle);
    } else {
        outputFormat = document.getElementById("print-output").value;
        if (maptitle != "" && outputFormat != "") {
            document.getElementById("mapTitle").innerHTML = maptitle;
            document.getElementById("mapTitle").style.visibility = "visible"; //show map title
            if (document.getElementById("printmap")) {
                document.getElementById("printmap").removeAttribute("src"); //remove image src
            }
            //document.getElementById("modalMap").style.display = "block";//show modal
            printingLoading.style.display = 'block'; //show loading modal
            document.getElementById("modalPrint").style.display = "none"; //hide print modal
            printMap();
        } else {
            alert("Enter or choose the desired value");
        }
    }
    return false;
};

function hideModal() {
    var item = document.getElementById("modalMap");
    item.style.display = 'none';
}
var mapDiv = document.getElementById("map");
//set width to a4 75DPI
var run = 0; //prevent issues with canvas in iphone
function printMap() {
    if (map.hasLayer(crosshair)) {
        map.removeLayer(crosshair);
    }
    //open popups
    openClosePopups("open");
    //end open
    var width, height;
    var paperSize = document.getElementById('print-paper-size');
    var paperOption = paperSize.options[paperSize.selectedIndex];
    var dimensionA = paperOption.getAttribute("data-a");
    var dimensionB = paperOption.getAttribute("data-b");
    var paperOrientation = document.querySelector('input[name="orientation"]:checked').value;
    if (paperOrientation == "portrait") {
        width = dimensionA;
        height = dimensionB;
    } else {
        width = dimensionB;
        height = dimensionA;
    }
    //hide leaflet control
    mapDiv.style.width = width + "px";
    mapDiv.style.height = height + "px";
    map.invalidateSize();
    //Export bounds
    var extend = document.getElementById("print-extend").value;
    if (extend != "") {
        if (extend == "pointdata") {
            if (pointLayer.toGeoJSON().features.length > 0) {
                map.fitBounds(pointLayer.getBounds(), {
                    padding: [10, 10]
                });
            }
        }
        else if (extend == "linedata") {
            if (lineLayer.toGeoJSON().features.length > 0) {
                map.fitBounds(lineLayer.getBounds(), {
                    padding: [10, 10]
                });
            }
        }
        else if (extend == "areadata") {
            if (areaLayer.toGeoJSON().features.length > 0) {
                map.fitBounds(areaLayer.getBounds(), {
                    padding: [10, 10]
                });
            }
        }
    }
    document.getElementsByClassName("leaflet-control-container")[0].style.visibility = "hidden";
    document.getElementsByClassName("leaflet-control-attribution")[0].style.visibility = "visible";
    var isCrosshairOn = null;
    if (map.hasLayer(crosshair)) {
        isCrosshairOn = true;
    } else {
        isCrosshairOn = false;
    }


    setTimeout(function () {
        var saveToDropboxCheckbox = document.getElementById("saveToDropboxCheckbox").checked;
        htmlToImage.toCanvas(mapDiv)
            .then(function (canvas) {
                if (run == "0") { //prenvent issues with canvases
                    run = "1";
                    printMap();
                    return false;
                }

                var href = canvas.toDataURL('image/png');
                if (outputFormat == "PNG") {
                    //save to dropbox or local file
                    if (saveToDropboxCheckbox) {
                        //convert image url to file
                        var base64ImageContent = href.replace(/^data:image\/(png|jpg);base64,/, "");
                        var file = base64ToBlob(base64ImageContent, 'image/png', '.png');
                        upload(file);
                        if (mobileMode && isCrosshairOn) {
                            map.addLayer(crosshair);
                        }
                    } else {
                        var base64ImageContent = href.replace(/^data:image\/(png|jpg);base64,/, "");
                        var file = base64ToBlob(base64ImageContent, 'image/png', '.png');
                        saveAs(file, maptitle + '.png');
                        if (mobileMode && isCrosshairOn) {
                            map.addLayer(crosshair);
                        }
                    }
                    restoreToNormal();

                }
                else if (outputFormat == "JPG") {
                    //save to dropbox or local file
                    if (saveToDropboxCheckbox) {
                        //convert image url to file
                        var base64ImageContent = href.replace(/^data:image\/(png|jpg);base64,/, "");
                        var file = base64ToBlob(base64ImageContent, 'image/png', '.jpg');
                        upload(file);
                        if (mobileMode && isCrosshairOn) {
                            map.addLayer(crosshair);
                        }
                    } else {
                        var base64ImageContent = href.replace(/^data:image\/(png|jpg);base64,/, "");
                        var file = base64ToBlob(base64ImageContent, 'image/png', '.jpg');
                        saveAs(file, maptitle + '.jpg');
                        if (mobileMode && isCrosshairOn) {
                            map.addLayer(crosshair);
                        }
                    }
                    restoreToNormal();
                }
                else {
                    //alert("Printing Line is not supported");
                    //var element = document.getElementById("outDiv");
                    var opt = {
                        pagebreak: "avoid-all",
                        //margin:       0,
                        filename: maptitle + ".pdf",
                        image: {
                            type: "png"
                        }, //, quality: 1 
                        html2canvas: {
                            useCORS: true,
                            /*width:width, height:height, windowWidth:width, windowHeight:height*/
                        }, //,   removeContainer:true 
                        jsPDF: {
                            unit: "px",
                            format: [width, height],
                            orientation: paperOrientation
                        }
                    };

                    if (saveToDropboxCheckbox) {
                        var doc = new jsPDF({
                            unit: "px",
                            format: [width, height],
                            orientation: paperOrientation
                        });
                        doc.addImage(href, 'png', 0, 0, width, height);
                        var pdfObj = doc.output('datauristring');
                        //console.log(pdfObj);
                        var file = dataURItoBlob(pdfObj); // base64ToBlob(pdfObj,'application/pdf', '.pdf');  
                        //console.log(file);
                        upload(file);
                        restoreToNormal();
                        if (mobileMode && isCrosshairOn) {
                            map.addLayer(crosshair);
                        }
                    } else {
                        var doc = new jsPDF({
                            unit: "px",
                            format: [width, height],
                            orientation: paperOrientation
                        });
                        doc.addImage(href, 'png', 0, 0, width, height);
                        doc.save(maptitle + ".pdf");
                        restoreToNormal();
                        if (mobileMode && isCrosshairOn) {
                            map.addLayer(crosshair);
                        }
                    }
                }
            });

        function restoreToNormal() {
            //Restore everything to normal
            mapDiv.style.width = 100 + "%";
            mapDiv.style.height = 100 + "%";
            map.invalidateSize();
            document.getElementsByClassName("leaflet-control-container")[0].style.visibility = "visible";
            printingLoading.style.display = 'none'; //hide loading
            document.getElementById("mapTitle").style.visibility = "hidden"; //show map title
        }

        function upload(blob) {
            showLoadingDropbox("show");
            showLoadingDropboxSpinner("show");
            var filename = "";
            if (outputFormat == "PNG") {
                filename = maptitle + '.png';
            } else {
                filename = maptitle + '.pdf';
            }
            var fd = new FormData();
            fd.append('name', "data");
            fd.append('data', blob);
            $.ajax({
                type: 'POST',
                url: 'data/temp.php',
                data: fd,
                processData: false,
                contentType: false
            }).done(function (data) {
                //console.log(data);
                if (data == "filesize") {
                    alert("Generated file is too big");
                } else if (data == "error") {
                    alert("An error has occured");
                } else if (data == "wongfile") {
                    alert("Only geojson, pdf and png files are allowed");
                } else {
                    alert(data);
                    var url = "https://kei1110.co.ke/app/data-collector/data/temp/" + data;
                    console.log(url);
                    Dropbox.save(url, filename, dropboxOptions);
                }
            });
        }

        function base64ToBlob(base64, mime, extension) {
            mime = mime || '';
            var sliceSize = 1024;
            var byteChars = window.atob(base64);
            var byteArrays = [];
            for (var offset = 0, len = byteChars.length; offset < len; offset += sliceSize) {
                var slice = byteChars.slice(offset, offset + sliceSize);
                var byteNumbers = new Array(slice.length);
                for (var i = 0; i < slice.length; i++) {
                    byteNumbers[i] = slice.charCodeAt(i);
                }
                var byteArray = new Uint8Array(byteNumbers);
                byteArrays.push(byteArray);
            }
            return new File(byteArrays, maptitle + extension, {
                type: mime
            });
        }

        function dataURItoBlob(dataURI) {
            // convert base64 to raw binary data held in a string
            // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
            var byteString = atob(dataURI.split(',')[1]);
            // separate out the mime component
            var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
            // write the bytes of the string to an ArrayBuffer
            var ab = new ArrayBuffer(byteString.length);
            // create a view into the buffer
            var ia = new Uint8Array(ab);
            // set the bytes of the buffer to the correct values
            for (var i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }
            // write the ArrayBuffer to a blob, and you're done
            var file = new File([ab], maptitle + ".pdf", {
                type: mimeString
            });
            return file;
        }


    }, 6000);

}

//manage opening and closing of feature
//openClosePopups(action, layerOpen = "all")

map.on("overlayadd", function (e) {
    if (e.layer === pointLayerLabels) {
        openClosePopups("open", "point");
    }
    if (e.layer === lineLayerLabels) {
        openClosePopups("open", "line");
    }
});

map.on("overlayremove", function (e) {
    if (e.layer === pointLayerLabels) {
        openClosePopups("close", "point");
    }
    if (e.layer === lineLayerLabels) {
        openClosePopups("close", "line");
    }
});

function openClosePopups(action, layerOpen = "all") {
    if (action == "open") {
        if (layerOpen == "point") {
            pointLayer.eachLayer(function (feature) {
                if (feature.feature.properties.label.length > 0) {
                    feature.openPopup();
                } else {
                    feature.closePopup();
                }
            });
        }
        else if (layerOpen == "line") {
            lineLayer.eachLayer(function (feature) {
                if (feature.feature.properties.label.length > 0) {
                    feature.openPopup();
                } else {
                    feature.closePopup();
                }
            });
        }
        else if (layerOpen == "area") {
            areaLayer.eachLayer(function (feature) {
                if (feature.feature.properties.label.length > 0) {
                    feature.openPopup();
                } else {
                    feature.closePopup();
                }
            });
        }
        else {
            pointLayer.eachLayer(function (feature) {
                if (feature.feature.properties.label.length > 0) {
                    feature.openPopup();
                } else {
                    feature.closePopup();
                }
            });
            lineLayer.eachLayer(function (feature) {
                if (feature.feature.properties.label.length > 0) {
                    feature.openPopup();
                } else {
                    feature.closePopup();
                }
            });
            areaLayer.eachLayer(function (feature) {
                if (feature.feature.properties.label.length > 0) {
                    feature.openPopup();
                } else {
                    feature.closePopup();
                }
            });
        }

    } else {
        if (layerOpen == "point") {
            pointLayer.eachLayer(function (feature) {
                feature.closePopup();
            });
        }
        else if (layerOpen == "line") {
            lineLayer.eachLayer(function (feature) {
                feature.closePopup();
            });
        }
        else if (layerOpen == "area") {
            areaLayer.eachLayer(function (feature) {
                feature.closePopup();
            });
        }
        else {
            pointLayer.eachLayer(function (feature) {
                feature.closePopup();
            });
            lineLayer.eachLayer(function (feature) {
                feature.closePopup();
            });
            areaLayer.eachLayer(function (feature) {
                feature.closePopup();
            });
        }
    }
}

//LENGTH AND AREA 
function getLength(unitOfMeasure = 'foot') {
    var coordinates = [];
    /*IntermidiateShapeDraw.getLatLngs().forEach(element => {
        coordinates.push([element.lng, element.lat]);
    });*/
    //turn 
    var line = turf.lineString(IntermidiateShapeDraw.toGeoJSON().geometry.coordinates);
    var lengthImperial = turf.length(line, { units: 'miles' });
    var lengthMetric = turf.length(line, { units: 'kilometers' });
    //conversions
    var length = 0;
    var unitOfMeasureshort = 'ft';
    if (unitOfMeasure == 'foot') {
        length = 5280 * lengthImperial;
        unitOfMeasureshort = 'ft.';
    }
    else if (unitOfMeasure == 'yard') {
        length = 1760 * lengthImperial;
        unitOfMeasureshort = 'yd.';
    }
    else if (unitOfMeasure == 'miles') {
        length = lengthImperial;
        unitOfMeasureshort = 'mi.';
    }
    else if (unitOfMeasure == 'centimeters') {
        length = 100000 * lengthMetric;
        unitOfMeasureshort = 'cm';
    }
    else if (unitOfMeasure == 'meters') {
        length = 1000 * lengthMetric;
        unitOfMeasureshort = 'm';
    }
    else if (unitOfMeasure == 'kilometers') {
        length = lengthMetric;
        unitOfMeasureshort = 'km';
    }
    return { 'val': length, 'unit': unitOfMeasureshort };
}

function getArea(feature, unitOfMeasure = 'foot') {
    //turf
    var polygon = turf.polygon(feature.geometry.coordinates);
    var areaMeters = turf.area(polygon);

    //conversions
    var area = 0;
    var unitOfMeasureshort = 'ft';
    if (unitOfMeasure == 'foot') {
        area = 10.7639 * areaMeters;
        unitOfMeasureshort = 'sq ft.';
    }
    else if (unitOfMeasure == 'yard') {
        area = 1.19599 * areaMeters;
        unitOfMeasureshort = 'sq yd.';
    }
    else if (unitOfMeasure == 'miles') {
        area = 0.0000003861 * areaMeters;
        unitOfMeasureshort = 'sq mi.';
    }
    else if (unitOfMeasure == 'centimeters') {
        area = 10000 * areaMeters;
        unitOfMeasureshort = 'sq cm';
    }
    else if (unitOfMeasure == 'meters') {
        area = areaMeters;
        unitOfMeasureshort = 'sq m';
    }
    else if (unitOfMeasure == 'kilometers') {
        area = 0.000001 * areaMeters;
        unitOfMeasureshort = 'sq km';
    }
    return { 'val': area, 'unit': unitOfMeasureshort };
}


L.control.polylineMeasure({
    position: 'topleft',
    unit: 'landmiles',
    showBearings: false,
    clearMeasurementsOnStop: false,
    showClearControl: true,
    showUnitControl: false,
}).addTo(map);


L.geolet({
    position: 'topleft',
    minZoom: '21'
}).addTo(map);



 /*L.easyButton('fa-sync', function (btn, map) {
    location.reload();
}).addTo(map);*/

L.control.scale({metric: false}).addTo(map);

//Global Settings
var modalSettings = document.getElementById("modalSettings");

var modalSettingCloseBtn = document.getElementById("modalSettingsCloseBtn");
modalSettingCloseBtn.onclick = function () {
    modalSettings.style.display = "none";
}

var settingsBtn = L.easyButton({
    position: 'topright',
    states: [{
        icon: '<span class="fa fa-cog"></span>',
        title: 'Settings',
        onClick: function () {
            modalSettings.style.display = "block";
        }
    }]
}).addTo(map);

var pcolor = document.getElementById("pcolor");
var acolor = document.getElementById("lcolor");
var acolor = document.getElementById("acolor");


pcolor.addEventListener('change', (e)=>{
    var c = pcolor.value;
    poinLabelColor = c;
    var event = new CustomEvent("pcc", { bubbles: true, detail: { color: c } });
    document.dispatchEvent(event);
});

lcolor.addEventListener('change', ()=>{
    var c = lcolor.value;
    lineLabelColor = c;
    var event = new CustomEvent("lcc", { bubbles: true, detail: {color: c} });
    document.dispatchEvent(event);
});

acolor.addEventListener('change', ()=>{
    var c = acolor.value;
    areaLabelColor = c;
    var event = new CustomEvent("acc", { bubbles: true, detail: { color: c } });
    document.dispatchEvent(event);
});

var snappingToggler = document.getElementById("snappingToggler");
snappingToggler.addEventListener('change', () => {
    var snappingMode = snappingToggler.checked;
    if (snappingMode) {
        toggleSnapping(true);
    }
    else {
        toggleSnapping(false);
    }
});

function toggleSnapping(snap) {
    var shapes = map.pm.Draw.shapes;
    shapes.forEach(element => {
        map.pm.Draw[element].options.snappable = snap;
    });
}
document.addEventListener('DOMContentLoaded', function () {
    snappingToggler.dispatchEvent(new Event('change'));//trigger on changer
}, false);


document.addEventListener('pcc', (e)=>{
    //console.log(e);
});

