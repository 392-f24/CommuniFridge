import { useDbData } from "../utilities/firebase";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import FridgeCard from "./FridgeCard";
import AddModal from "./AddModal";

const FridgePageTemp = () => {
    const { fridgeId } = useParams();
    const navigate = useNavigate();
    const [fridge, error] = useDbData(`/fridges/${fridgeId}`); 
    const [isOpen, setIsOpen] = useState(false);

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
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition border-2 border-blue-700"
                >
                    Back to Map
                </button>
                <button onClick={() => setIsOpen(true)} className="border-2 border-purple-400 bg-purple-300 p-2 rounded-md text-white">
                    Add New Item
                </button>
            </div>
            {isOpen && <AddModal isOpen={isOpen} setIsOpen={setIsOpen} fridge="1" />}
        </div>
    );
    
};

export default FridgePageTemp;
