/* eslint-disable no-unused-expressions */

import Map, {NavigationControl, Marker} from 'react-map-gl';
import React, { useState} from 'react'; 
import maplibregl from 'maplibre-gl';

const MapScreen = () => {


    // this.props.parentCallback("Hey Popsie, How’s it going?");
    const fetchLocationName = async (lat,lng) => {
        await fetch(
          'https://www.mapquestapi.com/geocoding/v1/reverse?key=oTp9yDZGbfsrdvsiTTMH8VsLUjwDWed6&location='+lat+'%2C'+lng+'&outFormat=json&thumbMaps=false',
        )
          .then((response) => response.json())
          .then((responseJson) => {
            console.log(
              JSON.stringify(responseJson.results[0].locations[0].street),
              JSON.stringify(responseJson.results[0].locations[0].adminArea5),
              JSON.stringify(responseJson.results[0].locations[0].adminArea3),
              JSON.stringify(responseJson.results[0].locations[0].adminArea1))
              setCountry(responseJson.results[0].locations[0].adminArea1)
              setCity(responseJson.results[0].locations[0].adminArea5)
          });
      };
    const [country, setCountry] = useState('');  
    const [city, setCity] = useState('');  
    const [lng, setLng] = useState(null);
    const [lat, setLat] = useState(null);
  
    navigator.geolocation.getCurrentPosition(function(position) {
      console.log('Available');
      setLng(position.coords.longitude)
      setLat(position.coords.latitude)
    });
    function MarkerChanger (e) {
        setLng(e.lngLat.lng)
        setLat(e.lngLat.lat)
        fetchLocationName(e.lngLat.lat,e.lngLat.lng)
      }
if (lng != null) {
    return (
        <>
        <Map mapLib={maplibregl} onDblClick={MarkerChanger} onTouchStart={MarkerChanger}
        initialViewState={{
            latitude:lat,
            longitude:lng,
          zoom: 10
        }}
        style={{width: "70%", height: "40%"}}
        mapStyle="https://api.maptiler.com/maps/streets/style.json?key=mcVE68813UHdm7Exiqs8"
        >
        <NavigationControl position="top-left" />
      
        <Marker latitude={lat} longitude={lng} color="Red" draggable={true} onDragEnd={MarkerChanger} />
      </Map> 
    <input  name="country" type="hidden" value={country}/>
    <input name="city" type="hidden" value={city}/>
    <input  name="lng" type="hidden" value={lng}/>
    <input name="lat" type="hidden" value={lat}/></>
     
    )
}else{
    return (
        <>
        {/* test */}
        <Map mapLib={maplibregl} onDblClick={MarkerChanger} onTouchStart={MarkerChanger}
        initialViewState={{
            latitude:1.3241,
            longitude:2.342,
          zoom: 10
        }}
        style={{width: "70%", height: "40%"}}
        mapStyle="https://api.maptiler.com/maps/streets/style.json?key=mcVE68813UHdm7Exiqs8"
        >
        <NavigationControl position="top-left" />
      
        <Marker latitude={1.3241} longitude={2.342} color="Red" draggable={true} onDragEnd={MarkerChanger} />
      </Map> 
    <input  name="country" type="hidden" value={country}/>
    <input name="city" type="hidden" value={city}/>
    <input  name="lng" type="hidden" value={1.3241}/>
    <input name="lat" type="hidden" value={2.342}/></>
    )
}




};

export default MapScreen;