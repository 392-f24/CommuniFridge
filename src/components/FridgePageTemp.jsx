import { useDbData } from "../utilities/firebase";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import FridgeCard from "./FridgeCard";

const FridgePageTemp = () => {
    const { fridgeId } = useParams();
    const navigate = useNavigate();
    const [fridge, error] = useDbData(`/fridges/${fridgeId}`); 

    if (error) return <h1>Error loading data: {error.toString()}</h1>;
    if (fridge === undefined) return <h1>Loading data...</h1>;
    if (!fridge.items) return <h1>No items found</h1>;

    const goToHome = () => {
        navigate('/');
    }

    return (
        <div>
            <div>
                <h1 className="text-3xl font-semibold text-center text-blue-800 mb-6">{fridge.displayName} Fridge</h1>
                {Object.entries(fridge.items).map(([itemId, item]) => <FridgeCard key={itemId} fridgeId={fridgeId} itemId={itemId} item={item}/>)}
            </div>

            <div className="mt-4 flex flex-col space-y-4 items-center">
                <button
                    onClick={() => goToHome()}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                >
                    Back to Map
                </button>        
            </div>
        </div>
    );
    
};

export default FridgePageTemp;