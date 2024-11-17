import { useDbData } from "../utilities/firebase";
import FridgeCard from "./FridgeCard";

const FridgePageTemp = () => {

    const [items, error] = useDbData("/items"); 

    if (error) return <h1>Error loading data: {error.toString()}</h1>;
    if (items === undefined) return <h1>Loading data...</h1>;
    if (!items) return <h1>No items found</h1>;

    return (
        <div>
            <h1>Fridge Items</h1>
            {Object.entries(items).map(([id, item]) => <FridgeCard key={id} id={id} item={item}/>)}
        </div>
    );
    
};

export default FridgePageTemp;