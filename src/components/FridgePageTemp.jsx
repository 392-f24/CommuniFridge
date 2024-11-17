import { useDbData } from "../utilities/firebase";
import { useParams } from "react-router-dom";
import FridgeCard from "./FridgeCard";
import { useNavigate } from 'react-router-dom';

const FridgePageTemp = () => {
    const { fridgeId } = useParams();
    const [items, error] = useDbData(`/fridges/${fridgeId}/items`); 
    const navigate = useNavigate();


    console.log(`/fridges/${fridgeId}/items`);

    if (error) return <h1>Error loading data: {error.toString()}</h1>;
    if (items === undefined) return <h1>Loading data...</h1>;
    if (!items) return <h1>No items found</h1>;

    const goToHome = (id) => {
        navigate(`/`);
    }

    return (
        <div>
            <div>
                <h1>Fridge Items</h1>
                {Object.entries(items).map(([itemId, item]) => <FridgeCard key={itemId} fridgeId={fridgeId} itemId={itemId} item={item}/>)}
            </div>

            <div className="mt-4 flex flex-col space-y-4 items-center">
                <button
                    onClick={() => goToHome()}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                >
                    Home Page
                </button>        
            </div>
        </div>
    );
    
};

export default FridgePageTemp;