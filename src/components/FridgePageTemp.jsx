import { useDbData } from "../utilities/firebase";

const FridgePageTemp = () => {

    const [items, error] = useDbData("/items"); 

    if (error) return <h1>Error loading data: {error.toString()}</h1>;
    if (items === undefined) return <h1>Loading data...</h1>;
    if (!items) return <h1>No items found</h1>;

    console.log(items);

    return <h1>html</h1>;

};

export default FridgePageTemp;