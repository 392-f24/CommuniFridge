import { useDbData, useDbUpdate } from '../utilities/firebase';
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
  const [items, error] = useDbData(`/fridges/${fridge}/items`);

  const [formState, handleFormChange, setFormState] = useFormData(null, {
    name : '',
    quantity : 0,
    category : ''
  });

  const autoFill = ({item, setState}) => {
    setState({
      name : item.name,
      quantity : item.quantity,
      category : item.category
    })
  };

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
    navigate(`/fridge/${fridge}`); // Redirect back to Fridge after submission
  };

  if (error) return <h1 className="text-red-500 text-2xl text-center">Error loading data: {error.toString()}</h1>;
  if (items === undefined) return <h1 className="text-purple-400 text-2xl text-center">Loading data...</h1>;

  return (
    <form
      className="flex flex-col gap-4 h-[70%] overflow-y-hidden"
      onSubmit={handleSubmit}
    >
      <div>
        <InputField
          type="text"
          data={formState.data.name}
          name="name"
          handleChange={handleFormChange}
          label="Item Name"
          error={formState.errors.name}
        />
        <ul className={`px-5 py-0 my-0 divide-y-2 ${/(^\w)/.test(formState.data.name) ? "" : "hidden"}`}>
          {Object.values(items).filter((item) => (item.name.toLowerCase()).includes(formState.data.name.toLowerCase()))
                  .map((item) => <li key={item.name}>{item.name}</li>)}
        </ul>
      </div>
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
