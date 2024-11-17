// components/HomePage.jsx
import { useState } from 'react';
import { useJsApiLoader } from '@react-google-maps/api';
import { useDbData } from '../utilities/firebase';
import GoogleMapComponent from './GoogleMapComponent';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const [marker, setMarker] = useState('');
    const navigate = useNavigate();

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: "AIzaSyBc0C9RTODyfkqvUKu-TTssvwLchVqR6FU",
        libraries: ['places'],
    });

    const [listings, error] = useDbData('/locations');

    if (error) return <h1>Error loading data: {error.toString()}</h1>;
    if (listings === undefined) return <h1>Loading data...</h1>;
    if (!listings) return <h1>No listings found</h1>;

    const goToFridge = () => {
        navigate('/fridge');
    }
    

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


            <div className="mt-4 flex justify-center">
                <button
                    onClick={goToFridge}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                >
                    View Fridge Content
                </button>
            </div>
        </div>


    );
}

export default HomePage;
