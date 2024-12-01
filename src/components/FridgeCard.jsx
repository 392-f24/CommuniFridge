import { useState } from "react";
import { useDbUpdate, useDbRemove } from "../utilities/firebase";
import DrawerButton from "./DrawerButton";
import DeleteButton from "./DeleteButton";
import ConfirmationModal from "./ConfirmationModal";
import { IoAddCircle, IoRemoveCircle } from "react-icons/io5";
import CategoryTag from "./CategoryTag";

const FridgeCard = ({ fridgeId, itemId, item }) => {
    const [update, result] = useDbUpdate(`/fridges/${fridgeId}/items/${itemId}`);
    const [remove, res] = useDbRemove(`/fridges/${fridgeId}/items/${itemId}`);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isConfOpen, setIsConfOpen] = useState(false);

    const categoryMap = {
        'Produce' : 'bg-green-300',
        'Pre-Made Meal' : 'bg-orange-300',
        'Frozen' : 'bg-blue-300',
        'Beverage' : 'bg-pink-300',
    }

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    const handleDelete = () => {
        setIsConfOpen(true);
    }

    const handleConfirmation = () => {
        remove();
        setIsConfOpen(false);
    }

    return (
        <div className={`w-[95%] bg-white p-2 mb-1 border border-gray-300 shadow-md rounded-lg`}>
            <div className="flex justify-between items-center">
                <div className="flex flex-col items-start">
                    {/* item name */}
                    <h1 className="text-lg font-semibold text-gray-800">{item.name}</h1>
                </div>
                <div className="flex items-center space-x-1">
                    {/* category tag */}
                    <CategoryTag category={item.category} />
                    {/* minus button */}
                    <button 
                        className="text-2xl rounded-full disabled:opacity-25 disabled:cursor-not-allowed"
                        disabled={item.quantity === 0}
                        onClick={() => update({quantity : item.quantity > 0 ? item.quantity - 1 : 0})}
                    >
                        <IoRemoveCircle />
                    </button>

                    {/* item quantity */}
                    <p className="text-center w-10 bg-white rounded-md border-2 border-black">{item.quantity}</p>

                    {/* plus button */}
                    <button 
                        className="text-2xl rounded-full"
                        onClick={() => update({quantity : item.quantity + 1})}
                    >
                        <IoAddCircle />
                    </button>
                </div>
            </div>
            <div className={`overflow-hidden transition-all duration-300 
                ${isDrawerOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}
            >
                <div className="mt-4 p-2 bg-white rounded-md border-2 border-black">
                    <p>
                        <span className="font-semibold">Category: </span>
                        {item.category}
                    </p>
                </div>

                <DeleteButton handleDelete={handleDelete}/>
            </div>

            {isConfOpen && <ConfirmationModal handleClose={() => setIsConfOpen(false)}
                                               handleConfirmation = {handleConfirmation}/>}

        </div>
    );
};

export default FridgeCard;
