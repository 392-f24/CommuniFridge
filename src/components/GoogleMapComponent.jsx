import React, { useEffect, useState, useRef } from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';

const mapContainerStyle = {
  height: "16rem",
  width: "100%"
};

// Default center is northwestern
const defaultCenter = {
  lat: 42.0565,
  lng: -87.6753
};

const GoogleMapComponent = ({ addresses, setMarker }) => {
  const [locations, setLocations] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null); // Track the selected marker
  const mapRef = useRef(null);

  useEffect(() => {
    const geocodeAddresses = async () => {
      const geocoder = new window.google.maps.Geocoder();
      const locationPromises = addresses.map((address) => {
        return new Promise((resolve, reject) => {
          geocoder.geocode({ address: address }, (results, status) => {
            if (status === "OK") {
              const coordinates = results[0].geometry.location;
              resolve({ lat: coordinates.lat(), lng: coordinates.lng() });
            } else {
              console.error("Geocode was not successful for the following reason: " + status);
              resolve(null); // Resolve as null to skip failed geocodes
            }
          });
        });
      });

      const resolvedLocations = await Promise.all(locationPromises);
      const filteredLocations = resolvedLocations.map((location, index) => [location, addresses[index]])
                                                 .filter(([location, address]) => location !== null);
      setLocations(filteredLocations);

      // Adjust the map bounds based on marker locations
      if (filteredLocations.length > 0 && mapRef.current) {
        const bounds = new window.google.maps.LatLngBounds();
        filteredLocations.forEach(([location, address]) => bounds.extend(location));
        mapRef.current.fitBounds(bounds); // Fit map to the bounds of all markers
      }
    };

    if (addresses && addresses.length > 0) {
      geocodeAddresses();
    }
  }, [addresses]);

  const handleMarkerClick = (location, address) => {
    if (selectedMarker && selectedMarker.address === address) {
      // Return to the original map view if the same marker is clicked again
      setSelectedMarker(null);
      setMarker('');
      if (mapRef.current) {
        mapRef.current.setZoom(5); // Reset the zoom
        mapRef.current.setCenter(defaultCenter); // Reset to default center
      }
    } else {
      // Focus on the selected marker
      setSelectedMarker({ location, address });
      setMarker(address);
      if (mapRef.current) {
        mapRef.current.setCenter(location); // Center the map on the selected marker
        mapRef.current.setZoom(15); // Zoom in to show only the selected marker
      }
    }
  };

  return (
    <div className="h-50px">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={defaultCenter}
        zoom={5}
        onLoad={(map) => (mapRef.current = map)}
        onClick={() => {
          setSelectedMarker(null);
          setMarker('');
          if (mapRef.current) {
            mapRef.current.setZoom(5); // Reset the zoom
            mapRef.current.setCenter(defaultCenter); // Reset to default center
          }
        }}
      >
        {locations.map(([location, address], index) => (
          <Marker
            key={index}
            position={location}
            onClick={() => handleMarkerClick(location, address)}
          />
        ))}
      </GoogleMap>
    </div>
  );
};

export default GoogleMapComponent;
