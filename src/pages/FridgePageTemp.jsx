import { useDbData, useDbUpdate } from "../utilities/firebase";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import FridgeCard from "../components/FridgeCard";
import AddModal from "../components/AddModal";
import FulfillModal from "../components/FulfillModal"; 
import BackButton from '../components/BackButton';

const CATEGORIES = ['Produce', 'Pre-Made Meal', 'Frozen', 'Beverage'];

const FridgePageTemp = () => {
    const { fridgeId } = useParams();
    const navigate = useNavigate();
    const [fridge, error] = useDbData(`/fridges/${fridgeId}`); 
    const [update] = useDbUpdate(`/fridges/${fridgeId}`);
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [isFulfillOpen, setIsFulfillOpen] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState([]); // Track selected categories
    const [includeOthers, setIncludeOthers] = useState(false); // Track "Others" selection

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
        <div>
            <BackButton />
            <div>
                <h1 className="text-3xl font-semibold text-center text-blue-800 mb-2">{fridge.displayName} Fridge</h1>
                <h3 className="text-lg text-center mb-6">{`Items Last Verified at ${fridge.verificationDate} ${fridge.verificationTime}`}</h3>

                {/* Category Filter */}
                <div className="mb-4 flex flex-wrap justify-center space-x-4">
                    {CATEGORIES.map((category) => (
                        <button
                            key={category}
                            onClick={() => toggleCategory(category)}
                            className={`px-4 py-2 rounded-md ${
                                selectedCategories.includes(category)
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gray-300 text-gray-800'
                            }`}
                        >
                            {category}
                        </button>
                    ))}
                    <button
                        onClick={toggleOthers}
                        className={`px-4 py-2 rounded-md ${
                            includeOthers ? 'bg-yellow-500 text-white' : 'bg-gray-300 text-gray-800'
                        }`}
                    >
                        Others
                    </button>
                </div>

                {/* Items List */}
                <div className="flex flex-col items-center h-[400px] md:h-3/4 overflow-auto">
                    {filteredItems.map(([itemId, item]) => (
                        <FridgeCard key={itemId} fridgeId={fridgeId} itemId={itemId} item={item} />
                    ))}
                </div>
            </div>

            <div className="mt-4 flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-4 md:justify-center items-center">
                <button 
                    onClick={() => setIsAddOpen(true)} 
                    className="border-2 border-purple-400 bg-purple-300 p-2 rounded-md text-white"
                >
                    Add New Item
                </button>

                <button 
                    onClick={() => navigate(`/fridge/${fridgeId}/request`)}
                    className="border-1 border-green-600 rounded-md bg-green-300 p-3 text-white hover:bg-green-400"
                >
                    Requested Items 
                </button>

                <button 
                    onClick={() => navigate(`/fridge/${fridgeId}/request/create`)}
                    className="border-1 border-blue-600 rounded-md bg-blue-300 p-3 text-white hover:bg-blue-400"
                >
                    Make a Request
                </button>

                <button 
                    onClick={handleVerification}
                    className="border-1 border-red-600 rounded-md bg-red-400 p-3 text-white hover:bg-red-500"
                >
                    Verify Items 
                </button>
                
                {/* New Fulfill Item button */}
                <button 
                    onClick={() => setIsFulfillOpen(true)}
                    className="border-1 border-yellow-600 rounded-md bg-yellow-300 p-3 text-white hover:bg-yellow-400"
                >
                    Fulfill Item
                </button>
            </div>
            
            {isAddOpen && <AddModal isOpen={isAddOpen} setIsOpen={setIsAddOpen} fridge={fridgeId} />}
            
            {isFulfillOpen && <FulfillModal isOpen={isFulfillOpen} setIsOpen={setIsFulfillOpen} fridgeId={fridgeId} />}
        </div>
    );
};

export default FridgePageTemp;
