import { useState } from "react";
import { useDbUpdate, useDbRemove } from "../utilities/firebase";
import DeleteButton from "./DeleteButton";
import ConfirmationModal from "./ConfirmationModal";
import { IoAddCircle, IoRemoveCircle } from "react-icons/io5";
import CategoryTag from "./CategoryTag";

const FridgeCard = ({ fridgeId, itemId, item }) => {
    const [update] = useDbUpdate(`/fridges/${fridgeId}/items/${itemId}`);
    const [remove] = useDbRemove(`/fridges/${fridgeId}/items/${itemId}`);
    const [isConfOpen, setIsConfOpen] = useState(false);
    const [translateX, setTranslateX] = useState(0);
    const [startX, setStartX] = useState(null);
    const [isDragging, setIsDragging] = useState(false);

    const SWIPE_DISTANCE = 75; // Distance to move elements upon swipe
    const RESET_THRESHOLD = 10; // Distance the user must swipe to activate swipe action

    const handleStart = (clientX) => {
        setStartX(clientX);
        setIsDragging(true);
    };

    const handleMove = (clientX) => {
        if (!isDragging || startX === null) return;
        const diffX = clientX - startX;

        if (translateX + diffX <= 0 && translateX + diffX >= -SWIPE_DISTANCE) {
            setTranslateX(translateX + diffX);
            setStartX(currentX);
        } else if (translateX + diffX > 0) {
            setTranslateX(0); 
            setStartX(currentX);
        }
    };

    const handleEnd = () => {
        setIsDragging(false);
        if (translateX < -RESET_THRESHOLD) {
            setTranslateX(-SWIPE_DISTANCE);
        } else if (translateX > RESET_THRESHOLD) {
            setTranslateX(0);
        }
        setStartX(null);
    };

    const handleDelete = () => {
        setIsConfOpen(true);
    };

    const handleConfirmation = () => {
        remove();
        setIsConfOpen(false);
    };

    return (
        <div className="relative w-[95%] bg-white p-2 mb-1 border border-gray-300 shadow-md rounded-lg overflow-hidden">
            {/* Main Content */}
            <div
                className={`flex justify-between items-center transition-transform duration-300 select-none`}
                style={{
                    transform: `translateX(${translateX}px)`,
                }}
                onTouchStart={(e) => handleStart(e.touches[0].clientX)}
                onTouchMove={(e) => handleMove(e.touches[0].clientX)}
                onTouchEnd={handleEnd}
                onMouseDown={(e) => handleStart(e.clientX)}
                onMouseMove={(e) => isDragging && handleMove(e.clientX)}
                onMouseUp={handleEnd}
                onMouseLeave={handleEnd}
            >
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
                        onClick={() =>
                            update({ quantity: item.quantity > 0 ? item.quantity - 1 : 0 })
                        }
                    >
                        <IoRemoveCircle />
                    </button>

                    {/* item quantity */}
                    <p className="text-center w-10 bg-white rounded-md border-2 border-black">
                        {item.quantity}
                    </p>

                    {/* plus button */}
                    <button
                        className="text-2xl rounded-full"
                        onClick={() => update({ quantity: item.quantity + 1 })}
                    >
                        <IoAddCircle />
                    </button>
                </div>
            </div>

            {/* Delete Button */}
            <div
                className="absolute right-0 top-0 bottom-0 w-14"
                style={{
                    transform: `translateX(${translateX > -SWIPE_DISTANCE ? 100 : 0}px)`,
                    transition: "transform 0.3s ease",
                }}
                onClick={handleDelete}
            >
                <DeleteButton handleDelete={handleDelete} />
            </div>

            {/* Confirmation Modal */}
            {isConfOpen && (
                <ConfirmationModal
                    itemName={item.name}
                    handleClose={() => setIsConfOpen(false)}
                    handleConfirmation={handleConfirmation}
                />
            )}
        </div>
    );
};

export default FridgeCard;
