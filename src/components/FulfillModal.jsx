import React from 'react';
import FulfillForm from './FulfillForm';

const FulfillModal = ({ isOpen, setIsOpen, fridgeId }) => {
    const handleClick = () => setIsOpen(false);

    return (
        <div
            className={`fixed inset-0 flex justify-center items-center ${
                isOpen ? 'bg-black/20' : 'invisible'
            }`}
        >
            <div
                className="flex flex-col bg-white rounded-md relative w-11/12 md:w-1/3 p-4"
                onClick={(e) => e.stopPropagation()}
            >
                <h1 className="text-2xl text-center font-bold mb-4">Fulfill Item</h1>

                <FulfillForm setIsOpen={setIsOpen} fridgeId={fridgeId} />

                <button
                    className="mt-4 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md"
                    onClick={handleClick}
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default FulfillModal;
