import { useDbUpdate } from '../utilities/firebase';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { useFormData } from '../utilities/useFormData';
import Dropdown from './FormElements/Dropdown';
import InputField from './FormElements/InputField';

const AddForm = ({ setIsOpen, fridge }) => {
  const navigate = useNavigate();
  const [itemId] = useState(uuidv4());

  const [update, result] = useDbUpdate(`/fridges/${fridge}/items/${itemId}`);

  const [formState, handleFormChange, setFormState] = useFormData(null, {
    name : '',
    quantity : 0,
    category : ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check for errors before submitting
    if (Object.keys(formState.errors).length > 0) {
      alert('Please fix the errors in the form before submitting.');
      return;
    };

    let newData = { ...formState.data};

    update(newData);
    setIsOpen(false);
    navigate('/'); // Redirect back to Fridge after submission
  };

  return (
    <form
      className="flex flex-col gap-4 h-[70%] overflow-y-hidden"
      onSubmit={handleSubmit}
    >
      <InputField
        type="text"
        data={formState.data.name}
        name="name"
        handleChange={handleFormChange}
        label="Item Name"
        error={formState.errors.name}
      />

      <InputField
        type="number"
        data={formState.data.quantity}
        name="quantity"
        handleChange={handleFormChange}
        label="Quantity"
        error={formState.errors.quantity}
      />

      <Dropdown
        name="category"
        label="Category"
        data={formState.data.category}
        handleChange={handleFormChange}
        error={formState.errors.category}
      />

      <div className="flex justify-between px-1 py-2 mt-auto">

        <button
          className="bg-green-500 hover:bg-green-600 rounded-md border-1 border-green-700 w-[100%] p-3 text-white"
          type="submit"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default AddForm;
