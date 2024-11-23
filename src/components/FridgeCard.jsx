import { useState } from "react";
import { useDbUpdate } from "../utilities/firebase";
import DrawerButton from "./DrawerButton";
import { IoAddCircle, IoRemoveCircle } from "react-icons/io5";

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

    const categoryMap = {
        'Produce' : 'bg-produce',
        'Pre-Made Meal' : 'bg-preMadeMeal',
        'Frozen' : 'bg-frozen',
        'Beverage' : 'bg-beverage',
    };

    return (
        <div className={`w-full ${categoryMap[item.category]} p-4 border border-white rounded-md`}>
            <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    <DrawerButton isDrawerOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />

                    {/* item name */}
                    <h1 className="text-lg font-semibold text-gray-800">{item.name}</h1>
                </div>
                <div className="flex items-center space-x-2">
                    {/* minus button */}
                    <button 
                        className="text-xl bg-white rounded-full disabled:opacity-25 disabled:cursor-not-allowed"
                        disabled={item.quantity === 0}
                        onClick={() => update({quantity : item.quantity > 0 ? item.quantity - 1 : 0})}
                    >
                        <IoRemoveCircle />
                    </button>

                    {/* item quantity */}
                    <p className="text-center w-10 bg-white rounded-md border border-2 border-black">{item.quantity}</p>

                    {/* plus button */}
                    <button 
                        className="text-xl bg-white rounded-full"
                        onClick={() => update({quantity : item.quantity + 1})}
                    >
                        <IoAddCircle />
                    </button>
                </div>
            </div>
            <div className={`overflow-hidden transition-all duration-300 
                ${isDrawerOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}
            >
                <div className="mt-4 p-2 bg-white rounded-md border border-2 border-black">
                    <p>
                        <span className="font-semibold">Category: </span>
                        {item.category}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default FridgeCard;
