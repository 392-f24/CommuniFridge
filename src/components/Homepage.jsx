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

    const [fridges, error] = useDbData('/fridges');

    if (error) return <h1>Error loading data: {error.toString()}</h1>;
    if (fridges === undefined) return <h1>Loading data...</h1>;
    if (!fridges) return <h1>No fridges found</h1>;

    const goToFridge = (id) => {
        navigate(`/fridge/${id}`);
    }
    
    return (
        <div className="overflow-y-hidden">
            {isLoaded ? (
                <GoogleMapComponent 
                    addresses={Object.entries(fridges).map(([id, fridge]) => fridge.address)} 
                    setMarker={setMarker} 
                />
            ) : (
                <div>Loading Google Maps...</div>
            )}

            
            <div className="mt-4 flex flex-col space-y-4 items-center">
                {Object.entries(fridges).map(([id, fridge]) => (
                    <button
                        key={id}
                        onClick={() => goToFridge(id)}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                    >
                        View {fridge.displayName} Fridge
                    </button>
                ))}
            </div>
        </div>


    );
}

export default HomePage;
