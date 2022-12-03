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

//BASE LAYERS
var emptyBaseMap = L.tileLayer('');

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

var api = 'AAPKb95b9b22694e46889217b715f22d3cfa8uHoTQ_31shTI-8CHlPVDysfTrz6eW05ThQVoi2v4UQWOpMPkcJ_qCAvHvsfHy5t';
var serviceUrl = 'https://basemaps-api.arcgis.com/arcgis/rest/services/styles/ArcGIS:Imagery?type=style&token=' + api;
var credits = 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012 etc. etc. etc.';
// not addTO(map)
var EsriMaps = L.tileLayer(serviceUrl, { attribution: credits });

var layer_ESRIWorldImagery_1 = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    opacity: 1.0,
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
    minZoom: 1,
    maxZoom: 22,
    minNativeZoom: 0,
    maxNativeZoom: 22,
    //crossOrigin: "anonymous",
    noWrap: true,
});

var Thunderforest_MobileAtlas = L.tileLayer('https://tile.thunderforest.com/mobile-atlas/{z}/{x}/{y}.png?apikey=88890c0428ce4922826f50d2783c4ebc', {
    attribution: '&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    //apikey: 'd07fb9f393a14458874afbf0f62d4b26', change api key to match yours
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
    layers: [EsriMaps],//mapBoxSatellite
    rotate: true,
    worldCopyJump: false,
    tap: false,
    maxBounds: [[-90, -180], [90, 180]]
})
    .setView([37.09024, -95.712891], 3);

var hash = new L.Hash(map);
map.attributionControl.setPrefix('<a href="https://leafletjs.com" title="A JS library for interactive maps">Leaflet</a>');
var autolinker = new Autolinker({
    truncate: {
        length: 30,
        location: 'smart'
    }
});
map.on('baselayerchange', function (e) {
    //console.log(e.layer);
    currentLayerID = e.layer._leaflet_id;
    //console.log(currentLayerID);
});
//COMPASS
/*var compass = new L.Control.Compass({
    autoActive: false,
    position: "bottomleft",
});
map.addControl(compass);
compass.setAngle(0);*/

//GEOCODER
var osmGeocoder = new L.Control.Geocoder({
    position: 'topright',
    expand: 'click',
    defaultMarkGeocode: false
}).on('markgeocode', function (e) {
    map.setView(e.geocode.center, 20
    );
}).addTo(map);
document.getElementsByClassName('leaflet-control-geocoder-icon')[0]
    .className += ' fa fa-search';
document.getElementsByClassName('leaflet-control-geocoder-icon')[0]
    .title += 'Search for a place';

//LEAFLET LAYER CONTROL
var baseMaps = {
    "ESRI Test": EsriMaps,
    "ESRI World Imagery": layer_ESRIWorldImagery_1,
    "OpenStreetMap": layer_OpenStreetMap_0,
    "Mobile Atlas": Thunderforest_MobileAtlas,
    "Mapbox Satellite": mapBoxSatellite,
    "No Basemap": emptyBaseMap,
};
var overlayLayer = {};
var layerControl = L.control.layers(baseMaps, overlayLayer, { position: 'topright' });
layerControl.addTo(map);

L.control.zoom({
    position: 'topleft',
}).addTo(map);

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
    dragMode: true
};
//add options to map for geoman -- check editing toggling for  
//thats where the toolbard is added to map
map.pm.addControls(options);
map.pm.Toolbar.drawContainer.style.display = "none"; //Hide Toolbar until edit mode is toggled
map.pm.Toolbar.editContainer.style.display = "none"; //Hide Toolbar until edit mode is toggled

/*var zoneIcon = L.icon({
    shadowUrl: null,
    iconAnchor: new L.Point(40, 80),
    iconSize: new L.Point(80, 80),
    popupAnchor: [0, -80],
    //tooltipAnchor: [0, -80],
    iconUrl: 'images/markers/Leaflet_Zone.png',
    crossOrigin:"anonymous",
})*/

var zoneIcon = L.divIcon({
    className: '',
    html: '<i class="color-blue fa fa-map-marker-alt fa-5x"></i>',
    iconAnchor: new L.Point(23, 60),
    iconSize: new L.Point(20, 20),
    popupAnchor: [35, -50],
});

/*var zoneIcon = L.divIcon({
    className: '<i class="color-blue fa fa-map-marker-alt fa-5x"></i>',
    html: '',
    iconAnchor: new L.Point(10, 10),
    iconSize: new L.Point(20, 20),
    popupAnchor: [0, -10],
});*/

/*var zoneValveIcon = L.divIcon({
    className: '',
    html: '<i class="color-green fa fa-caret-square-down fa-2x"></i>',
    iconAnchor: new L.Point(10, 20),
    iconSize: new L.Point(20, 20),
    popupAnchor: [0, -20],
});*/

var zoneValveIcon = L.divIcon({
    className: '',
    html: '<div class="zoneValve-geoman">ZV</div>',
    iconAnchor: new L.Point(10, 10),
    iconSize: new L.Point(20, 20),
    popupAnchor: [0, -10],
});

/*var rotorHeadIcon = L.divIcon({
    className: '',
    html: '<i class="color-gray fa fa-bullseye fa-2x"></i>',
    iconAnchor: new L.Point(10, 10),
    iconSize: new L.Point(20, 20),
    popupAnchor: [0, -10],
});*/
var rotorHeadIcon = L.divIcon({
    className: '',
    html: '<div class="rotor-head-icon"><div class="rotorHeadInner"></div></div>',
    iconAnchor: new L.Point(10, 10),
    iconSize: new L.Point(20, 20),
    popupAnchor: [-5, 0],
});

/*var sprayHeadIcon = L.divIcon({
    className: '',
    html: '<div class="color-gray-spray-head-div">SH</div>',
    iconAnchor: new L.Point(10, 10),
    iconSize: new L.Point(20, 20),
    popupAnchor: [0, -10],
});*/

var sprayHeadIcon = L.divIcon({
    className: '',
    html: '<div class="spray-head-icon"></div>',
    iconAnchor: new L.Point(8, 8),
    iconSize: new L.Point(20, 20),
    popupAnchor: [-8, 0],
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

var othersIcon = L.divIcon({
    className: '',
    html: '<div class="color-orange-others-div">O</div>',
    iconAnchor: new L.Point(10, 10),
    iconSize: new L.Point(20, 20),
    popupAnchor: [0, -10],
});

function setSylePointJSON(name) {
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
        return othersIcon;
    }
}

function setSyleLineJSON(style, color, opacity) {
    var style1 = {
        weight: 2,
        opacity: opacity,
        color: color,
        dashOffset: '20'
    }
    if (style == 'Dotted') {
        style1['dashArray'] = '10, 10';
    }
    return style1;
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

/*map.pm.enableDraw('Line', {
    tooltips: false,
});*/
//map.pm.disableDraw();

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
        icon: othersIcon
    },
    tooltips: false,
});

//Toggle Editin on or off
function toggleEditing(state) {
    var buttonsArr = map.pm.Toolbar.getButtons();
    if (state) {
        for (var i in buttonsArr) {
            var key = i;
            //console.log(key);
            map.pm.Toolbar.setButtonDisabled(key, state);
        }
    } else {
        for (var i in buttonsArr) {
            var key = i;
            map.pm.Toolbar.setButtonDisabled(key, state);
        }
    }
}

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
        layer.bindPopup(styledPopUP(feature.properties.label), {
            autoClose: false
        });
        layer.on('click', layerOnclickFunction);
    }
}).addTo(map);
//on each point layer
function pointToLayer(feature, latlng) {
    return L.marker(latlng, {
        icon: setSylePointJSON(feature.properties.name),
        interactive: true
    });
}
//open popup on layer add
pointLayer.on('layeradd', function (event) {
    setTimeout(function () {
        openClosePopups("open", "point");
    }, 10);
});

layerControl.addOverlay(pointLayer, "Point Data");
//layerControl.addOverlay(pointLayerLabels, "Point Data Labels");

var lineLayerLabels = L.geoJson(null); //control labels
var lineLayer = L.geoJson(null, {
    style: function (feature) {
        return setSyleLineJSON(feature.properties.style, feature.properties.color, feature.properties.opacity);
    },
    onEachFeature: function (feature, layer) {
        layer.bindPopup(styledPopUP(feature.properties.label), {
            autoClose: false
        });

        layer.on('click', layerOnclickFunction);
    },
}).addTo(map);
//open popup on layer add
lineLayer.on('layeradd', function (event) {
    setTimeout(function () {
        openClosePopups("open", "line");
    }, 10);
});
layerControl.addOverlay(lineLayer, "Line Data");
//layerControl.addOverlay(lineLayerLabels, "Line Data Labels");

var areaLayerLabels = L.geoJson(null); //control labels
var areaLayer = L.geoJson(null, {
    style: function (feature) {
        return setSyleAreaJSON(feature.properties.style, feature.properties.color, feature.properties.opacity);
    },
    onEachFeature: function (feature, layer) {
        layer.bindPopup(styledPopUP(feature.properties.label), {
            autoClose: false
        });

        layer.on('click', layerOnclickFunction);
    },
}).addTo(map);
//open popup on layer add
areaLayer.on('layeradd', function (event) {
    setTimeout(function () {
        openClosePopups("open", "area");
    }, 10);
});
layerControl.addOverlay(areaLayer, "Polygon Data");
//layerControl.addOverlay(areaLayerLabels, "Area Data Labels");

//on layer click
function layerOnclickFunction(e) {
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
    if (shape == 'point') {
        nameInput.value = IntermidiateShapeDraw.pm._shape;
        nameInputHolder.classList.remove("d-none");
        lineInputHolder.classList.add("d-none");
        lengthInput.classList.add("d-none");
        areaInputHolder.classList.add("d-none");
        areaInput.classList.add("d-none");
        lineAreaStyleHolder.classList.add("d-none");
    }
    else if (shape == 'polyline') {
        //hide name input 
        nameInputHolder.classList.add("d-none");
        areaInputHolder.classList.add("d-none");
        areaInput.classList.add("d-none");
        //show line input values
        lineInputHolder.classList.remove("d-none");
        lengthInput.classList.remove("d-none");
        var length = getLength('foot');
        lengthInputVal.value = length.val;
        if (isNewFeature) {
            labelInput.value = (length.val).toFixed(2) + " " + length.unit;
        }
        lineAreaStyleHolder.classList.remove("d-none");
    }
    else {
        //hide name input
        nameInputHolder.classList.add("d-none");
        lineInputHolder.classList.add("d-none");
        lengthInput.classList.add("d-none");
        //show area input values
        areaInputHolder.classList.remove("d-none");
        areaInput.classList.remove("d-none");
        var area = getArea('foot');
        areaInputVal.value = area.val;
        if (isNewFeature) {
            labelInput.value = (area.val).toFixed(2) + " " + area.unit;
        }
        lineAreaStyleHolder.classList.remove("d-none");
    }
}

map.on('pm:create', function (e) {
    getDates();
    isNewFeature = true;
    IntermidiateShapeDraw = e.layer;
    //Edit box show
    var shape = checkAttrName(IntermidiateShapeDraw.pm._shape)

    labelInput.value = "";
    notesInput.value = "";

    handleDisplay(shape)

    dateCreatedInput.value = dateTime;
    dateModifiedInput.value = dateTime;
    attributeBox.style.display = "block";
    //toggle editing off until saving of marker is achieved
    toggleEditing(true);
    //crosshair.bringToFront();
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
    } else {
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

    if (shape == 'point') {//check if its point
        //properties
        feature['properties'] = {
            'uuid': uuid,
            'shape': shape,
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
        uuid = lineLayer.toGeoJSON().features.length + 1;

        feature['geometry'] = {
            'type': 'Polygon',
            'coordinates': IntermidiateShapeDraw.toGeoJSON().geometry.coordinates,
        };
        //console.log(IntermidiateShapeDraw.toGeoJSON().geometry.coordinates);

        //get length accepts measurement units: miles, foot, yard, kilometers, meters, centimeters
        var area = getArea('foot');
        feature['properties'] = {
            'uuid': uuid,
            'shape': shape,
            'label': label.value,
            'name': nameInputArea.value,
            'style': style.value,
            'color': color.value,
            'opacity': opacity.value,
            'area': area.value,
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
    handleDisplay(shape);
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

function styledPopUP(bodyText) {
    var popupContent =
        '<div style="padding:2px; padding-right:0; font-size:16px;">' + bodyText + '</div>' +
        //'<div style="padding:5px;#99badd">'+IntermidiateShapeDraw.feature.properties.notes+'</div>'+
        '<a style="margin:5px; display:none; " class="editFeatureButton" onClick="editCurrentFeature()">Edit</a>';
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
            compass.setAngle(map.getBearing() + 5);
        }
    }]
});

var minusRotation = L.easyButton({
    states: [{
        icon: '<span class="fa fa-undo"></span>',
        title: 'Rotate Left -5',
        onClick: function () {
            map.setBearing(map.getBearing() - 5); //set map bearing to allow roatation
            compass.setAngle(map.getBearing() - 5);
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
    if (map.hasLayer(layer_ESRIWorldImagery_1)) {
        return
    }
}

function getActiveTileLayer() {
    if (map.hasLayer(layer_ESRIWorldImagery_1)) {
        return layer_ESRIWorldImagery_1;
    } else {
        return layer_OpenStreetMap_0;
    }
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
        } else {
            if (lineLayer.toGeoJSON().features.length > 0) {
                map.fitBounds(lineLayer.getBounds(), {
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

                } else {
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

function getArea(unitOfMeasure = 'foot') {
    var coordinates = [];
    /*IntermidiateShapeDraw.getLatLngs().forEach(element => {
        coordinates.push([element.lng, element.lat]);
    });*/
    //turn
    var polygon = turf.polygon(IntermidiateShapeDraw.toGeoJSON().geometry.coordinates);
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



L.easyButton('fa-sync', function (btn, map) {
    location.reload();
}).addTo(map);



