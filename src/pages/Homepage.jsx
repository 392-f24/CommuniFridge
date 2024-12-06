import { useJsApiLoader } from '@react-google-maps/api';
import { useDbData } from '../utilities/firebase';
import GoogleMapComponent from '../components/GoogleMapComponent';
import { useNavigate } from 'react-router-dom';

const places = ['places'];

const HomePage = () => {
  const navigate = useNavigate();

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_API_KEY,
    libraries: places,
  });

  const [fridges, error] = useDbData('/fridges');

  if (error) return <h1>Error loading data: {error.toString()}</h1>;
  if (fridges === undefined) return <h1>Loading data...</h1>;
  if (!fridges) return <h1>No fridges found</h1>;

  const goToFridge = (id) => {
    navigate(`/fridge/${id}`);
  };

  return (
    <div className="overflow-y-hidden bg-yellow-200">
      {isLoaded ? (
        <GoogleMapComponent fridges={fridges} />
      ) : (
        <div>Loading Google Maps...</div>
      )}

      <div className="display-block items-center">
        {Object.entries(fridges).map(([id, fridge]) => (
          <button
            key={id}
            onClick={() => goToFridge(id)}
            className="bg-yellow-300 text-xl font-bold py-5 w-[50%] h-[25vh] hover:bg-yellow-300 transition border-2 border-yellow-400"
          >
            <span className="shadow-md shadow-yellow-400">{fridge.displayName} Fridge</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
