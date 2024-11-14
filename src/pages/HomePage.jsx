// components/HomePage.jsx
import { useState } from 'react';
import { useJsApiLoader } from '@react-google-maps/api';
import GoogleMapComponent from '../components/GoogleMapComponent';

const HomePage = () => {
    const [marker, setMarker] = useState('');

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: "AIzaSyBc0C9RTODyfkqvUKu-TTssvwLchVqR6FU",
        libraries: ['places'],
    });

    const listings = {
        1: { address: "620 Madison St, Evanston" },
        2: { address: "619 West Howard St, Evanston" },
        3: { address: "1601 Payne St, Evanston" },
        4: { address: "1335 Dodge Ave, Evanston" }
    };

    return (
        <div className="overflow-y-hidden">
            {isLoaded ? (
                <GoogleMapComponent 
                    addresses={Object.entries(listings).map(([id, info]) => info.address)} 
                    setMarker={setMarker} 
                />
            ) : (
                <div>Loading Google Maps...</div>
            )}
        </div>
    );
}

export default HomePage;
