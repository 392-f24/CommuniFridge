import React, { useRef } from 'react';
import AddForm from './AddForm';

const AddModal = ({ isOpen, setIsOpen, fridge }) => {
  const handleClick = () => setIsOpen(false);

  return (
    <div
      className={`fixed inset-0 flex justify-center items-start pt-2 ${
        isOpen ? 'bg-black/20' : 'invisible'
      }`}
    >
      <div
        className="flex flex-col bg-white rounded-md relative w-[85%] h-fit"
        onClick={(e) => e.stopPropagation()}
      >
        <h1 className="text-2xl text-center my-4 font-bold">
          Add a New Fridge Item
        </h1>

        <AddForm setIsOpen={setIsOpen} fridge={fridge} />

        
        <button
          className="bg-red-500 hover:bg-red-600 rounded-md border-2 border-red-700 p-3 m-1 font-bold shadow-md"
          onClick={handleClick}
        >
          Cancel
        </button>
        
      </div>
    </div>
  );
};

export default AddModal;
