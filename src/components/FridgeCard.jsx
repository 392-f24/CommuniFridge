const FridgeCard = ({item}) => {
    return (
        <div>
            <h1>{item.name}</h1>
            <p>{item.quantity}</p>
        </div>
    )
};

export default FridgeCard;
