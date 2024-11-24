import { useState, useRef } from 'react'; 
import InputField from './InputField';
import { useDbUpdate, useDbData } from '../utilities/firebase'; // Import useDbData
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';

const RequestForm = ({ fridgeId }) => {

    const uuid = useRef(uuidv4()); 

    const nav = useNavigate(); 

    //reate a new request
    const [createRequest, createResult] = useDbUpdate(`/fridges/${fridgeId}/requests/${uuid.current}`);

    // update existing requests
    const [updateRequest, updateResult] = useDbUpdate(`/fridges/${fridgeId}/requests`);

    // fetch existing requests for the fridge
    const [existingRequests, requestsError] = useDbData(`/fridges/${fridgeId}/requests`);

    const [data, setData] = useState({
        item: "",
        quantity: ""
    });

    const handleChange = (e) => {
        const { value, name } = e.target;
        setData((oldData) => ({...oldData, [name]: value}));
    }

    const handleSubmit = async (e) => {
        e.preventDefault(); 

        if (!data.item.trim()) {
            alert("Item name cannot be empty.");
            return;
        }

        const requestedQuantity = parseFloat(data.quantity);
        if (isNaN(requestedQuantity) || requestedQuantity <= 0) {
            alert("Please enter a valid quantity.");
            return;
        }

        try {
            if (requestsError) {
                alert("Error fetching existing requests.");
                return;
            }

            let existingRequestId = null;

            if (existingRequests) {
                // Find if the item already exists (case-insensitive)
                const foundEntry = Object.entries(existingRequests).find(
                    ([id, request]) => request.item.toLowerCase() === data.item.trim().toLowerCase()
                );
                if (foundEntry) {
                    existingRequestId = foundEntry[0];
                }
            }

            if (existingRequestId) {
                // Item exists, update the quantity
                const existingQuantity = parseFloat(existingRequests[existingRequestId].quantity);
                const newQuantity = existingQuantity + requestedQuantity;

                await updateRequest({
                    [`${existingRequestId}/quantity`]: newQuantity.toString()
                });

            } else {
                // Item does not exist, create a new request
                await createRequest({
                    item: data.item.trim(),
                    quantity: data.quantity.trim()
                });

                alert(`Requested ${data.quantity} of ${data.item}.`);
            }

            setData({ item: "", quantity: "" });

            nav(-1);

        } catch (error) {
            console.error("Error submitting request:", error);
            alert("Failed to submit request. Please try again.");
        }
    }

    return (
        <div className="mt-2">
            <form 
                className="flex flex-col mx-auto items-center w-3/4"
                onSubmit={handleSubmit}
            >

               <InputField 
                   name="item" 
                   data={data.item} 
                   handleChange={handleChange}
                   label="Item" 
               />

               <InputField 
                   name="quantity" 
                   data={data.quantity} 
                   handleChange={handleChange}
                   label="Quantity" 
               />

               <button 
                   className="mt-2 py-2 px-4 border-2 rounded-md self-end text-white
                             border-blue-500 bg-blue-400 hover:border-blue-700 
                             hover:scale-105"
                   type="submit"
               > 
                    Submit 
                </button>
            </form>
        </div>
    );
}

export default RequestForm; 
