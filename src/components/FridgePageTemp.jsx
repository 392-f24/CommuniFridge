import { useDbData } from "../utilities/firebase";
import { useParams } from "react-router-dom";
import FridgeCard from "./FridgeCard";

const FridgePageTemp = () => {
    const { fridgeId } = useParams();
    const [items, error] = useDbData(`/fridges/${fridgeId}/items`); 

    console.log(`/fridges/${fridgeId}/items`);

    if (error) return <h1>Error loading data: {error.toString()}</h1>;
    if (items === undefined) return <h1>Loading data...</h1>;
    if (!items) return <h1>No items found</h1>;

    return (
        <div>
            <h1>Fridge Items</h1>
            {Object.entries(items).map(([itemId, item]) => <FridgeCard key={itemId} fridgeId={fridgeId} itemId={itemId} item={item}/>)}
        </div>
    );
    
};

export default FridgePageTemp;