import { useState, useEffect } from 'react';
import { useDbData, useDbUpdate } from '../utilities/firebase';
import Dropdown from './FormElements/Dropdown';
import InputField from './FormElements/InputField';
import { v4 as uuidv4 } from 'uuid';

const FulfillForm = ({ setIsOpen, fridgeId }) => {
    // specified fridge
    const [requests, requestsError] = useDbData(`/fridges/${fridgeId}/requests`);

    // current items
    const [items, itemsError] = useDbData(`/fridges/${fridgeId}/items`);

    const [selectedRequest, setSelectedRequest] = useState('');
    const [quantity, setQuantity] = useState('');

    const [updateRequest, updateRequestResult] = useDbUpdate(`/fridges/${fridgeId}/requests`);
    const [updateFridgeItem, updateFridgeItemResult] = useDbUpdate(`/fridges/${fridgeId}/items`);

    useEffect(() => {
        console.log("Fetched Requests:", requests);
        console.log("Fetched Items:", items);
    }, [requests, items]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation: Ensure a request is selected
        if (!selectedRequest) {
            alert("Please select an item to fulfill.");
            return;
        }

        // Validation: Ensure quantity is a positive number
        const fulfilledQuantity = parseFloat(quantity);
        if (isNaN(fulfilledQuantity) || fulfilledQuantity <= 0) {
            alert("Please enter a valid quantity.");
            return;
        }

        // Validation: Check for errors in fetching requests
        if (requestsError) {
            alert("Error fetching requests.");
            return;
        }

        // Retrieve the selected request's data
        const requestData = requests[selectedRequest];
        const requestedQuantity = parseFloat(requestData.quantity);

        // Validation: Ensure requested quantity is valid
        if (isNaN(requestedQuantity)) {
            alert("Invalid requested quantity.");
            return;
        }

        try {
            if (fulfilledQuantity >= requestedQuantity) {
                // **Full Fulfillment**
                // 1. Delete the entire request
                const updates = {};
                updates[selectedRequest] = null; // Setting to null deletes it
                await updateRequest(updates);

                // 2. Add the fulfilled quantity to fridge items
                await addOrUpdateFridgeItem(requestData.item, fulfilledQuantity);
            } else {
                // **Partial Fulfillment**
                // 1. Update the request's quantity
                const newRequestedQuantity = requestedQuantity - fulfilledQuantity;
                await updateRequest({
                    [`${selectedRequest}/quantity`]: newRequestedQuantity.toString()
                });

                // 2. Add the fulfilled quantity to fridge items
                await addOrUpdateFridgeItem(requestData.item, fulfilledQuantity);
            }

            alert("Item fulfillment successful.");
            setIsOpen(false);
        } catch (error) {
            console.error("Error fulfilling item:", error);
            alert(`Failed to fulfill item: ${error.message || "Please try again."}`);
        }
    };

    const addOrUpdateFridgeItem = async (itemName, fulfilledQuantity) => {
        // Handle potential errors in fetching items
        if (itemsError) {
            throw new Error("Error fetching fridge items.");
        }
    
        // Check if the item already exists in the fridge
        const existingItemEntry = items 
            ? Object.entries(items).find(
                ([id, item]) => item.name.toLowerCase() === itemName.toLowerCase()
              )
            : null;
    
        if (existingItemEntry) {
            // **Item Exists**: Increment its quantity
            const [itemId, item] = existingItemEntry;
            const newQuantity = parseFloat(item.quantity) + fulfilledQuantity;
            
            // **Correct Usage:** Pass an object with the relative path as the key
            await updateFridgeItem({ [`${itemId}/quantity`]: newQuantity.toString() });
        } else {
            // **Item Doesn't Exist**: Add it as a new item
            const newItemId = uuidv4(); // Generate a unique ID for the new item
            
            // **Correct Usage:** Pass an object with the new item path as the key
            await updateFridgeItem({ [`${newItemId}`]: {
                name: itemName,
                quantity: fulfilledQuantity.toString(),
                category: 'Uncategorized' // Default category since requests lack this field
            } });
        }
    };
    

    return (
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            {/* Dropdown for selecting the request to fulfill */}
            <Dropdown
                name="selectedRequest"
                label="Select Item to Fulfill"
                data={selectedRequest}
                handleChange={(e) => setSelectedRequest(e.target.value)}
                error=""
            >
                {requests && Object.entries(requests).map(([id, request]) => (
                    <option key={id} value={id}>
                        {request.item} (Requested: {request.quantity})
                    </option>
                ))}
            </Dropdown>

            {/* Input for quantity to fulfill */}
            <InputField
                type="number"
                name="quantity"
                data={quantity}
                handleChange={(e) => setQuantity(e.target.value)}
                label="Quantity to Fulfill"
                error=""
            />

            {/* Submit Button */}
            <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
            >
                Fulfill
            </button>
        </form>
    );
};

export default FulfillForm;
