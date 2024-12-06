import React, { useEffect, useState, useRef } from 'react';
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';

const mapContainerStyle = {
  height: "50vh",
  width: "100%"
};

// Default center is northwestern
const defaultCenter = {
  lat: 42.0565,
  lng: -87.6753
};

const GoogleMapComponent = ({ fridges }) => {
  const [locations, setLocations] = useState([]);
  const [infoWindow, setInfoWindow] = useState(null); // Track InfoWindow state
  const mapRef = useRef(null);

  useEffect(() => {
    const geocodeAddresses = async () => {
      const geocoder = new window.google.maps.Geocoder();
      const locationPromises = Object.entries(fridges).map(([id, fridge]) => {
        return new Promise((resolve) => {
          geocoder.geocode({ address: fridge.address }, (results, status) => {
            if (status === "OK") {
              const coordinates = results[0].geometry.location;
              resolve({
                id,
                location: { lat: coordinates.lat(), lng: coordinates.lng() },
                fridge
              });
            } else {
              console.error("Geocode failed for: " + fridge.address);
              resolve(null);
            }
          });
        });
      });

      const resolvedLocations = await Promise.all(locationPromises);
      const filteredLocations = resolvedLocations.filter((location) => location !== null);
      setLocations(filteredLocations);

      if (filteredLocations.length > 0 && mapRef.current) {
        const bounds = new window.google.maps.LatLngBounds();
        filteredLocations.forEach(({ location }) => bounds.extend(location));
        mapRef.current.fitBounds(bounds);
      }
    };

    geocodeAddresses();
  }, [fridges]);

  const handleMarkerClick = (clickedMarker) => {
    setInfoWindow(clickedMarker); // Open the InfoWindow for the selected marker
    if (mapRef.current) {
      mapRef.current.setCenter(clickedMarker.location);
      mapRef.current.setZoom(15);
    }
  };

  const handleMapClick = () => {
    setInfoWindow(null); // Close InfoWindow when clicking on the map
    if (mapRef.current) {
      mapRef.current.setZoom(5);
      mapRef.current.setCenter(defaultCenter);
    }
  };

  return (
    <div className="h-[50vh]">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={defaultCenter}
        zoom={5}
        onLoad={(map) => (mapRef.current = map)}
        onClick={handleMapClick}
      >
        {locations.map((marker) => (
          <Marker
            key={marker.id}
            position={marker.location}
            onClick={() => handleMarkerClick(marker)}
          />
        ))}

        {infoWindow && (
          <InfoWindow
            position={infoWindow.location}
            onCloseClick={() => setInfoWindow(null)}
          >
            <div>
              <h3>{infoWindow.fridge.displayName}</h3>
              <p>{infoWindow.fridge.address}</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
};

export default GoogleMapComponent;
