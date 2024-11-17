// components/HomePage.jsx
import { useState } from 'react';
import { useJsApiLoader } from '@react-google-maps/api';
import { useDbData } from '../utilities/firebase';
import GoogleMapComponent from '../components/GoogleMapComponent';
import AddModal from './AddModal';

const HomePage = () => {
    const [marker, setMarker] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: "AIzaSyBc0C9RTODyfkqvUKu-TTssvwLchVqR6FU",
        libraries: ['places'],
    });

    const [listings, error] = useDbData('/locations');

    // if (error) return <h1>Error loading data: {error.toString()}</h1>;
    // if (listings === undefined) return <h1>Loading data...</h1>;
    // if (!listings) return <h1>No listings found</h1>;

    return (
        <div className="overflow-y-hidden">
            {/* {isLoaded ? (
                <GoogleMapComponent 
                    addresses={Object.entries(listings).map(([id, info]) => info.address)} 
                    setMarker={setMarker} 
                />
            ) : (
                <div>Loading Google Maps...</div>
            )} */}
            <button onClick={() => setIsOpen(true)} className="border-1 border-purple-500 bg-purple-300 p-2 rounded-md w-24 self-end">
                Add Item
            </button>
            {isOpen && <AddModal isOpen={isOpen} setIsOpen={setIsOpen} fridge="1" />}
        </div>
    );
}

export default HomePage;
