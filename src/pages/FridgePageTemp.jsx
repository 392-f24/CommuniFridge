import { useDbData, useDbUpdate } from "../utilities/firebase";
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
    const [update, result] = useDbUpdate(`/fridges/${fridgeId}`);
    const [isOpen, setIsOpen] = useState(false);

    if (error) return <h1>Error loading data: {error.toString()}</h1>;
    if (fridge === undefined) return <h1>Loading data...</h1>;
    if (!fridge.items) return <h1>No items found</h1>;


    const handleVerifcation = () => {
        const now = new Date();
        const currentDate = now.toLocaleDateString();
        const currentTime = now.toLocaleTimeString();
        update(
            {
                verificationDate: currentDate, 
                verificationTime: currentTime
            }
        )
    }


    return (
        <div>
            <BackButton />
            <div>
                <h1 className="text-3xl font-semibold text-center text-blue-800 mb-2">{fridge.displayName} Fridge</h1>
                <h3 className="text-lg text-center mb-6">{`Items Last Verified at ${fridge.verificationDate} ${fridge.verificationTime}`}</h3>
                <div className="flex flex-col items-center h-[400px] md:h-3/4 overflow-auto">
                    {Object.entries(fridge.items).map(([itemId, item]) => <FridgeCard key={itemId} fridgeId={fridgeId} itemId={itemId} item={item}/>)}
                </div>
            </div>

            <div className="mt-4 flex flex-row space-y-4 md:space-y-0 md:flex-row md:space-x-4 md:justify-center items-center justify-center">
                <div className="mt-4 flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-4 md:justify-center items-center">
                    <button onClick={() => setIsOpen(true)} className="border-2 border-purple-400 bg-purple-300 p-2 rounded-md text-white">
                        Add New Item
                    </button>

                    <button onClick={() => navigate(`/fridge/${fridgeId}/request`)}
                            className="border-1 border-green-600 rounded-md bg-green-300 p-3 text-white hover:bg-green-400">
                        Requested Items 
                    </button>
                </div>
                <div className="mt-4 flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-4 md:justify-center items-center">
                    <button onClick={() => navigate(`/fridge/${fridgeId}/request/create`)}
                            className="border-1 border-blue-600 rounded-md bg-blue-300 p-3 text-white hover:bg-blue-400">
                        Make a Request
                    </button>

                    <button onClick={handleVerifcation}
                            className="border-1 border-red-600 rounded-md bg-red-400 p-3 text-white hover:bg-red-500">
                        Verify Items 
                    </button>
                </div>

            </div>
            {isOpen && <AddModal isOpen={isOpen} setIsOpen={setIsOpen} fridge={fridgeId} />}
        </div>
    );
    
};

export default FridgePageTemp;
