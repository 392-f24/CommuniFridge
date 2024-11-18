import { useDbData } from "../utilities/firebase";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import FridgeCard from "../components/FridgeCard";
import AddModal from "../components/AddModal";
import BackButton from '../components/BackButton'

const FridgePageTemp = () => {
    const { fridgeId } = useParams();
    const navigate = useNavigate();
    const [fridge, error] = useDbData(`/fridges/${fridgeId}`); 
    const [isOpen, setIsOpen] = useState(false);

    if (error) return <h1>Error loading data: {error.toString()}</h1>;
    if (fridge === undefined) return <h1>Loading data...</h1>;
    if (!fridge.items) return <h1>No items found</h1>;


    return (
        <div>
            <BackButton />
            <div>
                <h1 className="text-3xl font-semibold text-center text-blue-800 mb-6">{fridge.displayName} Fridge</h1>
                {Object.entries(fridge.items).map(([itemId, item]) => <FridgeCard key={itemId} fridgeId={fridgeId} itemId={itemId} item={item}/>)}
            </div>

            <div className="mt-4 flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-4 md:justify-center items-center">
                <button onClick={() => setIsOpen(true)} className="border-2 border-purple-400 bg-purple-300 p-2 rounded-md w-24 text-white">
                    Add Item
                </button>

                <button onClick={() => navigate(`/fridge/${fridgeId}/request`)}
                        className="border-1 border-green-600 rounded-md bg-green-300 p-3 text-white hover:bg-green-400">
                    Requested Items 
                </button>

                <button onClick={() => navigate(`/fridge/${fridgeId}/request/create`)}
                        className="border-1 border-blue-600 rounded-md bg-blue-300 p-3 text-white hover:bg-blue-400">
                    Make a Request
                </button>

            </div>
            {isOpen && <AddModal isOpen={isOpen} setIsOpen={setIsOpen} fridge="1" />}
        </div>
    );
    
};

export default FridgePageTemp;
