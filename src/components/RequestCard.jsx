const RequestCard = (props) => {
    return (
        <div className={`w-full px-4 py-2 border border-black border-2 rounded-md`}>
            <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    {/* item name */}
                    <h1 className="text-lg font-semibold text-gray-800">{props.item}</h1>
                </div>
                <div className="flex items-center space-x-2">
                    {/* item quantity */}
                    <p className="text-center w-10 bg-white rounded-md border border-2 border-black">{props.quantity}</p>
                </div>
            </div>
        </div>
    );
}


export default RequestCard; 
