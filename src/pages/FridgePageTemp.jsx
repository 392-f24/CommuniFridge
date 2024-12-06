import { useDbData, useDbUpdate } from "../utilities/firebase";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import FridgeCard from "../components/FridgeCard";
import AddModal from "../components/AddModal"; 
import BackButton from '../components/BackButton'
import FilterModal from "../components/FilterModal";

const CATEGORIES = ['Produce', 'Premade', 'Frozen', 'Beverage'];

const FridgePageTemp = () => {
    const { fridgeId } = useParams();
    const navigate = useNavigate();
    const [fridge, error] = useDbData(`/fridges/${fridgeId}`); 
    const [update, result] = useDbUpdate(`/fridges/${fridgeId}`);
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [isFulfillOpen, setIsFulfillOpen] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState([]); // Track selected categories
    const [includeOthers, setIncludeOthers] = useState(false);
    const [isFilterOpen, setIsFilterOpen] = useState(false); // Track "Others" selection\

    if (error) return <h1>Error loading data: {error.toString()}</h1>;
    if (fridge === undefined) return <h1>Loading data...</h1>;
    if (!fridge.items) return <h1>No items found</h1>;

    const toggleCategory = (category) => {
        // Add or remove category from selectedCategories
        setSelectedCategories((prev) =>
            prev.includes(category)
                ? prev.filter((cat) => cat !== category)
                : [...prev, category]
        );
    };

    const toggleOthers = () => {
        // Toggle "Others" selection
        setIncludeOthers((prev) => !prev);
    };
    const filteredItems = Object.entries(fridge.items).filter(([_, item]) => {
        // Check if item matches selected categories or is in "Others"
        const isInCategory = selectedCategories.includes(item.category);
        const isOther = includeOthers && !CATEGORIES.includes(item.category);
        // If neither "Others" nor any category is selected, show all items
        return (selectedCategories.length > 0 || includeOthers) ? isInCategory || isOther : true;
    });
    const handleVerification = () => {
        const now = new Date();
        const currentDate = now.toLocaleDateString();
        const currentTime = now.toLocaleTimeString();
        update({
            verificationDate: currentDate, 
            verificationTime: currentTime
        });
    };

    return (
        <div className="bg-yellow-200 h-[100vh]">
            <BackButton />
            <div >
                <h1 className="text-3xl font-semibold text-center p-1">{fridge.displayName} Fridge</h1>
                <h3 className="text-xs italic text-center mb-1">{`Items Last Verified ${fridge.verificationDate} at ${fridge.verificationTime}`}</h3>

                {/* Category Filter */}
                <button onClick = {() => setIsFilterOpen(!isFilterOpen)} className="border-2 border-yellow-500 rounded-sm bg-yellow-400 p-1 mb-2 mt-3 hover:bg-yellow-500 flex justify-center shadow-md font-semibold ms-3">
                    Filter
                </button>
                {isFilterOpen && <FilterModal CATEGORIES={CATEGORIES} toggleCategory={toggleCategory} selectedCategories={selectedCategories} toggleOthers={toggleOthers} includeOthers={includeOthers} /> }

                {/* Items List */}
                <div className="flex flex-col items-center h-[360px] md:h-3/4 overflow-auto">
                    {filteredItems.map(([itemId, item]) => (
                        <FridgeCard key={itemId} fridgeId={fridgeId} itemId={itemId} item={item} />
                    ))}
                </div>
            </div>
            <h1 className="text-lg italic font-semibold text-center bg-yellow-100 border-2 border-yellow-300 mt-2">update the state of the fridge based on what you add, take, or request</h1>
            <div className="flex flex-col space-y-2 md:space-y-0 md:flex-row md:space-x-4 md:justify-center items-center">
                <div className="mt-4 flex flex-row space-y-0 space-x-4 md:space-y-0 md:flex-row md:space-x-4 md:justify-center items-center">
                    <button 
                        onClick={() => setIsAddOpen(true)} 
                        className="border-2 border-purple-400 bg-purple-300 p-2 rounded-md font-semibold hover:bg-purple-400 shadow-md"
                    >
                        Add New Item
                    </button>
                    <button 
                        onClick={() => navigate(`/fridge/${fridgeId}/request`)}
                        className="border-2 border-green-400 rounded-md bg-green-300 p-2 hover:bg-green-400 shadow-md font-semibold"
                    >
                        Requested Items 
                    </button>
                </div>
                <div className="mt-4 flex flex-row space-y-0 space-x-4 md:space-y-0 md:flex-row md:space-x-4 md:justify-center items-center">
                    <button 
                        onClick={() => navigate(`/fridge/${fridgeId}/request/create`)}
                        className="border-2 border-blue-400 rounded-md bg-blue-300 p-2 hover:bg-blue-400 shadow-md font-semibold"
                    >
                        Make a Request
                    </button>
                    <button 
                        onClick={handleVerification}
                        className="border-2 border-red-500 rounded-md bg-red-400 p-2 hover:bg-red-500 shadow-md font-semibold"
                    >
                        Verify Items 
                    </button>
                </div>
            </div>
            
            {isAddOpen && <AddModal isOpen={isAddOpen} setIsOpen={setIsAddOpen} fridge={fridgeId} />}
        </div>
    );
};

export default FridgePageTemp;