import { useState } from "react";
import { useDbUpdate } from "../utilities/firebase";

const FridgeCard = ({ fridgeId, itemId, item }) => {
    const [update, result] = useDbUpdate(`/fridges/${fridgeId}/items/${itemId}`);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const categoryMap = {
        'Produce' : 'bg-green-300',
        'Pre-Made Meal' : 'bg-orange-300',
        'Frozen' : 'bg-blue-300',
        'Beverage' : 'bg-pink-300',
    }

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    return (
        <div className={`w-full ${categoryMap[item.category]} p-4 border border-gray-200 rounded-md`}>
            <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    {/* expand drawer button */}
                    <button
                        onClick={toggleDrawer}
                        className="w-6 h-6 bg-blue-500 text-white rounded-full flex justify-center items-center hover:bg-blue-600"
                    >
                        ▼
                    </button>

                    {/* item name */}
                    <h1 className="text-lg font-semibold text-gray-800">{item.name}</h1>
                </div>
                <div className="flex items-center space-x-2">
                    {/* minus button */}
                    <button 
                        className="w-8 h-8 bg-red-500 text-white rounded-md flex justify-center items-center hover:bg-red-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
                        disabled={item.quantity === 0}
                        onClick={() => update({quantity : item.quantity > 0 ? item.quantity - 1 : 0})}
                    >
                        -
                    </button>

                    {/* item quantity */}
                    <p className="text-gray-600">{item.quantity}</p>

                    {/* plus button */}
                    <button 
                        className="w-8 h-8 bg-green-500 text-white rounded-md flex justify-center items-center hover:bg-green-600"
                        onClick={() => update({quantity : item.quantity + 1})}
                    >
                        +
                    </button>
                </div>
            </div>
            {isDrawerOpen && (
                <div className="mt-4 p-2 bg-gray-200 rounded-md">
                    <p className="text-gray-700">
                        <span className="font-semibold">Category: </span>
                        {item.category}
                    </p>
                </div>
            )}
        </div>
    );
};

export default FridgeCard;
