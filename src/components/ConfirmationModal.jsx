

const ConfirmationModal = ( {handleClose, handleConfirmation }) => {

    return (<div className={`fixed inset-0 flex flex-col justify-center items-center bg-black/50`}
                  onClick={handleClose}>

                <div className="flex flex-col justify-between py-2 bg-white rounded-md relative w-3/4 h-1/3 md:w-1/2  overflow-y-auto"
                    onClick={(e) => e.stopPropagation()}>

                    <div className="flex justify-center align-center text-2xl text-center my-4 font-bold">
                        Are you sure you want to delete this item from the fridge? 
                    </div>
                    
                    <div className="flex justify-around">
                        <button className="bg-red-500 hover:bg-red-600 rounded-md border-1 border-red-700 p-3 text-white"
                                onClick={handleClose}> 
                            Cancel
                        </button>
                        <button className="bg-green-500 hover:bg-green-600 rounded-md border-1 border-green-700 p-3 text-white"
                            onClick={handleClose}> 
                            Confirm
                        </button>
                    </div>
                 

                   
                </div>

        </div>);
    
}

export default ConfirmationModal;