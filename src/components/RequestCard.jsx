
const RequestCard = (props) => {

    return (
        <div className="flex flex-col space-y-2 border-2 border-black shadow-md">
            <p className=""> <span className="font-bold">Item</span> {props.item} </p>
            <p className=""> <span className="font-bold">Quantity</span> {props.quantity} </p>
        </div>
    );
}


export default RequestCard; 