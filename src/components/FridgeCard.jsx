import { useDbUpdate } from "../utilities/firebase";
import { IoAddCircle, IoRemoveCircle } from "react-icons/io5";
import CategoryTag from "./CategoryTag";

const FridgeCard = ({ fridgeId, itemId, item }) => {
    const [update, result] = useDbUpdate(`/fridges/${fridgeId}/items/${itemId}`);
    
    const categoryMap = {
        'Produce' : 'bg-white',
        'Grains' : 'bg-white',
        'Dairy' : 'bg-white',
        'Snacks' : 'bg-white',
        'Beverage' : 'bg-white',  
        'Canned' : 'bg-white', 
        'Frozen' : 'bg-white',
        'Premade' : 'bg-white',
    };

    return (
        <div className={`w-[95%] ${categoryMap[item.category]} p-2 mb-1 border border-gray-300 shadow-md rounded-lg`}>
            <div className="flex justify-between items-center">
                <div className="flex flex-col items-start">
                    {/* item name */}
                    <h1 className="text-lg font-semibold text-gray-800">{item.name}</h1>
                </div>
                <div className="flex items-center space-x-2">
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
                    <p className="text-center w-10 bg-white rounded-md border border-2 border-black">{item.quantity}</p>

                    {/* plus button */}
                    <button 
                        className="text-2xl rounded-full"
                        onClick={() => update({quantity : item.quantity + 1})}
                    >
                        <IoAddCircle />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FridgeCard;
